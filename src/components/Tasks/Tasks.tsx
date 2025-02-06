import { Link } from 'react-router';
import { useGetAllTasks } from './hooks/useGetAllTasks';
import { TaskListElements } from './helpers/TaskListElements';

const Tasks = () => {
  const {
    error: taskFetchError,
    taskList
  } = useGetAllTasks();
  
  return (
    <>
    <Link to="/tasks/new" className="underline cursor-pointer text-white">Add a new Task {`-->`}</Link>
      <h1 className="font-bold text-left text-2xl">Your Tasks</h1>
      {
        (!taskList || taskFetchError)
          ? (
            taskFetchError 
              ? <h2>Error happened :/</h2> 
              : <h2>...Loading</h2>
          ) : <TaskListElements taskList={taskList}/>
      }
    </>
  )
}

export { Tasks}