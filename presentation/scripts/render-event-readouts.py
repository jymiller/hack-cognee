#!/usr/bin/env python3
"""Render both event readouts through the same Cover/System/Evidence/Demo template.
Only public presentation copy in content/event-readouts.json is read. No Cognee calls.
"""
from pathlib import Path
from html import escape as h
import json,re
ROOT=Path(__file__).resolve().parents[1]
def cards(items):
 return '<div class="arc">'+''.join(f'<article class="ac" style="--ac:var(--{color})"><span class="an">{i+1:02}</span><h3>{h(x[0])}</h3><p>{h(x[1])}</p></article>' for i,(x,color) in enumerate(zip(items,['comms','water','sewer'])))+'</div>'
def render(e):
 chapter=e['chapter']; label=e['label']
 def page(key,title,desc,body):
  overview=key=='overview';id=chapter if overview else chapter+'-'+key
  if key in e.get('custom_pages',{}):
   return (ROOT/e['custom_pages'][key]).read_text()
  return f'''<section id="{id}" class="detail-slide event-readout deck-slide {'event-cover' if overview else ''}" data-template="event-readout-v1" data-template-part="{key}" data-chapter="{chapter}" data-page="{key}" data-chapter-title="{h(label)}" data-title="{h(title)}" aria-labelledby="{id}-title"><div class="section-heading"><div><p class="eyebrow">{h(e['eyebrow'] if overview else label.upper()+' / '+{'system':'THE SYSTEM','evidence':'EVIDENCE','demo':'LIVE DEMO'}[key])}</p><h2 id="{id}-title">{h(title)}</h2></div><p>{h(desc)}</p></div>{body}</section>'''
 result=(ROOT/e['custom_cover']).read_text() if e.get('custom_cover') else page('overview',e['title'],e['description'],f'<p class="event-lead">{h(e["lead"])}</p>'+cards(e['cover_cards'])+f'<div class="event-foot"><span>{h(e["status"])}</span><a class="quiet-link" href="#{chapter}/system">The system ↓</a></div>')
 if e.get('after_cover'): result+=(ROOT/e['after_cover']).read_text()
 t=e['system']; result+=page('system',t['title'],t['description'],'<ol class="factory-flow">'+''.join(f'<li><span>{i+1:02}</span><strong>{h(text)}</strong></li>' for i,text in enumerate(t['steps']))+'</ol><p class="detail-takeaway">'+h(t['note'])+'</p>')
 t=e['evidence'];result+=page('evidence',t['title'],t['description'],cards(t['cards'])+'<p class="detail-takeaway">'+h(t['note'])+'</p>')
 t=e['demo'];result+=page('demo',t['title'],t['description'],'<div class="demo-doors">'+''.join(f'<article><span class="an">{h(x[0])}</span><p>{h(x[1])}</p><a class="button secondary" href="{h(x[2])}"'+(' target="_blank" rel="noopener noreferrer"' if x[2].startswith(('https://','http://','scope-goblin/')) and not x[2].endswith('/scope-goblin/') else '')+'>'+h(x[3])+'</a></article>' for x in t['cards'])+'</div><p class="detail-takeaway">'+h(t['note'])+'</p>')
 return result
p=ROOT/'index.html';s=p.read_text()
for event in json.loads((ROOT/'content/event-readouts.json').read_text()):
 marker='EVENT-READOUT:'+event['chapter']
 pattern=r'<!-- '+marker+r':START -->[\s\S]*?<!-- '+marker+r':END -->'
 assert len(re.findall(pattern,s))==1,marker
 s=re.sub(pattern,lambda m:'<!-- '+marker+':START -->\n'+render(event)+'\n<!-- '+marker+':END -->',s)
p.write_text(s)
