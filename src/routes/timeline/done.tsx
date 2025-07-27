import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timeline/done')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timeline/done"!</div>
}
