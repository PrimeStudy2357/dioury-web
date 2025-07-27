import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timeline/$timelineId/setting/member')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timeline/$timelineId/setting/member"!</div>
}
