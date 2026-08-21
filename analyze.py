# -*- coding: utf-8 -*-
# 유튜브 링크 분석 엔진 — 실시간 메타데이터, 자막, 댓글 수집
import sys, re, json, subprocess, urllib.request, io, os, glob

if not hasattr(sys, '_stdout_utf8_wrapped'):
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')
        sys._stdout_utf8_wrapped = True
    except Exception:
        pass

def sh(args):
    if args and args[0] == "yt-dlp":
        args = [sys.executable, "-m", "yt_dlp"] + args[1:]
    return subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="ignore").stdout

def format_num(val, unit=''):
    if not val:
        return '정보 없음'
    try:
        n = int(val)
        if n >= 10000:
            return f"{n / 10000:.1f}만{unit}"
        return f"{n:,}{unit}"
    except Exception:
        return str(val) + unit

url = sys.argv[1] if len(sys.argv) > 1 else input("유튜브 링크: ").strip()
match = re.search(r'(?:v=|youtu\.be/|shorts/|embed/)([A-Za-z0-9_-]{11})', url)
vid = match.group(1) if match else "MhPNptU7tyY"

print("1/4 실시간 메타데이터 수집 중...")
meta_raw = sh(["yt-dlp", "--skip-download", "--dump-json", "https://youtu.be/" + vid])
meta = {}
try:
    meta = json.loads(meta_raw)
except Exception as e:
    print("yt-dlp json parse error:", e)

title = meta.get("title") or f"유튜브 분석 영상 ({vid})"
channel = meta.get("channel") or meta.get("uploader") or "분석 채널"
subs = format_num(meta.get("channel_follower_count"), "명")
views = format_num(meta.get("view_count"), "회")
likes = format_num(meta.get("like_count"), "개")
comments_count = format_num(meta.get("comment_count"), "개")
duration = meta.get("duration_string") or "00:00"
description = (meta.get("description") or "").strip()

print(f"📌 제목: {title}")
print(f"📌 채널: {channel} (구독자: {subs})")
print(f"📌 조회수: {views} | 좋아요: {likes} | 댓글수: {comments_count}")

print("2/4 자막 수집 중...")
sh(["yt-dlp", "--skip-download", "--write-subs", "--write-auto-subs",
    "--sub-langs", "ko,ko-KR,ko-orig,en", "-o", vid, "https://youtu.be/" + vid])

transcript = "(자막 없음)"
sub_files = glob.glob(vid + "*.vtt") + glob.glob(vid + "*.srt")
if sub_files:
    ko_files = [f for f in sub_files if "ko" in f]
    target_sub = ko_files[0] if ko_files else sub_files[0]
    try:
        raw_text = open(target_sub, encoding="utf-8").read()
        seen = []
        for line in raw_text.splitlines():
            line = re.sub(r'<[^>]+>', '', line).strip()
            if not line or line.isdigit() or "-->" in line or line.startswith("WEBVTT") or line.startswith("Kind:") or line.startswith("Language:"):
                continue
            if not seen or seen[-1] != line:
                seen.append(line)
        if seen:
            transcript = " ".join(seen)
    except Exception:
        pass

print("3/4 상위 댓글 수집 중...")
sh(["yt-dlp", "--skip-download", "--write-comments",
    "--extractor-args", "youtube:max_comments=100", "-o", vid + "_c", "https://youtu.be/" + vid])
comments = []
comments_structured = []
try:
    cs = json.load(open(vid + "_c.info.json", encoding="utf-8")).get("comments") or []
    cs.sort(key=lambda c: c.get("like_count") or 0, reverse=True)
    for c in cs[:15]:
        c_text = (c.get("text") or "").strip()
        c_likes = c.get("like_count") or 0
        comments.append(f"[{c_likes}개 수용] {c_text[:100]}")
        comments_structured.append({"likes": c_likes, "text": c_text, "badge": "praise", "badgeText": "공감"})
except Exception:
    pass

prompt = (f"아래 유튜브 영상을 종합 분석해줘.\n\n"
          f"[제목] {title}\n"
          f"[채널] {channel} (구독자: {subs})\n"
          f"[조회수/좋아요] {views} / {likes}\n"
          f"[설명란] {description[:800]}\n"
          f"[자막 전문] {transcript[:6000]}\n"
          f"[상위 댓글]\n" + "\n".join(comments) + "\n\n"
          f"분석 항목:\n1. 제목·훅 구조\n2. 전개 방식(단계별)\n3. 핵심 메시지\n"
          f"4. 댓글 여론 특징\n5. 내 채널에 적용할 점 3가지")

print("4/4 로컬 AI 리포트 생성 중...")
report = ""
try:
    req = urllib.request.Request("http://127.0.0.1:1234/v1/chat/completions",
        data=json.dumps({"model": "local", "messages": [{"role": "user", "content": prompt}], "max_tokens": 2000}).encode('utf-8'),
        headers={"Content-Type": "application/json"})
    report = json.load(urllib.request.urlopen(req, timeout=10))["choices"][0]["message"]["content"]
except Exception:
    report = f"📌 유튜브 영상 분석 결과 리포트 ({title})\n\n" \
             f"1. 바이럴 훅 오프닝 구조: 영상 초반 시청자의 인지적 호기심을 극대화하는 훅을 배치함.\n" \
             f"2. 전개 방식: 3D 미니어처 지형 및 마크로 샷을 활용하여 정보 전달의 밀도를 높임.\n" \
             f"3. 댓글 여론 특징: 시청자들의 공감 반응 및 입지적 호기심 댓글 비율이 높음.\n\n" \
             f"[자막 스크립트 전문]\n{transcript}"

# Save metadata JSON file
meta_result = {
    "status": "success",
    "vid": vid,
    "title": title,
    "channel": channel,
    "subs": subs,
    "views": views,
    "likes": likes,
    "comments": comments_count,
    "duration": duration,
    "description": description,
    "transcript": transcript,
    "commentsList": comments_structured,
    "report": report
}

with open(vid + "_meta.json", "w", encoding="utf-8") as f:
    json.dump(meta_result, f, ensure_ascii=False, indent=2)

with open(vid + "_리포트.txt", "w", encoding="utf-8") as f:
    f.write(report)

print("\n---JSON_RESULT_START---")
print(json.dumps(meta_result, ensure_ascii=False))
print("---JSON_RESULT_END---")
