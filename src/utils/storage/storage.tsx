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

  fetcherEventHandler(event) {
    this.onChange({name: event.name,  message: event.message}, event)
    // if (event.message === 'LOGOUT') {
    //   this.logout()
    // }
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

  #onHandlers = new Map()

  on(name, cb){
    const currHandlersExist = this.#onHandlers.has(name)
    if (!currHandlersExist) {
      this.#onHandlers.set(name,[cb])
      return
    }
      this.#onHandlers.set(name, [...this.#onHandlers.get(name), cb])
  }

  onChange(name, data) {
    if (!this.#onHandlers.has(name)) return;
    this.#onHandlers.get(name).forEach((cb) => {
      return cb(data);
    })
  }

  async logout({reason = ' logout'} = {}) {
    this.onChange('LOGOUT', reason)
  }
}

const StorageSingleton = new Storage()
export { StorageSingleton }