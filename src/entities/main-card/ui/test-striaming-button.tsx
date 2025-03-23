'use client'

import { Button } from '@/shared/ui/button'
import { use, useState } from 'react'

export function TestStreamingButton() {
	const [mockPromise, setMockPromise] = useState<Promise<{
		mockResult: string
	}> | null>(null)

	// eslint-disable-next-line 
	mockPromise && use(mockPromise)

	return (
		<Button
			className='flex items-center space-x-4 rounded-md border p-4 bg-gradient-to-tl from-neutral-300 to-neutral-500 hover:scale-[1.01]'
			onClick={() => {
				setMockPromise(
					new Promise(resolve => {
						setTimeout(() => {
							resolve({ mockResult: 'Я результат!' })
						}, 3000)
					})
				)
			}}
			variant='default'
		>
			<div className='flex-1 space-y-1'>
				<p className='text-[16px] font-semibold leading-none'>Тест Streaming!</p>
			</div>
		</Button>
	)
}
