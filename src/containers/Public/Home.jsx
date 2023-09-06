import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Home = () => {
   return (
      <div className="w-full h-full">
         <Header />
         <Navigation />
         <div className="max-w-[1100px] mx-auto my-0 mt-5 flex flex-col items-center justify-start">
            <Outlet />
         </div>
      </div>
   );
};

export default Home;
