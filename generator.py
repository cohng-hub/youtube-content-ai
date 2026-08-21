# -*- coding: utf-8 -*-
import sys
import json
import re
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')

def detect_category(topic):
    """
    주제의 특성을 다각도로 분류하여 최적의 카테고리를 결정
    - disaster: 재난, 사고, 침몰, 비극, 파괴, 사건, 참사, 역사적 사건
    - construction: 토목, 건축, 타워, 공항, 터널, 교량, 지반, 구조물
    - medical: 의학, 치료, 인체, 관절, 척추, 장기, 수술, 질병, 건강
    - technology: IT, 전자, 반도체, 스마트폰, 배터리, AI, 로봇, 컴퓨터
    - space: 우주, 천체, 로켓, 비행기, 블랙홀, 물리, 자연
    - general: 기타 일반 지식 및 비하인드 스토리
    """
    t = topic.lower()
    
    if any(k in t for k in ['침몰', '타이타닉', '세월호', '체르노빌', '삼풍', '참사', '폭발', '화재', '사고', '재난', '비극', '파멸', '멸망', '전쟁', '붕괴']):
        return 'disaster'
    elif any(k in t for k in ['치료', '척추', '관절', '뼈', '몸', '의학', '병원', '건강', '디스크', '신체', '의료', '수술', '암', '혈관', '뇌']):
        return 'medical'
    elif any(k in t for k in ['폰', '아이폰', '갤럭시', '카메라', '반도체', '배터리', '칩', '컴퓨터', 'ai', '로봇', '소프트웨어', '디지털', '전기차']):
        return 'technology'
    elif any(k in t for k in ['우주', '블랙홀', '태양', '비행기', '로켓', '위성', '드론', '엔진', '속도', '하늘', '화성', '지구', '중력', '은하']):
        return 'space'
    elif any(k in t for k in ['타워', '공항', '터널', '교량', '지반', '건축', '토목', '내진설계', '도로', '건물', '아파트', '댐', '구조물', '해저']):
        return 'construction'
    else:
        return 'general'

def get_english_topic(topic):
    """
    주제 키워드를 영문으로 변환하여 자연스러운 AI 프롬프트에 활용
    """
    t = topic.strip()
    words_map = {
        '타이타닉': 'Titanic ocean liner',
        '침몰': 'sinking disaster',
        '세월호': 'Sewol ferry disaster',
        '체르노빌': 'Chernobyl nuclear disaster',
        '삼풍백화점': 'Sampoong building collapse',
        '롯데월드타워': 'Lotte World Tower skyscraper',
        '인천공항': 'Incheon International Airport',
        '간사이공항': 'Kansai International Airport',
        '도수치료': 'chiropractic spinal therapy',
        '경부고속도로': 'Gyeongbu Expressway',
        '해저터널': 'undersea tunnel megastructure',
        '지반': 'ground foundation',
        '내진설계': 'earthquake resistant design',
        '아이폰': 'sleek iPhone smartphone',
        '배터리': 'lithium battery module',
        '반도체': 'microchip silicon wafer',
        '우주': 'outer space galaxy',
        '블랙홀': 'black hole gravity well',
        '비행기': 'commercial passenger airplane'
    }
    
    translated = t
    for kr, en in words_map.items():
        if kr in translated:
            translated = translated.replace(kr, en)
            
    clean_en = re.sub(r'[가-힣]', '', translated).strip()
    if not clean_en:
        clean_en = "dramatic historic event"
    return clean_en

def generate_video_storyboard(topic):
    """
    유튜브 쇼츠 1분 이내 (56초 = 8초 x 7개 씬) 전용 AI 콘티 & 프롬프트 생성기
    """
    topic_clean = topic.strip()
    cat = detect_category(topic_clean)
    topic_en = get_english_topic(topic_clean)

    # 1. 쇼츠 전용 훅 제목 & 디스크립션
    if cat == 'disaster':
        title = f"{topic_clean} — 칠흑 같은 어둠 속 비극의 전말 #Shorts"
        description = f"""{topic_clean}에 관한 충격적인 진실과 비하인드 56초 요약!
작은 경고를 무시해 거대한 재앙으로 이어진 비극적 과정을 쇼츠 콘티로 전해드립니다.

#Shorts #쇼츠 #재난 #다큐멘터리 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
    elif cat == 'medical':
        title = f"{topic_clean} — 56초 만에 밝혀지는 놀라운 진실 #Shorts"
        description = f"""{topic_clean}에 대해 우리가 잘못 알고 있던 통념과 의학적 진실!
