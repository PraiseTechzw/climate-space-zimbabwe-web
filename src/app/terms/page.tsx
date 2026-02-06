import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Terms of Service | Climate Space Zimbabwe',
  description: 'Terms of Service for using the Climate Space Zimbabwe platform.',
};

export default function TermsPage() {
  return (
    <main className="flex-grow">
      <Section variant="white" className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-dark mb-8">Terms of Service</h1>
            <p className="text-lg text-brand-dark/70 mb-12">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="prose prose-lg prose-stone max-w-none">
              <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">1. Agreement to Terms</h2>
              <p className="text-brand-dark/80 mb-6">
                By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
              </p>

              <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">2. Use License</h2>
              <p className="text-brand-dark/80 mb-6">
                Permission is granted to temporarily download one copy of the materials (information or software) on Climate Space Zimbabwe's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-6 text-brand-dark/80 space-y-2">
                <li>Modify or copy the materials;</li>
                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                <li>Attempt to decompile or reverse engineer any software contained on Climate Space Zimbabwe's website;</li>
                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>

              <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">3. Disclaimer</h2>
              <p className="text-brand-dark/80 mb-6">
                The materials on Climate Space Zimbabwe's website are provided on an 'as is' basis. Climate Space Zimbabwe makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">4. Limitations</h2>
              <p className="text-brand-dark/80 mb-6">
                In no event shall Climate Space Zimbabwe or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Climate Space Zimbabwe's website, even if Climate Space Zimbabwe or a Climate Space Zimbabwe authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">5. Governing Law</h2>
              <p className="text-brand-dark/80 mb-6">
                These terms and conditions are governed by and construed in accordance with the laws of Zimbabwe and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>

              <h2 className="text-2xl font-bold text-brand-dark mt-8 mb-4">6. Contact Us</h2>
              <p className="text-brand-dark/80 mb-6">
                If you have any questions about these Terms of Service, please contact us at via our <a href="/contact" className="text-brand-green font-bold hover:underline">Contact Page</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
