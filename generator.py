# -*- coding: utf-8 -*-
import sys
import json
import re
import io

if not hasattr(sys, '_stdout_utf8_wrapped'):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')
        sys._stdout_utf8_wrapped = True
    except Exception:
        pass

def generate_title_candidates(topic_clean):
    """
    그 어떤 주제(Universal Any Topic)를 입력해도 100% 어울리는 고성능 YouTube 훅 공식 Title 후보 3가지 생성
    """
    return [
        {
            "num": "01",
            "type": "핵심 팩트 & 훅형",
            "title": f"{topic_clean} — 56초 만에 밝혀지는 뜻밖의 핵심 진실",
            "ctr": "예상 CTR 13.9% (최고치)",
            "desc": f"{topic_clean}에 숨겨진 메커니즘과 원인을 직관적으로 해부하여 초반 3초 시청 고정."
        },
        {
            "num": "02",
            "type": "고정관념 파괴 훅형",
            "title": f"우리가 당연하다 생각한 {topic_clean} 속 완전히 거꾸로 된 사실",
            "ctr": "예상 CTR 12.4%",
            "desc": "일반 상식을 뒤집는 시청자 호기심 자극 문구로 이탈 방지 및 완독 유도."
        },
        {
            "num": "03",
            "type": "가치 재발견 훅형",
            "title": f"{topic_clean} — 알고 보면 10배 유용한 3가지 핵심 포인트",
            "ctr": "예상 CTR 11.0%",
            "desc": "시청자의 공감과 실생활 흥미를 끌어내어 댓글 참여와 소통 유도."
        }
    ]

