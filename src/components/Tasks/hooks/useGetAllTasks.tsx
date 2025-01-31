import { useEffect, useState, useContext } from 'react';
import { FetcherContext } from '../../../utils/FetcherContext';
import { ENDPOINTS } from '../../../constants/endpoints';
import type {Tasks, TaskError } from '../Types'

const useGetAllTasks = () => {
  const [taskList, setTaskList] = useState<Tasks>();
  const [error, setError] = useState<TaskError>();
  const fetcher = useContext(FetcherContext);

  useEffect(() => {
    fetcher.get<Tasks>({
        path: ENDPOINTS.TASKS.GET_ALL, 
        cb: ({err, res} ) => {
          if (err || res === null) {
            setError({err: 'error'})
          } else {
            setTaskList(res);
          }
        }
      })
  }, [fetcher])

  return {taskList, error};
}

export { useGetAllTasks }