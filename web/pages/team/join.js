import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import styles from "./join.module.css";


export default function Post({}) {
  return (
    <Layout>
      <Head>
        <title>Help us build GEM 💎</title>
      </Head>
      <article>
        <span className={utilStyles.headingXl}>
          Sign up to participate in the GEM Organization
        </span>
        <span className={utilStyles.smallSpace}></span>
        <div>
          <p>
            Please use the form below to sign up to help with GEM. We are
            looking for both junior and senior researchers across many tasks.
            Even if you are only looking to listen and learn, please sign up.
          </p>
          <p>
            The involvement can range from participating in our data hackathon,
            documenting and improving your own dataset, or helping to write documentation,
            to organizing the next workshop or shared task. If the form below does
            not load for you, you can find the form at 
            <a href="https://forms.gle/K3834ezoVSGPxNQQ7" target="_blank"> this URL</a>.
          </p>
        </div>
        <div className={styles.centered}>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScUcmFM1rvmL1qVAatbHajDhqnKbNYK3oi6JzJ0_4wNTkiwog/viewform?embedded=true" width="100%" height="1782" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
        </div>
      </article>
    </Layout>
  );
}
