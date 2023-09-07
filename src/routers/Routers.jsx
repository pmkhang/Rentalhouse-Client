import { Routes, Route } from 'react-router-dom';
import { SignUpLogin, Home, RentHouse, RentApartment, RentMotel, RentGround, HomePage } from '../containers/Public';
import { path } from '../utils/constant';

const Routers = () => {
  return (
    <Routes>
      <Route path={path.HOME} element={<Home />}>
        <Route path={'*'} element={<HomePage />} />
        <Route path={path.LOGIN} element={<SignUpLogin flag={false} />} />
        <Route path={path.REGISTER} element={<SignUpLogin flag={true} />} />
        <Route path={path.NHA_THUE} element={<RentHouse />} />
        <Route path={path.CAN_HO} element={<RentApartment />} />
        <Route path={path.MAT_BANG} element={<RentGround />} />
        <Route path={path.PHONG_TRO} element={<RentMotel />} />
      </Route>
    </Routes>
  );
};

export default Routers;
