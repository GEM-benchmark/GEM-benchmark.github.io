import { getData } from "../lib/render_md";
import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

export default function Post({ sharedTaskData }) {
  return (
    <Layout>
      <Head>
        <title>GEMv2 Hackathon</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Hackathon for GEMv2
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: sharedTaskData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const sharedTaskData = await getData("2022/hackathon.md");
  return {
    props: {
      sharedTaskData,
    },
  };
}
