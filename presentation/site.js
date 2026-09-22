'use strict';
function httpsUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url : null; } catch { return null; }
}
function connectResource(name, value, status) {
  const url = httpsUrl(value);
  if (!url) return;
  const link = document.getElementById(`${name}-link`);
  if (!link) return;
  link.href = url.href;
  link.hidden = false;
  document.getElementById(`${name}-status`).textContent = status;
  document.getElementById(`${name}-fallback`).hidden = true;
  if (name !== 'video') return;
  const recordingLink = document.getElementById('recording-link');
  recordingLink.href = url.href;
  recordingLink.hidden = false;
  const placeholder = document.getElementById('recording-placeholder');
  placeholder.querySelector('h3').textContent = 'The recording is available';
  placeholder.querySelector('p').textContent = 'Open the demo recording using the link below.';
  placeholder.querySelector('a').hidden = true;
  let videoId = null;
  if (['www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(url.hostname)) videoId = url.searchParams.get('v');
  if (url.hostname === 'youtu.be') videoId = url.pathname.slice(1);
  const container = document.getElementById('video-embed');
  if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
    iframe.title = 'The Looping Lab — demo video';
    iframe.loading = 'lazy';
    iframe.allow = 'fullscreen; picture-in-picture';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    container.replaceChildren(iframe);
    container.hidden = false;
    placeholder.hidden = true;
  } else if (/\.(mp4|webm)$/i.test(url.pathname)) {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', 'The Looping Lab — demo video');
    video.src = url.href;
    container.replaceChildren(video);
    container.hidden = false;
    placeholder.hidden = true;
  }
}
fetch('config.json').then(response => {
  if (!response.ok) throw new Error('Resource configuration unavailable');
  return response.json();
}).then(config => {
  connectResource('presentation', config.presentationUrl, 'Presentation available');
  connectResource('video', config.videoUrl, 'Demo recording available');
  const github = httpsUrl(config.githubUrl);
  if (github && github.hostname === 'github.com') connectResource('github', github.href, config.githubAccess === 'private' ? 'Hackathon prep repository · private access' : 'Source code on GitHub');
}).catch(() => { /* The static page keeps its honest, readable resource status. */ });

// Reuse the reference deck's projector-friendly theme control.
(function initializeTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() { return document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : preference.matches; }
  function paint() { toggle.setAttribute('aria-label', `Switch to ${isDark() ? 'light' : 'dark'} theme`); toggle.setAttribute('aria-pressed', String(isDark())); }
  try { const saved = localStorage.getItem('looping-lab-theme'); if (['light','dark'].includes(saved)) document.documentElement.dataset.theme = saved; } catch {}
  toggle.addEventListener('click', () => { const theme = isDark() ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('looping-lab-theme',theme); } catch {} paint(); });
  preference.addEventListener('change', paint);
  paint();
})();

