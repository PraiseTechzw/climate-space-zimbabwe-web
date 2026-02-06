import React from 'react';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Users, Lightbulb, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us | Climate Space Zimbabwe',
  description: 'Our mission is to harness AI and creativity to empower communities and foster sustainable development in Zimbabwe.',
};

export default function AboutPage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      {/* Source: BRAND_DNA.md (Brand Essence) */}
      <Section variant="white" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20">
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-brand-dark mb-8 leading-tight">
              Science meets Soul.
            </h1>
            <p className="text-xl sm:text-2xl text-brand-dark/80 leading-relaxed mb-8">
              We exist to harness the power of <span className="text-brand-cyan font-bold">Artificial Intelligence</span> and <span className="text-brand-gold font-bold">Creative Expression</span> to empower communities, advocate for climate action, and foster sustainable development in Zimbabwe.
            </p>
            <div className="h-1 w-24 bg-brand-green rounded-full"></div>
          </div>
        </Container>
      </Section>

      {/* 2. VISION & MISSION */}
      {/* Source: BRAND_DNA.md (Core Purpose, Values) */}
      <Section variant="gray">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-brand-surface p-8 rounded-2xl shadow-sm border border-brand-dark/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold mb-6">
                <Lightbulb className="w-4 h-4" /> Vision
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">Empowerment through Innovation</h2>
              <p className="text-brand-dark/70 leading-relaxed">
                To empower the community through innovative artificial intelligence and creative solutions, fostering a sustainable future and meaningful environmental impact.
              </p>
            </div>
            <div className="bg-brand-surface p-8 rounded-2xl shadow-sm border border-brand-dark/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 text-brand-cyan rounded-full text-sm font-bold mb-6">
                <Users className="w-4 h-4" /> Mission
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">Analyze, Educate, Inspire</h2>
              <p className="text-brand-dark/70 leading-relaxed">
                To integrate cutting-edge AI and creative expressions to analyze data, educate citizens, and inspire action through environmental efforts.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. WHAT WE DO */}
      {/* Source: BRAND_DNA.md (What We Stand For) */}
      <Section variant="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">What We Stand For</h2>
            <p className="text-lg text-brand-dark/70">
              We move beyond awareness. We provide the structural tools for resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-brand-cyan font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Innovation (AI)</h3>
              <p className="text-brand-dark/70">
                Leveraging cutting-edge AI to find new solutions for age-old climate challenges, from rainfall prediction to crop planning.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-brand-gold font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Creativity (Art)</h3>
              <p className="text-brand-dark/70">
                Using art and storytelling to make climate action accessible, engaging, and deeply human.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-brand-green font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Empowerment</h3>
              <p className="text-brand-dark/70">
                Providing tools and platforms for farmers, youth, and communities to lead their own resilience.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. WHO WE SERVE */}
      {/* Source: SITEMAP.md (User Journey Highlights) */}
      <Section variant="gray">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Local Roots, Global Impact.</h2>
              <p className="text-lg text-brand-dark/70 mb-6 leading-relaxed">
                We don't believe in "beneficiaries." We believe in partners. Our work is designed to serve those who are building Zimbabwe's future.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
                  <span className="text-brand-dark/80"><strong>Farmers:</strong> Accessing real-time data to secure harvests.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
                  <span className="text-brand-dark/80"><strong>Youth & Students:</strong> Leading climate clubs in schools and universities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
                  <span className="text-brand-dark/80"><strong>Creatives:</strong> Using their talent to tell the story of our environment.</span>
                </li>
              </ul>
            </div>
            <div className="relative">
               {/* Abstract visual for community */}
               <div className="aspect-video bg-brand-dark rounded-2xl overflow-hidden relative">
                 <div className="absolute inset-0 bg-brand-green/20 mix-blend-overlay"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-brand-surface/20 font-heading text-6xl font-bold">Community</span>
                 </div>
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. TRUST & TRANSPARENCY */}
      {/* Source: BRAND_DNA.md (Governance reference) */}
      <Section variant="white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-full mb-6">
              <ShieldCheck className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Built on Trust.</h2>
            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
              We operate with radical transparency. Our governance structure ensures accountability at every level, from our Board to our grassroots chapters. We don't hide behind bureaucracy; we focus on action.
            </p>
            <Button href="/about/governance" variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
              View Leadership Structure
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. FINAL CTA */}
      {/* Source: SITEMAP.md (Primary User Action) */}
      <Section variant="green" spacing="lg">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brand-surface mb-6">
              Be part of the solution.
            </h2>
            <p className="text-xl text-brand-surface/90 mb-10 max-w-2xl mx-auto">
              Join a movement that combines the precision of science with the power of creativity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/get-involved" variant="accent" size="lg">
                Join the Movement
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
