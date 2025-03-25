'use client'

import { useQuizStore } from '@/entities/question-card/store/use-quiz-store'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export function ResultCard() {
	const { answers, questions } = useQuizStore()

	const { data, error, isLoading } = useSWR(
		['/api/quiz-summary', { answers, questions }],
		([url, payload]) => fetcher(url, payload)
	)

	const [displayedText, setDisplayedText] = useState('')
	const [isTyping, setIsTyping] = useState(false)

	useEffect(() => {
		if (data?.result && !isTyping) {
			setIsTyping(true)
			let currentIndex = 0
			const fullText = data.result

			const typingInterval = setInterval(() => {
				if (currentIndex < fullText.length) {
					setDisplayedText(fullText.slice(0, currentIndex + 1))
					currentIndex++
				} else {
					clearInterval(typingInterval)
					setIsTyping(false)
				}
			}, 50)

			return () => clearInterval(typingInterval)
		}
	}, [data]) // eslint-disable-line

	if (isLoading)
		return (
			<div className='flex flex-col items-center justify-center gap-2'>
				<LoaderCircle className=' animate-spin' />
				<div>Чекаємо відповідь від штучного інтелекту...</div>
			</div>
		)
	if (error) return <div>Сталась помилка до запиту ШІ</div>

	return (
		<div>
			{displayedText || 'Очікування відповіді...'}
			{isTyping && <span className='blinking-cursor'>|</span>}
		</div>
	)
}

const fetcher = async (url: string, payload: object) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		throw new Error('An error occurred while fetching the data.')
	}

	return response.json()
}
