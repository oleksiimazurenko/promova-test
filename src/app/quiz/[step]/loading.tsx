import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='px-3 absolute inset-0 flex justify-center items-center'>
			<Skeleton className='bg-neutral-500/60 w-full max-w-[380px] h-[450px]' />
		</div>
	)
}
