import { PostHogProvider } from './posthog-provider'
import { ProgressProvider } from './progress-provider'

type ProvidersProps = {
	children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
	return (
		<ProgressProvider>
			<PostHogProvider>{children}</PostHogProvider>
		</ProgressProvider>
	)
}
