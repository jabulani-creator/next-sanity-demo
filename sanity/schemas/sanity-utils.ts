import { Project } from "@/types/Projects";
import { createClient, groq } from "next-sanity";
import clientConfig from "../config/client-config";
import { Page } from "@/types/Page";

export async function getPages(): Promise<Page[]> {
  try {
    const pages = await createClient(clientConfig).fetch(
      groq`*[_type == "page"]{
              _id,
              _createdAt,
              title,
              "slug": slug.current,
            
            }`
    );

    return pages;
  } catch (error) {
    // Handle the error, log it, or return a default value as needed.
    console.error("Error fetching projects from Sanity:", error);
    return [];
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const page = await createClient(clientConfig).fetch(
      groq`*[_type == "page" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        content
      
      }`,
      { slug }
    );

    return page || null; // Return the project or null if not found
  } catch (error) {
    console.error("Error fetching project from Sanity:", error);
    return null; // Handle the error and return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await createClient(clientConfig).fetch(
      groq`*[_type == "project"]{
              _id,
              _createdAt,
              name,
              "slug": slug.current,
              "image": image.asset->url,
              url,
              content
            }`
    );

    return projects;
  } catch (error) {
    // Handle the error, log it, or return a default value as needed.
    console.error("Error fetching projects from Sanity:", error);
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await createClient(clientConfig).fetch(
      groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        url,
        content
      }`,
      { slug }
    );

    return project || null; // Return the project or null if not found
  } catch (error) {
    console.error("Error fetching project from Sanity:", error);
    return null; // Handle the error and return null
  }
}
