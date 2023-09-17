import { Routes, Route } from 'react-router-dom';
import {
  SignUpLogin,
  Home,
  RentHouse,
  RentApartment,
  RentMotel,
  RentGround,
  HomePage,
  SearchDetail,
} from '../containers/Public';
import { path } from '../utils/constant';

const routes = [
  { path: '*', element: <HomePage /> },
  { path: path.HOME__, element: <HomePage /> },
  { path: path.LOGIN, element: <SignUpLogin flag={false} /> },
  { path: path.REGISTER, element: <SignUpLogin flag={true} /> },
  { path: path.NHA_THUE, element: <RentHouse /> },
  { path: path.CAN_HO, element: <RentApartment /> },
  { path: path.MAT_BANG, element: <RentGround /> },
  { path: path.PHONG_TRO, element: <RentMotel /> },
  { path: path.SEARCH_DETAIL, element: <SearchDetail /> },
];

const Routers = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<Home />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routers;
