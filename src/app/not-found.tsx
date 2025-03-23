import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center items-center gap-4 p-5 bg-white/60'>
			<h2 className='text-2xl font-[500]'>Не знайдено</h2>
			<p>Не можливо знайти таку сторінку</p>
			<Link href='/' className='cursor-pointer hover:underline'>
				Повернутись на головну сторінку
			</Link>
		</div>
	)
}
