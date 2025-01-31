import { useGetAllTasks } from './hooks/useGetAllTasks';
import { Link } from 'react-router';

const TaskList = () => {
  
  const {taskList, taskFetchError} = useGetAllTasks()
  
  return (
    <>
      <h1>Task List</h1>
      {
        (!taskList || taskFetchError)
          ? (
            taskFetchError 
              ? <h2>Error happened :/</h2> 
              : <h2>...Loading</h2>
          ) : (
            <ul>
              {
              taskList?.map((task) => (
                <li>
                  <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                </li>
               ))
             }
            </ul>
          )
      }
    </>
  )
}

export { TaskList }