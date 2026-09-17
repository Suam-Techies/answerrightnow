"use client";

import { useState } from "react";
import styles from "../page.module.css";
import BrandMark from "./BrandMark";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.wrap}>
        <a href="#" className={styles.navMark}>
          <BrandMark />
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`} id="navLinks">
          <li><a href="#">Home</a></li>
          <li><a href="/about-us">About us</a></li>
          <li><a href="/contact-us">Contact us</a></li>
        </ul>

        <div className={styles.navCta}>
          <button
            type="button"
            className={styles.navToggle}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
