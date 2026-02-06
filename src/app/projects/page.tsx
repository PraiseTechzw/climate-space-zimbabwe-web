import React from 'react';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <main className="flex-grow py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-dark mb-12">Projects</h1>

        <div className="space-y-16">
          {/* Current Initiatives */}
          <section>
            <h2 className="text-2xl font-bold text-brand-green mb-8 flex items-center">
              Current Initiatives
              <span className="ml-4 px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-medium rounded-full">Active</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="h-40 bg-stone-100 rounded-md mb-4 relative overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=100"
                    alt="Initiative Name 1"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Initiative Name 1</h3>
                <p className="text-stone-600 mb-4">
                  Description of the current initiative. Focusing on immediate community impact and engagement.
                </p>
                <span className="text-sm font-medium text-brand-green">In Progress &rarr;</span>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-stone-200">
                <div className="h-40 bg-stone-100 rounded-md mb-4 relative overflow-hidden group">
                  <Image 
                    src="https://images.unsplash.com/photo-1427504746696-ea309360756e?auto=format&fit=crop&w=1200&q=100"
                    alt="Initiative Name 2"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Initiative Name 2</h3>
                <p className="text-stone-600 mb-4">
                  Description of another active project. Highlighting youth involvement and education.
                </p>
                <span className="text-sm font-medium text-brand-green">In Progress &rarr;</span>
              </div>
            </div>
          </section>

          {/* Flagship Ideas */}
          <section>
            <h2 className="text-2xl font-bold text-brand-green mb-8 flex items-center">
              Flagship Ideas
              <span className="ml-4 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full">Future</span>
            </h2>
            <div className="bg-brand-dark text-white rounded-2xl p-8 sm:p-12 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Website → AI Tools → Community Action</h3>
                <p className="text-lg text-stone-300 max-w-2xl mb-8">
                  Our roadmap involves evolving this digital platform into a hub for AI-driven climate tools that empower local communities with actionable data.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                  <div>
                    <div className="text-brand-green font-bold text-xl mb-2">01</div>
                    <div className="font-medium">Digital Foundation</div>
                  </div>
                  <div>
                    <div className="text-brand-green font-bold text-xl mb-2">02</div>
                    <div className="font-medium">AI Integration</div>
                  </div>
                  <div>
                    <div className="text-brand-green font-bold text-xl mb-2">03</div>
                    <div className="font-medium">Real-world Impact</div>
                  </div>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl"></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
