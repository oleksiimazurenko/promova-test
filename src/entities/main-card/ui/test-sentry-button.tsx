'use client'

import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'

export function TestSentryButton() {
	const router = useRouter()
	return (
		<Button
			className='flex items-center space-x-4 rounded-md border p-4 bg-gradient-to-tr from-red-700 to-red-900 hover:scale-[1.01]'
			onClick={() => {
				router.push(`${process.env.NEXT_PUBLIC_APP_URL}/sentry-example-page`)
			}}
			variant='default'
		>
			<div className='flex-1 space-y-1'>
				<p className='text-[16px] font-semibold leading-none'>
					Sentry помилка!
				</p>
			</div>
		</Button>
	)
}
