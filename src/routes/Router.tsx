import { BrowserRouter, Routes, Route } from 'react-router'
import { Tasks } from '../components/Tasks/Tasks'
import { Task } from '../components/Tasks/Task';
import { MainHeader } from '../components/main/MainHeader/MainHeader';
import { MainFooter } from '../components/main/MainFooter/MainFooter';
import { NewTask } from '../components/Tasks/NewTask';

import { Tester } from '../components/Tester/Tester'

const Router = () => {
  return (
    <BrowserRouter>
      <MainHeader/>
        <section className="w-xl mx-auto mt-12 mb-12">
        <Routes>
          <Route index element={<Tasks />} />
          <Route path="/tasks">
            <Route index element={<Tasks />} />
            <Route path="new" element={<NewTask />} />
            <Route path=":id" element={<Task />} />
          </Route>
          <Route path="/test">
            <Route index element={<Tester />} />
          </Route>
        </Routes>
        </section>
      <MainFooter />
    </BrowserRouter>
  );
}

export { Router }