import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Home = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Navigation />
      <div className="max-w-[1100px] mx-auto my-0 px-5 mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
