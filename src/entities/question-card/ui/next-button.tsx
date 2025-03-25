'use client'

import { AnswerFromUser, StepType } from '@/shared/types/global'
import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowRight } from 'lucide-react'
import posthog from 'posthog-js'
import { useQuizStore } from '../store/use-quiz-store'

type NextButtonProps = {
	step: string
	lastStep: string
	isDisabledNextButton: boolean
	savedAnswer: AnswerFromUser | null
	currentStepData: StepType
}

export function NextButton({
	step,
	lastStep,
	savedAnswer,
	isDisabledNextButton,
	currentStepData,
}: NextButtonProps) {
	const router = useRouter()

	const { setCurrentStep, setAnswer, answers } = useQuizStore()

	const { question } = currentStepData

	return (
		<div>
			{lastStep !== step && (
				<Button
					disabled={isDisabledNextButton}
					onClick={() => {
						if (isDisabledNextButton) return null
						if (!savedAnswer) {
							console.error('savedAnswer is null')
							return null
						}

						posthog.capture('step_viewed', {
							step,
							question,
							answer: savedAnswer,
						})

						const currentStepData = answers.find(answer => answer.step === step)
						const hasNextStep = answers.some(answer => answer.step === currentStepData?.nextStep) 

						router.push(`/quiz/${currentStepData?.nextStep ?? 'step-1'}`)

						if(!hasNextStep){
							setAnswer({
								step: savedAnswer?.nextStep ?? 'step-1',
								value: null,
								nextStep: null,
							})
						}
						
						setCurrentStep(savedAnswer?.nextStep ?? 'step-1')
					}}
				>
					Далі <ArrowRight className='ml-1' />
				</Button>
			)}
		</div>
	)
}
