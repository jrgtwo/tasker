import { useState, useEffect, useContext } from 'react';
import type {Task, TaskError } from '../Types';
import { UserLoginContext } from './../../../context/UserLogin/UserLoginContext'
import { StorageSingleton } from '../../../utils/storage/storage';

const useGetTask = (id:Task["id"] | undefined) => {
  const {isLoggedIn, userLoginData} = useContext(UserLoginContext);
  const [task, setTask] = useState<Task|null>();
  const [error, setError] = useState<TaskError>();

  useEffect(() => {
    if (isLoggedIn && userLoginData?.userId && id) {
      (async () => {
        const {err, res} = await StorageSingleton.getTask({
          taskId: id, userId: userLoginData.userId
        });

        if (err || !res) {
          setError({err: 'error'})
        } else {
          setTask(res)
        }
      })() 
    }
  },[id,userLoginData?.userId, isLoggedIn]);
  return { task, error}
}

export { useGetTask }
