const PATHS = {
  TASKS: {
    ROOT: '/tasks',
    NEW: '/tasks/new',
  },
  USER: {
    LOGIN: '/login',
    AUTH: './auth'
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
    AUTH: PATHS.USER.AUTH
  }
}

export { ENDPOINTS }