import { Routes, Route } from 'react-router-dom';
import { Login, Home } from '../containers/Public';
import { path } from '../utils/constant';

const Routers = () => {
   return (
      <Routes>
         <Route path={path.HOME} element={<Home />}>
            <Route path={path.LOGIN} element={<Login />} />
         </Route>
      </Routes>
   );
};

export default Routers;
