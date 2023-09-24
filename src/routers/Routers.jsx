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
import { ChangePassword, CreatePost, Posted, SavedPosts, System, UserInfo } from '../containers/System';
import { path, pathSystem } from '../utils/constant';

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

const systemRoutes = [
  { path: pathSystem.CREATE_POST, element: <CreatePost /> },
  { path: pathSystem.POSTS, element: <Posted /> },
  { path: pathSystem.INFO, element: <UserInfo /> },
  { path: pathSystem.SAVED_POSTS, element: <SavedPosts /> },
  { path: pathSystem.CHANGE_PASSWORD, element: <ChangePassword /> },
];

const Routers = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<Home />}>
        {routes?.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path={pathSystem.SYSTEM} element={<System />}>
        {systemRoutes?.map((route, index) => (
          <Route key={index} path={route?.path} element={route?.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routers;
