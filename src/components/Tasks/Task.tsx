import { useParams, Link } from 'react-router'
import type { Task } from './Types'
import { useGetTask } from './hooks/useGetTask';

const Task = () => {
  const { id } = useParams()
  const  {task, error: taskError} = useGetTask(id)

  return (
    <section 
      className="flex flex-col md:items-left">
      <Link
        to="/tasks"
        className="outline-1 hover:outline-2 outline-white/20 inline-block w-min px-6 py-2 rounded-lg outline-offset-1"
      >
        Back
      </Link>
      <section className="flex-col flex outline-1 outline-white/10 p-6 rounded-lg my-4">
      { 
        (!task || taskError)
          ? taskError? <p>Error happened !!!</p> : <p>...loading</p> 
          : (
              <>
                <h3 
                  className="font-semibold">
                  {task.title}
                </h3>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <h4 className="font-extralight text-sm text-white/80">{new Date(task.date).toLocaleDateString()}</h4>
                <p 
                  className="bg-white/5 px-6 py-10 rounded-lg mt-4">
                  {task.description}
                </p>

                <button
                  className="items-center gap-2 flex flex-row hover:cursor-pointer my-4 outline-1 hover:outline-2 outline-white/20 w-min px-6 py-2 rounded-lg outline-offset-1">
                  <input type="checkbox" checked={!!task.public}/>
                  <span>{task.public ? 'Private': 'Public'}</span>
                </button>

                <button
                  className="items-center gap-2 flex flex-row hover:cursor-pointer text-nowrap outline-1 hover:outline-2 outline-white/20 w-min px-6 py-2 rounded-lg outline-offset-1">
                  <input type="checkbox" checked={!!task.completed}/>
                  <span>{task.completed ? 'Not Complete': 'Completed'}</span>
                </button>
              </>
            )
      }
      </section>
    </section>
  )
}

export { Task }