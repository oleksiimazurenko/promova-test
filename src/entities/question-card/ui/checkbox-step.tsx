'use client'

import { AnswerType } from '@/shared/types/global'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'
import { useEffect, useState } from 'react'
import { useQuizStore } from '../store/use-quiz-store'

type SelectionType = 'single' | 'multiple'

type Props = {
	stepId: string
	type: SelectionType
	items: AnswerType[]
	savedValue: string | string[]
}

export function CheckboxStep({
	stepId,
	type = 'multiple',
	items,
	savedValue,
}: Props) {
	const { setAnswer, hasHydrated } = useQuizStore()
	const [value, setValue] = useState<string[] | string>(savedValue)

	useEffect(() => {
		setAnswer(stepId, value)
	}, [value, stepId, setAnswer])

	const handleChange = (checked: boolean, itemValue: string) => {
		if (type === 'multiple') {
			const list = value as string[]
			setValue(
				checked ? [...list, itemValue] : list.filter(v => v !== itemValue)
			)
		} else {
			setValue(checked ? itemValue : '')
		}
	}

	if (!hasHydrated) return null // або спінер

	return (
		<div className='space-y-4'>
			{items.map(item => {
				const checked =
					type === 'multiple'
						? (value as string[]).includes(item.value)
						: value === item.value

				return (
					<Label key={item.id} className='flex items-center space-x-3 w-max cursor-pointer'>
						<Checkbox
							checked={checked}
							onCheckedChange={checked => handleChange(!!checked, item.value)}
						/>
						<div>{item.value}</div>
					</Label>
				)
			})}
		</div>
	)
}
