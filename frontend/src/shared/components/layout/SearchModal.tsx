"use client";

import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/api/public/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Expose an event to open the modal from other components
  useEffect(() => {
    const handleOpenSearch = () => setIsOpen(true);
    window.addEventListener('open-search-modal', handleOpenSearch);
    return () => window.removeEventListener('open-search-modal', handleOpenSearch);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-xl bg-surface border border-border shadow-2xl rounded-2xl overflow-hidden relative mx-4">
        <div className="flex items-center px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted mr-3" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search projects, blog posts..."
            className="flex-1 bg-transparent border-none outline-none text-text text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)} className="text-muted hover:text-text cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex justify-center p-8 text-muted">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          
          {!loading && results.length > 0 && (
            <div className="p-2">
              {results.map((r, i) => (
                <Link key={i} href={r.url} onClick={() => setIsOpen(false)} className="block p-3 hover:bg-surface-hover rounded-lg transition-colors group">
                  <div className="text-xs text-accent uppercase font-bold tracking-wider mb-1">{r.type}</div>
                  <div className="text-text font-medium group-hover:text-accent transition-colors">{r.title}</div>
                  {r.description && <div className="text-sm text-muted line-clamp-1 mt-1">{r.description}</div>}
                </Link>
              ))}
            </div>
          )}
          
          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-muted">
              No results found for "{query}"
            </div>
          )}
          
          {!query && (
            <div className="p-8 text-center text-sm text-muted">
              Type to start searching...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
