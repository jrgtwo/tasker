import type { Fetcher } from '../fetcher/fetcher';
import type { Storage } from '../storage/storage';
import type { Task } from './../../components/Tasks/Types'

import { ENDPOINTS } from '../../constants/endpoints'

const StorageDataNames = {
  TASKS: 'TASKS',
  TASK: 'TASKS'
}

class Tasks {
  #fetcher
  #storage

  constructor({ fetcher, storage}: { fetcher: Fetcher, storage: Storage}) {
    this.#fetcher = fetcher;
    this.#storage = storage;
  }

  async getAllTasks({
    userId
  }: {
    userId:string
  }) {
    if (this.#storage.hasData(StorageDataNames.TASKS)) {
      return {res: this.#storage.getData(StorageDataNames.TASKS), err: null}
    } 

    try {
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
    } catch(err) {
      //TODO: handle fetcher exception
      return {err, res: null}
    }
  }

  async getTask({
    userId, taskId
  }: {
    userId: string, taskId: Task['id']
  }) {
    
    const taskStorage = StorageDataNames.TASK
  
    if (this.#storage.hasDataBy(taskStorage, `${taskId}`)) {
  
      return {res: this.#storage.getDataBy(taskStorage, `${taskId}`), err: null}
    }
  
    const {err, res} = await this.#fetcher.post<Task>({
      path: ENDPOINTS.TASKS.GET_BY_ID(`${taskId}`),
      body: {
        userId
      } 
    })
  
    this.#storage.setData(taskStorage, {err, res})
  
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
  
}


export { Tasks }