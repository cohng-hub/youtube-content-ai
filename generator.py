# -*- coding: utf-8 -*-
import sys
import json
import re
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')

def detect_category(topic):
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
    t = topic.strip()
    words_map = {
        '타이타닉': 'Titanic ocean liner',
        '침몰': 'sinking disaster',
        '세월호': 'Sewol ferry',
        '체르노빌': 'Chernobyl facility',
        '삼풍백화점': 'Sampoong building',
        '롯데월드타워': 'Lotte World Tower skyscraper',
        '인천공항': 'Incheon International Airport',
        '간사이공항': 'Kansai International Airport',
        '도수치료': 'chiropractic spinal therapy',
        '경부고속도로': 'Gyeongbu Expressway',
        '해저터널': 'undersea tunnel megastructure',
        '지반': 'ground foundation',
        '내진설계': 'earthquake resistant structure',
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
        clean_en = "subject"
    return clean_en

def generate_video_storyboard(topic):
    """
    모든 주제에 대해 100% 동일한 7단계 기승전결 서사 템포(56초 / 8초x7씬) 적용 Engine:
    - 씬 1: [평화로운 출발/완벽한 상태] (조기 파괴/결과 발생 금지)
    - 씬 2: [내부 3D 단면/구조적 메커니즘]
    - 씬 3: [위기 고조/원인 발생]
    - 씬 4: [핵심 물리 충돌/원리 반응]
    - 씬 5: [기술적 해결/격벽·물길·열방출 공법]
    - 씬 6: [극적 클라이맥스 피크]
    - 씬 7: [여운 아웃트로/평화로운 마무리]
    """
    topic_clean = topic.strip()
    cat = detect_category(topic_clean)
    topic_en = get_english_topic(topic_clean)

    if cat == 'disaster':
        title = f"{topic_clean} — 칠흑 같은 어둠 속 비극의 전말 #Shorts"
        description = f"""{topic_clean}에 관한 충격적인 진실과 비하인드 56초 요약!
장엄했던 출발부터 비극적 침몰까지 단계별 씬으로 재구성합니다.

#Shorts #쇼츠 #재난 #다큐멘터리 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"역사상 가장 충격적인 비극으로 기록된 {topic_clean}, 하지만 그 시작은 세상에서 가장 장엄하고 평화로웠습니다.",
             f"어두운 밤바다 위를 유유히 항해하는 웅장한 {topic_clean}의 전경. 잔잔한 수평선, 따뜻한 선실 조명, 침몰 전 완벽한 평화 연출.",
             f"Cinematic vertical 9:16 shot of magnificent {topic_en} sailing smoothly on a calm starry ocean at night, warm glowing cabin lights, peaceful maiden voyage, pristine condition, no damage, hyper-realistic 8k, slow motion 24fps"),
            
            ("00:08 ~ 00:16",
             "절대 가라앉지 않는 불침선이라 불리던 내부에는 강철 장갑판과 리벳의 치밀한 구조가 숨어 있었습니다.",
             "구조물 강철 장갑판 결합 부위와 리벳의 미세 단면 3D 청사진 시각화.",
             f"Detailed 3D engineering blueprint cross-section view of {topic_en} sturdy steel plates and rivets, clean structural inspection, dark water ambient glow, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "하지만 칠흑 같은 안개 속에서 시야 확보가 불가능했던 거대한 빙산의 형체가 마침내 모습을 드러냅니다.",
             "짙은 안개 속에서 거대한 빙산/장애물이 서서히 박두해오는 위기 순간의 1인칭 시점(POV) 연출.",
             "First person POV from ship crow's nest looking at giant looming iceberg appearing out of dark ocean sea fog at night, high tension, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "비상 회피 조타를 시도했지만 늦었습니다. 측면 장갑이 찢겨 나가며 차가운 바닷물이 쏟아져 들어옵니다.",
             "충돌과 함께 선체 측면 장갑판이 찌그러지며 해수가 격렬하게 밀려드는 수중 액션 샷.",
             "Action shot of steel ship side hull scraping against iceberg underwater, freezing seawater violently flooding lower compartment, dynamic motion, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "방수 격벽이 설치되어 있었지만 위쪽이 뚫려있어, 물이 잔에 차오르듯 차례대로 넘쳐 흐르는 결함이 나타납니다.",
             "3D 청사진으로 격벽 위로 차가운 바닷물이 차례대로 넘어가며 선체가 기울어지기 시작하는 시각화.",
             "3D architectural animation showing ocean water overflowing top of internal watertight bulkheads inside hold, ship tilting forward slightly, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "선수가 수면 아래로 숙여지고 거대한 선체 후미가 밤하늘을 향해 높이 들어 올려지며 마침내 파괴적 침몰이 일어납니다.",
             "선체 뒷부분이 높게 들리고 빨간 조난 신호탄이 밤하늘로 쏘아지며 수중으로 침몰하는 극적인 시네마틱 샷.",
             "Dramatic wide cinematic shot of colossal ocean liner stern rising high into starry night sky as bow plunges into ocean, red emergency distress flares launching, epic destruction, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"완벽하다고 믿었던 인간의 오만에 대한 묵직한 경고. 고요해진 바다만이 그날의 비극을 기억하고 있습니다.",
             "고요한 아침 바다 위로 일출의 황금빛 햇살이 비치는 감동적이고 아련한 파이널 쇼츠 아웃트로.",
             "Cinematic outro shot of quiet peaceful ocean surface at sunrise, golden sun rays breaking through morning clouds, emotional gold lighting, vertical 9:16 4k 60fps")
        ]

    elif cat == 'medical':
        title = f"{topic_clean} — 56초 만에 밝혀지는 놀라운 진실 #Shorts"
        description = f"""{topic_clean}에 대해 우리가 잘못 알고 있던 통념과 의학적 진실!
몸속 미세 구조와 원리를 56초 쇼츠 콘티로 완전 해부합니다.

#Shorts #쇼츠 #의학 #건강 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"많은 분들이 {topic_clean}(을)를 접할 때 몸에 무리가 갈까 두려워하지만, 사실 치료 전 몸상태는 완벽히 통제 가능합니다.",
             f"환자가 밝고 편안한 전문 클리닉에 들어서며 안정된 미소를 지어 보이는 깨끗한 오프닝.",
             f"Cinematic vertical 9:16 shot of modern bright medical clinic, patient walking in comfortably, healthy environment, no pain, warm ambient studio lighting, hyper-realistic 8k"),
            
            ("00:08 ~ 00:16",
             "피부 아래 관절 마디 속에서는 정밀 3D 단면처럼 관절액과 캡슐이 정밀하게 배치되어 있습니다.",
             "신체 내부 척추 및 관절 마디 캡슐의 정밀 3D 입체 단면 비주얼 연출.",
             f"Detailed 3D medical cross-section animation of healthy joint capsule and cartilage of {topic_en}, glowing cyan blueprint style, Octane render, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "하지만 잘못된 자세나 무리한 마찰이 지속되면 캡슐 공간 내부의 기포 압력이 상승하게 됩니다.",
             "관절 마디 사이 좁아진 공간과 질소 가스 기포가 압축되는 긴장감 있는 마크로 연출.",
             "Macro shot of nitrogen gas microbubbles building up pressure inside joint capsule fluid under physical stress, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "전문의가 순간적인 수직 교정을 가하면, 캡슐 속 기포가 기분 좋게 터지며 마침내 압력이 파열 해소됩니다.",
             "관절액 속 미세 질소 기포가 터지며 시원한 인체 파형 이펙트가 퍼지는 초슬로우 모션 마크로 샷.",
             "Extreme macro 3D simulation of nitrogen gas microbubbles bursting in joint fluid, releasing pressure, cyan energy wave, slow motion 1000fps, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "굳어있던 근막과 수직 압력이 순식간에 이완되며 주변 신경과 혈관의 순환이 재개됩니다.",
             "근육 마디가 유연하게 풀어지며 혈관 속 혈류가 푸르고 붉게 신속히 도는 3D 이펙트 모션.",
             "3D visualization of muscle fibers relaxing smoothly and blood circulation flowing rapidly, bio-mechanical simulation, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "통증을 참고 참던 가동 범위를 회복하여 신체 불균형이 완벽하게 가벼워집니다.",
             "교정을 마친 환자가 가볍게 허리와 어깨를 펴며 시원해하는 클리닉 샷.",
             "Happy patient standing up straight with perfect aligned posture in bright sunny medical center, cinematic flare, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"몸의 원리를 이해하고 안전하게 교정하는 의학의 지혜. 이것이 바로 {topic_clean}의 진짜 진실입니다.",
             "아침 햇살이 비치는 클리닉의 따뜻하고 감동적인 쇼츠 파이널 아웃트로.",
             "Cinematic outro shot of modern physical therapy clinic at sunrise, warm ambient glow, vertical 9:16 4k 60fps")
        ]

    elif cat == 'technology':
        title = f"{topic_clean} — 한계를 돌파한 56초 혁신 기술 #Shorts"
        description = f"""{topic_clean} 내부 초미세 나노 회로에 숨겨진 공학의 정수!
한계를 넘어선 역발상 기술을 56초 쇼츠로 분석합니다.

#Shorts #쇼츠 #IT #테크 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"우리가 매일 사용하는 {topic_clean}, 손끝에 닿는 매끈한 외관 뒤에는 완벽하게 계산된 공학이 존재합니다.",
             f"최신 기술이 적용된 {topic_clean}의 깨끗하고 매끄러운 완제품 바디가 빛나는 세로 9:16 스튜디오 오프닝 (손상 없음).",
             f"Cinematic macro studio shot of pristine {topic_en}, perfect condition, sleek glass metallic reflection, dark minimalist studio, hyper-realistic 8k, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "얇은 외관 속 실리콘 반도체 내부에는 나노 단위 회로와 트랜지스터가 치밀하게 늘어서 있습니다.",
             "실리콘 반도체 칩셋 내부로 카메라가 정밀하게 줌인하는 3D 입체 청사진 연출.",
             f"Extreme macro 3D flythrough inside semiconductor silicon chip of {topic_en}, glowing blue circuit traces, Octane render, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "하지만 고성능 작업 시 나노 회로에 전류가 집중되면 극심한 발열과 전력 저항의 한계에 부딪히게 됩니다.",
             "열화상 카메라 시점으로 칩셋 중심부에 열기가 붉게 오르는 과부하 시뮬레이션 연출.",
             "Thermal camera POV showing intense heat map building up on electronic microchip core, glowing yellow and red heat, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "엔지니어들은 발상을 전환합니다. 두께 0.1mm 구리 베이퍼 챔버 내부에서 냉매 액체가 열을 뺏어 기화되게 만든 거죠.",
             "구리 냉각 파이프 내부에서 냉매 액체가 끓어오르며 열을 방출하고 퍼지는 3D 액션 샷.",
             "3D liquid physics animation of refrigerant fluid evaporating inside copper vapor chamber, cool blue wave absorbing heat, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "동시에 AI 뉴럴 엔진 알고리즘이 초당 60회 전력을 분산 제어하여 과열을 순식간에 억제합니다.",
             "AI 칩셋 중심부에서 푸른 에너지 벡터가 발산되며 전체 회로 온도를 내려놓는 3D 이펙트 모션.",
             "Glowing AI processor core pulsating with blue light vectors, rerouting power across circuit board, temperature dropping, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "덕분에 작고 얇은 폼팩터에서도 전작 대비 3배 이상의 압도적이고 안정적인 성능을 완성해 냅니다.",
             "스튜디오 림 조명 아래 매끄럽게 돌아가며 완벽한 성능을 과시하는 제품 리빌 샷.",
             f"Sleek product reveal shot of {topic_en} rotating smoothly under dramatic studio rim lights, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"한계를 넘어선 인간의 집념이 만든 혁신. 이것이 바로 {topic_clean}의 진짜 정체입니다.",
             "도심 속 화려한 네온 조명과 조화되는 하이테크 감성 쇼츠 파이널 아웃트로.",
             f"Cinematic outro shot of {topic_en} backdrop at night with glowing neon city lights, 4k 60fps, vertical 9:16")
        ]

    elif cat == 'space':
        title = f"{topic_clean} — 우리가 몰랐던 56초의 우주 비밀 #Shorts"
        description = f"""{topic_clean}에 작용하는 우주와 물리 법칙의 비밀!
