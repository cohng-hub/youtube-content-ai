# -*- coding: utf-8 -*-
import sys
import json
import re
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')

def get_english_topic_info(topic):
    t = topic.strip()
    
    # Specific Known Topic Mapping
    topic_db = {
        '삼풍': {
            'cat': 'disaster',
            'sub': 'building_collapse',
            'en_subject': 'Sampoong Department Store building',
            'kr_name': '삼풍백화점 건물',
            'loc_en': '1995 Seoul cityscape',
            'loc_kr': '1995년 서울 도심'
        },
        '타이타닉': {
            'cat': 'disaster',
            'sub': 'ship_sinking',
            'en_subject': 'Titanic ocean liner',
            'kr_name': '타이타닉호 선체',
            'loc_en': 'starry ocean night',
            'loc_kr': '어두운 밤바다'
        },
        '세월호': {
            'cat': 'disaster',
            'sub': 'ship_sinking',
            'en_subject': 'Sewol passenger ferry vessel',
            'kr_name': '세월호 선체',
            'loc_en': 'coastal ocean waters',
            'loc_kr': '해안 바다'
        },
        '체르노빌': {
            'cat': 'disaster',
            'sub': 'nuclear_explosion',
            'en_subject': 'Chernobyl nuclear power plant reactor',
            'kr_name': '체르노빌 원자력 발전소',
            'loc_en': 'Pripyat power plant facility at dusk',
            'loc_kr': '발전소 부지 노을'
        },
        '롯데월드타워': {
            'cat': 'construction',
            'sub': 'skyscraper',
            'en_subject': 'Lotte World Tower 555m skyscraper',
            'kr_name': '롯데월드타워 초고층 빌딩',
            'loc_en': 'Seoul urban skyline at golden hour',
            'loc_kr': '서울 스카이라인'
        },
        '인천공항': {
            'cat': 'construction',
            'sub': 'airport_runway',
            'en_subject': 'Incheon International Airport runway',
            'kr_name': '인천공항 활주로 지반',
            'loc_en': 'Yeongjongdo coastal island mudflat',
            'loc_kr': '영종도 갯벌 해안'
        },
        '도수치료': {
            'cat': 'medical',
            'sub': 'spine_joint',
            'en_subject': 'chiropractic spinal alignment therapy',
            'kr_name': '도수치료 척추 관절 교정',
            'loc_en': 'modern bright physical therapy clinic',
            'loc_kr': '밝은 전문 도수치료 클리닉'
        },
        '아이폰': {
            'cat': 'technology',
            'sub': 'smartphone',
            'en_subject': 'sleek iPhone smartphone',
            'kr_name': '최신 아이폰 스마트폰',
            'loc_en': 'dark minimalist studio backdrop',
            'loc_kr': '미니멀한 스튜디오'
        },
        '벙커': {
            'cat': 'disaster',
            'sub': 'building_collapse',
            'en_subject': 'deep underground 50-story bunker facility',
            'kr_name': '지하 50층 비밀 벙커',
            'loc_en': 'underground high-tech military complex',
            'loc_kr': '지하 미공개 군사 시설'
        }
    }

    for key, info in topic_db.items():
        if key in t:
            return info

    lower_t = t.lower()
    if any(k in lower_t for k in ['삼풍', '건물', '백화점', '아파트', '빌딩', '붕괴', '지진', '무너지', '벙커']):
        return {
            'cat': 'disaster',
            'sub': 'building_collapse',
            'en_subject': f'multi-story {t} structure',
            'kr_name': f'{t} 구조물',
            'loc_en': 'urban city center at daytime',
            'loc_kr': '도심 대형 건물 현장'
        }
    elif any(k in lower_t for k in ['침몰', '타이타닉', '세월호', '배', '함선', '여객선', '해양', '심해']):
        return {
            'cat': 'disaster',
            'sub': 'ship_sinking',
            'en_subject': f'{t} ocean vessel',
            'kr_name': f'{t} 선체',
            'loc_en': 'ocean night waters',
            'loc_kr': '밤바다 수평선'
        }
    elif any(k in lower_t for k in ['원전', '체르노빌', '폭발', '화재', '화학', '가스', '화염', '코끼리']):
        return {
            'cat': 'disaster',
            'sub': 'nuclear_explosion',
            'en_subject': f'{t} facility structure',
            'kr_name': f'{t} 시설',
            'loc_en': 'industrial facility site at dusk',
            'loc_kr': '산업 시설 부지'
        }
    elif any(k in lower_t for k in ['치료', '척추', '관절', '뼈', '몸', '의학', '병원', '건강', '디스크', '수술']):
        return {
            'cat': 'medical',
            'sub': 'spine_joint',
            'en_subject': f'{t} medical procedure',
            'kr_name': f'{t} 신체 구조',
            'loc_en': 'bright modern medical clinic',
            'loc_kr': '밝은 전문 클리닉'
        }
    elif any(k in lower_t for k in ['폰', '아이폰', '갤럭시', '카메라', '반도체', '배터리', '칩', 'ai', '로봇']):
        return {
            'cat': 'technology',
            'sub': 'tech_device',
            'en_subject': f'high-tech {t} device',
            'kr_name': f'{t} 기술 제품',
            'loc_en': 'dark minimalist studio',
            'loc_kr': '스튜디오 조명 아래'
        }
    elif any(k in lower_t for k in ['타워', '공항', '터널', '교량', '지반', '건축', '토목', '내진설계']):
        return {
            'cat': 'construction',
            'sub': 'megastructure',
            'en_subject': f'{t} megastructure',
            'kr_name': f'{t} 건축 구조물',
            'loc_en': 'urban skyline at sunset',
            'loc_kr': '노을빛 도심 스카이라인'
        }
    else:
        return {
            'cat': 'general',
            'sub': 'general_topic',
            'en_subject': f'{t} topic subject',
            'kr_name': f'{t}',
            'loc_en': 'cinematic studio backdrop',
            'loc_kr': '드라마틱한 스튜디오'
        }

