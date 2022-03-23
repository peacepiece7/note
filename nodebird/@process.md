# Get start

`npm i next`
`npm i react react-dom`

front/pages에 page.js 생성 (폴더 이름 변경 불가)

front/component에 component (폴더 이름 변경 가능)

`npx i create-next-app 도 가능`

# Tips
### props.chilren으로 하휘 요소 랜더링, 레이아웃 잡을 때 사용하기
---
### next는 react hot loader(nodemon같은거)가 적용되어 있음

----
### component에 props를 넘겨주는 함수는 useCallback을 사용할 것
----
### <a target="_black" rel="noreferer noopener"/><a> noreferer noopener 옵션으로 참고 주소, 방문자 기록을 삭제해야 함

---- 
### useCallback = 함수를 저장(props를 인자로 넘겨주는 함수는 useCallback을 반드시 작성해주자), useMemo = 값을 저장

----

### \_app.js , \_document,js의 차이 https://merrily-code.tistory.com/154 (\_app.js = reactDom.render(), \_docuemnt,js = common <head>)


# antd

`npm install antd`
`npm install @ant-design/icons`

# Design 구성

디자인을 할 때 먼저 화면을 가로로 자르고 각 row를 세로로 잘라서 디자인한다.

**mobile -> tablet -> desktop 순서로 디자인**

ant design에서 제공해주는 colum, row로 화면을 분할하거나, offset으로 빈 공간을 줄 수 있음

