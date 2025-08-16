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
    CREATE: '/session/create',
    HOME: '/session/$sessionId',
    EDIT: '/session/$sessionId/edit',
  },
};
