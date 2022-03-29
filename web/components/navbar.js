// Module that contains the navigation bar.
import React from "react";
import utilStyles from "../styles/utils.module.css";
import styles from "./navbar.module.css";
import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMobileClick = this.handleMobileClick.bind(this);
    this.state = {
      active: false,
    };
  }
  handleMobileClick() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  // export function handleNavbar() {
  //   //    $(".nav").handleMobileClick("mobilenav");

  // }

  render() {
    return (
      <div className={styles.navwrapper}>
        <div className={styles.gradbar}></div>
        <nav className={styles.navbar}>
          <span className={utilStyles.headingLg + " " + styles.navbarlogo}>
            <Link href="/">
              <a>GEM BENCHMARK</a>
            </Link>
          </span>

          <div
            className={styles.menutoggle}
            id="mobile-menu"
            onClick={this.handleMobileClick}
          >
            <FontAwesomeIcon className={styles.bar} icon={faBars} />
          </div>
          <ul
            className={
              this.state.active
                ? styles.nav + " " + styles.mobilenav
                : styles.nav
            }
          >
            <li
              className={
                this.state.active
                  ? styles.navitem
                  : styles.navitem + " " + styles.pushright
              }
            >
              <Link href="/resources/">
                <a>Resources</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/data_cards/">
                <a>Data Cards</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/model_cards">
                <a>Model Cards</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/tutorials">
                <a>tutorials</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/results/">
                <a>Results</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/papers/">
                <a>Papers</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/team">
                <a>Team</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/workshop">
                <a>Workshop</a>
              </Link>
            </li>
            {/* <li className={styles.navitem}>
              <Link href="/shared_task">
                <a>Shared Task</a>
              </Link>
            </li> */}
            {/* <li className={styles.navitem}>
              <Link href="/nl_augmenter">
                <a>NL-Augmenter</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/hackathon">
                <a>Hackathon</a>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
