"""Wise Owl: bounded, saved-evidence hackathon advice. No provider calls."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import datetime as dt
import json
import os
import re

ROOT = Path(__file__).resolve().parent
CATALOG = json.loads((ROOT / 'lesson.json').read_text())


def normalized(value):
    return ' ' + ' '.join(re.findall(r'[a-z0-9]+', value.lower())) + ' '


def advise(question):
    if not isinstance(question, str) or not 5 <= len(question.strip()) <= 600:
        raise ValueError('Ask a question between 5 and 600 characters.')
    question = question.strip()
    text = normalized(question)
    ranked = []
    for lesson in CATALOG['lessons']:
        score = sum(len(normalized(term).split()) for term in lesson['terms']
                    if normalized(term) in text)
        ranked.append((score, lesson))
    score, selected = max(ranked, key=lambda row: row[0])
    if score:
        result = {key: value for key, value in selected.items() if key != 'terms'}
        result.update(matched=True, limits='This is a matching saved record, not a search of the full project history. Reuse conditions, rule challenges and experiments are proposals; they are not recorded outcomes.')
    else:
        result = {
            'id': None, 'theme': None, 'matched': False,
            'title': 'No matching saved evidence.', 'evidence_type': 'Unknown in this catalog',
            'lesson': 'I do not have a relevant record for this question in the four lessons loaded here.',
            'outcome_status': 'No recorded outcome for this question',
            'what_happened': 'This catalog cannot establish what you tried, whether it worked or why. Missing evidence here does not mean the experience never happened.',
            'why': 'The loaded records cover collaboration, scope, evidence labels and a video/photo review. I cannot infer another project’s history from them.',
            'reuse_when': None, 'rule_to_challenge': None,
            'experiment': 'Identify a project name or event date, then locate its source, run receipt or debrief before choosing a lesson to reuse. This offline page cannot perform that search.',
            'hypothesis': 'A relevant record may exist outside this small catalog; that has not been established.',
            'observable_check': 'A source identifies the attempted action, the observed result and its date. If it does not explain why, keep the cause unknown.',
            'disconfirming_result': 'A plan, credential name or similar-looking project alone does not establish that the action ran or worked.',
            'source': None,
            'limits': 'No scope reduction, historical outcome or cause is inferred. Ask about a loaded theme or bring the missing evidence back to the wider Brain workflow.',
        }
    result.update(question=question, mode=CATALOG['mode'],
                  generated_at=dt.datetime.now(dt.timezone.utc).isoformat())
    return result


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
            self.respond(200, {'ok': True, 'app': 'Wise Owl', 'mode': CATALOG['mode'],
                               'saved_records': len(CATALOG['lessons'])})
        elif self.path in ('/', '/index.html'):
            self.respond(200, (ROOT / 'index.html').read_bytes(), 'text/html; charset=utf-8')
        else:
            self.respond(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path not in ('/api/advise', '/api/roast'):
            return self.respond(404, {'error': 'Not found'})
        try:
            length = int(self.headers.get('Content-Length', 0))
            if not 0 < length <= 8192:
                return self.respond(413, {'error': 'Keep the question under 600 characters.'})
            payload = json.loads(self.rfile.read(length))
            question = payload.get('question', payload.get('idea')) if isinstance(payload, dict) else None
            try:
                result = advise(question)
            except ValueError as exc:
                return self.respond(400, {'error': str(exc)})
            self.respond(200, result)
        except (ValueError, UnicodeError):
            self.respond(400, {'error': 'Send a valid question.'})

    def log_message(self, format, *args):
        pass  # Do not retain questions or requests.


if __name__ == '__main__':
    ThreadingHTTPServer(('0.0.0.0', int(os.environ.get('PORT', '8080'))), Handler).serve_forever()
