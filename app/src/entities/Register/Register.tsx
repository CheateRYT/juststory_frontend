// pages/auth/Register.tsx
import Link from 'next/link'
import React from 'react'
import styles from '../Login/Login.module.css'

const Register: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Регистрация</h1>
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
						Зарегистироваться
					</button>
				</form>
				<p className={styles.registerText}>
					Есть аккаунт?{' '}
					<Link href='/login' className={styles.link}>
						Войти
					</Link>
				</p>
			</div>
			<footer className={styles.footer}>JustStroy powered by Levio</footer>
		</div>
	)
}

export default Register
