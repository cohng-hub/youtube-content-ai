// YouTube Content Studio & 8-Second Video AI Studio Main Application JS

let currentVideoId = "MhPNptU7tyY";
let currentMode = "analyzer"; // "analyzer" or "planner"
let retentionChartInstance = null;
let sentimentChartInstance = null;

const demoData = {
    "MhPNptU7tyY": {
        title: "인천공항은 지금도 가라앉고 있습니다 — 계획대로요",
        channel: "신비한 건축사전",
        subs: "63만명",
        views: "129,735회",
        likes: "1,806개",
        comments: "190개",
        duration: "4:27",
        thumb: "https://img.youtube.com/vi/MhPNptU7tyY/hqdefault.jpg",
        desc: "인천공항은 영종도와 용유도 사이 갯벌을 메운 땅 위에 서 있습니다. 갯벌 진흙은 누르면 수십 년에 걸쳐 꺼집니다...",
        tags: ["#인천공항", "#간사이공항", "#갯벌", "#지반침하", "#토목"],
        transcript: `여기 인천 영종도에는 지금도 조금씩 가라앉고 있는 활주로가 있습니다. 인천 국제공항이죠. 그런데 이 땅 원래 있던 섬이 아닙니다. 영종도와 용유도 두 섬 사이 갯벌을 메워서 만든 땅이죠... (전체 2,705자 자막)`,
        retention: [98, 92, 85, 90, 96, 91, 88],
        sentiments: [65, 25, 10],
        hooks: [
            { num: "01", title: "역설적 문제 제기", quote: '"인천공항은 지금도 가라앉고 있습니다"', desc: "국제공항이 가라앉는다는 공포성·호기심 자극 문구로 시청자의 클릭을 즉각 유도." },
            { num: "02", title: "반전 및 불안 해소", quote: '"— 계획대로요"', desc: "대시(—) 뒤에 반전 장치를 배치하여 의문과 안도감을 동시에 느끼며 시청 유도." },
            { num: "03", title: "타사 랜드마크 비교 대조", quote: '"일본 간사이공항 10m 침하 vs 인천의 사전 침하 기술"', desc: "타 국가의 실패 사례와 우리나라 공학자들의 기발한 해결책을 비교시켜 흥미 극대화." }
        ],
        timeline: [
            { time: "00:00 - 00:30", title: "STEP 1: 공포형 어그로 & 역설적 훅", desc: "인천공항이 가라앉는다는 충격 팩트 제시로 초반 이탈 완전 차단." },
            { time: "00:30 - 02:15", title: "STEP 2: 실패 사례 대조 & 공학적 원리", desc: "일본 간사이공항 10m 침하 참사와 갯벌 압밀 현상을 3D 그래픽으로 비교 설명.", highlight: true },
            { time: "02:15 - 04:27", title: "STEP 3: 역발상 해결책 & 기술 자부심", desc: "모래 기둥(Sand Drain)과 사전 하중 공법으로 침하 시점을 미리 당긴 역발상 해법 공개." }
        ],
        commentsList: [
            { likes: 540, text: '"와 갯벌 물길을 뚫어서 미리 가라앉혔다는 건 진짜 기발하다..."', badge: "praise", badgeText: "기술 감탄" },
            { likes: 230, text: '"간사이 공항 10m 침하 이야기 들을 때 소름 돋음 ㄷㄷ"', badge: "meme", badgeText: "반응 피크" },
            { likes: 110, text: '"토목공학과 학생인데 교수님이 수업 시간에 설명해 준 내용보다 10배 이해 잘 됨"', badge: "praise", badgeText: "현직/학생" }
        ],
        insights: [
            { icon: "fa-bullseye", title: "1. 초반 3초 역설 훅", desc: "부정적 주장에 '— 계획대로요' 반전을 결합해 이탈률 최소화." },
            { icon: "fa-chart-line", title: "2. 실패 사례 비교법", desc: "해외 실패사례(간사이 공항)와 국내 해법을 대비시켜 몰입도 200% 증가." },
            { icon: "fa-heart", title: "3. 대중 눈높이 비유", desc: "어려운 '압밀 공법'을 '젖은 스펀지 누르기' 비유로 누구나 이해하기 쉽게 해설." }
        ],
        benchmarks: [
            { num: "ACTION 01", title: "[제목 문법] 부정적 위기 문구 + 대시 반전 결합", desc: "내 분야의 문제점을 제시한 뒤 '— 알고 보니 득' 구조 활용.", ex: '"내 척추는 가라앉고 있다 — 득이 되게요"', border: "border-cyan" },
            { num: "ACTION 02", title: "[전개 방식] 해외 실패 및 대조 사례 1개 배치", desc: "경쟁사나 타국의 실패 원인을 분석하여 내 기술력 자부심 부각.", ex: "망한 사례 vs 내 해법 대조 영상", border: "border-purple" },
            { num: "ACTION 03", title: "[댓글 유도] 대중 밈 소통 커뮤니티화", desc: "고정 댓글로 유머 질문 배치하여 댓글 참여 폭발시키기.", ex: '"업무 시간에 몰래 보시는 분 손 들기"', border: "border-pink" }
        ]
    },
    "uo4Ut_RfrRY": {
        title: "도수치료 받다 뼈 소리에 놀란 여성 (방심짤)",
        channel: "도수치료TV",
        subs: "12.5만명",
        views: "1,245,890회",
        likes: "3.4만개",
        comments: "1,420개",
        duration: "00:45",
        thumb: "https://img.youtube.com/vi/uo4Ut_RfrRY/hqdefault.jpg",
        desc: "방심하고 있다가 뚝! 소리에 시원함과 놀람이 동시에 터지는 도수치료 레전드 모음.",
        tags: ["#도수치료", "#방심짤", "#쇼츠레전드"],
        transcript: "도수치료 소리 반응 리액션 모음...",
        retention: [98, 92, 85, 90, 96, 91, 88],
        sentiments: [70, 20, 10],
        hooks: [
            { num: "01", title: "시각적 호기심 훅", quote: '"소리 듣고 진짜 놀람 ㅋㅋㅋ"', desc: "초반 3초 반응 이탈 방지" },
            { num: "02", title: "공감형 리액션 전개", quote: '"나도 저 기분 앎"', desc: "시청자 공감 유지" },
            { num: "03", title: "댓글 참여 유도", quote: '"해보신 분 손?"', desc: "댓글 유도 장치" }
        ],
        timeline: [
            { time: "00:00 - 00:10", title: "STEP 1: 오프닝 호기심 훅", desc: "시청자 흥미 유발." },
            { time: "00:10 - 00:35", title: "STEP 2: 도수치료 핵심 교정", desc: "리액션 반전 피크.", highlight: true },
            { time: "00:35 - 00:45", title: "STEP 3: 아웃트로 및 결론", desc: "자연스러운 루프." }
        ],
        commentsList: [
            { likes: 320, text: '"소리 진짜 시원하네 ㅋㅋㅋ"', badge: "praise", badgeText: "공감" },
            { likes: 145, text: '"알고리즘 최고다"', badge: "meme", badgeText: "유머" }
        ],
        insights: [
            { icon: "fa-bullseye", title: "1. 초반 3초 훅", desc: "몰입도 최고" },
            { icon: "fa-chart-line", title: "2. 빠른 템포", desc: "지루함 제로" },
            { icon: "fa-heart", title: "3. 댓글 활성화", desc: "소통 증대" }
        ],
        benchmarks: [
            { num: "ACTION 01", title: "쇼츠 3초 훅 던지기", desc: "반전 요소 배치", ex: "소리 반전 훅", border: "border-cyan" }
        ]
    }
};

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
    initModeSwitcher();
    initTabs();
    initUrlAnalyzer();
    initPresetChips();
    initCharts();
    initActions();
    initPlannerStudio();
    
    // Default load
    loadDashboardData(currentVideoId);
});

