import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p className={styles.description}>
        GEM is a benchmark for Natural Language Generation with a focus on its
        Evaluation, both through human annotations and automated Metrics.
      </p>
      <p className={styles.description}>GEM aims to:</p>
      <ul className={styles.description}>
        <li>
          measure NLG progress across 12 datasets spanning multiple NLG tasks
          and 10+ languages.
        </li>
        <li>
          provide an in-depth analysis of data and models presented via data
          statements and challenge sets.
        </li>
        <li>
          develop standards for evaluation of generated text using both
          automated and human metrics
        </li>
      </ul>
      <p className={styles.description}>
        All model submissions may be used as part of shared evaluation tasks.
      </p>
      <p className={styles.description}>
        It is our goal to update GEM yearly and use the committee to drive
        toward more inclusive practices in dataset development by extending
        existing data or developing datasets for additional languages.
      </p>
      <div className={styles.grid}>
        <Link href="/tasks/">
          <a className={styles.card}>
            <h3>Tasks</h3>
          </a>
        </Link>

        <Link href="/get_started">
          <a className={styles.card}>
            <h3>How to</h3>
          </a>
        </Link>

        <Link href="#">
          <a className={styles.card}>
            <h3>Results</h3>
          </a>
        </Link>

        <Link href="#">
          <a className={styles.card}>
            <h3>Paper</h3>
          </a>
        </Link>

        <Link href="#">
          <a className={styles.card}>
            <h3>Team</h3>
          </a>
        </Link>

        <Link href="#">
          <a className={styles.card}>
            <h3>Workshop</h3>
          </a>
        </Link>
      </div>
    </Layout>
  );
}
