"# tworaveler_dummy"

// PC 처음 명령어
git init
git add --all
git commit -m "first commit"
git remote add origin https://github.com/HySu/tworaveler_dummy.git
git push -u origin master

// 소스 수정 후 명령어
git add .
git commit -m "xxx commit"
git push -u origin master

// aws : 처음
git clone https://github.com/HySu/tworaveler_dummy.git

// aws : 두번째부터
git pull https://github.com/HySu/tworaveler_dummy.git
#개발자를 위한 Thing+ REST API 연동가이드

## 개요
Thing+ REST API 는 누구나 Thing+ 에 접근하여 SensorData 를 조작할 수 있게 합니다.

사용자는 Thing+ 에 client 를 등록하고 AccessToken 를 획득해 Gateway / Device / Sensor 를 관리하고 SensorData 에 접근할 자격을 얻습니다.

Thing+ 서비스를 이용하려면 다음 조건을 충족해야합니다.
* client 등록
* AccessToken 획득
* API 키 발급
* 하드웨어에 Gateway 설치
* Gateway / Device / Sensor 등록

### 중요 공지
이 문서에는 Thing+ REST API 연동을 위한 가이드가 들어 있습니다. Thing+ REST API 전체 문서를 찾으려면 [https://thingplus.api-docs.io/](https://thingplus.api-docs.io/) 를 참조하십시오.
Thing+ 기본 가이드 문서를 찾으려면 [http://support.thingplus.net/](http://support.thingplus.net/)를 참조하십시오.


## 등록
이 문서에서는 Thing+ Portal 을 이용해 Gateway / Device / Sensor 를 관리하고 Thing+ REST API 를 이용해 SensorData

### client 등록

### AccessToken 획득

### API 키 발급

### 하드웨어에 Gateway 설치

### Gateway / Device / Sensor 등록

## 고맙습니다!
Thing+ REST API 연동에 적극적으로 참여하고 관심을 가져주셔서 감사합니다.

[Thing+ 용어설명](https://github.com/daliworks/thingplus-guide/blob/master/doc/README_kr.md)

[HTTPS와 OAuth2를 이용한 Thing+ 연동 가이드](https://github.com/daliworks/thingplus-guide/blob/master/doc/GettingStartedWithHttpsAndOauth.md)
[Getting Started with the Thing+ REST APIs](https://github.com/daliworks/thingplus-guide/blob/master/doc/GettingStarted_authToken.md)
[OAuth2](https://github.com/daliworks/thingplus-guide/blob/master/doc/OAuth2.md)
[Thing+ OAuth2 가이드?](https://github.com/daliworks/thingplus-guide/blob/master/doc/OAuth2Guide_kr.md)
[Intro](https://github.com/daliworks/thingplus-guide/blob/master/doc/intro_kr.md)
[Thing+ 게이트웨이 등록 가이드](https://github.com/daliworks/thingplus-guide/blob/master/doc/registerGateway_kr.md)

[Sensor Types](https://github.com/daliworks/thingplus-guide/blob/master/doc/SensorTypes_kr.md)
