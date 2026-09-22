"""A tiny deterministic focus coach. No provider calls or credentials."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import datetime as dt
import json
import os
import re

ROOT = Path(__file__).resolve().parent
LESSON = json.loads((ROOT / 'lesson.json').read_text())


def roast(idea):
    text = idea.lower()
    broad = bool(re.search(r'\b(everyone|everything|world|platform|ecosystem|marketplace|universal|all-in-one)\b', text))
    extras = [name for name, pattern in [
        ('accounts', r'login|account|sign.?up'), ('payments', r'pay|subscription|crypto|blockchain'),
        ('social features', r'social|network|feed|chat'), ('live integrations', r'real.?time|live data|integrat'),
        ('an entire platform', r'platform|ecosystem|marketplace|all-in-one'),
    ] if re.search(pattern, text)]
    if re.search(r'pizza|food|dinner|meal|restaurant|snack', text):
        action = 'Build one button that picks dinner from three sample meals and shows one reason for the choice.'
        check = 'Press the button: one meal and its reason appear. A second press still produces a valid meal.'
        tiny = 'One button. Three dinners. Zero venture capital.'
    elif re.search(r'pet|cat|dog|hamster|duck', text):
        action = 'Build one pet card with a Feed button that changes its mood from grumpy to delighted.'
        check = 'Click Feed once: the mood and face change. Reload: the starting state is clear.'
        tiny = 'One pet. One snack. A manageable emotional arc.'
    elif re.search(r'calendar|schedule|productivity|todo|to-do|task', text):
        action = 'Build one screen that takes three example tasks and highlights the single next task.'
        check = 'Enter three tasks: exactly one is marked next, with a visible reason. Nothing is silently deleted.'
        tiny = 'One next task. The other 47 tabs can wait.'
    elif re.search(r'hackathon|idea|pitch|startup|agent|ai\b', text):
        action = 'Build one input-to-verdict screen for a sample pitch, with one next action and a visible source note.'
        check = 'Submit a sample pitch: a verdict, one next action and its source appear. Label fixed or rule-based output.'
        tiny = 'One useful verdict. Keep the robot board of directors on paper.'
    else:
        action = 'Build one screen with a sample input, one button and one visible example result for this idea.'
        check = 'Press the button: the expected example result appears. Label sample data and repeat the check once.'
        tiny = 'One button that does something. A shockingly good start.'
    if broad or len(extras) >= 3:
        title, line = 'Choose one target', 'Big wings. Small first flight.'
    elif len(extras) >= 1:
        title, line = 'Park the distractions', 'Those extra features can wait on another branch.'
    else:
        title, line = 'Ready to focus', 'One clear next step. Give it your full attention.'
    return {
        'idea': idea, 'verdict': title, 'roast': line, 'tiny': tiny, 'next_action': action,
        'observable_check': check, 'park_for_later': extras or ['extra features until the first check passes'],
        'reason': 'The saved Brain method says to choose one actor, problem and outcome, then build the smallest slice and check observable behavior.',
        'lesson': LESSON, 'mode': 'deterministic rules + saved Brain method; no live model or memory call',
        'record': {'role': 'participant', 'event': 'Cognee hackathon — Looping Lab',
                   'event_date': '2026-09-21', 'observed_at': dt.datetime.now(dt.timezone.utc).isoformat(),
                   'status': 'generated suggestion; user build and outcome unverified',
                   'source': LESSON['source'], 'observed_outcome': 'local plan generated', 'supersedes': None},
    }


class Handler(BaseHTTPRequestHandler):
    def respond(self, status, body, kind='application/json; charset=utf-8'):
        raw = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', kind)
        self.send_header('Content-Length', str(len(raw)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if self.path == '/health':
            self.respond(200, {'ok': True, 'app': 'Focus Owl', 'mode': 'local deterministic demo'})
        elif self.path in ('/', '/index.html'):
            self.respond(200, (ROOT / 'index.html').read_bytes(), 'text/html; charset=utf-8')
        else:
            self.respond(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path != '/api/roast':
            return self.respond(404, {'error': 'Not found'})
        try:
            length = int(self.headers.get('Content-Length', 0))
            if not 0 < length <= 8192:
                return self.respond(413, {'error': 'Start with a short idea: keep it under 600 characters.'})
            payload = json.loads(self.rfile.read(length))
            idea = payload.get('idea') if isinstance(payload, dict) else None
            if not isinstance(idea, str) or not 5 <= len(idea.strip()) <= 600:
                return self.respond(400, {'error': 'Give the owl an idea between 5 and 600 characters.'})
            self.respond(200, roast(idea.strip()))
        except (ValueError, UnicodeError):
            self.respond(400, {'error': 'The owl needs a valid idea.'})

    def log_message(self, format, *args):
        pass  # Do not retain user pitches or requests.


if __name__ == '__main__':
    ThreadingHTTPServer(('0.0.0.0', int(os.environ.get('PORT', '8080'))), Handler).serve_forever()
