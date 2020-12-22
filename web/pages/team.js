import Head from "next/head";
import Layout from "../components/layout";
import Contact from "../components/contact";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./team.module.css";

function ContactList(props) {
  return (
    <div>{props.contacts.map(c => <Contact key={c.id} name={c.name}
      occupation={c.occupation} website={c.website} />)}</div>
  );
}

const contacts = [
  {
    id: 1, name: "Leanne Graham",
    occupation: "Assistant Professor, UBC",
    website: "https://test.com"
  },
  {
    id: 2, name: "Ervin Howell",
    occupation: "Assistant Professor, UBC",
    website: "https://test.com"
  },
  {
    id: 3, name: "Clementine Bauch",
    occupation: "Assistant Professor, UBC",
    website: "https://test.com"
  },
  {
    id: 4, name: "Patricia Lebsack",
    occupation: "Assistant Professor, UBC",
    website: "https://test.com"
  }
];

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
        <ContactList contacts={contacts} />
      </article>
    </Layout>
  );
}
