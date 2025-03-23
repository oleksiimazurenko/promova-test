'use server'

import { StepType } from '../types/global'

export const fetchStepBySlug = async (slug: string): Promise<StepType | null> => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/steps?filters[slug][$eq]=${slug}&populate=answers&populate=image`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				},
				next: { revalidate: 60 },
			}
		)

		if (!res.ok) throw new Error(`Failed to fetch step "${slug}": ${res.status}`)

		const { data } = await res.json() as { data: StepType[] }

		if (!data || data.length === 0) return null

		return data[0]
	} catch (err) {
		console.error(err)
		return null
	}
}