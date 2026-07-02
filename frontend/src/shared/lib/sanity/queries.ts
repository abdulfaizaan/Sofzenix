import { groq } from "next-sanity";
import { client } from "./client";

export async function getPosts() {
  return client.fetch(groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`);
}

export async function getJobs() {
  return client.fetch(groq`*[_type == "job" && defined(slug.current)]`);
}

export async function getProjects() {
  return client.fetch(groq`*[_type == "project" && defined(slug.current)] | order(year desc)`);
}
