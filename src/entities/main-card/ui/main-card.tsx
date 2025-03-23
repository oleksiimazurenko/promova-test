'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import { useRouter } from '@bprogress/next'
import { use, useEffect, useState } from 'react'

type CardProps = React.ComponentProps<typeof Card>

export function MainCard({ className, ...props }: CardProps) {
	const [error, setError] = useState(false)
	const [mockPromise, setMockPromise] = useState<Promise<{
		mockResult: string
	}> | null>(null)
	const router = useRouter()

	const mockResolvedPromise = mockPromise ? use(mockPromise) : null
	console.log('mockResolvedPromise', mockResolvedPromise)

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(false)
			}, 1000)
			throw new Error('Я помилка!')
		}
	}, [error])

	return (
		<Card className={cn('w-max max-w-full sm:w-[380px]', className)} {...props}>
			<CardHeader>
				<CardTitle>Вітаю!</CardTitle>
				<CardDescription>
					Ви на головній сторінці з якої є тільки один шлях, це пройти quiz, так
					що у Вас немає варіантів.
				</CardDescription>
			</CardHeader>

			<CardContent className='grid gap-4'>
				<Button
					className='flex items-center space-x-4 rounded-md border p-4'
					onClick={() => {
						setError(true)
					}}
					variant='destructive'
				>
					<div className='flex-1 space-y-1'>
						<p className='text-[16px] font-semibold leading-none'>Я помилка!</p>
					</div>
				</Button>

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
						<p className='text-[16px] font-semibold leading-none'>
							Я Streaming!
						</p>
					</div>
				</Button>

			</CardContent>

			<CardFooter>
				<Button className='w-full' onClick={() => router.push('/quiz/step-1')}>
					Почати проходити квіз
				</Button>
			</CardFooter>
		</Card>
	)
}
