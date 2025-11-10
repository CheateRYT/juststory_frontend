'use client'
import Footer from '@/src/entities/Footer/Footer'
import Header from '@/src/entities/Header/Header'
import { validateToken } from '@/src/utils/validateToken'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Home.module.css'
import { Squares2X2Icon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline'

const Home = () => {
	const router = useRouter()
	const handleNavigation = (path: string) => {
		router.push(path)
	}
	useEffect(() => {
		const token = Cookies.get('token')
		if (token) {
			validateToken(token).then(valid => {
				if (!valid) {
					//router.push('/login')
				}
			})
		} else {
			//router.push('/login')
		}
	}, [router])

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
			},
		}),
	}

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.content}>
				<motion.div
					className={styles.hero}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className={styles.title}>Добро пожаловать в JustStory</h1>
					<p className={styles.subtitle}>
						Текстовая приключенческая игра с искусственным интеллектом
					</p>
				</motion.div>

				<div className={styles.cardsGrid}>
					<motion.div
						className={styles.card}
						onClick={() => handleNavigation('/games')}
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						custom={0}
						whileHover={{ scale: 1.02, y: -5 }}
						whileTap={{ scale: 0.98 }}
					>
						<Squares2X2Icon className={styles.cardIcon} />
						<h2 className={styles.cardTitle}>Сценарии</h2>
						<p className={styles.cardDescription}>
							Выберите готовый сценарий или создайте свой собственный
						</p>
					</motion.div>

					<motion.div
						className={styles.card}
						onClick={() => handleNavigation('/profile')}
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						custom={1}
						whileHover={{ scale: 1.02, y: -5 }}
						whileTap={{ scale: 0.98 }}
					>
						<UserIcon className={styles.cardIcon} />
						<h2 className={styles.cardTitle}>Профиль</h2>
						<p className={styles.cardDescription}>
							Управляйте настройками и просматривайте историю игр
						</p>
					</motion.div>

					<motion.div
						className={styles.card}
						onClick={() => handleNavigation('/buySub')}
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						custom={2}
						whileHover={{ scale: 1.02, y: -5 }}
						whileTap={{ scale: 0.98 }}
					>
						<CreditCardIcon className={styles.cardIcon} />
						<h2 className={styles.cardTitle}>Тарифы</h2>
						<p className={styles.cardDescription}>
							Выберите подходящий тариф для полного доступа
						</p>
					</motion.div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Home
