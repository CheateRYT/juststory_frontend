'use client'
import Footer from '@/src/entities/Footer/Footer'
import Header from '@/src/entities/Header/Header'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './Games.module.css'

const Games = () => {
	const router = useRouter()
	const cardsData = [
		{
			image: '/startScenesImg/stevekreeper.jpeg',
			text: 'Побег стива из Minecraft от Крипера',
		},
		{
			image: '/startScenesImg/pudgedartveider.jpg',
			text: 'Драка Pudge из Dota 2 на мид линии против Дарт Вейдера',
		},
		{
			image: '/startScenesImg/gedrunmagic.jpeg',
			text: 'Магический мир Гэдрун и путешествие вампира',
		},
		{
			image: '/startScenesImg/cybertron.jpeg',
			text: 'Кибертрон: Восстание машин',
		},
		{
			image: '/startScenesImg/mafia.jpeg',
			text: 'Мафия 30-х годов во время сухого закона',
		},
		{
			image: '/startScenesImg/bands.jpeg',
			text: 'Война банд Лос-Анджелеса за территорию',
		},
		{
			image: '/startScenesImg/kira.jpeg',
			text: 'Романтичная Кира девочка кошечка и семейная жизнь обычного парня в аниме',
		},
		{
			image: '/startScenesImg/ribalka.jpeg',
			text: 'Русский мужик на зимней рыбалке поймал рыбу дракона',
		},
	]

	const handleCardClick = (text: string) => {
		const formattedText = text.replace(/\s+/g, '-').toLowerCase()
		router.push(`/games/${formattedText}`)
	}

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.header}>
				<button className={styles.createButton}>Создать свой сценарий</button>
			</div>
			<div className={styles.cardsContainer}>
				{cardsData.map((card, index) => (
					<div
						key={index}
						className={styles.card}
						onClick={() => handleCardClick(card.text)}
					>
						<Image
							src={card.image}
							alt={`Карточка ${index + 1}`}
							className={styles.cardImage}
							width={150}
							height={150}
						/>
						<p>{card.text}</p>
					</div>
				))}
			</div>
			<Footer />
		</div>
	)
}

export default Games
