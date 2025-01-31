import { useState, useEffect, useContext } from 'react';
import { FetcherContext } from '../../../utils/FetcherContext';
import { ENDPOINTS } from '../../../constants/endpoints';
import type {Task, TaskError } from '../Types';

const useGetTask = (id:Task["id"] | undefined) => {
  const fetcher = useContext(FetcherContext);
  const [task, setTask] = useState<Task|null>();
  const [error, setError] = useState<TaskError>();

  useEffect(() => {
    fetcher.get<Task>({
      path: ENDPOINTS.TASKS.GET_BY_ID(id),
      cb: ({err, res}) => {
        if (err) {
          setError({err: 'error'})
        } else {
          setTask(res)
        }
      }
    })
  },[fetcher, id]);

  return { task, error}
}

export { useGetTask }
