import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/encryption';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    // Graceful fallback if no API key is provided
    return NextResponse.json({
      error: "AI Chatbot is currently unavailable. Please contact us via the form."
    }, { status: 503 });
  }

  const { messages } = await req.json();

  try {
    const result = streamText({
      model: google('gemini-1.5-pro'),
      system: `You are Sofi, the AI lead qualification assistant for SOFZENIX IT Solutions LLP.
      Your goal is to friendly and concisely ask the user about their project needs, budget, and timeline, 
      and then ask for their email address so our team can follow up. Be very brief (1-2 sentences max per reply).
      Once you have collected their email and project details, use the 'saveLead' tool to save their information to our database.
      Don't use the 'saveLead' tool until you have their email address.`,
      messages,
      tools: {
        saveLead: tool({
          description: 'Save a qualified lead to the CRM database',
          parameters: z.object({
            name: z.string().describe('The name of the lead (or "Unknown")'),
            email: z.string().describe('The email address of the lead'),
            budget: z.string().optional().describe('The estimated budget'),
            timeline: z.string().optional().describe('The project timeline'),
            projectDetails: z.string().describe('Summary of their project requirements'),
          }),
          // @ts-ignore - Vercel AI SDK version mismatch typing issue
          execute: async ({ name, email, budget, timeline, projectDetails }: { name: string, email: string, budget?: string, timeline?: string, projectDetails: string }) => {
            const saved = await prisma.contactMessage.create({
              data: {
                name: name || 'Unknown',
                emailEncrypted: encrypt(email),
                message: `Project Details: ${projectDetails}\nBudget: ${budget || 'Not specified'}\nTimeline: ${timeline || 'Not specified'}`,
                service: 'AI Chatbot Lead',
              },
            });
            return `Lead saved successfully. Let the user know our team will contact them shortly at ${email}.`;
          },
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json({ error: "Failed to generate response." }, { status: 500 });
  }
}

