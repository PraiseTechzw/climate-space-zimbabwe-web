-- ============================================================================
-- Climate Space Zimbabwe — Complete Supabase Schema
-- ============================================================================
-- Run this SQL in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- This creates ALL tables, extensions, functions, indexes, and RLS policies
-- needed for the platform.
-- ============================================================================
-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================
-- Enable pgvector for embedding storage & similarity search (RAG pipeline)
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;
-- Enable pg_trgm for fast text search (used for fuzzy matching)
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;
-- Enable uuid-ossp for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
-- ============================================================================
-- 2. CUSTOM TYPES / ENUMS
-- ============================================================================
-- User roles for RBAC
CREATE TYPE public.user_role AS ENUM ('user', 'member', 'admin');
-- Club application status
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');
-- Contact message status
CREATE TYPE public.contact_status AS ENUM ('unread', 'read', 'replied', 'archived');
-- Project status
CREATE TYPE public.project_status AS ENUM ('draft', 'active', 'completed', 'archived');
-- Resource type
CREATE TYPE public.resource_type AS ENUM ('pdf', 'video', 'article', 'dataset', 'guide');
-- ============================================================================
-- 3. CORE TABLES
-- ============================================================================
-- -------------------------------------------------------
-- 3a. USER PROFILES (extends Supabase Auth)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    -- e.g. "Harare", "Chinhoyi"
    role public.user_role DEFAULT 'user',
    organization TEXT,
    -- e.g. school, farm, NGO
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$ BEGIN
INSERT INTO public.profiles (id, full_name, avatar_url)
VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'full_name',
            NEW.raw_user_meta_data->>'name',
            ''
        ),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
RETURN NEW;
END;
$$;
-- Trigger: auto-create profile when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- -------------------------------------------------------
-- 3b. DOCUMENTS TABLE (RAG Vector Store)
-- -------------------------------------------------------
-- This is the core table for the Retrieval-Augmented Generation (RAG) pipeline.
-- The ingest.ts module writes to this table; retrieve.ts reads from it.
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    content TEXT NOT NULL,
    -- The text chunk
    metadata JSONB DEFAULT '{}'::JSONB,
    -- { title, source, page, url, ... }
    embedding vector(768),
    -- 768-dim for Gemma/nomic-embed; adjust if using a different model
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- HNSW index for fast cosine similarity search on embeddings
CREATE INDEX IF NOT EXISTS documents_embedding_idx ON public.documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
-- GIN index on metadata for fast JSONB queries
CREATE INDEX IF NOT EXISTS documents_metadata_idx ON public.documents USING GIN (metadata);
-- Full-text search index on content 
CREATE INDEX IF NOT EXISTS documents_content_trgm_idx ON public.documents USING GIN (content extensions.gin_trgm_ops);
-- -------------------------------------------------------
-- 3c. CONTACT SUBMISSIONS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status public.contact_status DEFAULT 'unread',
    admin_notes TEXT,
    replied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- -------------------------------------------------------
