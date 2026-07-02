"use client";

import { useState } from "react";
import type * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Reveal } from "@/shared/components/effects/Reveal";
import { Button } from "@/shared/components/ui/Button";

// Zod schema for client-side validation
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Map frontend "subject" to backend "service" field
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
    <Reveal as="div" y={32} className="w-full">
      {status === "success" ? (
        <div className="bg-accent/10 border border-accent p-8 text-center space-y-4">
          <h3 className="text-xl text-accent font-medium uppercase tracking-widest">Message Sent</h3>
          <p className="text-muted">Thank you for reaching out. Our team will get back to you shortly.</p>
          <Button variant="outline" onClick={() => setStatus("idle")}>Send another message</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500 p-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-small font-medium text-muted uppercase tracking-wider">
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              className="bg-surface/50 border border-border px-4 py-3 rounded-none focus:outline-none focus:border-accent transition-colors text-text"
              placeholder="Jane Doe"
              aria-invalid={!!errors.name}
              suppressHydrationWarning
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-small font-medium text-muted uppercase tracking-wider">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="bg-surface/50 border border-border px-4 py-3 rounded-none focus:outline-none focus:border-accent transition-colors text-text"
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
              suppressHydrationWarning
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="subject" className="text-small font-medium text-muted uppercase tracking-wider">
            Subject
          </label>
          <input
            {...register("subject")}
            id="subject"
            className="bg-surface/50 border border-border px-4 py-3 rounded-none focus:outline-none focus:border-accent transition-colors text-text"
            placeholder="How can we help?"
            aria-invalid={!!errors.subject}
            suppressHydrationWarning
          />
          {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-small font-medium text-muted uppercase tracking-wider">
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            className="bg-surface/50 border border-border px-4 py-3 rounded-none focus:outline-none focus:border-accent transition-colors text-text resize-none"
            placeholder="Tell us about your project..."
            aria-invalid={!!errors.message}
            suppressHydrationWarning
          />
          {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
        </div>

        <div className="pt-4">
          <Button size="lg" variant="primary" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Sending..." : "Send Message"}
            <span aria-hidden="true" className="ml-2">→</span>
          </Button>
        </div>
      </form>
      )}
    </Reveal>
  );
}
