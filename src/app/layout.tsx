import MetaDataset from '@/shared/lib/meta-dataset-script'
import { cn } from '@/shared/lib/utils'
import Providers from '@/shared/providers'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'

import { HomeButton } from '@/entities/home-button'
import { Toaster } from '@/shared/ui/sonner'
import './globals.css'

const nunito = Nunito({
	subsets: ['latin', 'cyrillic'],
	display: 'swap',
	weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
})

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
}

export const metadata: Metadata = {
	title: 'Мовний квіз | Promova',
	description:
		'Пройди короткий тест та отримай персоналізований план вивчення мови з Promova',
	metadataBase: new URL('https://promova.com'),
	openGraph: {
		title: 'Мовний квіз | Promova',
		description: 'Отримай персональні рекомендації для вивчення мов',
		url: 'https://promova.com',
		siteName: 'Promova',
		images: [
			{
				url: '/images/og-image.jpg',
				width: 1200,
				height: 630,
			},
		],
		locale: 'uk_UA',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='uk'>
			<body
				className={cn(
					`${nunito.className} antialiased flex flex-col justify-center items-center min-h-screen bg-black/10`
				)}
			>
				<Providers>
					<main className='flex flex-col gap-5 min-h-screen justify-center items-center px-3'>
						{children}
						<HomeButton />
					</main>
				</Providers>
				<footer className='flex flex-col gap-2 items-center justify-center font-mono text-sm p-12 text-center'>
					<div>Прав немає, нічого не захищено © 2025</div>
				</footer>

				{/* Google Analytics */}
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />

				{/* Google Tag Manager */}
				<GoogleTagManager
					gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!}
				/>

				{/* Meta Pixel */}
				<MetaDataset datasetID={process.env.NEXT_PUBLIC_META_PIXEL_ID!} />

				<Toaster />
			</body>
		</html>
	)
}
