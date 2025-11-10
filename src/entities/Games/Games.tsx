'use client'
import {
	loadStateFromLocalStorage,
	setImage,
	setScript,
} from '@/lib/entities/games/gamesSlice' // Импортируйте ваши действия
import Footer from '@/src/entities/Footer/Footer'
import Header from '@/src/entities/Header/Header'
import { MagnifyingGlassIcon, TagIcon } from '@heroicons/react/24/outline'
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
	const [userScripts, setUserScripts] = useState<any[]>([]) // Состояние для пользовательских сценариев
	const [query, setQuery] = useState('')
	const [activeCategory, setActiveCategory] = useState<string>('Все')
	// Получаем сценарий из Redux
	const script = useSelector((state: any) => state.games.script)

	// Загружаем состояние из Local Storage при монтировании компонента
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

	const presetCards = [
		{
			image: '/startScenesImg/stevekreeper.jpeg',
			text: 'Побег стива из Minecraft от Крипера',
			category: 'Фэнтези',
		},
		{
			image: '/startScenesImg/pudgedartveider.jpg',
			text: 'Драка Pudge из Dota 2 на мид линии против Дарт Вейдера',
			category: 'Баттл',
		},
		{
			image: '/startScenesImg/gedrunmagic.jpeg',
			text: 'Магический мир Гэдрун и путешествие вампира',
			category: 'Фэнтези',
		},
		{
			image: '/startScenesImg/cybertron.jpeg',
			text: 'Кибертрон: Восстание машин',
			category: 'Научная фантастика',
		},
		{
			image: '/startScenesImg/mafia.jpeg',
			text: 'Мафия 30-х годов во время сухого закона',
			category: 'Криминал',
		},
		{
			image: '/startScenesImg/bands.jpeg',
			text: 'Война банд Лос-Анджелеса за территорию',
			category: 'Криминал',
		},
		{
			image: '/startScenesImg/kira.jpeg',
			text: 'Романтичная Кира девочка кошечка и семейная жизнь обычного парня в аниме',
			category: 'Романтика',
		},
		{
			image: '/startScenesImg/ribalka.jpeg',
			text: 'Русский мужик на зимней рыбалке поймал рыбу дракона',
			category: 'Комедия',
		},
	]

	const categories = ['Все', 'Фэнтези', 'Баттл', 'Научная фантастика', 'Криминал', 'Романтика', 'Комедия']

	const mergedCards = presetCards.concat(userScripts)
	const filteredCards = mergedCards.filter(card => {
		const byQuery = query.trim().length === 0 || card.text.toLowerCase().includes(query.toLowerCase())
		const byCategory = activeCategory === 'Все' || (card.category ? card.category === activeCategory : true)
		return byQuery && byCategory
	})

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.layout}>
				<aside className={styles.sidebar}>
					<div className={styles.sidebarHeader}>Категории</div>
					<ul className={styles.categoryList}>
						{categories.map(cat => (
							<li key={cat}>
								<button
									className={`${styles.categoryButton} ${activeCategory === cat ? styles.categoryActive : ''}`}
									onClick={() => setActiveCategory(cat)}
								>
									<TagIcon className={styles.categoryIcon} /> {cat}
								</button>
							</li>
						))}
					</ul>
					<button className={styles.createButton} onClick={handleOpenModal}>Создать свой сценарий</button>
				</aside>

				<main className={styles.main}>
					<div className={styles.searchRow}>
						<div className={styles.searchBox}>
							<MagnifyingGlassIcon className={styles.searchIcon} />
							<input
								type='text'
								placeholder='Поиск сценариев...'
								value={query}
								onChange={e => setQuery(e.target.value)}
								className={styles.searchInput}
							/>
						</div>
					</div>

					<div className={styles.cardsContainer}>
				{/* Отображение заранее созданных карточек */}
					{filteredCards.map((card: any, index: number) => (
						<div
							key={index}
							className={styles.card}
							onClick={() => handleCardClick(card.text)}
						>
							<Image
								src={card.image || '/startScenesImg/default-image.jpeg'}
								alt={`Карточка ${index + 1}`}
								className={styles.cardImage}
								width={150}
								height={150}
							/>
							<div className={styles.cardBody}>
								<p className={styles.cardTitle}>{card.text}</p>
								{card.category && <span className={styles.pill}>{card.category}</span>}
							</div>
						</div>
					))}
				</div>
				</main>
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
