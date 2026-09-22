"""Produce one self-contained static page; no network or backend required."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
html = (ROOT / 'index.html').read_text()
lesson = json.loads((ROOT / 'lesson.json').read_text())
engine = 'const LESSON = ' + json.dumps(lesson, ensure_ascii=False).replace('<', '\\u003c') + ';\n'
engine += (ROOT / 'browser-engine.js').read_text()
old = "const response=await fetch('/api/roast',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idea:$('idea').value})});const data=await response.json();if(!response.ok)throw Error(data.error||'The goblin needs a moment.');"
assert html.count(old) == 1, 'Local request handler changed; review browser port before building.'
html = html.replace(old, "const data=browserRoast($('idea').value);")
html = html.replace('<script>\n', '<script>\n' + engine + '\n', 1)
html = html.replace('LOCAL DOCKER DEMO', 'BROWSER EDITION')
html = html.replace('Pitches stay in this local session. No account. No provider call.',
                    'Pitches stay in this browser. No account. No provider call.')
html = html.replace('Ordinary Docker container · no Docker Sandboxes claim',
                    'Browser edition · saved Brain method · no server required')
html = html.replace('<title>Scope Goblin —', '<title>Scope Goblin · Browser edition —')
assert "fetch(" not in html
assert 'http://127.0.0.1' not in html
target = ROOT / 'portable'
target.mkdir(exist_ok=True)
(target / 'index.html').write_text(html)
print(target / 'index.html')
