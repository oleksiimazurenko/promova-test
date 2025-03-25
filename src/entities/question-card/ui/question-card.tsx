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
import { notFound, usePathname } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { useStepAccessGuard } from '../hooks/use-step-access-guard'
import { useQuizStore } from '../store/use-quiz-store'
import { CheckboxStep } from './checkbox-step'
import { FinishButton } from './finish-button'
import { NextButton } from './next-button'
import { PrevButton } from './prev-button'

type QuestionCardComponentProps = {
	step: string
	sortedData: StepType[]
	lastStep: string
	source: string | null
	currentStepData: StepType
} & React.ComponentProps<typeof Card>

function QuestionCardComponent({
	step,
	sortedData,
	lastStep,
	source,
	currentStepData,
	...props
}: QuestionCardComponentProps) {
	const router = useRouter()

	const {
		answers,
		resetAnswers,
		setCameFromSource,
		resetStep,
		cameFromSource,
		previousStep,
	} = useQuizStore()

	// console.log('currentStepData', currentStepData)

	const { slug, type, question, image } = currentStepData
	const pathname = usePathname()

	const total = sortedData.length

	const prevStepIndex = Number(previousStep.split('-')[1])
	const [animatedProgress, setAnimatedProgress] = useState(
		Math.round((prevStepIndex / total) * 100)
	)

	// * ----------------------------------------------
	// * ----------------------------------------------

	useStepAccessGuard(step, source)

	// * ----------------------------------------------
	// * ----------------------------------------------

	// for animate progress bar
	useEffect(() => {
		const currentStepIndex = Number(step.split('-')[1])
		const next = Math.round((currentStepIndex / total) * 100)
		const timer = setTimeout(() => setAnimatedProgress(next), 50)
		return () => clearTimeout(timer)
	}, [step, total])

	// * ----------------------------------------------
	// * ----------------------------------------------

	useEffect(() => {
		// * на останьому кроці не потрібно передбачати наступний крок
		if (total === answers.length) return

		//* передбачення наступного кроку
		currentStepData.answers.forEach(answer => {
			router.prefetch(`/quiz/${answer.nextStep}`)
		})
	}, [pathname]) // eslint-disable-line

	// * ----------------------------------------------
	// * ----------------------------------------------

	const savedAnswer = answers.find(a => a.step === slug)
	const savedValue = savedAnswer?.value ?? (type === 'multiple' ? [] : '')

	const isDisabledNextButton = savedValue === '' || savedValue?.length === 0
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
					Ви на кроці {step.split('-')[1]} з {total}.{' '}
					{cameFromSource && (
						<span>
							Ви прийшли з <span className='font-[600] text-black'>{cameFromSource}</span>
						</span>
					)}
					{step === 'step-1' && 'Це ваш перший крок.'}
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
					step={slug}
					type={type}
					items={currentStepData.answers}
					savedAnswer={savedAnswer || null}
				/>
				{/* -----------------------------///---///---------------------------- */}

				{/* -------------------------- Go to all questions -------------------------- */}
				{startStep === step && cameFromSource && (
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
					step={step}
					lastStep={lastStep}
					savedAnswer={savedAnswer || null}
					isDisabledNextButton={isDisabledNextButton}
					currentStepData={currentStepData}
				/>

				<FinishButton
					step={step}
					lastStep={lastStep}
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
	const { hasHydrated } = useQuizStore()

	const data = use(promiseAllSteps)
	if (!data) notFound()

	const currentStepData = data.find(stepData => stepData.slug === step)
	if (!currentStepData) notFound()

	// filter only main steps
	const filteredData = data.filter(stepData => /step-/.test(stepData.slug))

	// sort steps by step number, because they can be not in order
	const sortedData = filteredData.sort((a, b) => {
		const aStep = parseInt(a.slug.split('-')[1])
		const bStep = parseInt(b.slug.split('-')[1])
		return aStep - bStep
	})

	if (!hasHydrated)
		return (
			<Skeleton className='max-w-[380px] min-[420px]:w-[380px] h-[450px]' />
		)

	return (
		<QuestionCardComponent
			step={currentStepData.slug}
			sortedData={sortedData}
			lastStep={sortedData[sortedData.length - 1].slug}
			currentStepData={currentStepData}
			source={source}
			{...props}
		/>
	)
}