미지의 영역을 56초 쇼츠 콘티로 밝혀냅니다.

#Shorts #쇼츠 #우주 #과학 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"광활한 우주 속에 우뚝 선 {topic_clean}, 순수한 고요함 속에서 웅장하게 빛나고 있습니다.",
             f"칠흑 같은 별빛 밤하늘 아래 장엄하고 깨끗하게 솟아 있는 {topic_clean}의 세로 9:16 우주 오프닝 (손상 없음).",
             f"Cinematic epic wide space shot of pristine {topic_en}, dark cosmos nebula backdrop, starlight glow, perfect condition, hyper-realistic 8k, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "그 거대한 풍경 속 바닥과 궤도에는 중력장과 입자가 얽힌 미세한 물리 공식이 작용하고 있습니다.",
             "우주 중력장 격자와 파티클 입자 상호작용의 정밀 3D 시뮬레이션 연출.",
             "Detailed 3D physics simulation showing gravitational field mesh and particle interaction lines, cyan grid, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "하지만 거대한 중력 웰 중심에 가까워질수록 공간 왜곡과 엄청난 압력이 위협으로 다가옵니다.",
             "중력장 중심부로 공간과 빛이 꺾여 들어가며 발생하는 긴장감 있는 마크로 연출.",
             "Visual simulation of space-time warping and light bending around high gravity center, high tension cosmic atmospheric effect, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "물리학자들은 발상을 전환합니다. 중력에 직접 충돌하지 않고 인력의 궤적을 타고 흐르는 스윙바이 항법을 사용한 것이죠.",
             "우주선/물체가 행성 인력 곡선을 따라 가속하며 궤도를 선회하는 3D 물리 액션 샷.",
             "3D motion simulation of spacecraft performing swing-by gravity assist trajectory around giant planet, accelerating smoothly, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "양자 센서가 0.001초 단위로 오차를 수정하며 거대한 자연의 힘을 오히려 추진력으로 탈바꿈시킵니다.",
             "양자 파장 레이저 궤적이 형성되며 속도가 폭발적으로 올라가는 3D 파티클 이펙트 모션.",
             "3D quantum vector rays forming smooth accelerated orbital paths, bright energy trail in deep space, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "자연에 맞선 것이 아니라 인력의 흐름을 지혜롭게 타고 마침내 안전하게 목적지에 도달합니다.",
             "행성의 황금빛 오로라 조명 속에서 웅장하게 선회하는 우주 비주얼 샷.",
             "Spacecraft reaching destination planet surrounded by magnificent glowing golden aurora, breathtaking view, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"미지의 영역을 밝혀낸 인류 탐구의 지혜. 이것이 바로 {topic_clean}의 진짜 진실입니다.",
             "은하수의 푸른빛 별빛 조명이 감도는 장엄한 파이널 쇼츠 아웃트로.",
             "Cinematic outro shot of Milky Way galaxy with glowing starlight, warm cosmic ambiance, 4k 60fps, vertical 9:16")
        ]

    elif cat == 'construction':
        title = f"{topic_clean} — 자연을 제어한 역발상 공법 #Shorts"
        description = f"""{topic_clean}에 적용된 획기적인 토목/건축 기술 스토리!
수직 하중과 압력을 제어해 낸 56초 쇼츠 핵심 콘티입니다.

#Shorts #쇼츠 #토목 #건축 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"여기 {topic_clean}(이)가 있습니다. 남들은 무너질까 걱정하지만, 완성된 구조물은 장엄하게 서 있습니다.",
             f"노을빛 아래 웅장하게 스카이라인을 이루고 있는 {topic_clean}의 시네마틱 세로 9:16 드론 오프닝 (손상 없음).",
             f"Cinematic epic wide drone shot of magnificent {topic_en}, perfect standing condition, hyper-realistic 8k, dramatic sunset lighting, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "거친 외부 속 바닥 아래 지반에는 우리가 몰랐던 치밀한 토목 3D 구조가 설치되어 있습니다.",
             f"{topic_clean}의 거대한 지반 단면과 지하 모래 기둥/내진 댐퍼의 3D 청사진 오버레이.",
             f"Detailed 3D cross-section architecture blueprint animation of {topic_en} ground foundation, glowing cyan grid, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "원래 이 땅은 수십 톤의 하중을 누르면 물이 천천히 빠져나가며 수십 년간 꺼지는 치명적 진흙 지반이었죠.",
             "수직 무게 하축에 의해 지반 입자가 눌리며 물이 차오르는 물리 시뮬레이션 연출.",
             "Extreme macro physics simulation shot of heavy weight pressure pushing down on soft mud foundation, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "엔지니어들은 발상을 전환합니다. 지하 수천 개 모래관을 뚫어 물길을 터주고 사전 하중으로 물을 먼저 짜낸 겁니다.",
             "지하 모래 기둥을 따라 갇혀 있던 수분과 압력이 신속하게 상승하는 3D 특수효과 샷.",
             "3D visualization of underground water streams flowing rapidly through sand drain pillars, glowing blue lines, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "목표 하중보다 더 무거운 흙을 올려 개항 전에 침하를 미리 당겨놓아 완성 후 변형을 봉쇄했습니다.",
             "덤프트럭과 압착 장비가 흙을 미리 쌓고 지반을 단단히 고정시키는 3D 타임랩스 모션.",
             "Time-lapse of construction preloading soil layers squeezing water out of ground, dust rising, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "자연에 대항한 것이 아니라 침하 시점을 사전으로 앞당겨 완벽하게 안정적인 랜드마크를 완성했습니다.",
             "드론이 지면에서 상승하며 일출 속에서 빛나는 거대 랜드마크의 시네마틱 샷.",
             f"Smooth orbital drone camera shot revealing completed magnificent {topic_en}, golden hour light, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"자연의 흐름을 예측하고 제어한 인간의 지혜. 이것이 바로 {topic_clean}의 진짜 비밀입니다.",
             "밤하늘 도심 조명과 어우러져 화려하게 빛나는 파이널 쇼츠 아웃트로.",
             f"Outro cinematic hero shot of {topic_en} at night with glowing city lights, lens flare, 4k 60fps, vertical 9:16")
        ]

    else:
        title = f"{topic_clean} — 우리가 몰랐던 56초의 비밀 #Shorts"
        description = f"""{topic_clean}에 관한 흥미진진한 지식과 56초 쇼츠 스토리텔링!

