'use client'
import Footer from '@/src/entities/Footer/Footer'
import Header from '@/src/entities/Header/Header'
import { validateToken } from '@/src/utils/validateToken'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './Home.module.css'
const Home = () => {
	const router = useRouter()
	const handleNavigation = (path: string) => {
		router.push(path)
	}
	useEffect(() => {
		const token = Cookies.get('token') // Получаем токен из cookies
		if (token) {
			validateToken(token).then(valid => {
				if (!valid) {
					router.push('/login') // Если токен недействителен, перенаправляем на страницу логина
				}
			})
		} else {
			router.push('/login') // Если токена нет, перенаправляем на страницу логина
		}
	}, [router]) // Запускаем при монтировании компонента
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.blocks}>
				<div className={styles.card} onClick={() => handleNavigation('/games')}>
					Сценарии
				</div>
				<div
					className={styles.card}
					onClick={() => handleNavigation('/profile')}
				>
					Профиль
				</div>
				<div
					className={styles.card}
					onClick={() => handleNavigation('/buySub')}
				>
					Тарифы
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Home
