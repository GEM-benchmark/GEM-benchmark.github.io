import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import styles from "./index.module.css";


export default function Post({ }) {
  return (
    <Layout>
      <Head>
        <title>GEM 💎 Resources</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Using our resources.
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div>
          <p>
            As part of GEM, we are continuously producing resources for the research
            community. This page provides download links and brief explanations of
            each.
          </p>
        </div>
        <hr></hr>
        <div className={styles.resources}>
          <div className={styles.resourceName}>
            <Link href="https://storage.googleapis.com/gem-benchmark/scores_and_outputs.zip">Outputs and Scores</Link>
          </div>
          <div className={styles.resourceDetail}>
            Our growing collection of millions of outputs and automatic scores
            for 20+ models across all GEM tasks. This resource be used to work on
            model evaluation, to characterize model shortcomings, and as
            baseline outputs you can compare models to.
          </div>
          <div className={styles.resourceName}>
            <a href="https://huggingface.co/datasets/gem" target="_blank">HuggingFace Loader</a>
          </div>
          <div className={styles.resourceDetail}>
            All our datasets can be loaded via this data loader implemented in
            HuggingFace datasets.
          </div>
          <div className={styles.resourceName}>
            <a href="https://www.tensorflow.org/datasets/catalog/gem" target="_blank">TFDS Loader</a>
          </div>
          <div className={styles.resourceDetail}>
            All our datasets can be loaded via this data loader implemented in TFDS.
          </div>
          <div className={styles.resourceName}>
            <a href="https://github.com/GEM-benchmark/GEM-metrics" target="_blank">Metrics Repository</a>
          </div>
          <div className={styles.resourceDetail}>
            Our package for model evaluation. If you want to compute our full suite
            of metrics with additional convenience functions like caching and parallelism,
            simply add your dataset to it and follow the instructions in the README.
          </div>
          <div className={styles.resourceName}>
            <a href="https://github.com/GEM-benchmark/NL-Augmenter" target="_blank">NL-Augmenter</a>
          </div>
          <div className={styles.resourceDetail}>
            If you want to run robustness tests on your model and data, NL-Augmenter
            can help! More information can be found on <Link href="nl-augmenter">the dedicated site</Link>.
          </div>

        </div>
      </article>
    </Layout>
  );
}
