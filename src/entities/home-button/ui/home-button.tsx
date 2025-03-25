'use client'

import { House } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HomeButton() {
	const pathname = usePathname()
	if (pathname === '/') return null

	return (
		<Link
			href='/'
			className='p-3 rounded-full bg-gradient-to-tl from-neutral-600 to-neutral-700 hover:scale-[1.01]'
		>
			<House stroke='white' />
		</Link>
	)
}
