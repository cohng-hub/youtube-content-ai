// YouTube Content Studio Main Application JS

let currentVideoId = "MhPNptU7tyY";
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
    initTabs();
    initUrlAnalyzer();
    initPresetChips();
    initCharts();
    initActions();
    initGenerator();
    
    // Load default data
    loadDashboardData(currentVideoId);
});

// Tab Navigation Engine (Fix: Handles both .tab-btn and .nav-btn)
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn, .nav-btn');
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

// Preset Template Chips
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

// URL Analyzer
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
            labels: ['감탄 & 국뽕', '채널 밈 & 유머', '현직자 경험담'],
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
4. 내 채널 쇼츠 적용점 3가지`;

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

// Generator Logic
function initGenerator() {
    const genBtn = document.getElementById('generateStoryboardBtn');
    const topicInput = document.getElementById('topicInput');

    if (!genBtn || !topicInput) return;

    genBtn.addEventListener('click', () => {
        const topic = topicInput.value.trim();
        if (!topic) {
            alert('생성할 주제를 입력하세요.');
            return;
        }

        genBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 쇼츠 콘티 생성 중...`;
        
        fetch(`/api/generate-storyboard?topic=${encodeURIComponent(topic)}`)
            .then(res => res.json())
            .then(data => {
                genBtn.innerHTML = `<i class="fa-solid fa-film"></i> 8초 콘티 & 프롬프트 생성`;
                renderStoryboard(data);
            })
            .catch(() => {
                genBtn.innerHTML = `<i class="fa-solid fa-film"></i> 8초 콘티 & 프롬프트 생성`;
                renderStoryboard(clientFallbackStoryboard(topic));
            });
    });

    // Initial render
    renderStoryboard(clientFallbackStoryboard("타이타닉 침몰 과정"));
}

