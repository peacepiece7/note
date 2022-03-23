# About Apache Cordova
- tool to create cross-platform apps
- Its primary purpose is to provide a bridge for native device API access and to bundle for distribution

# Getting Start

> 실행 환경 및 버전 : aws ubuntu 20.04, apache2.0

```s
sudo apt-get update
sudo apt-get install apache2
```

다운로드시 아래 경로에서 apache확인

## init.d (deamon)
init.d는 daemon 프로그램들이 있는 디렉터리임
daemon파일들은 sudo service <program name>으로 start stop
/etc/init.d/apche2

서비스 시작 및 실행중인 프로세스 확인

```
sudo ps aux | grep apache2
lsof -i tcp:3000 (listen open file)

sudo systemctl stop apache2.service
sudo systemctl start apache2.service
sudo systemctl enable apache2.service
sudo systemctl restart apache2.service
```


- 리버스 프록시 전 사전 필요한 모듈 활성화
- ? 이 모듈들이 어느 conf에 있는지 확인하지 못함 (가능하면 리스트 보고 직접 주석 푸는 방법으로 하고싶음)
```
$ sudo a2enmod ssl
$ sudo a2enmod proxy
$ sudo a2enmod proxy_connect
$ sudo a2enmod proxy_ajp
$ sudo a2enmod proxy_balancer
$ sudo a2enmod proxy_html
$ sudo a2enmod proxy_http
$ sudo a2enmod headers
$ sudo a2enmod proxy_fcgi
$ sudo a2enmod rewrite
```



# forward proxy setting

## 포워드 프록시 설정
### /etc/apache2/sites-enabled
``` 
<VirtualHost *:8080>
    ProxyRequests On
    ProxyVia On

    AllowCONNECT 80 443 563

    <Proxy "*">
        AllowOverride All
        Options All -Indexes
        Require all granted
    </Proxy>

    ErrorLog ${APACHE_LOG_DIR}/error_forward_proxy.log
    CustomLog ${APACHE_LOG_DIR}/access_forward_proxy.log combined
</VirtualHost>
```



## 도메인에 연결 할 경우 아래 설정으로 도메인 이름을 구성
```
 cd /etc/apache2/site-available
 vi [도메인주소].conf
ex) vi pental.system32.kr.conf

(sudo a2enmod /etc/apache2/site-avaliable? 이거 해줘야 할 같음)
```

# localhost 설정

/etc/hosts에서 네임서버 로컬 네임서버?역할을 함

127.0.0.1 localhost

그외 ipv6나 네임서버설정도 가능

# 방화벽 추가

> ubuntu는 기본적으로 ufw diable임

sudo ufw enable 활성화 ( on )
sudo ufw disable 비활성화 ( off )

sudo ufw allow 22  (22포트 허가)
sudo ufw allow 22/tcp (ssh는 tcp22번 포트 허용)
https://webdir.tistory.com/206

# dependency module 설치
```
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests
sudo a2ensite Apache2Proxy.conf 
sudo systemctl restart apache2.service
```


# reverse proxy 설정
etc/apache2/sites-avaliable에서 conf만들고 활성화 하기


etc/apache2/sites-avaliable/Apache2Proxy.conf 파일 생성, 아래와 같이 작성

```
<VirtualHost *:80>
        ServerName http://<your ip address or domain not "localhost">
        ServerAlias www.example.com
        ServerAdmin webmaster@example.com
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        ProxyRequests Off
        <Proxy *>
          Order deny,allow
          Allow from all
        </Proxy>
        
        ProxyPass / http://localhost:3000/
        ProxyPassReverse / http://localhost:3000/

        <Location />
          Order allow,deny
          Allow from all
        </Location>

   </VirtualHost>
```

# enable ssl
sudo a2enmod ssl


# 추가 정보

Document roots
/var/www/index.html

https://webdir.tistory.com/196

- 설정파일 루트위치
/etc/apache2 

- 기본 설정 파일
/etc/apache2/apche2.conf -> ubuntu

/etc/apche2/httpd.conf -> others

- 고급 설정 파일 ( httpd.comf에 있던 에러메시지, 보안, 문자셋이 이곳으로 이동)
  
/etc/apache2/conf.d 

- apache2ctl 환경파일
/etc/apache2/envvars

- apache 서버 서비스 포트 설정
/etc/apache2/ports.conf

- a2enmod
  
아파치2 모듈 활성화 명령어
- a2dismod
  
아파치2 모듈 비활성화 명령어

 /etc/apache2/
```sh
#       |-- apache2.conf
#       |       `--  ports.conf
#       |-- mods-enabled
#       |       |-- *.load
#       |       `-- *.conf
#       |-- conf-enabled
#       |       `-- *.conf
#       `-- sites-enabled
#               `-- *.conf
#
```

Configuration files in the mods-enabled/, conf-enabled/ and sites-enabled/

https://blog.containerize.com/2021/05/21/how-to-configure-apache-as-a-reverse-proxy-for-ubuntudebian/



```
<VirtualHost *:80>
        ServerName example.com
        ServerAlias www.example.com
        ServerAdmin webmaster@example.com
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        ProxyRequests Off
        <Proxy *>
          Order deny,allow
          Allow from all
        </Proxy>
        
        ProxyPass / http://127.0.0.1:8080/
        ProxyPassReverse / http://127.0.0.1:8080/

        <Location />
          Order allow,deny
          Allow from all
        </Location>

   </VirtualHost>
```