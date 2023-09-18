import { useEffect } from 'react';
import Routers from './routers/Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoRentalHousefavi from './Assets/logoRentalHousefavi.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAcreages, getPrices } from './redux/action/priceAndArceage';
import { getCategory } from './redux/action/categoryAction';
import { getNewPosts } from './redux/action/postAction';
import { getProvince } from './redux/action/provinceAction';
import { getUserDataByID } from './redux/action/userAction';
import { useLocation } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    const changeFavicon = () => {
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = logoRentalHousefavi;
      }
    };
    changeFavicon();
  }, []);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    dispatch(getAcreages());
    dispatch(getPrices());
    dispatch(getCategory());
    dispatch(getNewPosts());
    dispatch(getProvince());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(getUserDataByID());
    }, 100);
  }, [dispatch, isLoggedIn, location?.pathname]);

  return (
    <div className="w-full min-h-screen bg-primary overflow-hidden">
      <Routers />
      <ToastContainer />
    </div>
  );
};

export default App;
