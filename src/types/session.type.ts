import { LIST_ORDER, type SessionListSortBy } from '../constants/order';

type ListOrder = (typeof LIST_ORDER)[keyof typeof LIST_ORDER];

export type SessionType = {
  id: number;
  timelineId: number;
  title: string;
  place: string;
  date: string;
  content: string;
  isPublic: boolean;
  writerNickname: string;
  writerId: number;
  viewCnt: number;
  reactionCnt: number;
  commentCnt: number;
  participantCnt: number;
  createdAt: string;
};

export type CreateSessionType = Pick<
  SessionType,
  'timelineId' | 'title' | 'place' | 'date' | 'content' | 'isPublic'
> & {
  participantIds?: number[];
};

export type SessionPaginationType = {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type GetSessionListParams = {
  timelineId: number;
  page?: number;
  perPage?: number;
  sortBy?: SessionListSortBy;
  order?: ListOrder;
};
