const ENDPOINTS = {
  TASKS: {
    BASE_URL: 'http://localhost:5150',
    GET_ALL: '/tasks',
    GET_BY_ID: (id: string | number) => (`/tasks/${id}`),
    NEW: '/tasks/new'
  }
}

export { ENDPOINTS }