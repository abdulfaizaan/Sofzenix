"use client";

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const COLORS = [
  { name: 'Default', value: '#10b981' }, // emerald-500 equivalent
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Rose', value: '#f43f5e' }
];

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0]?.value || '#10b981');

  useEffect(() => {
    const saved = localStorage.getItem('theme-accent');
    if (saved) {
      setActiveColor(saved);
      document.documentElement.style.setProperty('--color-accent', saved);
    }
  }, []);

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    localStorage.setItem('theme-accent', color);
    document.documentElement.style.setProperty('--color-accent', color);
  };

  return (
    <div className="fixed top-24 right-0 z-40 transition-transform duration-300" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className="absolute -left-12 top-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-surface border-y border-l border-border p-3 shadow-lg flex items-center justify-center text-text hover:text-accent transition-colors rounded-l-md"
          aria-label="Customize Theme"
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-surface border border-border p-6 shadow-xl w-64 h-full rounded-l-xl">
        <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted mb-2 block">Accent Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c.name}
                  onClick={() => handleColorChange(c.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${activeColor === c.value ? 'border-text scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                  aria-label={`Set accent color to ${c.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
