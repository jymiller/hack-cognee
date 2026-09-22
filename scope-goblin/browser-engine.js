/* Browser port of app.py. Only the curated catalog supplied at build time is read. */
function normalized(value) {
  return ' ' + (value.toLowerCase().match(/[a-z0-9]+/g) || []).join(' ') + ' ';
}
function browserAdvise(raw) {
  if (typeof raw !== 'string' || raw.trim().length < 5 || raw.trim().length > 600)
    throw Error('Ask a question between 5 and 600 characters.');
  const question = raw.trim(), text = normalized(question);
  let bestScore = 0, selected = null;
  for (const lesson of CATALOG.lessons) {
    const score = lesson.terms.reduce((sum, term) => sum + (text.includes(normalized(term)) ? normalized(term).trim().split(' ').length : 0), 0);
    if (score > bestScore) { bestScore = score; selected = lesson; }
  }
  let result;
  if (selected) {
    const {terms, ...record} = selected;
    result = {...record, matched:true,
      limits:'This is a matching saved record, not a search of the full project history. Reuse conditions, rule challenges and experiments are proposals; they are not recorded outcomes.'};
  } else {
    result = {
      id:null, theme:null, matched:false,
      title:'No matching saved evidence.', evidence_type:'Unknown in this catalog',
      lesson:'I do not have a relevant record for this question in the four lessons loaded here.',
      outcome_status:'No recorded outcome for this question',
      what_happened:'This catalog cannot establish what you tried, whether it worked or why. Missing evidence here does not mean the experience never happened.',
      why:'The loaded records cover collaboration, scope, evidence labels and a video/photo review. I cannot infer another project’s history from them.',
      reuse_when:null, rule_to_challenge:null,
      experiment:'Identify a project name or event date, then locate its source, run receipt or debrief before choosing a lesson to reuse. This offline page cannot perform that search.',
      hypothesis:'A relevant record may exist outside this small catalog; that has not been established.',
      observable_check:'A source identifies the attempted action, the observed result and its date. If it does not explain why, keep the cause unknown.',
      disconfirming_result:'A plan, credential name or similar-looking project alone does not establish that the action ran or worked.',
      source:null,
      limits:'No scope reduction, historical outcome or cause is inferred. Ask about a loaded theme or bring the missing evidence back to the wider Brain workflow.'
    };
  }
  return {...result, question, mode:CATALOG.mode, generated_at:new Date().toISOString()};
}
