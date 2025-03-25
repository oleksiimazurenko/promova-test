'use client'

import { AnswerFromUser, AnswerType } from '@/shared/types/global'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'
import { useQuizStore } from '../store/use-quiz-store'


type SelectionType = 'single' | 'multiple'

type Props = {
	step: string
	type: SelectionType
	items: AnswerType[]
	savedAnswer: AnswerFromUser | null
}

export function CheckboxStep({
	step,
	type = 'multiple',
	items,
	savedAnswer,
}: Props) {
	const { setAnswer, hasHydrated } = useQuizStore()

	const handleChange = (checked: boolean, item: AnswerType) => {
		if (type === 'multiple') {

			const list = (savedAnswer?.value as string[]) || []

			const updated = checked
				? [...list, item.value]
				: list.filter(v => v !== item.value)

			setAnswer({ step, value: updated, nextStep: item.nextStep || null })

		} else {

			setAnswer({
				step,
				value: checked ? item.value : '',
				nextStep: item.nextStep || null,
			})

		}
	}

	if (!hasHydrated) return null // або спінер

	return (
		<div className='space-y-4'>

			{items.map(item => {
				const checked =
					type === 'multiple'
						? (savedAnswer?.value as string[])?.includes(item.value)
						: savedAnswer?.value === item.value

				return (
					<Label
						key={item.id}
						className='flex items-center space-x-3 w-max cursor-pointer'
					>
						<Checkbox
							checked={checked}
							onCheckedChange={checked => handleChange(!!checked, item)}
							className='cursor-pointer'
						/>
						<div>{item.value}</div>
					</Label>
				)
			})}

		</div>
	)
}
