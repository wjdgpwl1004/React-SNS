import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';
import { useState } from 'react';


const Home = () => {
    const dispatch = useDispatch();
    // 상태값이 바뀔때마다 컴포넌트가 리랜더링 되므로, 성능 최적화를 위해 상태를 쪼개는 경우도 있다.
    const { isLoggedIn } = useSelector(state => state.user);
    const{ mainPosts } = useSelector(state => state.post);

    return (
        <>
            <div>
                {isLoggedIn && <PostForm /> }
                {mainPosts.map((c) => {
                    return(
                        <PostCard key={c} post={c} />
                    )
                })}
            </div>
        </>
    )
};


export default Home;