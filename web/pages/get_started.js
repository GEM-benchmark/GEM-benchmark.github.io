import { getTutorialData } from "../lib/tutorial";
import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

export default function Post({ tutorialData }) {
  return (
    <Layout>
      <Head>
        <title>GEM Getting Started</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Getting Started <code> coding</code>.
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: tutorialData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const tutorialData = await getTutorialData();
  return {
    props: {
      tutorialData,
    },
  };
}
