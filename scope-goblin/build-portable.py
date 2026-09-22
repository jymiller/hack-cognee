"""Build one standalone Wise Owl page with the curated catalog embedded."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent
html = (ROOT / 'index.html').read_text()
catalog = json.loads((ROOT / 'lesson.json').read_text())
engine = 'const CATALOG = ' + json.dumps(catalog, ensure_ascii=False).replace('<', '\\u003c') + ';\n'
engine += (ROOT / 'browser-engine.js').read_text()
pattern = r'async function getAdvice\(question\)\{.*?\n\}'
html, count = re.subn(pattern, 'async function getAdvice(question){return browserAdvise(question);}', html, count=1, flags=re.S)
assert count == 1, 'Review changed request handler before building.'
html = html.replace('<script>\n', '<script>\n' + engine + '\n', 1)
html = html.replace('LOCAL DOCKER DEMO', 'SAVED LESSONS · BROWSER')
html = html.replace('Questions stay in this local session.', 'Questions stay in this browser.')
html = html.replace('Ordinary Docker container · saved lessons', 'Browser edition · saved lessons · no server required')
html = html.replace('<title>Wise Owl —', '<title>Wise Owl · Browser edition —')
assert 'fetch(' not in html and 'http://127.0.0.1' not in html
assert '← Back to the presentation' in html
assert 'ONE THING AT A TIME' not in html
assert '<div id="result" hidden>' in html
(ROOT / 'portable').mkdir(exist_ok=True)
(ROOT / 'portable/index.html').write_text(html)
print(ROOT / 'portable/index.html')
