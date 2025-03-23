type AnswerMap = {
	[step: string]: string | string[]
}

import { encryptedStorage } from '@/shared/utils/encrypted-storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuizStoreType = {
	cameFromSource: string | null
	setCameFromSource: (value: string | null) => void

	hasHydrated: boolean
	setHasHydrated: (value: boolean) => void

	currentStep: number
	previousStep: number
	setCurrentStep: (value: number) => void
	resetStep: () => void

	answers: AnswerMap
	setAnswer: (step: string, value: string | string[]) => void
	resetAnswers: () => void
}

export const useQuizStore = create<QuizStoreType>()(
	persist(
		(set, get) => ({
			cameFromSource: null,
			setCameFromSource: value => set({ cameFromSource: value }),

			hasHydrated: false,
			setHasHydrated: (value: boolean) => set({ hasHydrated: value }),

			currentStep: 1,
			previousStep: 1,
			setCurrentStep: value =>
				set(() => ({
					previousStep: get().currentStep,
					currentStep: value,
				})),

			resetStep: () => set({ currentStep: 1, previousStep: 1 }),

			answers: {},
			setAnswer: (step, value) =>
				set(state => ({
					answers: { ...state.answers, [step]: value },
				})),
			resetAnswers: () => set({ answers: {} }),
		}),
		{
			name: 'step-storage',
			storage: encryptedStorage,
			onRehydrateStorage: state => {
				return () => {
					state?.setHasHydrated?.(true)
				}
			},
		}
	)
)
