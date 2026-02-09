import React from 'react';
import { Metadata } from 'next';
import { Leaf, LineChart, Brain, Palette, Calendar, Megaphone, GraduationCap, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Departments & Leadership | Climate Space Zimbabwe',
  description: 'Explore our operational departments, from Climate Programme to Creative, and meet the leadership driving our mission.',
};

export default function DepartmentsPage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="white" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20">
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-brand-dark mb-8 leading-tight">
              Our <span className="text-brand-green">Departments</span> & <br />Leadership.
            </h1>
            <p className="text-xl sm:text-2xl text-brand-dark/80 leading-relaxed mb-8 max-w-2xl">
              The engines of our impact. Each department is focused on a specific pillar of our mission, led by dedicated directors committed to action.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. DEPARTMENTS GRID */}
      <Section variant="gray">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Climate Programme Department */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Climate Programme</h3>
              <p className="text-xs font-bold text-brand-green uppercase tracking-wider mb-4">Lead: Climate Programme Director</p>
              <p className="text-brand-dark/70 text-sm mb-6 flex-grow">
                Oversees development and implementation of climate-related programmes.
              </p>
              <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                <ul className="text-sm text-brand-dark/70 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-brand-green mt-1">•</span> Community climate programmes</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green mt-1">•</span> Sustainability initiatives</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green mt-1">•</span> Stakeholder collaboration</li>
                  <li className="flex items-start gap-2"><span className="text-brand-green mt-1">•</span> Monitoring programme impact</li>
                </ul>
              </div>
            </div>

            {/* 2. Climate Research Department */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-brand-cyan/10 text-brand-cyan rounded-full flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Climate Research</h3>
              <p className="text-xs font-bold text-brand-cyan uppercase tracking-wider mb-4">Lead: Climate Research Director</p>
              <p className="text-brand-dark/70 text-sm mb-6 flex-grow">
                Leads research initiatives related to climate change.
              </p>
              <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                <ul className="text-sm text-brand-dark/70 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-brand-cyan mt-1">•</span> Climate research and data analysis</li>
                  <li className="flex items-start gap-2"><span className="text-brand-cyan mt-1">•</span> Publishing findings and recommendations</li>
                  <li className="flex items-start gap-2"><span className="text-brand-cyan mt-1">•</span> Supporting policy and programme design</li>
                </ul>
              </div>
            </div>

            {/* 3. AI Programme Department */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">AI Programme</h3>
              <p className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">Lead: AI Programme Director</p>
              <p className="text-brand-dark/70 text-sm mb-6 flex-grow">
                Develops and implements AI-based climate solutions.
              </p>
              <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                <ul className="text-sm text-brand-dark/70 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-1">•</span> AI-powered climate tools</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-1">•</span> Data-driven insights</li>
                  <li className="flex items-start gap-2"><span className="text-brand-gold mt-1">•</span> Ethical and responsible AI use</li>
                </ul>
              </div>
            </div>

            {/* 4. Creative Department */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Creative Department</h3>
              <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-4">Lead: Creative Department Director</p>
              <p className="text-brand-dark/70 text-sm mb-6 flex-grow">
                Oversees creative expression and content.
              </p>
              <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                <ul className="text-sm text-brand-dark/70 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">•</span> Visual and digital content creation</li>
                  <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">•</span> Storytelling and climate awareness</li>
                  <li className="flex items-start gap-2"><span className="text-purple-600 mt-1">•</span> Brand consistency across media</li>
                </ul>
              </div>
            </div>

            {/* 5. Events Coordination Department */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Events Coordination</h3>
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-4">Lead: Events Coordinating Director</p>
              <p className="text-brand-dark/70 text-sm mb-6 flex-grow">
                Plans and executes organizational events.
              </p>
              <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                <ul className="text-sm text-brand-dark/70 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-orange-600 mt-1">•</span> Conferences, workshops, dialogues</li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 mt-1">•</span> Campaign launches</li>
                  <li className="flex items-start gap-2"><span className="text-orange-600 mt-1">•</span> Event logistics and coordination</li>
                </ul>
              </div>
            </div>

            {/* 6. Public Relations Department */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-1">Public Relations</h3>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">Lead: Public Relations Director</p>
              <p className="text-brand-dark/70 text-sm mb-6 flex-grow">
                Manages public image and communications.
              </p>
              <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                <ul className="text-sm text-brand-dark/70 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Media relations</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Public communications</li>
                  <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span> Visibility and reputation building</li>
                </ul>
              </div>
            </div>

            {/* 7. Clubs and Societies Operations */}
            <div className="bg-white p-8 rounded-2xl border border-brand-dark/10 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-3 flex flex-col h-full">
              <div className="flex flex-col md:flex-row gap-8 items-start h-full">
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-grow flex flex-col h-full">
                  <h3 className="text-xl font-bold text-brand-dark mb-1">Clubs & Societies Operations</h3>
                  <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-4">Lead: Club and Societies Operational Officer</p>
                  <p className="text-brand-dark/70 text-sm mb-6">
                    Supports clubs and societies nationwide.
                  </p>
                  <div className="border-t border-brand-dark/5 pt-4 mt-auto">
                    <h4 className="text-xs font-bold text-brand-dark uppercase mb-2">Core Activities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start gap-2 text-sm text-brand-dark/70">
                        <span className="text-rose-600 mt-1">•</span> School and university clubs
                      </div>
                      <div className="flex items-start gap-2 text-sm text-brand-dark/70">
                        <span className="text-rose-600 mt-1">•</span> Community coordination
                      </div>
                      <div className="flex items-start gap-2 text-sm text-brand-dark/70">
                        <span className="text-rose-600 mt-1">•</span> Operational compliance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold font-heading text-brand-dark mb-4">Want to Make an Impact?</h2>
            <p className="text-brand-dark/70 mb-8 max-w-xl mx-auto">
              Each department is always looking for passionate individuals to join the cause. Find where you fit in.
            </p>
            <Button href="/get-involved" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Join a Department
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