def generate_title_candidates(topic_clean, kr_name):
    """
    고성능 YouTube 훅 공식 기반 Title 후보 3가지 분석 및 추천
    """
    return [
        {
            "num": "01",
            "type": "어그로 & 공포 훅형",
            "title": f"{topic_clean}에 숨겨진 충격 진실 — 알고 보니 계획대로였습니다",
            "ctr": "예상 CTR 13.5% (최고치)",
            "desc": "국제공항/건물/구조물의 직관적 의구심을 자극하여 3초 이탈률 완전 차단."
        },
        {
            "num": "02",
            "type": "역발상 & 딜레마 훅형",
            "title": f"남들은 위기라 생각한 {topic_clean} — 완벽한 역발상 기술의 비하인드",
            "ctr": "예상 CTR 11.8%",
            "desc": "일반 상식을 거꾸로 뒤집는 시청자 호기심 자극 문구로 본문 시청 유도."
        },
        {
            "num": "03",
            "type": "대조 비교 & 팩트 훅형",
            "title": f"해외 실패 참사 사례 vs {topic_clean} — 한 끗 차이가 만든 명암",
            "ctr": "예상 CTR 10.4%",
            "desc": "타 국가 실패 사례와 국내 기술력의 극적 대조로 시청자 자부심 및 소통 극대화."
        }
    ]

