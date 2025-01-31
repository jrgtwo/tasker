import { useParams } from 'react-router'
import type { Task } from './Types'
import { useEffect, useState} from 'react'

const TASK_URL = 'http://localhost:5150/tasks/'
const getTaskURL = (id: string|undefined) => TASK_URL + id

const Task = () => {
  const { id } = useParams()
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const getTask = async () => {
      if (!id) setTask({ err: true })
      try {
        const req = await fetch(getTaskURL(id))
        const res = await req.json()
        setTask(res);

      } catch (err) {
        console.warn('There was an error: ', err);
        setTask({ err })
      }
    }
    getTask();
  },[id])

  return (
    <>
      <h1>Task</h1>
      { 
        !task
          ? <p>...loading</p> 
          : (<>
              <h3>{task.title}</h3>
              <h4>{new Date(task.date).toDateString()}</h4>
              <p>{task.description}</p>
            </>)
      }
    </>
  )
}

export { Task }