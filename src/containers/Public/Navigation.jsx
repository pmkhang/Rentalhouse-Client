import React from 'react';
import { path } from '../../utils/constant';
import NavItem from '../../components/NavItem/NavItem';

const Navigation = () => {
  return (
    <div className="w-full bg-secondary1 text-white">
      <div className="max-w-[1100px] my-0 mx-auto px-5">
        <nav>
          <ul className="h-[40px] flex items-center">
            <NavItem text="Trang chủ" path={'/'} active={'bg-[#f73859]'} />
            <NavItem text="Cho thuê phòng trọ" path={path.rentMotel} />
            <NavItem text="Nhà cho thuê" path={path.rentHouse} />
            <NavItem text="Cho thuê căn hộ" path={path.rentApartment} />
            <NavItem text="Mặt bằng, văn phòng" path={path.rentOffice} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