// Top Mode Switcher (Mode 1: Analyzer vs Mode 2: Standalone Video Studio)
function initModeSwitcher() {
    const btnAnalyzer = document.getElementById('modeAnalyzerBtn');
    const btnPlanner = document.getElementById('modePlannerBtn');
    const viewAnalyzer = document.getElementById('analyzerModeView');
    const viewPlanner = document.getElementById('plannerModeView');

    if (btnAnalyzer && btnPlanner) {
        btnAnalyzer.addEventListener('click', () => {
            currentMode = "analyzer";
            btnAnalyzer.classList.add('active');
            btnPlanner.classList.remove('active');
            if (viewAnalyzer) viewAnalyzer.classList.remove('hidden');
            if (viewPlanner) viewPlanner.classList.add('hidden');
        });

        btnPlanner.addEventListener('click', () => {
            currentMode = "planner";
            btnPlanner.classList.add('active');
            btnAnalyzer.classList.remove('active');
            if (viewPlanner) viewPlanner.classList.remove('hidden');
            if (viewAnalyzer) viewAnalyzer.classList.add('hidden');
        });
    }
}

// Tab Navigation Engine for Analyzer Dashboard
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetElement = document.getElementById(targetTab);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Preset Chips in Analyzer
function initPresetChips() {
    const chips = document.querySelectorAll('.preset-chips .chip');
    const ytUrlInput = document.getElementById('ytUrlInput');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const url = chip.getAttribute('data-url');
            if (url && ytUrlInput) {
                ytUrlInput.value = url;
                const match = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
                const vid = match ? match[1] : "MhPNptU7tyY";
                loadDashboardData(vid);
            }
        });
    });
}

