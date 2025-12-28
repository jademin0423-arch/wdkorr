# 웨딩박람회 SEO 최적화 사이트

Next.js App Router 기반의 정적(SSG) 웨딩박람회 정보 사이트입니다.

## 설치 및 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

빌드 결과물은 `out/` 폴더에 생성됩니다.

## 필수 설정

### 1. 파비콘 파일 생성

다음 파일들을 `public/` 폴더에 생성하세요:
- `favicon.png`
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-touch-icon.png` (180x180)

### 2. 사이트 설정

`lib/site.ts` 파일의 `SITE` 상수를 수정하세요:
- `domain`: 사이트 도메인
- `ctaPrimary`, `ctaSecondary`: CTA 버튼 설정
- `editorial`: 작성자/검토자 정보
- `contact`: 연락처 정보

### 3. 메인 히어로 이미지

`public/imge/main-hero/main-hero.png` 파일이 존재하는지 확인하세요.
파일명을 변경하려면 `lib/site.ts`의 `MAIN_HERO_IMAGE` 상수를 수정하세요.

## 프로젝트 구조

```
app/
├─ layout.tsx              # 루트 레이아웃
├─ page.tsx                # 루트 메인 허브
├─ wedding-fair-schedule/  # 보조 메인
├─ hub/                    # 허브 페이지
├─ [slug]/                 # 상세 페이지
├─ about/                  # 신뢰 페이지들
├─ contact/
├─ terms/
├─ privacy/
├─ disclaimer/
├─ sitemap.ts              # 사이트맵
└─ robots.ts               # robots.txt

components/site/
├─ SiteShell.tsx           # 공통 레이아웃
├─ nav.ts                  # 네비게이션 메뉴
└─ components/             # 재사용 컴포넌트들

lib/
├─ site.ts                 # 사이트 상수
├─ seo.ts                  # SEO 메타데이터
├─ images.ts               # 이미지 관리
└─ slug.ts                 # 슬러그 유틸리티

data/
├─ hubs.json               # 허브 정의
└─ keywords.json           # 키워드 정의
```

## 배포

Cloudflare Pages 등 정적 호스팅 서비스에 배포할 수 있습니다.

```bash
npm run build
# out/ 폴더를 배포
```

