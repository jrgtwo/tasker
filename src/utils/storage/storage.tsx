import type { Tasks, Task } from "../../components/Tasks/Types"
import type { GoogleLoginData, User } from "../../components/User/Types"
import { ENDPOINTS } from "../../constants/endpoints"
import { Fetcher } from "../fetcher/fetcher"
import { toLoginRequestBody } from "../../context/UserLogin/utils"

class Storage {
  fetcher

  constructor() {
    this.fetcher = new Fetcher({ 
      BASE_URL: ENDPOINTS.BASE_URL,
      eventHandler: this.fetcherEventHandler,
      errorEventHandler: this.fetcherEventHandler
    })
  }

  fetcherEventHandler(event: {
    name: string,
    message: string
  }) {
    this.onChange({name: event.name,  data: event}, )
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

  async login({ 
    googleLoginData
  }: {
    googleLoginData: GoogleLoginData | null
  }) {
     const {err, res} = await this.fetcher.post<User>({
        path: ENDPOINTS.USER.LOGIN,
        body: toLoginRequestBody({googleLoginData}),
        withCredentials: true
      })

      return {err, res}
  }

  #onHandlers: Map<string, unknown[]> = new Map()

  on(name: string, cb: (data: unknown) => void){
    const currHandlersExist = this.#onHandlers.has(name)
    if (!currHandlersExist) {
      this.#onHandlers.set(name,[cb])
      return
    }
    const current = this.#onHandlers.get(name) ?? []
      this.#onHandlers.set(name, [...current, cb])
  }

  onChange({
    name, 
    data
  }: {
    name: string,
    data: {[key: string]: unknown}
  }) {
    if (!this.#onHandlers.has(name)) return;
    this.#onHandlers.get(name)?.forEach((cb) => (
      typeof cb === 'function' && cb(data)
    ))
  }
}

const StorageSingleton = new Storage()
export { StorageSingleton }