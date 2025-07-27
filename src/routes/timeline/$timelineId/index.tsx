import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timeline/$timelineId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timeline/$timelineId/"!</div>
}
