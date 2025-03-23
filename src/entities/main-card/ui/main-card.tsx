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
import PromovaIcon from '~/public/promova-icon.svg'
import { FromFacebookButton } from './from-facebook-button'
import { FromInstagramButton } from './from-instagram-button'
import { TestErrorButton } from './test-error-button'
import { TestSentryButton } from './test-sentry-button'
import { TestStreamingButton } from './test-striaming-button'

type CardProps = React.ComponentProps<typeof Card>

export function MainCard({ className, ...props }: CardProps) {
	const router = useRouter()

	return (
		<div className='flex flex-col gap-4 items-center justify-center'>
			<Card
				className={cn('w-max max-w-full sm:w-[380px]', className)}
				{...props}
			>
				<CardHeader>
					<CardTitle className='mx-auto text-2xl'>Вітаю!</CardTitle>
					<CardDescription className='text-lg mx-auto'>
						Головна сторінка
					</CardDescription>
				</CardHeader>

				<CardContent className='grid gap-4'>
					<TestSentryButton />
					<TestErrorButton />
					<TestStreamingButton />
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
			<PromovaIcon className='w-[65px]' />
		</div>
	)
}
