// @ts-nocheck
"use client";

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/chat` : '/api/chat'
  });

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent text-background rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform z-50"
        aria-label="Open Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-surface border border-surface-hover shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col h-[500px] max-h-[80vh]">
      <div className="bg-accent text-background p-4 flex justify-between items-center">
        <h3 className="font-medium">Chat with Sofi</h3>
        <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted mt-8">
            <p>Hi! I'm Sofi, an AI assistant here to help you scope your project.</p>
          </div>
        )}
        
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${m.role === 'user' ? 'bg-accent text-background rounded-tr-sm' : 'bg-surface-hover text-text rounded-tl-sm'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {error && (
          <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded-lg">
            {error.message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-surface-hover flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 bg-surface-hover border-none rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent outline-none text-text"
        />
        <Button type="submit" variant="primary" className="px-4 py-2">
          Send
        </Button>
      </form>
    </div>
  );
}