def generate_video_storyboard(topic, scene_count=7):
    """
    주제(Topic)별 100% 실시간 맞춤형 콘티, 제목 후보 분석, 설명란 기획 및 씬별 프롬프트 생성 엔진
    """
    topic_clean = topic.strip()
    info = get_english_topic_info(topic_clean)
    
    sub = info['sub']
    en_sub = info['en_subject']
    kr_name = info['kr_name']
    loc_en = info['loc_en']
    loc_kr = info['loc_kr']

    # Title Candidates
    title_candidates = generate_title_candidates(topic_clean, kr_name)
    best_title = title_candidates[0]['title'] + " #Shorts"

    # Raw Scene Script Database per Subtype
    if sub == 'building_collapse':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"많은 분들이 알고 계신 {topic_clean}, 하지만 붕괴 전 {kr_name}(은)는 수많은 사람들이 오가던 세상에서 가장 화려하고 평화로운 공간이었습니다.",
             f"1990년대 맑은 낮 도심 속 화려하게 서 있는 {kr_name}의 전경. 평화로운 거리, 쇼핑객들, 붕괴 전 완벽하게 깨끗한 건축물 오프닝 (손상 없음).",
             f"Cinematic vertical 9:16 shot of pristine multi-story {en_sub} operating normally in {loc_en}, bright sunny day, crowds of people, peaceful urban atmosphere, immaculate architecture, no damage, hyper-realistic 8k, slow motion 24fps"),
            
            ("00:08 ~ 00:16",
             "절대 무너지지 않을 듯 견고해 보였지만, 내부 콘크리트 기둥과 슬래브 바닥판 속에는 무리한 하중 결함이 숨어 있었습니다.",
             f"{kr_name} 내부 콘크리트 하중 지원 기둥, 철근 단면, 옥상 대형 설비 무게 배치의 3D 입체 청사진 시각화.",
             f"Detailed 3D architectural cross-section blueprint of {en_sub} internal concrete support pillars, steel rebar grid, and heavy rooftop HVAC units, glowing cyan blueprint style, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "무단 구조 변경과 옥상 29톤 설비 이동으로 인해, 5층 천장과 기둥 주변 콘크리트에 미세 균열이 퍼지기 시작합니다.",
             "콘크리트 기둥 및 천장 슬래브 접합부에 미세 균열이 가고 먼지 가루가 떨어지는 긴장감 있는 마크로 샷.",
             "Macro shot of micro cracks spreading on concrete ceiling column and slab of building interior under heavy stress, fine dust particles falling, extreme tension, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "하중 응력이 한계를 초과하자 중앙 기둥이 뚫림 전단 파괴되며, 5층 바닥판이 아래층으로 수직 붕괴하기 시작합니다.",
             "3D 물리 수축 시뮬레이션으로 건물 중앙 기둥이 부러지며 상층 바닥판이 수직 하강 붕괴하는 순간 연출.",
             "3D structural physics simulation of central concrete column snapping and top floor slab shearing downward into lower building levels, dust cloud explosion, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "아래층 슬래브들이 상층 무게를 견디지 못하고 팬케이크처럼 차례대로 주저앉으며 바닥 전체가 순식간에 도미노 침하됩니다.",
             "3D 청사진으로 5층부터 지하 층까지 바닥 슬래브가 연속적으로 주저앉아 무너져 내리는 모션 그래픽.",
             "3D architectural animation of sequential floor slab collapse crashing down through building levels into basement, massive dust cloud, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "불과 20초 만에 거대한 매몰 현장으로 변해버린 붕괴 자리에 구조대 탐조등과 비상 조명이 어둠 속을 비춥니다.",
             "밤하늘 아래 무너진 건물 잔해 현장에서 비상 구조대 탐조등 빔이 자욱한 먼지를 뚫고 비추는 극적인 시네마틱 샷.",
             "Dramatic wide cinematic shot of collapsed building site at night, emergency rescue team searchlights beaming through thick dust clouds and concrete rubble, high emotional impact, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"안전의 중요성을 잊은 인재(人災)에 대한 묵직한 경고. 이것이 오늘날 우리가 {topic_clean}(을)를 잊지 말아야 할 이유입니다.",
             "고요한 아침 도심 위로 일출의 황금빛 햇살이 위령비 현장을 따뜻하게 감싸는 아련한 쇼츠 아웃트로.",
             "Cinematic outro shot of quiet city skyline at sunrise, golden sun rays shining on memorial park, peaceful emotional lighting, vertical 9:16 4k 60fps")
        ]
    elif sub == 'ship_sinking':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"역사상 가장 충격적인 비극으로 기록된 {topic_clean}, 하지만 그 시작은 세상에서 가장 장엄하고 평화로웠습니다.",
             f"어두운 밤바다 위를 유유히 항해하는 웅장한 {kr_name}의 전경. 잔잔한 수평선, 따뜻한 선실 조명, 침몰 전 완벽한 평화 연출 (손상 없음).",
             f"Cinematic vertical 9:16 shot of magnificent {en_sub} sailing smoothly on a calm starry ocean at night, warm glowing cabin lights, peaceful maiden voyage, pristine condition, no damage, hyper-realistic 8k, slow motion 24fps"),
            
            ("00:08 ~ 00:16",
             "절대 가라앉지 않는 배라 불리던 내부에는 강철 장갑판과 격벽의 치밀한 구조가 숨어 있었습니다.",
             f"{kr_name} 구조물 강철 장갑판 결합 부위와 방수 격벽의 미세 단면 3D 청사진 시각화.",
             f"Detailed 3D engineering blueprint cross-section view of {en_sub} sturdy steel plates and bulkheads, clean structural inspection, dark water ambient glow, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "하지만 칠흑 같은 안개와 위협의 형체가 마침내 모습을 드러내며 피할 수 없는 위기 순간에 도달합니다.",
             "짙은 안개 속에서 거대한 위협/장애물이 서서히 박두해오는 위기 순간의 1인칭 시점(POV) 연출.",
             f"First person POV from ship crow's nest looking at looming obstacle appearing out of dark sea fog at night, high tension, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "충돌과 함께 선체 측면 장갑이 찢겨 나가며 차가운 바닷물이 순식간에 하부 구역으로 쏟아져 들어옵니다.",
             "충돌과 함께 선체 측면 장갑판이 찌그러지며 해수가 격렬하게 밀려드는 수중 액션 샷.",
             "Action shot of steel ship side hull scraping underwater, freezing seawater violently flooding lower compartment, dynamic motion, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "방수 격벽이 설치되어 있었지만, 바닷물이 잔에 차오르듯 위쪽으로 차례대로 넘쳐 흐르는 결함이 나타납니다.",
             "3D 청사진으로 격벽 위로 차가운 바닷물이 차례대로 넘어가며 선체가 기울어지기 시작하는 시각화.",
             "3D architectural animation showing ocean water overflowing top of internal watertight bulkheads inside hold, ship tilting forward slightly, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "선수가 수면 아래로 숙여지고 거대한 선체 후미가 밤하늘을 향해 높이 들어 올려지며 마침내 파괴적 침몰이 일어납니다.",
             "선체 뒷부분이 높게 들리고 빨간 조난 신호탄이 밤하늘로 쏘아지며 수중으로 침몰하는 극적인 시네마틱 샷.",
             "Dramatic wide cinematic shot of colossal ocean vessel stern rising high into starry night sky as bow plunges into ocean, red emergency distress flares launching, epic destruction, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"완벽하다고 믿었던 인간의 오만에 대한 묵직한 경고. 고요해진 바다만이 그날의 비극을 기억하고 있습니다.",
             "고요한 아침 바다 위로 일출의 황금빛 햇살이 비치는 감동적이고 아련한 파이널 쇼츠 아웃트로.",
             "Cinematic outro shot of quiet peaceful ocean surface at sunrise, golden sun rays breaking through morning clouds, emotional gold lighting, vertical 9:16 4k 60fps")
        ]
    elif sub == 'nuclear_explosion':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"세계 최고의 안전성을 자랑하던 {topic_clean}, 하지만 참사 전 {kr_name}(은)는 정막 속에 정상 가동되고 있었습니다.",
             f"노을빛 아래 원자로 시설 건물과 증기 쿨링 타워가 고요히 서 있는 깨끗한 오프닝 (손상 없음).",
             f"Cinematic vertical 9:16 shot of pristine {en_sub} at power plant facility, cool steam rising smoothly, quiet evening atmosphere, immaculate facility, no damage, hyper-realistic 8k"),
            
            ("00:08 ~ 00:16",
             "원자로 4호기 내부 심장부에는 흑연 제어봉과 고압 수증기 파이프가 정밀하게 기계 결합되어 있었습니다.",
             f"{kr_name} 핵심 원자로 우라늄 연료봉과 흑연 제어봉 내부 3D 입체 청사진 시각화.",
             f"Detailed 3D engineering blueprint cross-section of {en_sub} core, graphite control rods, and steam cooling pipes, glowing cyan grid, vertical 9:16"),
            
            ("00:16 ~ 00:24",
             "무리한 출력 시험 도중 출력 제어 장치가 작동하지 않으며, 원자로 내부 수증기 압력과 열기가 폭발적으로 폭증합니다.",
             "제어실 경고등이 붉게 점등되고 원자로 내부 온도가 열화상으로 빨갛게 상승하는 과부하 연출.",
             "Red warning lights flashing in control room, thermal heat map spiking dangerously inside nuclear reactor core, extreme tension, vertical 9:16"),
            
            ("00:24 ~ 00:32",
             "수증기 압력을 견디지 못한 1,000톤 중량의 원자로 뚜껑이 튀어나가며 1차 열폭발이 직격합니다.",
             "원자로 상부 뚜껑이 수증기 압력으로 날아가며 열화염과 불꽃이 솟구쳐 오르는 3D 액션 샷.",
             "Action shot of 1000-ton reactor lid blowing open from steam pressure explosion, intense fire sparks and heat wave eruption, vertical 9:16"),
            
            ("00:32 ~ 00:40",
             "공기와 반응한 흑연에 2차 대형 폭발이 일어나며 방사성 불기둥과 잔해가 밤하늘 수천 미터 위로 솟구칩니다.",
             "붕괴된 원자로 건물 위로 붉은 방사능 열구름과 잔해가 밤하늘로 치솟아 올라가는 3D 비주얼.",
             "3D physics animation of glowing radioactive steam cloud and glowing graphite debris billowing up into dark night sky, vertical 9:16"),
            
            ("00:40 ~ 00:48",
             "파괴된 4호기 원자로 건물 잔해 속에서 소방대원들의 비상 조명과 조난 불빛이 안개 속을 비춥니다.",
             "불타는 원자로 잔해와 연기 속에서 소방차 탐조등이 어둠을 비추는 극적인 시네마틱 샷.",
             "Dramatic wide cinematic shot of ruined nuclear reactor building rubble at night, emergency firefighter searchlights beaming through smoke, high impact, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"보이지 않는 위험에 대한 엄중한 경고. 이것이 바로 우리가 {topic_clean}(을)를 기억해야 하는 이유입니다.",
             "고요해진 붉은 숲 위로 아침 일출 햇살이 감싸는 감동적이고 아련한 파이널 쇼츠 아웃트로.",
             "Cinematic outro shot of quiet pine forest surrounding exclusion zone at sunrise, golden sun rays breaking through morning mist, 4k 60fps, vertical 9:16")
        ]
    elif sub == 'spine_joint':
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"많은 분들이 {topic_clean}(을)를 접할 때 몸에 무리가 갈까 두려워하지만, 사실 치료 전 몸상태는 완벽히 통제 가능합니다.",
             f"환자가 밝고 편안한 전문 클리닉에 들어서며 안정된 미소를 지어 보이는 깨끗한 오프닝.",
             f"Cinematic vertical 9:16 shot of modern bright medical clinic, patient walking in comfortably, healthy environment, no pain, warm ambient studio lighting, hyper-realistic 8k"),
            
            ("00:08 ~ 00:16",
             "피부 아래 관절 마디 속에서는 정밀 3D 단면처럼 관절액과 캡슐이 정밀하게 배치되어 있습니다.",
             f"신체 내부 척추 및 관절 마디 캡슐의 정밀 3D 입체 단면 비주얼 연출.",
             f"Detailed 3D medical cross-section animation of healthy joint capsule and cartilage of {en_sub}, glowing cyan blueprint style, Octane render, vertical 9:16"),
            
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
    elif sub in ['skyscraper', 'airport_runway', 'megastructure']:
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"여기 {topic_clean}(이)가 있습니다. 남들은 무너질까 걱정하지만, 완성된 구조물은 장엄하게 서 있습니다.",
             f"노을빛 아래 웅장하게 스카이라인을 이루고 있는 {kr_name}의 시네마틱 세로 9:16 드론 오프닝 (손상 없음).",
             f"Cinematic epic wide drone shot of magnificent {en_sub}, perfect standing condition, hyper-realistic 8k, dramatic sunset lighting, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "거친 외부 속 바닥 아래 지반에는 우리가 몰랐던 치밀한 토목 3D 구조가 설치되어 있습니다.",
             f"{kr_name}의 거대한 지반 단면과 지하 모래 기둥/내진 댐퍼의 3D 청사진 오버레이.",
             f"Detailed 3D cross-section architecture blueprint animation of {en_sub} ground foundation, glowing cyan grid, vertical 9:16"),
            
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
             f"Smooth orbital drone camera shot revealing completed magnificent {en_sub}, golden hour light, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"자연의 흐름을 예측하고 제어한 인간의 지혜. 이것이 바로 {topic_clean}의 진짜 비밀입니다.",
             "밤하늘 도심 조명과 어우러져 화려하게 빛나는 파이널 쇼츠 아웃트로.",
             f"Outro cinematic hero shot of {en_sub} at night with glowing city lights, lens flare, 4k 60fps, vertical 9:16")
        ]
    else:
        raw_scenes = [
            ("00:00 ~ 00:08",
             f"우리가 일상에서 접하는 {topic_clean}, 남들은 당연하다 생각하지만 첫 모습 뒤에는 특별한 상식이 숨어 있습니다.",
             f"상징적인 {kr_name}의 메인 비주얼이 드라마틱한 조명 속에 완벽하게 드러나는 세로 9:16 오프닝 (손상 없음).",
             f"Cinematic opening shot introducing pristine {en_sub}, dramatic studio lighting, perfect condition, hyper-realistic 8k, vertical 9:16"),
            
            ("00:08 ~ 00:16",
             "그 화려한 겉모습 뒤에는 아무도 몰랐던 치밀한 전략과 3D 청사진 구조가 존재합니다.",
             "인포그래픽 청사진 애니메이션이 3D 오버레이로 레이어별 펼쳐지는 연출.",
             f"3D infographic motion graphics revealing hidden mechanics and internal layers of {en_sub}, glowing lines, vertical 9:16"),
            
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
             f"Smooth orbital camera shot revealing completed successful achievement of {en_sub}, golden hour light, vertical 9:16"),
            
            ("00:48 ~ 00:56",
             f"고정관념을 뒤집은 위대한 통찰. 이것이 바로 {topic_clean}에 숨겨진 진짜 가치입니다.",
             "화려한 도심 야경과 조화되는 감동적인 쇼츠 아웃트로.",
             f"Cinematic outro shot of {en_sub} backdrop at night with glowing city lights, 4k 60fps, vertical 9:16")
        ]

    # Handle requested scene count (5, 7, or 10 scenes)
    if scene_count == 5:
        target_scenes = raw_scenes[:5]
        duration_label = "00:40 (초스피드 쇼츠 / 8초 x 5개 씬)"
    elif scene_count == 10:
        target_scenes = list(raw_scenes)
        # Add 3 extra scenes for longform intro (up to 10)
        target_scenes.extend([
            ("00:56 ~ 01:04",
             f"더 자세한 {topic_clean}에 관한 기술적 메커니즘과 비하인드 팩트 심층 분석.",
             f"{kr_name} 내부 3D 인포그래픽 그래픽 및 하이테크 스튜디오 렌더링.",
             f"Detailed 3D studio breakdown of {en_sub}, holographic telemetry data, vertical 9:16"),
            ("01:04 ~ 01:12",
             "전문가들과 연구팀이 밝혀낸 핵심 시뮬레이션 결론.",
             f"{kr_name} 연구실 및 실험 장비의 시네마틱 연출.",
             f"Cinematic high-tech research lab analyzing {en_sub} data, 8k, vertical 9:16"),
            ("01:12 ~ 01:20",
             f"구독과 좋아요로 더 많은 흥미로운 {topic_clean} 지식을 받아보세요.",
             "채널 구독 및 반응 유도 최종 그래픽 아웃트로.",
             "Channel call-to-action outro graphic with glowing neon elements, vertical 9:16 4k")
        ])
        duration_label = "01:20 (80초 롱폼 인트로 / 8초 x 10개 씬)"
    else:
        target_scenes = raw_scenes[:7]
        duration_label = "00:56 (유튜브 쇼츠 규격 1분 이내 / 8초 x 7개 씬)"

    scenes = []
    for idx, (time_range, narr, p_kr, p_en) in enumerate(target_scenes, 1):
        scenes.append({
            "scene": idx,
            "time": time_range,
            "narration": narr,
            "prompt_kr": p_kr,
            "prompt_en": p_en
        })

    # Description Planning
    timestamps_text = "\n".join([f"• {s['time']} : {s['narration'][:25]}..." for s in scenes])
    description_formatted = f"""📌 {topic_clean} — 8초 비디오 AI 기획 리포트

[영상 개요]
{topic_clean}에 관한 충격적인 진실과 핵심 원리 56초 완전 분석!
168만 조회수 바이럴 훅 공식과 5단계 딜레마 전개 구조를 100% 반영한 유튜브 비디오 기획안입니다.

[타임라인 목차]
{timestamps_text}

[핵심 시청 포인트]
1. 초반 3초 이탈 방지 역설적 어그로 훅
2. 3D 입체 청사진 및 마크로 물리 시뮬레이션 비주얼
3. 시청자 반응 및 고정 댓글 유도 장치

#Shorts #쇼츠 #비디오AI #{re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean)} #유튜브기획
"""

    return {
        "topic": topic_clean,
        "category": info['cat'],
        "subtype": sub,
        "title": best_title,
        "title_candidates": title_candidates,
        "description": description_formatted,
        "total_scenes": len(scenes),
        "total_duration": duration_label,
        "scenes": scenes
    }

