import {useContext} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { PrivateRoutes } from './PrivateRoute';
import { Tasks } from '../components/Tasks/Tasks'
import { Task } from '../components/Tasks/Task';
import { MainHeader } from '../components/main/MainHeader/MainHeader';
import { MainFooter } from '../components/main/MainFooter/MainFooter';
import { NewTask } from '../components/Tasks/NewTask';

import { UserLoginContext } from '../context/UserLogin/UserLoginContext';

const Router = () => {
  const {isLoggedIn} = useContext(UserLoginContext)
  return (
    <BrowserRouter>
      <MainHeader/>
        <section className="w-xl mx-auto mt-12 mb-12">
          <Routes>
            <Route index element={isLoggedIn ? <Tasks /> : <h2>LoggedOut</h2> } />
            <Route path="/tasks" element={<PrivateRoutes isLoggedIn={isLoggedIn}/>}>
              <Route index element={<Tasks />} />
              <Route path="new" element={<NewTask />} />
              <Route path=":id" element={<Task />} />
            </Route>
          </Routes>
        </section>
      <MainFooter />
    </BrowserRouter>
  );
}

export { Router }