import React from 'react';
import { Metadata } from 'next';
import { Search, CloudSun, Bug, ShieldAlert, ArrowRight, BrainCircuit, Sprout, Globe } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { AgriSearchTool } from '@/components/solutions/AgriSearchTool';

export const metadata: Metadata = {
  title: 'Climate Space AI | Climate Space Zimbabwe',
  description: 'An intelligent agri-search engine powered by AI to provide localized farming advisory, weather interpretation, and pest identification for Zimbabwe.',
};

export default function SolutionsPage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="white" className="relative overflow-hidden pb-0 sm:pb-0">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 text-brand-cyan rounded-full text-sm font-bold mb-6">
              <BrainCircuit className="w-4 h-4" /> Introducing Climate Space AI
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-brand-dark mb-8 leading-tight">
              Intelligent Agriculture <br /> for <span className="text-brand-green">Zimbabwe</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-brand-dark/80 leading-relaxed mb-8">
              We're building the future of farming assistance. A localized, AI-powered search engine designed to help farmers, students, and researchers make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button href="#features" variant="primary" size="lg">
                Explore Features
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Request API Access
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 1.5 LIVE DEMO */}
      <Section variant="white" className="pt-0 -mt-12 relative z-10">
        <Container>
          <AgriSearchTool />
        </Container>
      </Section>

      {/* 2. CORE FEATURES */}
      <Section variant="gray" id="features">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Powered by Local Knowledge</h2>
            <p className="text-lg text-brand-dark/80">
              Generic AI isn't enough. Our models are tuned to Zimbabwe's specific ecological zones, relying on trusted data sources like Agritex and MSD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1: Agri-Search */}
            <div className="bg-brand-surface p-8 rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Agri-Search Engine</h3>
              <p className="text-brand-dark/80 mb-4">
                Ask questions in plain English or local languages. Get answers about planting seasons, soil types, and crop varieties specific to your region.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark/60">
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-green" /> Crop recommendations</li>
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-green" /> Soil preparation tips</li>
              </ul>
            </div>

            {/* Feature 2: Weather Interpretation */}
            <div className="bg-brand-surface p-8 rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6">
                <CloudSun className="w-7 h-7 text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Weather Analytics</h3>
              <p className="text-brand-dark/80 mb-4">
                We don't just show the temperature. We interpret MSD data to tell you what it means for your specific crops and livestock.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark/60">
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-cyan" /> Rainfall patterns</li>
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-cyan" /> Drought alerts</li>
              </ul>
            </div>

            {/* Feature 3: Pest ID */}
            <div className="bg-brand-surface p-8 rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                <Bug className="w-7 h-7 text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Pest Identification</h3>
              <p className="text-brand-dark/80 mb-4">
                Upload a photo or describe symptoms. Our AI identifies common Zimbabwean pests and suggests approved, sustainable remedies.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark/60">
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-gold" /> Early detection</li>
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-gold" /> Integrated Pest Management</li>
              </ul>
            </div>
            {/* Feature 4: Smart Climate Space */}
            <div className="bg-brand-surface p-8 rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Smart Climate Space</h3>
              <p className="text-brand-dark/80 mb-4">
                An interconnected digital ecosystem where youth, creatives, and tech enthusiasts collaborate on building and deploying climate resilience solutions.
              </p>
              <ul className="space-y-2 text-sm text-brand-dark/60">
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-green" /> Open collaboration</li>
                <li className="flex items-center gap-2"><Sprout className="w-4 h-4 text-brand-green" /> Smart integrations</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. ETHICS & GUARDRAILS */}
      <Section variant="white">
        <Container>
          <div className="bg-brand-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/20 text-brand-gold rounded-full text-sm font-bold mb-6 border border-brand-gold/30">
                  <ShieldAlert className="w-4 h-4" /> Ethical AI Guardrails
                </div>
                <h2 className="text-3xl font-bold font-heading mb-6">Responsible Innovation.</h2>
                <p className="text-lg text-white/80 mb-6">
                  We believe technology must be safe to be useful. Climate Space AI is built with strict operational boundaries to protect our users.
                </p>
                <Button href="/about" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-dark">
                  Read our Tech Policy
                </Button>
              </div>

              <div className="flex-1 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">No Real-Time Forecasting</h4>
                      <p className="text-sm text-white/60">We rely on official MSD forecasts, avoiding AI hallucinations regarding immediate weather events.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Source Prioritization</h4>
                      <p className="text-sm text-white/60">Our model prioritizes Zimbabwean data sources (Agritex, local research) over generic global data.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-white">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Advisory, Not Law</h4>
                      <p className="text-sm text-white/60">AI provides information, not legal or medical advice. Critical decisions should always involve human experts.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. CTA */}
      <Section variant="green" spacing="lg">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-6">
              Ready to grow smarter?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join the waiting list for the Climate Space AI beta and be among the first to access our tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/get-involved" variant="accent" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Join the Beta
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
