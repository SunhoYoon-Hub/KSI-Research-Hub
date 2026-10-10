# KSI 방문 집계 설치

기존 Jekyll/GitHub Pages 화면에 Cloudflare Workers + D1 집계를 연결한다.
`docs/_config.yml`의 `visitor_counter_enabled`는 외부 설치가 끝날 때까지 `false`다.

## 현재 자원

- Worker: `ksi-visitor-counter`
- 주소: `https://ksi-visitor-counter.ksiresearchhub.workers.dev`
- D1: `ksi-visits`
- 바인딩 이름: `DB`
- `wrangler.jsonc`의 데이터베이스 ID는 공개 자원 식별자이며 비밀 키가 아니다.

## 대시보드 설치 순서

1. D1 → `ksi-visits` → **Console**에서 `schema.sql` 전체를 붙여넣고 실행한다. 재실행해도 숫자를 초기화하지 않는다.
2. Workers & Pages → `ksi-visitor-counter` → **Settings → Bindings**에서 `DB`를 `ksi-visits`에 연결한다.
3. **Edit code**에서 Hello World를 `worker.mjs` 전체 내용으로 교체하고 Deploy한다.
4. Worker 주소 또는 `/v1/visits`를 열면 `day`, `today`, `total`, `startedOn`이 나온다. GET은 집계하지 않는다. 초기 값은 0, 0, null이다.
5. 사이트 설정의 `visitor_counter_enabled`를 `true`로 변경해 GitHub Pages를 배포한다.
6. 실제 사이트에서 표시·새로고침 중복 방지를 확인한 뒤 **그날의 한국 날짜**로 소식 기록을 추가한다. 공개가 다음 날로 밀리면 준비한 날짜를 쓰지 않는다.

Wrangler로 배포하는 경우 이 디렉터리에서 설정을 그대로 사용한다. 계정 인증은 Cloudflare의 공식 로그인으로 수행하며, 토큰을 저장소나 채팅에 보내지 않는다. 대시보드에서 바인딩을 바꾸면 설정 파일도 갱신한다.

## 집계 방식과 검사

- 같은 브라우저가 한국 날짜당 한 번 집계되며, 다른 날은 다시 한 번 늘어난다. 누적은 실제 고유 인원 수가 아니라 브라우저별 일일 방문의 합이다.
- 임의 브라우저 표식은 브라우저 저장소에 있다. 서버는 날짜를 직접 정하고 날짜가 포함된 SHA-256만 저장한다. 원본 표식·IP·실명·이메일은 저장하지 않는다.
- `(day, token_hash)` 기본 키와 SQLite 트리거가 한 트랜잭션에서 중복 확인·오늘·누적을 처리한다. 재요청과 동시에 보낸 요청도 한 번만 늘어난다.
- 최근 한국 날짜 3일의 해시만 유지하고 날짜별 집계와 전체 누적을 보존한다.
- 서버 오류·시간 초과·잘못된 응답은 숫자 영역을 숨긴다. 브라우저 저장소가 모두 차단되면 GET 조회만 한다. 세션 저장소로 대체한 경우 새 세션은 별도 집계될 수 있다.
- 조회는 GET, 방문 등록은 사이트 Origin의 POST다. 편집기 미리보기·주소 직접 열기는 등록하지 않는다. Origin 제한은 일반 브라우저에서 외부 호출을 막지만, 사람이 몇 명인지 증명하거나 자동화된 요청을 완전히 막는 인증은 아니다.
- 2-2 페이지도 같은 KSI 저장소 방문 수를 표시한다. 둘 사이 이동은 중복 집계하지 않는다.

Node 24 이상에서 `node --test cloudflare/visitor-counter/counter.test.mjs` 실행.
검사는 실제 스키마와 쿼리를 임시 SQLite DB에서 실행하고, Worker 응답·한국 자정·동시 중복·재시도·영속성·정리·클라이언트 오류를 확인한다. 운영 D1에는 검사 요청을 보내지 않는다. Cloudflare 원격 배포는 별도 확인이 필요하다.

참고: [D1 시작](https://developers.cloudflare.com/d1/get-started/), [D1 batch 트랜잭션](https://developers.cloudflare.com/d1/worker-api/d1-database/).
