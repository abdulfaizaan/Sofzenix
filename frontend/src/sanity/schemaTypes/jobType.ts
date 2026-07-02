import { defineField, defineType } from "sanity";

export const jobType = defineType({
  name: "job",
  title: "Career Job Posting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
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
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: ["Engineering", "Design", "Marketing", "Sales", "Operations", "AI"],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Remote",
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["Full-time", "Contract", "Part-time"],
      },
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
