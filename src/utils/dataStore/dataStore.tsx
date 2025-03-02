import { ENDPOINTS } from "../../constants/endpoints"
import { Fetcher } from "../fetcher/fetcher"
import { EventPayload } from "../fetcher/FetcherTypes"
import { Storage } from "../storage/storage"
import { Tasks as TasksApi } from "./tasks"
import { AuthApi } from "./auth"

class DataStore {
  #fetcher
  #storage = new Storage()
  #onHandlers: Map<string, unknown[]> = new Map()

  Tasks 
  Auth

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

    this.Auth = new AuthApi({
      fetcher: this.#fetcher
    })
  }

  fetcherEventHandler(event: EventPayload) {
    this.onChange({name: event.name,  data: event}, )
  }

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