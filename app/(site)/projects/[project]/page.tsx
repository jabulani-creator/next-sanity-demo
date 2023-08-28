import { getProject } from "@/sanity/schemas/sanity-utils";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { project: string };
};

export default async function Project({ params }: Props) {
  const slug = params.project;

  try {
    const project = await getProject(slug);

    if (!project) {
      // Handle the case where no project with the specified slug is found
      return <div>Project not found</div>;
    }

    return (
      <div>
        <header className="flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
            {project.name}
          </h1>
          <a
            href={project.url}
            title="View Project"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
          >
            View Project
          </a>
        </header>

        <div className="text-lg text-gray-700 mt-5">
          <PortableText value={project.content} />
        </div>

        <Image
          src={project.image}
          alt={project.name}
          width={1920}
          height={1080}
          className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
        />
      </div>
    );
  } catch (error) {
    // Handle any errors that occur during data fetching
    console.error("Error fetching project:", error);
    return <div>Error loading project</div>;
  }
}
