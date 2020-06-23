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

#### 커스텀훅 재사용하기
- 불필요한 부분까지 리랜더링이 일어나기때문에 컴포넌트별로 분리하는것이 중요하다.
- 컴포넌트로 분리하는 기준
    - 반복문과 조건문..
    - 반복문과 조건문을 사용할 경우 복잡도가 증가하기 때문에 컴포넌트로 분리하여 복잡도를 낮춰준다.


#### Redux
- state들을 관리하는 방법
    - redux
    - mobx
    - graphQL Client
 
```javascript
{
    isLoggedIn: false, // 로그인여부
    user: {}, //로그인한 사용자 
    mainPosts: [] // 게시글 .. 
} -> store
```
- 하나의 State를 각 필요한 컴포넌트들에게 분배하는역할
- Redux: 복잡한 상태 제어
- React: 간단한 상태 제어

- Redux
    - Action: state를 바꾸는 행동 
        - ex) 로그인액션
    - Dispatch: Action을 실행 
        - ex) 로그인액션 Dispatch
    - Reducer: Action의 결과로 state를 어떻게 바꿀지 정의 
        - ex) 로그인액션 dispatch시 isLoggedIn = true
    - 리액트와 별개이며, Vue, Node 등에 사용가능함.

#### 첫 리듀서 만들기
- npm i redux react-redux
    - redux 와 react를 연결해주기 위해 react-redux를 설치해줌
- Action이 기록이 남고, 역추적이 가능함 타임머신 기능
- 에러 디버깅이 쉽다.
- 코드량이 많아지지만, 예외 발생이 적다.
- store를 따로 분리가능함.
- Reducer
    - reducers > index.js(root Store)
    - 액션의 이름과 액션을 정의해주고, switch문에서 해당 reducer를 정의

`user.js`
```jsx
const initialState = {
    isLoggedIn: false,
    user: {},
};

const LOG_IN = 'LOG_IN'; //액션의 이름
const LOG_OUT = 'LOG_OUT';

const loginAction = {
    type: LOG_IN,
    data: {
        nickname: '정곰',
    },
};

const logoutAction = {
    type: LOG_OUT,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
    }
};
```
#### HOC 방식으로 action, dispatch 가져오기

`pages/index.js`
```jsx
import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';

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

const Home = ({ user, dispatch, login, logout }) => {
    useEffect(() => {
        login();
        logout();
        login();
    }, []);
    return (
        <>
            <div>
                {user ? <div>로그인했습니다 : {user.nickname}</div> : <div>로그아웃했습니다</div>}
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

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: () => dispatch(loginAction),
        logout: () => dispatch(logoutAction),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

#### react-redux 훅을 사용하여 action, dispatch 가져오기
- react-redux 버전이 7.1 이상이어야 관련 훅을 지원한다.

`pages/index.js`
```jsx
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
```