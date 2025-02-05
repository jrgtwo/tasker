import { type ChangeEvent, type MouseEvent, useState, useContext } from 'react';
import { FetcherContext } from '../../../utils/FetcherContext';
import type { FetcherResponse } from '../../../utils/FetcherTypes';
import type { Task } from './../Types';
import { SubmissionState } from '../constants/submissionStates';
import { ENDPOINTS } from '../../../constants/endpoints';
import { UserLoginContext } from './../../../context/UserLogin/UserLoginContext'

const usePostNewTaskForm = () => {
  const fetcher = useContext(FetcherContext);
  const { userLoginData } = useContext(UserLoginContext);

  const [isSubmitting, setIsSubmitting] = useState<SubmissionState>(SubmissionState.init);
  const [submissionError, setSubmissionError] = useState<FetcherResponse<Task>["err"]>()

  const [title, setTitle] = useState<string | null>(null)
  const [desc, setDesc] = useState<string | null>(null)

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onDescChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value)
  }

  const submitTask = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmitting(SubmissionState.submitting);

    if (!userLoginData) return setSubmissionError(new Error('no user id'))

    const {err, res} = await fetcher.post({
      path: ENDPOINTS.TASKS.NEW, 
      body: {title, desc, userId: userLoginData.userId}
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
    onDescChange,
    submitTask,
    isSubmitting,
    submissionError
  }
}

export { usePostNewTaskForm }