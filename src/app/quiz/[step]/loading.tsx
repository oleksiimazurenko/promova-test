import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='px-3 flex justify-center items-center aspect-square'>
			<Skeleton className='bg-neutral-500/60 w-full max-w-[380px] h-[450px]' />
		</div>
	)
}
