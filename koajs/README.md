# koajs application with jwt

## koa

- 미들웨어 기능만 갖추고 있어서 가벼움.
- 다른 기능들은 라이브러리 적용하여 사용.
- async/await 문법 정식 지원하여 비동기 작업 더 편함.

### REST API

웹 브라우저에서 데이터 베이스에 직접 접속하면 보안상에 문제가 생기므로, REST API 서버를 만들어서 통신

#### HTTP method

| 메서드 | 설명                              |
| ------ | --------------------------------- |
| GET    | 데이터 조회                       |
| POST   | 데이터 등록. 인증 작업시에도 사용 |
| DELETE | 데이터 삭제                       |
| PUT    | 데이터를 새 정보로 통쨰로 교체    |
| PATCH  | 데이터의 특정 필드 수정           |

##### 예시

| 종류                                  | 기능                                                        |
| ------------------------------------- | ----------------------------------------------------------- |
| POST /posts                           | 포스트 작성                                                 |
| GET /posts                            | 포스트 목록 조회                                            |
| GET /posts/:id                        | 특정 포스트 조회                                            |
| DELETE /posts/:id                     | 특정 포스트 삭제                                            |
| PATCH /posts/:id                      | 특정 포스트 업데이트 (구현 방식에 따라 PUT으로도 사용 가능) |
| POST /posts/:id/comments              | 특정 포스트에 덧글 등록                                     |
| GET /posts/:id/comments               | 특정 포스트의 덧글 목록 조회                                |
| DELETE /posts/:id/comments/:commentId | 특정 포스트의 특정 덧글 삭제                                |
