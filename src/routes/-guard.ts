import { redirect } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { timelineQueryOptions } from '../hooks/query/useTimelineQuery';

/**
 * 진입 불가 안내. 링크 hover 시 preload로도 beforeLoad가 실행되므로 그때는 띄우지 않는다.
 */
export const alertDenied = (preload: boolean, message: string) => {
  if (!preload) alert(message);
};

/**
 * 로그인하지 않았으면 로그인 페이지로 보내고, 타임라인을 조회할 수 없으면(비공개 & 비멤버) 타임라인 목록으로 보낸다.
 * 조회한 타임라인(요청자 역할 포함)을 반환한다.
 */
export const ensureTimelineAccess = async (
  context: { isAuthenticated: boolean; queryClient: QueryClient },
  timelineId: string,
  preload: boolean,
) => {
  if (!context.isAuthenticated) {
    alertDenied(preload, '로그인이 필요합니다.');
    throw redirect({ to: '/login' });
  }

  try {
    return await context.queryClient.ensureQueryData(
      timelineQueryOptions(Number(timelineId)),
    );
  } catch (error) {
    alertDenied(
      preload,
      isAxiosError(error) && error.response?.status === 403
        ? '비공개 타임라인은 멤버만 볼 수 있습니다.'
        : '타임라인을 찾을 수 없습니다.',
    );
    throw redirect({ to: '/timeline' });
  }
};
