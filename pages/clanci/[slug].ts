import { GetStaticPaths, GetStaticProps } from "next";
import { getArticleContent } from "../../lib/md";
import { articles } from "../../lib/articles";

export default function Clanak({ title, content }: { title: string; content: string }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((a) => ({
    params: { slug: a.url.split("/clanci/")[1] }
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const { title, content } = await getArticleContent(slug);
  return { props: { title, content } };
};
