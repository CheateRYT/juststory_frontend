import { backendApiUrl } from '@/src/utils/backendApiUrl'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Интерфейс для состояния
interface AIState {
	actions: string[]
	loading: boolean
	error: string | null
	message: string | null // Добавляем состояние для полученного сообщения
}

const initialState: AIState = {
	actions: [],
	loading: false,
	error: null,
	message: null, // Изначально сообщение равно null
}

// Асинхронное действие для получения действий
export const getActions = createAsyncThunk<string[], string>(
	'ai/getActions',
	async message => {
		const response = await axios.post(`${backendApiUrl}/ai/get-actions`, {
			message,
		})
		console.log('getActions response:', response.data) // Логируем ответ
		return response.data.split('!') // Разделяем ответ по восклицательному знаку
	}
)

// Асинхронное действие для отправки первого сообщения
export const sendMessageFirst = createAsyncThunk<string, string>(
	'ai/sendMessageFirst',
	async message => {
		const response = await axios.post(
			`${backendApiUrl}/ai/send-message-start`,
			{
				message,
			}
		)
		console.log('sendMessageFirst response:', response.data) // Логируем ответ
		return response.data // Возвращаем ответ от сервера
	}
)

// Асинхронное действие для отправки сообщения
export const sendMessage = createAsyncThunk<
	string,
	{ message: string; prompt: string }
>('ai/sendMessage', async ({ message, prompt }) => {
	const response = await axios.post(`${backendApiUrl}/ai/send-message`, {
		message,
		prompt,
	})
	console.log('sendMessage response:', response.data) // Логируем ответ
	return response.data // Возвращаем ответ от сервера
})

const aiSlice = createSlice({
	name: 'ai',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getActions.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(getActions.fulfilled, (state, action) => {
				state.loading = false
				state.actions = action.payload
			})
			.addCase(getActions.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка получения действий'
			})
			.addCase(sendMessageFirst.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(sendMessageFirst.fulfilled, (state, action) => {
				state.loading = false
				state.message = action.payload // Сохраняем полученное сообщение
			})
			.addCase(sendMessageFirst.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка отправки сообщения'
			})
			.addCase(sendMessage.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.loading = false
				// Здесь можно обработать ответ, если нужно
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка отправки сообщения'
			})
	},
})

export default aiSlice.reducer
