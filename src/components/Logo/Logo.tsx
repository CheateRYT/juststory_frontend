import Link from 'next/link'
import styles from './Logo.module.css'

const Logo = () => {
	return (
		<div className={styles.logoContainer}>
			<Link href='/' className={styles.logoLink}>
				<span className={styles.logoText}>Just</span>
				<span className={styles.logoText}> Story</span>
			</Link>
			<span className={styles.poweredBy}>Powered by GigaChat AI</span>
		</div>
	)
}

export default Logo
