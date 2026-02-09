import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Users, Gavel, Scale, FileText, Lock, Eye, Leaf, LineChart, Brain, Palette, Calendar, Megaphone, GraduationCap, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Governance & Leadership | Climate Space Zimbabwe',
  description: 'Our organizational structure, leadership team, and commitment to transparency, accountability, and ethical governance.',
};

export default function GovernancePage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" /> Integrity First
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white mb-8 leading-tight">
              Leadership & <br /> <span className="text-brand-green">Governance</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Transparency, Accountability, and Action. We are built on a foundation of trust, ensuring every resource serves our mission.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. PHILOSOPHY & ETHICS */}
      <Section variant="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Built on Trust.</h2>
              <p className="text-lg text-brand-dark/80 mb-6">
                We don't hide behind bureaucracy. Our governance structure is designed to be lean, ethical, and effective, ensuring that our impact is real and our operations are transparent.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-green/10 p-2 rounded-lg mt-1">
                    <Eye className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark">Financial Transparency</h3>
                    <p className="text-brand-dark/70 text-sm">We publish our annual financial reports openly for public scrutiny.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-green/10 p-2 rounded-lg mt-1">
                    <Gavel className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark">Code of Conduct</h3>
                    <p className="text-brand-dark/70 text-sm">Zero tolerance for corruption, harassment, or unethical behavior.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-brand-green/10 p-2 rounded-lg mt-1">
                    <Scale className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark">Conflict of Interest</h3>
                    <p className="text-brand-dark/70 text-sm">Mandatory annual declarations for all leaders to prevent bias.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-brand-surface p-8 rounded-2xl border border-brand-dark/10 shadow-sm">
               <h3 className="text-xl font-bold text-brand-dark mb-6 border-b border-brand-dark/10 pb-4">Policy Documents</h3>
               <ul className="space-y-3">
                 <li className="flex items-center justify-between group cursor-pointer hover:bg-brand-dark/5 p-2 rounded-lg transition-colors">
                   <div className="flex items-center gap-3">
                     <FileText className="w-5 h-5 text-brand-dark/50" />
                     <span className="text-brand-dark font-medium">Constitution.pdf</span>
                   </div>
                   <Button variant="ghost" size="sm" className="text-brand-green">Download</Button>
                 </li>
                 <li className="flex items-center justify-between group cursor-pointer hover:bg-brand-dark/5 p-2 rounded-lg transition-colors">
                   <div className="flex items-center gap-3">
                     <Lock className="w-5 h-5 text-brand-dark/50" />
                     <span className="text-brand-dark font-medium">Privacy Policy</span>
                   </div>
                   <Button variant="ghost" size="sm" className="text-brand-green">View</Button>
                 </li>
                 <li className="flex items-center justify-between group cursor-pointer hover:bg-brand-dark/5 p-2 rounded-lg transition-colors">
                   <div className="flex items-center gap-3">
                     <FileText className="w-5 h-5 text-brand-dark/50" />
                     <span className="text-brand-dark font-medium">Annual Report 2025</span>
                   </div>
                   <Button variant="ghost" size="sm" className="text-brand-green">Download</Button>
                 </li>
               </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. ORGANIZATIONAL STRUCTURE */}
      <Section variant="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Organizational Structure</h2>
            <p className="text-lg text-brand-dark/80">
              A clear hierarchy designed for action, balancing strategic oversight with operational agility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-brand-dark/10 -z-10"></div>

            {/* Level 1: Board */}
            <div className="md:col-span-3 flex justify-center mb-8 md:mb-0">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/10 text-center max-w-md w-full relative z-10">
                <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">The Board</h3>
                <p className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">Oversight</p>
                <p className="text-brand-dark/70 text-sm mb-4">
                  Guardians of the Mission. Responsible for strategy approval, budget oversight, and ensuring legal compliance.
                </p>
                <ul className="text-sm text-brand-dark/60 space-y-1">
                  <li>• Meets Quarterly</li>
                  <li>• Selects Executive Director</li>
                </ul>
              </div>
            </div>

            {/* Level 2: Executive Committee */}
            <div className="md:col-start-2 flex justify-center mb-8 md:mb-0">
               {/* Vertical Line from Board */}
               <div className="hidden md:block absolute top-[130px] left-1/2 h-16 w-0.5 bg-brand-dark/10 -z-10"></div>
               
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/10 text-center w-full relative z-10">
                <div className="w-12 h-12 bg-brand-cyan/10 text-brand-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Executive Committee</h3>
                <p className="text-xs font-bold text-brand-cyan uppercase tracking-wider mb-4">Strategy</p>
                <p className="text-brand-dark/70 text-sm mb-4">
                  Led by the Executive Director. Responsible for daily operations, technical development, and creative output.
                </p>
                <ul className="text-sm text-brand-dark/60 space-y-1">
                  <li>• Executive Director</li>
                  <li>• Dir. Operations</li>
                  <li>• Dir. Technology & Creative</li>
                </ul>
              </div>
            </div>

            {/* Level 3: Departments (Visual Representation only, conceptually under Exec) */}
          </div>
          
          <div className="mt-20">
             <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Departments & Leadership</h2>
               <p className="text-lg text-brand-dark/80 mb-8">
                 Our operational engines. Each department is led by a dedicated director or officer to ensure focused impact and accountability.
               </p>
               <Button href="/departments" variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                 View All Departments
               </Button>
             </div>
          </div>
        </Container>
      </Section>

      {/* 4. OPEN DOOR POLICY CTA */}
      <Section variant="green">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
             <h2 className="text-3xl font-bold font-heading text-white mb-6">Open Door Policy</h2>
             <p className="text-white/90 text-lg mb-8">
               We believe in listening. Any member or partner can report issues or suggest ideas directly to our leadership.
             </p>
             <Button href="/contact" variant="accent" size="lg">
               Contact Leadership
             </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
