import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { createSearchParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import icons from '../../utils/icons';
import { useDispatch } from 'react-redux';

const { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } = icons;

const Pagination = ({ length, page }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams)
  console.log(location);
  let handleChangePage;

  if (location?.search === '' || location?.search.includes('?page')) {
    handleChangePage = (data) => {
      const number = data.selected + 1;
      navigate({
        pathname: '/',
        search: createSearchParams({
          page: number,
        }).toString(),
      });
    };
  } else if (location?.search.includes('?gia_')) {
    handleChangePage = (data) => {
      const number = data.selected + 1;

      navigate({
        pathname: '/',
        search: createSearchParams({
          page: number,
        }).toString(),
      });
    };
  } else if (location?.search.includes('?dien_tich=')) {
    handleChangePage = (data) => {
      const number = data.selected + 1;
      navigate({
        pathname: '/',
        search: createSearchParams({
          page: number,
        }).toString(),
      });
    };
  }

  return (
    <div className="w-full flex items-center justify-center mt-5">
      {handleChangePage && ( // Kiểm tra nếu handleChangePage đã được gán
        <ReactPaginate
          previousLabel={<MdOutlineKeyboardArrowLeft />}
          nextLabel={<MdOutlineKeyboardArrowRight />}
          breakLabel={'...'}
          pageCount={Math.ceil(length)}
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
      )}
    </div>
  );
};

export default memo(Pagination);
