import Head from "next/head";
import Layout from "../../components/layout";
// import Contact from "../components/contact";
import Link from "next/link";
import React from "react";
import utilStyles from "../../styles/utils.module.css";
import styles from "./index.module.css";
import { getTeamData } from "../../lib/team";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faUser);

function Contact(props) {

  // Optional Website links.

  var website_tag = "";
  if (props.website != '') {
    website_tag = (
      <a href={props.website} target="_blank"><FontAwesomeIcon className={utilStyles.icon} icon="user" /></a>
    );
  }

  // Optional Twitter tag.
  var twitter_tag = "";
  if (props.twitter != '') {
    var twitter_href = "https://twitter.com/" + props.twitter
    twitter_tag = (
      <a href={twitter_href} target="_blank"><FontAwesomeIcon className={utilStyles.icon} icon={faTwitter} /></a>
    );
  }

  // Combine the socials through spacers.
  var socials = "";
  if (twitter_tag != "" || website_tag != "") {
    socials = (
      <div>
        {website_tag} <span className={styles.spacer}></span> {twitter_tag}
      </div>
    )
  }

  var tags_bar = "";
  if (props.tags != '' && props.tags != undefined) {
    tags_bar = (
      <div className={styles.tags}>
        {props.tags.map(function(d, idx){
         return (<div key={idx}>{d}</div>)
       })}
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{props.name}</h3>
      <p className={styles.title}>{props.organization}</p>
      <div className={styles.note}>{props.note}</div>
      {socials}
      {tags_bar}
    </div>
  );
}

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    var contact_cards = this.props.contacts.map((c, idx) =>
      <Contact
        key={idx}
        name={c.name} position={c.position}
        organization={c.organization} website={c.website}
        twitter={c.twitter}
        note={c.note}
        tags={c.tags} />
    );

    this.state = {
      contact_cards: contact_cards
    };
  }

  componentDidMount() {
    let temp = this.state.contact_cards.slice();
    for (let i = temp.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    this.setState({ contact_cards: temp });
  }

  render() {
    return (
      <section className={styles.cards}>
        {this.state.contact_cards}
      </section>
    );
  }
}


export default function Home({ teamData }) {
  return (
    <Layout home>
      <Head>
        <title>GEMv2 Team 2022</title>
      </Head>
      <article>
        <div className={utilStyles.headingXl}>
          GEMv2 Team
        </div>
        <div className={styles.description}>
          GEM is a community-driven effort to improve evaluation of
          natural language generation. It would not be possible without
          a large group of collaborators to take on challenging tasks.
          You can see the contributor list to GEMv1 <Link legacyBehavior href="/team/2021"><a>here</a></Link>.

          <p>
            This page acts as a directory of our amazing contributors. If you want to
            join the organization,  <Link legacyBehavior href="/team/join">
              <a>click here to fill out the sign-up form.</a></Link>
          </p>

        </div>
        <div className={styles.centered}>
          <ContactList contacts={teamData.teamMembers} />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const teamData = await getTeamData("2022");
  return {
    props: {
      teamData,
    },
  };
}