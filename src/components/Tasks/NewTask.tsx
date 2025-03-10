import { useContext } from 'react';
import { usePostNewTaskForm } from './hooks/usePostNewTaskForm'
import { SubmissionState } from './constants/submissionStates';
import { UserLoginContext } from './../../context/UserLogin/UserLoginContext'
import { getDate } from '../../utils/getDate';

const NewTask = () => {
  const  { isLoggedIn } = useContext(UserLoginContext)
  const {
    onTitleChange,
    onDescChange,
    onDateChange,
    submitTask,
    isSubmitting,
    submissionError,
  } = usePostNewTaskForm();

  return (
    <>{
      isLoggedIn
        ?
          <>
            <form className="text-center flex flex-col" onSubmit={(event) => {
              event.preventDefault()
            }}>
              {
                submissionError &&
                <h3>Sorry There was an error: {`${JSON.stringify(submissionError)}`}</h3>
              }
              
              <input 
                type="text" 
                placeholder="What Do You Need To Do"
                id="title" 
                name="title" 
                onChange={onTitleChange}
                className="border-1 border-white/10 p-4 bg-slate-800 rounded-lg font-semibold text-2xl/2 text-white/90 focus:outline-1 focus:outline-offset-1"
              />
            
              <textarea
                placeholder="Add some notes here"
                onChange={onDescChange}
                className="border-1 border-white/10 bg-slate-800 rounded-lg text-med/2 text-white/90 p-4 mt-6 focus:outline-1 focus-outline-offsest-1"
              ></textarea>

              <div
                className="flex ">
                <label 
                  htmlFor="date"
                  className="my-4 mr-4 font-semibold">
                    Due Date:
                </label>
                <input 
                  name="date" 
                  type="date" 
                  min={getDate()}
                  onChange={onDateChange}
                  className="w-min px-4 bg-slate-700 border-1 border-white/10 rounded-lg"/>
              </div>
              
              <button 
                disabled={isSubmitting !== SubmissionState.init || !!submissionError} 
                onClick={submitTask}
                className="mt-8 border-1 border-white/20 w-2xs mx-auto rounded-lg text-2xl/12 hover:cursor-pointer hover:border-white/50"  
              >Save Task</button>

            </form>
          </>
        : <p>Please Login</p>
    }
    </>
  )
}

export { NewTask }