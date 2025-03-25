'use client'

import { useQuizStore } from '@/entities/question-card/store/use-quiz-store'
import { getStepFromSource } from '@/shared/utils/get-step-from-source'
import { usePathname, useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export const useStepAccessGuard = (step: string, source: string | null) => {
	const pathname = usePathname()
	const router = useRouter()
	const { answers, hasHydrated, cameFromSource, setCameFromSource } =
		useQuizStore()

	useLayoutEffect(() => {
		if (!hasHydrated) return
		if (step === 'step-1' && !cameFromSource) return

		if (source && !cameFromSource) {
			setCameFromSource(source)
		}

		const startStep = getStepFromSource(cameFromSource) || 'step-1'

		if (step.split('-')[1] < startStep.split('-')[1]) {
			router.push(`/quiz/${startStep}`)
			return
		}

		// якщо такого кроку немає ще в відповідях і не прийшли з source то редірект на початок
		if (!answers.some(a => a.step === step)) {
			router.push(`/quiz/${startStep}`)
			return
		}
	}, [hasHydrated, pathname]) // eslint-disable-line
}
