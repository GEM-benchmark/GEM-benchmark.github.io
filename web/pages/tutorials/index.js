import { getSortedData } from "../../lib/render_md_list";
import Layout from "../../components/layout";
import Link from 'next/link'
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import styles from "./index.module.css";

export default function Post({ allData }) {
  return (
    <Layout>
      <Head>
        <title>GEM Model Cards</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          GEM Tutorials
        </span>
        <p className={styles.description}>
          Here you can find all information to get started using
          GEM datasets, models, and resources, and how to add new datasets.
        </p>
        <span className={utilStyles.smallSpace}></span>
        <ul className={utilStyles.list}>
          {allData.map(({ id, title, type, background }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/tutorials/${id}`}>
              <a className={styles.larger}>{title}</a>
              </Link>
              <span className={utilStyles.smallSpace}></span>
              <small className={utilStyles.lightText}>
                {type}
              </small>
              <span className={utilStyles.smallSpace}></span>
              <div className={styles.model}>{background}</div>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
}

// Load all md files for tasks
export async function getStaticProps() {
  const allData = getSortedData('tutorials');
  return {
    props: {
      allData
    }
  }
}