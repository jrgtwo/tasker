import type { Tasks, Task } from "../components/Tasks/Types"
import { ENDPOINTS } from "../constants/endpoints"
import { Fetcher } from "./fetcher"

class Storage {
  fetcher

  constructor() {
    this.fetcher = new Fetcher({ BASE_URL: ENDPOINTS.TASKS.BASE_URL })
  }

  async getTask({
    userId, taskId
  }: {
    userId: string, taskId: string|number
  }) {
    const {err, res} = await this.fetcher.post<Task>({
      path: ENDPOINTS.TASKS.GET_BY_ID(taskId),
      body: {
        userId
      } 
    })

    return {err, res}
  }

 async postNewTask({
  title, desc, userId, dueDate
 }: {
  title: string| null, desc: string | null, userId: string | null , dueDate:string | null
 }) {

    if (!title || !desc || !userId) return {
      err: 'missing fields',
      res: null
    }

    const {err, res} = await this.fetcher.post({
      path: ENDPOINTS.TASKS.NEW, 
      body: {
        title, 
        desc, 
        userId,
        dueDate,
      }
    })

    return {err, res}
  }

  async getAllTasks({
    userId
  }: {
    userId:string
  }) {
    
    const {err, res} = await this.fetcher.post<Tasks>({
      path: ENDPOINTS.TASKS.GET_ALL, 
      body: {
        userId
      }
    })

    return {err, res}
  }
}

const StorageSingleton = new Storage()
export { StorageSingleton }