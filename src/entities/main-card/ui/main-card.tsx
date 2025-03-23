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
import { Info } from 'lucide-react'
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
			<div className='text-center flex justify-center items-center gap-4 text-lg font-[600] p-3 text-white rounded-2xl bg-gradient-to-tl from-neutral-400 to-neutral-500'>
				<Info className='min-w-[25px] min-h-[25px]' />
				Щоб пройти quiz треба запустити strapi в render (хмарна платформа для
				розгортання веб-додатків)
			</div>
			<PromovaIcon className='w-[65px]' />
		</div>
	)
}
