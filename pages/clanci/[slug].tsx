import ArticleFeedback from "../../components/ArticleFeedback";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getArticleContent } from "../../lib/md";
import { articles } from "../../lib/articles";

export default function Clanak({
  title,
  content,
  cover,
  author,
  date,
  slug,
}: {
  title: string;
  content: string;
  cover: string | null;
  author: string;
  date: string | null;
  slug: string;
}) {
  return (
    <>
      <Head>
        <title>{title} | Gde-Kako.rs</title>
        <meta name="description" content={content.slice(0, 150).replace(/<[^>]+>/g, "")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.slice(0, 150).replace(/<[^>]+>/g, "")} />
        <meta property="og:image" content={`https://tvojprojekat.vercel.app${cover || "/default-og.jpg"}`} />
        <meta property="og:url" content={`https://tvojprojekat.vercel.app/clanci/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={content.slice(0, 150).replace(/<[^>]+>/g, "")} />
        <meta name="twitter:image" content={`https://tvojprojekat.vercel.app${cover || "/default-og.jpg"}`} />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 max-w-3xl mx-auto space-y-6">
        {cover && <img src={cover} alt={title} className="rounded-xl border" />}
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{author} {date && `• ${new Date(date).toLocaleDateString("sr-RS")}`}</p>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        /><ArticleFeedback slug={slug} />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map((a) => ({
    params: { slug: a.url.split("/clanci/")[1] },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const article = await getArticleContent(slug);
  return {
    props: {
      ...article,
      slug,
    },
  };
};
