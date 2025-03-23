'use client'

import { Button } from '@/shared/ui/button'
import { useRouter } from '@bprogress/next'
import { ArrowLeft } from 'lucide-react'
import { useQuizStore } from '../store/use-quiz-store'

type PrevButtonProps = {
	step: number
	startStep: string | null
}

export function PrevButton({ startStep, step }: PrevButtonProps) {
	const router = useRouter()

	const { setCurrentStep } = useQuizStore()

	return (
		<div>
			{step !== 1 && (startStep !== `step-${step}` || !startStep) && (
				<Button
					onClick={() => {
						setCurrentStep(step - 1)
						router.push(`/quiz/step-${step - 1}`)
					}}
				>
					<ArrowLeft className='mr-1' /> Назад
				</Button>
			)}
		</div>
	)
}
