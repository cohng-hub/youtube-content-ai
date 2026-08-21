# 🎬 유튜브 완전 분석 AI 스튜디오 & 8초 쇼츠 프롬프트 자동 생성기

> **유튜브 영상 링크(URL) 하나로 알고리즘 훅, 자막 스크립트 전문, 댓글 반응을 완전 분석하고, 새로운 주제 입력만으로 1분 이내 규격(56초 / 8초x7씬)의 AI 비디오 쇼츠 콘티와 9:16 프롬프트를 자동 생성하는 올인원 웹 앱 & 파이프라인**

---

## 🌟 핵심 기능 (Key Features)

### 1. 📺 유튜브 링크 하나로 완전 분석 (`analyze.py`)
- **자동 자막 추출 & 파싱**: `ko`, `ko-KR`, `ko-orig`, `en` 등 모든 자동 생성 및 작성 자막 수집, VTT 인라인 타임스탬프 태그 누락 없는 클리닝 및 100% 가공.
- **메타데이터 추출**: 영상 제목, 채널명, 구독자 수, 조회수, 좋아요 수, 댓글 수, 영상 분량, 게시일 추출.
- **구조화 텍스트 리포트 생성**: `[ID]_리포트.txt` 자동 생성.

### 2. 🎬 8초 AI 영상 쇼츠 프롬프트 콘티 자동 생성기 (`generator.py`)
- **쇼츠 1분 이내 규격 최적화**: 8초 x 7개 씬 = 총 56초 분량으로 유튜브 쇼츠 제한시간 완벽 준수.
- **다중 카테고리 기승전결 엔진**:
  - **재난/역사 (`disaster`)**: 타이타닉, 세월호, 체르노빌 등 비극적 사건의 인과관계 스토리텔링.
  - **의학/신체 (`medical`)**: 도수치료, 관절, 척추 등 인체 3D 단면 및 질소 기포 미세 스케일.
  - **IT/테크 (`technology`)**: 스마트폰, 반도체, 카메라, 배터리 등 나노 회로 및 베이퍼 챔버 냉각.
  - **우주/자연 (`space`)**: 우주, 블랙홀, 스윙바이, 중력 물리 시뮬레이션.
  - **토목/건축 (`construction`)**: 초고층 타워, 지반 침하, 모래 기둥(Sand Drain) 역발상 공법.
  - **일반 지식 (`general`)**: 비하인드 스토리 및 통찰력 유도.
- **모바일 9:16 비디오 생성 프롬프트**: Runway Gen-3, Luma Dream Machine, Sora, Midjourney 등에 바로 복사해서 사용하는 세로 9:16 초고화질 영문 프롬프트 자동 생성.

### 3. 🎨 현대적인 다크 글래스모피즘 웹 대시보드 (`server.py`, `index.html`, `style.css`, `app.js`)
- **실시간 HTTP 웹 서버 연출**: 별도 복잡한 프레임워크 없이 Lightweight Python HTTP 서버(`http://localhost:8000`)로 실행.
- **Chart.js 분석 시각화**: 시청자 예상 유지율(Retention Curve) 및 댓글 감성 분석 도넛 차트.
- **원클릭 프롬프트 복사 & TXT 다운로드**: 각 씬마다 `[📋 프롬프트 복사]` 및 `[리포트 TXT 다운로드]` 지원.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Language**: Python 3.12, JavaScript (ES6+), HTML5, CSS3
- **Tools & Libraries**: `yt-dlp`, `FFmpeg`, `Chart.js`, `Font Awesome`
- **UI Design**: Modern Dark Glassmorphism, CSS Custom Properties, Responsive Layouts

---

## 🚀 빠른 시작 (Getting Started)

### 1. Repository 클론
```bash
git clone https://github.com/cohng-hub/youtube-content-ai.git
cd youtube-content-ai
```

### 2. 의존성 설치 (yt-dlp)
```bash
pip install yt-dlp
```

### 3. CLI 실행 방법

#### (1) 유튜브 영상 완전 분석 (`analyze.py`)
```bash
python analyze.py "https://youtu.be/MhPNptU7tyY"
```

#### (2) 8초 쇼츠 비디오 콘티 & 프롬프트 생성 (`generator.py`)
```bash
python generator.py "타이타닉 침몰 과정"
```

### 4. 웹 대시보드 스튜디오 실행 (`server.py`)
```bash
python server.py
```
실행 후 브라우저에서 `http://localhost:8000` 접속!

---

## 📂 프로젝트 구조 (Project Structure)

```text
├── index.html          # 메인 다크 글래스모피즘 웹 대시보드 UI
├── style.css           # 대시보드 디자인 시스템 & 반응형 레이아웃
├── app.js              # 대시보드 로직, 탭 전환, Chart.js 및 콘티 생성기
├── server.py           # Python HTTP API 웹서버 (포트 8000)
├── analyze.py          # 유튜브 메타데이터 & 전체 자막 추출 파이프라인
├── generator.py        # 56초 쇼츠 8초x7씬 AI 비디오 프롬프트 생성 엔진
└── README.md           # 프로젝트 안내 문서
```

---

## 📜 라이선스 (License)

MIT License. Free to use and modify for video creators!
