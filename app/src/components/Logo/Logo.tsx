import Link from 'next/link'

const Logo = () => {
	return (
		<div className='flex flex-col items-start'>
			<Link href='/' className='flex items-center text-3xl font-bold mb-1'>
				<span className='text-white'>Just</span>
				<span className='text-white'> Story</span>
			</Link>
			<span className='text-white text-sm'>Powered by Levio</span>
		</div>
	)
}

export default Logo
