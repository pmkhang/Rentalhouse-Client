import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SearchFilter from '../../components/SearchFIlter/SearchFilter';
import Header from './Header';
import Navigation from './Navigation';
import RollTop from '../../components/RollTop/RollTop';
import { useLocation } from 'react-router-dom';
import { getAcreages, getPrices } from '../../redux/action/priceAndArceage';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../redux/action/categoryAction';

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  useEffect(() => {
    
    dispatch(getAcreages());
    dispatch(getPrices());
    dispatch(getCategory());
  }, []);

  return (
    <div className="w-full h-full relative overflow-auto">
      <Header />
      <Navigation />
      <SearchFilter />
      <div className="max-w-[1100px] mx-auto my-0 px-5 mt-3">
        <Outlet />
      </div>
      <RollTop />
    </div>
  );
};

export default Home;
