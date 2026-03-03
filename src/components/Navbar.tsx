"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Departments', href: '/departments' },
  { name: 'Our Solutions', href: '/solutions' },
  { name: 'Agri-Search', href: '/agri-search' },
  { name: 'Creative Space', href: '/creative-space' },
  { name: 'Resources', href: '/resources' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
      <nav className="mx-auto max-w-7xl bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-brand-dark/5 pointer-events-auto transition-all duration-300">
        <Container className="py-2">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center -ml-2">
              <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90" aria-label="Climate Space Zimbabwe Home">
                <div className="relative h-24 w-auto">
                  <Image
                    src="/logo.png"
                    alt="Climate Space Zimbabwe"
                    width={240}
                    height={96}
                    className="object-contain object-left h-full w-auto"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/60 shadow-inner mr-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const isAgriSearch = item.name === 'Agri-Search';
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group flex items-center gap-1.5",
                        isActive
                          ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                          : isAgriSearch
                            ? "text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200/50"
                            : "text-slate-600 hover:text-emerald-700 hover:bg-white/60"
                      )}
                    >
                      {isAgriSearch && !isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                      {item.name}
                    </Link>
                  )
                })}
              </div>
              <Button href="/get-involved" variant="primary" size="sm" className="rounded-full px-6 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                Get Involved
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-brand-dark hover:text-brand-green hover:bg-stone-100 focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Toggle main menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-brand-dark/5 p-4 bg-white/95 backdrop-blur-xl rounded-b-2xl">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const isAgriSearch = item.name === 'Agri-Search';
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-between",
                      isActive
                        ? "text-emerald-700 bg-emerald-50/80 font-bold border border-emerald-100"
                        : isAgriSearch
                          ? "text-emerald-600 bg-emerald-50/40 hover:bg-emerald-50 border border-transparent"
                          : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isAgriSearch && !isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                      {item.name}
                    </span>

                    {isAgriSearch && (
                      <span className="text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">New AI</span>
                    )}
                  </Link>
                )
              })}
              <div className="pt-4">
                <Button href="/get-involved" variant="primary" size="md" className="w-full justify-center rounded-xl">
                  Get Involved
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
