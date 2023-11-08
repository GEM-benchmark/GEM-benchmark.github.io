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
            measure NLG progress across many NLG tasks across languages.
        </li>
          <li>
            audit data and models and present results via data
            cards and model robustness reports.
        </li>
          <li>
            develop standards for evaluation of generated text using both
            automated and human metrics.
        </li>
        </ul>
        <p className={styles.description}>
          We will regularly update GEM and to encourage
          more inclusive practices in evaluation by extending
          existing data or developing datasets for additional languages.
      </p>
        <div className={styles.grid}>
          <Link legacyBehavior href="/data_cards/">
            <a className={styles.card}>
              <h3>Data Cards</h3>
            </a>
          </Link>

          <Link legacyBehavior href="/tutorials">
            <a className={styles.card}>
              <h3>Tutorials</h3>
            </a>
          </Link>

          <Link legacyBehavior href="/results/">
            <a className={styles.card}>
              <h3>Results</h3>
            </a>
          </Link>

          <Link legacyBehavior href="/papers">
            <a className={styles.card}>
              <h3>Papers</h3>
            </a>
          </Link>

          {/* <Link href="/team">
            <a className={styles.card}>
              <h3>Team</h3>
            </a>
          </Link> */}

          {/* <Link href="/shared_task">
            <a className={styles.card}>
              <h3>Shared Task</h3>
            </a>
          </Link> */}

          <Link legacyBehavior href="/nl_augmenter">
            <a className={styles.card}>
              <h3>NL-Augmenter</h3>
            </a>
          </Link>

          <Link legacyBehavior href="/workshop">
            <a className={styles.card}>
              <h3>Workshop</h3>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
