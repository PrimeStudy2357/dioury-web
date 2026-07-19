export const LIST_SORT_BY = {
  CREATED_AT: 'createdAt',
  LIKE_COUNT: 'likeCnt',
  MEMBER_COUNT: 'memberCnt',
} as const;

export type ListSortBy = (typeof LIST_SORT_BY)[keyof typeof LIST_SORT_BY];

export const LIST_SORT_BY_LABEL: Record<ListSortBy, string> = {
  [LIST_SORT_BY.CREATED_AT]: '최신순',
  [LIST_SORT_BY.LIKE_COUNT]: '추천순',
  [LIST_SORT_BY.MEMBER_COUNT]: '멤버순',
};

export const LIST_ORDER = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
} as const;