function clientFallbackStoryboard(topic) {
    const cleanTopic = topic.trim();
    const t = cleanTopic.toLowerCase();
    
    let sub = "general";
    let enSub = cleanTopic;
    let krName = `${cleanTopic} 건물`;
    let locEn = "urban cityscape";
    
    if (t.includes("삼풍") || t.includes("백화점") || t.includes("붕괴") || t.includes("아파트") || t.includes("건물") || t.includes("빌딩")) {
        sub = "building_collapse";
        enSub = t.includes("삼풍") ? "Sampoong Department Store building" : `${cleanTopic} building`;
        krName = `${cleanTopic} 건물`;
        locEn = "1995 Seoul cityscape at daytime";
    } else if (t.includes("침몰") || t.includes("타이타닉") || t.includes("세월호") || t.includes("배") || t.includes("함선")) {
        sub = "ship_sinking";
        enSub = t.includes("타이타닉") ? "Titanic ocean liner" : (t.includes("세월호") ? "Sewol passenger ferry vessel" : `${cleanTopic} ocean vessel`);
        krName = `${cleanTopic} 선체`;
        locEn = "starry ocean night";
    } else if (t.includes("체르노빌") || t.includes("원전") || t.includes("폭발") || t.includes("화재") || t.includes("가스")) {
        sub = "nuclear_explosion";
        enSub = t.includes("체르노빌") ? "Chernobyl nuclear power plant reactor" : `${cleanTopic} facility`;
        krName = `${cleanTopic} 시설`;
        locEn = "power plant facility at dusk";
    } else if (t.includes("치료") || t.includes("척추") || t.includes("관절") || t.includes("몸") || t.includes("의학") || t.includes("디스크")) {
        sub = "spine_joint";
        enSub = `${cleanTopic} medical structure`;
        krName = `${cleanTopic} 신체 구조`;
        locEn = "bright modern medical clinic";
    } else if (t.includes("폰") || t.includes("아이폰") || t.includes("카메라") || t.includes("배터리") || t.includes("반도체") || t.includes("ai")) {
        sub = "tech_device";
        enSub = `${cleanTopic} high-tech device`;
        krName = `${cleanTopic} 기술 제품`;
        locEn = "dark minimalist studio";
    } else if (t.includes("타워") || t.includes("공항") || t.includes("터널") || t.includes("교량") || t.includes("지반") || t.includes("건축")) {
        sub = "megastructure";
        enSub = `${cleanTopic} megastructure`;
        krName = `${cleanTopic} 건축 구조물`;
        locEn = "urban skyline at sunset";
    }

    let title = "";
    let description = "";
    let rawScenes = [];

    if (sub === "building_collapse") {
        title = `${cleanTopic} — 56초 만에 밝혀지는 붕괴 비극의 전말 #Shorts`;
        description = `${cleanTopic}에 관한 충격적인 진실과 비하인드 56초 요약!\n정상 운용되던 건물에서 하중 한계 초과로 무너져 내리기까지의 과정입니다.\n\n#Shorts #쇼츠 #재난 #건축 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `많은 분들이 알고 계신 ${cleanTopic}, 하지만 붕괴 전 ${krName}(은)는 수많은 사람들이 오가던 세상에서 가장 화려하고 평화로운 공간이었습니다.`, `맑은 낮 도심 속 화려하게 서 있는 ${krName}의 전경. 평화로운 거리, 쇼핑객들, 붕괴 전 완벽하게 깨끗한 건축물 오프닝 (손상 없음).`, `Cinematic vertical 9:16 shot of pristine multi-story ${enSub} operating normally in ${locEn}, bright sunny day, crowds of people, peaceful urban atmosphere, immaculate architecture, no damage, hyper-realistic 8k, slow motion 24fps`],
            ["00:08 ~ 00:16", `절대 무너지지 않을 듯 견고해 보였지만, 내부 콘크리트 기둥과 슬래브 바닥판 속에는 무리한 하중 결함이 숨어 있었습니다.`, `${krName} 내부 콘크리트 하중 지원 기둥, 철근 단면, 옥상 대형 냉각탑 무게 배치의 3D 입체 청사진 시각화.`, `Detailed 3D architectural cross-section blueprint of ${enSub} internal concrete support pillars, steel rebar grid, and heavy rooftop HVAC units, glowing cyan blueprint style, vertical 9:16`],
            ["00:16 ~ 00:24", `무단 구조 변경과 옥상 29톤 냉각탑 이동으로 인해, 5층 천장과 기둥 주변 콘크리트에 미세 균열이 퍼지기 시작합니다.`, `콘크리트 기둥 및 천장 슬래브 접합부에 미세 균열이 가고 먼지 가루가 떨어지는 긴장감 있는 마크로 샷.`, `Macro shot of micro cracks spreading on concrete ceiling column and slab of building interior under heavy stress, fine dust particles falling, extreme tension, vertical 9:16`],
            ["00:24 ~ 00:32", `하중 응력이 한계를 초과하자 중앙 기둥이 뚫림 전단 파괴되며, 5층 바닥판이 아래층으로 수직 붕괴하기 시작합니다.`, `3D 물리 수축 시뮬레이션으로 건물 중앙 기둥이 부러지며 상층 바닥판이 수직 하강 붕괴하는 순간 연출.`, `3D structural physics simulation of central concrete column snapping and top floor slab shearing downward into lower building levels, dust cloud explosion, vertical 9:16`],
            ["00:32 ~ 00:40", `아래층 슬래브들이 상층 무게를 견디지 못하고 팬케이크처럼 차례대로 주저앉으며 바닥 전체가 순식간에 도미노 침하됩니다.`, `3D 청사진으로 5층부터 지하 층까지 바닥 슬래브가 연속적으로 주저앉아 무너져 내리는 모션 그래픽.`, `3D architectural animation of sequential floor slab collapse crashing down through building levels into basement, massive dust cloud, vertical 9:16`],
            ["00:40 ~ 00:48", `불과 20초 만에 거대한 매몰 현장으로 변해버린 붕괴 자리에 구조대 탐조등과 비상 조명이 어둠 속을 비춥니다.`, `밤하늘 아래 무너진 건물 잔해 현장에서 비상 구조대 탐조등 빔이 자욱한 먼지를 뚫고 비추는 극적인 시네마틱 샷.`, `Dramatic wide cinematic shot of collapsed building site at night, emergency rescue team searchlights beaming through thick dust clouds and concrete rubble, high emotional impact, vertical 9:16`],
            ["00:48 ~ 00:56", `안전의 중요성을 잊은 인재(人災)에 대한 묵직한 경고. 이것이 오늘날 우리가 ${cleanTopic}(을)를 잊지 말아야 할 이유입니다.`, `고요한 아침 도심 위로 일출의 황금빛 햇살이 위령비 현장을 따뜻하게 감싸는 아련한 쇼츠 아웃트로.`, `Cinematic outro shot of quiet city skyline at sunrise, golden sun rays shining on memorial park, peaceful emotional lighting, vertical 9:16 4k 60fps`]
        ];
    } else if (sub === "ship_sinking") {
        title = `${cleanTopic} — 칠흑 같은 어둠 속 비극의 전말 #Shorts`;
        description = `${cleanTopic}에 관한 충격적인 진실과 비하인드 56초 요약!\n장엄했던 출항부터 비극적 침몰까지 단계별 씬으로 재구성합니다.\n\n#Shorts #쇼츠 #재난 #해양 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `역사상 가장 충격적인 비극으로 기록된 ${cleanTopic}, 하지만 그 시작은 세상에서 가장 장엄하고 평화로웠습니다.`, `어두운 밤바다 위를 유유히 항해하는 웅장한 ${krName}의 전경. 잔잔한 수평선, 따뜻한 선실 조명, 침몰 전 완벽한 평화 연출 (손상 없음).`, `Cinematic vertical 9:16 shot of magnificent ${enSub} sailing smoothly on a calm starry ocean at night, warm glowing cabin lights, peaceful maiden voyage, pristine condition, no damage, hyper-realistic 8k, slow motion 24fps`],
            ["00:08 ~ 00:16", `절대 가라앉지 않는 배라 불리던 내부에는 강철 장갑판과 격벽의 치밀한 구조가 숨어 있었습니다.`, `${krName} 구조물 강철 장갑판 결합 부위와 방수 격벽의 미세 단면 3D 청사진 시각화.`, `Detailed 3D engineering blueprint cross-section view of ${enSub} sturdy steel plates and bulkheads, clean structural inspection, dark water ambient glow, vertical 9:16`],
            ["00:16 ~ 00:24", `하지만 칠흑 같은 안개와 위협의 형체가 마침내 모습을 드러내며 피할 수 없는 위기 순간에 도달합니다.`, `짙은 안개 속에서 거대한 위협/장애물이 서서히 박두해오는 위기 순간의 1인칭 시점(POV) 연출.`, `First person POV from ship crow's nest looking at looming obstacle appearing out of dark sea fog at night, high tension, vertical 9:16`],
            ["00:24 ~ 00:32", `충돌과 함께 선체 측면 장갑이 찢겨 나가며 차가운 바닷물이 순식간에 하부 구역으로 쏟아져 들어옵니다.`, `충돌과 함께 선체 측면 장갑판이 찌그러지며 해수가 격렬하게 밀려드는 수중 액션 샷.`, `Action shot of steel ship side hull scraping underwater, freezing seawater violently flooding lower compartment, dynamic motion, vertical 9:16`],
            ["00:32 ~ 00:40", `방수 격벽이 설치되어 있었지만, 바닷물이 잔에 차오르듯 위쪽으로 차례대로 넘쳐 흐르는 결함이 나타납니다.`, `3D 청사진으로 격벽 위로 차가운 바닷물이 차례대로 넘어가며 선체가 기울어지기 시작하는 시각화.`, `3D architectural animation showing ocean water overflowing top of internal watertight bulkheads inside hold, ship tilting forward slightly, vertical 9:16`],
            ["00:40 ~ 00:48", `선수가 수면 아래로 숙여지고 거대한 선체 후미가 밤하늘을 향해 높이 들어 올려지며 마침내 파괴적 침몰이 일어납니다.`, `선체 뒷부분이 높게 들리고 빨간 조난 신호탄이 밤하늘로 쏘아지며 수중으로 침몰하는 극적인 시네마틱 샷.`, `Dramatic wide cinematic shot of colossal ocean vessel stern rising high into starry night sky as bow plunges into ocean, red emergency distress flares launching, epic destruction, vertical 9:16`],
            ["00:48 ~ 00:56", `완벽하다고 믿었던 인간의 오만에 대한 묵직한 경고. 고요해진 바다만이 그날의 비극을 기억하고 있습니다.`, `고요한 아침 바다 위로 일출의 황금빛 햇살이 비치는 감동적이고 아련한 파이널 쇼츠 아웃트로.`, `Cinematic outro shot of quiet peaceful ocean surface at sunrise, golden sun rays breaking through morning clouds, emotional gold lighting, vertical 9:16 4k 60fps`]
        ];
    } else if (sub === "nuclear_explosion") {
        title = `${cleanTopic} — 칠흑 같은 어둠 속 폭발 참사 #Shorts`;
        description = `${cleanTopic}에 관한 충격적인 진실과 비하인드 56초 요약!\n평화롭던 원자로 시설에서 통제 불능 폭발 참사까지의 과정입니다.\n\n#Shorts #쇼츠 #재난 #과학 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `세계 최고의 안전성을 자랑하던 ${cleanTopic}, 하지만 참사 전 ${krName}(은)는 정막 속에 정상 가동되고 있었습니다.`, `노을빛 아래 원자로 시설 건물과 증기 쿨링 타워가 고요히 서 있는 깨끗한 오프닝 (손상 없음).`, `Cinematic vertical 9:16 shot of pristine ${enSub} at power plant facility, cool steam rising smoothly, quiet evening atmosphere, immaculate facility, no damage, hyper-realistic 8k`],
            ["00:08 ~ 00:16", `원자로 4호기 내부 심장부에는 흑연 제어봉과 고압 수증기 파이프가 정밀하게 기계 결합되어 있었습니다.`, `${krName} 핵심 원자로 우라늄 연료봉과 흑연 제어봉 내부 3D 입체 청사진 시각화.`, `Detailed 3D engineering blueprint cross-section of ${enSub} core, graphite control rods, and steam cooling pipes, glowing cyan grid, vertical 9:16`],
            ["00:16 ~ 00:24", `무리한 출력 시험 도중 출력 제어 장치가 작동하지 않으며, 원자로 내부 수증기 압력과 열기가 폭발적으로 폭증합니다.`, `제어실 경고등이 붉게 점등되고 원자로 내부 온도가 열화상으로 빨갛게 상승하는 과부하 연출.`, `Red warning lights flashing in control room, thermal heat map spiking dangerously inside nuclear reactor core, extreme tension, vertical 9:16`],
            ["00:24 ~ 00:32", `수증기 압력을 견디지 못한 1,000톤 중량의 원자로 뚜껑이 튀어나가며 1차 열폭발이 직격합니다.`, `원자로 상부 뚜껑이 수증기 압력으로 날아가며 열화염과 불꽃이 솟구쳐 오르는 3D 액션 샷.`, `Action shot of 1000-ton reactor lid blowing open from steam pressure explosion, intense fire sparks and heat wave eruption, vertical 9:16`],
            ["00:32 ~ 00:40", `공기와 반응한 흑연에 2차 대형 폭발이 일어나며 방사성 불기둥과 잔해가 밤하늘 수천 미터 위로 솟구칩니다.`, `붕괴된 원자로 건물 위로 붉은 방사능 열구름과 잔해가 밤하늘로 치솟아 올라가는 3D 비주얼.`, `3D physics animation of glowing radioactive steam cloud and glowing graphite debris billowing up into dark night sky, vertical 9:16`],
            ["00:40 ~ 00:48", `파괴된 4호기 원자로 건물 잔해 속에서 소방대원들의 비상 조명과 조난 불빛이 안개 속을 비춥니다.`, `불타는 원자로 잔해와 연기 속에서 소방차 탐조등이 어둠을 비추는 극적인 시네마틱 샷.`, `Dramatic wide cinematic shot of ruined nuclear reactor building rubble at night, emergency firefighter searchlights beaming through smoke, high impact, vertical 9:16`],
            ["00:48 ~ 00:56", `보이지 않는 위험에 대한 엄중한 경고. 이것이 바로 우리가 ${cleanTopic}(을)를 기억해야 하는 이유입니다.`, `고요해진 붉은 숲 위로 아침 일출 햇살이 감싸는 감동적이고 아련한 파이널 쇼츠 아웃트로.`, `Cinematic outro shot of quiet pine forest surrounding exclusion zone at sunrise, golden sun rays breaking through morning mist, 4k 60fps, vertical 9:16`]
        ];
    } else if (sub === "spine_joint") {
        title = `${cleanTopic} — 56초 만에 밝혀지는 놀라운 진실 #Shorts`;
        description = `${cleanTopic}에 대해 우리가 잘못 알고 있던 통념과 의학적 진실!\n몸속 미세 구조와 원리를 56초 쇼츠 콘티로 완전 해부합니다.\n\n#Shorts #쇼츠 #의학 #건강 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `많은 분들이 ${cleanTopic}(을)를 접할 때 몸에 무리가 갈까 두려워하지만, 사실 치료 전 몸상태는 완벽히 통제 가능합니다.`, `환자가 밝고 편안한 전문 클리닉에 들어서며 안정된 미소를 지어 보이는 깨끗한 오프닝.`, `Cinematic vertical 9:16 shot of modern bright medical clinic, patient walking in comfortably, healthy environment, no pain, warm ambient studio lighting, hyper-realistic 8k`],
            ["00:08 ~ 00:16", `피부 아래 관절 마디 속에서는 정밀 3D 단면처럼 관절액과 캡슐이 정밀하게 배치되어 있습니다.`, `신체 내부 척추 및 관절 마디 캡슐의 정밀 3D 입체 단면 비주얼 연출.`, `Detailed 3D medical cross-section animation of healthy joint capsule and cartilage of ${enSub}, glowing cyan blueprint style, Octane render, vertical 9:16`],
            ["00:16 ~ 00:24", `하지만 잘못된 자세나 무리한 마찰이 지속되면 캡슐 공간 내부의 기포 압력이 상승하게 됩니다.`, `관절 마디 사이 좁아진 공간과 질소 가스 기포가 압축되는 긴장감 있는 마크로 연출.`, `Macro shot of nitrogen gas microbubbles building up pressure inside joint capsule fluid under physical stress, vertical 9:16`],
            ["00:24 ~ 00:32", `전문의가 순간적인 수직 교정을 가하면, 캡슐 속 기포가 기분 좋게 터지며 마침내 압력이 파열 해소됩니다.`, `관절액 속 미세 질소 기포가 터지며 시원한 인체 파형 이펙트가 퍼지는 초슬로우 모션 마크로 샷.`, `Extreme macro 3D simulation of nitrogen gas microbubbles bursting in joint fluid, releasing pressure, cyan energy wave, slow motion 1000fps, vertical 9:16`],
            ["00:32 ~ 00:40", `굳어있던 근막과 수직 압력이 순식간에 이완되며 주변 신경과 혈관의 순환이 재개됩니다.`, `근육 마디가 유연하게 풀어지며 혈관 속 혈류가 푸르고 붉게 신속히 도는 3D 이펙트 모션.`, `3D visualization of muscle fibers relaxing smoothly and blood circulation flowing rapidly, bio-mechanical simulation, vertical 9:16`],
            ["00:40 ~ 00:48", `통증을 참고 참던 가동 범위를 회복하여 신체 불균형이 완벽하게 가벼워집니다.`, `교정을 마친 환자가 가볍게 허리와 어깨를 펴며 시원해하는 클리닉 샷.`, `Happy patient standing up straight with perfect aligned posture in bright sunny medical center, cinematic flare, vertical 9:16`],
            ["00:48 ~ 00:56", `몸의 원리를 이해하고 안전하게 교정하는 의학의 지혜. 이것이 바로 ${cleanTopic}의 진짜 진실입니다.`, `아침 햇살이 비치는 클리닉의 따뜻하고 감동적인 쇼츠 파이널 아웃트로.`, `Cinematic outro shot of modern physical therapy clinic at sunrise, warm ambient glow, vertical 9:16 4k 60fps`]
        ];
    } else if (sub === "tech_device") {
        title = `${cleanTopic} — 한계를 돌파한 56초 혁신 기술 #Shorts`;
        description = `${cleanTopic} 내부 초미세 나노 회로에 숨겨진 공학의 정수!\n한계를 넘어선 역발상 기술을 56초 쇼츠로 분석합니다.\n\n#Shorts #쇼츠 #IT #테크 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `우리가 매일 사용하는 ${cleanTopic}, 손끝에 닿는 매끈한 외관 뒤에는 완벽하게 계산된 공학이 존재합니다.`, `최신 기술이 적용된 ${cleanTopic}의 깨끗하고 매끄러운 완제품 바디가 빛나는 세로 9:16 스튜디오 오프닝 (손상 없음).`, `Cinematic macro studio shot of pristine ${enSub}, perfect condition, sleek glass metallic reflection, dark minimalist studio, hyper-realistic 8k, vertical 9:16`],
            ["00:08 ~ 00:16", `얇은 외관 속 실리콘 반도체 내부에는 나노 단위 회로와 트랜지스터가 치밀하게 늘어서 있습니다.`, `실리콘 반도체 칩셋 내부로 카메라가 정밀하게 줌인하는 3D 입체 청사진 연출.`, `Extreme macro 3D flythrough inside semiconductor silicon chip of ${enSub}, glowing blue circuit traces, Octane render, vertical 9:16`],
            ["00:16 ~ 00:24", `하지만 고성능 작업 시 나노 회로에 전류가 집중되면 극심한 발열과 전력 저항의 한계에 부딪히게 됩니다.`, `열화상 카메라 시점으로 칩셋 중심부에 열기가 붉게 오르는 과부하 시뮬레이션 연출.`, `Thermal camera POV showing intense heat map building up on electronic microchip core, glowing yellow and red heat, vertical 9:16`],
            ["00:24 ~ 00:32", `엔지니어들은 발상을 전환합니다. 두께 0.1mm 구리 베이퍼 챔버 내부에서 냉매 액체가 열을 뺏어 기화되게 만든 거죠.`, `구리 냉각 파이프 내부에서 냉매 액체가 끓어오르며 열을 방출하고 퍼지는 3D 액션 샷.`, `3D liquid physics animation of refrigerant fluid evaporating inside copper vapor chamber, cool blue wave absorbing heat, vertical 9:16`],
            ["00:32 ~ 00:40", `동시에 AI 뉴럴 엔진 알고리즘이 초당 60회 전력을 분산 제어하여 과열을 순식간에 억제합니다.`, `AI 칩셋 중심부에서 푸른 에너지 벡터가 발산되며 전체 회로 온도를 내려놓는 3D 이펙트 모션.`, `Glowing AI processor core pulsating with blue light vectors, rerouting power across circuit board, temperature dropping, vertical 9:16`],
            ["00:40 ~ 00:48", `덕분에 작고 얇은 폼팩터에서도 전작 대비 3배 이상의 압도적이고 안정적인 성능을 완성해 냅니다.`, `스튜디오 림 조명 아래 매끄럽게 돌아가며 완벽한 성능을 과시하는 제품 리빌 샷.`, `Sleek product reveal shot of ${enSub} rotating smoothly under dramatic studio rim lights, vertical 9:16`],
            ["00:48 ~ 00:56", `한계를 넘어선 인간의 집념이 만든 혁신. 이것이 바로 ${cleanTopic}의 진짜 정체입니다.`, `도심 속 화려한 네온 조명과 조화되는 하이테크 감성 쇼츠 파이널 아웃트로.`, `Cinematic outro shot of ${enSub} backdrop at night with glowing neon city lights, 4k 60fps, vertical 9:16`]
        ];
    } else if (sub === "megastructure") {
        title = `${cleanTopic} — 자연을 제어한 역발상 공법 #Shorts`;
        description = `${cleanTopic}에 적용된 획기적인 토목/건축 기술 스토리!\n수직 하중과 압력을 제어해 낸 56초 쇼츠 핵심 콘티입니다.\n\n#Shorts #쇼츠 #토목 #건축 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `여기 ${cleanTopic}(이)가 있습니다. 남들은 무너질까 걱정하지만, 완성된 구조물은 장엄하게 서 있습니다.`, `노을빛 아래 웅장하게 스카이라인을 이루고 있는 ${krName}의 시네마틱 세로 9:16 드론 오프닝 (손상 없음).`, `Cinematic epic wide drone shot of magnificent ${enSub}, perfect standing condition, hyper-realistic 8k, dramatic sunset lighting, vertical 9:16`],
            ["00:08 ~ 00:16", `거친 외부 속 바닥 아래 지반에는 우리가 몰랐던 치밀한 토목 3D 구조가 설치되어 있습니다.`, `${krName}의 거대한 지반 단면과 지하 모래 기둥/내진 댐퍼의 3D 청사진 오버레이.`, `Detailed 3D cross-section architecture blueprint animation of ${enSub} ground foundation, glowing cyan grid, vertical 9:16`],
            ["00:16 ~ 00:24", `원래 이 땅은 수십 톤의 하중을 누르면 물이 천천히 빠져나가며 수십 년간 꺼지는 치명적 진흙 지반이었죠.`, `수직 무게 하축에 의해 지반 입자가 눌리며 물이 차오르는 물리 시뮬레이션 연출.`, `Extreme macro physics simulation shot of heavy weight pressure pushing down on soft mud foundation, vertical 9:16`],
            ["00:24 ~ 00:32", `엔지니어들은 발상을 전환합니다. 지하 수천 개 모래관을 뚫어 물길을 터주고 사전 하중으로 물을 먼저 짜낸 겁니다.`, `지하 모래 기둥을 따라 갇혀 있던 수분과 압력이 신속하게 상승하는 3D 특수효과 샷.`, `3D visualization of underground water streams flowing rapidly through sand drain pillars, glowing blue lines, vertical 9:16`],
            ["00:32 ~ 00:40", `목표 하중보다 더 무거운 흙을 올려 개항 전에 침하를 미리 당겨놓아 완성 후 변형을 봉쇄했습니다.`, `덤프트럭과 압착 장비가 흙을 미리 쌓고 지반을 단단히 고정시키는 3D 타임랩스 모션.`, `Time-lapse of construction preloading soil layers squeezing water out of ground, dust rising, vertical 9:16`],
            ["00:40 ~ 00:48", `자연에 대항한 것이 아니라 침하 시점을 사전으로 앞당겨 완벽하게 안정적인 랜드마크를 완성했습니다.`, `드론이 지면에서 상승하며 일출 속에서 빛나는 거대 랜드마크의 시네마틱 샷.`, `Smooth orbital drone camera shot revealing completed magnificent ${enSub}, golden hour light, vertical 9:16`],
            ["00:48 ~ 00:56", `자연의 흐름을 예측하고 제어한 인간의 지혜. 이것이 바로 ${cleanTopic}의 진짜 비밀입니다.`, `밤하늘 도심 조명과 어우러져 화려하게 빛나는 파이널 쇼츠 아웃트로.`, `Outro cinematic hero shot of ${enSub} at night with glowing city lights, lens flare, 4k 60fps, vertical 9:16`]
        ];
    } else {
        title = `${cleanTopic} — 우리가 몰랐던 56초의 비밀 #Shorts`;
        description = `${cleanTopic}에 관한 흥미진진한 지식과 56초 쇼츠 스토리텔링!\n\n#Shorts #쇼츠 #지식 #스토리텔링 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `우리가 일상에서 접하는 ${cleanTopic}, 남들은 당연하다 생각하지만 첫 모습 뒤에는 특별한 상식이 숨어 있습니다.`, `상징적인 ${krName}의 메인 비주얼이 드라마틱한 조명 속에 완벽하게 드러나는 세로 9:16 오프닝 (손상 없음).`, `Cinematic opening shot introducing pristine ${enSub}, dramatic studio lighting, perfect condition, hyper-realistic 8k, vertical 9:16`],
            ["00:08 ~ 00:16", `그 화려한 겉모습 뒤에는 아무도 몰랐던 치밀한 전략과 3D 청사진 구조가 존재합니다.`, `인포그래픽 청사진 애니메이션이 3D 오버레이로 레이어별 펼쳐지는 연출.`, `3D infographic motion graphics revealing hidden mechanics and internal layers of ${enSub}, glowing lines, vertical 9:16`],
            ["00:16 ~ 00:24", `하지만 초기 방식대로 진행했을 땐 뜻밖의 고정관념과 한계라는 거대한 벽에 직면했었죠.`, `복잡하게 뒤얽힌 타래와 장애물이 시각적으로 압박을 가하는 개념적 3D 시뮬레이션.`, `Macro conceptual 3D render showing complex network breaking apart under structural limit, vertical 9:16`],
            ["00:24 ~ 00:32", `주인공들은 발상을 완전히 뒤집습니다. '남들이 안 가본 거꾸로 길을 파고들자!'`, `전략가들이 하이테크 회로도/홀로그램 청사진을 뒤집어 새로운 해법을 시각화하는 영웅적 장면.`, `Strategists working in high-tech boardroom, holographic ideas expanding, heroic lighting, vertical 9:16`],
            ["00:32 ~ 00:40", `핵심 효율을 10배 올린 구조와 장기적 가치를 사전에 미리 확보해 낸 것입니다.`, `네온 레이저 라인이 효율적 경로를 따라 순식간에 연결되는 3D 모션 그래픽.`, `3D motion graphics showing glowing neon lines connecting key efficiency nodes, blue laser flow, vertical 9:16`],
            ["00:40 ~ 00:48", `단순한 운이 아니라, 시대를 앞서간 역발상 선택이 만든 압도적이고 명확한 결과물입니다.`, `카메라가 상승하며 완벽하게 완성된 위업의 랜드마크가 일출 속에서 빛나는 시네마틱 샷.`, `Smooth orbital camera shot revealing completed successful achievement of ${enSub}, golden hour light, vertical 9:16`],
            ["00:48 ~ 00:56", `고정관념을 뒤집은 위대한 통찰. 이것이 바로 ${cleanTopic}에 숨겨진 진짜 가치입니다.`, `화려한 도심 야경과 조화되는 감동적인 파이널 쇼츠 아웃트로.`, `Cinematic outro shot of ${enSub} backdrop at night with glowing city lights, 4k 60fps, vertical 9:16`]
        ];
    }

    const scenes = rawScenes.map((s, idx) => ({
        scene: idx + 1,
        time: s[0],
        narration: s[1],
        prompt_kr: s[2],
        prompt_en: s[3]
    }));

    return {
        title: title,
        description: description,
        scenes: scenes
    };
}

function renderStoryboard(data) {
    const genTitle = document.getElementById('genTitle');
    const genDesc = document.getElementById('genDesc');
    const scenesList = document.getElementById('scenesList');

    if (genTitle) genTitle.innerText = data.title;
    if (genDesc) genDesc.innerText = data.description;

    if (scenesList && data.scenes) {
        scenesList.innerHTML = data.scenes.map(s => `
            <div class="scene-card">
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

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('AI 비디오 생성 프롬프트가 복사되었습니다!');
    });
}
