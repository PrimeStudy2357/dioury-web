import { createFileRoute, redirect } from '@tanstack/react-router';
import { alertDenied, ensureTimelineAccess } from '../../../-guard';
import { TIMELINE_WRITER_ROLES } from '../../../../constants/role';
import { ServiceTemplate } from '../../../../components/service/ServiceTemplate';
import { SessionCreate } from '../../../../components/service/session/create';

export const Route = createFileRoute('/timeline/$timelineId/session/create')({
  beforeLoad: async ({ context, params, preload }) => {
    const timeline = await ensureTimelineAccess(
      context,
      params.timelineId,
      preload,
    );

    if (!timeline.myRole || !TIMELINE_WRITER_ROLES.includes(timeline.myRole)) {
      alertDenied(preload, '세션 작성 권한이 없습니다.');
      throw redirect({
        to: '/timeline/$timelineId',
        params: { timelineId: params.timelineId },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { timelineId } = Route.useParams();

  return (
    <ServiceTemplate>
      <SessionCreate timelineId={Number(timelineId)} />
    </ServiceTemplate>
  );
}
