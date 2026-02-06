"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds or keep success message
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-lg border border-brand-dark/5 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-brand-green" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-4">Message Sent!</h3>
        <p className="text-brand-dark/70 mb-8 max-w-sm">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-lg border border-brand-dark/5">
      <h3 className="text-2xl font-bold font-heading text-brand-dark mb-6">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-bold text-brand-dark">First Name</label>
            <input 
              required
              type="text" 
              id="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white" 
              placeholder="Jane" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-bold text-brand-dark">Last Name</label>
            <input 
              required
              type="text" 
              id="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white" 
              placeholder="Doe" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-brand-dark">Email Address</label>
          <input 
            required
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white" 
            placeholder="jane@example.com" 
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-bold text-brand-dark">Subject</label>
          <select 
            required
            id="subject" 
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white text-brand-dark/80"
          >
            <option value="">Select a topic...</option>
            <option value="membership">Membership Inquiry</option>
            <option value="partnership">Partnership Proposal</option>
            <option value="press">Press & Media</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-brand-dark">Message</label>
          <textarea 
            required
            id="message" 
            rows={4} 
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white resize-none" 
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full justify-center" 
          size="lg" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" /> Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
