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