몸속 미세 구조와 원리를 56초 쇼츠 콘티로 완전 해부합니다.

#Shorts #쇼츠 #의학 #건강 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
    elif cat == 'technology':
        title = f"{topic_clean} — 한계를 돌파한 56초 혁신 기술 #Shorts"
        description = f"""{topic_clean} 내부 초미세 나노 회로에 숨겨진 공학의 정수!
한계를 넘어선 역발상 기술을 56초 쇼츠로 분석합니다.

#Shorts #쇼츠 #IT #테크 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
    elif cat == 'construction':
        title = f"{topic_clean} — 자연을 제어한 역발상 공법 #Shorts"
        description = f"""{topic_clean}에 적용된 획기적인 토목/건축 기술 스토리!
수직 하중과 압력을 제어해 낸 56초 쇼츠 핵심 콘티입니다.

#Shorts #쇼츠 #토목 #건축 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
    else:
        title = f"{topic_clean} — 우리가 몰랐던 56초의 비밀 #Shorts"
        description = f"""{topic_clean}에 관한 흥미진진한 지식과 56초 쇼츠 스토리텔링!

#Shorts #쇼츠 #지식 #스토리텔링 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""

    # 2. 쇼츠 전용 7개 씬 (56초 = 8초 x 7씬, Vertical 9:16 모바일 비율 반영)
    if cat == 'disaster':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"역사상 가장 충격적인 비극으로 기록된 {topic_clean}, 그 장엄했던 시작 뒤에는 차가운 오만이 숨어 있었습니다.",
             f"어두운 밤바다 속 웅장하게 떠 있는 {topic_clean}의 실체. 수평선과 차가운 달빛, 세로 9:16 쇼츠 구도.",
             f"Cinematic vertical 9:16 shot of magnificent {topic_en} under dark starry ocean night, cold moonlight rays, 8k, mobile shorts scale"),
            
            ("00:08 ~ 00:16",
             "겉보기엔 완벽해 보였지만, 내부의 미세한 결함과 경고 무시가 비극의 불씨가 되기 시작합니다.",
             "구조물 강철 장갑판 결합 부위의 미세 단면 3D 그래픽 시각화.",
             f"Detailed 3D cross-section view of {topic_en} steel plates under pressure, dark water ambient glow, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "짙은 안개 속에서 거대한 위협의 형체가 마침내 모습을 드러내며 피할 수 없는 충돌이 일어납니다.",
             "안개 속에서 거대한 빙산/장애물이 박두해오는 위기 순간의 1인칭 POV 연출.",
             "First person POV looking at massive terrifying iceberg appearing out of sea fog, extreme tension, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "격벽이 설치되어 있었지만 위쪽이 뚫려있어, 바닷물이 잔에 차오르듯 차례대로 넘쳐 흐르는 결함이 노출됩니다.",
             "3D 청사진으로 차가운 바닷물이 격벽을 차례로 넘어가 선체가 기울어지는 모션.",
             "3D blueprint animation of ocean water overflowing watertight bulkheads in ship hold, vertical 9:16 shot"),
            
            ("00:32 ~ 00:40",
             "거대한 선체 후미가 어두운 하늘을 향해 들어 올려지며, 응력을 견디지 못하고 중앙에서 두 동강 파단됩니다.",
             "선체가 바다 아래로 기울고 중앙이 두 동강 나는 극적인 destruction 파괴 씬.",
             "Epic dramatic destruction shot of ocean liner breaking in half, ocean splash, red flares, vertical 9:16 mobile format"),
            
            ("00:40 ~ 00:48",
             "칠흑 같이 차가운 심해 4,000m 바닥을 향해 수만 톤의 잔해들이 어둠 속으로 가라앉아 멈춥니다.",
             "심해 어둠 속으로 잔해들이 가라앉는 해저 카메라 시점 연출.",
             "Underwater camera shot following ship stern plunging down into abyssal dark ocean floor, bioluminescent depth, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"완벽하다고 믿었던 인간의 오만에 대한 경고. 이것이 오늘날까지 우리가 {topic_clean}(을)를 기억하는 이유입니다.",
             "고요한 아침 바다 위로 일출의 황금빛 햇살이 비치는 감동적인 파이널 쇼츠 아웃트로.",
             "Cinematic outro shot of quiet ocean surface at sunrise, golden sun rays, emotional lighting, vertical 9:16 4k 60fps")
        ]

    elif cat == 'medical':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"많은 분들이 {topic_clean}(을)를 접할 때 몸에 무리가 갈까 두려워하지만, 사실 이건 완벽히 통제된 원리입니다.",
             f"환자가 클리닉에서 {topic_clean}(을)를 받으며 편안해하는 시네마틱 세로 9:16 오프닝.",
             f"Cinematic vertical 9:16 shot of professional {topic_en}, modern medical clinic background, volumetric studio lighting"),
            
            ("00:08 ~ 00:16",
             "피부 아래 관절 마디 속에서는 3D 단면처럼 놀라운 물리 반응이 일어납니다.",
             "신체 내부 관절 마디 캡슐의 정밀 3D 입체 단면 비주얼 연출.",
             f"3D medical animation showing joint capsule cross-section of {topic_en}, glowing cyan lighting, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "핵심 원인은 좁아진 공간 속 압축 질소 가스의 기포 폭발 압력 때문이었습니다.",
             "관절액 속 미세 질소 기포가 터지는 초슬로우 모션 마크로 샷.",
             "Extreme macro 3D simulation of nitrogen gas microbubbles bursting in joint fluid, slow motion 1000fps, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "그래서 전문의들은 발상을 전환합니다. '억지로 꺾지 말고, 근막과 인대의 길을 먼저 터주자!'",
             "전문의가 골격 모델을 설명하며 새로운 방향을 제시하는 영웅적 연출.",
             "Professional doctor explaining spine medical model in futuristic clinic, heroic angle, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "굳어있던 심층 근육을 이완시키고 수직 압력을 분산시켜 신체 회복력을 끌어올립니다.",
             "근육 마디가 풀리고 혈류가 신속히 도는 3D 이펙트 모션.",
             "3D visualization of muscle fibers relaxing and blood circulation flowing rapidly, vertical 9:16 format"),
            
            ("00:40 ~ 00:48",
             "통증을 참게 한 것이 아니라 굳어있던 가동 범위를 자연스럽게 되찾아준 결과입니다.",
             "치료 후 환자가 몸을 펴며 미소 짓는 햇살 가득한 클리닉 샷.",
             "Happy patient standing up straight with perfect posture in bright sunny medical center, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"몸의 원리를 이해하고 안전하게 교정하는 의학의 지혜. 이것이 바로 {topic_clean}의 진짜 진실입니다.",
             "아침 햇살이 비치는 클리닉의 따뜻하고 감동적인 쇼츠 아웃트로.",
             "Cinematic outro shot of modern physical therapy center at sunrise, warm ambient glow, vertical 9:16 4k")
        ]

    elif cat == 'technology':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"우리가 매일 사용하는 {topic_clean}, 남들은 마술이라 부르지만 사실 완벽히 설계된 팩트입니다.",
             f"최신 기술이 적용된 {topic_clean}의 매끄러운 바디와 빛나는 세로 9:16 시네마틱 오프닝.",
             f"Cinematic macro studio shot of {topic_en}, dark minimalist backdrop, sleek glass reflection, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "외관 속 미세 나노 회로에는 상상을 초월하는 기술적 배치가 숨어 있습니다.",
             "실리콘 반도체 내부로 카메라가 줌인하는 3D 비주얼.",
             f"Extreme macro 3D flythrough inside semiconductor silicon chip of {topic_en}, glowing circuit traces, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "문제의 원인은 나노 단위 회로에서 발생하는 극심한 발열과 저항의 한계 때문이었죠.",
             "열화상 카메라 시점으로 칩셋 위 열이 퍼지는 시뮬레이션.",
             "Thermal camera POV showing intense heat distribution on microchip, glowing heat map, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "엔지니어들은 발상을 전환합니다. '열을 막지 말고, 베이퍼 챔버로 순식간에 방출하자!'",
             "연구원들이 회로도를 혁신하는 하이테크 영웅적 장면.",
             "Engineers in tech R&D lab examining 3D holographic circuit diagrams, heroic lighting, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "초미세 구리 챔버 내부 냉매 액체 증발과 AI 뉴럴 엔진 전력 제어로 한계를 극복했습니다.",
             "구리 냉각 파이프 내부에서 액체가 증발하며 퍼지는 3D 이펙트.",
             "3D animation of liquid coolant evaporating inside copper vapor chamber, blue fluid motion, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "한 손에 들어오는 얇은 크기에도 전작 대비 3배 이상의 압도적 성능을 완성해 냈습니다.",
             "어둠 속에서 매끄럽게 드러나는 기술 제품의 프레임 연출.",
             f"Sleek product reveal shot of {topic_en} illuminated by dramatic studio rim lights, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"한계를 넘어선 인간의 집념이 만든 혁신. 이것이 바로 {topic_clean}의 진짜 정체입니다.",
             "도심 속 화려한 조명과 조화되는 하이테크 쇼츠 아웃트로.",
             f"Cinematic outro shot of {topic_en} with futuristic neon city lights background, vertical 9:16 4k")
        ]

    elif cat == 'space':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"광활한 우주에 존재하는 {topic_clean}, 인간의 인식을 뛰어넘는 위대한 현상입니다.",
             f"우주 공간 속 아름답게 빛나는 {topic_clean}의 세로 9:16 시네마틱 샷.",
             f"Cinematic epic wide space shot of {topic_en}, dark cosmos nebula background, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "그 장엄한 풍경 속에는 미세 입자와 물리 법칙이 얽힌 비밀 구조가 숨어 있습니다.",
             "우주 중력장과 입자 상호작용의 3D 시뮬레이션.",
             "3D physics astrophysics simulation showing gravitational field and particle interaction, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "문제의 핵심은 막을 수 없는 상상을 초월하는 중력과 광속 입자 에너지 때문이었죠.",
             "중력장 주위로 빛이 꺾이는 초슬로우 모션 효과.",
             "Extreme slow motion visual of light bending around gravitational event horizon, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "물리학자들은 발상을 전환합니다. '충돌하지 말고 궤도 궤적을 타고 흐르게 만들자!'",
             "천문대에서 궤적을 분석하는 과학자들의 비주얼.",
             "Astrophysicists analyzing 3D orbital trajectory hologram in high-tech observatory, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "양자 센서 측정과 스윙바이 공법을 활용해 자체 연료 없이 속도를 폭발적으로 높입니다.",
             "우주선이 행성 인력을 타며 고속 가속하는 시뮬레이션.",
             "Spacecraft performing swing-by gravity assist maneuver around giant planet, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "거대한 힘에 대항한 것이 아니라 그 인력의 흐름에 몸을 실어 목적지에 도달한 겁니다.",
             "행성에 도착하며 황금빛 오로라가 빛나는 장엄한 신체 샷.",
             "Spacecraft reaching destination alien planet with glowing golden aurora, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"미지의 영역을 밝혀낸 인류 탐구의 지혜. 이것이 바로 {topic_clean}의 진짜 진실입니다.",
             "은하수의 푸른빛 조명이 감도는 우주 쇼츠 아웃트로.",
             "Cinematic outro shot of Milky Way galaxy with glowing starlight, cosmic ambiance, vertical 9:16 4k")
        ]

    elif cat == 'construction':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"여기 {topic_clean}(이)가 있습니다. 남들은 무너질까 걱정하지만 사실 완벽한 계획입니다.",
             f"웅장한 {topic_clean}의 전경이 서서히 모습을 드러내는 세로 9:16 시네마틱 샷.",
             f"Cinematic epic wide drone shot of {topic_en}, hyper-realistic 8k, dramatic sunset lighting, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "거친 외부 속 바닥 아래에는 상상 못 한 역발상 토목 공법이 숨어 있습니다.",
             f"{topic_clean}의 거대한 지반 단면 3D 청사진 오버레이.",
             f"Detailed 3D cross-section architecture blueprint animation of {topic_en}, glowing cyan grid, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "문제의 원인은 자연의 묵직한 수직 하중과 물의 압력을 무작정 막으려 했기 때문이었죠.",
             "무게 압력이 지반을 누르고 입자가 찌그러지는 물리 시뮬레이션.",
             "Extreme macro shot of heavy pressure weight crushing down on soil foundation, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "엔지니어들은 발상을 완전히 뒤집습니다. '막지 말고, 사전에 미리 다 꺼뜨려 놓자!'",
             "거대 현장에서 공학자들이 청사진을 펼치는 영웅적 각도.",
             "Engineers working on mega construction site at sunset, blueprints expanding, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "수천 개의 모래 기둥을 박아 물길을 터주고, 사전 하중을 올려 갇힌 물을 바싹 짜냈습니다.",
             "지하 모래 관을 따라 갇혀 있던 수분과 압력이 상승하는 3D 이펙트.",
             "3D visualization of underground water streams flowing rapidly through sand drain pillars, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "자연을 억지로 굴복시킨 게 아니라 수십 년 걸릴 침하 시점을 사전으로 당겨온 것입니다.",
             "드론이 상승하며 완벽히 완성된 웅장한 랜드마크가 빛나는 장면.",
             f"Smooth orbital drone camera shot revealing completed magnificent {topic_en}, golden hour, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"자연의 흐름을 예측하고 제어한 인간의 지혜. 이것이 바로 {topic_clean}의 진짜 비밀입니다.",
             f"밤하늘 도심 빛과 어우러져 화려하게 빛나는 파이널 쇼츠 아웃트로.",
             f"Outro cinematic hero shot of {topic_en} at night with glowing city lights, vertical 9:16 4k")
        ]

    else:
        # General / Business / History
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"우리가 일상에서 접하는 {topic_clean}, 남들은 당연하다 생각하지만 사실 상식을 깨부순 팩트입니다.",
             f"상징적인 {topic_clean} 비주얼이 드라마틱한 조명 속에 드러나는 세로 9:16 오프닝.",
             f"Cinematic opening shot introducing {topic_en}, dramatic lighting, hyper-realistic 8k, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "화려한 전면 뒤에는 아무도 몰랐던 치밀한 전략과 구조적 비밀이 존재합니다.",
             "인포그래픽 청사진 애니메이션이 3D 오버레이로 펼쳐지는 모션.",
             f"3D infographic motion graphics revealing hidden mechanics of {topic_en}, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "문제의 원인은 기존 법칙과 고정관념만을 고집하려 했기 때문이었죠.",
             "복잡하게 뒤얽힌 타래가 찌그러지는 개념적 3D 시뮬레이션.",
             "Macro conceptual 3D render showing complex network breaking apart, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "주인공들은 발상을 완전히 뒤집습니다. '남들이 안 가본 거꾸로 길을 가자!'",
             "전략가들이 회의실에서 새로운 구상을 시각화하는 장면.",
             "Strategists working in high-tech boardroom, holographic ideas expanding, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "핵심 효율을 10배 올린 구조와 장기적 가치를 사전에 확보해 냈습니다.",
             "네온 라인이 효율적 경로를 그리는 3D 모션 그래픽.",
             "3D motion graphics showing glowing neon lines connecting key efficiency nodes, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "단순한 운이 아니라, 시대를 앞서간 역발상 선택이 만든 압도적 결과물입니다.",
             "상승하며 완성된 위업이 빛나는 시네마틱 샷.",
             f"Smooth orbital camera shot revealing completed successful achievement of {topic_en}, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"고정관념을 뒤집은 위대한 통찰. 이것이 바로 {topic_clean}에 숨겨진 진짜 가치입니다.",
             "화려한 도심 조명과 조화되는 감동적인 쇼츠 아웃트로.",
             f"Cinematic outro shot of {topic_en} backdrop at night with glowing city lights, vertical 9:16 4k")
        ]

    scenes = []
    for idx, (time_range, narr, p_kr, p_en) in enumerate(raw_scenes, 1):
        scenes.append({
            "scene": idx,
            "time": time_range,
            "narration": narr,
            "prompt_kr": p_kr,
            "prompt_en": p_en
        })

    return {
        "topic": topic_clean,
        "category": cat,
        "title": title,
        "description": description,
        "total_scenes": len(scenes),
        "total_duration": "00:56 (유튜브 쇼츠 규격 1분 이내 / 8초 x 7개 씬)",
        "scenes": scenes
    }

if __name__ == "__main__":
    topic_input = sys.argv[1] if len(sys.argv) > 1 else input("생성할 주제 입력: ").strip()
    if not topic_input:
        topic_input = "타이타닉 침몰 과정"
    
    result = generate_video_storyboard(topic_input)
    
    print(f"\n========================================================")
    print(f"🎬 [유튜브 쇼츠 1분 이내 전용 AI 콘티 & 8초 프롬프트 생성 결과]")
    print(f"========================================================\n")
    print(f"⏱️ 전체 분량: {result['total_duration']}\n")
    print(f"📌 최적화 제목: {result['title']}\n")
    print(f"📝 디스크립션:\n{result['description']}\n")
    print(f"⏱️ 8초 단위 쇼츠 씬 & 비디오 생성 프롬프트 목록:\n")
    
    for s in result['scenes']:
        print(f"--------------------------------------------------------")
        print(f"🎬 Scene {s['scene']} [{s['time']}]")
        print(f"🗣️ 자막 대사: {s['narration']}")
        print(f"🎨 Visual Description: {s['prompt_kr']}")
        print(f"🤖 AI Video Prompt (Runway/Luma/Sora - 9:16 Shorts):")
        print(f"   {s['prompt_en']}")
    print(f"--------------------------------------------------------\n")
    
    output_filename = f"콘티_{re.sub(r'[^a-zA-Z0-9가-힣]', '_', topic_input)}.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"💾 JSON 콘티 저장 완료: {output_filename}")
