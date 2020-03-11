# Front End

#### next와 eslint 설치
- npm init : npm 프로젝트 생성
- npm i react react-dom next
    - react, react-dom, next 설치
- npm i -D nodemon webpack
    - 개발시에만 nodemon, webpack 설치
- npm i -D eslint
    - eslint 설치
    - .eslintrc (eslint설정)
    - npm i -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks (eslint 플러그인 설치)

#### next 라우팅 시스템
- next에서는 router를 제공해준다.
- 개발, 빌드, 배포를 next가 알아서 진행해주기 때문에 next 명령어를 등록하여 편리하게 사용할 수 있다.

`package.json`
```javascript
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  } 
``` 
- npm run dev 명령어로 webpack dev server와 비슷한 상태로 실행
- next의 router 가 pages 내부의 경로가 url 경로와 동일하다.
- 코드 스플리팅이 기본적으로 적용되어있다.
- next에서 Link는 기본적으로 react Router 와 같이 사용할 수 있다.

#### ant design 적용
- npm i antd
- Head태그를 사용하고 싶을때는 next/head 컴포넌트를 사용하여 html형태로 작성해준다.

`AppLayout.js`
```jsx
import React from 'react';
import { Menu, Input } from 'antd';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home">노드버드</Menu.Item>
                <Menu.Item key="profile">프로필</Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            {children}
        </div>
    );
}

export default AppLayout; 
```

#### 프로필, 회원가입 페이지 만들기

`profile.js`
```jsx
import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <>
        <Head>
        <title>React-SNS</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
        </Head>
        <AppLayout>
            <div>
               프로필
            </div>
        </AppLayout>
        </>
    );
}

export default Profile; 
```

`signup.js`
```jsx
import React, {useState} from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup =  () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError,  setTermError] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }

        console.log({
            id,
            nick,
            password,
            passwordCheck,
            term
        });
    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };
    
    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordCheck = (e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    };

    return (
        <>
        <Head>
        <title>React-SNS</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
        </Head>
        <AppLayout>
            <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br/>
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" value={password} required type="password" onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-chk">비밀번호체크</label>
                    <br/>
                    <Input name="user-password-chk" required value={passwordCheck} type="password" onChange={onChangePasswordCheck} />
                    {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의</Checkbox>
                    {termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>
        </>
    );
}

export default Signup; 
```

#### 커스텀 훅 적용
- [state, setState]의 형태로 반복적인 형태가 나타난다,
    - 커스텀  훅을 사용하여 중복을 줄일 수 있다.

#### useCallback 적용
- 리랜더링이 일어날때마다 함수가 재실행되는 것을 막기위해 useCallback을 사용한다.

#### _app.js
- head 부분이 중복적으로 리랜더링된다. Next에서는 이러한 중복을 막기 위한 방법을 제공한다.
- pages 폴더 내부에 _app.js를 만든다. 해당 파일에 컴포넌트를 구성하면 해당 컴포넌트는 다른 컴포넌트의 부모가 된다.
- next에서 Component라는 props를 전달해주는데, 이Component는 index, profile, singup 과 같은 해당 페이지의 컴포넌트들이다.
- 나머지 페이지 컴포넌트들의 중복부분을 제거

`_app.js`
```jsx
import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    );
};

export default NodeBird; 
```
#### prop-types 적용
- npm i prop-types
- 자식컴포넌트가 부모로부터 받은 Props를 올바른 데이터 타입의 데이터를 받았는지 검증 가능
```jsx
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    );
};

NodeBird.PropTypes = {
    Component: PropTypes.elementType,
};

export default NodeBird; 
```


#### Next에서 제공하는 공통부분 처리
- 1. _document.js : html, head, body
- 2. _app.js : root
- 3. _error.js : 에러페이지
- pages : 실제 컴포넌트

