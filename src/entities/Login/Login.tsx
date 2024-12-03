'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { loginUser } from '../../../lib/entities/user/userSlice'
import { useAppDispatch } from '../../../lib/store'
import styles from './Login.module.css'

const Login: React.FC = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const resultAction = await dispatch(loginUser({ login, password }))
		if (loginUser.fulfilled.match(resultAction)) {
			router.push('/home')
		} else {
			setError('Ошибка входа. Пожалуйста, проверьте введенные данные.')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Вход</h1>
				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Логин'
						className={`${styles.input} ${error ? styles.error : ''}`}
						value={login}
						onChange={e => {
							setLogin(e.target.value)
							setError(null)
						}}
						required
					/>
					<input
						type='password'
						placeholder='Пароль'
						className={`${styles.input} ${error ? styles.error : ''}`}
						value={password}
						onChange={e => {
							setPassword(e.target.value)
							setError(null)
						}}
						required
					/>
					{error && <p className={styles.errorMessage}>{error}</p>}{' '}
					<button type='submit' className={styles.button}>
						Войти
					</button>
				</form>
				<p className={styles.registerText}>
					Нет аккаунта?{' '}
					<Link href='/register' className={styles.link}>
						Зарегистрироваться
					</Link>
				</p>
			</div>
			<footer className={styles.footer}>JustStroy powered by GigaChat</footer>
		</div>
	)
}

export default Login
