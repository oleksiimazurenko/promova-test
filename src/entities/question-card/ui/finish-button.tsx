'use client'

import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowRight } from 'lucide-react'
import posthog from 'posthog-js'
import { useQuizStore } from '../store/use-quiz-store'

type FinishButtonProps = {
	step: string
	lastStep: string
	isDisabledNextButton: boolean
}

export function FinishButton({
	step,
	lastStep,
	isDisabledNextButton,
}: FinishButtonProps) {
	const router = useRouter()

	const { resetStep, answers } = useQuizStore()

	return (
		lastStep === step && (
			<div>
				<Button
					disabled={isDisabledNextButton}
					onClick={() => {
						if (isDisabledNextButton) return null

						resetStep()
						// resetAnswers()
						// setCameFromSource(null)
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