// Presentation navigation is progressive enhancement: without JavaScript every
// section remains readable in document order.
(function initializeDeck() {
  const slides = [...document.querySelectorAll('.deck-slide')];
  const main = document.getElementById('main');
  const toolbar = document.querySelector('.deck-toolbar');
  if (!slides.length || !main || !toolbar) return;
  const chapters = [];
  slides.forEach(slide => {
    let chapter = chapters.find(item => item.id === slide.dataset.chapter);
    if (!chapter) {
      chapter = { id: slide.dataset.chapter, title: slide.dataset.chapterTitle, slides: [] };
      chapters.push(chapter);
    }
    chapter.slides.push(slide);
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', slide.dataset.title);
    const heading = slide.querySelector('h1, h2');
    if (heading) heading.tabIndex = -1;
  });
  let chapterIndex = 0;
  let pageIndex = 0;
  let initialized = false;
  const chapterNav = toolbar.querySelector('.chapter-nav');
  const chapterButtons = chapters.map((chapter, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chapter-button';
    button.setAttribute('aria-label', `Chapter ${index + 1}: ${chapter.title}`);
    button.innerHTML = `<span class="chapter-number">${String(index + 1).padStart(2, '0')}</span><span>${chapter.title}</span>`;
    button.addEventListener('click', () => navigate(index, 0));
    chapterNav.append(button);
    return button;
  });
  const directions = Object.fromEntries([...toolbar.querySelectorAll('[data-direction]')].map(button => [button.dataset.direction, button]));
  function routeFor(chapter, page) {
    const item = chapters[chapter];
    return `#${item.id}${page ? `/${item.slides[page].dataset.page}` : ''}`;
  }
  function parseRoute(hash) {
    let route;
    try { route = decodeURIComponent(hash.replace(/^#/, '')); } catch { return null; }
    if (!route || route === 'main') return [0, 0];
    const aliases = { 'saturday':'walk-the-line', 'saturday/context':'walk-the-line', 'feeding':'reflection/foundation', 'feeding/prep':'reflection/foundation', 'feeding/session':'today/capture', 'feeding/lifecycle':'reflection/memory', 'problem':'story/context', 'demo':'today/demo', 'demo/evidence':'today/evidence', 'demo-plan':'today/demo', 'architecture':'today/architecture', 'architecture/stack':'today/stack', 'proof':'today/evidence', 'sponsors':'reflection/sponsors', 'sponsor-learning':'reflection/sponsors', 'sponsor-learning/findings':'reflection/sponsor-findings', 'sponsor-learning/method':'reflection/sponsor-method', 'live-demo':'today', 'lessons':'reflection', 'resources':'links', 'today/resources':'links', 'resources/recording':'today/recording' };
    route = aliases[route] || route;
    if (route.startsWith('live-demo/')) route = 'today/' + route.slice(10);
    const [chapterId, pageId, extra] = route.split('/');
    if (extra) return null;
    const chapter = chapters.findIndex(item => item.id === chapterId);
    if (chapter >= 0) {
      const page = pageId ? chapters[chapter].slides.findIndex(slide => slide.dataset.page === pageId) : 0;
      return page >= 0 ? [chapter, page] : null;
    }
    // Preserve existing links such as #demo-plan, #presentation and #code.
    const target = document.getElementById(route);
    const slide = target && target.closest('.deck-slide');
    if (!slide) return null;
    const index = chapters.findIndex(item => item.id === slide.dataset.chapter);
    return [index, chapters[index].slides.indexOf(slide)];
  }
  function render(focus) {
    const active = chapters[chapterIndex].slides[pageIndex];
    slides.forEach(slide => {
      const selected = slide === active;
      if (!selected && !slide.hidden) {
        slide.querySelectorAll('video').forEach(video => video.pause());
        slide.querySelectorAll('iframe').forEach(frame => {
          if (frame.src && frame.src !== 'about:blank') {
            frame.dataset.playerSrc = frame.src;
            frame.src = 'about:blank';
          }
        });
      }
      slide.hidden = !selected;
      if (selected) slide.querySelectorAll('iframe[data-player-src]').forEach(frame => {
        frame.src = frame.dataset.playerSrc;
        delete frame.dataset.playerSrc;
      });
    });
    chapterButtons.forEach((button, index) => {
      if (index === chapterIndex) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    chapterButtons[chapterIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    directions.left.disabled = chapterIndex === 0;
    directions.right.disabled = chapterIndex === chapters.length - 1;
    directions.up.disabled = pageIndex === 0;
    directions.down.disabled = pageIndex === chapters[chapterIndex].slides.length - 1;
    const location = `Chapter ${chapterIndex + 1} of ${chapters.length}`;
    const detail = pageIndex === 0 ? 'Overview' : `Detail ${pageIndex} of ${chapters[chapterIndex].slides.length - 1}`;
    document.getElementById('deck-progress').textContent = `${location} · ${chapters[chapterIndex].title}`;
    document.getElementById('deck-page-label').textContent = `${detail} · Page ${pageIndex + 1} of ${chapters[chapterIndex].slides.length}`;
    document.title = `${active.dataset.title} — Milbird`;
    main.scrollTop = 0;
    main.scrollLeft = 0;
    if (focus) {
      const heading = active.querySelector('h1, h2');
      if (heading) heading.focus({ preventScroll: true });
      document.getElementById('deck-announcement').textContent = `${location}. ${detail}. ${active.dataset.title}`;
    }
  }
  function navigate(chapter, page, { historyMode = 'push', focus = true } = {}) {
    if (!chapters[chapter] || !chapters[chapter].slides[page]) return;
    const unchanged = initialized && chapterIndex === chapter && pageIndex === page;
    main.dataset.motion = !initialized ? 'none' : chapter !== chapterIndex ? (chapter > chapterIndex ? 'right' : 'left') : (page > pageIndex ? 'down' : 'up');
    chapterIndex = chapter;
    pageIndex = page;
    const route = routeFor(chapter, page);
    if (location.hash !== route) {
      if (historyMode === 'replace') history.replaceState(null, '', route);
      else if (historyMode === 'push') history.pushState(null, '', route);
    }
    if (!unchanged || !initialized) render(focus);
    else if (focus) chapters[chapter].slides[page].querySelector('h1, h2')?.focus({ preventScroll: true });
    initialized = true;
  }
  function move(direction) {
    if (directions[direction]?.disabled) return false;
    if (direction === 'left') navigate(chapterIndex - 1, 0);
    if (direction === 'right') navigate(chapterIndex + 1, 0);
    if (direction === 'up') navigate(chapterIndex, pageIndex - 1);
    if (direction === 'down') navigate(chapterIndex, pageIndex + 1);
    return true;
  }
  Object.entries(directions).forEach(([direction, button]) => button.addEventListener('click', () => move(direction)));
  function ownsArrowKeys(target) {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], [role="slider"], [role="spinbutton"], [role="listbox"], [role="menu"], [role="menubar"], [role="tablist"], [role="tree"], [role="grid"], video, audio, iframe, [data-native-keys]'));
  }
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.isComposing || ownsArrowKeys(event.target)) return;
    if (document.querySelector('dialog[open], [aria-modal="true"]:not([hidden]), [role="dialog"]:not([hidden])')) return;
    const direction = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[event.key];
    if (!direction) return;
    event.preventDefault();
    // On compact screens, read the current page before changing detail pages.
    const scrollStep = Math.max(100, main.clientHeight * 0.7);
    if (direction === 'down' && main.scrollTop + main.clientHeight < main.scrollHeight - 2) {
      main.scrollBy({ top: scrollStep, behavior: 'instant' });
      return;
    }
    if (direction === 'up' && main.scrollTop > 2) {
      main.scrollBy({ top: -scrollStep, behavior: 'instant' });
      return;
    }
    move(direction);
  });
  let lastWheelAt = 0;
  let wheelTotal = 0;
  let wheelTurned = false;
  main.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || ownsArrowKeys(event.target) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const now = performance.now();
    if (now - lastWheelAt > 220) { wheelTotal = 0; wheelTurned = false; }
    lastWheelAt = now;
    if (wheelTurned) { event.preventDefault(); return; }
    const down = event.deltaY > 0;
    const edge = down ? main.scrollTop + main.clientHeight >= main.scrollHeight - 3 : main.scrollTop <= 3;
    if (!edge) { wheelTotal = 0; return; }
    const direction = down ? 'down' : 'up';
    if (directions[direction].disabled) return;
    event.preventDefault();
    const amount = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? main.clientHeight : 1);
    if (Math.sign(wheelTotal) !== Math.sign(amount)) wheelTotal = 0;
    wheelTotal += amount;
    if (Math.abs(wheelTotal) >= 65) { wheelTurned = true; move(direction); }
  }, { passive: false });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
    if (!link) return;
    if (link.classList.contains('skip-link')) {
      event.preventDefault();
      chapters[chapterIndex].slides[pageIndex].querySelector('h1, h2')?.focus({ preventScroll: true });
      return;
    }
    const route = parseRoute(link.getAttribute('href'));
    if (!route) return;
    event.preventDefault();
    navigate(...route);
  });
  function followHistory() {
    const route = parseRoute(location.hash);
    if (route) navigate(...route, { historyMode: 'none', focus: true });
  }
  window.addEventListener('hashchange', followHistory);
  window.addEventListener('popstate', followHistory);
  document.body.classList.add('deck-ready');
  toolbar.hidden = false;
  const initial = parseRoute(location.hash) || [0, 0];
  navigate(...initial, { historyMode: 'replace', focus: false });
})();

