import { useState, useEffect, useContext } from 'react';
import { FetcherContext } from '../../../utils/FetcherContext';
import { ENDPOINTS } from '../../../constants/endpoints';
import type {Task, TaskError } from '../Types';
import { UserLoginContext } from '../../../vendor/google/google';

const useGetTask = (id:Task["id"] | undefined) => {
  const {isLoggedIn, userLoginData} = useContext(UserLoginContext);
  const fetcher = useContext(FetcherContext);
  const [task, setTask] = useState<Task|null>();
  const [error, setError] = useState<TaskError>();

  useEffect(() => {
    if (isLoggedIn) {
      fetcher.post<Task>({
        path: ENDPOINTS.TASKS.GET_BY_ID(id),
        body: {
          userId: userLoginData.userId
        },
        cb: ({err, res}) => {
          if (err) {
            setError({err: 'error'})
          } else {
            setTask(res)
          }
        }
      })
    }
  },[fetcher, id,userLoginData?.userId, isLoggedIn]);

  return { task, error}
}

export { useGetTask }
