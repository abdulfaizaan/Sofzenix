"use client";

import { useState } from "react";
import type * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Reveal } from "@/shared/components/effects/Reveal";
import { Button } from "@/shared/components/ui/Button";

// Zod schema for client-side validation
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Company is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyPolicy: z.literal(true, {
    message: "You must agree to the privacy policy"
  }),

});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm(): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/public/crm/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-frontend-key": process.env.NEXT_PUBLIC_FRONTEND_API_KEY || "default_dev_key_123"
        },
        // Map frontend "subject" (Company) to backend "service" field
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Reveal as="div" y={20} className="w-full">
      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 p-8 text-center rounded-2xl space-y-4">
          <h3 className="text-xl text-green-800 font-medium tracking-tight">Message Sent</h3>
          <p className="text-green-600">Thank you for reaching out. Our team will get back to you shortly.</p>
          <button 
            type="button"
            className="mt-4 px-6 py-2 bg-white border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6 flex flex-col">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 p-4 text-red-600 text-sm rounded-lg">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col space-y-1 relative group">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              {...register("name")}
              id="name"
              className="bg-transparent border-0 border-b-2 border-border px-0 py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors text-text text-lg placeholder:text-muted"
              placeholder="Your Name"
              aria-invalid={!!errors.name}
              suppressHydrationWarning
            />
            {errors.name && <span className="text-red-500 text-[10px] absolute -bottom-4 left-0 uppercase font-semibold tracking-wider">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col space-y-1 relative group">
            <label htmlFor="subject" className="sr-only">Company</label>
            <input
              {...register("subject")}
              id="subject"
              className="bg-transparent border-0 border-b-2 border-border px-0 py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors text-text text-lg placeholder:text-muted"
              placeholder="Company"
              aria-invalid={!!errors.subject}
              suppressHydrationWarning
            />
            {errors.subject && <span className="text-red-500 text-[10px] absolute -bottom-4 left-0 uppercase font-semibold tracking-wider">{errors.subject.message}</span>}
          </div>

          <div className="flex flex-col space-y-1 relative group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="bg-transparent border-0 border-b-2 border-border px-0 py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors text-text text-lg placeholder:text-muted"
              placeholder="Email"
              aria-invalid={!!errors.email}
              suppressHydrationWarning
            />
            {errors.email && <span className="text-red-500 text-[10px] absolute -bottom-4 left-0 uppercase font-semibold tracking-wider">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col space-y-1 relative group">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              {...register("message")}
              id="message"
              rows={3}
              className="bg-transparent border-0 border-b-2 border-border px-0 py-3 focus:ring-0 focus:outline-none focus:border-accent transition-colors text-text text-lg placeholder:text-muted resize-none min-h-[80px]"
              placeholder="Message"
              aria-invalid={!!errors.message}
              suppressHydrationWarning
            />
            {errors.message && <span className="text-red-500 text-[10px] absolute -bottom-4 left-0 uppercase font-semibold tracking-wider">{errors.message.message}</span>}
          </div>

          {/* Footer Area with Checkbox and Submit Button */}
          <div className="pt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <div className="flex items-center gap-3 relative">
              <input 
                type="checkbox" 
                id="privacyPolicy" 
                {...register("privacyPolicy")}
                className="w-[18px] h-[18px] border-border rounded-sm bg-transparent cursor-pointer appearance-none checked:bg-accent checked:border-accent relative before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjIwIDYgOSAxNyA0IDEyIj48L3BvbHlsaW5lPjwvc3ZnPg==')] before:bg-no-repeat before:bg-center before:bg-[length:12px_12px] checked:before:block before:hidden focus:ring-0 focus:outline-none"
              />
              <label htmlFor="privacyPolicy" className="text-sm text-muted cursor-pointer select-none">
                I agree to the <Link href="/privacy-policy" className="underline hover:text-accent transition-colors text-text">privacy policy</Link>.
              </label>
              {errors.privacyPolicy && <span className="text-red-500 text-[10px] absolute -bottom-5 left-0 uppercase font-semibold tracking-wider w-max">{errors.privacyPolicy.message}</span>}
            </div>
            
            <Button 
              type="submit" 
              variant="primary"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </Reveal>
  );
}
