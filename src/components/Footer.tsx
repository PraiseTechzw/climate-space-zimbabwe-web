import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Section variant="dark" spacing="md" className="border-t border-brand-surface/10 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6 transition-opacity hover:opacity-90" aria-label="Climate Space Zimbabwe Home">
              <div className="relative h-24 w-72 bg-white rounded-2xl p-2">
                <Image 
                  src="/logo.png" 
                  alt="Climate Space Zimbabwe" 
                  fill
                  className="object-contain object-center"
                />
              </div>
            </Link>
            <p className="text-brand-surface/90 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              Empowering your climate resilience through the fusion of AI and Creativity.
            </p>
            <p className="text-brand-surface/50 text-xs max-w-sm">
              Modern. Eco-Tech. African. Impactful.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-brand-surface tracking-wider uppercase mb-6 font-heading">Explore</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Solutions', href: '/solutions' },
                { name: 'Creative Space', href: '/creative-space' },
                { name: 'Get Involved', href: '/get-involved' },
                { name: 'Resources', href: '/resources' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-brand-surface/70 hover:text-brand-green transition-colors text-sm block py-1">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Socials */}
          <div>
            <h3 className="text-sm font-bold text-brand-surface tracking-wider uppercase mb-6 font-heading">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-brand-surface/70 hover:text-brand-gold transition-colors text-sm block py-1">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://www.facebook.com/share/1AUi1qtRr4/" target="_blank" rel="noopener noreferrer" className="text-brand-surface/70 hover:text-brand-gold transition-colors text-sm block py-1">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/climatepacezimbabwe?igsh=enVycWZ4cXJzMjcx" target="_blank" rel="noopener noreferrer" className="text-brand-surface/70 hover:text-brand-gold transition-colors text-sm block py-1">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Utility Bar */}
        <div className="border-t border-brand-surface/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-surface/50 text-sm">
            &copy; {currentYear} Climate Space Zimbabwe. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-surface/50">
            <Link href="/privacy" className="hover:text-brand-surface transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-surface transition-colors">Terms of Service</Link>
            <Link href="/docs/constitution.pdf" className="hover:text-brand-surface transition-colors">Constitution</Link>
            <Link href="/sitemap" className="hover:text-brand-surface transition-colors">Sitemap</Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