if __name__ == "__main__":
    topic_input = sys.argv[1] if len(sys.argv) > 1 else input("생성할 주제 입력: ").strip()
    if not topic_input:
        topic_input = "지하 50층 비밀 벙커의 진실"
    
    result = generate_video_storyboard(topic_input)
    
    print(f"\n========================================================")
    print(f"🎬 [8초 비디오 대본 & AI 프롬프트 자동 생성 결과]")
    print(f"========================================================\n")
    print(f"⏱️ 전체 분량: {result['total_duration']}\n")
    print(f"📌 추천 제목 3선:")
    for t in result['title_candidates']:
        print(f"  [{t['num']}] {t['type']} | {t['title']} ({t['ctr']})")
    print(f"\n📝 디스크립션 기획:\n{result['description']}\n")
    print(f"⏱️ 8초 단위 씬 목록:\n")
    
    for s in result['scenes']:
        print(f"--------------------------------------------------------")
        print(f"🎬 Scene {s['scene']} [{s['time']}]")
        print(f"🗣️ 자막 대사: {s['narration']}")
        print(f"🎨 Visual Description: {s['prompt_kr']}")
        print(f"🤖 AI Video Prompt (Runway/Kling/Luma - 9:16 Shorts):")
        print(f"   {s['prompt_en']}")
    print(f"--------------------------------------------------------\n")
    
    output_filename = f"콘티_{re.sub(r'[^a-zA-Z0-9가-힣]', '_', topic_input)}.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"💾 JSON 콘티 저장 완료: {output_filename}")
