import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import StoreProvider from './StoreProvider'

const geistSans = localFont({
	src: './fonts/Butler.woff',
	variable: '--font-butler',
	weight: '100 900',
})

const geistMono = localFont({
	src: './fonts/Butler.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'JustStory',
	description: 'Created by CheateRYT',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<StoreProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
			</StoreProvider>
		</html>
	)
}
