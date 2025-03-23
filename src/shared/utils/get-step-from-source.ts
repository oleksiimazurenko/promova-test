
//! Треба зробити щоб було завязано на адмінці. 
export const sourceToStepMap: Record<string, string> = {
	facebook: 'step-4',
	google: 'step-2',
	instagram: 'step-3',
}

export const getStepFromSource = (source: string | null) => {
	if(source === null) return null
	return source ? sourceToStepMap[source] : 'step-1'
}