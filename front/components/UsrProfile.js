import React from 'react';
import { Card, Avatar } from 'antd';

const dummy = {
    nickname: '정곰',
    Post: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false,
}

const UsrProfile = () => {
    return (
        <Card
            actions={[
                <div key="twit">짹짹 <br/>{dummy.Post.length}</div>,
                <div key="following">짹짹 <br/>{dummy.Followings.length}</div>,
                <div key="follower">짹짹 <br/>{dummy.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}  
            />
        </Card>
    );
}

export default UsrProfile; 