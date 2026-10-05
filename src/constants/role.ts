import type { TimelineRole } from '../types/timeline.type';

/** 세션 작성이 가능한(FRIEND 이상) 타임라인 역할 */
export const TIMELINE_WRITER_ROLES: TimelineRole[] = [
  'OWNER',
  'ADMIN',
  'FRIEND',
];
