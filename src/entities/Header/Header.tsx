'use client'
import Link from 'next/link'
import Logo from '../../components/Logo/Logo'
import styles from './Header.module.css'

const Header = () => {
	return (
		<div className={styles.headerContainer}>
			<header className={styles.header}>
				<div className={styles.logoContainer}>
					<Logo />
				</div>
				<div className={styles.navContainer}>
					<nav className={styles.nav}>
						<ul className={styles.navList}>
							<li>
								<Link href='/login' className={styles.navItem}>
									Войти
								</Link>
							</li>
							<li>
								<Link href='/register' className={styles.navItem}>
									Зарегистрироваться
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<div className={styles.separator} />
		</div>
	)
}

export default Header
