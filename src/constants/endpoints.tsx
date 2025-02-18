const PATHS = {
  TASKS: {
    ROOT: '/tasks',
    NEW: '/tasks/new',
  },
  USER: {
    LOGIN: '/login',
    AUTH: '/auth',
    AUTH_TOKEN: '/auth/token',
    AUTH_VERIFY: '/auth/verify'
  },
  BASE_URL: import.meta.env.VITE_API_URL
}
const ENDPOINTS = {
  BASE_URL: PATHS.BASE_URL,
  TASKS: {
    GET_ALL: PATHS.TASKS.ROOT,
    GET_BY_ID: (id: string | number) => (`${PATHS.TASKS.ROOT}/${id}`),
    NEW: PATHS.TASKS.NEW
  },
  USER: {
    LOGIN: PATHS.USER.LOGIN,
    AUTH: PATHS.USER.AUTH,
    AUTH_TOKEN: PATHS.USER.AUTH_TOKEN,
    AUTH_VERIFY: PATHS.USER.AUTH_VERIFY
  }
}

export { ENDPOINTS }