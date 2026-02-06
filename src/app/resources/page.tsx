import React from 'react';
import { Metadata } from 'next';
import { BookOpen, FileText, Download, ArrowRight, Newspaper } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Resources | Climate Space Zimbabwe',
  description: 'Access our climate library, data reports, and latest news. Democratizing climate knowledge for everyone.',
};

export default function ResourcesPage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold mb-6">
              <BookOpen className="w-4 h-4" /> Knowledge is Power
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white mb-8 leading-tight">
              Resources & <br /> <span className="text-brand-cyan">Research</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              We believe in democratizing access to information. Explore our library of guides, reports, and insights on climate change in Zimbabwe.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. CLIMATE LIBRARY */}
      <Section variant="white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4">Climate Library</h2>
              <p className="text-lg text-brand-dark/80 max-w-2xl">
                Simple, accessible guides designed for students, farmers, and educators.
              </p>
            </div>
            <Button variant="outline" href="#">View Full Archive</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Resource Card 1 */}
             <div className="group border border-brand-dark/10 rounded-2xl p-6 hover:shadow-md transition-shadow bg-brand-surface">
               <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                 <FileText className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-brand-dark mb-2">Climate Change 101</h3>
               <p className="text-brand-dark/70 text-sm mb-6">A beginner's guide to understanding global warming and its impact on Zimbabwe.</p>
               <Button variant="ghost" size="sm" className="text-brand-green pl-0 hover:bg-transparent flex items-center gap-2">
                 Download PDF <Download className="w-4 h-4" />
               </Button>
             </div>

             {/* Resource Card 2 */}
             <div className="group border border-brand-dark/10 rounded-2xl p-6 hover:shadow-md transition-shadow bg-brand-surface">
               <div className="w-12 h-12 bg-brand-cyan/10 text-brand-cyan rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                 <FileText className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-brand-dark mb-2">Water Harvesting Guide</h3>
               <p className="text-brand-dark/70 text-sm mb-6">Practical techniques for capturing and storing rainwater for small-scale farming.</p>
               <Button variant="ghost" size="sm" className="text-brand-green pl-0 hover:bg-transparent flex items-center gap-2">
                 Download PDF <Download className="w-4 h-4" />
               </Button>
             </div>

             {/* Resource Card 3 */}
             <div className="group border border-brand-dark/10 rounded-2xl p-6 hover:shadow-md transition-shadow bg-brand-surface">
               <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                 <FileText className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-brand-dark mb-2">Drought-Resistant Crops</h3>
               <p className="text-brand-dark/70 text-sm mb-6">A catalogue of small grains and legumes suitable for Zimbabwe's arid regions.</p>
               <Button variant="ghost" size="sm" className="text-brand-green pl-0 hover:bg-transparent flex items-center gap-2">
                 Download PDF <Download className="w-4 h-4" />
               </Button>
             </div>
          </div>
        </Container>
      </Section>

      {/* 3. LATEST NEWS */}
      <Section variant="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">News & Updates</h2>
            <p className="text-lg text-brand-dark/80">
              Stories from the field, organization updates, and success stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* News Item 1 */}
             <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
               <div className="md:w-1/3 bg-brand-dark/10 h-48 md:h-auto flex items-center justify-center">
                 <Newspaper className="w-12 h-12 text-brand-dark/20" />
               </div>
               <div className="p-8 md:w-2/3">
                 <span className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2 block">Feb 2026</span>
                 <h3 className="text-xl font-bold text-brand-dark mb-3">Launching the Climate Space AI Beta</h3>
                 <p className="text-brand-dark/70 text-sm mb-6">We are thrilled to announce the limited release of our AI-powered agricultural assistant.</p>
                 <a href="#" className="text-brand-green font-bold text-sm flex items-center gap-1 hover:underline">Read Story <ArrowRight className="w-3 h-3"/></a>
               </div>
             </div>

             {/* News Item 2 */}
             <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
               <div className="md:w-1/3 bg-brand-dark/10 h-48 md:h-auto flex items-center justify-center">
                 <Newspaper className="w-12 h-12 text-brand-dark/20" />
               </div>
               <div className="p-8 md:w-2/3">
                 <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider mb-2 block">Jan 2026</span>
                 <h3 className="text-xl font-bold text-brand-dark mb-3">Community Hubs expand to Masvingo</h3>
                 <p className="text-brand-dark/70 text-sm mb-6">Three new chapters have opened in Masvingo province, focusing on water conservation.</p>
                 <a href="#" className="text-brand-green font-bold text-sm flex items-center gap-1 hover:underline">Read Story <ArrowRight className="w-3 h-3"/></a>
               </div>
             </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
