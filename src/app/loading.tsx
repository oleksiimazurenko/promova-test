import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='absolute inset-0 flex justify-center items-center px-3'>
			<Skeleton className='fixed inset-0 bg-neutral-500/60 flex justify-center items-center z-1' />
			<Card className={cn('max-w-[380px] sm:w-[380px] opacity-100! z-2')}>
				<CardHeader>
					<CardTitle className='mx-auto text-center text-sm md:text-lg'>
						Suspense з затримкою promise (3 с)
					</CardTitle>
				</CardHeader>

				<CardContent className='flex gap-4'>
					<p className='text-[12px] md:text-sm font-semibold leading-none mx-auto'>
						Зачекайте, Mock дані завантажуються...
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
