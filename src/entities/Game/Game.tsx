'use client'
import {
	getActions,
	sendMessage,
	sendMessageFirst,
} from '@/lib/entities/ai/aiSlice'
import { validateToken } from '@/src/utils/validateToken'
import Cookies from 'js-cookie'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TypeIt from 'typeit-react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Game.module.css'

const Game = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { actions, loading, error, imagePath } = useSelector(state => state.ai)
	const params = useParams()
	const currentGameScene = params.game
	const decodedCurrentGameScene =
		typeof currentGameScene === 'string'
			? decodeURIComponent(currentGameScene).replace(/-/g, ' ')
			: 'Игра не найдена'
	const formattedGameScene =
		decodedCurrentGameScene.charAt(0).toUpperCase() +
		decodedCurrentGameScene.slice(1)

	const [inputValue, setInputValue] = useState<string>('')
	const [isModalOpen, setModalOpen] = useState<boolean>(false)
	const [history, setHistory] = useState<string>('')
	const [currentMessage, setCurrentMessage] = useState<string>('')
	const [chooseAction, setChooseAction] = useState<string>('Сделать')
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
	const [loadingSendMessage, setLoadingSendMessage] = useState<boolean>(false)
	useEffect(() => {
		const token = Cookies.get('token')
		if (token) {
			validateToken(token).then(valid => {
				if (!valid) {
					router.push('/login')
				} else {
					fetchData()
				}
			})
		} else {
			router.push('/login')
		}
	}, [router])

	const fetchData = async () => {
		const messageResponse = await dispatch(sendMessageFirst(formattedGameScene))
		if (sendMessageFirst.fulfilled.match(messageResponse)) {
			const responseMessage = messageResponse.payload.message
			setCurrentMessage(responseMessage)
			setHistory('')
			setHistory(prev => prev + responseMessage)
		}
	}

	const handleImageBtn = async () => {
		// const resultAction = await dispatch(generateImage(currentMessage))
		// if (generateImage.fulfilled.match(resultAction)) {
		// 	setModalOpen(true) // Открываем модальное окно для отображения изображения
		// }
	}

	const handleButtonClick = async () => {
		const resultAction = await dispatch(getActions(currentMessage))
		if (getActions.fulfilled.match(resultAction)) {
			setModalOpen(true)
		}
	}

	const handleSendMessage = async () => {
		if (inputValue) {
			setLoadingSendMessage(true)
			const resultAction = await dispatch(
				sendMessage({
					message: currentMessage,
					prompt: `Вы ${chooseAction}: ` + inputValue,
				})
			)
			if (sendMessage.fulfilled.match(resultAction)) {
				const responseMessage = resultAction.payload.initial
				const actionText =
					chooseAction === 'Сказать'
						? 'решили сказать'
						: chooseAction === 'Событие'
						? 'вызвали событие'
						: 'выбрали действие'
				const formattedInputValue =
					inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
				setHistory(
					prev =>
						prev +
						'\n\n' +
						`<p class="${styles.whiteText}">Вы ${actionText}: ${formattedInputValue} </p>` +
						'\n' +
						responseMessage
				)
				setCurrentMessage(responseMessage)
				setInputValue('')
				setLoadingSendMessage(false)
			}
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSendMessage()
		}
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen)
	}

	const handleActionSelect = (action: string) => {
		setChooseAction(action)
		setDropdownOpen(false)
	}

	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.gameContent}>
				<h1 className={styles.header}>
					Игровой сценарий: {formattedGameScene}
				</h1>
				<div className={styles.historyArea}>
					{!history && <TypeIt>Печатаем...</TypeIt>}
					{history.split('\n').map((msg, index) => (
						<TypeIt
							options={{ speed: 10, cursor: false }}
							key={msg + index} // Убедитесь, что ключ уникален
							dangerouslySetInnerHTML={{ __html: msg }}
						/>
					))}
					{loadingSendMessage && (
						<TypeIt options={{ speed: 30 }} className={styles.whiteText}>
							<p>Печатаем продолжение истории...</p>
						</TypeIt>
					)}
				</div>
				<div className={styles.inputContainer}>
					<button className={styles.actionButton} onClick={toggleDropdown}>
						{chooseAction}
					</button>
					{isDropdownOpen && (
						<div className={styles.dropdown}>
							<div
								className={styles.dropdownItem}
								onClick={() => handleActionSelect('Сделать')}
							>
								Сделать
							</div>
							<div
								className={styles.dropdownItem}
								onClick={() => handleActionSelect('Сказать')}
							>
								Сказать
							</div>
							<div
								className={styles.dropdownItem}
								onClick={() => handleActionSelect('Событие')}
							>
								Событие
							</div>
						</div>
					)}
					<textarea
						className={styles.inputField}
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						placeholder='Введите текст'
						onKeyDown={handleKeyDown}
					/>
					<button className={styles.sendButton} onClick={handleSendMessage}>
						Отправить
					</button>
					{/* <button className={styles.actionButton} onClick={handleButtonClick}>
						Варианты действий
					</button>
					<button className={styles.actionButton} onClick={handleImageBtn}>
						Картинка
					</button> */}
				</div>
				{isModalOpen && (
					<div className={styles.modalOverlay}>
						<div className={styles.modal}>
							<h2>Модальное окно</h2>
							{loading && <p>Загрузка...</p>}
							{error && <p>{error}</p>}
							{actions.map((action, index) => (
								<button
									key={index}
									className={styles.actionButton}
									onClick={() => handleButtonClick(action)}
								>
									{action}
								</button>
							))}
							{imagePath && (
								<img src={imagePath} alt='Сгенерированное изображение' />
							)}
							<button onClick={closeModal}>Закрыть</button>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}

export default Game
