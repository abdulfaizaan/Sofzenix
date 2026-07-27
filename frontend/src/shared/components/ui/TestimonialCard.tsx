import React from "react";
import Image from "next/image";

export interface TestimonialProps {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  videoUrl?: string;
}

export function TestimonialCard({ testimonial }: { testimonial: TestimonialProps }) {
  return (
    <div className="bg-surface p-8 rounded-2xl border border-surface-hover flex flex-col h-full">
      {testimonial.videoUrl ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
          <video 
            src={testimonial.videoUrl}
            controls
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
      ) : null}
      
      <div className="flex-1">
        <p className="text-lg text-text italic mb-6">"{testimonial.content}"</p>
      </div>
      
      <div className="flex items-center gap-4 mt-auto">
        {testimonial.avatarUrl ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={testimonial.avatarUrl} alt={testimonial.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-background font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-medium text-text">{testimonial.name}</h4>
          {(testimonial.role || testimonial.company) && (
            <p className="text-sm text-muted">
              {testimonial.role} {testimonial.role && testimonial.company && "at"} {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
