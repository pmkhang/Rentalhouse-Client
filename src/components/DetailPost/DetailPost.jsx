import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostsLimit } from '../../redux/action/postAction';
import SliderImage from '../SliderImage';

const DetailPost = () => {
  const { posts } = useSelector((state) => state.post);
  const { postID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (postID) {
      dispatch(getPostsLimit({ id: postID }));
    }
  }, [dispatch, postID]);

  return (
    <div className="w-full flex gap-4">
      <div className="w-[70%] tl:w-full">
        <SliderImage images={posts[0]?.images?.image} />
        <div>
          <h2 className='text-xl font-semibold text-red-600'>{posts[0]?.title}</h2>
        </div>
      </div>
      <div className="w-[30%] tl:hidden border border-red-300">sidebar</div>
    </div>
  );
};

export default DetailPost;
