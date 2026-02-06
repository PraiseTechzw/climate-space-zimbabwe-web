"use client";

import React, { useState } from 'react';
import { Search, Sprout, CloudSun, Bug, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock data for the search engine
const MOCK_RESULTS = [
  {
    id: 1,
    category: 'crop',
    title: 'Maize Planting Guide (Region II)',
    description: 'Optimal planting dates are between Nov 15 and Dec 15. Use seed varieties SC500 or SC600 series for best yield in sandy loam soils.',
    icon: Sprout,
    color: 'text-brand-green',
    bg: 'bg-brand-green/10'
  },
  {
    id: 2,
    category: 'pest',
    title: 'Fall Armyworm Control',
    description: 'Early detection is key. Look for window-pane damage on leaves. Apply Emamectin benzoate or Indoxacarb in the late afternoon.',
    icon: Bug,
    color: 'text-brand-gold',
    bg: 'bg-brand-gold/10'
  },
  {
    id: 3,
    category: 'weather',
    title: 'Rainfall Forecast (Harare)',
    description: 'Above-normal rainfall expected for the 2024-2025 season. Farmers are advised to prepare drainage channels.',
    icon: CloudSun,
    color: 'text-brand-cyan',
    bg: 'bg-brand-cyan/10'
  }
];

export function AgriSearchTool() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof MOCK_RESULTS>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Simple filter based on mock data, or just return all for demo if no match
      const filtered = MOCK_RESULTS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      // If no matches, show all as "related suggestions" for the demo
      setResults(filtered.length > 0 ? filtered : MOCK_RESULTS);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-brand-dark/5 overflow-hidden">
        {/* Search Header */}
        <div className="p-6 sm:p-10 bg-brand-surface border-b border-brand-dark/5">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-6 h-6 text-brand-dark/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about crops, pests, or weather (e.g., 'maize planting')..."
                className="w-full pl-14 pr-32 py-4 rounded-2xl border-2 border-brand-dark/10 focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 outline-none text-lg transition-all"
              />
              <div className="absolute right-2">
                <Button 
                  type="submit" 
                  disabled={isSearching || !query.trim()}
                  className="rounded-xl px-6"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex gap-2 text-sm text-brand-dark/60 overflow-x-auto pb-2">
              <span className="whitespace-nowrap font-bold">Try asking:</span>
              <button type="button" onClick={() => setQuery('Maize planting')} className="px-3 py-1 bg-white border border-brand-dark/10 rounded-full hover:border-brand-green hover:text-brand-green transition-colors whitespace-nowrap">
                Maize planting
              </button>
              <button type="button" onClick={() => setQuery('Armyworm')} className="px-3 py-1 bg-white border border-brand-dark/10 rounded-full hover:border-brand-green hover:text-brand-green transition-colors whitespace-nowrap">
                Armyworm
              </button>
              <button type="button" onClick={() => setQuery('Rainfall forecast')} className="px-3 py-1 bg-white border border-brand-dark/10 rounded-full hover:border-brand-green hover:text-brand-green transition-colors whitespace-nowrap">
                Rainfall forecast
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        <div className="p-6 sm:p-10 min-h-[300px] bg-white">
          {!hasSearched ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 bg-brand-green/5 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-brand-green/40" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Ready to help you grow</h3>
              <p className="text-brand-dark/60 max-w-md">
                Our AI model is trained on Zimbabwe's agricultural data. Enter a query above to get started.
              </p>
            </div>
          ) : isSearching ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Loader2 className="w-12 h-12 text-brand-green animate-spin mb-6" />
              <p className="text-brand-dark/60 animate-pulse">Analyzing agricultural database...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-4">
                 <h3 className="text-lg font-bold text-brand-dark">
                   {results.length} Result{results.length !== 1 ? 's' : ''} found
                 </h3>
                 <span className="text-xs text-brand-dark/40 uppercase tracking-wider font-bold">AI Generated</span>
              </div>
              
              {results.map((result) => (
                <div key={result.id} className="flex gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:border-brand-green/30 hover:shadow-md transition-all group">
                  <div className={`w-12 h-12 ${result.bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-1`}>
                    <result.icon className={`w-6 h-6 ${result.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-stone-200 uppercase tracking-wider ${result.color}`}>
                        {result.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-green transition-colors">
                      {result.title}
                    </h4>
                    <p className="text-brand-dark/70 leading-relaxed mb-4">
                      {result.description}
                    </p>
                    <button className="text-sm font-bold text-brand-dark flex items-center gap-1 hover:gap-2 transition-all hover:text-brand-green">
                      Read full advisory <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm flex gap-3 items-start mt-8">
                <Bug className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Disclaimer:</strong> This information is for educational purposes. Always verify with your local Agritex officer before applying chemical treatments.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
