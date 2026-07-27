import { z } from "zod";

// ----------------------------------------------------------------------------
// Auth Validators
// ----------------------------------------------------------------------------
export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
  token: z.string().length(6, "TOTP token must be 6 digits").optional(),
});

export const Verify2FASchema = z.object({
  token: z.string().length(6, "TOTP token must be 6 digits").regex(/^\d+$/, "Must contain only digits"),
});

// ----------------------------------------------------------------------------
// Portfolio Validators
// ----------------------------------------------------------------------------
export const PortfolioCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  client: z.string().optional(),
  completedAt: z.string().optional().transform(val => val ? new Date(val) : undefined),
  featured: z.boolean().default(false),
  results: z.string().optional(),
  categoryId: z.string().optional(),
});

export const PortfolioUpdateSchema = PortfolioCreateSchema.partial();

// ----------------------------------------------------------------------------
// Service Validators
// ----------------------------------------------------------------------------
export const ServiceCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  icon: z.string().optional(),
});

export const ServiceUpdateSchema = ServiceCreateSchema.partial();

// ----------------------------------------------------------------------------
// Team Validators
// ----------------------------------------------------------------------------
export const TeamMemberCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
  photoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  order: z.number().int().default(0),
  socialLinks: z.record(z.string(), z.string()).optional(),
});

export const TeamMemberUpdateSchema = TeamMemberCreateSchema.partial();

// ----------------------------------------------------------------------------
// Testimonial Validators
// ----------------------------------------------------------------------------
export const TestimonialCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

export const TestimonialUpdateSchema = TestimonialCreateSchema.partial();

// ----------------------------------------------------------------------------
// Blog Validators
// ----------------------------------------------------------------------------
export const BlogCategoryCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export const BlogCategoryUpdateSchema = BlogCategoryCreateSchema.partial();

export const TagCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export const TagUpdateSchema = TagCreateSchema.partial();

export const BlogPostCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
  readingTime: z.number().int().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional(),
});

export const BlogPostUpdateSchema = BlogPostCreateSchema.partial();

// ----------------------------------------------------------------------------
// CRM Validators
// ----------------------------------------------------------------------------
export const ContactMessageCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  turnstileToken: z.string().min(10, "Captcha token is required"),
});

export const NewsletterSubscribeSchema = z.object({
  email: z.string().email("Valid email is required"),
});

// ----------------------------------------------------------------------------
// Careers Validators
// ----------------------------------------------------------------------------
export const JobCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  active: z.boolean().default(true),
});

export const JobUpdateSchema = JobCreateSchema.partial();

export const JobApplicationCreateSchema = z.object({
  jobId: z.string().uuid("Invalid Job ID"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  resumeUrl: z.string().url("Must be a valid URL"),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
  turnstileToken: z.string().min(10, "Captcha token is required"),
});

export const JobApplicationUpdateSchema = z.object({
  status: z.enum(["NEW", "REVIEWING", "INTERVIEWING", "OFFERED", "HIRED", "REJECTED"]),
});

// ----------------------------------------------------------------------------
// Settings Validators
// ----------------------------------------------------------------------------
export const SiteSettingUpdateSchema = z.object({
  value: z.string().min(1, "Value is required"),
  description: z.string().optional(),
});
