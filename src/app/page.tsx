import { MainCard } from '@/entities/main-card'
import { Suspense } from 'react'
import Loading from './loading'

export default function Page() {
	return (
		<Suspense fallback={<Loading />}>
			<MainCard />
		</Suspense>
	)
}
