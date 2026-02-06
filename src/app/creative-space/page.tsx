import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Palette, Camera, Feather, Video, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Creative Space | Climate Space Zimbabwe',
  description: 'Where statistics meet soul. A digital gallery for Zimbabwean climate art, photography, and storytelling.',
};

export default function CreativeSpacePage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 text-brand-cyan rounded-full text-sm font-bold mb-6">
              <Palette className="w-4 h-4" /> The Heart of the Data
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white mb-8 leading-tight">
              Statistics meet <span className="text-brand-gold">Soul</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8">
              We believe art has the power to make climate change personal. Explore our digital gallery of Zimbabwean stories, or share your own voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#gallery" variant="primary" size="lg">
                View Gallery
              </Button>
              <Button href="#submit" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-dark">
                Submit Work
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. GALLERY PREVIEW */}
      <Section variant="white" id="gallery">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Digital Gallery</h2>
            <p className="text-lg text-brand-dark/80">
              A collection of visual art, photography, and writing from across Zimbabwe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Art Item 1 */}
            <div className="group relative overflow-hidden rounded-2xl aspect-square bg-brand-dark/5">
               <Image 
                 src="https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=1200&q=100"
                 alt="The Dry River"
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
               <div className="absolute bottom-0 left-0 right-0 p-6">
                 <span className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-1 block">Photography</span>
                 <h3 className="text-white font-bold text-lg">The Dry River</h3>
                 <p className="text-white/80 text-sm">By Tawanda M.</p>
               </div>
            </div>
            {/* Art Item 2 */}
            <div className="group relative overflow-hidden rounded-2xl aspect-square bg-brand-dark/5">
               <Image 
                 src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=100"
                 alt="Solar Future"
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
               <div className="absolute bottom-0 left-0 right-0 p-6">
                 <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider mb-1 block">Digital Art</span>
                 <h3 className="text-white font-bold text-lg">Solar Future</h3>
                 <p className="text-white/80 text-sm">By Sarah K.</p>
               </div>
            </div>
            {/* Art Item 3 */}
            <div className="group relative overflow-hidden rounded-2xl aspect-square bg-brand-dark/5">
               <Image 
                 src="https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=1200&q=100"
                 alt="Green Shoots"
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
               <div className="absolute bottom-0 left-0 right-0 p-6">
                 <span className="text-xs font-bold text-brand-green uppercase tracking-wider mb-1 block">Poetry</span>
                 <h3 className="text-white font-bold text-lg">Green Shoots</h3>
                 <p className="text-white/80 text-sm">By Blessing C.</p>
               </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">Load More (Coming Soon)</Button>
          </div>
        </Container>
      </Section>

      {/* 3. SUBMISSION FLOW */}
      <Section variant="gray" id="submit">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-6">Share Your Story.</h2>
              <p className="text-lg text-brand-dark/80 mb-8">
                Are you an artist, photographer, or writer? We want to see climate change through your eyes.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg">Create</h4>
                    <p className="text-brand-dark/70">Produce a piece that connects to the environment (Art, Photo, Video, Writing).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg">Upload</h4>
                    <p className="text-brand-dark/70">Submit your work along with a 100-word story explaining its meaning.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 text-brand-gold font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-lg">Inspire</h4>
                    <p className="text-brand-dark/70">If selected, your work will be featured in our gallery and social channels.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                 <Button href="/contact" variant="primary" size="lg" icon={<Upload className="w-5 h-5"/>}>
                   Open Submission Form
                 </Button>
              </div>
            </div>

            <div className="bg-brand-surface p-8 rounded-3xl shadow-sm border border-brand-dark/5">
              <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-brand-gold" /> Submission Guidelines
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-dark/70"><span className="font-bold text-brand-dark">Relevance:</span> Must be connected to nature, climate, or sustainability.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-dark/70"><span className="font-bold text-brand-dark">No Disinformation:</span> We cannot host content that denies climate science.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-dark/70"><span className="font-bold text-brand-dark">Respect:</span> No hate speech or offensive content.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-dark/70"><span className="font-bold text-brand-dark">Originality:</span> No AI-generated art without full disclosure.</p>
                </li>
              </ul>
              
              <div className="mt-8 pt-8 border-t border-brand-dark/10">
                <h4 className="font-bold text-brand-dark mb-4">Accepted Formats</h4>
                <div className="flex gap-4 flex-wrap">
                   <div className="flex flex-col items-center gap-2 text-brand-dark/60">
                     <Camera className="w-6 h-6" />
                     <span className="text-xs">Photo</span>
                   </div>
                   <div className="flex flex-col items-center gap-2 text-brand-dark/60">
                     <Palette className="w-6 h-6" />
                     <span className="text-xs">Art</span>
                   </div>
                   <div className="flex flex-col items-center gap-2 text-brand-dark/60">
                     <Feather className="w-6 h-6" />
                     <span className="text-xs">Writing</span>
                   </div>
                   <div className="flex flex-col items-center gap-2 text-brand-dark/60">
                     <Video className="w-6 h-6" />
                     <span className="text-xs">Video</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
