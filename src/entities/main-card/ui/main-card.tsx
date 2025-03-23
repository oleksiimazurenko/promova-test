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
import { FromFacebookButton } from './from-facebook-button'
import { TestErrorButton } from './test-error-button'
import { TestStreamingButton } from './test-striaming-button'

type CardProps = React.ComponentProps<typeof Card>

export function MainCard({ className, ...props }: CardProps) {
	const router = useRouter()

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
				<TestErrorButton />
				<TestStreamingButton />
				<FromFacebookButton />
			</CardContent>

			<CardFooter>
				<Button className='w-full' onClick={() => router.push('/quiz/step-1')}>
					Почати проходити квіз
				</Button>
			</CardFooter>
		</Card>
	)
}
