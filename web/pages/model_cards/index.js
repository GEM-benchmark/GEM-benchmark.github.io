import { getSortedTasksData } from "../../lib/models";
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
          GEM Model Cards
        </span>
        <p className={styles.description}>
          The list below links to the work-in-progress data cards for models submitted to GEM. As part of our submission process, we ask participants a series of questions about their models. The current version of our model cards lists the provided answers verbatim.
          The submission form can be found <a href="https://forms.gle/pds6cbBf2Gf2VGMv7" target="_blank">here</a>. The template used to produce the statements
          and can be found here: [
            <Link href={`/model_card_template.md`}>
            <a download target="_blank">
              download template
              </a>
          </Link>].
        </p>
        <span className={utilStyles.smallSpace}></span>
        <ul className={utilStyles.list}>
          {allData.map(({ id, title, type, background }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/model_cards/${id}`}>
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
  const allData = getSortedTasksData()
  return {
    props: {
      allData
    }
  }
}