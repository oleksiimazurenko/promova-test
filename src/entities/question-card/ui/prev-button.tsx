'use client'

import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowLeft } from 'lucide-react'
import { useQuizStore } from '../store/use-quiz-store'

type PrevButtonProps = {
	step: string
	startStep: string | null
}

export function PrevButton({ startStep, step }: PrevButtonProps) {
	const router = useRouter()

	const { setCurrentStep, answers } = useQuizStore()

	return (
		<div>
			{step !== 'step-1' && (startStep !== step || !startStep) && (
				<Button
					onClick={() => {

						const currentStepIndex = answers.findIndex(answer => answer.step === step)
						const prevStep = answers[currentStepIndex - 1].step

						setCurrentStep(prevStep)
						router.push(`/quiz/${prevStep}`)
					}}
				>
					<ArrowLeft className='mr-1' /> Назад
				</Button>
			)}
		</div>
	)
}
