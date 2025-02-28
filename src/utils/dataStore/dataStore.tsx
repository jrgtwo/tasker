import type { Tasks, Task } from "../../components/Tasks/Types"
import type { GoogleLoginData, User } from "../../components/User/Types"
import { ENDPOINTS } from "../../constants/endpoints"
import { Fetcher } from "../fetcher/fetcher"
import { toLoginRequestBody } from "../../context/UserLogin/utils"
import { EventPayload } from "../fetcher/FetcherTypes"
import { Storage } from "../storage/storage"

const StorageDataNames = {
  TASKS: 'TASKS',
  TASK: 'TASKS'
}

class DataStore {
  #fetcher
  #storage = new Storage()

  constructor() {
    this.#fetcher = new Fetcher({ 
      BASE_URL: ENDPOINTS.BASE_URL,
      eventHandler: this.fetcherEventHandler,
      errorEventHandler: this.fetcherEventHandler
    })
  }

  fetcherEventHandler(event: EventPayload) {
    this.onChange({name: event.name,  data: event}, )
  }

  async getTask({
    userId, taskId
  }: {
    userId: string, taskId: Task['id']
  }) {

    const storageName = StorageDataNames.TASK

    if (this.#storage.hasDataBy(storageName, `${taskId}`)) {

      return {res: this.#storage.getDataBy(storageName, `${taskId}`), err: null}
    }

    const {err, res} = await this.#fetcher.post<Task>({
      path: ENDPOINTS.TASKS.GET_BY_ID(`${taskId}`),
      body: {
        userId
      } 
    })

    this.#storage.setData(storageName, {err, res})
  
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

    const {err, res} = await this.#fetcher.post<Task>({
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
    
    if (this.#storage.hasData(StorageDataNames.TASKS)) {

      return {res: this.#storage.getData(StorageDataNames.TASKS), err: null}
    }

    const {err, res} = await this.#fetcher.post<Tasks>({
      path: ENDPOINTS.TASKS.GET_ALL, 
      body: {
        userId
      }
    })

    if (err || !res) {
      // do some error stuff here
      return {err, res: null}
    }

    this.#storage.setData<Tasks>(StorageDataNames.TASKS, res, 'id')
    return {err, res}
  }

  async refreshLogin() {
    const {err, res} = await this.#fetcher.checkRefresh()

    return {err, res: res?.loginData}
  }

  async login({ 
    googleLoginData
  }: {
    googleLoginData: GoogleLoginData | null
  }) {
     const {err, res} = await this.#fetcher.post<User>({
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

const DataStoreSingleton = new DataStore()
export { DataStoreSingleton }