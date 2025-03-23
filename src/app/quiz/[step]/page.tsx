import { QuestionCard } from '@/entities/question-card'
import { fetchSteps } from '@/shared/actions/fetch-steps'
import { Suspense } from 'react'
import Loading from './loading'

type Params = Promise<{ step: string }>
type SearchParams = Promise<{ [key: string]: string | undefined }>

export const revalidate = 3600

type PageProps = {
	params: Params
	searchParams: SearchParams
}

export async function generateStaticParams() {
	const steps = await fetchSteps()

	return steps.map(step => ({ step: step.slug }))
}

export default async function Page({ params, searchParams }: PageProps) {
	const { step } = await params
	const { source } = await searchParams

	const promiseAllSteps = fetchSteps()

	return (
		<Suspense fallback={<Loading />}>
			<QuestionCard
				step={step}
				promiseAllSteps={promiseAllSteps}
				source={source || null}
			/>
		</Suspense>
	)
}
