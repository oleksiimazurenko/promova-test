import { QuestionQuizSummaryType } from '@/app/api/quiz-summary/route'
import { AnswerFromUser } from '@/shared/types/global'
import { encryptedStorage } from '@/shared/utils/encrypted-storage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuizStoreType = {
	cameFromSource: string | null
	setCameFromSource: (value: string | null) => void

	hasHydrated: boolean
	setHasHydrated: (value: boolean) => void

	setPreviousStep: (value: string) => void
	previousStep: string

	currentStep: string
	setCurrentStep: (value: string) => void
	resetStep: () => void

	questions: QuestionQuizSummaryType[]
	setQuestions: (params: {
		question: QuestionQuizSummaryType
		step: string
	}) => void

	answers: AnswerFromUser[]
	setAnswer: (params: AnswerFromUser) => void
	resetAnswers: () => void
}

export const useQuizStore = create<QuizStoreType>()(
	persist(
		(set, get) => ({
			cameFromSource: null,
			setCameFromSource: value => set({ cameFromSource: value }),

			hasHydrated: false,
			setHasHydrated: (value: boolean) => set({ hasHydrated: value }),

			setPreviousStep: previousStep => set({ previousStep }),
			previousStep: 'step-1',

			setCurrentStep: value =>
				set(() => ({
					previousStep: get().currentStep,
					currentStep: value,
				})),
			currentStep: 'step-1',
			resetStep: () => set({ currentStep: 'step-1', previousStep: 'step-1' }),

			questions: [] as QuestionQuizSummaryType[],
			setQuestions: ({ question, step }) =>
				set(state => {
					const filtered = state.questions.filter(
						entry => entry.slug.split('-')[1] !== step.split('-')[1]
					)

					return {
						questions: [...filtered, question],
					}
				}),

			answers: [],
			setAnswer: ({ step, value, nextStep }) =>
				set(state => {
					// remove all answers with the same step
					const filtered = state.answers.filter(
						entry => entry.step.split('-')[1] !== step.split('-')[1]
					)

					// add the new answer and sort the array
					const newAnswers = [...filtered, { step, value, nextStep }].sort(
						(a, b) => {
							const aStep = parseInt(a.step.split('-')[1])
							const bStep = parseInt(b.step.split('-')[1])
							return aStep - bStep
						}
					)

					return {
						answers: newAnswers,
					}
				}),
			resetAnswers: () => set({ answers: [] }),
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