// Human-written introductions are copied only when the user presses a button.
document.querySelectorAll('[data-copy-prompt]').forEach(button => {
  button.addEventListener('click', async () => {
    const field = document.getElementById(button.dataset.copyPrompt);
    const status = document.getElementById('prompt-copy-status');
    try {
      await navigator.clipboard.writeText(field.value);
      status.textContent = 'Copied. Paste this prompt into the agent’s Codex task.';
    } catch {
      field.focus(); field.select();
      status.textContent = 'Prompt selected. Press Command+C or Ctrl+C to copy.';
    }
  });
});

(function initializePortfolio() {
  const region = document.querySelector('.portfolio-carousel');
  if (!region) return;
  const track = region.querySelector('.portfolio-track');
  const cards = [...track.querySelectorAll('.portfolio-card')];
  const previous = document.getElementById('portfolio-previous');
  const next = document.getElementById('portfolio-next');
  let selected = 0;
  function update() {
    const left = track.getBoundingClientRect().left;
    selected = cards.reduce((best, card, i) => Math.abs(card.getBoundingClientRect().left-left) < Math.abs(cards[best].getBoundingClientRect().left-left) ? i : best, 0);
    document.getElementById('portfolio-position').textContent = `${selected+1} / ${cards.length}`;
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  function move(delta) {
    const index = Math.max(0, Math.min(cards.length-1, selected+delta));
    const left = track.scrollLeft + cards[index].getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, {passive:true});
  region.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault(); event.stopPropagation(); move(event.key === 'ArrowRight' ? 1 : -1);
  });
  new ResizeObserver(update).observe(track);
  update();
})();

