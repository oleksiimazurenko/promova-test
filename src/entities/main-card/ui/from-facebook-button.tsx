'use client'

import { useQuizStore } from '@/entities/question-card/store/use-quiz-store'
import { Button } from '@/shared/ui/button'
import { sourceToStepMap } from '@/shared/utils/get-step-from-source'
import { useRouter } from '@bprogress/next'

export function FromFacebookButton() {
	const router = useRouter()
	const { setPreviousStep, setCurrentStep } = useQuizStore()
	return (
		<Button
			className='flex items-center space-x-4 rounded-md border p-4 bg-gradient-to-tl from-blue-300 to-blue-500 hover:scale-[1.01]'
			onClick={() => {
				const step = sourceToStepMap['facebook']

				//! Щоб не дьоргвся прогресс баг коли одразу падаємо на 4 крок, але зараза все рівно щось викобелюється :З
				setCurrentStep(Number(step.split('-')[1]))
				setPreviousStep(Number(step.split('-')[1]))

				router.push(`${process.env.NEXT_PUBLIC_APP_URL}/quiz?source=facebook`)
			}}
			variant='default'
		>
			<div className='flex-1 space-y-1'>
				<p className='text-[16px] font-semibold leading-none'>Перехід з Facebook</p>
			</div>
		</Button>
	)
}