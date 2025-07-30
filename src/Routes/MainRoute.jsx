import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';

const MainRoute = () => {
     return (
          <Routes>
               <Route path='/' element={<App></App>}>
                    <Route index element={<Home></Home>}></Route>
               </Route>
          </Routes>
     );
};

export default MainRoute;