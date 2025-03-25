'use client'

import { useQuizStore } from '@/entities/question-card/store/use-quiz-store'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'
import { useRouter } from '@bprogress/next'
import { Info } from 'lucide-react'
import { useEffect } from 'react'
import PromovaIcon from '~/public/promova-icon.svg'
import { FromFacebookButton } from './from-facebook-button'
import { FromInstagramButton } from './from-instagram-button'
import { TestErrorButton } from './test-error-button'
import { TestSentryButton } from './test-sentry-button'

type CardProps = React.ComponentProps<typeof Card>

export function MainCard({ className, ...props }: CardProps) {
	const router = useRouter()
	const { resetStep, resetAnswers, setCameFromSource } = useQuizStore()

	useEffect(() => {
		resetStep()
		resetAnswers()
		setCameFromSource(null)
	}, []) // eslint-disable-line

	return (
		<div className='flex flex-col gap-4 items-center justify-center p-5'>
			<Card
				className={cn('w-max max-w-full sm:w-[380px]', className)}
				{...props}
			>
				<CardHeader>
					<CardTitle className='mx-auto text-2xl'>Вітаю!</CardTitle>
					<PromovaIcon className='w-[65px] mx-auto' />
				</CardHeader>

				<CardContent className='grid gap-4'>
					<TestSentryButton />
					<TestErrorButton />
					<FromFacebookButton />
					<FromInstagramButton />
				</CardContent>

				<CardFooter>
					<Button
						className='w-full text-lg'
						onClick={() => router.push('/quiz/step-1')}
					>
						Почати проходити quiz
					</Button>
				</CardFooter>
			</Card>
			<div className='flex flex-col sm:flex-row justify-center items-center gap-4 text-lg font-[600] p-3 text-white rounded-2xl bg-gradient-to-tl from-neutral-400 to-neutral-500'>
				<Info className='min-w-[25px] min-h-[25px]' />
				<p className='text-center w-full'>
					Щоб пройти quiz треба запустити strapi в render (хмарна платформа для
					розгортання веб-додатків)
				</p>
			</div>
		</div>
	)
}
