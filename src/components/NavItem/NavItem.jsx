import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ title, path, activeClassName }) => {
  return (
    <li className="flex items-center justify-center cursor-pointer">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'leading-[38px] px-5 text-[13.3px] font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br'
            : 'leading-[38px] px-5 text-[13.3px] font-bold from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br'
        }
        to={path}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default memo(NavItem);
