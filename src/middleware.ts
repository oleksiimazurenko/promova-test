import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getStepFromSource } from './shared/utils/get-step-from-source'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (pathname === '/quiz') {
    const source = searchParams.get('source')

    const stepFromSource = getStepFromSource(source)
    
    const redirectUrl = new URL(`/quiz/${stepFromSource}`, request.url)

    if (source) {
      redirectUrl.searchParams.set('source', source)
    }

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}