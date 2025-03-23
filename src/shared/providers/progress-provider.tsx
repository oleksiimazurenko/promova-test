'use client'

import { ProgressProvider as PP } from '@bprogress/next/app'

export function ProgressProvider({ children }: { children: React.ReactNode }) {
	return (
		<PP
			height='4px'
			color='#000000'
			options={{ showSpinner: false }}
			shallowRouting
		>
			{children}
		</PP>
	)
}
