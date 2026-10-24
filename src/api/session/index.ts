import APIInstance from '..';
import type {
  CreateSessionType,
  GetSessionListParams,
  ReactionType,
  SessionPaginationType,
  SessionType,
} from '../../types/session.type';

type CreateSessionRawResponse = {
  success: boolean;
  data: SessionType;
};

type GetSessionRawResponse = {
  success: boolean;
  data: SessionType;
};

type ReactionListRawResponse = {
  success: boolean;
  data: ReactionType[];
};

type GetSessionListRawResponse = {
  success: boolean;
  data: SessionType[];
  pagination: SessionPaginationType;
};

export const requestCreateSession = async (params: CreateSessionType) => {
  return await APIInstance.post<CreateSessionRawResponse>(`/session`, {
    ...params,
  });
};

export const requestGetSessionList = async (params: GetSessionListParams) => {
  const { data } = await APIInstance.get<GetSessionListRawResponse>(
    `/session`,
    { params },
  );

  return {
    sessions: data.data,
    pagination: data.pagination,
  };
};

export const requestGetSession = async (id: number) => {
  const { data } = await APIInstance.get<GetSessionRawResponse>(
    `/session/${id}`,
  );

  return data.data;
};

export const requestGetReactions = async (sessionId: number) => {
  const { data } = await APIInstance.get<ReactionListRawResponse>(
    `/session/${sessionId}/reaction`,
  );

  return data.data;
};

/** 이미 남긴 이모지면 취소, 아니면 추가. 갱신된 반응 목록을 반환 */
export const requestToggleReaction = async (
  sessionId: number,
  emoji: string,
) => {
  const { data } = await APIInstance.post<ReactionListRawResponse>(
    `/session/${sessionId}/reaction`,
    { emoji },
  );

  return data.data;
};
