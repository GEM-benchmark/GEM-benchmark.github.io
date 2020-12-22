// Component to render a GEM member's contact details.

import styles from "./layout.module.css";

function Contact(props) {
  return (
    <div className={styles.contact}>
      <span>{props.name}</span>
      <span>{props.occupation}</span>
      <span>{props.website}</span>
    </div>
  );
}

export default Contact;
