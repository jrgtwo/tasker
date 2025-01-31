import { useParams, Link } from 'react-router'
import type { Task } from './Types'
import { useGetTask } from './hooks/useGetTask';

const Task = () => {
  const { id } = useParams()
  const  {task, error: taskError} = useGetTask(id)

  return (
    <>
      <h1>Task</h1>
      <Link to="/tasks">{`<-`} Back to Tasks</Link>
      { 
        (!task || taskError)
          ? taskError? <p>Error happened !!!</p> : <p>...loading</p> 
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