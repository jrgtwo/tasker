import type {Tasks, TaskError } from '../Types'

import { useEffect, useState, useContext } from 'react';
import { UserLoginContext } from '../../../context/UserLogin/UserLoginContext'
import { StorageSingleton } from '../../../utils/storage/storage';

const useGetAllTasks = () => {
  const { isLoggedIn, userLoginData } = useContext(UserLoginContext);
  const [taskList, setTaskList] = useState<Tasks>();
  const [error, setError] = useState<TaskError>();

  useEffect(() => {
    if (isLoggedIn && userLoginData?.userId) {
      (async () => {
        const {err, res} = await StorageSingleton.getAllTasks({userId: userLoginData.userId})
        if (err || !res) {
          setError({err: ' error'})
        } else {

          setTaskList(res?.res || res)
        }
      })()
    }
  }, [userLoginData?.userId, isLoggedIn])

  return {taskList, error};
}

export { useGetAllTasks }