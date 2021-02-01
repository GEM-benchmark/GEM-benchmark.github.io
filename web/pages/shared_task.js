import { getSharedTaskData } from "../lib/shared_task";
import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

export default function Post({ sharedTaskData }) {
  return (
    <Layout>
      <Head>
        <title>GEM Workshop 2021</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Shared Task at the GEM Workshop at ACL 2021
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: sharedTaskData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const sharedTaskData = await getSharedTaskData();
  return {
    props: {
      sharedTaskData,
    },
  };
}
