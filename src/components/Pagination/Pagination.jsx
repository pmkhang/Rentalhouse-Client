/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } = icons;

const Pagination = () => {
  const { count } = useSelector((state) => state.post);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [paramsSearch] = useSearchParams();
  const entries = Array.from(paramsSearch.entries());

  const append = (entries, number) => {
    const searchParamsObject = {};
    entries.forEach(([key, value]) => {
      if (key !== 'page') {
        if (searchParamsObject[key]) {
          searchParamsObject[key].push(value);
        } else {
          searchParamsObject[key] = [value];
        }
      }
    });
    searchParamsObject.page = number;
    return searchParamsObject;
  };

  useEffect(() => {
    const page = searchParams.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [currentPage, searchParams]);

  const handleChangePage = (data) => {
    const number = data.selected + 1;
    if (+number) {
      setCurrentPage(+number);
      const updatedSearchParams = append(entries, number);
      const searchParamsString = new URLSearchParams(updatedSearchParams).toString();
      navigate({
        pathname: location?.pathname,
        search: searchParamsString,
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <ReactPaginate
        previousLabel={<MdOutlineKeyboardArrowLeft />}
        nextLabel={<MdOutlineKeyboardArrowRight />}
        breakLabel={'...'}
        pageCount={Math.ceil(count / 5)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(data) => handleChangePage(data)}
        containerClassName={'pagination flex items-center gap-5'}
        activeClassName={'bg-orange-400 text-white hover:bg-blue-400 hover:text-white rounded-md'}
        previousClassName={'text-[24px]'}
        nextClassName={'text-[24px]'}
        pageLinkClassName={
          'w-[30px] h-[30px] flex items-center justify-center rounded-md shadow-md hover:bg-blue-400 hover:text-white'
        }
      />
    </div>
  );
};

export default memo(Pagination);
