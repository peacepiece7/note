# https 적용하기 (nginx)

# 구성

- 기존 front에 https를 도입할 경우

  - next(80)으로 접속시 https(443)로 리다이렉팅하도록 만들 수 있음

- nginx를 도입하면(정적파일, 캐싱, 리다이렉션, https를 담당)
- nginx http(80),https(443)을 프록시 서버로 둔 뒤(리버스 프록시)
- next(3060)로 연결시킴(프론트 관련 로직)

```
sudo apt-get install nignx
```

```
(nignx 설정 파일)
vim /etc/nginx/nginx.conf
```

nignx.conf를 아래와 같이 수정

```
/etc/nginx/nignx.conf

...
...

### virtual server
...
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sties-enabled/*;
server {
  server_name greenbean.info;
  listen 80;
  location / {
    proxy_set_header HOST $host;
    proxy_pass http://127.0.0.1:3060;
    proxy_redirect off;
  }
}
}

```

### letsencrypt

- 무료 3개월 https 인증서를 제공함 (무제한)
- 구글 모질라 등 협업해서 let`s encrypt제단을 만들어 무료로 보금

```
sudo snap install certbot --classic
```

### serbot-auto 실행

먼저 nginx를 실행해주고 아래 certbot을 실행

`sudo systemctl start nginx`

이메일 등 이것저것 동의하고 입력하면됨

```
sudo certbot --nginx
```

잘 변경됬나 한 번 보기

```
vim /etc/nginx/nginx.conf
```

```
sudo cat /etc/letsencrypt/live
```

설정을 변경했다면 아래코드로 nginx 재실행

```
sudo ls /etc/letsencrypt/live/greenbean.info
```

pullchain.pem, privkey.pem이 생성되면 ok!

### next port 3060

포트 번호 80 -> 3060으로 변경해주기
`vim pakcage.json`

```
fornt/package.json

"start" : "cross-env NODE_ENV=production next start -p 3060"
```

# 3개월마다 https인증서 renew

[zeroCho cone renew](https://www.zerocho.com/category/NodeJS/post/5ef450a5701d8a001f84baeb)

crontab serbot auto(자동화)로 검색해보거나 위 링크 참조

# 여기서 멈추고 front 잘 실행되나 확인!!

# back-end https적용하기

node-bird-zero/back 에서 진행

nginx 설치
`sudo apt-get nginx`

cerbot 설치
`sudo snap install certbot --classic`

[zeroCho cone renew](https://www.zerocho.com/category/NodeJS/post/5ef450a5701d8a001f84baeb)

`sudo su`

`sudo vim /etc/nginx/nginx`에서 아래와 같이 편접

```
/etc/nginx/nignx.conf

...
...

### virtual server
...
include /etc/nginx/conf.d/*.conf;
include /etc/nginx/sties-enable/*;
server {
  server_name api.greenbean.info;
  listen 80;
  location / {
    proxy_set_header HOST $host;
    proxy_pass http://127.0.0.1:3065;
    proxy_redirect off;
  }
}
}

```

`sudo lsof -i tcp:80`여기 nginx가 실행 되고 있지 않다면 아래 코드로 nginx실행

```
// 시작
ubuntu@ip-172-31-43-121:~/node-bird-zero/back$ sudo systemctl start nginx
//재시작
ubuntu@ip-172-31-43-121:~/node-bird-zero/back$ sudo systemctl restart nginx
// 에러 로그 확인
ubuntu@ip-172-31-43-121:~/node-bird-zero/back$ sudo systemctl status nginx
```

# cerbot auto 실행

`sudo certbot --nginx`

### 와일드 카드 인증서

```
*.nodebird.com <- 이거 하나로 아래 도매인 전부 가능해짐

www.nodebird.com
api.nodebird.com
...
..


```

와일드 카드로 인증서받을 떈
http로 못 받고 dns로 받아야 함

_route53에서 txt레코드 설정이 필요_
