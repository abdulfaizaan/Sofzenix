"use client";

import { useState } from "react";
import { SITE } from "@/shared/constants/site";

type Tab = "inquiries" | "findUs" | "followUs";

export function ContactInfoTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("inquiries");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(SITE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Tabs */}
      <div className="flex gap-3 md:gap-4 flex-wrap relative z-10" role="tablist" aria-label="Contact options">
        <button
          role="tab"
          aria-selected={activeTab === "inquiries"}
          aria-label="View Inquiries contact info"
          onClick={() => setActiveTab("inquiries")}
          className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium border cursor-pointer ${
            activeTab === "inquiries"
              ? "bg-white text-black border-transparent scale-105 shadow-lg"
              : "bg-surface/50 text-text border-border/50 hover:bg-surface"
          }`}
        >
          <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${activeTab === "inquiries" ? "bg-accent scale-100" : "w-0 mr-0 scale-0 opacity-0"}`} />
          Inquiries
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "findUs"}
          aria-label="View our location"
          onClick={() => setActiveTab("findUs")}
          className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium border cursor-pointer ${
            activeTab === "findUs"
              ? "bg-white text-black border-transparent scale-105 shadow-lg"
              : "bg-surface/50 text-text border-border/50 hover:bg-surface"
          }`}
        >
          <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${activeTab === "findUs" ? "bg-accent scale-100" : "w-0 mr-0 scale-0 opacity-0"}`} />
          Find us
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "followUs"}
          aria-label="View our social media links"
          onClick={() => setActiveTab("followUs")}
          className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium border cursor-pointer ${
            activeTab === "followUs"
              ? "bg-white text-black border-transparent scale-105 shadow-lg"
              : "bg-surface/50 text-text border-border/50 hover:bg-surface"
          }`}
        >
          <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${activeTab === "followUs" ? "bg-accent scale-100" : "w-0 mr-0 scale-0 opacity-0"}`} />
          Follow us
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="mt-24 lg:mt-0 space-y-4 relative z-10">
        {activeTab === "inquiries" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" role="tabpanel" aria-label="Inquiries content">
            <button onClick={handleCopyEmail} aria-label="Copy email address" className="block group text-left cursor-pointer w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-display font-semibold tracking-tight text-text border-b-2 border-text/20 pb-4 inline-block hover:border-text transition-colors break-words max-w-full relative">
                {SITE.email}
                <span className="inline-flex transform group-hover:scale-110 transition-transform text-muted align-top leading-none ml-3 opacity-0 group-hover:opacity-100 items-center justify-center">
                  {copied ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 inline-block"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  )}
                </span>
                
                {/* Tooltip */}
                <span className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface border border-border/50 text-text text-[10px] font-bold font-sans uppercase tracking-[0.2em] rounded-md transition-all duration-200 pointer-events-none shadow-lg ${copied ? 'opacity-100 translate-y-0 text-green-500 border-green-500/30' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </h1>
            </button>
            <p className="text-muted text-lg font-medium mt-6">{SITE.phone}</p>
          </div>
        )}
        
        {activeTab === "findUs" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" role="tabpanel" aria-label="Find Us content">
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.city + ', ' + SITE.address.country)}`} aria-label="Open Google Maps for our location" target="_blank" rel="noopener noreferrer" className="block group">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-text border-b-2 border-text/20 pb-4 inline-block hover:border-text transition-colors">
                {SITE.address.city}, {SITE.address.country} <span className="inline-block transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform text-muted text-2xl md:text-3xl align-top leading-none">↗</span>
              </h1>
            </a>
            <p className="text-muted text-lg font-medium mt-6">Get Directions</p>
          </div>
        )}
        
        {activeTab === "followUs" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" role="tabpanel" aria-label="Follow Us content">
            <a href={SITE.social.linkedin} aria-label="Visit our LinkedIn profile" target="_blank" rel="noopener noreferrer" className="block group">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-text border-b-2 border-transparent pb-4 inline-block">
                LinkedIn <span className="inline-block transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform text-muted text-3xl align-top leading-none">↗</span>
              </h1>
            </a>
            <p className="text-muted text-lg font-medium mt-6">Behind the scenes</p>
          </div>
        )}
      </div>
    </div>
  );
}
