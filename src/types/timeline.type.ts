export type TimelineType = {
  // TODO: 나머지 정보도 체워넣기
  name: string;
  description: string;
  isOn: boolean;
  isPublic: boolean;
  keywords: string[];
  period: string;
  category: string;
  createdAt: string;
};

export type CreateTimelineType = Pick<
  TimelineType,
  | 'category'
  | 'description'
  | 'isOn'
  | 'isPublic'
  | 'keywords'
  | 'name'
  | 'period'
>;
