export const LIST_SORT_BY = {
  CREATED_AT: 'createdAt',
  LIKE_COUNT: 'likeCnt',
  MEMBER_COUNT: 'memberCnt',
} as const;

export type ListSortBy = (typeof LIST_SORT_BY)[keyof typeof LIST_SORT_BY];

export const LIST_ORDER = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
} as const;

export type ListOrder = (typeof LIST_ORDER)[keyof typeof LIST_ORDER];

export const SESSION_LIST_SORT_BY = {
  CREATED_AT: 'createdAt',
  DATE: 'date',
  VIEW_COUNT: 'viewCnt',
  REACTION_COUNT: 'reactionCnt',
  COMMENT_COUNT: 'commentCnt',
  PARTICIPANT_COUNT: 'participantCnt',
} as const;

export type SessionListSortBy =
  (typeof SESSION_LIST_SORT_BY)[keyof typeof SESSION_LIST_SORT_BY];

// UI에 노출되는 정렬 옵션. API의 sortBy/order 조합을 하나의 선택지로 감싼다.
export const LIST_SORT_OPTION = {
  LATEST: 'latest',
  OLDEST: 'oldest',
  RECOMMENDED: 'recommended',
  MEMBER_COUNT: 'memberCount',
} as const;

export type ListSortOption =
  (typeof LIST_SORT_OPTION)[keyof typeof LIST_SORT_OPTION];

export const LIST_SORT_OPTION_LABEL: Record<ListSortOption, string> = {
  [LIST_SORT_OPTION.LATEST]: '최신순',
  [LIST_SORT_OPTION.OLDEST]: '오래된순',
  [LIST_SORT_OPTION.RECOMMENDED]: '추천순',
  [LIST_SORT_OPTION.MEMBER_COUNT]: '멤버순',
};

export const LIST_SORT_OPTION_PARAMS: Record<
  ListSortOption,
  { sortBy: ListSortBy; order: ListOrder }
> = {
  [LIST_SORT_OPTION.LATEST]: {
    sortBy: LIST_SORT_BY.CREATED_AT,
    order: LIST_ORDER.DESCENDING,
  },
  [LIST_SORT_OPTION.OLDEST]: {
    sortBy: LIST_SORT_BY.CREATED_AT,
    order: LIST_ORDER.ASCENDING,
  },
  [LIST_SORT_OPTION.RECOMMENDED]: {
    sortBy: LIST_SORT_BY.LIKE_COUNT,
    order: LIST_ORDER.DESCENDING,
  },
  [LIST_SORT_OPTION.MEMBER_COUNT]: {
    sortBy: LIST_SORT_BY.MEMBER_COUNT,
    order: LIST_ORDER.DESCENDING,
  },
};
