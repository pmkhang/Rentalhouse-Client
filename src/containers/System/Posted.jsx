import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../redux/action/postAction';
import { Link } from 'react-router-dom';
import { pathSystem } from '../../utils/constant';
import checkStatus from '../../utils/Common/checkStatus';
import Button from '../../components/Button';

const Posted = () => {
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getUserPosts());
    document.title = 'Quản lý tin đăng';
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <h2 className="text-3xl font-medium ">Quản lý tin đăng</h2>
        <select className="outline-none border-2 border-gray-300 p-2 rounded-md focus:border-blue-400 text-sm">
          <option>Lọc theo trạng thái</option>
          <option>Lọc theo trạng thái</option>
        </select>
      </div>
      <div className="min-w-full overflow-x-scroll">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr className='bg-blue-600'>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Mã tin</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                Ảnh đại diện
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                Ngày bắt đầu
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                Ngày hết hạn
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.length === 0 && (
              <tr>
                <td className="px-6 py-4">
                  Bạn chưa có tin đăng nào.{' '}
                  <Link to={`/quan-ly/${pathSystem.CREATE_POST}`} className="text-blue-600 hover:underline">
                    Bấm vào đây
                  </Link>{' '}
                  để bắt đầu đăng tin
                </td>
              </tr>
            )}
            {userPosts?.map((i, index) => (
              <tr
                key={i?.id}
                className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} transition-all hover:bg-blue-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap">{'#' + i?.id}</td>
                <td className="px-6 py-4 whitespace-nowrap inline-flex gap-2 flex-wrap tl:flex-col">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <img
                      key={index}
                      src={
                        JSON.parse(i?.images?.image)[index] ||
                        'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'
                      }
                      alt="img"
                      className="w-[40px] h-[40px] object-cover border border-gray-300 rounded-md"
                    />
                  ))}
                </td>
                <td className="px-6 whitespace-nowrap py-4">{i?.title.slice(0, 20) + '...'}</td>
                <td className="px-6 whitespace-nowrap py-4">{i?.attributes?.price}</td>
                <td className="px-6 whitespace-nowrap py-4">{i?.overviews?.created}</td>
                <td className="px-6 whitespace-nowrap py-4">{i?.overviews?.expired}</td>
                <td className="px-6 whitespace-nowrap py-4">{checkStatus(i?.overviews?.expired?.split(' ')[3])}</td>
                <td className="px-6 whitespace-nowrap py-4 flex items-center gap-2">
                  <Button text="Sửa" className={'bg-yellow-400 py-[4px] hover:bg-yellow-300 focus:ring-yellow-200'} />
                  <Button
                    text="Xoá"
                    className={'bg-red-500 py-[4px] hover:bg-red-400 focus:ring-red-200'}
                    textStyle={'text-white'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posted;
