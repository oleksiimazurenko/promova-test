'use client'

import { Button } from '@/shared/ui/button'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className='container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center items-center gap-4 p-5 bg-white/60'>
			<h2 className='text-2xl font-[500]'>
				Хай йому грець! <br /> Щось пішло не так...
			</h2>
			<Button onClick={() => reset()}>Спробувати перезавантажити</Button>

			<p className='font-mono text-red-400 bg-white/50 p-3 rounded-xl'>
				{error.message}
			</p>
		</div>
	)
}
