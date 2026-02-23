import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Creative Space | Climate Space Zimbabwe',
  description: 'Explore the intersection of art and climate action in Zimbabwe.',
};

export default function CreativeSpacePage() {
  return (
    <main className="flex-grow">
      <Section variant="white" className="py-20">
        <Container>
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Creative Space</h1>
          <p className="text-lg text-brand-dark/70">
            This is where art meets climate action. Stay tuned for our gallery of inspiring works!
          </p>
        </Container>
      </Section>
    </main>
  );
}
