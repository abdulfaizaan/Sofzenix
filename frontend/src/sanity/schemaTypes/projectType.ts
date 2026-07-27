import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Project Summary",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "metrics",
      title: "Key Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Metric Value (e.g. 80%)" },
            { name: "label", type: "string", title: "Metric Label (e.g. Faster Loads)" },
          ],
        },
      ],
    }),
    defineField({
      name: "caseStudyBlocks",
      title: "Case Study Blocks",
      type: "array",
      of: [
        {
          type: "object",
          name: "challengeSolution",
          title: "Challenge -> Solution -> Result",
          fields: [
            { name: "challenge", type: "text", title: "The Challenge" },
            { name: "solution", type: "text", title: "The Solution" },
            { name: "result", type: "text", title: "The Result" },
          ],
        },
        {
          type: "object",
          name: "testimonial",
          title: "Testimonial Embed",
          fields: [
            { name: "quote", type: "text", title: "Quote" },
            { name: "author", type: "string", title: "Author Name" },
            { name: "role", type: "string", title: "Author Role" },
            { name: "avatar", type: "image", title: "Avatar Image" },
          ],
        },
        {
          type: "object",
          name: "gallery",
          title: "Image Gallery",
          fields: [
            { name: "images", type: "array", of: [{ type: "image" }], title: "Images" }
          ]
        }
      ],
    }),
  ],
});
