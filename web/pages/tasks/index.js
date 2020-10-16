import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Tasks</title>
      </Head>
      <h1>
        Tasks
      </h1>
    </Layout>
  )
}