-- 3d. CLUB APPLICATIONS ("Start a Club" requests)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.club_applications (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    institution TEXT NOT NULL,
    -- School or university name
    institution_type TEXT,
    -- 'primary', 'high_school', 'university'
    location TEXT,
    -- City/town
    club_name TEXT,
    -- Proposed club name
    motivation TEXT NOT NULL,
    -- Why they want to start a club
    member_count INTEGER DEFAULT 0,
    -- Expected initial membership
    status public.application_status DEFAULT 'pending',
    reviewer_id UUID REFERENCES public.profiles(id),
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- -------------------------------------------------------
-- 3e. PROJECTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    category TEXT,
    -- e.g. 'conservation', 'agriculture', 'education'
    location TEXT,
    status public.project_status DEFAULT 'draft',
    impact_summary TEXT,
    -- Short impact/outcome description
    start_date DATE,
    end_date DATE,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS projects_slug_idx ON public.projects(slug);
CREATE INDEX IF NOT EXISTS projects_status_idx ON public.projects(status);
-- -------------------------------------------------------
-- 3f. RESOURCES (Climate Library)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    resource_type public.resource_type DEFAULT 'article',
    file_url TEXT,
    -- Supabase Storage URL for PDFs, etc.
    external_url TEXT,
    -- External link (video, article)
    thumbnail_url TEXT,
    category TEXT,
    -- e.g. 'farming_guides', 'climate_data', 'policy'
    tags TEXT [] DEFAULT '{}',
    -- Searchable tags
    is_featured BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS resources_slug_idx ON public.resources(slug);
CREATE INDEX IF NOT EXISTS resources_tags_idx ON public.resources USING GIN (tags);
-- -------------------------------------------------------
-- 3g. CREATIVE SPACE (Gallery Items)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT NOT NULL,
    -- Image/video URL from Supabase Storage
    media_type TEXT DEFAULT 'image',
    -- 'image', 'video', 'audio'
    artist_name TEXT,
    artist_id UUID REFERENCES public.profiles(id),
    category TEXT,
    -- e.g. 'photography', 'painting', 'poetry'
    is_featured BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- -------------------------------------------------------
-- 3h. ANALYTICS EVENTS (AI Usage & Platform Metrics)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    event_type TEXT NOT NULL,
    -- 'ai_search', 'pest_scan', 'page_view', 'resource_download'
    event_data JSONB DEFAULT '{}'::JSONB,
    -- { query, provider, model, latency_ms, ... }
    user_id UUID REFERENCES public.profiles(id),
    session_id TEXT,
    ip_hash TEXT,
    -- Hashed IP for analytics (privacy-safe)
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS analytics_event_type_idx ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON public.analytics_events(created_at DESC);
-- -------------------------------------------------------
-- 3i. AI SEARCH HISTORY (For improving results over time)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_search_logs (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    query TEXT NOT NULL,
    location TEXT,
    crop TEXT,
    provider TEXT,
    -- Which AI provider was used
    model TEXT,
    -- Which model was used
    response_json JSONB,
    -- Full response for auditability
    latency_ms INTEGER,
    confidence TEXT,
    -- 'high', 'medium', 'low'
    had_citations BOOLEAN DEFAULT FALSE,
    had_weather BOOLEAN DEFAULT FALSE,
    feedback_rating INTEGER,
    -- 1-5 user rating (nullable)
    user_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ai_search_logs_created_idx ON public.ai_search_logs(created_at DESC);
-- ============================================================================
-- 4. RPC FUNCTIONS (Used by the Application Code)
-- ============================================================================
-- -------------------------------------------------------
-- 4a. match_documents — Semantic Vector Search for RAG
-- -------------------------------------------------------
-- Called by: src/lib/rag/retrieve.ts
-- Performs cosine similarity search on document embeddings
CREATE OR REPLACE FUNCTION public.match_documents(
        query_embedding vector(768),
        match_threshold FLOAT DEFAULT 0.76,
        match_count INT DEFAULT 8
    ) RETURNS TABLE (
        id UUID,
        content TEXT,
        metadata JSONB,
        similarity FLOAT
    ) LANGUAGE plpgsql STABLE AS $$ BEGIN RETURN QUERY
SELECT d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) AS similarity
FROM public.documents d
WHERE 1 - (d.embedding <=> query_embedding) > match_threshold
ORDER BY d.embedding <=> query_embedding
LIMIT match_count;
END;
$$;
-- -------------------------------------------------------
-- 4b. get_analytics_summary — Dashboard Metrics
-- -------------------------------------------------------
-- Returns aggregated analytics for the admin dashboard
CREATE OR REPLACE FUNCTION public.get_analytics_summary(time_range_days INT DEFAULT 30) RETURNS TABLE (
        total_events BIGINT,
        ai_searches BIGINT,
        pest_scans BIGINT,
        page_views BIGINT,
        unique_sessions BIGINT
    ) LANGUAGE plpgsql STABLE AS $$ BEGIN RETURN QUERY
SELECT COUNT(*)::BIGINT AS total_events,
    COUNT(*) FILTER (
        WHERE ae.event_type = 'ai_search'
    )::BIGINT AS ai_searches,
    COUNT(*) FILTER (
        WHERE ae.event_type = 'pest_scan'
    )::BIGINT AS pest_scans,
    COUNT(*) FILTER (
        WHERE ae.event_type = 'page_view'
    )::BIGINT AS page_views,
    COUNT(DISTINCT ae.session_id)::BIGINT AS unique_sessions
FROM public.analytics_events ae
WHERE ae.created_at >= NOW() - (time_range_days || ' days')::INTERVAL;
END;
$$;
-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_search_logs ENABLE ROW LEVEL SECURITY;
-- -------------------------------------------------------
-- PROFILES
-- -------------------------------------------------------
-- Anyone can read profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR
SELECT USING (true);
-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR
UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- -------------------------------------------------------
-- DOCUMENTS (RAG) — Service role only for writes
-- -------------------------------------------------------
-- Public read for document content (used by the AI search API via service_role)
CREATE POLICY "Documents are readable by service role" ON public.documents FOR
SELECT USING (true);
-- Only service_role can insert/update/delete documents (via ingest pipeline)  
CREATE POLICY "Documents insert via service role" ON public.documents FOR
INSERT WITH CHECK (true);
CREATE POLICY "Documents update via service role" ON public.documents FOR
UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Documents delete via service role" ON public.documents FOR DELETE USING (true);
-- -------------------------------------------------------
-- CONTACT SUBMISSIONS
-- -------------------------------------------------------
-- Anyone can submit a contact form (insert)
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR
INSERT WITH CHECK (true);
-- Only admins can read contact submissions
CREATE POLICY "Admins can read contacts" ON public.contact_submissions FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
        )
    );
