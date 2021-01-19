import Head from "next/head";
import Layout from "../components/layout";
// import Contact from "../components/contact";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./team.module.css";
import { getTeamData } from "../lib/team";
import { faDribbble, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function ContactList(props) {
  // First shuffle order in which members are shown.
  const shuffled_contacts = shuffleArray(props.contacts)
  // Then render a card for each.
  return (
    <section className={styles.cards}>
      {shuffled_contacts.map((c, idx) => <Contact
        key={idx}
        name={c.name} position={c.position}
        organization={c.organization} website={c.website}
        twitter={c.twitter}
        note={c.note} />)
      }
    </section>
  );
}

function Contact(props) {
  console.log(props);

  // Optional Website link.
  var website_tag = "";
  if (props.website != '') {
    website_tag = (
      <Link href={props.website}>
        <a target="_blank"><FontAwesomeIcon icon={faDribbble} /> Web</a>
      </Link>
    );
  }
  console.log(website_tag);

  // Optional Twitter tag.
  var twitter_tag = "";
  if (props.twitter != '') {
    var twitter_href = "https://twitter.com/" + props.twitter
    twitter_tag = (
      <Link href={twitter_href}>
        <a target="_blank"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
      </Link>
    );
  }

  console.log(twitter_tag);

  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{props.name}</h3>
      <p className={styles.title}>{props.position}</p>
      <p className={styles.title}>{props.organization}</p>
      <p>
      {website_tag} <span className={styles.spacer}></span> {twitter_tag}
      </p>
      <p className={styles.note}>{props.note}</p>
    </article>
  );
}

export default function Home({ teamData }) {
  return (
    <Layout home>
      <Head>
        <title>GEM Team</title>
      </Head>
      <article>
        <div className={utilStyles.headingXl}>
          Team
        </div>
        <p className={styles.description}>
          GEM is a community-driven effort with the goal to improve how progress in
          natural language generation is measured. It would not be possible without
          a large group of collaborators to take on challenging tasks. This page
          acts as a directory of our amazing contributors:
      </p>
        <div className={styles.centered}>
          <ContactList contacts={teamData.teamMembers} />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const teamData = await getTeamData();
  return {
    props: {
      teamData,
    },
  };
}