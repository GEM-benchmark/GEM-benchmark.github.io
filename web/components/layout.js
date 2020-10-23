import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Dropdown, Icon, Nav, Navbar } from 'rsuite';

const name = 'GEM Benchmark'
export const siteTitle = 'GEM'

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Benchmark natural language generation systems with GEM."
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header + ' ' + utilStyles.purple}>
        {home ? (
          <>
            <h1 className={utilStyles.headingLg}>{name}</h1>
          </>
        ) : (
            <Navbar appearance="subtle">
              <Navbar.Header>
                <a href="#" className="navbar-brand logo">RSUITE</a>
              </Navbar.Header>
              <Navbar.Body>
                <Nav>
                  <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                  <Nav.Item>News</Nav.Item>
                  <Nav.Item>Products</Nav.Item>
                  <Dropdown title="About">
                    <Dropdown.Item>Company</Dropdown.Item>
                    <Dropdown.Item>Team</Dropdown.Item>
                    <Dropdown.Item>Contact</Dropdown.Item>
                  </Dropdown>
                </Nav>
                <Nav pullRight>
                  <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
                </Nav>
              </Navbar.Body>
            </Navbar>
          )}
      </header>
      <div className={styles.container}>

        <main>{children}</main>
        <div className={styles.push}></div>
      </div>
      <footer className={styles.footer + ' ' + utilStyles.purple}>
        {!home && (
          <span className={styles.backToHome}>
            <Link href="/">
              <a>← Home</a>
            </Link>
          </span>
        )}
        <span>
          For any questions, contact XXX.
    </span>
      </footer>
    </>
  )
}
