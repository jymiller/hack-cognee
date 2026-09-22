/* Browser port of app.py. Curated lesson is supplied by build-portable.py. */
function browserRoast(raw) {
  const idea = typeof raw === 'string' ? raw.trim() : '';
  if (idea.length < 5 || idea.length > 600) throw Error('Give the goblin a pitch between 5 and 600 characters.');
  const text = idea.toLowerCase();
  const broad = /\b(everyone|everything|world|platform|ecosystem|marketplace|universal|all-in-one)\b/.test(text);
  const extras = [
    ['accounts', /login|account|sign.?up/], ['payments', /pay|subscription|crypto|blockchain/],
    ['social features', /social|network|feed|chat/], ['live integrations', /real.?time|live data|integrat/],
    ['an entire platform', /platform|ecosystem|marketplace|all-in-one/],
  ].filter(([,pattern])=>pattern.test(text)).map(([name])=>name);
  let action, check, tiny;
  if (/pizza|food|dinner|meal|restaurant|snack/.test(text)) {
    action = 'Build one button that picks dinner from three sample meals and shows one reason for the choice.';
    check = 'Press the button: one meal and its reason appear. A second press still produces a valid meal.';
    tiny = 'One button. Three dinners. Zero venture capital.';
  } else if (/pet|cat|dog|hamster|duck/.test(text)) {
    action = 'Build one pet card with a Feed button that changes its mood from grumpy to delighted.';
    check = 'Click Feed once: the mood and face change. Reload: the starting state is clear.';
    tiny = 'One pet. One snack. A manageable emotional arc.';
  } else if (/calendar|schedule|productivity|todo|to-do|task/.test(text)) {
    action = 'Build one screen that takes three example tasks and highlights the single next task.';
    check = 'Enter three tasks: exactly one is marked next, with a visible reason. Nothing is silently deleted.';
    tiny = 'One next task. The other 47 tabs can wait.';
  } else if (/hackathon|idea|pitch|startup|agent|ai\b/.test(text)) {
    action = 'Build one input-to-verdict screen for a sample pitch, with one next action and a visible source note.';
    check = 'Submit a sample pitch: a verdict, one next action and its source appear. Label fixed or rule-based output.';
    tiny = 'One useful verdict. Keep the robot board of directors on paper.';
  } else {
    action = 'Build one screen with a sample input, one button and one visible example result for this idea.';
    check = 'Press the button: the expected example result appears. Label sample data and repeat the check once.';
    tiny = 'One button that does something. A shockingly good start.';
  }
  let title, line;
  if (broad || extras.length >= 3) {
    title = 'Attempted empire building'; line = 'You have ten minutes, not a Series B.';
  } else if (extras.length >= 1) {
    title = 'Suspicious feature collection'; line = 'Your MVP has packed three suitcases for a day trip.';
  } else {
    title = 'Mostly house-trained'; line = 'This might fit in ten minutes. Please do not add a marketplace while I blink.';
  }
  return {
    idea, verdict:title, roast:line, tiny, next_action:action, observable_check:check,
    park_for_later:extras.length ? extras : ['extra features until the first check passes'],
    reason:'The saved Brain method says to choose one actor, problem and outcome, then build the smallest slice and check observable behavior.',
    lesson:LESSON, mode:'deterministic rules + saved Brain method; no live model or memory call',
    record:{role:'participant',event:'Cognee hackathon — Looping Lab',event_date:'2026-09-21',
      observed_at:new Date().toISOString(),status:'generated suggestion; user build and outcome unverified',
      source:LESSON.source,observed_outcome:'local plan generated',supersedes:null}
  };
}
