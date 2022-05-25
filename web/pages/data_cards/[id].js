import { getAllTaskIds, getTaskData } from '../../lib/tasks'
import Layout from '../../components/layout'
import Head from 'next/head'
import Link from "next/link";
import utilStyles from '../../styles/utils.module.css'
import IframeResizer from 'iframe-resizer-react'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Post({ taskData }) {

  const card_path = "/cards/" + taskData.id + ".html"
  return (
    <Layout wideContainer>
      <Head>
        <title>GEM {taskData.title}</title>
      </Head>
      <article>
        <Link href="/data_cards/">
          <a><FontAwesomeIcon className={utilStyles.icon} icon={faArrowLeft} /></a>
        </Link>
        <span className={utilStyles.spacer}></span>
        <span className={utilStyles.headingXl}>{taskData.title}</span>
        <span className={utilStyles.smallSpace}></span>
        <span className={utilStyles.lightText}>
          {taskData.type}
        </span>

        <IframeResizer
          heightCalculationMethod="lowestElement"
          log
          src={card_path}
          style={{ width: '1px', minWidth: '100%'}}
          frameBorder="0"
        />
      </article>
    </Layout>
  )
}


export async function getStaticPaths() {
  const paths = getAllTaskIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const taskData = await getTaskData(params.id)
  return {
    props: {
      taskData
    }
  }
}
