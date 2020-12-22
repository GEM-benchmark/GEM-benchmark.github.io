import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./team.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>GEM Team</title>
      </Head>
      <article>
        <div className={utilStyles.headingXl}>
          Team
        </div>
        <p className={styles.description}>
          GEM is a community-driven effort with the goal to improve how progress in
          natural language generation is measured. It would not be possible without
          a large group of collaborators to take on challenging tasks. This page
          acts as a directory of our amazing contributors:
      </p>
      </article>
    </Layout>
  );
}
