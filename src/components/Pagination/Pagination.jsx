/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } = icons;

const Pagination = () => {
  const { count } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const location = useLocation();
  const [paramsSearch] = useSearchParams();
  const entries = paramsSearch.entries();
  const append = (entries, number) => {
    const params = new URLSearchParams();
    params.set('page', number);
    for (let entry of entries) {
      if (entry[0] !== 'page') {
        params.append(entry[0], entry[1]);
      }
    }
    return params;
  };

  const handleChangePage = (data) => {
    const number = data.selected + 1;
    if (!isNaN(number)) {
      const updatedSearchParams = append(entries, number);
      const searchParamsString = updatedSearchParams.toString();
      console.log(searchParamsString)
      navigate({
        pathname: location?.pathname,
        search: searchParamsString,
      });
    }
    console.log(location.search);
  };
  return (
    <>
      {count !== 0 && (
        <div className="w-full flex items-center justify-center mt-5">
          <ReactPaginate
            previousLabel={<MdOutlineKeyboardArrowLeft />}
            nextLabel={<MdOutlineKeyboardArrowRight />}
            breakLabel={'...'}
            pageCount={Math.ceil(count / 5)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(data) => handleChangePage(data)}
            containerClassName={'pagination flex items-center gap-5 mb:gap-4'}
            activeClassName={'bg-orange-400 border-orange-400 text-white hover:bg-blue-400 hover:text-white rounded-md'}
            previousClassName={'text-[24px] mb:hidden'}
            nextClassName={'text-[24px] mb:hidden'}
            pageLinkClassName={
              'w-[30px] h-[30px] flex items-center justify-center rounded-md shadow-md border border-gray-200 hover:bg-blue-400 hover:border-blue-400 hover:text-white'
            }
          />
        </div>
      )}
    </>
  );
};

export default memo(Pagination);
