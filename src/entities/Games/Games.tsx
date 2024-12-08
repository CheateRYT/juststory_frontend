'use client'
import {
	loadStateFromLocalStorage,
	setImage,
	setScript,
} from '@/lib/entities/games/gamesSlice' // Импортируйте ваши действия
import Footer from '@/src/entities/Footer/Footer'
import Header from '@/src/entities/Header/Header'
import { validateToken } from '@/src/utils/validateToken'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Games.module.css'

const Games = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [imagePath, setImagePath] = useState('') // Состояние для пути к картинке
	const [userScripts, setUserScripts] = useState([]) // Состояние для пользовательских сценариев

	// Получаем сценарий из Redux
	const script = useSelector(state => state.games.script)

	// Загружаем состояние из Local Storage при монтировании компонента
	useEffect(() => {
		const token = Cookies.get('token')
		if (token) {
			validateToken(token).then(valid => {
				if (!valid) {
					router.push('/login')
				}
			})
		} else {
			router.push('/login')
		}

		// Загружаем состояние из Local Storage
		dispatch(loadStateFromLocalStorage())

		// Загружаем пользовательские сценарии из localStorage
		const savedScripts = localStorage.getItem('userScripts')
		if (savedScripts) {
			setUserScripts(JSON.parse(savedScripts))
		}
	}, [router, dispatch])

	const handleCardClick = (text: string) => {
		const formattedText = text.replace(/\s+/g, '-').toLowerCase()
		router.push(`/games/${formattedText}`)
	}

	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setImagePath('') // Сбрасываем состояние пути к картинке
	}

	const handleRunScript = () => {
		const formattedScript = script.replace(/\s+/g, '-').toLowerCase()
		dispatch(setImage(imagePath)) // Устанавливаем путь к картинке

		// Добавляем новый сценарий в состояние
		const newScript = { text: script, image: imagePath || null }
		const updatedScripts = [...userScripts, newScript]

		setUserScripts(updatedScripts)
		localStorage.setItem('userScripts', JSON.stringify(updatedScripts)) // Сохраняем в localStorage

		router.push(`/games/${formattedScript}`)
		handleCloseModal()
	}

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.header}>
				<button className={styles.createButton} onClick={handleOpenModal}>
					Создать свой сценарий
				</button>
			</div>
			<div className={styles.cardsContainer}>
				{/* Отображение заранее созданных карточек */}
				{[
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
					.concat(userScripts)
					.map((card, index) => (
						<div
							key={index}
							className={styles.card}
							onClick={() => handleCardClick(card.text)}
						>
							<Image
								src={card.image || '/startScenesImg/default-image.jpeg'} // Замените на изображение по умолчанию, если путь не указан
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
			{isModalOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<h2 className={styles.title}>Создать свой сценарий</h2>
						<label>
							Сценарий:
							<textarea
								onChange={e => dispatch(setScript(e.target.value))} // Обновляем сценарий в Redux
								className={styles.textAreaField}
							/>
						</label>
						<label>
							Путь к картинке (необязательно):
							<input
								type='text'
								value={imagePath}
								onChange={e => setImagePath(e.target.value)} // Обновляем путь к картинке
								className={styles.textInputField}
							/>
						</label>
						<button className={styles.runButton} onClick={handleRunScript}>
							Запустить сценарий
						</button>
						<button className={styles.closeButton} onClick={handleCloseModal}>
							Закрыть
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Games
