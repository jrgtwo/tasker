import { useEffect, useState, useContext } from 'react';
import { FetcherContext } from '../../../utils/FetcherContext';
import { ENDPOINTS } from '../../../constants/endpoints';
import type {Tasks, TaskError } from '../Types'
import { UserLoginContext } from '../../../vendor/google/google';

const useGetAllTasks = () => {
  const { isLoggedIn, userLoginData } = useContext(UserLoginContext);
  const [taskList, setTaskList] = useState<Tasks>();
  const [error, setError] = useState<TaskError>();
  const fetcher = useContext(FetcherContext);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const {err, res} = await fetcher.post<Tasks>({
          path: ENDPOINTS.TASKS.GET_ALL, 
          body: {
            userId: userLoginData.userId
          }
        })
        if (err || !res) {
          setError({err: ' error'})
        } else {
          setTaskList(res)
        }
      })()
    }
  }, [userLoginData?.userId, isLoggedIn, fetcher])

  return {taskList, error};
}

export { useGetAllTasks }