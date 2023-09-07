import { Routes, Route } from 'react-router-dom';
import { SignUpLogin, Home } from '../containers/Public';
import { path } from '../utils/constant';

const Routers = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<Home />}>
        <Route path={path.LOGIN} element={<SignUpLogin />} />
        <Route path={path.REGISTER} element={<SignUpLogin />} />
      </Route>
    </Routes>
  );
};

export default Routers;
