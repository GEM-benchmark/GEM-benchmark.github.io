import { getSortedTasksData } from '../../lib/tasks'
import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'
import Layout, { siteTitle } from '../../components/layout'
import styles from "./index.module.css";

// Load all md files for tasks
export async function getStaticProps() {
  const allTasksData = getSortedTasksData()
  return {
    props: {
      allTasksData
    }
  }
}

export default function Home({ allTasksData }) {
  return (
    <Layout>
      <Head>
        <title>GEM Tasks</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingXl}>
          List of Tasks
        </h2>
        <p className={styles.description}>
          The list below links to data statements [
            <Link href="https://www.aclweb.org/anthology/Q18-1041/" >
            <a target="_blank">
              1
              </a>
          </Link>, <Link href="https://arxiv.org/abs/1803.09010" >
            <a target="_blank">
              2
              </a>
          </Link>] for each of the datasets that are part of GEM tasks.
          The template used to produce the statements
          and a guide on how to write them can be found here: [
            <Link href={`/statement_template.md`}>
            <a download target="_blank">
              download template
              </a>
          </Link>] [
            <Link href={`/data_cards/guide`}>
            <a>
              view guide
              </a>
          </Link>].
        </p>
        <ul className={utilStyles.list}>
          {allTasksData.map(({ id, title, type, motivation }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/data_cards/${id}`}>
                <a className={styles.larger}>{title}</a>
              </Link>
              <span className={utilStyles.smallSpace}></span>
              <small className={utilStyles.lightText}>
                {type}
              </small>
              <span className={utilStyles.smallSpace}></span>
              <div className={styles.dataset}>{motivation}</div>
            </li>
          ))}
        </ul>
      </section>
    </Layout >
  )
}