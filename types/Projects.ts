import { PortableTextBlock } from "sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  url: string;
  slug: string;
  image: string;
  content: PortableTextBlock[];
};
