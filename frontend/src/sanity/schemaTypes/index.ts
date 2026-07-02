import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { jobType } from "./jobType";
import { projectType } from "./projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, jobType, projectType],
};
