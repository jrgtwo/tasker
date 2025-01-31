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
      <h1>Task List</h1>
      <Link to="/tasks/new">Add a new Task {`-->`}</Link>
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