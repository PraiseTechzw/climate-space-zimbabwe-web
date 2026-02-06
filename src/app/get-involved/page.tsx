import React from 'react';
import { Metadata } from 'next';
import { UserPlus, Users, GraduationCap, Sprout, Heart, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Get Involved | Climate Space Zimbabwe',
  description: 'Join the movement. Become a member, start a Climate Space Club, or support our mission.',
};

export default function GetInvolvedPage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="green" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20 text-center mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <UserPlus className="w-4 h-4" /> Join the Movement
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white mb-8 leading-tight">
              Don't just watch. <br /> <span className="text-brand-gold">Take Action.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Climate action grows from the ground up. Whether you're a student, farmer, or creative, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#membership" variant="accent" size="lg">
                Become a Member
              </Button>
              <Button href="#clubs" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-green">
                Start a Club
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. MEMBERSHIP LEVELS */}
      <Section variant="white" id="membership">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Who Can Join?</h2>
            <p className="text-lg text-brand-dark/80">
              Climate Space is open to everyone who shares our vision for a sustainable Zimbabwe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Junior Member */}
            <div className="bg-brand-surface p-8 rounded-2xl border border-brand-dark/10 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Sprout className="w-24 h-24 text-brand-green" />
               </div>
               <h3 className="text-2xl font-bold text-brand-dark mb-2">Junior Member</h3>
               <p className="text-brand-green font-bold text-sm uppercase tracking-wider mb-6">Under 18</p>
               <p className="text-brand-dark/70 mb-6">For primary and high school students passionate about the environment.</p>
               <ul className="space-y-3 mb-8">
                 <li className="flex gap-3 text-sm text-brand-dark/80"><Check className="w-5 h-5 text-brand-green"/> Join a School Club</li>
                 <li className="flex gap-3 text-sm text-brand-dark/80"><Check className="w-5 h-5 text-brand-green"/> Access to competitions</li>
                 <li className="flex gap-3 text-sm text-brand-dark/80"><Check className="w-5 h-5 text-brand-green"/> Volunteer certificates</li>
               </ul>
               <Button href="/contact" variant="outline" className="w-full">Join via School</Button>
            </div>

            {/* Full Member */}
            <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-xl transform md:-translate-y-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Users className="w-24 h-24 text-brand-gold" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Full Member</h3>
               <p className="text-brand-gold font-bold text-sm uppercase tracking-wider mb-6">18+ Years</p>
               <p className="text-white/70 mb-6">For university students, professionals, farmers, and activists.</p>
               <ul className="space-y-3 mb-8">
                 <li className="flex gap-3 text-sm text-white/80"><Check className="w-5 h-5 text-brand-gold"/> Voting rights</li>
                 <li className="flex gap-3 text-sm text-white/80"><Check className="w-5 h-5 text-brand-gold"/> Access to AI Tools</li>
                 <li className="flex gap-3 text-sm text-white/80"><Check className="w-5 h-5 text-brand-gold"/> Networking events</li>
               </ul>
               <Button href="/contact" variant="primary" className="w-full">Register Now</Button>
            </div>

            {/* Institutional Member */}
            <div className="bg-brand-surface p-8 rounded-2xl border border-brand-dark/10 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <GraduationCap className="w-24 h-24 text-brand-cyan" />
               </div>
               <h3 className="text-2xl font-bold text-brand-dark mb-2">Institutional</h3>
               <p className="text-brand-cyan font-bold text-sm uppercase tracking-wider mb-6">Schools & Corps</p>
               <p className="text-brand-dark/70 mb-6">For schools, universities, and corporate partners looking to collaborate.</p>
               <ul className="space-y-3 mb-8">
                 <li className="flex gap-3 text-sm text-brand-dark/80"><Check className="w-5 h-5 text-brand-cyan"/> Start a Chapter</li>
                 <li className="flex gap-3 text-sm text-brand-dark/80"><Check className="w-5 h-5 text-brand-cyan"/> Brand partnership</li>
                 <li className="flex gap-3 text-sm text-brand-dark/80"><Check className="w-5 h-5 text-brand-cyan"/> CSR opportunities</li>
               </ul>
               <Button href="/contact" variant="outline" className="w-full">Partner with Us</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. CLIMATE CLUBS */}
      <Section variant="gray" id="clubs">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold mb-6">
                 <Users className="w-4 h-4" /> The Engine of the Movement
              </div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Climate Space Clubs</h2>
              <p className="text-lg text-brand-dark/80 mb-8">
                We operate through a network of decentralized chapters. Clubs are the heartbeat of our action, driving local change in schools, universities, and communities.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-dark/5">
                  <h4 className="font-bold text-brand-dark text-lg mb-2">School Clubs</h4>
                  <p className="text-brand-dark/70 text-sm">Led by a teacher patron. Focus on education, tree planting, and recycling projects.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-dark/5">
                  <h4 className="font-bold text-brand-dark text-lg mb-2">Uni Chapters</h4>
                  <p className="text-brand-dark/70 text-sm">Led by student guilds. Focus on research, innovation, and advocacy campaigns.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-dark/5">
                  <h4 className="font-bold text-brand-dark text-lg mb-2">Community Hubs</h4>
                  <p className="text-brand-dark/70 text-sm">Led by local leaders. Focus on practical adaptation like community gardens.</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-dark text-white p-10 rounded-3xl relative overflow-hidden">
               {/* Decorative Circle */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl"></div>
               
               <h3 className="text-2xl font-bold font-heading mb-8 relative z-10">How to Start a Club</h3>
               <div className="space-y-8 relative z-10">
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 font-bold text-sm">1</div>
                   <div>
                     <h5 className="font-bold mb-1">Gather</h5>
                     <p className="text-white/70 text-sm">Find 5 interested members and 1 patron.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 font-bold text-sm">2</div>
                   <div>
                     <h5 className="font-bold mb-1">Register</h5>
                     <p className="text-white/70 text-sm">Submit the "New Chapter Application" online.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0 font-bold text-sm">3</div>
                   <div>
                     <h5 className="font-bold mb-1">Launch</h5>
                     <p className="text-white/70 text-sm">Host a launch event (cleanup or planting day).</p>
                   </div>
                 </div>
               </div>
               
               <div className="mt-10 relative z-10">
                 <Button href="/contact" variant="primary" className="w-full" icon={<ArrowRight className="w-4 h-4"/>}>
                   Apply to Start a Chapter
                 </Button>
               </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {/* 4. DONATE / SUPPORT */}
      <Section variant="white">
        <Container>
          <div className="bg-brand-gold/10 rounded-3xl p-8 sm:p-16 text-center">
             <Heart className="w-12 h-12 text-brand-gold mx-auto mb-6" />
             <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Support Our Mission</h2>
             <p className="text-lg text-brand-dark/80 max-w-2xl mx-auto mb-8">
               Your donation helps us provide free AI tools to farmers and art supplies to students.
             </p>
             <Button href="/contact" variant="primary" size="lg">
               Donate Now
             </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
