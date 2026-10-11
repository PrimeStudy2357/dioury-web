import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { alertDenied, ensureTimelineAccess } from '../../../../-guard';
import { sessionQueryOptions } from '../../../../../hooks/query/useSessionQuery';
import { ServiceTemplate } from '../../../../../components/service/ServiceTemplate';
import { SessionDetail } from '../../../../../components/service/session/detail';

export const Route = createFileRoute(
  '/timeline/$timelineId/session/$sessionId/',
)({
  beforeLoad: async ({ context, params, preload }) => {
    await ensureTimelineAccess(context, params.timelineId, preload);

    // 비멤버는 공개 세션만 조회 가능 (서버가 403으로 판단)
    try {
      await context.queryClient.ensureQueryData(
        sessionQueryOptions(Number(params.sessionId)),
      );
    } catch (error) {
      alertDenied(
        preload,
        isAxiosError(error) && error.response?.status === 403
          ? '비공개 세션은 타임라인 멤버만 볼 수 있습니다.'
          : '세션을 찾을 수 없습니다.',
      );
      throw redirect({
        to: '/timeline/$timelineId',
        params: { timelineId: params.timelineId },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { timelineId, sessionId } = Route.useParams();

  return (
    <ServiceTemplate>
      <SessionDetail
        timelineId={Number(timelineId)}
        sessionId={Number(sessionId)}
      />
    </ServiceTemplate>
  );
}
