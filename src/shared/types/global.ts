

export type StepType = {
  id: number
  documentId: string
  question: string
  type: 'single' | 'multiple'
  createdAt: string
  updatedAt: string
  publishedAt: string
  slug: string
  answers: AnswerType[]
  image: StrapiImageType | null
}

export type AnswerType = {
  id: number
  value: string
  nextStep: string | null
}

export type AnswerFromUser = {
  step: string
  value: string | string[] | null
  nextStep: string | null
}

export type StrapiImageType = {
  id: number
  url: string
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: Record<string, unknown>
}