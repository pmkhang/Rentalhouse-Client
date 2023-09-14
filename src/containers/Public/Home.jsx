import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import RollTop from '../../components/RollTop/RollTop';
import SearchFilter from '../../components/SearchFIlter/SearchFilter';
import Header from './Header';
import Navigation from './Navigation';
import { useDispatch } from 'react-redux';
import { getAcreages, getPrices } from '../../redux/action/priceAndArceage';
import { getCategory } from '../../redux/action/categoryAction';
import { getUsersData } from '../../redux/action/userAction';
import Intro from '../../components/Intro';
import Contact from '../../components/Contact';

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.search, location?.pathname]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAcreages());
    dispatch(getPrices());
    dispatch(getCategory());
    dispatch(getUsersData());
  }, [dispatch]);

  return (
    <div className="w-full min-h-[4000px] relative overflow-auto">
      <Header />
      <Navigation />
      <SearchFilter />
      <div className="max-w-[1100px] flex flex-col mx-auto my-0 px-5 mt-3 gap-5">
        <Outlet />
        <Intro />
        <Contact />
      </div>
      <RollTop />
    </div>
  );
};

export default Home;
