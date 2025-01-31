export type Task = {
  id: number|string,
  date: string,
  title: string,
  description: string,
}

export type TaskError = {
  err: string
}

export type Tasks = Task[]