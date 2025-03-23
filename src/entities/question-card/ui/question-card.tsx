'use client'

import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card'

import { StepType } from '@/shared/types/global'
import { Progress } from '@/shared/ui/progress'
import { Skeleton } from '@/shared/ui/skeleton'
import { getStepFromSource } from '@/shared/utils/get-step-from-source'
import { useRouter } from '@bprogress/next'
import { notFound } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { useSourceRedirect } from '../hooks/use-source-redirect'
import { useStepGuard } from '../hooks/use-step-guard'
import { useQuizStore } from '../store/use-quiz-store'
import { CheckboxStep } from './checkbox-step'
import { FinishButton } from './finish-button'
import { NextButton } from './next-button'
import { PrevButton } from './prev-button'

type QuestionCardComponentProps = {
	step: number
	total: number
	source: string | null
	currentStepData: StepType
} & React.ComponentProps<typeof Card>

function QuestionCardComponent({
	step,
	total,
	source,
	currentStepData,
	...props
}: QuestionCardComponentProps) {
	const router = useRouter()

	const {
		answers,
		hasHydrated,
		resetAnswers,
		previousStep,
		setCameFromSource,
		resetStep,
		cameFromSource,
	} = useQuizStore()

	const { slug, type, question, image } = currentStepData

	const [animatedProgress, setAnimatedProgress] = useState(
		Math.round((previousStep / total) * 100)
	)

	// * ----------------------------------------------
	// * ----------------------------------------------

	useSourceRedirect(step, source)

	// * ----------------------------------------------
	// * ----------------------------------------------

	// for animate progress bar
	useEffect(() => {
		const next = Math.round((step / total) * 100)
		const timer = setTimeout(() => setAnimatedProgress(next), 50)
		return () => clearTimeout(timer)
	}, [step, total])

	// * ----------------------------------------------
	// * ----------------------------------------------

	useStepGuard(step)

	// * ----------------------------------------------
	// * ----------------------------------------------

	if (!hasHydrated)
		return (
			<Skeleton className='max-w-[380px] min-[420px]:w-[380px] h-[450px]' />
		)

	const savedValue = answers[slug] || (type === 'multiple' ? [] : '')

	const isDisabledNextButton = savedValue === '' || savedValue.length === 0

	const startStep = getStepFromSource(cameFromSource)

	return (
		<Card
			className={cn(
				'max-w-[380px] min-[420px]:w-[380px] gap-1',
				props.className
			)}
			{...props}
		>
			<CardHeader>
				<CardTitle>{question}</CardTitle>
				<CardDescription>
					Ви на кроці {step} з {total}. {source && `Ви прийшли з ${source}`}
					{step === 1 && 'Це ваш перший крок.'}
				</CardDescription>
			</CardHeader>

			<CardContent className='flex flex-col gap-4 justify-center items-start'>
				
				{/* -------------------------- Progress bar -------------------------- */}
				<div className='flex items-center space-x-4 rounded-md border p-4 w-full'>
					<Progress
						value={animatedProgress}
						className='w-full transition-all duration-500'
					/>
				</div>
				{/* -----------------------------///---///---------------------------- */}

				{/* -------------------------- Photo -------------------------- */}
				{image?.url ? (
					<Image
						src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image?.url}`}
						alt={question}
						width={100}
						height={100}
						className='rounded-xl mx-auto'
					/>
				) : (
					<div className='w-full flex justify-center items-center'>
						Зображення ще не додали.
					</div>
				)}
				{/* -----------------------------///---///---------------------------- */}

				{/* -------------------------- Question -------------------------- */}
				<div className='flex items-center justify-center text-[22px] w-full'>
					{type === 'single'
						? 'Обери одну з опцій нижче'
						: 'Обери декілька опцій нижче'}
				</div>
				{/* -----------------------------///---///---------------------------- */}

				{/* -------------------------- Answers -------------------------- */}
				<CheckboxStep
					stepId={slug}
					type={type}
					items={currentStepData.answers}
					savedValue={savedValue}
				/>
				{/* -----------------------------///---///---------------------------- */}

				{/* -------------------------- Go to all questions -------------------------- */}
				{startStep === `step-${step}` && cameFromSource && (
					<Button
						onClick={() => {
							resetStep()
							resetAnswers()
							setCameFromSource(null)
							router.push(`/quiz/step-1`)
						}}
						className='w-full'
					>
						Бажаєте пройти повну персоналізацію?
					</Button>
				)}
				{/* -----------------------------///---///---------------------------- */}
			</CardContent>

			<CardFooter
				className={cn('flex justify-between items-center w-full mt-4')}
			>
				<PrevButton step={step} startStep={startStep} />

				<NextButton
					total={total}
					step={step}
					question={question}
					savedValue={savedValue}
					isDisabledNextButton={isDisabledNextButton}
				/>

				<FinishButton
					step={step}
					total={total}
					isDisabledNextButton={isDisabledNextButton}
				/>
			</CardFooter>
		</Card>
	)
}

type QuestionCard = {
	step: string
	source: string | null
	promiseAllSteps: Promise<StepType[] | null>
} & React.ComponentProps<typeof Card>

export function QuestionCard({
	step,
	promiseAllSteps,
	source,
	...props
}: QuestionCard) {
	const data = use(promiseAllSteps)
	if (!data) notFound()

	const currentStepData = data.find(stepData => stepData.slug === step)
	if (!currentStepData) notFound()

	return (
		<QuestionCardComponent
			step={Number(currentStepData.slug.split('-')[1])}
			total={data.length}
			currentStepData={currentStepData}
			source={source}
			{...props}
		/>
	)
}
