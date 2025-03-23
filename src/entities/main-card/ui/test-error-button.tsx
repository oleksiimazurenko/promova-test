'use client'

import { Button } from '@/shared/ui/button'
import { useEffect, useState } from 'react'

export function TestErrorButton() {
	const [error, setError] = useState(false)

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(false)
			}, 1000)
			throw new Error('Я помилка!')
		}
	}, [error])

	return (
		<Button
			className='flex items-center space-x-4 rounded-md border p-4 bg-gradient-to-tr from-red-300 to-red-400 hover:scale-[1.01]'
			onClick={() => {
				setError(true)
			}}
			variant='destructive'
		>
			<div className='flex-1 space-y-1'>
				<p className='text-[16px] font-semibold leading-none'>Відтворення помилки!</p>
			</div>
		</Button>
	)
}