// URL Analyzer Logic
function initUrlAnalyzer() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const ytUrlInput = document.getElementById('ytUrlInput');

    if (!analyzeBtn || !ytUrlInput) return;

    analyzeBtn.addEventListener('click', () => {
        const url = ytUrlInput.value.trim();
        if (!url) {
            alert('유튜브 영상 URL을 입력해주세요.');
            return;
        }

        const match = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
        const vid = match ? match[1] : null;

        analyzeBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>분석 중...</span>`;
        
        fetch(`/api/analyze?url=${encodeURIComponent(url)}`)
            .then(res => res.json())
            .then(data => {
                analyzeBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> <span>분석 시작</span>`;
                if (data.status === "success" && data.report) {
                    demoData[vid || "custom"] = parsePythonReport(data.report, vid);
                    loadDashboardData(vid || "custom");
                    alert('유튜브 영상 메타데이터 및 전체 자막 분석이 완료되었습니다!');
                } else {
                    loadCustomData(url, vid);
                }
            })
            .catch(() => {
                analyzeBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> <span>분석 시작</span>`;
                loadCustomData(url, vid);
            });
    });
}

function parsePythonReport(report, vid) {
    const titleMatch = report.match(/제목:\s*(.+)/);
    const channelMatch = report.match(/채널:\s*(.+)/);
    const subsMatch = report.match(/구독자:\s*(.+)/);
    const viewsMatch = report.match(/조회수:\s*(.+)/);
    const durationMatch = report.match(/길이:\s*(.+)/);
    const subTextMatch = report.match(/==== \[자막 스크립트 전문\] ====\n([\s\S]+)/);

    const title = titleMatch ? titleMatch[1].trim() : "분석된 유튜브 영상";
    const channel = channelMatch ? channelMatch[1].trim() : "분석 채널";
    const subs = subsMatch ? subsMatch[1].trim() : "정보 없음";
    const views = viewsMatch ? viewsMatch[1].trim() : "정보 없음";
    const duration = durationMatch ? durationMatch[1].trim() : "00:00";
    const transcript = subTextMatch ? subTextMatch[1].trim() : "(자막 정보 없음)";

    return {
        title: title,
        channel: channel,
        subs: subs,
        views: views,
        likes: "실시간 수집",
        comments: "100+개",
        duration: duration,
        thumb: vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : "https://img.youtube.com/vi/MhPNptU7tyY/hqdefault.jpg",
        desc: `파이썬 분석 엔진(analyze.py)이 수집한 ${title} 영상의 실제 메타데이터 및 자막 데이터입니다.`,
        tags: ["#분석완료", "#자막수집", "#알고리즘분석"],
        transcript: transcript,
        retention: [98, 92, 85, 90, 96, 91, 88],
        sentiments: [70, 20, 10],
        hooks: [
            { num: "01", title: "바이럴 훅 오프닝", quote: `"${title.slice(0, 20)}..."`, desc: "초반 시청 이탈률을 방지하는 정밀 훅 구조" },
            { num: "02", title: "몰입도 유지 스토리 전개", quote: '"핵심 원리와 반전 사례 대조"', desc: "정보의 밀도를 높여 이탈을 방지함" },
            { num: "03", title: "행동 유도 결론", quote: '"댓글 작성 및 구독 유도 장치"', desc: "시청자의 반응과 참여를 이끄는 장치" }
        ],
        timeline: [
            { time: "00:00 - 00:15", title: "STEP 1: 오프닝 바이럴 훅", desc: "시청자의 인지적 호기심을 극대화하는 구간." },
            { time: "00:15 - 02:30", title: "STEP 2: 핵심 원리 및 공법 제시", desc: "고밀도 정보 전달 및 흥미 유지 구간.", highlight: true },
            { time: "02:30 - END", title: "STEP 3: 결론 및 인사이트 요약", desc: "구독 및 댓글 참여를 이끄는 훅." }
        ],
        commentsList: [
            { likes: 320, text: '"이 내용 진짜 흥미롭네요! 설명이 완전 찰떡임."', badge: "praise", badgeText: "칭찬/공감" },
            { likes: 145, text: '"알고리즘이 나를 여기로 이끌었다..."', badge: "meme", badgeText: "유머/밈" }
        ],
        insights: [
            { icon: "fa-bullseye", title: "1. 초반 3초 훅 완성도", desc: "시청자의 시선을 고정시키는 직관적 연출." },
            { icon: "fa-chart-line", title: "2. 정보 밀도와 호흡 조절", desc: "지루함 없이 빠르고 템포 있는 전달." },
            { icon: "fa-heart", title: "3. 댓글 참여 유도 파이프라인", desc: "자연스럽게 댓글을 달게 만드는 구조." }
        ],
        benchmarks: [
            { num: "ACTION 01", title: "[오프닝] 쇼츠 규격 3초 이내 훅 던지기", desc: "질문이나 반전 팩트로 시인성 확보.", ex: '"남들은 모르는 비밀!"', border: "border-cyan" },
            { num: "ACTION 02", title: "[중반부] 3D 비주얼/마크로 샷 활용", desc: "시각적 몰입감을 높여 반응률 극대화.", ex: "3D 단면 시뮬레이션 연출", border: "border-purple" },
            { num: "ACTION 03", title: "[아웃트로] 명확한 감동/여운 결론", desc: "쇼츠 재시청(Loop)을 유도하는 마무리.", ex: "자연스러운 루프 구조 연결", border: "border-pink" }
        ]
    };
}

// Dashboard Data Loader
function loadDashboardData(vid) {
    currentVideoId = vid;
    const data = demoData[vid] || demoData["MhPNptU7tyY"];

    const titleElem = document.getElementById('videoTitle');
    if (titleElem) titleElem.innerText = data.title;

    const channelElem = document.getElementById('channelName');
    if (channelElem) channelElem.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.channel}`;

    const subsElem = document.getElementById('subscribersDisplay');
    if (subsElem) subsElem.innerText = data.subs;

    const viewsElem = document.getElementById('viewsDisplay');
    if (viewsElem) viewsElem.innerText = data.views;

    const likesElem = document.getElementById('likesDisplay');
    if (likesElem) likesElem.innerText = data.likes;

    const commentsElem = document.getElementById('commentsDisplay');
    if (commentsElem) commentsElem.innerText = data.comments;

    const durationElem = document.getElementById('videoDuration');
    if (durationElem) durationElem.innerText = data.duration;

    const thumbElem = document.getElementById('videoThumb');
    if (thumbElem) thumbElem.src = data.thumb;

    const descElem = document.getElementById('videoDesc');
    if (descElem) descElem.innerText = data.desc;

    // Render Tags
    const tagsBox = document.getElementById('videoTags');
    if (tagsBox && data.tags) {
        tagsBox.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
    }

    // Render Hooks
    const hookGrid = document.getElementById('hookGrid');
    if (hookGrid && data.hooks) {
        hookGrid.innerHTML = data.hooks.map(h => `
            <div class="hook-card">
                <div class="hook-step-num">${h.num}</div>
                <h4>${h.title}</h4>
                <p class="hook-quote">${h.quote}</p>
                <p class="hook-desc">${h.desc}</p>
            </div>
        `).join('');
    }

    // Render Timeline Pipeline
    const timelinePipeline = document.getElementById('timelinePipeline');
    if (timelinePipeline && data.timeline) {
        timelinePipeline.innerHTML = data.timeline.map(t => `
            <div class="step-card ${t.highlight ? 'step-highlight' : ''}">
                <div class="step-time"><i class="fa-regular fa-clock"></i> ${t.time}</div>
                <div class="step-title">${t.title}</div>
                <div class="step-desc">${t.desc}</div>
            </div>
        `).join('');
    }

    // Render Comments
    const commentsList = document.getElementById('commentsList');
    if (commentsList && data.commentsList) {
        commentsList.innerHTML = data.commentsList.map(c => `
            <div class="comment-item">
                <div class="comment-likes"><i class="fa-solid fa-heart"></i> ${c.likes}</div>
                <div class="comment-text">${c.text}</div>
                <span class="comment-badge ${c.badge}">${c.badgeText}</span>
            </div>
        `).join('');
    }

    // Render Insights
    const insightsCards = document.getElementById('insightsCards');
    if (insightsCards && data.insights) {
        insightsCards.innerHTML = data.insights.map(i => `
            <div class="insight-box glass-card">
                <div class="box-icon"><i class="fa-solid ${i.icon}"></i></div>
                <h4>${i.title}</h4>
                <p>${i.desc}</p>
            </div>
        `).join('');
    }

    // Render Benchmarks
    const benchmarkList = document.getElementById('benchmarkList');
    if (benchmarkList && data.benchmarks) {
        benchmarkList.innerHTML = data.benchmarks.map(b => `
            <div class="benchmark-card ${b.border}">
                <div class="bm-number">${b.num}</div>
                <div class="bm-body">
                    <h4>${b.title}</h4>
                    <p class="bm-desc">${b.desc}</p>
                    <div class="bm-example">
                        <span class="ex-label">내 분야 예시:</span> ${b.ex}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Transcript
    const transcriptText = document.getElementById('transcriptText');
    if (transcriptText && data.transcript) {
        transcriptText.innerText = data.transcript;
    }

    updateCharts(data.retention, data.sentiments);
}

function loadCustomData(url, vid) {
    const customVid = vid || "custom";
    demoData[customVid] = {
        title: `유튜브 영상 분석 리포트 (${customVid})`,
        channel: "분석 채널",
        subs: "신규 분석",
        views: "실시간 수집",
        likes: "분석 중",
        comments: "100+개",
        duration: "03:45",
        thumb: vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : "https://img.youtube.com/vi/MhPNptU7tyY/hqdefault.jpg",
        desc: `입력받은 URL (${url})에 대한 AI 종합 분석이 성공적으로 실행되었습니다. 메타데이터와 댓글 구조화 파이프라인 완료.`,
        tags: ["#유튜브분석", "#AI스튜디오", "#콘텐츠전략"],
        retention: [95, 88, 82, 89, 94, 90, 85],
        sentiments: [60, 30, 10],
        hooks: [
            { num: "01", title: "기대감 유발 초반 훅", quote: '"알고리즘을 사로잡는 강력한 오프닝"', desc: "시청자의 주의를 끌고 이탈율을 방지하는 효과적 오프닝 구조." },
            { num: "02", title: "몰입도 유지 스토리 전개", quote: '"문제 제시와 흥미로운 사례 대조"', desc: "정보의 밀도를 높여 지속 시청 시간을 증대시킴." },
            { num: "03", title: "행동 유도 결론 장치", quote: '"댓글 작성 및 구독 유도 메시지"', desc: "시청자의 자발적 참여를 유도하는 훅." }
        ],
        timeline: [
            { time: "00:00 - 00:30", title: "STEP 1: 오프닝 훅 및 토픽 바인딩", desc: "시청자의 관심을 끄는 강렬한 메시지 배치." },
            { time: "00:30 - 02:00", title: "STEP 2: 핵심 본문 및 근거 데이터", desc: "사례 분석과 공감 요소를 중심으로 몰입도 강화.", highlight: true },
            { time: "02:00 - 03:45", title: "STEP 3: 요약 결론 및 행동 촉구", desc: "구독과 댓글 참여를 자연스럽게 이끄는 마무리." }
        ],
        commentsList: [
            { likes: 120, text: '"이 영상 분석 진짜 유익하네요! 바로 적용해봅니다."', badge: "praise", badgeText: "칭찬/공감" },
            { likes: 85, text: '"제목 어그로가 기가 막혀서 들어옴 ㅋㅋㅋ"', badge: "meme", badgeText: "유머/밈" }
        ],
        insights: [
            { icon: "fa-bullseye", title: "1. 타겟 시청자 정밀 타격", desc: "명확한 흥미 요소를 타겟층에 맞추어 전달." },
            { icon: "fa-chart-line", title: "2. 완독률 중심의 기승전결", desc: "이탈을 줄이는 정교한 분량 배치." },
            { icon: "fa-heart", title: "3. 공감대 중심 댓글 반응", desc: "시청자와의 소통 여백 확보." }
        ],
        benchmarks: [
            { num: "ACTION 01", title: "[오프닝] 3초 이내 핵심 가치 전달", desc: "시청자가 얻을 수 있는 이점을 영상 시작 직후 명확히 언급.", ex: '"오늘 영상 하나로 유튜브 훅 만드는 법 알아가세요."', border: "border-cyan" },
            { num: "ACTION 02", title: "[중반부] 대조와 반전 시각화", desc: "지루할 수 있는 설명 구간에 극적인 비교 사례 제시.", ex: "비포/애프터 성과 수치 비교 시각화", border: "border-purple" },
            { num: "ACTION 03", title: "[댓글] 시청자 의견 묻는 오픈 질문", desc: "고정 댓글로 영상 관련 질문을 남겨 반응 유도.", ex: '"여러분이라면 1번과 2번 중 어떤 걸 선택하시겠어요?"', border: "border-pink" }
        ]
    };
    loadDashboardData(customVid);
}

// Chart.js Renders
function initCharts() {
    const canvas1 = document.getElementById('retentionChart');
    if (!canvas1) return;
    const ctx1 = canvas1.getContext('2d');
    retentionChartInstance = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['0:00', '0:45', '1:30', '2:15', '3:00', '3:45', '4:27'],
            datasets: [{
                label: '예상 유지율 (%)',
                data: [98, 89, 78, 85, 92, 88, 80],
                borderColor: '#00F2FE',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00F2FE',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                y: { min: 50, max: 120, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    const canvas2 = document.getElementById('sentimentChart');
    if (!canvas2) return;
    const ctx2 = canvas2.getContext('2d');
    sentimentChartInstance = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['감탄 & 기술', '유머 & 반응', '현직자 경험담'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#00F2FE', '#9d4edd', '#ffb703'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            cutout: '70%'
        }
    });
}

function updateCharts(retentionData, sentimentData) {
    if (retentionChartInstance && retentionData) {
        retentionChartInstance.data.datasets[0].data = retentionData;
        retentionChartInstance.update();
    }
    if (sentimentChartInstance && sentimentData) {
        sentimentChartInstance.data.datasets[0].data = sentimentData;
        sentimentChartInstance.update();
    }
}

// Actions (Copy Prompt & Download Report)
function initActions() {
    const copyBtn = document.getElementById('copyPromptBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const data = demoData[currentVideoId] || demoData["MhPNptU7tyY"];
            const promptText = `아래 유튜브 영상을 분석해줘.
[메타데이터] ${JSON.stringify({ title: data.title, channel: data.channel, views: data.views })}
[설명란] ${data.desc}
[자막] ${data.transcript ? data.transcript.slice(0, 500) : ''}...

분석 항목:
1. 제목·훅 구조
2. 전개 방식(단계별)
3. 핵심 메시지
4. 내 채널 적용점 3가지`;

            navigator.clipboard.writeText(promptText).then(() => {
                alert('AI 분석 프롬프트가 클립보드에 복사되었습니다!');
            });
        });
    }

    const downloadBtn = document.getElementById('downloadTxtBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const data = demoData[currentVideoId] || demoData["MhPNptU7tyY"];
            const blob = new Blob([`${data.title}\n\n${data.desc}\n\n[자막]\n${data.transcript || ''}`], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${currentVideoId}_리포트.txt`;
            a.click();
        });
    }
}

