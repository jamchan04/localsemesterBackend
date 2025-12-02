# 로컬세메스터 과제

## 목표
로컬세메스터 리액트 + json-server를 사용해 애플리케이션을 구현합니다.

## 디렉터리 구조
- assets: 이미지
- auth: 인증 관련
- components: 공통 컴포넌트
- hooks: 커스텀 훅
- page: 페이지
- router: 라우터
- store: 개인 정보/다크 모드 관리
- util: 유틸 함수

# 깃허브 운영 & 규칙

### 1. 초기 세팅 (최초 1회)
```
git clone https://github.com/kimchiMan0316/localsemester
```

### 2. 현재 브랜치 확인
```
git branch
```

### 3. 개인 작업 브랜치로 이동 (처음 작업 받아올 때)
```
git checkout -b [본인브랜치] origin/[본인브랜치]
```
- `[본인브랜치]`는 본인 영문 이름(예: ahn, oh, kim, park)
- 원격에 있는 개인 브랜치를 로컬에 생성 후 이동

### 4. 개인 작업 완료 후 커밋/푸시
```
git add .
git commit -m "작업 내용"
git push origin [본인브랜치]
```

### 5. 최신 작업 가져와 병합하기 (작업 필수)
```
git checkout [본인브랜치]   # 개인 작업 브랜치로 이동
git pull origin dev         # dev 브랜치의 최신 내용을 개인 브랜치에 병합
```
- 항상 작업 전 `dev` 최신 상태를 개인 브랜치에 병합해 충돌을 최소화합니다.

### 6. 커밋 규칙 (중요)
- 작업 전: `git pull origin dev` 로 최신 공통 작업을 받아옵니다.
- 작업 후: `git push origin [본인브랜치]` 로 개인 브랜치에 올립니다.

### 명령 요약
- `git pull origin dev` : 공통 작업 브랜치인 `dev`에서 최신 작업물을 받아 개인 브랜치와 병합
- `git push origin [본인브랜치]` : 병합/작업물을 원격 개인 브랜치(`[본인브랜치]`)에 푸시

## WSL + Docker 개발환경
- 준비물: WSL2 + Docker Desktop(또는 Docker Engine) 실행 상태.
- 프로젝트 루트(`docker-compose.yml`이 있는 위치)에서 아래 명령 실행 후 컨테이너가 모두 뜨면 됩니다.
  - `docker compose up --build`
  - db: MySQL 8 `localhost:3307` (root/1234, DB `localsemester`), `seed.sql` 자동 실행
  - backend: Nest API `http://localhost:4000` (컨테이너 내부 포트 3000)
  - frontend: React dev 서버 `http://localhost:3000`, json-server `http://localhost:5000`
- 코드 변경 시 호스트에서 수정하면 컨테이너에 바로 반영되도록 볼륨 마운트됨.
- 종료: `docker compose down` (DB까지 초기화하려면 `docker compose down --volumes`).
- 필요 시 DB 초기화: `docker compose exec -T db mysql -uroot -p1234 localsemester < /docker-entrypoint-initdb.d/seed.sql`
