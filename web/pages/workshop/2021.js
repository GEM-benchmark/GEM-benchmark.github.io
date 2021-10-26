import { getWorkshopData } from "../../lib/workshop";
import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ workshopData }) {
  return (
    <Layout>
      <Head>
        <title>GEM Workshop 2021</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          GEM Workshop at ACL 2021
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div dangerouslySetInnerHTML={{ __html: workshopData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const workshopData = await getWorkshopData();
  return {
    props: {
      workshopData,
    },
  };
}
