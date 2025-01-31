import { useEffect, useState, useContext } from 'react';
import { FetcherContext } from '../../../utils/FetcherContext';
import { ENDPOINTS } from '../../../constants/endpoints';
import type {Tasks, TaskError } from '../Types'

const useGetAllTasks = () => {
  const [taskList, setTaskList] = useState<Tasks>();
  const [taskFetchError, setTaskFetchError] = useState<TaskError>();
  const fetcher = useContext(FetcherContext);

  useEffect(() => {
    fetcher.get<Tasks>({
        pageToFetch: ENDPOINTS.TASKS.GET_ALL, 
        cb: ({err, res} ) => {
          if (err || res === null) {
            setTaskFetchError({err: 'error'})
          } else {
            setTaskList(res);
          }
        }
      })
  }, [fetcher])

  return {taskList, taskFetchError};
}

export { useGetAllTasks }