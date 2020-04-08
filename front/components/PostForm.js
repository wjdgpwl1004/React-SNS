import React from 'react';
import { Form, Input, Button } from 'antd';

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

const PostForm = () => {
    return (
        <Form style={{ marginBottom: 20 }} encType="multipart/form-data">
            <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?"/>
            <div>
                <input type="file" multiple hidden/>
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}}>짹짹</Button>
            </div>
            <div>
                {dummy.imagePaths.map((v, i) => {
                    return (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Form>
    );
}

export default PostForm; 