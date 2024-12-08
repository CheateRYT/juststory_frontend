// lib/store.ts
import { configureStore } from '@reduxjs/toolkit'
import gamesReducer from './entities/games/gamesSlice'
import {
	default as aiReducer,
	default as userReducer,
} from './entities/user/userSlice'
// Создание Redux Store
export const makeStore = () => {
	return configureStore({
		reducer: {
			user: userReducer,
			ai: aiReducer,
			games: gamesReducer,
		},
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Используем типизированные хуки
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<AppStore>()
