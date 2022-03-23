# front, back의 역할

- term

Front-end : SSR

Back-end : API 제공

scaling : 확장(서버 확장)

- 각 기능별로 서버를 만드는 경우 scaling에 유리.

- 예를들어

배민 점심 피크 요청이 폭주하여 주문 api의 scaling이 필요할 경우,

front, backend가 하나의 서버에 등록되어 있다면 scaling시 둘 다 복사해야함

하지만 front-end, back-end 서버가 따로 있을 경우 back-end만 복사하면 됨

# express, rest api

app.get => 가져오기

app.post => 생성하기

app.delete => 삭제하기

app.put => 전체 수정 (전체 덮어쓰기)

app.options => 찔러보기

app.patch => 부분 수정 (게시글 수정, 닉네임 수정)

app.header => 헤더만 가져오기 (헤더/바디)

- rest api method는 합의
- postman으로 get, post, delete 등 사용해서 확인
- 애매하면 post임 ( 게시글 가져오면서 조회수 1 올린다)

### swagger api doc작성할 떄 사용

# mysql with mac

### mysql installation

homebrew로 mysql installation

맥에서는 버젼이슈로 8버전을 설치해야 함

```s
$ brew install mysql@8.0.26
$ brew services start mysql
$ mysql_secure_installation
```

혹은

아래 스크립크로 사양을 확인 후

mysql archive에 들어가서 직접 dmg파일을 받자

- [MYSQL community server archives](https://downloads.mysql.com/archives/community/)

```s
uname -p
```

### use lagecy password encryption

설치할 떄 SHA256기반의 strong password encryption, 하위 버전의 legecy password envryption중 선택할 수 있는데 strong을 선택하면 하위버전도 8.x 이상으로 설치해줘야 함
(앞으로 사용할 버전이 8.x 이상이 확실할 경우 strong으로 설치, 아니면 legacy로)

### start

터미널에 아래와 같이 입려해서 mysql 바로 실행 가능

```s
$ mysql -h localhost -u root -p
```

### mysql workbench installation

cask : npm의 package와 마찬가지록 brew에서 제공하는 패키지, GUI기반의 프로그램을 설치하려면 brew이외에 이 패키지가 필요

```s
$ brew install cask
```

그리고 mysql workbench를 설치

```s
$ brew install --cask mysqlworkbench
```

but, 호환이슈로 접속시 팅김현상이 발생함 아카이브에서 8.0.20버전을 다운로드해서 사용하자

- [MYSQL workbench archives](https://downloads.mysql.com/archives/workbench/)

### MYSQL window installation

thebook.io node책을 보고 설치 진행

MYSQL Installer (MYSQL Community Server, MYSQL Workbench)를 설치

# sequlize sequlize-cli

```s
npm i sequelize sequelize-cli
```

- sequlize, sequlize-cli

js로 SQL를 조작할 수 있게 도와줌

```s
npm i mysql2
```

- mysql2

node랑 mysql을 연결해주는 드라이버

### sequelize initiation

```s
npx sequelize init
```

config/config.js

migrations

models/index.js

seeders

폴더, 파일 생성됨

### sequelize 수정

config/config.js 수정 (파일 확인)

- "development" : 개발 할 때
- "test" : 배포 후 테스트 할 때 (더미 데이터)
- "production: 배포 할 떄

### model 작성

1. sequelize로 model을 작성 (mysql의 table)

2. 아래 커맨드로 batabase를 생성

```s
npx sequelize db:create
```

3. sequlize를 root파일에 연결 후 실행

```js
// app.js
const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결 성공");
  })
  .catch(console.log);
```

# jetBrains

실무에서는 table이 수백개가 넘어가는 경우도 있어서 ERD로 도식호 함

jetBrains가 있음

# passport

1. front에서 user/login으로 POST 로그인 요청
2. back-end의 user/login router에서 요청을 받고 passport.authenticate 수행
3. 로그인 성공시 json형태로 유저 정보를 front에 보냄

back-end server => session(쿠키 상자),
browser => cookie

session 저장용 db => redis
