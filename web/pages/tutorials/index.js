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
        <h2 className={utilStyles.headingLg}>Text Walkthroughs</h2>
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
        <h2 className={utilStyles.headingLg}>Video Guides</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <a href="https://www.youtube.com/watch?v=DpK478-ozPE" target="_blank" className={styles.larger}>Creating a filter</a>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>
              Transformation
            </small>
            <span className={utilStyles.smallSpace}></span>
            <div className={styles.model}>This walkthrough shows you how to create a filter from scratch using NL-Augmenter.</div>
          </li>
        </ul>
        <h2 className={utilStyles.headingLg}>Interactive Notebooks</h2>
        <ul className={utilStyles.list}>
          <li className={utilStyles.listItem}>
            <a href="https://github.com/GEM-benchmark/GEM-benchmark.github.io/blob/main/web/data/notebooks/GEM_Hackathon_2021_filters_tutorial.ipynb" target="_blank" className={styles.larger}>Creating a filter</a>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>
              Transformation
            </small>
            <span className={utilStyles.smallSpace}></span>
            <div className={styles.model}>This notebook shows you how to create a filter from scratch using NL-Augmenter. Please see the accompanying video for in-depth explanations.</div>
          </li>
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