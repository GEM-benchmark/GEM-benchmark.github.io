import utilStyles from "../styles/utils.module.css";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={styles.navwrapper}>
      <div className={styles.gradbar}></div>
      <nav className={styles.navbar}>
        <span className={utilStyles.headingLg + " " + utilStyles.accent}>
            <Link href="/">
              <a>GEM Benchmark</a>
            </Link>
          </span>
        <div className={styles.menutoggle} id="mobile-menu">
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul className={styles.nav}>
          <li className={styles.navitem}><a href="#">Tasks</a></li>
          <li className={styles.navitem}><a href="#">How To</a></li>
          <li className={styles.navitem}><a href="#">Results</a></li>
          <li className={styles.navitem}><a href="#">Paper</a></li>
          <li className={styles.navitem}><a href="#">Team</a></li>
          <li className={styles.navitem}><a href="#">Workshop</a></li>
        </ul>
      </nav>
    </div>
  )
}