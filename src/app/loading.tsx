import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='flex justify-center items-center px-3'>
			<Skeleton className='fixed inset-0 bg-neutral-500/60 flex justify-center items-center z-1' />
			<Card className={cn('max-w-[380px] sm:w-[380px] opacity-100! z-2')}>
				<CardHeader>
					<CardTitle className='mx-auto text-center text-sm md:text-lg'>
						Suspense
					</CardTitle>
				</CardHeader>

				<CardContent className='flex gap-4'>
					<p className='text-[12px] md:text-sm font-semibold leading-none mx-auto'>
						Зачекайте... Інформація завантажується
					</p>
				</CardContent>
			</Card>
		</div>
	)
}
