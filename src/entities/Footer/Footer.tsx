"use client";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.separator} />
      <footer className={styles.footer}>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link href="/about" className={styles.navItem}>
                  О нас
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/CheateRYT/juststory_frontend/tree/master"
                  className={styles.navItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Исходный код
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
