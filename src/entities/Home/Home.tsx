'use client'
import Footer from '@/src/entities/Footer/Footer'
import Header from '@/src/entities/Header/Header'
import { useRouter } from 'next/navigation'
import styles from './Home.module.css'

const Home = () => {
	const router = useRouter()
	const handleNavigation = (path: string) => {
		router.push(path)
	}

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
