import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: '정곰',
        },
        content: '첫번째 글',
        img: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
    }],
};

const Home = () => {
    return (
        <>
            <div>
                {dummy.isLoggedIn && <PostForm /> }
                {dummy.mainPosts.map((c) => {
                    return(
                        <PostCard key={c} post={c} />
                    )
                })}
            </div>
        </>
    )
};

export default Home;