#Shorts #쇼츠 #지식 #스토리텔링 #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)}
"""
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"우리가 일상에서 접하는 {topic_clean}, 남들은 당연하다 생각하지만 첫 모습 뒤에는 특별한 상식이 숨어 있습니다.",
             f"상징적인 {topic_clean}의 메인 비주얼이 드라마틱한 조명 속에 완벽하게 드러나는 세로 9:16 오프닝 (손상 없음).",
             f"Cinematic opening shot introducing pristine {topic_en}, dramatic studio lighting, perfect condition, hyper-realistic 8k, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "그 화려한 겉모습 뒤에는 아무도 몰랐던 치밀한 전략과 3D 청사진 구조가 존재합니다.",
             "인포그래픽 청사진 애니메이션이 3D 오버레이로 레이어별 펼쳐지는 연출.",
             f"3D infographic motion graphics revealing hidden mechanics and internal layers of {topic_en}, glowing lines, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "하지만 초기 방식대로 진행했을 땐 뜻밖의 고정관념과 한계라는 거대한 벽에 직면했었죠.",
             "복잡하게 뒤얽힌 타래와 장애물이 시각적으로 압박을 가하는 개념적 3D 시뮬레이션.",
             "Macro conceptual 3D render showing complex network breaking apart under structural limit, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "주인공들은 발상을 완전히 뒤집습니다. '남들이 안 가본 거꾸로 길을 파고들자!'",
             "전략가들이 하이테크 회로도/홀로그램 청사진을 뒤집어 새로운 해법을 시각화하는 영웅적 장면.",
             "Strategists working in high-tech boardroom, holographic ideas expanding, heroic lighting, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "핵심 효율을 10배 올린 구조와 장기적 가치를 사전에 미리 확보해 낸 것입니다.",
             "네온 레이저 라인이 효율적 경로를 따라 순식간에 연결되는 3D 모션 그래픽.",
             "3D motion graphics showing glowing neon lines connecting key efficiency nodes, blue laser flow, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "단순한 운이 아니라, 시대를 앞서간 역발상 선택이 만든 압도적이고 명확한 결과물입니다.",
             "카메라가 상승하며 완벽하게 완성된 위업의 랜드마크가 일출 속에서 빛나는 시네마틱 샷.",
             f"Smooth orbital camera shot revealing completed successful achievement of {topic_en}, golden hour light, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"고정관념을 뒤집은 위대한 통찰. 이것이 바로 {topic_clean}에 숨겨진 진짜 가치입니다.",
             "화려한 도심 야경과 조화되는 감동적인 파이널 쇼츠 아웃트로.",
             f"Cinematic outro shot of {topic_en} backdrop at night with glowing city lights, 4k 60fps, vertical 9:16")
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