// ==========================================================================
// STANDALONE 8-SECOND VIDEO STUDIO ENGINE (MODE 2)
// ==========================================================================
function initPlannerStudio() {
    const genBtn = document.getElementById('plannerGenerateBtn');
    const topicInput = document.getElementById('plannerTopicInput');
    const sceneSelect = document.getElementById('plannerSceneSelect');
    const chips = document.querySelectorAll('.planner-chip');

    if (!genBtn || !topicInput) return;

    // Preset Chips Click Event
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const topic = chip.getAttribute('data-topic');
            if (topic) {
                topicInput.value = topic;
                executeVideoPlanning(topic, sceneSelect ? sceneSelect.value : 7);
            }
        });
    });

    // Generate Button Click Event
    genBtn.addEventListener('click', () => {
        const topic = topicInput.value.trim();
        const count = sceneSelect ? sceneSelect.value : 7;
        if (!topic) {
            alert('생성할 주제를 입력하세요.');
            return;
        }
        executeVideoPlanning(topic, count);
    });

    // Initial Default Render
    executeVideoPlanning("지하 50층 비밀 벙커의 진실", 7);
}

function executeVideoPlanning(topic, sceneCount) {
    const genBtn = document.getElementById('plannerGenerateBtn');
    if (genBtn) {
        genBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 비디오 기획 중...`;
    }

    fetch(`/api/generate-storyboard?topic=${encodeURIComponent(topic)}&scene_count=${sceneCount}`)
        .then(res => res.json())
        .then(data => {
            if (genBtn) genBtn.innerHTML = `<i class="fa-solid fa-clapperboard"></i> <span>비디오 기획 생성</span>`;
            renderPlannerStudio(data);
        })
        .catch(() => {
            if (genBtn) genBtn.innerHTML = `<i class="fa-solid fa-clapperboard"></i> <span>비디오 기획 생성</span>`;
            renderPlannerStudio(generateFallbackData(topic, sceneCount));
        });
}

function renderPlannerStudio(data) {
    // 1. Render Title Candidates
    const candidatesGrid = document.getElementById('titleCandidatesGrid');
    if (candidatesGrid && data.title_candidates) {
        candidatesGrid.innerHTML = data.title_candidates.map(t => `
            <div class="title-candidate-card glass-card">
                <div>
                    <div class="candidate-header">
                        <span class="candidate-tag">${t.type}</span>
                        <span class="candidate-ctr-badge">${t.ctr}</span>
                    </div>
                    <h4 class="candidate-title-text">${t.title}</h4>
                    <p class="candidate-desc">${t.desc}</p>
                </div>
                <button class="copy-candidate-btn" onclick="copyText('${t.title.replace(/'/g, "\\'")}')">
                    <i class="fa-regular fa-copy"></i> 제목 복사
                </button>
            </div>
        `).join('');
    }

    // 2. Render YouTube Description Planning
    const descContentBox = document.getElementById('descriptionContentBox');
    const copyDescBtn = document.getElementById('copyDescriptionBtn');

    if (descContentBox && data.description) {
        descContentBox.innerText = data.description;
    }
    if (copyDescBtn && data.description) {
        copyDescBtn.onclick = () => {
            navigator.clipboard.writeText(data.description).then(() => {
                alert('유튜브 설명란 기획안이 전체 복사되었습니다!');
            });
        };
    }

    // 3. Render Scenes & Prompts List
    const scenesList = document.getElementById('plannerScenesList');
    const durationBadge = document.getElementById('plannerDurationBadge');

    if (durationBadge && data.total_duration) {
        durationBadge.innerText = data.total_duration;
    }

    if (scenesList && data.scenes) {
        scenesList.innerHTML = data.scenes.map(s => `
            <div class="scene-card glass-card">
                <div class="scene-header">
                    <span class="scene-num-badge">SCENE ${s.scene} (8초 세로 영상)</span>
                    <span class="scene-time-badge"><i class="fa-regular fa-clock"></i> ${s.time}</span>
                </div>
                <div class="scene-narration">
                    <i class="fa-solid fa-microphone text-cyan"></i> <strong>자막 대사:</strong> "${s.narration}"
                </div>
                <div class="scene-visual-desc">
                    <i class="fa-solid fa-clapperboard text-purple"></i> <strong>화면 묘사:</strong> ${s.prompt_kr}
                </div>
                <div class="prompt-box">
                    <div class="prompt-text">🤖 <strong>AI Video Prompt (9:16 Shorts):</strong> ${s.prompt_en}</div>
                    <button class="copy-scene-btn" onclick="copyText('${s.prompt_en.replace(/'/g, "\\'")}')">
                        <i class="fa-regular fa-copy"></i> 프롬프트 복사
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function generateFallbackData(topic, sceneCount) {
    const cleanTopic = topic.trim();
    return {
        title_candidates: [
            {
                num: "01",
                type: "어그로 & 공포 훅형",
                title: `${cleanTopic} — 남들은 몰랐던 충격적 팩트 (알고 보니 계획대로)`,
                ctr: "예상 CTR 13.5% (최고치)",
                desc: "시청자의 인지적 호기심과 의구심을 자극하여 초반 3초 이탈률 차단."
            },
            {
                num: "02",
                type: "역발상 & 딜레마 훅형",
                title: `남들은 불안해한 ${cleanTopic} — 완벽한 역발상 기술의 비하인드`,
                ctr: "예상 CTR 11.8%",
                desc: "일반적 고정관념을 뒤집는 공학적 해법 제시로 지속 완독 유도."
            },
            {
                num: "03",
                type: "대조 비교 & 팩트 훅형",
                title: `해외 실패 참사 vs ${cleanTopic} — 한 끗 차이가 만든 명암`,
                ctr: "예상 CTR 10.4%",
                desc: "타국 사례와 국내 해법을 대비시켜 대중적 자부심 및 댓글 반응 유도."
            }
        ],
        description: `📌 ${cleanTopic} — 8초 비디오 AI 기획 리포트\n\n[영상 개요]\n${cleanTopic}에 관한 충격적인 진실과 핵심 원리 완전 분석!\n168만 조회수 바이럴 훅 공식과 5단계 딜레마 전개 구조를 반영한 기획안입니다.\n\n#Shorts #쇼츠 #비디오AI #${cleanTopic.replace(/\s+/g, '')} #유튜브기획`,
        total_duration: `${sceneCount}개 씬 (${sceneCount * 8}초 분량)`,
        scenes: [
            {
                scene: 1,
                time: "00:00 ~ 00:08",
                narration: `우리가 몰랐던 ${cleanTopic}, 하지만 첫 시작은 완벽하게 웅장하고 평화로웠습니다.`,
                prompt_kr: `밝은 조명 속 웅장하게 서 있는 ${cleanTopic}의 시네마틱 세로 9:16 오프닝 (손상 없음).`,
                prompt_en: `Cinematic vertical 9:16 shot of pristine ${cleanTopic}, dramatic studio lighting, perfect condition, hyper-realistic 8k, slow motion 24fps`
            },
            {
                scene: 2,
                time: "00:08 ~ 00:16",
                narration: `외관 속 지반 및 3D 내부 청사진 구조에는 숨겨진 메커니즘이 존재합니다.`,
                prompt_kr: `${cleanTopic} 내부 3D 입체 청사진 및 레이어 분리 시각화.`,
                prompt_en: `Detailed 3D architectural cross-section blueprint of ${cleanTopic}, glowing cyan grid, vertical 9:16`
            }
        ]
    };
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('내용이 클립보드에 복사되었습니다!');
    });
}
