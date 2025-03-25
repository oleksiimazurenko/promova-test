'use client'

import { useMediaQuery } from '@/shared/hooks/use-media-query'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardTitle } from '@/shared/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/shared/ui/drawer'
import Image from 'next/image'
import { useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export function ShowDiagramDD() {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='outline'>Quiz діаграма</Button>
				</DialogTrigger>
				<DialogContent
					className='sm:max-w-[425px]'
					onInteractOutside={e => e.preventDefault()}
				>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
					</DialogHeader>
					<ShowDiagramContent />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='outline'>Quiz діаграма</Button>
			</DrawerTrigger>
			<DrawerContent onInteractOutside={e => e.preventDefault()}>
				<DrawerHeader className='text-center text-[22px] flex justify-center items-center'>
					<DrawerTitle>Quiz кроки пояснення</DrawerTitle>
				</DrawerHeader>
				<div className='p-3 overflow-y-auto'>
					<ShowDiagramContent />
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export function ShowDiagramContent() {
	return (
		<Card>
			<CardContent className='grid gap-4 md:h-[350px] md:max-h-[500px] md:overflow-y-auto'>
				<ZoomableImage />
				<CardTitle>Текстове пояснення логіки переходів:</CardTitle>

				<ol className='list-decimal pl-4 space-y-3 text-sm'>
					<li>
						<strong>Основна гілка (main):</strong>
						<p>
							Починається з <code>Step-1</code>, проходить через{' '}
							<code>Step-2</code>, <code>Step-3</code>, і закінчується на{' '}
							<code>Step-4</code>.
						</p>
					</li>

					<li>
						<strong>Розгалуження з Step-1:</strong>
						<ul className='list-disc pl-6'>
							<li>
								Відповідь A → веде на <code>Step-2</code> (main)
							</li>
							<li>
								Відповідь B → веде на <code>Step_b-2</code>, потім{' '}
								<code>Step_b-3</code>, <code>Step_b-4</code>, далі можливе
								повернення на <code>Step-4</code> (main)
							</li>
							<li>
								Відповідь C → веде на <code>Step_c-2</code>,{' '}
								<code>Step_c-3</code>, <code>Step_c-4</code>, після чого також
								можливе злиття з main (<code>Step-4</code>)
							</li>
						</ul>
					</li>

					<li>
						<strong>Динамічні переходи:</strong>
						<ul className='list-disc pl-6'>
							<li>
								З <code>Step_c-3</code> можливо перейти до гілки D (
								<code>Step_d-5</code>)
							</li>
							<li>
								З <code>Step_d-5</code> → перехід у гілку R (
								<code>Step_r-6</code>)
							</li>
							<li>
								З <code>Step_b-2</code> можливий перехід у гілку Y (
								<code>Step_y-3</code>), яка є автономною
							</li>
						</ul>
					</li>

					<li>
						<strong>Правила навігації:</strong>
						<ul className='list-disc pl-6'>
							<li>
								Переходи між гілками дозволені в будь-якому напрямку{' '}
								<strong>вперед</strong> по порядковому номеру (напр., з{' '}
								<code>Step-2</code> на <code>Step_b-3</code>)
							</li>
							<li>
								<strong>Заборонено</strong> повертатися на крок з меншим номером
								(назад)
							</li>
						</ul>
					</li>

					<li>
						<strong>Гнучка система:</strong>
						<ul className='list-disc pl-6'>
							<li>
								Адміністратор у <code>Strapi</code> може створювати будь-яку
								кількість гілок (<code>_b</code>, <code>_c</code>,{' '}
								<code>_d</code>, <code>_r</code>, <code>_y</code> тощо)
							</li>
							<li>
								Кожен варіант відповіді може вказувати на будь-який крок як{' '}
								<code>nextStep</code>
							</li>
							<li>
								Кроки можуть зливатись у спільні або залишатись унікальними
							</li>
						</ul>
					</li>
				</ol>
			</CardContent>
		</Card>
	)
}

export function ZoomableImage() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className='flex justify-center items-center'>
				<Image
					src='/diagram.png'
					fill
					alt='diagram'
					className='!relative cursor-zoom-in rounded-md border'
					onClick={() => setOpen(true)}
				/>
			</DialogTrigger>
			<DialogContent className='max-w-[90vw] max-h-[90vh] p-4 overflow-hidden'>
				<DialogHeader className='sr-only'>
					<DialogTitle>Quiz кроки пояснення</DialogTitle>
					<DialogDescription>---</DialogDescription>
				</DialogHeader>
				<TransformWrapper>
					<TransformComponent>
						{/* eslint-disable-next-line */}
						<img src='/diagram.png' alt='diagram' />
					</TransformComponent>
				</TransformWrapper>
			</DialogContent>
		</Dialog>
	)
}
