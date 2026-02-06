import React from 'react';

export default function PartnersPage() {
  return (
    <main className="flex-grow py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Partners & Collaboration</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            We believe in the power of collaboration. By working together with diverse institutions, we amplify our impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Universities */}
          <section>
            <h2 className="text-2xl font-bold text-brand-green mb-6 border-b border-stone-200 pb-2">Universities</h2>
            <div className="bg-white p-6 rounded-lg border border-stone-100">
              <p className="text-stone-600 mb-4">
                Collaborating on research, student engagement, and campus sustainability initiatives.
              </p>
              <ul className="list-disc list-inside text-stone-500 space-y-2">
                <li>Joint research projects</li>
                <li>Internship programs</li>
                <li>Campus chapters</li>
              </ul>
            </div>
          </section>

          {/* NGOs */}
          <section>
            <h2 className="text-2xl font-bold text-brand-green mb-6 border-b border-stone-200 pb-2">NGOs</h2>
            <div className="bg-white p-6 rounded-lg border border-stone-100">
              <p className="text-stone-600 mb-4">
                Partnering with local and regional organizations to execute community projects.
              </p>
              <ul className="list-disc list-inside text-stone-500 space-y-2">
                <li>Resource sharing</li>
                <li>Co-hosted events</li>
                <li>Advocacy campaigns</li>
              </ul>
            </div>
          </section>

          {/* Government Institutions */}
          <section>
            <h2 className="text-2xl font-bold text-brand-green mb-6 border-b border-stone-200 pb-2">Government Institutions</h2>
            <div className="bg-white p-6 rounded-lg border border-stone-100">
              <p className="text-stone-600 mb-4">
                Aligning our work with national climate goals and policy frameworks.
              </p>
              <ul className="list-disc list-inside text-stone-500 space-y-2">
                <li>Policy consultation</li>
                <li>National compliance</li>
                <li>Public sector projects</li>
              </ul>
            </div>
          </section>

          {/* International Partners */}
          <section>
            <h2 className="text-2xl font-bold text-brand-green mb-6 border-b border-stone-200 pb-2">International Partners</h2>
            <div className="bg-white p-6 rounded-lg border border-stone-100">
              <p className="text-stone-600 mb-4">
                Connecting Zimbabwe to the global climate conversation and funding opportunities.
              </p>
              <ul className="list-disc list-inside text-stone-500 space-y-2">
                <li>Global networks</li>
                <li>Funding & grants</li>
                <li>Technology transfer</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-brand-dark mb-6">Interested in Partnering?</h3>
          <a href="mailto:contact@climatespace.co.zw" className="inline-block px-8 py-3 bg-brand-green text-white font-medium rounded-md hover:bg-emerald-800 transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
