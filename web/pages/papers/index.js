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
            <Link legacyBehavior href="https://aclanthology.org/2021.gem-1.10/"><a className={styles.resourceName}>GEMv1 Overview</a></Link>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>GEM Workshop 2021</small>
          </div>
          <div className={styles.resourceDetail}>
            This is our first overview paper, introducing GEM and the initial set of 13 tasks and associated baselines.
          </div>
          <div className={styles.authors}> Authors: All GEMv1 participants (see <Link legacyBehavior href="team/2021">team list</Link>)</div>
          <div>
            <Link legacyBehavior href="https://arxiv.org/abs/2206.11249"><a className={styles.resourceName}>GEMv2 Overview</a></Link>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>ArXiv</small>
          </div>
          <div className={styles.resourceDetail}>
            This is our second overview paper, expanding GEM to 40 tasks and 51 languages, introducing the automatic evaluation on the HuggingFace Hub.
          </div>
          <div className={styles.authors}> Authors: All GEMv2 participants (see <Link legacyBehavior href="team">team list</Link>)</div>
          <div>
            <Link legacyBehavior href="https://arxiv.org/abs/2202.06935"><a className={styles.resourceNameSmaller}>Repairing the Cracked Foundation: A Survey of Obstacles in Evaluation Practices for Generated Text
</a></Link>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>ArXiv</small>
          </div>
          <div className={styles.resourceDetail}>
            In this survey paper, we discuss many of the principles underlying GEM and propose a set of best practices to follow for model evaluation. See also the <Link legacyBehavior href="https://ml-eval.github.io/assets/pdf/better_eval_in_NLG.pdf">shortened version</Link> presented at the MLEval workshop at ICLR 2022.
          </div>
          <div className={styles.authors}> Authors: Sebastian Gehrmann, Elizabeth Clark, Thibault Sellam</div>

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
            <Link legacyBehavior href="https://arxiv.org/abs/2112.02721"><a className={styles.resourceName}>NL-Augmenter 🦎 → 🐍</a></Link>
            <span className={utilStyles.smallSpace}></span>
            <small className={utilStyles.lightText}>GEM Workshop 2021</small>
          </div>
          <div className={styles.resourceDetail}>
            This was a collaborative &amp; participatory workshop collecting &gt;117 different ways to transform text and &gt;23 ways to filter out subpopulations of datasets.
          </div>
          <div className={styles.authors}> Participants and Authors: Listed in paper (see <Link legacyBehavior href="https://arxiv.org/abs/2112.02721">team list</Link>)</div>
          <div className={styles.authors}> Steering Commitee: Kaustubh Dhole, Varun Gangal, Sebastian Gehrmann, Aadesh Gupta, Zhenhao Li, Saad Mahmood, Simon Mille, Jascha SohlDickstein, Ashish Srivastava, Samson Tan, Tongshuang Wu and Abinaya Mahendiran </div>

        </div>
      </article>
    </Layout>
  );
}
