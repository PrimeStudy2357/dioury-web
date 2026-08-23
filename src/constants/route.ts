const SERVICE_ROUTE = {
  INDEX: '/',
  LOGIN: {
    INDEX: '/login',
    PASSWORD: '/login/password',
  },
  SIGNUP: {
    INDEX: '/signup',
    DONE: '/signup/done',
  },
  TIMELINE: {
    INDEX: '/timeline',
    CREATE: '/timeline/create',
    DONE: '/timeline/create/done',
    HOME: '/timeline/$timelineId',
    SETTING: {
      INDEX: '/timeline/$timelineId/setting',
      MEMBER: '/timeline/$timelineId/setting/member',
    },
  },
  SESSION: {
    CREATE: '/timeline/$timelineId/session/create',
    HOME: '/timeline/$timelineId/session/$sessionId',
    EDIT: '/timeline/$timelineId/session/$sessionId/edit',
  },
};
