'use client'

import { Button } from '@/shared/ui/button'
import { use, useState } from 'react'

export function TestStreamingButton() {
	const [mockPromise, setMockPromise] = useState<Promise<{
		mockResult: string
	}> | null>(null)

	const mockResolvedPromise = mockPromise ? use(mockPromise) : null
	console.log('mockResolvedPromise', mockResolvedPromise)

	return (
		<Button
			className='flex items-center space-x-4 rounded-md border p-4'
			onClick={() => {
				setMockPromise(
					new Promise(resolve => {
						setTimeout(() => {
							resolve({ mockResult: 'Я результат!' })
						}, 3000)
					})
				)
			}}
			variant='ghost'
		>
			<div className='flex-1 space-y-1'>
				<p className='text-[16px] font-semibold leading-none'>Я Streaming!</p>
			</div>
		</Button>
	)
}
