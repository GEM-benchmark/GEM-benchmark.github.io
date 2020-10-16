import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import styles from './index.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <h1 className={utilStyles.headingLg}>
        Welcome to 💎GEM!
        </h1>
      <p className={styles.description}>
        The benchmark for Natural Language Generation, Evaluation, and Metrics.
        </p>
      <div className={styles.grid}>
        <Link href="/tasks/">
          <a className={styles.card}>
            <h3>Tasks &rarr;</h3>
            <p>Find in-depth information about the included tasks.</p>
          </a>
        </Link>

        <Link href="/get_started">
          <a className={styles.card}>
            <h3>Get started &rarr;</h3>
            <p>Learn how to load the data and train models.</p>
          </a>
        </Link>

        <Link href="#">
          <a className={styles.card}>
            <h3>Results &rarr;</h3>
            <p>See how models compare across tasks.</p>
          </a>
        </Link>

        <Link href="#">
          <a className={styles.card} >
            <h3>Paper &rarr;</h3>
            <p>
              Read the paper for a more in-depth description of GEM.
            </p>
          </a>
        </Link>
      </div>
    </Layout>
  )
}
