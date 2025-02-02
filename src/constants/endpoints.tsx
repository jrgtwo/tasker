const PATHS = {
  TASKS: {
    ROOT: '/tasks',
    NEW: '/tasks/new',
  },
  USER: {
    LOGIN: '/login'
  }
}
const ENDPOINTS = {
  TASKS: {
    BASE_URL: import.meta.env.VITE_API_URL,
    GET_ALL: PATHS.TASKS.ROOT,
    GET_BY_ID: (id: string | number) => (`${PATHS.TASKS.ROOT}/${id}`),
    NEW: PATHS.TASKS.NEW
  },
  USER: {
    LOGIN: PATHS.USER.LOGIN
  }
}

export { ENDPOINTS }