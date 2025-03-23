'use server'

import { StepType } from '../types/global'

export const fetchSteps = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/steps?populate=answers&populate=image`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				},
				next: { revalidate: 60 },
			}
		)

		if (!res.ok) throw new Error(`Failed to fetch steps: ${res.status}`)

		const { data } = (await res.json()) as { data: StepType[] }

		if (!data) throw new Error('No data')

		return data.map(
			({
				id,
				documentId,
				question,
				type,
				createdAt,
				updatedAt,
				publishedAt,
				slug,
				answers,
				image,
			}: StepType) => ({
				id,
				documentId,
				question,
				createdAt,
				updatedAt,
				publishedAt,
				slug,
				type,
				image,
				answers,
			})
		)
	} catch (err) {
		console.error(err)
		return []
	}
}
