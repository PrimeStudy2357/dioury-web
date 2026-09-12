import APIInstance from '..';
import type {
  CreateSessionType,
  GetSessionListParams,
  SessionPaginationType,
  SessionType,
} from '../../types/session.type';

type CreateSessionRawResponse = {
  success: boolean;
  data: SessionType;
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
