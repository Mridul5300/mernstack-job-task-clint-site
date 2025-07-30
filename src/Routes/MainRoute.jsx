
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import Login from '../Auth/Login';
import PrivateRoute from './PrivateRoute';
import SignIn from '../Auth/SignIn ';
import TaskDetails from '../Pages/Tasklist/TaskDetails';

import SpinWheel from '../Pages/SpinWheel';

const MainRoute = () => {
     return (
          <Routes>
               <Route path='/' element={<App></App>}>
                    <Route index element={
                         <PrivateRoute>
                              <Home />
                         </PrivateRoute>
                    } />
                    <Route path="login" element={<Login />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="/tasks/:id" element={<TaskDetails />} />
                    <Route path='/spin' element={ <SpinWheel />} />
               </Route>
          </Routes>
     );
};

export default MainRoute;