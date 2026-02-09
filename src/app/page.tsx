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
                     <div className="h-64 bg-stone-100 rounded-2xl overflow-hidden relative group border border-stone-200 shadow-lg hover:shadow-2xl transition-all duration-500">
                        <Image 
                          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80"
                          alt="Smart Farming - Maize Field"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                           <p className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                             Smart Farming
                           </p>
                        </div>
                     </div>
                     <div className="h-48 bg-gradient-to-br from-brand-green/10 to-brand-green/5 rounded-2xl overflow-hidden relative flex items-center justify-center border border-brand-green/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Sprout className="w-16 h-16 text-brand-green drop-shadow-sm transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-48 bg-gradient-to-br from-brand-gold/10 to-brand-gold/5 rounded-2xl overflow-hidden relative flex items-center justify-center border border-brand-gold/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Palette className="w-16 h-16 text-brand-gold drop-shadow-sm transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500" />
                     </div>
                     <div className="h-64 bg-stone-100 rounded-2xl overflow-hidden relative group border border-stone-200 shadow-lg hover:shadow-2xl transition-all duration-500">
                         <Image 
                          src="https://images.unsplash.com/photo-1570095378004-ce65d6c2d5bb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1200&q=80"
                          alt="Climate Justice Now - Community Art"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                         <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                           <p className="text-white text-sm font-bold tracking-wide flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                             Community Art
                           </p>
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
      <Section variant="white" className="relative overflow-hidden">
        {/* Background decorative element for the Challenge section */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-full bg-gradient-to-r from-red-50/50 to-transparent -z-10 blur-3xl opacity-60" />

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full text-red-600 font-bold text-sm mb-6 animate-fade-in">
                <CloudRain className="w-4 h-4" />
                <span>The Reality</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading text-brand-dark mb-6 leading-tight">
                The rains are changing. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Are we?</span>
              </h2>
              <div className="prose prose-lg text-brand-dark/80 mb-8">
                <p className="leading-relaxed">
                  For generations, our farmers relied on predictable seasons. Today, those patterns are <span className="font-semibold text-red-500">broken</span>. 
                </p>
                <p className="leading-relaxed">
                  Droughts are longer. Storms are stronger. The old ways of predicting the harvest no longer work.
                </p>
              </div>
              <div className="flex items-center gap-4 text-brand-dark/60 font-medium border-l-4 border-brand-green pl-4">
                <p>
                  We don't just talk about the problem. <br/>
                  <span className="text-brand-dark font-bold">We build the structural response.</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-brand-light rounded-2xl border border-brand-dark/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Image src="/icons/ai-insights.png" alt="AI Insights" width={120} height={120} className="w-28 h-28 object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-3">AI Tools</h3>
                <p className="text-brand-dark/80 text-lg">Data-driven insights for smarter planting decisions.</p>
              </div>
              <div className="p-6 bg-brand-light rounded-2xl border border-brand-dark/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Image src="/icons/storytelling.png" alt="Storytelling" width={120} height={120} className="w-28 h-28 object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-3">Creative Action</h3>
                <p className="text-brand-dark/80 text-lg">Storytelling that makes climate science accessible to all.</p>
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
              { id: 1, title: "The Drought's End", type: "Digital Illustration", src: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=1200&q=80" },
              { id: 2, title: "Solar Future", type: "Photography", src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80" },
              { id: 3, title: "Green Hope", type: "Mixed Media", src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80" }
            ].map((item) => (
              <div key={item.id} className="group relative aspect-[4/5] bg-brand-light rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-brand-dark/5 transition-all duration-500 hover:-translate-y-2">
                <Image 
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-white font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{item.type}</p>
                  </div>
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
