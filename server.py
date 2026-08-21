import http.server
import socketserver
import urllib.parse
import json
import subprocess
import os
import sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='ignore')

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class StudioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok', 'python': sys.version}).encode('utf-8'))
            return
        
        if parsed_path.path == '/api/generate-storyboard':
            query = urllib.parse.parse_qs(parsed_path.query)
            topic = query.get('topic', [''])[0]
            scene_count_raw = query.get('scene_count', ['7'])[0]
            try:
                scene_count = int(scene_count_raw)
            except ValueError:
                scene_count = 7
            if not topic:
                topic = "인천공항 지반침하 기술"
            import generator
            import importlib
            importlib.reload(generator)
            storyboard = generator.generate_video_storyboard(topic, scene_count=scene_count)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(storyboard, ensure_ascii=False).encode('utf-8'))
            return

        if parsed_path.path == '/api/analyze':
            query = urllib.parse.parse_qs(parsed_path.query)
            url = query.get('url', [''])[0]
            if not url:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'URL이 필요합니다.'}).encode('utf-8'))
                return
            
            # Execute analyze.py
            cmd = [sys.executable, "analyze.py", url]
            res = subprocess.run(cmd, capture_output=True, text=True, cwd=DIRECTORY, encoding="utf-8", errors="ignore")
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'output': res.stdout,
                'error': res.stderr
            }, ensure_ascii=False).encode('utf-8'))
            return

        super().do_GET()

if __name__ == "__main__":
    print(f"🚀 유튜브 완전 분석 AI 웹서버가 실행되었습니다: http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), StudioHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버가 종료되었습니다.")
