import { type ChangeEvent, type MouseEvent, useState, useContext } from 'react';
import type { FetcherResponse } from '../../../utils/fetcher/FetcherTypes';
import type { Task } from './../Types';
import { SubmissionState } from '../constants/submissionStates';
import { UserLoginContext } from './../../../context/UserLogin/UserLoginContext'
import { DataStoreSingleton } from '../../../utils/dataStore/dataStore';

const usePostNewTaskForm = () => {
  
  const { userLoginData } = useContext(UserLoginContext);

  const [isSubmitting, setIsSubmitting] = useState<SubmissionState>(SubmissionState.init);
  const [submissionError, setSubmissionError] = useState<FetcherResponse<Task>["err"]>()

  const [title, setTitle] = useState<string | null>(null)
  const [desc, setDesc] = useState<string | null>(null)

  const [dueDate, setDueDate] = useState<string|null>(null)

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.target.value)
  }

  const onDateChange = (event: ChangeEvent<HTMLDataElement>) => {
    setDueDate(event.target.value)
  }

  const submitTask = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsSubmitting(SubmissionState.submitting);

    if (!userLoginData) return setSubmissionError(new Error('no user id'))

    const {err, res} = await DataStoreSingleton.Tasks.postNewTask({
      title, desc, userId: userLoginData.userId, dueDate
    })
    if (err || !res) {
      console.warn({err: 'err'})
      setSubmissionError(err)
    } else {  
      console.log(res)
      setIsSubmitting(SubmissionState.finished)
    }
  }

  return {
    onTitleChange,
    onDateChange,
    onDescChange,
    submitTask,
    isSubmitting,
    submissionError
  }
}

export { usePostNewTaskForm }