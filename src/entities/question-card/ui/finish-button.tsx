'use client'

import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowRight } from 'lucide-react'
import posthog from 'posthog-js'
import { useQuizStore } from '../store/use-quiz-store'

type FinishButtonProps = {
	step: number
	total: number
	isDisabledNextButton: boolean
}

export function FinishButton({
	step,
	total,
	isDisabledNextButton,
}: FinishButtonProps) {
	const router = useRouter()

	const { resetStep, resetAnswers, answers } = useQuizStore()

	return (
		total === step && (
			<div>
				<Button
					disabled={isDisabledNextButton}
					onClick={() => {
						if (isDisabledNextButton) return null

						resetStep()
						resetAnswers()
						//* ----------------------------------------------
						posthog.capture('quiz_completed', {
							answers,
							completedAt: new Date().toISOString(),
						})
						//* ----------------------------------------------
						router.push(`/quiz/result`)
					}}
				>
					Почати! <ArrowRight className='ml-1' />
				</Button>
			</div>
		)
	)
}
