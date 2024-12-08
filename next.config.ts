const nextConfig = {
	images: {
		// Разрешаем все домены
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**', // Все домены
				port: '', // Порт не указан
			},
			{
				protocol: 'http',
				hostname: '**', // Все домены
				port: '', // Порт не указан
			},
		],
	},
}

module.exports = nextConfig
