'use client'
import {
	getActions,
	sendMessage,
	sendMessageFirst,
} from '@/lib/entities/ai/aiSlice'
import TypeIt from 'typeit-react'

import { validateToken } from '@/src/utils/validateToken'
import Cookies from 'js-cookie'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Game.module.css'

const Game = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { actions, loading, error } = useSelector(state => state.ai)
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
	const handleImageBtn = async () => {}
	const handleButtonClick = async () => {
		const resultAction = await dispatch(getActions(currentMessage))
		if (getActions.fulfilled.match(resultAction)) {
			setModalOpen(true)
		}
	}

	const handleSendMessage = async () => {
		if (inputValue) {
			const resultAction = await dispatch(
				sendMessage({ message: currentMessage, prompt: inputValue })
			)
			if (sendMessage.fulfilled.match(resultAction)) {
				const responseMessage = resultAction.payload.initial
				setHistory(prev => prev + '\n' + responseMessage)
				setCurrentMessage(responseMessage)
				setInputValue('')
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
						<TypeIt options={{ speed: 10, cursor: false }} key={index}>
							{msg}
						</TypeIt>
					))}
				</div>
				<div className={styles.inputContainer}>
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
					<button className={styles.actionButton} onClick={handleButtonClick}>
						Варианты действий
					</button>
					<button className={styles.actionButton} onClick={handleImageBtn}>
						Картинка
					</button>
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
