# SPA (Single Page Applecation)

## 개요
- js를 이용하여 단일 웹페이지 상의 html요소를 동적으로 생성, 조작
- 서버측에서 텅 빈 html문서만 날려주고, 클라이언트 측 브라우저에서 비동기로 처리
- react, vue, svelte가 이에 해당

## 장점
- native app같은 ux를 재공
- google map, map app이 js

## 단점
- js에 의존적, js가 돌아지 않으면 사이트가 먹통이 됨
- js코드 양이 많기 때문에 초기 로딩 속도가 느림
- SEO에 불리 (일반 웹페이지 처럼 인색해주는 크롤러 기술을 모두 가지고 있지 않음)
- 단단한 사이트 (블로그)같은 경우 spa를 적용하면 오버 엔지니어링이 될 수 있음

# SSG(Static Stie Generator)

## 개요
- 정적 사이트 생성기
- 누가 접속하든 항상 동일한 내용을 보여줌 (블로그, 카탈로그)
- Gatsby, Hugo, Jekyll, Hexo 등

## 장점
- 속도가 매우 빠름
- CDN을 활용하면 미리 만들어 놓은 웹페이지를 유저와 지리적으로 최대한 가까운 곳에 캐싱해둘 수 있음
- Headless CMS*(Content Management System)과 궁합이 좋음, API를 몽땅 읽어와서 미리 웹페이지로 만들어 냄

## 단점
  - 컨텐츠 업데이트시 빌드해줘야해서 자주 업데이트되는 웹사이트는 비효율 적임
  - 자주 변경되지 않은 페이지만 SSG를 적용해줘야함

# SSR (server-side Rendering)

## 개요
- SSG와 달리 요청이 들어오면, 실시간으로 웹 페이지를 만들어 냄
- Next.js Remix SvelteKit, Nuxt.js

## 장점
- 변경된 데이터가 즉시 웹페이지에 반영
- 개인화 경험이 중요한 사이트에 좋음 (E-commerce, SNS)

## 단점
- 추가 aplication server가 필요함.
- 원격 API, Headless CMD 대신 자체 DB서버, Cloud plateform(AWS..)에 데이터를 저장해놓은 경우가 많음.
- 페이지를 만들고 응답하까지 시간이 더 소모됨


# 참조

## Headless CMS (Headless Content management System)

- Headless CMS
  - Semi decoupled
  - SaaS or Hosted
  - Web Oriented
- Trandition CMS
  - Monolithic
  - Self host
  - Websites
- Tranditional CMS, Headless CMS 차이점
  - Tranditional CMS : 서비스와 컨텐츠가 강하게 묶여 있음
  - Headless CMS : 서비스와 컨텐츠가 분리된 환경을 제공해줌
- Headless CMS작동법
  - front, back으로 나누는 방식이 이와 비슷함
  - 개발자는 Reastful API로 컨텐츠를 제공, 컨텐츠 편집자는 익숙한 GUI로 컨텐츠 개발 