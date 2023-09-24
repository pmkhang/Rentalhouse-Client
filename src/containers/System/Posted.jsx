import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../redux/action/postAction';
import { Link } from 'react-router-dom';
import { pathSystem } from '../../utils/constant';
import checkStatus from '../../utils/Common/checkStatus';
import Button from '../../components/Button';
import UpdatePost from '../../components/UpdatePost';
import { useState } from 'react';
import { setEditPost } from '../../redux/Slice/PostsSlice';
import { apiDeleteUserPosts } from '../../services/post';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Posted = () => {
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state) => state.post);
  const [isEdit, setIsEdit] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    dispatch(getUserPosts());
    document.title = 'Quản lý tin đăng';
  }, [dispatch]);

  const handleDeletePost = async (postID, attributesID, overviewID, labelCode, imagesID) => {
    try {
      if (postID && attributesID && overviewID && labelCode && imagesID) {
        const confirmResult = await Swal.fire({
          title: 'Bạn có chắc chắn muốn xóa bài viết này?',
          text: 'Hành động này không thể hoàn tác!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
        });

        if (confirmResult.isConfirmed) {
          const response = await apiDeleteUserPosts(postID, attributesID, overviewID, labelCode, imagesID);
          if (response.status === 200) {
            dispatch(getUserPosts());
            toast.success('Xoá bài đăng thành công !');
          }
        }
      }
    } catch (error) {
      console.log('handleDeletePost errors: ', error);
      toast.error('Xoá bài đăng thất bại !');
    }
  };

  useEffect(() => {
    setPost(userPosts);
  }, [userPosts]);

  const handleFilterByStatus = (statusCode) => {
    if (statusCode === 1) {
      const activePost = userPosts?.filter((i) => checkStatus(i?.overviews?.expired?.split(' ')[3]));
      setPost(activePost);
    } else if (statusCode === 0) {
      const expiredPost = userPosts?.filter((i) => !checkStatus(i?.overviews?.expired?.split(' ')[3]));
      setPost(expiredPost);
    } else {
      setPost(userPosts);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <h2 className="text-3xl font-medium ">Quản lý tin đăng</h2>
        {post?.length > 0 && (
          <select
            className="outline-none border-2 border-gray-300 p-2 rounded-md focus:border-blue-400 text-sm"
            onChange={(e) => handleFilterByStatus(+e.target.value)}
          >
            <option>Lọc theo trạng thái</option>
            <option value={1}>Đang hoạt động</option>
            <option value={0}>Đẵ hết hạn</option>
          </select>
        )}
      </div>
      <div className="min-w-full overflow-x-scroll">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-blue-600">
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
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">Tuỳ chọn</th>
            </tr>
          </thead>
          <tbody>
            {post?.length === 0 && (
              <tr>
                <td className="px-6 py-4">
                  Bạn chưa có tin đăng nào.{' '}
                  <Link to={`/quan-ly/${pathSystem?.CREATE_POST}`} className="text-blue-600 hover:underline">
                    Bấm vào đây
                  </Link>{' '}
                  để bắt đầu đăng tin
                </td>
              </tr>
            )}
            {post?.map((i, index) => (
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
                <td className="px-6 whitespace-nowrap py-4">
                  {checkStatus(i?.overviews?.expired?.split(' ')[3]) ? 'Đang hoạt động' : 'Đẵ hết hạn'}
                </td>
                <td className="px-6 whitespace-nowrap py-4 flex items-center gap-2">
                  <Button
                    text="Sửa"
                    className={'bg-yellow-400 py-[4px] hover:bg-yellow-300 focus:ring-yellow-200'}
                    onClick={() => {
                      setIsEdit(true);
                      dispatch(setEditPost(i));
                    }}
                  />
                  <Button
                    text="Xoá"
                    className={'bg-red-500 py-[4px] hover:bg-red-400 focus:ring-red-200'}
                    textStyle={'text-white'}
                    onClick={() => {
                      // postID, attributesID, overviewID, labelCode, imagesID
                      handleDeletePost(i?.id, i?.attributesID, i?.overviewID, i?.labelCode, i?.imagesID);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default Posted;
