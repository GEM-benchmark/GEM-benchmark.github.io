import { getData } from "../lib/render_md";
import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

export default function Post({ sharedTaskData }) {
  return (
    <Layout>
      <Head>
        <title>GEM 2024</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          GEM Shared Task at the Generation Challenges (INLG'24)
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: sharedTaskData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const sharedTaskData = await getData("2024/shared_task.md");
  return {
    props: {
      sharedTaskData,
    },
  };
}
