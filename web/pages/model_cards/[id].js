import { getAllIds } from '../../lib/render_md_list'
import { getData } from '../../lib/render_md'

import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ taskData }) {
  return (
    <Layout>
      <Head>
        <title>GEM {taskData.title}</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>{taskData.title}</span>
        <span className={utilStyles.smallSpace}></span>
        <span className={utilStyles.lightText}>
          {taskData.type}
        </span>

        <div dangerouslySetInnerHTML={{ __html: taskData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllIds('models')
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const taskData = await getData(`models/${params.id}.md`)
  return {
    props: {
      taskData
    }
  }
}