// The Thinker links personal reflection and the public sponsor-learning method.
(function initializeReflectionThoughts() {
  const slide = document.getElementById('reflection');
  const bubble = slide && slide.querySelector('.reflection-thought');
  if (!bubble) return;
  const label = document.getElementById('reflection-thought-label');
  const text = document.getElementById('reflection-thought-text');
  const count = document.getElementById('reflection-thought-count');
  const toggle = document.getElementById('reflection-thought-toggle');
  const next = document.getElementById('reflection-thought-next');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const thoughts = [
    ['START SMALL', 'Give it 15 minutes. Then decide whether to keep building.', '#reflection/review', 'From John’s reflection ↓'],
    ['BUILD TOGETHER', 'The invitation to build together changed the experience.', '#reflection/review', 'From John’s reflection ↓'],
    ['A LESSON TO TRY', 'Carry the short commitments—and the enjoyment—into the next loop.', '#reflection/review', 'From John’s reflection ↓'],
    ['LISTEN WHILE WE BUILD', 'Ask what helped while people are still building.', '#reflection/sponsor-findings', 'The sponsor-learning questions ↓']
  ];
  let index = 0;
  let paused = motion.matches;
  let timer;
  function paintToggle() {
    toggle.textContent = paused ? 'Play captions' : 'Pause captions';
    toggle.setAttribute('aria-pressed', String(paused));
  }
  function advance() {
    index = (index + 1) % thoughts.length;
    label.textContent = thoughts[index][0];
    text.textContent = thoughts[index][1];
    bubble.querySelector('a').href = thoughts[index][2];
    bubble.querySelector('a').textContent = thoughts[index][3];
    count.textContent = `${index + 1} / ${thoughts.length}`;
    if (!motion.matches && bubble.animate) bubble.animate([{opacity:0,transform:'translate(-10px,12px) scale(.96)'},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:500,easing:'ease-out'});
  }
  function schedule() {
    clearTimeout(timer);
    if (paused || slide.hidden || document.hidden) return;
    timer = setTimeout(() => { advance(); schedule(); }, 6500);
  }
  next.addEventListener('click', () => { advance(); schedule(); });
  toggle.addEventListener('click', () => { paused = !paused; paintToggle(); schedule(); });
  motion.addEventListener('change', () => { paused = motion.matches; paintToggle(); schedule(); });
  new MutationObserver(schedule).observe(slide, {attributes:true,attributeFilter:['hidden']});
  document.addEventListener('visibilitychange', schedule);
  paintToggle();
  schedule();
})();
