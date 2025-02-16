export type Task = {
  id: number|string,
  date: string,
  title: string,
  description: string,
  completed: 0 | 1,
  due_date: string | null
}

export type TaskError = {
  err: string
}

export type Tasks = Task[]