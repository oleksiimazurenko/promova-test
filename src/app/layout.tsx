import MetaDataset from '@/shared/lib/meta-dataset-script'
import { cn } from '@/shared/lib/utils'
import Providers from '@/shared/providers'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { House } from 'lucide-react'
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import Link from 'next/link'

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
					`${nunito.className} antialiased flex flex-col justify-center items-center min-h-screen`
				)}
			>
				<Providers>
					<main className='flex min-h-screen justify-center items-center px-3'>
						{children}
						<Link
							href='/'
							className='fixed right-3 bottom-3 p-3 rounded-full bg-gradient-to-tl from-neutral-600 to-neutral-700 hover:scale-[1.01]'
						>
							<House stroke='white' />
						</Link>
					</main>
				</Providers>
				<footer className='flex flex-col gap-2 items-center justify-center font-mono text-sm p-12 '>
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
			</body>
		</html>
	)
}
