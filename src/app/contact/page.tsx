import React from 'react';
import { Metadata } from 'next';
import { Mail, MapPin, Phone, Send, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Climate Space Zimbabwe',
  description: 'Get in touch with the Climate Space team. We want to hear from you.',
};

export default function ContactPage() {
  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <Section variant="dark" className="relative overflow-hidden">
        <Container>
          <div className="max-w-4xl py-12 sm:py-20 text-center mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white mb-6 leading-tight">
              Get in <span className="text-brand-green">Touch</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Have a question, a partnership proposal, or just want to say hello? We're here to listen.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. CONTACT CONTENT */}
      <Section variant="white" className="-mt-12 relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
               <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8">Contact Information</h2>
               
               <div className="space-y-8 mb-12">
                 <div className="flex gap-4 items-start">
                   <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-green">
                     <Mail className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-bold text-brand-dark text-lg mb-1">Email Us</h3>
                     <p className="text-brand-dark/70 mb-2">For general inquiries:</p>
                     <a href="mailto:hello@climatespace.co.zw" className="text-brand-green font-bold hover:underline">hello@climatespace.co.zw</a>
                   </div>
                 </div>
                 
                 <div className="flex gap-4 items-start">
                   <div className="w-12 h-12 bg-brand-cyan/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-cyan">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-bold text-brand-dark text-lg mb-1">Visit Us</h3>
                     <p className="text-brand-dark/70">
                       Harare, Zimbabwe<br />
                       (Full address coming soon)
                     </p>
                   </div>
                 </div>

                 <div className="flex gap-4 items-start">
                   <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-brand-gold">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-bold text-brand-dark text-lg mb-1">Call Us</h3>
                     <p className="text-brand-dark/70 mb-2">Mon-Fri from 8am to 5pm.</p>
                     <a href="tel:+263770000000" className="text-brand-dark font-bold hover:text-brand-green transition-colors">+263 77 000 0000</a>
                   </div>
                 </div>
               </div>

               <div className="border-t border-brand-dark/10 pt-8">
                 <h3 className="font-bold text-brand-dark text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/climatepacezimbabwe?igsh=enVycWZ4cXJzMjcx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-dark/5 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/share/1AUi1qtRr4/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-dark/5 flex items-center justify-center text-brand-dark hover:bg-blue-600 hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
               </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
