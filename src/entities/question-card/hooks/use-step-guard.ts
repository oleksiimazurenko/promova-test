'use client'

import { useQuizStore } from '@/entities/question-card/store/use-quiz-store'
import { getStepFromSource } from '@/shared/utils/get-step-from-source'
import { usePathname, useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'
export const useStepGuard = (step: number) => {
	const pathname = usePathname()
	const router = useRouter()

	const { answers, hasHydrated, cameFromSource } = useQuizStore()

	useLayoutEffect(() => {
		if (!hasHydrated) return
		if (step === 1) return

		const previousSlug = `step-${step - 1}`

		const hasPrevAnswer =
			typeof answers[previousSlug] === 'string'
				? answers[previousSlug] !== ''
				: Array.isArray(answers[previousSlug]) &&
				  answers[previousSlug].length > 0

		if (cameFromSource && !hasPrevAnswer) {
			const startStep = getStepFromSource(cameFromSource)
			router.push(`/quiz/${startStep}`)
			return
		}

		if (!hasPrevAnswer) {
			router.push(`/quiz/${previousSlug}`)
		}
	}, [hasHydrated, pathname]) // eslint-disable-line
}
