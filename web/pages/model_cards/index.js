import { getData } from "../../lib/models";
import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ sharedData }) {
  return (
    <Layout>
      <Head>
        <title>GEM Workshop 2021</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          GEM Model Cards
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: sharedData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const sharedData = await getData();
  return {
    props: {
      sharedData,
    },
  };
}
