
import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './components/main/Home/Home'
import { Tasks } from './components/Tasks/Tasks'
import { Task } from './components/Tasks/Task';
import { NewTask } from './components/Tasks/NewTask';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/tasks">
            <Route index element={<Tasks />} />
            <Route path="new" element={<NewTask />} />
            <Route path=":id" element={<Task />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
