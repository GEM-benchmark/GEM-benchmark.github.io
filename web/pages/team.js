import Head from "next/head";
import Layout from "../components/layout";
// import Contact from "../components/contact";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./team.module.css";
import { faDribbble, faTwitter } from '@fortawesome/free-brands-svg-icons'
// import { faDribble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const contacts = [
  {
    id: 1, name: "Leanne Graham",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com",
    twitter: "@test"
  },
  {
    id: 2, name: "Ervin Howell",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
  },
  {
    id: 3, name: "Clementine Bauch",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
  },
  {
    id: 4, name: "Clementine Bauch",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
  },
  {
    id: 5, name: "Clementine Bauch",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
  },
  {
    id: 6, name: "Clementine Bauch",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
  },
  {
    id: 7, name: "Patricia Lebsack",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
  }
];

function ContactList(props) {
  return (
    <section className={styles.cards}>{props.contacts.map(c => <Contact key={c.id}
      name={c.name} position={c.position}
      organization={c.organization} website={c.website}
      twitter={c.twitter}/>)}</section>
  );
}

function Contact(props) {
  // Optional Website.
  var website_tag = "";
  if (props.website != undefined) {
    console.log("yay");
    website_tag = (
      <Link href={props.website}>
        <a target="_blank"><FontAwesomeIcon icon={faDribbble} /></a>
      </Link>
    );
  }

  // Optional Twitter tag.
  var twitter_tag = "";
  if (props.twitter != undefined) {
    console.log("yay");
    var twitter_href = "https://twitter.com/" + props.twitter
    twitter_tag = (
      <Link href={twitter_href}>
        <a target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
      </Link>
    );
  }

  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{props.name}</h3>
      <p className={styles.title}>{props.position}</p>
      <p className={styles.title}>{props.organization}</p>
      {website_tag} {twitter_tag}
    </article>
  );
}

export default function Home() {
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
          <ContactList contacts={contacts} />
        </div>
      </article>
    </Layout>
  );
}
