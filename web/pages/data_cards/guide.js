import { getData } from "../../lib/render_md";
import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ guideData }) {
  return (
    <Layout>
      <Head>
        <title>Getting Started with data statements</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Getting Started with Data Statements
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: guideData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const guideData = await getData("statement_guide.md");
  return {
    props: {
      guideData,
    },
  };
}
