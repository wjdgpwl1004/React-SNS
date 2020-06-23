import React from 'react';
import { Card, Avatar } from 'antd';
import { useSelector } from 'react-redux';


const UsrProfile = () => {
    const { user } = useSelector(state => state.user);
    return (
        <Card
            actions={[
                <div key="twit">짹짹 <br/>{user.Post.length}</div>,
                <div key="following">짹짹 <br/>{user.Followings.length}</div>,
                <div key="follower">짹짹 <br/>{user.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}  
            />
        </Card>
    );
}

export default UsrProfile; 