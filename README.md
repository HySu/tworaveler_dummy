# Thing+ REST API

## 개요
Thing+ REST API 는 누구나 OAuth client 를 등록하고 AccessToken을 획득하여 Gateway / Device / Sensor 를 등록하고 Thing+ 서비스를 사용할 수 있게 합니다.

Thing+ Cloud 는 사용자 정보와 서비스를 관리하고 센서 데이터를 제공합니다.

또한 사용자는 Thing+ Portal 에서 API 키를 발급하고 하드웨어에 세팅하여 Thing+ Cloud 에 센서 데이터를 송수신하도록 합니다.

Thing+ REST API 를 사용하려면 다음 조건을 충족해야합니다.
* OAuth client 등록
* AccessToken 획득
* API 키 발급
* 하드웨어에 API 키 세팅
* Gateway / Device / Sensor 등록

### 중요 공지
이 문서에는 Thing+ REST API 연동을 위한 가이드가 들어 있습니다.

Thing+ REST API 기술 문서를 찾으려면 [https://thingplus.api-docs.io/](https://thingplus.api-docs.io/) 를 참조하십시오.

Thing+ 기본 가이드 문서를 찾으려면 [http://support.thingplus.net/](http://support.thingplus.net/)를 참조하십시오.

## 등록
Thing+ Supporter 는 Thing+ Portal 과 Thing+ REST API 를 이용한 등록과정을 지원합니다. 시작하려면 아래 지침을 따르십시오.

### 선결 요건
시작하기 전에 다음이 필요합니다.
* [Thing+ Portal](https://thingplus.net) 회원가입. Thing+ 는 개인 사용자를 위한 무료 계정 생성과 비즈니스 고객을 위한 계정 생성을 지원합니다.

### OAuth client 등록
첫 번째 단계는 Thing+ Cloud 에 OAuth client 를 등록하는 것입니다. 다음이 필요합니다:
* [Thing+ Portal](https://thingplus.net) 로그인
* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
* [Postman Interceptor](https://chrome.google.com/webstore/detail/postman-interceptor/aicmkgpgakddgnaphhhpliifpcfhicfo?hl=en)

Postman 을 실행하고, Postman Interceptor 를 on 한 상태에서 설정할 값을 입력한 다음 API를 호출합니다.

[Getting Started with the Thing+ REST APIs](https://github.com/daliworks/thingplus-guide/blob/master/doc/GettingStarted_authToken.md) 문서를 참고하면 편리합니다.

```
URL : https://api.thingplus.net/v2/authClients
Method : POST
Content-Type : application/json
Body
 - name : 이름
 - reqId : ID(AccessToken 획득시 필요)
 - clientSecret : secret 키(AccessToken 획득시 필요)
 - scopes : 부여할 권한
```

Body 예시
```
{
  "name": "daligali",
  "reqId": "daliworks",
  "clientSecret": "gali1234",
  "scopes": ["user-profile-read", "gateway-update", "timeline-read", "tag", "rule-read", "service-read", "site-read"]
}
```
[scopes 범위는 이 문서를 참조하십시오.](https://github.com/daliworks/thingplus-guide/blob/master/doc/OAuth2.md#scopes)

### AccessToken 획득
OAuth2 AccessToken 획득을 위해 Authorization Code Grant(or Web Server) 로 `AccessToken` 을 획득합니다.

[좀 더 자세히 알아보려면 이 문서를 참조하십시오.](https://github.com/daliworks/thingplus-guide/blob/master/doc/OAuth2.md)

#### Authorization Code 부여
`AccessToken` 을 획득하기 위해 `Authorization Code` 가 필요합니다. 아래 지침을 따르십시오.

웹 브라우저로 아래 URL 을 get 하여 수락 후 redirect_uri 에 Query에 부여된 `Authorization Code` 를 획득 합니다.

```
GET URL : https://api.thingplus.net/v2/oauth2/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={REDIRECT_URI}
Example : https://api.thingplus.net/v2/oauth2/authorize?client_id=daliworks512&response_type=code&redirect_uri=https://thingplus.net
```

URL Query 파라미터
```
client_id : (필수) 등록한 OAuth client reqId
response_type : (필수) "code" 를 사용
redirect_uri : (필수) Authorization Code 와 함께 redirect 될 URI
```

사용자가 요청을 수락하면 URL 에 "code" 가 포함된 redirect_uri 사이트로 리디렉션됩니다.
```
REDIRECT URL : {REDIRECT_URI}/?code={AUTHORIZATION_CODE}
Example : https://thingplus.net/?code=FKr1INPriNvGcMEC
```


#### AccessToken 획득
Postman 에서 다음 API를 이용하여 `AccessToken` 을 획득합니다.
```
URL : https://api.thingplus.net/v2/oauth2/token
Method : POST
Content-Type : x-www-form-urlencoded
Body
 - code : 획득한 Authorization Code
 - client_id : 등록한 OAuth client
 - client_secret : 등록한 OAuth client secret
 - redirect_uri : https://thingplus.net
 - grant_type : authorization_code
```

x-www-form-urlencoded POST body 예시
```
code : FKr1INPriNvGcMEC
client_id : daliworks512
client_secret : gali1234
redirect_uri : https://thingplus.net
grant_type : authorization_code
```

획득한 `AccessToken` 예시
```
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3MzY3IiwiY2xpZW50SWQiOiJkYWxpd29ya3M1MTIiLCJpYXQiOjE1MDc3MTA4NDYsImV4cCI6MTUwOTAwNjg0Nn0.wmr6MdEDJo5qk4i5EYn34epxRmn9BQq_Nt74AfNCSMc",
    "token_type": "Bearer"
}
```


`AccessToken` 은 Thing+ REST API 를 호출할 때 권한 인증을 위해 Header에 반드시 있어야합니다.

Header 에 Authorization 필드를 추가하고, token_type과 access_token 값을 아래와 같이 입력해주십시오.
```
Authorization : Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3MzY3IiwiY2xpZW50SWQiOiJkYWxpd29ya3M1MTIiLCJpYXQiOjE1MDc3MTA4NDYsImV4cCI6MTUwOTAwNjg0Nn0.wmr6MdEDJo5qk4i5EYn34epxRmn9BQq_Nt74AfNCSMc
```

[이 과정에서 문제가 발생하면 이 문서를 참조하십시오.](https://github.com/daliworks/thingplus-guide/blob/master/doc/OAuth2.md#authorization-code-grant-or-web-server)

### Gateway / Device / Sensor 등록하기
Thing+ Cloud 와 하드웨어를 연동해 센서 데이터를 송수신하기 위해 `API 키` 를 발급받고, 발급받은 `API 키` 를 하드웨어에 등록해야합니다. 이를 위해 다음 지침을 따르십시오.

[Thing+ Portal](https://iot.thingplus.net) 에서 `API 키`를 발급 받거나, Thing+ REST API 를 이용해 `API 키` 를 발급받을 수 있습니다. 이 과정을 위해 다음을 필요로합니다:
* 하드웨어 GatewayId 또는 vendorKey

#### Thing+ Portal 에서 API 키 발급받아 Gateway / Device / Sensor 등록하기
[Thing+ Portal 에서 `API 키`를 발급받아 등록하시려면 이 문서를 참조하십시오.](http://support.thingplus.net/ko/user-guide/registration.html)

#### Thing+ REST API 로 API 키 발급받기
 주의 : 이 방식을 사용하기 위해서는 vendorKey 가 필요합니다. vendorKey 는 contact@thingplus.net 에 요청하시면 발급받을 수 있습니다.

[Thing+ REST API 를 이용해 'API 키'를 발급받아 등록하시려면 이 문서를 참조하십시오.](https://thingplus.api-docs.io/2.0/non-rest-apis/registergatewaykey)

## 고맙습니다!
Thing+ REST API 연동에 적극적으로 참여하고 관심을 가져주셔서 감사합니다.
