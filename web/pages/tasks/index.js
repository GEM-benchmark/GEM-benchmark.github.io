import { getSortedTasksData } from '../../lib/tasks'
import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'
import Layout, { siteTitle } from '../../components/layout'

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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg + " " + utilStyles.accentUnderline}>List of Tasks</h2>
        <ul className={utilStyles.list}>
          {allTasksData.map(({ id, title, type }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/tasks/${id}`}>
                <a>{title}</a>
              </Link>
              <span className={utilStyles.smallSpace}></span>
              <small className={utilStyles.lightText}>
                {type}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout >
  )
}