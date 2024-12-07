'use client'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from '../../components/Logo/Logo'
import { validateToken } from '../../utils/validateToken'
import styles from './Header.module.css'

const Header = () => {
	const [isTokenValid, setIsTokenValid] = useState(false)
	const [isLoading, setIsLoading] = useState(true) // Состояние для отслеживания загрузки

	useEffect(() => {
		const token = Cookies.get('token')
		if (token) {
			validateToken(token).then(valid => {
				setIsTokenValid(valid)
				setIsLoading(false)
			})
		} else {
			setIsLoading(false)
		}
	}, [])

	return (
		<div>
			<header className={styles.header}>
				<div className={styles.logoContainer}>
					<Logo />
				</div>
				<div
					className={`${styles.navContainer} ${
						isLoading ? styles.fadeOut : styles.fadeIn
					}`}
				>
					<nav className={styles.nav}>
						<ul className={styles.navList}>
							{isTokenValid ? (
								<>
									<li>
										<Link href='/home' className={styles.navItem}>
											Главная
										</Link>
									</li>
									<li>
										<Link href='/profile' className={styles.navItem}>
											Профиль
										</Link>
									</li>
								</>
							) : (
								<>
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
								</>
							)}
						</ul>
					</nav>
				</div>
			</header>
			<div className={styles.separator} />
		</div>
	)
}

export default Header
