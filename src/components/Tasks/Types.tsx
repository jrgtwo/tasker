export type Task = {
  id: number|string,
  date: string,
  title: string,
  description: string,
  public: 0 | 1,
  completed: 0 | 1
}

export type TaskError = {
  err: string
}

export type Tasks = Task[]