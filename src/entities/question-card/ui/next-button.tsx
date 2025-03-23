'use client'

import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowRight } from 'lucide-react'
import posthog from 'posthog-js'
import { useQuizStore } from '../store/use-quiz-store'

type NextButtonProps = {
	total: number
	step: number
	isDisabledNextButton: boolean
	question: string
	savedValue: string | string[]
}

export function NextButton({
	total,
	step,
	question,
	savedValue,
	isDisabledNextButton,
}: NextButtonProps) {
	const router = useRouter()

	const { setCurrentStep } = useQuizStore()

	return (
		<div>
			{total !== step && (
				<Button
					disabled={isDisabledNextButton}
					onClick={() => {
						if (isDisabledNextButton) return null

						posthog.capture('step_viewed', {
							step,
							question,
							answer: savedValue,
						})

						router.push(`/quiz/step-${step + 1}`)
						setCurrentStep(step + 1)
					}}
				>
					Далі <ArrowRight className='ml-1' />
				</Button>
			)}
		</div>
	)
}
