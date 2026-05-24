import APIInstance from '..';

export const requestCheckTimelineName = async (name: string) => {
  return await APIInstance.get(`/timeline/checkname`, {
    params: { name },
  });
};
