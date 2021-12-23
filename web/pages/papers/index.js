import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import utilStyles from "../../styles/utils.module.css";
import styles from "./index.module.css";


export default function Post({ }) {
  return (
    <Layout>
      <Head>
        <title>GEM 💎 Papers</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Our publications.
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div>
          <p>
            We are regularly publishing papers on aspects of GEM that describe findings
            or resources we find worthwhile to share. Please have a look below:
          </p>
        </div>
        <hr></hr>
        <div className={styles.resources}>
          <div>
            <Link href="https://aclanthology.org/2021.gem-1.10/"><a className={styles.resourceName}>GEMv1 Overview</a></Link>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>GEM Workshop 2021</small>
          </div>
          <div className={styles.resourceDetail}>
            This is our first overview paper, introducing GEM and the initial set of tasks and baselines.
          </div>
          <div className={styles.authors}> Authors: All GEMv1 participants (see <Link href="team/2021">team list</Link>)</div>

          <div>
            <a href="https://aclanthology.org/2021.gem-1.11/" target="_blank" className={styles.resourceName}>Data Cards</a>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>GEM Workshop 2021</small>
          </div>
          <div className={styles.resourceDetail}>
            In "Reusable Templates and Guides For Documenting Datasets and Models for Natural Language Processing and Generation: A Case Study of the HuggingFace and GEM Data and Model Cards",
            we describe the approach for data documentation in GEMv1 and the similar approach used by HuggingFace datasets.</div>
            <div className={styles.authors}>Authors: Angelina McMillan-Major, Salomey Osei, Juan Diego Rodriguez, Pawan Sasanka Ammanamanchi, Sebastian Gehrmann, Yacine Jernite</div>
          <div>
            <a href="https://openreview.net/forum?id=CSi1eu_2q96" target="_blank" className={styles.resourceName}>Evaluation Suites</a>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>NeurIPS 2021</small>
          </div>
          <div className={styles.resourceDetail}>
            In the paper "Automatic Construction of Evaluation Suites for Natural Language Generation Datasets",
            we discuss how to build data collections that test robustness of models and show that they
            are much more expressive than typical test splits.
            </div>
            <div className={styles.authors}>Authors: Simon Mille, Kaustubh Dhole, Saad Mahamood, Laura Perez-Beltrachini, Varun Gangal, Mihir Kale, Emiel van Miltenburg, Sebastian Gehrmann</div>
          <div>
            <Link href="https://arxiv.org/abs/2112.02721"><a className={styles.resourceName}>NL-Augmenter 🦎 → 🐍</a></Link>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>GEM Workshop 2021</small>
          </div>
          <div className={styles.resourceDetail}>
            This was a collaborative & participatory workshop collecting >117 different ways to transform text and >23 ways to filter out subpopulations of datasets. 
          </div>
          <div className={styles.authors}> Participants and Authors: Listed in paper (see <Link href="https://arxiv.org/abs/2112.02721">team list</Link>)</div>
          <div className={styles.authors}> Steering Commitee: Kaustubh Dhole, Varun Gangal, Sebastian Gehrmann, Aadesh Gupta, Zhenhao Li, Saad Mahmood, Simon Mille, Jascha SohlDickstein, Ashish Srivastava, Samson Tan, Tongshuang Wu and Abinaya Mahendiran </div>

        </div>
      </article>
    </Layout>
  );
}
