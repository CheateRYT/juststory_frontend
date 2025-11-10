'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { registerUser } from '../../../lib/entities/user/userSlice'
import { useAppDispatch } from '../../../lib/store'
import styles from '../Login/Login.module.css'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { useMemo } from 'react'

const Register: React.FC = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const resultAction = await dispatch(registerUser({ login, password }))
		if (registerUser.fulfilled.match(resultAction)) {
			router.push('/login')
		} else {
			setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.authLayout}>
				<div className={styles.leftPane}>
					<div className={styles.brandBox}>
						<h2 className={styles.brandTitle}>Добро пожаловать</h2>
						<p className={styles.brandSubtitle}>Создайте аккаунт и начните приключение</p>
					</div>
					<ul className={styles.featureList}>
						<li><SparklesIcon className={styles.featureIcon} />Доступ к сценариям</li>
						<li><SparklesIcon className={styles.featureIcon} />Синхронизация прогресса</li>
						<li><SparklesIcon className={styles.featureIcon} />Премиальные настройки ИИ</li>
					</ul>

				</div>
				<div className={styles.rightPane}>
					<div className={styles.formHeader}>
						<h1 className={styles.title}>Регистрация</h1>
						<p className={styles.helper}>Пара полей — и вы в игре</p>
					</div>
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
						{error && <p className={styles.errorMessage}>{error}</p>}
						<button type='submit' className={styles.button}>Зарегистироваться</button>
					</form>
					<p className={styles.registerText}>
						Есть аккаунт? <Link href='/login' className={styles.link}>Войти</Link>
					</p>
				</div>
			</div>
			<footer className={styles.footer}>JustStroy powered by GigaChat AI</footer>
		</div>
	)
}

export default Register
