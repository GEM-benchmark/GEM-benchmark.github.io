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
      <div className={styles.centerpage}>
        <p className={styles.description}>
          GEM is a benchmark environment for Natural Language Generation with a focus on its
          Evaluation, both through human annotations and automated Metrics.
      </p>
        <p className={styles.description}>GEM aims to:</p>
        <ul className={styles.description}>
          <li>
            measure NLG progress across 13 datasets spanning many NLG tasks
            and languages.
        </li>
          <li>
            provide an in-depth analysis of data and models presented via data
            statements and challenge sets.
        </li>
          <li>
            develop standards for evaluation of generated text using both
            automated and human metrics.
        </li>
        </ul>
        <p className={styles.description}>
          It is our goal to regularly update GEM and to encourage
          toward more inclusive practices in dataset development by extending
          existing data or developing datasets for additional languages.
      </p>
        <div className={styles.grid}>
          <Link href="/data_cards/">
            <a className={styles.card}>
              <h3>Data Cards</h3>
            </a>
          </Link>

          <Link href="/tutorials">
            <a className={styles.card}>
              <h3>Tutorials</h3>
            </a>
          </Link>

          <Link href="/results/">
            <a className={styles.card}>
              <h3>Results</h3>
            </a>
          </Link>

          <a className={styles.card} href="https://arxiv.org/abs/2102.01672" target="_blank">
            <h3>Paper</h3>
          </a>

          <Link href="/team">
            <a className={styles.card}>
              <h3>Team</h3>
            </a>
          </Link>

          {/* <Link href="/shared_task">
            <a className={styles.card}>
              <h3>Shared Task</h3>
            </a>
          </Link> */}

          <Link href="/nl_augmenter">
            <a className={styles.card}>
              <h3>NL-Augmenter</h3>
            </a>
          </Link>

          <Link href="/workshop">
            <a className={styles.card}>
              <h3>Workshop</h3>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
