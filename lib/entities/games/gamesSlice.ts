import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
	script: string
	image: string | null
}

const initialState: GameState = {
	script: '',
	image: null,
}

const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		setScript(state, action: PayloadAction<string>) {
			state.script = action.payload
			localStorage.setItem('userScript', action.payload) // Сохранение в Local Storage
		},
		setImage(state, action: PayloadAction<string | null>) {
			state.image = action.payload
			localStorage.setItem('userImage', action.payload || '') // Сохранение в Local Storage
		},
		loadStateFromLocalStorage(state) {
			const script = localStorage.getItem('userScript')
			const image = localStorage.getItem('userImage')
			if (script) {
				state.script = script
			}
			if (image) {
				state.image = image
			}
		},
	},
})

export const { setScript, setImage, loadStateFromLocalStorage } =
	gamesSlice.actions
export default gamesSlice.reducer
