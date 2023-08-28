import { getPage } from "@/sanity/schemas/sanity-utils";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const slug = params.slug;

  try {
    const page = await getPage(slug);

    if (!page) {
      return <div>Page not found</div>;
    }

    return (
      <div>
        <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
          {page.title}
        </h1>
        <div className="text-lg text-gray-700 mt-10">
          <PortableText value={page.content} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    return <div>Error loading page</div>;
  }
}
