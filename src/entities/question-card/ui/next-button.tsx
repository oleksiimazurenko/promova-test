'use client'

import { StepType } from '@/shared/types/global'
import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowRight } from 'lucide-react'
import posthog from 'posthog-js'
import { useQuizStore } from '../store/use-quiz-store'

type NextButtonProps = {
	total: number
	step: number
	isDisabledNextButton: boolean
	savedValue: string | string[]
	currentStepData: StepType
}

export function NextButton({
	total,
	step,
	savedValue,
	isDisabledNextButton,
	currentStepData,
}: NextButtonProps) {
	const router = useRouter()

	const { setCurrentStep, answers } = useQuizStore()

	const {
		slug,
		type,
		question,
		answers: answersOfCurrentStep,
	} = currentStepData

	const nextSpecialStep = answersOfCurrentStep.find(answer => {
		if (type === 'single') return answer.value === answers[slug]
		return answers[slug]?.includes(answer.value)
	})?.nextStep
	console.log('nextSpecialStep', nextSpecialStep)

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