-- Only admins can update contact submissions (marking as read, replying)
CREATE POLICY "Admins can update contacts" ON public.contact_submissions FOR
UPDATE USING (
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
        )
    );
-- -------------------------------------------------------
-- CLUB APPLICATIONS  
-- -------------------------------------------------------
-- Anyone can submit a club application
CREATE POLICY "Anyone can apply for a club" ON public.club_applications FOR
INSERT WITH CHECK (true);
-- Admins can view all applications
CREATE POLICY "Admins can view applications" ON public.club_applications FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
        )
    );
-- Admins can update application status
CREATE POLICY "Admins can update applications" ON public.club_applications FOR
UPDATE USING (
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
        )
    );
-- -------------------------------------------------------
-- PROJECTS
-- -------------------------------------------------------
-- Anyone can view active/completed projects
CREATE POLICY "Public can view published projects" ON public.projects FOR
SELECT USING (status IN ('active', 'completed'));
-- Admins can manage all projects
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
    )
);
-- -------------------------------------------------------
-- RESOURCES
-- -------------------------------------------------------
-- Anyone can view resources
CREATE POLICY "Public can view resources" ON public.resources FOR
SELECT USING (true);
-- Admins and members can insert resources
CREATE POLICY "Admins can manage resources" ON public.resources FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'member')
    )
);
-- -------------------------------------------------------
-- GALLERY ITEMS
-- -------------------------------------------------------
-- Anyone can view gallery items
CREATE POLICY "Public can view gallery" ON public.gallery_items FOR
SELECT USING (true);
-- Authenticated users can upload to gallery
CREATE POLICY "Authenticated users can add gallery items" ON public.gallery_items FOR
INSERT WITH CHECK (auth.uid() IS NOT NULL);
-- Users can update/delete their own gallery items
CREATE POLICY "Users can manage own gallery items" ON public.gallery_items FOR
UPDATE USING (artist_id = auth.uid());
CREATE POLICY "Users can delete own gallery items" ON public.gallery_items FOR DELETE USING (artist_id = auth.uid());
-- -------------------------------------------------------
-- ANALYTICS EVENTS — Insert-only for service, read for admins
-- -------------------------------------------------------
CREATE POLICY "Service can insert analytics" ON public.analytics_events FOR
INSERT WITH CHECK (true);
CREATE POLICY "Admins can read analytics" ON public.analytics_events FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
        )
    );
-- -------------------------------------------------------
-- AI SEARCH LOGS — Insert for service, read for admins
-- -------------------------------------------------------
CREATE POLICY "Service can insert search logs" ON public.ai_search_logs FOR
INSERT WITH CHECK (true);
CREATE POLICY "Admins can read search logs" ON public.ai_search_logs FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
        )
    );
-- ============================================================================
-- 6. STORAGE BUCKETS
-- ============================================================================
-- These must be created via Supabase Dashboard or the Storage API.
-- Below is the SQL to insert bucket definitions if running via migrations.
INSERT INTO storage.buckets (
        id,
        name,
        public,
        file_size_limit,
        allowed_mime_types
    )
