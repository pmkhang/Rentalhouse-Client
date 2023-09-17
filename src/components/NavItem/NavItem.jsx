import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ title, path, activeClassName }) => {
  return (
    <li className="flex items-center justify-center cursor-pointer">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'leading-[38px] px-5 text-[13.3px] font-bold bg-orange-600 '
            : 'leading-[38px] px-5 text-[13.3px] font-bold  hover:bg-orange-500'
        }
        to={path}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default memo(NavItem);
