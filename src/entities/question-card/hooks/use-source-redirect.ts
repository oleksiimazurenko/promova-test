'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useQuizStore } from '@/entities/question-card/store/use-quiz-store'
import { getStepFromSource } from '@/shared/utils/get-step-from-source'

export const useSourceRedirect = (
	step: number,
	source: string | null
) => {
	const router = useRouter()
	const pathname = usePathname()

	const { hasHydrated, cameFromSource, setCameFromSource } = useQuizStore()

	useEffect(() => {
		if (!hasHydrated) return

		const startStep = getStepFromSource(cameFromSource)

		// якщо ми на кроці меньшому ніж початковий source-крок — редіректимо
		if (startStep && Number(startStep.split('-')[1]) > step) {
			router.push(`/quiz/${startStep}`)
			return
		}

		// зберігаємо source тільки якщо його ще не було
		if (source && !cameFromSource) {
			setCameFromSource(source)
		}
	}, [hasHydrated, source, setCameFromSource, pathname]) // eslint-disable-line
}