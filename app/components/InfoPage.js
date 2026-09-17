import Link from "next/link";
import styles from "../info.module.css";
import BrandMark from "./BrandMark";

export default function InfoPage({ eyebrow, title, intro, children }) {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.mark}>
            <BrandMark />
          </Link>
          <div className={styles.links}>
            <a href="/about-us">About us</a>
            <a href="/contact-us">Contact us</a>
            <a href="/privacy-policy">Privacy policy</a>
            <a href="/terms-and-conditions">Terms &amp; conditions</a>
            <Link href="/" className={styles.backLink}>Back home</Link>
          </div>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
        </div>
      </header>

      <article className={styles.content}>
        <div className={styles.container}>{children}</div>
      </article>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div>
            <div className={styles.mark}><BrandMark /></div>
            <p>Practical guidance from professionals, available by live chat.</p>
          </div>
          <div className={styles.footerLinks}>
            <a href="/privacy-policy">Privacy policy</a>
            <a href="/terms-and-conditions">Terms &amp; conditions</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