[Offset Design](https://ant.design/components/grid/https://ant.design/components/grid/)

# styled-component

# tagged templete literal

``는 ()랑 같음 내부 구현이 조금 다르다고 함 (div가 method)

```js
styled.div``;
```

# Custom hook

hooks/useInput.js를 참고

state을 저장할 때, 변수 명만 다르고 로직이 같다면 custom hook을 만들 수 있음.

# redux

아래 세 가지 라이브러리를 다운

```
npm install next-redux-wrapper@6
npm install react-redux
npm install redux
```

store/configureStore.js에 state store를 만듬 (파일 참고)

이제, next-redux-wrapper에 의해 state가 변경될 경우 이 곳에 저장됨

총 3단계를 거침,

1. reducer에 초기 state를 입력 (BE or db에서 가져오거나 dummyData를 사용)
2. component에서 state 변경 요청을 보냄 (useDispatch), 초기 state를 요청 콜백으로 받아 옴(useSelector)
3. next-reduce-wrapper가 요청을 처리 초기 state를 변경

reducer 작성 요령

```js
// reducer/index.js
import { HTDRATE } from "next-redux-wrapper"

const initialState = {
  user : {
    ...
  }
}

export const loginAction = (data) => {
  return {
    type: 'LOGIN',
    data,
  }
}

// .. 계속해서 action을 작성


const reducer = (state = initialState, action) => {
  switch (state.type){
      case HYDRATE:
      console.log(HYDRATE)
      return { ...state, ...action.payload }
    case 'LOGIN':
      return {...state, state.user.isLoggedIn :true}
  } // .. 계속해서 action에 따른 로직을 작성
  default
    return state
}
```

위의 코드 진행 순서

1. component에서 dispatch(loginAction(state)) 수정된 state를 loginAction으로 보냄
2. 해당 type 이 'LOGIN'이고, reducer의 두번쨰 인자로 loginAction의 return값이 보내짐
3. re-rendering되고 state가 적용 됨

# tracking을 위한 redux middleware-dev-tools

`npm install redux-devtools-extention`

store/configureStore.js에 enhancer를 추가 (코드는 configuerStae.js를 참고)

```js
// redux saga를 위한 middware
const middlewares = []
const enhancer = procees.env.NODE_ENV === "production:
? compose(applyMiddleware(...middlewares))
: composeWithDevTolls(applyMiddleware(...middlewares))

// 두 번째 인자로 enhancer를 할당
const store = craeteStore(reducer, enhancer)
```

redux devtools extention을 다운 받고 state변경 기록을 확인

### Immutablity (불변성)

### loginAction

action은 type을 붙이기 위해서 사용, 데이터를 인자로 받지 않을 경우 객체로 표현할 수 있다 (addpost참고)

```js
export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};
const dispatch = Dispatch();
dispatch(loginAction([id, password]));
```

state의 immutablity가 지켜지지 않으면 redex devtool은 history를 남길 수 없음

이를 지키키위해 아래와 같이 항상 같은 reference를 가르키도록 작성할 것

```js
return {
  ...state,
  user: {
    ...state.user,
    isLoggedIn: true,
  },
};
```

### antd Form

- postFrom, PostImages, CommentForm.js를 참고하여 comment form을 작성

### Image Caroucel ( 이미지 회전목마 )

react-slick을 이용해서 게시물의 이미지를 이동해서 볼 수 있도록 작성

`npm i react-slick`

### 컴포넌트 구조화

> imageZoom 폴더를 참고

styled-componenet의 createGlobalStyle를 사용해서 스타일링

### redux-thunk

1. dispatch를 async로 사용할 수 있도록 지원해주는 middleware
2. 하나의 action에 여러개의 dispatch를 사용할 수 있음
3. 비동기는 보통 세 가지 요청을 기본으로 작성(Request, Success, Failure)

Self DDOS를 막기위해 lodash or saga의 Throttle, debounce

```js
export const loginAction = (data) => {
  return (dispatch, getState) => {
    // initialState (rootReducer)부분이 나옴
    const state = getState();

    // 한 번에 여러개의 dispatch
    dispatch(loginRequestAction());
    axios
      .post("/api/login")
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(res.data));
      });
  };
};
```

- redux가 없으면

1. client가 로그인 시 -> state.user.isLogged = true로 변경
2. 비동기 요청으로 user data, cookie를 얻음
   `axios.post("api/login", options).then((res) => ( setUserState(res.data) ))`

# redux-saga

### take, takeEvery, takeLatest, takeLeading, throttle

- take는 동기
- takeEvery는 비동기

- takeLatest는 throttle(마지막 요청만 실행, 응답을 취소, 요청을 두 번 받았는지 체크 필요, ddos)
- takeLeading은 처음 요청만 실행
- throttle로 요청 제한을 둘 수 있음

```js
import { take, takeEvery } from "redux-saga";

export function* watchAddPost() {
  // 일회용 함수로 한 번 포스팅히면 함수가 사라짐
  yield take("ADD_POST_REQUEST", addPost);

  // 이를 해결하기 위해 여러 방법이 있음
  while (true) {
    yield take("ADD_POST_REQUEST", addPost);
  }

  yield takeEvery("ADD_POST_REQUEST", addPost);
}
```

### Reducer Flow

1. Componenet에서 requestAction함수가 실행됨

2. requestAction함수의 action.type, action의 argument가 saga middleware, reducer로 전달됨

3-1. saga에서 비동기로 action을 처리

3-2. saga에서 action.type이 일치할 경우 yield하고 해당 결과(action.type === "SUCCESS")를 reducer로 보냄

4-1. 3-1이 실행될 때 동기적으로 request action을 처리 로딩창을 띄워줌

4-2. 3-2의 결과를 reducer가 받고 action.type === "SUCCESS"인 action을 수행함

### Reapaire eslint

eslint terminal에서 나오는 에러에 따라서 진행할 것 (예를 들어 eslint-plugin-jsx-a11y)

`npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react-hooks eslint-plugin-jsx-a11y`

a11y = accessablity

https://velog.io/@\_jouz_ryul/ESLint-Prettier-Airbnb-Style-Guide%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

### eslint

settings -> defaultFomater, on save fomater 확인

## why airbnb styles perfer to function expression

https://stackoverflow.com/questions/37288950/why-does-the-airbnb-style-guide-say-that-relying-on-function-name-inference-is-d

### immer

immer , useimmer (instace of useState)

### react-virtualized

--> 이거 적용해서 다시 만들어 보기

Virtualized-List

# immer적용하기

Curried produce [immer docs about Curried produce](https://immerjs.github.io/immer/curried-produce/) 참고하거나

코드를 참고해서 produce로 reducer를 변경

# back-end

- nodejs : js runtime engin

- 실제 통신은 http 모듈을 사용

- babel을 사용하지 않는 컨밴션이 있음

- express, nodemon, eslint등 기본 적인 설치 진행

# back-end server router 생성

'api/user', 'api/post' 등 api라우터 생성

# CORS (Cross Origin Resource Sharing)

![cors](test/cors%20error.png)

위 사진처럼 직접 작성하거나 cors 관련 패키지를 사용 할 수 있음

`npm i cors`

```js
// app.js
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
```

# passport

```
npm i passport passport-local
```

passport는 각종 소셜 로그인 stretegy을 가지고 이를 제공함
passport-local은 id, password || email, password로 로그인 하도록 도와주는 역할을 함

# build

빌드 후 각 페이지가 1mb를 넘지 않으면 한국에서 무리없이 서비스 할 수 있음

만약 1mb가 넘는다면 code spliting을 적용해서 react.lazy react suspense기능으로 용량을 잘게 나눠야한다.

# 404 customizing

pages/404.js (next docs참고)

```js
export default function Custom404() {
  return <div>not found the page..</div>;
}
```

# error message

pages/\_error.js

```js
잠시후에 시도해주세요, 고객샌터에 문의해주세요
```

## 배포하기

- aws로그인 -> ec2 생성하기(front, back 두 개의 서버를 생성할 거임) -> 프로티어 버전 우분투 ver18 lts선택 -> 보안그룹 http :80, https:443추가, ssh는 집 ip로 변경(배포할 때)
- 키패어 생성 -> 새로 만들어서 저장(.pem) => 프로잭트에 넣어둠(.gitignore추가)

# 배포하기

- 윈도우랑 합치세영

# error

WARNING: UNPROTECTED PRIVATE KEY FILE!

ssh연결하던 중 위와 같은 애러가 뜬다면

chmod 0400 ./react-nodebird-aws.pem으로 소유자의 읽기 권한만 부여

ssh로 ubunto ec2실행

# ssh로 ubunto접속

```
pwd 로경로확인

git clone https://www.github.com/peacepiece7/node-bird-zero .git?

cd node-birod-zero
```

# node 설치하기 (14버전이 아니면 pm2실행이 안됨, script에 추가하지 않고 쓴다면 LTS를 받으면 됨)

```ssh
ubuntu/react-nodebird-zero

sudo apt-get update
sudo apt-get install -y build-essential
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
sudo apt-get install -y nodejs
```

- build-essential : bicypt(hasing)나 sharp(image resizing)설치할 떄 에러가 안나게 해줌

# front, back (node는 14을 깔았습니다)

- front ec2의 ssh/node-bird-zero/front에서 `npm i`

- back ec2의 ssh/node-bird-zero/back에서 `npm i`

## 원래는 front, back, db서버를 따로 둬야하지만 비용이 발생하고 복잡해지니까 back에 db를 설치함

# ec2 ipv4

# ci-cd

node-bird-zero를 배포했는데 소스를 수정해서 다시 올리고 싶다면?

ec2 front, back server에 다시 들어가서 git clone, npm i, npm build를 해줘야함, 만약 db도 있고 서버거 여러개거나, 서버 스케일링으로 재설치 해야한다면

반복작업이 너무 많기 떄문에 귀찮음 이럴 때 ci-cd(continuous integration, continuous development)툴을 사용함

jenkins, cercleci, travis, docker 중 docker가 유명함 docker에 반복 작성 해야 할 명령어 적어두고 실행 -> 기존 서버랑 같은 서버를 생성해줌

# front build error

getStaticProps를 썻는데 db가 연결되어 있지 않다면 에러가 남

db연결 후 build or 임시로 getServerSideProps 변경 후 진행

# 질문 : front back 서버를 따로 배포하는 이유?

front, back instance를 따로 만드는 이유는 설정하기 간단하고 보통 하나의 서버에 하나의 인스턴스를 둔다고함

만약 하나의 서버에 두 개의 instance를 만들려면 추가로 nginx같은 서버가 필요하다고 한다.

# 질문 : ec2 front instance에서만 build가 안되요

로컬에서 빌드한 뒤 ec2 front에서 가져와도 됨 아래와 같이 할 수 있음

local에서 build후 .next를 git push origin master (.gitignore에서 뻄)

ec2 front에서 git pull origin master

# ec2 back-end server에 mysql 설치하기

`sudo apt-get install -y mysql-server`

`wget -c https://repo.mysql.com/mysql-apt-config_0.8.13-1_all.deb`

`sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb`

`sudo apt-get update`

strong password입력

`sudo apt-get install mysql-server`

`sudo su`

`mysql_secure_installation`

전부 y해주고 비밀번호는 그냥 low로하자..

# ec2 back-end start

mysql설치가 끝났다면 back-end에 scripts를 아래와 같이 추가

`"start" : "node app"`

ec2 back에서 다시 git pull origin master 한 뒤

npm run start

# ec2 back-end .env 추가하기

.env는 git에 올라가 있지 않기 떄문에 따로 작성해야함

안 적으면 sequlize가 작동못함..

`vim .env`

a 누르고 작성

`:wq`로 저장

`ls -a`

`cat .env`로 저장된 거 확인

# access denited error

비밀번호 다시 변경

`sudo su`

`mysql -uroot -p`

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';`

`npx sequelize db:craete`

# change password policy (정책 변경할 떄)

`mysql -uroot -p`

`SHOW VARIABLES LIKE 'validate_password%';`

`SET GLOBAL validate_password_policy=LOW;`

`select password('xodnr7282!');`

# 왜 access denined?

mysql 설치할 떄 ubuntu로 하고 mysql_secure_installation은 root에서 해서 비밀번호가 서로 같다고 인식을 못함

mysql에서 user검색 시 plugin이 unix_soket이면 비밀번호가 무용지물,

mysql_native_password로 plugin을 변경해주는 작업이 필요

# Error : listen EACCES : permission denied 0.0.0:80

[stack-over-flow](https://stackoverflow.com/questions/60372618/nodejs-listen-eacces-permission-denied-0-0-0-080)답변

`we do NOT want to run your applications as the root user`

웹 사이트를 rootuser로 실행하는 것을 우리는 대부분 원하지 않음,

1024번 이전 포트는 모두 안전한 사용자아게만 제공되는 것을 기본으로 함

아래 코드로 1024이전 포트를 허용할 수 있음

```
> sudo apt-get install libcap2-bin
> sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

or

아래처럼 8080port로 접속 시 80번 포트로 redirection되도록 변경할 수 있음

[꾸앵 블로그](https://juni-official.tistory.com/144)

```
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
```

or

root 권한으로 80번 포트를 실행할 수 있음

```
> sudo su
> sudo npm run start
```

# pm2사용하기

### foreground process

- 터미널을 끄면 서버가 같이 꺼짐(nodejs)

### background process

- 터미널을 꺼도 서버가 안 꺼짐(pm2)

### shell 권한에 대해서

- buntu@ip-17... : 1023이전 포트에대한 권한이 없음(관리자 권환x)

- root@ip-17.. : sudo su로 접속, root는 1023이전 포트에대한 권한이 있음(sudo ...도 가능)

## background로 node app 실행하기

- $ ... 로 node app을 실행할 수 있음(권장하지 않음)

`npm i pm2`

```
vim package.json

"start" : "pm2 start app.js"로 변경
```

`sudo npm start`

- error발생시 pm2 start app.js로 직접 실행

[pm2](https://www.npmjs.com/package/pm2)

```
pm2 monit
pm2 list
pm2 restart
pm2 stop app.js
pm2 delete app.js
pm2 kill
```

# 아이피 고정

- '탄력적 아이피 고정'전까지 public IPv4주소는 계속 변경됨(고정시 돈이 나감)

# 보안 설정

```js
// back/app.js

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
```

스크릅트 변경

```json
{
  "start": "cross-env NODE_ENV-production pm2 start app.js"
}
```

<br>

# 이제 front를 배포합시다 

`npm i pm2`

# backend랑 연동 에러 미리잡기

- config/confg 만들어서 localhost:3065 -> <IPv4>주소로 전부 변경

# front server ec2 ubuntu에서 실행

```s
sudo  npm run build
sudo npx pm2 start npm -- start
```

# mysql table drop

```
mysql -uroot -p
use node-bird-zero
show tables
테이블이 대문자로 생성되었으면 드랍해서 지워줌, 그러면 sequelize에서 알아서 소문자 테이블 생성
DROP DATABASE `node-bird-zero` (백틱으로 감싸야함)
exit
sudo npx pm2 reload all
```

# pm2 , mysql commands

`mysql -uroot -p`

`show databases;`

`use react-node-bird;`

`show tables;`

`pm2 logs --err --lines 200`

# 쿠키 유지하기, 새로고침 시 로그인이 유지되지 않음

- 로그인시 요청한 서버의 아피가 달라서 도매인의 요청이 유효하지 않다고 에러가 뜸 same-site=NONE으로 해야한다는데, 이걸로 해결이 안되는 거같음(나중에 바꿔보자..)

- 다른 방법으로 front. back 서버에 도메인을 연결해서 같은사이트에 요청을 보내도록 할 수 있음

- gavia에서 일단 도매인을 구입함(greenbean.info)

# 네임 서버 설정 (route 53)

- greenbrean.info레코드를 생성하고 유형 NS의 서브도메인 네개를 가비아 서브 도메인에 입력

# 탄력적 ip

- ec2 왼쪽 메뉴에서 탄력적 ip 선택 -> 탄력적 ip 주소 할당 -> 각각의 주소를 front, back server에 연동

> ec2 front, back instance를 삭제 할 떄, 탄력적 ip도 릴리즈해야 추가 요금이 발생하지 않음(탄력적 ip생성 후 instance에 연결하지 않아도 요금이 나온다)

- 그 다음 routes 53에 해당 ip를 추가해준다

```
greenbean.info, 유형=A, ip=탄력적ip(front server)
api.greenbean.info, 유형=A, ip=탄력적ip(back server)
www.grenbean.info, 유형=CNAME, ip=greenbean.info
```

# hsts 정책

- 한 번 https로 접속하면 일정 시간동안 반드리 https로 접속하는 정책 (http로 접속이 차단됨)
- 도메인에 https를 적용시키지 않았다면 해당 에러가 발생할 수 있음, 끄는 방법은 구글에 검색 ㄲ

# front, back url 확인!!!

```js
// back/app.js

app.use(sesstion({
  cookie: {
    // http : false, https : true
    secure : false
    doamin : precess.env === "production" && ".greenbean.info"
    // block js code access
    httpOnly : true
  }
}))

// front/config/config.js

export const backURL = "api.greenbean.info"

```

> 나머지 주소도 에러나면 확인하기

# S3생성, 이미지 저장

- s3 buket생성 (block public access authentication 해제)

- 버킷 정책을 아래와 같이 수정

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AddPerm",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      // 내 버킷 이름
      "Resource": "arn:aws:s3:::greenbean.info/*"
    }
  ]
}
```

# IAM (Identity and Acess Management)

- 이게 있어야 node -> s3로 접근 권한이 생김

- 내정보 -> 보안 자격 증명(IAM) -> 액세스 키 -> 새 액세스 키 생성(.csv파일 다운로드)

# muter-s3, aws-sdk

.env에 s3 access key id, se secret access key를 입력

back/routes/post.js 의 /image router와 update변수 변경해주기

# 이미지 리사이즈

### lambda

- aws에서 제공, 작은 함수를 만들어서 호출할 수 있다
- post에서 이미지를 받아옴 -> lambda로 이미지 리사이징 -> s3에 저장

# lambda 함수 작성, aws에 압축 후 업로드

`npm i aws-sdk sharp`

lambda/index.js에 함수 작성 (lamdba/index.js파일 확인)

ec2 back-end ssh접속

```
cd node-bird-zero/lambda
sudo su
sudo npm i
exit;
```

### zip으로 파일 묶어주기

윈도우 에서 압축하면 압축 -> 묶기까지 자동이지만

리눅스에서는 압축하기, 묶기가 따로있음

```
sudo apt install zip
zip -r aws-upload.zip ./*

sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

sudo unzip awscliv2.zip

sudo ./aws/install
// You can now run: /usr/local/bin/aws --version 이런 문구가 뜸
aws configure
-> access Key, access ID, region(ap-northeast-2), format(josn) 입력

aws s3 cp "aws-upload.zip" s3://greenbean.info

```

### lamdba 함수 생성하기

- 먼저 s3에 aws-upload.zip이 잘 들어갔는지 확인하기
- lambda들어가서 함수생성 -> 새로 만들기
- 함수 코드 -> ~에서 업로드 -> amazion S3 클릭 업로드 링크 = https://greenbean.info.s3.ap-northeast-2.amazonaws.com/aws-upload.zip

- 함수 코드에 "너무커서 편집은 안되고, 함수를 호출할 수 있다"고 나옴

### 기본 설정

- 구성 - 일반구성 - 편집 에서 제한시간 30s, 메모리 250mb쯤 저장
- s3새 권한 s3 읽기 권한 추가하기

### 트리거 추가

- s3선택
- 접두사 -> original/ (이 부분을 안적으면 s3에 있는 aws-upload.zip이 계속해서 실행됨)
- 버킷 선택하고 제출

```js
// back/routes/post.js
v.location.replace(/\/original\//, "/thumb/");
```

```js
// front/imageZoom/indexjs
<img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} />
// front/postForm
<img src={v.replace(/\/thumb\//, "/original/")} style={{ width: "200px" }} alt={v} />
```

### ec2 front, back에서 아래 코드 실행

```
// back
sudo git pull origin master
sudo npx pm2 reload all

// front
sudo git pull origin master
sudo npm run build

서버 재시작 해주기
```

lamdba -> monitoring에서 로그 확인

- lamdba에서 aws-upload.zip 말고 다른 .zip , aws는 sudo rm 해주기
- 이렇게 안 하고 zip하면 필요없는 코드가 중복으로 묶여서 용량이 엄청 커짐
