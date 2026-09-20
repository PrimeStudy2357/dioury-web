import { LIST_ORDER, type ListSortBy } from '../constants/order';

type ListOrder = (typeof LIST_ORDER)[keyof typeof LIST_ORDER];

export type TimelineType = {
  id: number;
  name: string;
  isPublic: boolean;
  profileImage: string | null;
  category: string;
  keywords: string[];
  description: string;
  period: string;
  isOn: boolean;
  memberCnt: number;
  likeCnt: number;
  creatorName: string;
  createdAt: string;
};

export type CreateTimelineType = Pick<
  TimelineType,
  'category' | 'description' | 'isOn' | 'isPublic' | 'keywords' | 'name' | 'period'
>;

export type TimelinePaginationType = {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type GetTimelineListParams = {
  page?: number;
  perPage?: number;
  sortBy?: ListSortBy;
  order?: ListOrder;
};

export type TimelineRole = 'OWNER' | 'ADMIN' | 'FRIEND' | 'MEMBER';

export type TimelineMemberType = {
  userId: number;
  nickname: string;
  email: string;
  role: TimelineRole;
};

export type TimelineMemberPaginationType = {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type GetTimelineMembersParams = {
  query?: string;
  page?: number;
  perPage?: number;
};
