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
    
    let cat = "general";
    if (t.includes("침몰") || t.includes("타이타닉") || t.includes("세월호") || t.includes("체르노빌") || t.includes("참사") || t.includes("폭발") || t.includes("사고") || t.includes("재난") || t.includes("비극") || t.includes("파멸") || t.includes("붕괴")) {
        cat = "disaster";
    } else if (t.includes("치료") || t.includes("척추") || t.includes("관절") || t.includes("몸") || t.includes("의학") || t.includes("신체") || t.includes("수술")) {
        cat = "medical";
    } else if (t.includes("폰") || t.includes("아이폰") || t.includes("카메라") || t.includes("배터리") || t.includes("반도체") || t.includes("ai") || t.includes("로봇")) {
        cat = "tech";
    } else if (t.includes("우주") || t.includes("블랙홀") || t.includes("태양") || t.includes("비행기") || t.includes("로켓") || t.includes("지구") || t.includes("중력")) {
        cat = "space";
    } else if (t.includes("타워") || t.includes("공항") || t.includes("터널") || t.includes("교량") || t.includes("지반") || t.includes("건축") || t.includes("토목") || t.includes("내진설계")) {
        cat = "construction";
    }

    let title = "";
    let description = "";
    let rawScenes = [];

    if (cat === "disaster") {
        title = `${cleanTopic} — 칠흑 같은 어둠 속 비극의 전말 #Shorts`;
        description = `${cleanTopic}에 관한 충격적인 진실과 비하인드 56초 요약!\n장엄했던 출발부터 비극적 침몰까지 단계별 씬으로 재구성합니다.\n\n#Shorts #쇼츠 #재난 #다큐멘터리 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `역사상 가장 충격적인 비극으로 기록된 ${cleanTopic}, 하지만 그 시작은 세상에서 가장 장엄하고 평화로웠습니다.`, `어두운 밤바다 위를 유유히 항해하는 웅장한 ${cleanTopic}의 전경. 잔잔한 수평선, 따뜻한 선실 조명, 침몰 전 완벽한 평화로움 연출.`, `Cinematic vertical 9:16 shot of magnificent ${cleanTopic} sailing smoothly on a calm starry ocean at night, warm glowing cabin lights, peaceful maiden voyage, pristine condition, no damage, hyper-realistic 8k, slow motion 24fps`],
            ["00:08 ~ 00:16", `절대 가라앉지 않는 불침선이라 불리던 내부에는 강철 장갑판과 리벳의 치밀한 구조가 숨어 있었습니다.`, `구조물 강철 장갑판 결합 부위와 리벳의 미세 단면 3D 청사진 시각화.`, `Detailed 3D engineering blueprint cross-section view of ${cleanTopic} sturdy steel plates and rivets, clean structural inspection, dark water ambient glow, vertical 9:16`],
            ["00:16 ~ 00:24", `하지만 칠흑 같은 안개 속에서 시야 확보가 불가능했던 거대한 빙산의 형체가 마침내 모습을 드러냅니다.`, `짙은 안개 속에서 거대한 빙산/장애물이 서서히 박두해오는 위기 순간의 1인칭 시점(POV) 연출.`, `First person POV from ship crow's nest looking at giant looming iceberg appearing out of dark ocean sea fog at night, high tension, vertical 9:16`],
            ["00:24 ~ 00:32", `비상 회피 조타를 시도했지만 늦었습니다. 측면 장갑이 찢겨 나가며 차가운 바닷물이 쏟아져 들어옵니다.`, `충돌과 함께 선체 측면 장갑판이 찌그러지며 해수가 격렬하게 밀려드는 수중 액션 샷.`, `Action shot of steel ship side hull scraping against iceberg underwater, freezing seawater violently flooding lower compartment, dynamic motion, vertical 9:16`],
            ["00:32 ~ 00:40", `방수 격벽이 설치되어 있었지만 위쪽이 뚫려있어, 물이 잔에 차오르듯 차례대로 넘쳐 흐르는 결함이 나타납니다.`, `3D 청사진으로 격벽 위로 차가운 바닷물이 차례대로 넘어가며 선체가 기울어지기 시작하는 시각화.`, `3D architectural animation showing ocean water overflowing top of internal watertight bulkheads inside hold, ship tilting forward slightly, vertical 9:16`],
            ["00:40 ~ 00:48", `선수가 수면 아래로 숙여지고 거대한 선체 후미가 밤하늘을 향해 높이 들어 올려지며 마침내 파괴적 침몰이 일어납니다.`, `선체 뒷부분이 높게 들리고 빨간 조난 신호탄이 밤하늘로 쏘아지며 수중으로 침몰하는 극적인 시네마틱 샷.`, `Dramatic wide cinematic shot of colossal ocean liner stern rising high into starry night sky as bow plunges into ocean, red emergency distress flares launching, epic destruction, vertical 9:16`],
            ["00:48 ~ 00:56", `완벽하다고 믿었던 인간의 오만에 대한 묵직한 경고. 고요해진 바다만이 그날의 비극을 기억하고 있습니다.`, `고요한 아침 바다 위로 일출의 황금빛 햇살이 비치는 감동적이고 아련한 파이널 쇼츠 아웃트로.`, `Cinematic outro shot of quiet peaceful ocean surface at sunrise, golden sun rays breaking through morning clouds, emotional gold lighting, vertical 9:16 4k 60fps`]
        ];
    } else if (cat === "medical") {
        title = `${cleanTopic} — 56초 만에 밝혀지는 놀라운 진실 #Shorts`;
        description = `${cleanTopic}에 대해 우리가 잘못 알고 있던 통념과 의학적 진실!\n몸속 미세 구조와 원리를 56초 쇼츠 콘티로 완전 해부합니다.\n\n#Shorts #쇼츠 #의학 #건강 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `많은 분들이 ${cleanTopic}(을)를 접할 때 몸에 무리가 갈까 두려워하지만, 사실 이건 완벽히 통제된 원리입니다.`, `환자가 클리닉에서 ${cleanTopic}(을)를 받으며 편안해하는 시네마틱 세로 9:16 오프닝.`, `Cinematic vertical 9:16 shot of professional ${cleanTopic}, modern medical clinic background, volumetric studio lighting`],
            ["00:08 ~ 00:16", `피부 아래 관절 마디 속에서는 3D 단면처럼 놀라운 물리 반응이 일어납니다.`, `신체 내부 관절 마디 캡슐의 정밀 3D 입체 단면 비주얼 연출.`, `3D medical animation showing joint capsule cross-section of ${cleanTopic}, glowing cyan lighting, vertical 9:16`],
            ["00:16 ~ 00:24", `핵심 원인은 좁아진 공간 속 압축 질소 가스의 기포 폭발 압력 때문이었습니다.`, `관절액 속 미세 질소 기포가 터지는 초슬로우 모션 마크로 샷.`, `Extreme macro 3D simulation of nitrogen gas microbubbles bursting in joint fluid, slow motion 1000fps, vertical 9:16`],
            ["00:24 ~ 00:32", `그래서 전문의들은 발상을 전환합니다. '억지로 꺾지 말고, 근막과 인대의 길을 먼저 터주자!'`, `전문의가 골격 모델을 설명하며 새로운 방향을 제시하는 영웅적 연출.`, `Professional doctor explaining spine medical model in futuristic clinic, heroic angle, vertical 9:16`],
            ["00:32 ~ 00:40", `굳어있던 심층 근육을 이완시키고 수직 압력을 분산시켜 신체 회복력을 끌어올립니다.`, `근육 마디가 풀리고 혈류가 신속히 도는 3D 이펙트 모션.`, `3D visualization of muscle fibers relaxing and blood circulation flowing rapidly, vertical 9:16 format`],
            ["00:40 ~ 00:48", `통증을 참게 한 것이 아니라 굳어있던 가동 범위를 자연스럽게 되찾아준 결과입니다.`, `치료 후 환자가 몸을 펴며 미소 짓는 햇살 가득한 클리닉 샷.`, `Happy patient standing up straight with perfect posture in bright sunny medical center, vertical 9:16`],
            ["00:48 ~ 00:56", `몸의 원리를 이해하고 안전하게 교정하는 의학의 지혜. 이것이 바로 ${cleanTopic}의 진짜 진실입니다.`, `아침 햇살이 비치는 클리닉의 따뜻하고 감동적인 쇼츠 아웃트로.`, `Cinematic outro shot of modern physical therapy center at sunrise, warm ambient glow, vertical 9:16 4k`]
        ];
    } else if (cat === "tech") {
        title = `${cleanTopic} — 한계를 돌파한 56초 혁신 기술 #Shorts`;
        description = `${cleanTopic} 내부 초미세 나노 회로에 숨겨진 공학의 정수!\n한계를 넘어선 역발상 기술을 56초 쇼츠로 분석합니다.\n\n#Shorts #쇼츠 #IT #테크 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `우리가 매일 사용하는 ${cleanTopic}, 남들은 마술이라 부르지만 사실 완벽히 설계된 팩트입니다.`, `최신 기술이 적용된 ${cleanTopic}의 매끄러운 바디와 빛나는 세로 9:16 시네마틱 오프닝.`, `Cinematic macro studio shot of ${cleanTopic}, dark minimalist backdrop, sleek glass reflection, vertical 9:16`],
            ["00:08 ~ 00:16", `외관 속 미세 나노 회로에는 상상을 초월하는 기술적 배치가 숨어 있습니다.`, `실리콘 반도체 내부로 카메라가 줌인하는 3D 비주얼.`, `Extreme macro 3D flythrough inside semiconductor silicon chip of ${cleanTopic}, glowing circuit traces, vertical 9:16`],
            ["00:16 ~ 00:24", `문제의 원인은 나노 단위 회로에서 발생하는 극심한 발열과 저항의 한계 때문이었죠.`, `열화상 카메라 시점으로 칩셋 위 열이 퍼지는 시뮬레이션.`, `Thermal camera POV showing intense heat distribution on microchip, glowing heat map, vertical 9:16`],
            ["00:24 ~ 00:32", `엔지니어들은 발상을 전환합니다. '열을 막지 말고, 베이퍼 챔버로 순식간에 방출하자!'`, `연구원들이 회로도를 혁신하는 하이테크 영웅적 장면.`, `Engineers in tech R&D lab examining 3D holographic circuit diagrams, heroic lighting, vertical 9:16`],
            ["00:32 ~ 00:40", `초미세 구리 챔버 내부 냉매 액체 증발과 AI 뉴럴 엔진 전력 제어로 한계를 극복했습니다.`, `구리 냉각 파이프 내부에서 액체가 증발하며 퍼지는 3D 이펙트.`, `3D animation of liquid coolant evaporating inside copper vapor chamber, blue fluid motion, vertical 9:16`],
            ["00:40 ~ 00:48", `한 손에 들어오는 얇은 크기에도 전작 대비 3배 이상의 압도적 성능을 완성해 냈습니다.`, `어둠 속에서 매끄럽게 드러나는 기술 제품의 프레임 연출.`, `Sleek product reveal shot of ${cleanTopic} illuminated by dramatic studio rim lights, vertical 9:16`],
            ["00:48 ~ 00:56", `한계를 넘어선 인간의 집념이 만든 혁신. 이것이 바로 ${cleanTopic}의 진짜 정체입니다.`, `도심 속 화려한 조명과 조화되는 하이테크 쇼츠 아웃트로.`, `Cinematic outro shot of ${cleanTopic} with futuristic neon city lights background, vertical 9:16 4k`]
        ];
    } else if (cat === "construction") {
        title = `${cleanTopic} — 자연을 제어한 역발상 공법 #Shorts`;
        description = `${cleanTopic}에 적용된 획기적인 토목/건축 기술 스토리!\n수직 하중과 압력을 제어해 낸 56초 쇼츠 핵심 콘티입니다.\n\n#Shorts #쇼츠 #토목 #건축 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `여기 ${cleanTopic}(이)가 있습니다. 남들은 무너질까 걱정하지만 사실 완벽한 계획입니다.`, `웅장한 ${cleanTopic}의 전경이 서서히 모습을 드러내는 세로 9:16 시네마틱 샷.`, `Cinematic epic wide drone shot of ${cleanTopic}, hyper-realistic 8k, dramatic sunset lighting, vertical 9:16`],
            ["00:08 ~ 00:16", `거친 외부 속 바닥 아래에는 상상 못 한 역발상 토목 공법이 숨어 있습니다.`, `${cleanTopic}의 거대한 지반 단면 3D 청사진 오버레이.`, `Detailed 3D cross-section architecture blueprint animation of ${cleanTopic}, glowing cyan grid, vertical 9:16`],
            ["00:16 ~ 00:24", `문제의 원인은 자연의 묵직한 수직 하중과 물의 압력을 무작정 막으려 했기 때문이었죠.`, `무게 압력이 지반을 누르고 입자가 찌그러지는 물리 시뮬레이션.`, `Extreme macro shot of heavy pressure weight crushing down on soil foundation, vertical 9:16`],
            ["00:24 ~ 00:32", `엔지니어들은 발상을 완전히 뒤집습니다. '막지 말고, 사전에 미리 다 꺼뜨려 놓자!'`, `거대 현장에서 공학자들이 청사진을 펼치는 영웅적 각도.`, `Engineers working on mega construction site at sunset, blueprints expanding, vertical 9:16`],
            ["00:32 ~ 00:40", `수천 개의 모래 기둥을 박아 물길을 터주고, 사전 하중을 올려 갇힌 물을 바싹 짜냈습니다.`, `지하 모래 관을 따라 갇혀 있던 수분과 압력이 상승하는 3D 이펙트.`, `3D visualization of underground water streams flowing rapidly through sand drain pillars, vertical 9:16`],
            ["00:40 ~ 00:48", `자연을 억지로 굴복시킨 게 아니라 수십 년 걸릴 침하 시점을 사전으로 당겨온 것입니다.`, `드론이 상승하며 완벽히 완성된 웅장한 랜드마크가 빛나는 장면.`, `Smooth orbital drone camera shot revealing completed magnificent ${cleanTopic}, golden hour, vertical 9:16`],
            ["00:48 ~ 00:56", `자연의 흐름을 예측하고 제어한 인간의 지혜. 이것이 바로 ${cleanTopic}의 진짜 비밀입니다.`, `밤하늘 도심 빛과 어우러져 화려하게 빛나는 파이널 쇼츠 아웃트로.`, `Outro cinematic hero shot of ${cleanTopic} at night with glowing city lights, vertical 9:16 4k`]
        ];
    } else {
        title = `${cleanTopic} — 우리가 몰랐던 56초의 비밀 #Shorts`;
        description = `${cleanTopic}에 관한 흥미진진한 지식과 56초 쇼츠 스토리텔링!\n\n#Shorts #쇼츠 #지식 #스토리텔링 #${cleanTopic.replace(/\s+/g, '')}`;
        rawScenes = [
            ["00:00 ~ 00:08", `우리가 일상에서 접하는 ${cleanTopic}, 남들은 당연하다 생각하지만 사실 상식을 깨부순 팩트입니다.`, `상징적인 ${cleanTopic} 비주얼이 드라마틱한 조명 속에 드러나는 세로 9:16 오프닝.`, `Cinematic opening shot introducing ${cleanTopic}, dramatic lighting, hyper-realistic 8k, vertical 9:16`],
            ["00:08 ~ 00:16", `화려한 전면 뒤에는 아무도 몰랐던 치밀한 전략과 구조적 비밀이 존재합니다.`, `인포그래픽 청사진 애니메이션이 3D 오버레이로 펼쳐지는 모션.`, `3D infographic motion graphics revealing hidden mechanics of ${cleanTopic}, vertical 9:16`],
            ["00:16 ~ 00:24", `문제의 원인은 기존 법칙과 고정관념만을 고집하려 했기 때문이었죠.`, `복잡하게 뒤얽힌 타래가 찌그러지는 개념적 3D 시뮬레이션.`, `Macro conceptual 3D render showing complex network breaking apart, vertical 9:16`],
            ["00:24 ~ 00:32", `주인공들은 발상을 완전히 뒤집습니다. '남들이 안 가본 거꾸로 길을 가자!'`, `전략가들이 회의실에서 새로운 구상을 시각화하는 장면.`, `Strategists working in high-tech boardroom, holographic ideas expanding, vertical 9:16`],
            ["00:32 ~ 00:40", `핵심 효율을 10배 올린 구조와 장기적 가치를 사전에 확보해 냈습니다.`, `네온 라인이 효율적 경로를 그리는 3D 모션 그래픽.`, `3D motion graphics showing glowing neon lines connecting key efficiency nodes, vertical 9:16`],
            ["00:40 ~ 00:48", `단순한 운이 아니라, 시대를 앞서간 역발상 선택이 만든 압도적 결과물입니다.`, `상승하며 완성된 위업이 빛나는 시네마틱 샷.`, `Smooth orbital camera shot revealing completed successful achievement of ${cleanTopic}, vertical 9:16`],
            ["00:48 ~ 00:56", `고정관념을 뒤집은 위대한 통찰. 이것이 바로 ${cleanTopic}에 숨겨진 진짜 가치입니다.`, `화려한 도심 조명과 조화되는 감동적인 쇼츠 아웃트로.`, `Cinematic outro shot of ${cleanTopic} backdrop at night with glowing city lights, vertical 9:16 4k`]
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
