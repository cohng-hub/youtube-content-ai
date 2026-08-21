# 유튜브 링크 하나로 완전 분석 — 0원
# 사용법: python3 analyze.py "https://youtu.be/영상ID"
import sys, re, json, subprocess, urllib.request, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')

def sh(args):
    if args and args[0] == "yt-dlp":
        args = [sys.executable, "-m", "yt_dlp"] + args[1:]
    return subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="ignore").stdout

url = sys.argv[1] if len(sys.argv) > 1 else input("유튜브 링크: ").strip()
vid = re.search(r'(?:v=|youtu\.be/|shorts/|embed/)([A-Za-z0-9_-]{11})', url).group(1)

print("1/4 메타데이터...")
meta = json.loads(sh(["yt-dlp", "--skip-download", "--dump-json", "https://youtu.be/" + vid]))
info = {k: meta.get(k) for k in ["title","channel","channel_follower_count",
        "view_count","like_count","comment_count","duration_string","upload_date"]}

print("2/4 자막...")
sh(["yt-dlp", "--skip-download", "--write-subs", "--write-auto-subs",
    "--sub-langs", "ko,ko-KR,ko-orig,en", "-o", vid, "https://youtu.be/" + vid])

transcript = "(자막 없음)"
import glob
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
    except Exception: pass

print("3/4 댓글...")
sh(["yt-dlp","--skip-download","--write-comments",
    "--extractor-args","youtube:max_comments=200","-o",vid+"_c","https://youtu.be/" + vid])
comments = []
try:
    cs = json.load(open(vid + "_c.info.json", encoding="utf-8")).get("comments") or []
    cs.sort(key=lambda c: c.get("like_count") or 0, reverse=True)
    comments = ["[" + str(c.get("like_count",0)) + "] " + (c.get("text") or "")[:100] for c in cs[:15]]
except FileNotFoundError: pass

prompt = ("아래 유튜브 영상을 분석해줘.\n"
    "[메타데이터] " + json.dumps(info, ensure_ascii=False) + "\n"
    "[설명란] " + (meta.get("description") or "")[:800] + "\n"
    "[자막 전문] " + transcript[:6000] + "\n"
    "[상위 댓글]\n" + "\n".join(comments) + "\n\n"
    "분석 항목:\n1. 제목·훅 구조\n2. 전개 방식(단계별)\n3. 핵심 메시지\n"
    "4. 댓글 여론 특징\n5. 내 채널에 적용할 점 3가지")

print("4/4 로컬 AI 분석...")
try:
    req = urllib.request.Request("http://127.0.0.1:1234/v1/chat/completions",
        data=json.dumps({"model":"local","messages":[{"role":"user","content":prompt}],
                         "max_tokens":2000}).encode(),
        headers={"Content-Type":"application/json"})
    report = json.load(urllib.request.urlopen(req, timeout=600))["choices"][0]["message"]["content"]
except Exception:
    report = "(LM STUDIO 서버 꺼짐 — 아래를 아무 AI에나 붙여넣기)\n\n" + prompt

open(vid + "_리포트.txt", "w", encoding="utf-8").write(report)
print()
print(report)
print()
print("저장: " + vid + "_리포트.txt")
