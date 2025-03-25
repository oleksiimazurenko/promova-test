import { Skeleton } from '@/shared/ui/skeleton'

export default function Loading() {
	return (
		<div className='relative p-3 flex justify-center items-center w-[350px] h-[450px]'>
			<Skeleton className='bg-neutral-500/60 w-full max-w-[350px] h-[450px]' />
			<div className='inset-0 absolute z-2 flex flex-col justify-center items-center font-[600px] text-[22px]'>
				<div>Очікуємо дані з CMS</div>
				<div className='text-[12px] font-mono w-full px-5 mx-auto text-center'>
					при холодному запуску очікування може бути більше 60 секунд
				</div>
			</div>
		</div>
	)
}
