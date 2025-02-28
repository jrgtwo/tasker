import type { GoogleLoginData, User } from "../../components/User/Types"
import { ENDPOINTS } from "../../constants/endpoints"
import { Fetcher } from "../fetcher/fetcher"
import { toLoginRequestBody } from "../../context/UserLogin/utils"
import { EventPayload } from "../fetcher/FetcherTypes"
import { Storage } from "../storage/storage"
import { Tasks as TasksApi } from "./tasks"

class DataStore {
  #fetcher
  #storage = new Storage()

  Tasks 

  constructor() {
    this.#fetcher = new Fetcher({ 
      BASE_URL: ENDPOINTS.BASE_URL,
      eventHandler: this.fetcherEventHandler,
      errorEventHandler: this.fetcherEventHandler
    })

    this.Tasks = new TasksApi({
      fetcher: this.#fetcher,
      storage: this.#storage
    })
  }

  fetcherEventHandler(event: EventPayload) {
    this.onChange({name: event.name,  data: event}, )
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