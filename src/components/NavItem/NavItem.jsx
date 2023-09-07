import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ text, path, active }) => {
  return (
    <li className={`${active} py-[8px] px-5 flex items-center justify-center cursor-pointer hover:bg-[#f73859]`}>
      <Link to={path}>{text}</Link>
    </li>
  );
};

export default NavItem;
