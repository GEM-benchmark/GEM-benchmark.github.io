// Global module with layout information.

import Head from "next/head";
import styles from "./layout.module.css";
import nlAugmenterStyles from "../pages/nl_augmenter.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Navbar from './navbar'

const name = "GEM Benchmark";
export const siteTitle = "GEM";

export default function Layout({ children, home, nlAugmenter, wideContainer}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Benchmark natural language generation systems with GEM."
        />
        <meta
          property="og:image"
          content="https://og-image.now.sh/**GEM**%20Benchmark.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
        <div className={`${styles.background} ${nlAugmenter && nlAugmenterStyles.background}`}>
          <header className={styles.header}>
            <Navbar></Navbar>
          </header>
          <div className={`${styles.container} ${wideContainer && styles.wideContainer}`}>
            <main>{children}</main>
            <div className={styles.push}></div>
          </div>
          <footer className={styles.footer + " " + utilStyles.eggshell}>
            {!home && (
              <span className={styles.backToHome}>
                <Link href="/">
                  <a>← Home</a>
                </Link>
              </span>
            )}
            <span>If you have any questions, please join our <a href="https://groups.google.com/g/gem-benchmark" target="_blank" className={utilStyles.accentUnderline}>
              google group
              </a> for support.
            </span>
          </footer>
        </div>
    </>
  );
}
