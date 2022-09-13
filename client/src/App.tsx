import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard, Login, Register } from './pages/';
import { DefaultPage, AuthRoutes, ProtectedRoutes } from './components';
import { TasksProvider } from './context/tasks/store';

export const App = () => {
  return (
    <DefaultPage>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={
              <TasksProvider>
                <Dashboard />
              </TasksProvider>
            }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </DefaultPage>
  );
};