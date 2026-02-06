import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Sitemap | Climate Space Zimbabwe',
  description: 'Overview of all pages on the Climate Space Zimbabwe website.',
};

export default function SitemapPage() {
  const links = [
    { category: 'Main', items: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Our Solutions', href: '/solutions' },
      { name: 'Creative Space', href: '/creative-space' },
      { name: 'Get Involved', href: '/get-involved' },
      { name: 'Resources', href: '/resources' },
      { name: 'Contact Us', href: '/contact' },
    ]},
    { category: 'Legal', items: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ]},
    { category: 'Projects', items: [
      { name: 'All Projects', href: '/projects' },
    ]},
  ];

  return (
    <main className="flex-grow">
      <Section variant="white" className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-dark mb-8">Sitemap</h1>
            <p className="text-lg text-brand-dark/70 mb-12">
              An overview of the content available on our website.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {links.map((section) => (
                <div key={section.category} className="bg-stone-50 p-8 rounded-2xl border border-stone-200">
                  <h2 className="text-2xl font-bold text-brand-dark mb-6 border-b border-brand-dark/10 pb-4">
                    {section.category}
                  </h2>
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link 
                          href={item.href} 
                          className="text-brand-dark/80 hover:text-brand-green transition-colors text-lg flex items-center group"
                        >
                          <span className="w-2 h-2 bg-brand-green/30 rounded-full mr-3 group-hover:bg-brand-green transition-colors"></span>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