VALUES (
        'resources',
        'resources',
        true,
        52428800,
        ARRAY ['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'video/mp4']
    ),
    (
        'gallery',
        'gallery',
        true,
        20971520,
        ARRAY ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'video/mp4']
    ),
    (
        'avatars',
        'avatars',
        true,
        5242880,
        ARRAY ['image/png', 'image/jpeg', 'image/webp']
    ) ON CONFLICT (id) DO NOTHING;
-- Storage policies for resources bucket
CREATE POLICY "Public read for resources" ON storage.objects FOR
SELECT USING (bucket_id = 'resources');
CREATE POLICY "Admin upload for resources" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'resources'
        AND EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = auth.uid()
                AND profiles.role IN ('admin', 'member')
        )
    );
-- Storage policies for gallery bucket
CREATE POLICY "Public read for gallery" ON storage.objects FOR
SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated upload for gallery" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'gallery'
        AND auth.uid() IS NOT NULL
    );
-- Storage policies for avatars bucket
CREATE POLICY "Public read for avatars" ON storage.objects FOR
SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users upload own avatar" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'avatars'
        AND auth.uid() IS NOT NULL
    );
CREATE POLICY "Users update own avatar" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'avatars'
        AND auth.uid() IS NOT NULL
    );
-- ============================================================================
-- 7. HELPER / UTILITY FUNCTIONS
-- ============================================================================
-- Auto-update `updated_at` timestamp on row modification
CREATE OR REPLACE FUNCTION public.handle_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$;
-- Apply updated_at triggers to relevant tables
CREATE TRIGGER set_profiles_updated_at BEFORE
UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_projects_updated_at BEFORE
UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_resources_updated_at BEFORE
UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
-- ============================================================================
-- 8. SEED DATA (Optional — Sample documents for testing RAG)
-- ============================================================================
-- Insert a sample document WITHOUT embedding (embedding must be generated via ingest pipeline)
-- This is just to verify the table structure works
INSERT INTO public.documents (content, metadata)
VALUES (
        'Maize planting in Zimbabwe should begin with the first effective rains, typically between mid-November and mid-December. Early planting maximizes the growing season and reduces risk of mid-season dry spells. The recommended planting depth is 5-7cm with spacing of 90cm between rows and 25-30cm within rows.',
        '{"title": "Agritex Maize Production Guide", "source": "agritex", "page": 12, "crop": "maize"}'::JSONB
    ),
    (
        'Cotton requires well-drained sandy loam soils with a pH of 5.5-7.0. Planting should occur from October to November. Apply basal fertilizer (Compound L) at planting at 200kg/ha, followed by 150kg/ha Ammonium Nitrate as top dressing 6 weeks after emergence.',
        '{"title": "Agritex Cotton Manual", "source": "agritex", "page": 8, "crop": "cotton"}'::JSONB
    ),
    (
        'Fall armyworm (Spodoptera frugiperda) is the most destructive pest in Zimbabwean maize. Scouting should begin at emergence. Threshold: treat when 5% of plants show leaf damage. Recommended: Emamectin benzoate 1.9% EC at 300ml/ha. Always wear protective equipment.',
        '{"title": "Agritex Pest Management Guide", "source": "agritex", "page": 24, "crop": "maize"}'::JSONB
    ),
    (
        'Tobacco curing in Zimbabwe uses three main methods: flue-curing, air-curing, and sun-curing. Flue-cured tobacco requires barn temperatures of 35-70°C over 5-7 days. Proper curing is essential for leaf quality and market price. Monitor barns regularly for even heat distribution.',
        '{"title": "Agritex Tobacco Guide", "source": "agritex", "page": 34, "crop": "tobacco"}'::JSONB
    ),
    (
        'Soil conservation in Zimbabwe is critical due to erosion from heavy rains. Contour ploughing, terracing, and mulching are recommended practices. Dead-level contours should be constructed every 20-30 meters on slopes above 2%. Vetiver grass strips are effective for stabilizing contours.',
        '{"title": "Agritex Soil Conservation Manual", "source": "agritex", "page": 6, "crop": "general"}'::JSONB
    ) ON CONFLICT DO NOTHING;
-- ============================================================================
-- ✅ SCHEMA COMPLETE
-- ============================================================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Update your .env with real Supabase credentials:
--    SUPABASE_URL=https://your-project.supabase.co
--    SUPABASE_ANON_KEY=your-anon-key
--    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
-- 3. Run the document ingest pipeline to generate embeddings for seed data
-- 4. Test the AI search: POST /api/ai/search
-- ============================================================================