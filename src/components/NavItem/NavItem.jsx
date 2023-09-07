import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ title, path, activeClassName }) => {
  return (
    <li className="flex items-center justify-center cursor-pointer">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'leading-[38px] px-5 bg-secondary2 text-[13.3px] font-bold'
            : 'leading-[38px] px-5 text-[13.3px] font-bold hover:bg-secondary2'
        }
        to={path}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default NavItem;
