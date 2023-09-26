import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostsLimit } from '../../redux/action/postAction';
import icons from '../../utils/icons';
import SliderImage from '../SliderImage';
import Boxinfo from '../BoxInfo';
import PostsSibar from '../PostsSidebar';
const { ImLocation2, ImPriceTags, FaRulerCombined, BiHash, BiTimeFive, BiSolidStar } = icons;

const DetailPost = () => {
  const { posts } = useSelector((state) => state.post);
  const { postID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (postID) {
      dispatch(getPostsLimit({ id: postID }));
    }
  }, [dispatch, postID]);

  useEffect(() => {
    document.title = posts[0]?.title;
  }, [posts]);

  return (
    <div className="w-full flex gap-4 ">
      <div className="w-[70%] tl:w-full bg-white rounded-lg shadow-md">
        <SliderImage images={posts[0]?.images?.image} />
        <div className="flex flex-col gap-3 p-5">
          <h2 className="text-xl font-semibold text-red-600">
            {posts[0]?.star && (
              <span className="inline-flex items-center gap-1">
                {Array(+posts[0]?.star)
                  .fill()
                  .map((_, index) => (
                    <span key={index} className="text-[14px] text-[#ffd454]">
                      <BiSolidStar />
                    </span>
                  ))}
              </span>
            )}
            {posts[0]?.title}
          </h2>
          <div className="flex items-center gap-2">
            <span>Chuyên mục: </span>
            <span className="text-blue-600 underline font-semibold hover:text-orange-600">
              {posts[0]?.overviews?.area}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ImLocation2 size={20} color="#1081e0" />
            <span>{posts[0]?.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
              <ImPriceTags />
              <span className="">{posts[0]?.attributes?.price}</span>
            </div>
            <div className="flex items-center gap-2 text-md text-gray-500">
              <FaRulerCombined />
              <span>{posts[0]?.attributes?.acreage}</span>
            </div>
            <div className="flex items-center gap-2 text-md text-gray-500">
              <BiTimeFive />
              <span>{posts[0]?.attributes?.published}</span>
            </div>
            <div className="flex items-center gap-2 text-md text-gray-500">
              <BiHash />
              <span>{posts[0]?.attributes?.hashtag}</span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-4">Thông tin mô tả</h3>
          <div className="flex flex-col gap-3">
            {posts.length > 0 &&
              JSON.parse(posts[0]?.desc)?.map((i, index) => <span key={index}>{i.replaceAll('*', '')}</span>)}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-4">Đặc điểm tin đăng</h3>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr className="w-full flex hover:bg-orange-200">
                <td className="p-2 flex w-[180px]">Mã tin:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.code}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200 bg-gray-200">
                <td className="p-2 flex w-[180px]">Khu vực:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.area}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200">
                <td className="p-2 flex w-[180px]">Loại tin rao:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.type}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200 bg-gray-200">
                <td className="p-2 flex w-[180px]">Đối tượng thuê:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.target}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200">
                <td className="p-2 flex w-[180px]">Gói tin:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.bonus}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200 bg-gray-200">
                <td className="p-2 flex w-[180px]">Ngày đăng:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.created}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200">
                <td className="p-2 flex w-[180px]">Ngày hết hạn:</td>
                <td className="p-2 flex-1">{posts[0]?.overviews?.expired}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-4">Thông tin liên hệ</h3>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr className="w-full flex hover:bg-orange-200">
                <td className="p-2 flex w-[180px]">Liên hệ:</td>
                <td className="p-2 flex-1">{posts[0]?.users?.name.substring(0, 7) + '....'}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200 bg-gray-200">
                <td className="p-2 flex w-[180px]">Điện thoại:</td>
                <td className="p-2 flex-1">{posts[0]?.users?.phone.substring(0, 5) + '....'}</td>
              </tr>
              <tr className="w-full flex hover:bg-orange-200">
                <td className="p-2 flex w-[180px]">Zalo:</td>
                <td className="p-2 flex-1">{posts[0]?.users?.zalo.substring(0, 5) + '....'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/**TODO: Google Map */}
      </div>
      <div className="w-[30%] h-fit flex flex-col gap-4 tl:hidden">
        <Boxinfo userInfo={posts[0]?.users} />
        <PostsSibar outstandingPost />
        <PostsSibar />
      </div>
    </div>
  );
};

export default DetailPost;
