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
          <div className={styles.resourceName}>
            <Link href="https://aclanthology.org/2021.gem-1.10/">GEMv1 Overview</Link>
          </div>
          <div className={styles.resourceDetail}>
            In ""
          <span className="authors">Authors: Angelina McMillan-Major, Salomey Osei, Juan Diego Rodriguez, Pawan Sasanka Ammanamanchi, Sebastian Gehrmann, Yacine Jernite</span> 
          <span className="venue">GEM Workshop 2021</span> 
          </div>
          <div className={styles.resourceName}>
            <a href="https://aclanthology.org/2021.gem-1.11/" target="_blank">Data Cards</a>
          </div>
          <div className={styles.resourceDetail}>
            In "Reusable Templates and Guides For Documenting Datasets and Models for Natural Language Processing and Generation: A Case Study of the HuggingFace and GEM Data and Model Cards", 
            XXX
            <span className="authors">Authors: Angelina McMillan-Major, Salomey Osei, Juan Diego Rodriguez, Pawan Sasanka Ammanamanchi, Sebastian Gehrmann, Yacine Jernite</span> 
            <span className="venue">GEM Workshop 2021</span> 
          </div>
          <div className={styles.resourceName}>
            <a href="https://openreview.net/forum?id=CSi1eu_2q96" target="_blank">Evaluation Suites</a>
          </div>
          <div className={styles.resourceDetail}>
            In the paper "Automatic Construction of Evaluation Suites for Natural Language Generation Datasets", 
            we discuss how to build data collections that test robustness of models and show that they
            are much more expressive than typical test splits. 
            <span className="authors">Authors: Simon Mille, Kaustubh Dhole, Saad Mahamood, Laura Perez-Beltrachini, Varun Gangal, Mihir Kale, Emiel van Miltenburg, Sebastian Gehrmann</span>,
            <span className="venue">NeurIPS 2021</span> 
          </div>

        </div>
      </article>
    </Layout>
  );
}
