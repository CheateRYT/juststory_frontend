'use client'
import Link from 'next/link'
import Logo from '../../components/Logo/Logo'

const Header = () => {
	return (
		<div className=' bg-black mx-auto'>
			<header className=' mx-auto container  p-4 flex justify-between items-center bg-black text-white gap-2'>
				<div className='flex items-center'>
					<Logo />
				</div>
				<div className='flex items-center justify-end'>
					<div className='text-right'>
						<nav className='container mx-auto pt-2 pb-4 font-bold'>
							<ul className='flex justify-between gap-5 text-center'>
								<li>
									<Link
										href='/login'
										className='bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition'
									>
										Войти
									</Link>
								</li>
								<li>
									<Link
										href='/register'
										className='bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition'
									>
										Зарегистрироваться
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
			<div className='bg-purple-600 h-0.5 w-full' />
		</div>
	)
}

export default Header
