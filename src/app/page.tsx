import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sprout, Cpu, Palette, Users, BarChart3, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function Home() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-surface">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
           <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="max-w-2xl">
               {/* Badge */}
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                  </span>
                  Innovating for Zimbabwe
               </div>
               <h1 className="text-5xl sm:text-7xl font-bold font-heading text-brand-dark tracking-tight mb-6 leading-[1.1]">
                  Climate Action meets <span className="text-brand-green">Intelligence</span>.
               </h1>
               <p className="text-lg sm:text-xl text-brand-dark/70 mb-8 leading-relaxed max-w-lg">
                  We are a youth-led movement fusing Artificial Intelligence with Creative Arts to build climate resilience in Zimbabwe.
               </p>
               <div className="flex flex-wrap gap-4">
                  <Button href="/solutions" variant="primary" size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all">
                    Our Solutions
                  </Button>
                  <Button href="/creative" variant="outline" size="lg" className="rounded-full px-8">
                     View Gallery
                  </Button>
               </div>
            </div>

            {/* Image Highlights / Grid */}
            <div className="relative hidden lg:block">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                     <div className="h-64 bg-stone-100 rounded-2xl overflow-hidden relative group border border-stone-200">
                        <Image 
                          src="https://images.unsplash.com/photo-1592982537496-c5c62e8260d7?auto=format&fit=crop&w=1200&q=100"
                          alt="Smart Farming - Maize Field"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                           <p className="text-white text-sm font-bold">Smart Farming</p>
                        </div>
                     </div>
                     <div className="h-48 bg-brand-green/5 rounded-2xl overflow-hidden relative flex items-center justify-center border border-brand-green/10">
                        <Sprout className="w-12 h-12 text-brand-green opacity-50" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-48 bg-brand-gold/5 rounded-2xl overflow-hidden relative flex items-center justify-center border border-brand-gold/10">
                        <Palette className="w-12 h-12 text-brand-gold opacity-50" />
                     </div>
                     <div className="h-64 bg-stone-100 rounded-2xl overflow-hidden relative group border border-stone-200">
                         <Image 
                           src="https://images.unsplash.com/photo-1560964645-4c9570117465?auto=format&fit=crop&w=1200&q=100"
                           alt="Community Art - Abstract Expression"
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                         <div className="absolute bottom-4 left-4 right-4">
                           <p className="text-white text-sm font-bold">Community Art</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Decorative elements */}
               <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE PROBLEM VS SOLUTION */}
      <Section variant="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light rounded-full text-brand-green font-bold text-sm mb-6">
                <CloudRain className="w-4 h-4" />
                <span>The Challenge</span>
              </div>
              <h2 className="text-4xl font-bold font-heading text-brand-dark mb-6">
                The rains are changing. <br/>Are we?
              </h2>
              <p className="text-lg text-brand-dark/80 mb-6 leading-relaxed">
                For generations, our farmers relied on predictable seasons. Today, those patterns are broken. Droughts are longer, and storms are stronger.
              </p>
              <p className="text-lg text-brand-dark/80 leading-relaxed font-medium">
                We don't just talk about the problem. We build the structural response.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-brand-light rounded-2xl border border-brand-dark/10">
                <Cpu className="w-10 h-10 text-brand-cyan mb-4" />
                <h3 className="text-xl font-bold text-brand-dark mb-2">AI Tools</h3>
                <p className="text-brand-dark/80">Data-driven insights for smarter planting decisions.</p>
              </div>
              <div className="p-6 bg-brand-light rounded-2xl border border-brand-dark/10">
                <Palette className="w-10 h-10 text-brand-gold mb-4" />
                <h3 className="text-xl font-bold text-brand-dark mb-2">Creative Action</h3>
                <p className="text-brand-dark/80">Storytelling that makes climate science accessible to all.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. FEATURED TOOL: AGRI-SEARCH */}
      <Section variant="gray">
        <Container>
          <div className="bg-brand-dark rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-brand-green/20 blur-3xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-16 relative z-10 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brand-surface mb-6">
                  Meet the Agri-Search Engine.
                </h2>
                <p className="text-lg text-brand-surface/80 mb-8 leading-relaxed">
                  A smart tool that learns from past seasons to tell you exactly when to plant. No complex jargon. Just clear, actionable advice for Zimbabwean farmers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/solutions" variant="primary" icon={<Sprout className="w-5 h-5" />}>
                    Try the Tool
                  </Button>
                  <Button href="/solutions" variant="ghost" className="text-brand-surface hover:bg-brand-surface/10 hover:text-brand-surface">
                    How it works
                  </Button>
                </div>
              </div>
              {/* Abstract Visual Representation of the Tool */}
              <div className="bg-brand-surface/5 backdrop-blur-sm rounded-xl p-6 border border-brand-surface/10">
                <div className="flex items-center gap-4 mb-6 border-b border-brand-surface/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-brand-gold"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-gold-light"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                  <span className="text-xs text-brand-surface/50 font-mono">agri-search-v1.0</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between text-white/80">
                    <span> Location:</span>
                    <span className="text-brand-green-light">Masvingo</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span> Crop:</span>
                    <span className="text-brand-gold">Maize (SC 513)</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span> Soil Moisture:</span>
                    <span className="text-brand-green-light">Optimal</span>
                  </div>
                  <div className="p-4 bg-brand-green/20 border border-brand-green/30 rounded text-brand-green-light mt-4">
                    Recommendation: Planting window opens Nov 24. 85% confidence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. CREATIVE SPACE & LATEST WORKS */}
      <Section variant="white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-heading text-brand-dark mb-6">Art Tells the Truth.</h2>
            <p className="text-lg text-brand-dark/80">
              Data informs the mind, but stories move the heart. Explore our digital gallery of climate resilience, featuring works from young Zimbabwean artists.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Art Cards */}
            {[
              { id: 1, title: "The Drought's End", type: "Digital Illustration", src: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=1200&q=100" },
              { id: 2, title: "Solar Future", type: "Photography", src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=100" },
              { id: 3, title: "Green Hope", type: "Mixed Media", src: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=1200&q=100" }
            ].map((item) => (
              <div key={item.id} className="group relative aspect-[4/5] bg-brand-light rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <Image 
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-white/80 text-sm">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button href="/creative" variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
              View Full Gallery
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6. FINAL CTA */}
      <Section variant="white" spacing="lg">
        <Container>
          <div className="bg-brand-light rounded-3xl p-12 sm:p-20 text-center border border-brand-dark/10">
            <h2 className="text-4xl font-bold font-heading text-brand-dark mb-6">Ready to Act?</h2>
            <p className="text-xl text-brand-dark/80 mb-10 max-w-2xl mx-auto">
              Whether you're a farmer needing data, an artist with a story, or a partner with resources—there is a space for you here.
            </p>
            <Button href="/get-involved" variant="accent" size="lg" icon={<Users className="w-5 h-5" />}>
              Get Involved Today
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
