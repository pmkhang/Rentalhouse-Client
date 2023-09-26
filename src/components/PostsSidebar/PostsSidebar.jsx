import React, { memo } from 'react';
import PostsItem from './PostsItem';
import { useSelector } from 'react-redux';

const PostsSidebar = ({ outstandingPost }) => {
  const { newPosts, outstandingPosts } = useSelector((state) => state.post);

  return (
    <div
      className={`w-full min-h-[200px] p-5 flex flex-col bg-white shadow-lg rounded-lg gap-3 ${
        outstandingPost && 'bg-orange-100'
      }`}
    >
      <h3 className="text-lg font-semibold">{outstandingPost ? 'Tin nổi bật' : 'Tin mới đăng'}</h3>
      <div className="w-full flex flex-col gap-3">
        {outstandingPost
          ? outstandingPosts?.map((i) => (
              <PostsItem
                key={i?.id}
                img={JSON.parse(i?.images?.image)}
                title={i?.title}
                price={i?.attributes.price}
                time={i?.createdAt}
                id={i?.id}
                star={i?.star}
              />
            ))
          : newPosts?.map((i) => (
              <PostsItem
                key={i?.id}
                img={JSON.parse(i?.images?.image)}
                title={i?.title}
                price={i?.attributes.price}
                time={i?.createdAt}
                id={i?.id}
                star={i?.star}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(PostsSidebar);
