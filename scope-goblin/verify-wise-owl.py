"""Check advisor routing, evidence boundaries, and Python/browser agreement."""
from pathlib import Path
import importlib.util
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('wise_owl', ROOT / 'app.py')
app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)
cases = [
    ('Should we build together, and what have we learned from trying that?', 'collaboration'),
    ('Should we make the scope smaller, or test a wider end-to-end slice?', 'small-slice'),
    ('What evidence do we need before we can call this integration working?', 'evidence'),
    ('What did the video and photo review teach us about the detector?', 'field-review'),
    ('Have I built a project with Bright Data before?', None),
    ('Should we choose Rust or Go?', None),
    ('Does a small scope always give us the right answer?', 'small-slice'),
    ('Should our team try another 15 minutes?', 'collaboration'),
    ('Can the reported accuracy explain why the video found nothing?', 'field-review'),
]
js = 'const CATALOG=' + json.dumps(app.CATALOG) + ';\n' + (ROOT / 'browser-engine.js').read_text()
js += '\nconsole.log(JSON.stringify(' + json.dumps([q for q, _ in cases]) + '.map(browserAdvise)));'
browser_rows = json.loads(subprocess.check_output(['node', '-e', js], text=True))
for (question, expected), browser in zip(cases, browser_rows):
    local = app.advise(question)
    assert local['id'] == expected, (question, local['id'], expected)
    local.pop('generated_at'); browser.pop('generated_at')
    assert local == browser, question
    if expected is None:
        assert not local['matched'] and local['source'] is None
        assert local['rule_to_challenge'] is None and 'No recorded outcome' in local['outcome_status']
    elif expected in ('small-slice', 'evidence'):
        assert local['outcome_status'] == 'No recorded outcome'
for bad in ['', 'four', 17, None, 'a' * 601]:
    try: app.advise(bad)
    except ValueError: pass
    else: raise AssertionError('Invalid question accepted')
field = app.advise('What did the video review teach us?')
assert 'different units' in field['what_happened'] and 'not a demonstrated cause' in field['why']
reflection = app.advise('Should we build together?')
assert 'two-hour project target' in reflection['what_happened']
assert 'No measured speedup' in reflection['why']
html = (ROOT / 'portable/index.html').read_text()
subprocess.run(['node', '-e', 'new Function(' + json.dumps(re.search(r'<script>(.*?)</script>', html, re.S).group(1)) + ');'], check=True)
assert '<div id="result" hidden>' in html and 'ONE THING AT A TIME' not in html
assert 'fetch(' not in html and 'http://127.0.0.1' not in html
assert '← Back to the presentation' in html
assert 'href="https://milbird-three-layers-sep26.john821249.chatgpt.site/#today"' in html
assert 'TOY DEPARTMENT' not in html and 'Ask Wise Owl' in html
print(json.dumps({'routing_and_parity_cases': len(cases), 'invalid_inputs': 5,
                  'evidence_boundaries': 'pass', 'standalone_and_return_link': 'pass'}))
