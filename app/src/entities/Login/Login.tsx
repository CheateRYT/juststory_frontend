// pages/auth/index.tsx
import Link from 'next/link'
import React from 'react'
import styles from './Login.module.css'

const Login: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Вход</h1>
				<form className={styles.form}>
					<input
						type='text'
						placeholder='Логин'
						className={styles.input}
						required
					/>
					<input
						type='password'
						placeholder='Пароль'
						className={styles.input}
						required
					/>
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
			<footer className={styles.footer}>JustStroy powered by Levio</footer>
		</div>
	)
}

export default Login
