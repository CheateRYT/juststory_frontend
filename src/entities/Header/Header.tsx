"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo/Logo";
import styles from "./Header.module.css";
import Cookies from "js-cookie";
import { validateToken } from "../../utils/validateToken"; // Убедитесь, что путь к функции validateToken правильный

const Header = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      validateToken(token).then((valid) => {
        setIsTokenValid(valid);
      });
    }
  }, []);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {isTokenValid ? (
                <>
                  <li>
                    <Link href="/home" className={styles.navItem}>
                      Главная
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className={styles.navItem}>
                      Профиль
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className={styles.navItem}>
                      Войти
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className={styles.navItem}>
                      Зарегистрироваться
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <div className={styles.separator} />
    </div>
  );
};

export default Header;
