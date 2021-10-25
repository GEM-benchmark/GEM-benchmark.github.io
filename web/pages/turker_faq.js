import { getFAQData } from "../lib/turker_faq";
import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

export default function Post({ Data }) {
  return (
    <Layout>
      <Head>
        <title>GEM MTurk Annotation FAQ</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          GEM MTurk Annotation FAQ
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: Data.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const Data = await getFAQData();
  return {
    props: {
      Data,
    },
  };
}
