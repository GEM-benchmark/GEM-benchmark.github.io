import Head from "next/head";
import Layout from "../components/layout";
// import Contact from "../components/contact";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./team.module.css";

const contacts = [
  {
    id: 1, name: "Leanne Graham",
    position: "Assistant Professor",
    organization: "UBC",
    website: "https://test.com"
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
    <section class={styles.cards}>{props.contacts.map(c => <Contact key={c.id}
      name={c.name} position={c.position}
      organization={c.organization} website={c.website} />)}</section>
  );
}

function Contact(props) {
  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{props.name}</h3>
      <h4 className={styles.title}>{props.position} | {props.organization}</h4>
      <p>{props.website}</p>
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
