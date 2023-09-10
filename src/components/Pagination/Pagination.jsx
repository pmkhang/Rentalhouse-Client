import React, { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { createSearchParams, useNavigate } from 'react-router-dom';
import icons from '../../utils/icons';

const { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } = icons;

const Pagination = ({ length, number }) => {
  const [currentPage, setCurrentPage] = useState(number);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(number);
    console.log(number);
  }, [number]);

  useEffect(() => {
    const selectedPage = currentPage ;
    const searchParams = selectedPage === 1 ? '' : createSearchParams({ page: selectedPage }).toString();
    navigate({ pathname: '/', search: searchParams });
  }, [currentPage, navigate]);


  return (
    <div className="w-full flex items-center justify-center mt-5">
      <ReactPaginate
        previousLabel={<MdOutlineKeyboardArrowLeft />}
        nextLabel={<MdOutlineKeyboardArrowRight />}
        breakLabel={'...'}
        pageCount={length - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(data) => setCurrentPage(data.selected + 1)}
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
