import { getData } from "../lib/render_md";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import styles from "./nl_augmenter.module.css";
import Layout from "../components/layout";

export default function Post({nlAugmenterData}) {
    return (
        <Layout nlAugmenter>
            <Head>
                <title>NL-Augmenter</title>
            </Head>
            <article>
        <span className={`${utilStyles.headingXl} ${styles.heading}`}>
          NL-Augmenter 🦎 → 🐍
        </span>
                <span className={utilStyles.smallSpace}></span>
                <div dangerouslySetInnerHTML={{ __html: nlAugmenterData.contentHtml }} />
            </article>
        </Layout>
    );
}

export async function getStaticProps() {
    const nlAugmenterData = await getData("nl_augmenter.md");
    return {
        props: {
            nlAugmenterData,
        },
    };
}