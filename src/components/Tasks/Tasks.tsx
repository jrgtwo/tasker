import { useGetAllTasks } from './hooks/useGetAllTasks';
import { TaskListElements } from './helpers/TaskListElements';

const Tasks = () => {
  const {
    error: taskFetchError,
    taskList
  } = useGetAllTasks();
  
  return (
    <>
      <h1 className="text-left text-xl/7 font-semibold text-white-900">Your Tasks</h1>
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