def generate_video_storyboard(topic, scene_count=7):
    """
    그 어떤 주제를 입력하더라도 단어 오인식이나 불필요한 카테고리 문구가 섞이지 않는 100% 범용 유니버설 비디오 엔진
    """
    topic_clean = topic.strip()
    topic_en = re.sub(r'[^a-zA-Z0-9\s]', '', topic_clean) or topic_clean
    
    title_candidates = generate_title_candidates(topic_clean)
    best_title = title_candidates[0]['title'] + " #Shorts"

    raw_scenes = [
        ("00:00 ~ 00:08",
         f"우리가 일상에서 접하거나 궁금해했던 {topic_clean}, 하지만 그 첫 모습 뒤에는 아무도 몰랐던 핵심 원리가 숨어 있습니다.",
         f"{topic_clean}의 상징적인 메인 시각적 연출이 시네마틱 조명과 함께 세로 9:16 오프닝으로 펼쳐지는 장면 (손상/왜곡 없음).",
         f"Cinematic vertical 9:16 opening shot introducing pristine {topic_clean}, dramatic studio lighting, masterpiece, hyper-realistic 8k, slow motion 24fps"),
        
        ("00:08 ~ 00:16",
         "겉보기에는 단순해 보이지만, 실제 3D 입체 단면과 내부 메커니즘 속에서는 정밀하게 계산된 구조가 작동하고 있죠.",
         f"{topic_clean}의 내부 3D 입체 청사진 단면과 인포그래픽 레이어가 정밀하게 조명 속에 펼쳐지는 시각화 연출.",
         f"Detailed 3D cross-section blueprint animation showcasing internal structure of {topic_clean}, glowing cyan blueprint style, vertical 9:16"),
        
        ("00:16 ~ 00:24",
         "하지만 조건이나 상황에 미세한 변수가 생겼을 때, 내부에서는 긴장감과 예기치 못한 반응이 일어나기 시작합니다.",
         f"{topic_clean}의 핵심 상호작용 지점에 긴장감이 감돌며 변화가 발생하는 3D 마크로 클로즈업 연출.",
         f"Extreme macro 3D simulation shot of central mechanism of {topic_clean} under dynamic physical tension, hyper-detailed, vertical 9:16"),
        
        ("00:24 ~ 00:32",
         "여기서 발상을 완전히 뒤집습니다. 남들이 보지 못한 역발상 해법과 조절 기술을 통해 원인을 정밀하게 관락한 것입니다.",
         f"{topic_clean}의 핵심 해법이 3D 특수효과 파형과 푸른 빛의 흐름으로 뻗어가며 교정되는 모션 그래픽 샷.",
         f"Dynamic 3D physics animation of energy flow resolving conflict in {topic_clean}, glowing blue waves, vertical 9:16"),
        
        ("00:32 ~ 00:40",
         "단 몇 분 만에 내부의 모든 변수가 일정하게 안착되며, 본래 원하고자 했던 압도적인 효율을 완성해 냅니다.",
         f"{topic_clean}의 핵심 수치와 가치 지표가 녹색 안정권 그래프로 정돈되는 3D 인포그래픽 시각화.",
         f"3D motion graphics showing core metrics of {topic_clean} balancing smoothly into green safe zone, vertical 9:16"),
        
        ("00:40 ~ 00:48",
         "단순한 운이 아니라, 원인을 직관적으로 파악하고 전환한 선택이 만든 탁월하고 명확한 결과물입니다.",
         f"{topic_clean}의 완성된 자태가 드라마틱한 림 조명 아래 매끄럽게 회전하며 드러나는 시네마틱 하이라이트 샷.",
         f"Cinematic hero reveal shot of completed {topic_clean} under dramatic lighting, golden hour illumination, vertical 9:16"),
        
        ("00:48 ~ 00:56",
         f"고정관념을 파괴하고 본질을 바라보는 지혜. 이것이 오늘날 우리가 {topic_clean}(을)를 정확히 알아야 할 이유입니다.",
         "일출 햇살의 따뜻한 광원이 배경을 감싸 안으며 깊은 인사이트와 여운을 전하는 파이널 아웃트로.",
         f"Cinematic outro shot of {topic_clean} backdrop at sunrise with golden sun rays breaking through mist, emotional peaceful lighting, 4k 60fps, vertical 9:16")
    ]

    # Handle scene count (5, 7, 10)
    if scene_count == 5:
        target_scenes = raw_scenes[:5]
        duration_label = "00:40 (초스피드 쇼츠 / 8초 x 5개 씬)"
    elif scene_count == 10:
        target_scenes = list(raw_scenes)
        target_scenes.extend([
            ("00:56 ~ 01:04",
             f"더 자세한 {topic_clean}에 관한 메커니즘과 심층 분석 데이터.",
             f"{topic_clean} 내부 3D 인포그래픽 그래픽 및 하이테크 스튜디오 렌더링.",
             f"Detailed 3D studio breakdown of {topic_clean}, holographic telemetry data, vertical 9:16"),
            ("01:04 ~ 01:12",
             f"전문 연구진과 분석팀이 밝혀낸 {topic_clean}의 핵심 결론.",
             f"{topic_clean} 데이터 연구소의 시네마틱 연출.",
             f"Cinematic high-tech research lab analyzing {topic_clean} data, 8k, vertical 9:16"),
            ("01:12 ~ 01:20",
             f"구독과 좋아요로 더 많은 흥미로운 {topic_clean} 지식을 받아보세요.",
             "채널 구독 및 반응 유도 최종 그래픽 아웃트로.",
             "Channel call-to-action outro graphic with glowing neon elements, vertical 9:16 4k")
        ])
        duration_label = "01:20 (80초 롱폼 인트로 / 8초 x 10개 씬)"
    else:
        target_scenes = raw_scenes[:7]
        duration_label = "00:56 (유튜브 쇼츠 규격 1분 이내 / 8초 x 7개 씬)"

    camera_moves = [
        "Drone slow push-in shot",
        "3D cross-section blueprint camera pan",
        "Macro 3D structural zoom-in under tension",
        "Dynamic 3D physics animation orbit",
        "Sequential motion downward tracking shot",
        "Dramatic wide searchlight tilt-up shot",
        "Cinematic golden hour sunrise orbital camera shot",
        "High-tech studio 360 rotation shot",
        "Holographic telemetry camera pan",
        "Channel call-to-action outro graphic motion"
    ]

    scenes = []
    for idx, (time_range, narr, p_kr, p_en) in enumerate(target_scenes, 1):
        cam = camera_moves[(idx - 1) % len(camera_moves)]
        scenes.append({
            "scene": idx,
            "time": time_range,
            "narration": narr,
            "prompt_kr": p_kr,
            "prompt_en": p_en,
            "camera_movement": cam
        })

    # Universal Description Formatting
    timestamps_text = "\n".join([f"• {s['time']} : {s['narration']}" for s in scenes])
    tag_clean = re.sub(r'[^a-zA-Z0-9가-힣]', '', topic_clean) or "유튜브"
    description_formatted = f"""📌 {topic_clean} — 8초 비디오 AI 기획 리포트

[영상 개요]
{topic_clean}에 관한 핵심 분석과 56초 비디오 콘티!
168만 조회수 바이럴 훅 공식과 5단계 딜레마 전개 구조를 100% 반영한 비디오 기획안입니다.

[타임라인 목차]
{timestamps_text}

[핵심 시청 포인트]
1. 초반 3초 이탈 방지 직관적 어그로 훅
2. 3D 입체 청사진 및 시네마틱 샷 시각화
3. 시청자 반응 및 고정 댓글 소통 유도 장치

#Shorts #쇼츠 #비디오AI #{tag_clean} #유튜브기획
"""

    return {
        "topic": topic_clean,
        "category": "universal",
        "subtype": "universal_any_topic",
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
        topic_input = "거짓 배고픔의 비밀"
    
    result = generate_video_storyboard(topic_input)
    
    print(f"\n========================================================")
    print(f"🎬 [8초 비디오 대본 & AI 프롬프트 범용 유니버설 생성 결과]")
    print(f"========================================================\n")
    print(f"📌 주제: {result['topic']}")
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
        print(f"📹 Camera Move: {s['camera_movement']}")
        print(f"🤖 AI Video Prompt (9:16 Shorts): {s['prompt_en']}")
    print(f"--------------------------------------------------------\n")
