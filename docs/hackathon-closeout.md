# Looping Lab — hackathon closeout

Recorded September 22, 2026, after **Battle of the Personal Brains** on September 21, 2026.

**Submission status: submitted, confirmed by John at closeout.** No judging outcome, win, or prize result is known in this record. This statement records the owner's confirmation; it is not a separate Devpost submission receipt.

## What we were trying to do

The Looping Lab treats each hackathon as a full learning loop: **ideation → build → review → reuse**. Each event provides new experiences and an opportunity to try strategies for the next one. The long-term ambition is a prepared laptop, reusable methods, and accumulated knowledge that let John choose an idea and say, “Go build it, factory.”

This event made that workflow visible: a human-directed agent team, one shared Cognee brain, a public presentation, and a small advisor that turns selected past material into a qualified next experiment. Faster builds and better hackathon results remain goals, not measured outcomes of this project.

## What was delivered

| Artifact | State at closeout |
| --- | --- |
| Visual presentation | Public Site v20; seven chapters with horizontal story navigation and supporting detail below. |
| Local Codex team | Five established roles: Brain, Participant, Sponsor, Assess Hackathon, and Join New Hackathon. John directs the work. |
| Hackathon Brain | One Cognee Cloud workspace, `hackathon machine`, with the `hackathon-prep` dataset and a selected, indexed, recall-verified foundation. |
| Wise Owl | Working browser advisor and ordinary Docker edition, using four curated saved records and deterministic matching. |
| Public repository | Presentation snapshot and editable content, runnable advisor source, documentation, screenshots, credits, and verification records. |
| Interviewer | Proposed role documented under the Team chapter; **not built or launched**. |

The presentation sequence is **Looping Lab → Team → Solution → Walk the Line → Reflection → LIVE DEMO (+System) → Links**. The Team graph shows communication and shared context. Solution separates the local team and Cognee memory from Wise Owl's saved catalog. Walk the Line supplies a previous-loop example, Reflection gathers lessons, and Links includes the next event.

Site v20 was published from source commit `9e16e3455ce23a01089f1b0dc19fd9218715e55d`. The public repository's matching deck update is commit `935698fd7feabbd1d6d25e4f4a7b83ee93783adf`, before this documentation-only closeout.

## The team and memory decisions

| Role | Responsibility |
| --- | --- |
| Brain | John's main co-pilot: coordinates the work, helps the other roles, qualifies reusable material, and maintains the presentation. |
| Participant | Prepares and builds the current project, then returns the artifact and checks. |
| Sponsor | Investigates attendee needs, useful product applications, friction, and support needs. |
| Assess Hackathon | Reviews a recent event's evidence, limitations, and candidate lessons. |
| Join New Hackathon | Prepares information and drafts to promote the next event. |

The roles work in local Codex tasks; Cognee memory is hosted on Cognee Cloud. Shared, participant, sponsor, and assessment node sets organize retrieval within one dataset. These filters are not separate access-control boundaries, and the role diagram is not a live process monitor.

Assessment and the other roles contribute observations, sources, and proposed lessons. Brain helps select useful material while preserving its uncertainty. John decides what belongs in durable memory. Selected material can then be indexed and recall checked. This is a human-reviewed workflow, not automatic ingestion. The original Walk the Line corpus remains held from ingestion.

## Wise Owl: what actually runs

**Wise Owl — your hackathon advisor. Know what we tried. Choose what to try next.**

The answer panel starts blank. Selecting an example fills the question without answering it; **Ask Wise Owl** triggers deterministic matching. Editing the question clears stale advice. A matched answer shows the available record, its source and limits, reuse conditions, and a proposed experiment with an observable check. A question outside the catalog gets an explicit missing-evidence response. **Keep this decision plan** reveals copyable Markdown, and the header returns to the presentation.

The four records cover:

- **Working together:** a public personal reflection, with no measured speedup or established causal effect.
- **Choosing scope:** a saved operating method, with no comparative outcome; a connected test can be more useful than making a component smaller.
- **Claims and evidence:** a saved communication method, with its rationale distinguished from a measured result.
- **Reviewing a result:** an approved public artifact review, with the disagreement recorded and its cause unresolved.

The catalog contains two existing curated methods and two approved public presentation excerpts. Proposed experiments are authored suggestions, not past outcomes. The advisor makes **no live model or Cognee request**, loads no private corpus, and does not retain questions. The complete hackathon history is not loaded.

The source directory and public URL retain `scope-goblin` for compatibility. Earlier Scope Goblin and Focus Owl builds remain part of the project's history. AWS, Strands, Docker Sandboxes, and Bright Data are not integrated into the delivered advisor; its Docker edition uses an ordinary container.

## Verification preserved

- [Wise Owl local receipt](../scope-goblin/wise-owl-verification.json): nine Python/browser parity and routing cases, invalid-input checks, four themes, blank initial output, clearing advice on edit, explicit unknowns, a copyable plan, local Docker, and return navigation.
- [Repeatable verifier](../scope-goblin/verify-wise-owl.py): `python3 -B scope-goblin/verify-wise-owl.py` from the repository root, with Python and Node available.
- [Published browser receipt](../scope-goblin/wise-owl-public-verification.json): the Site v15 deck → advisor → presentation round trip, including a qualified collaboration answer and arrow navigation after return.

At closeout, both the advisor artifact and its presentation copy still match that archived public receipt's SHA-256: `4e40f95a7892a61175c90c883c5d1c88ddbed8d757e297c35704e5795f04a3ed`. Later presentation edits do not turn the v15 receipt into a new v20 browser test. These are preparer checks, not independent assessment or evidence of improved future hackathon results.

[The historical Devpost narrative](../DEVPOST.md) and all earlier verification receipts are preserved unchanged. Their earlier product names and behavior document the project's evolution.

## What remains open

1. Record the official judging and prize outcome when known, retaining its source.
2. Review the event's new observations and decide which lessons should enter durable memory; preserve the existing Walk the Line ingestion hold until John changes it.
3. Test whether retrieved knowledge changes a decision, reduces rework, or improves a later build. No speedup has been measured yet.
4. Expand Wise Owl only with qualified records, keeping missing outcomes and proposals explicit. Live Cognee retrieval would be a separate implementation step.
5. If prioritized, build the planned Interviewer: podcast context → focused interview → John reviews answers → update project decisions and next actions. Its voice model and provider are still unspecified.
6. Record a demo video if useful; none is included in this repository at closeout.

## Public links and retained screenshots

- [Presentation](https://milbird-three-layers-sep26.john821249.chatgpt.site/#story)
- [Wise Owl](https://milbird-three-layers-sep26.john821249.chatgpt.site/scope-goblin/)
- [GitHub repository](https://github.com/jymiller/hack-cognee)
- [Milbird hackathon history](https://milbird.com/hackathons/)
- [Next event: Party Multiplayer Build Night](https://luma.com/rrd6rmb4)
- [Architecture notes](architecture.md) and [visual credits](visual-credits.md)

Existing captures are preserved below; final text-only detail additions were not separately recaptured.

| Learning loop | Agent communication |
| --- | --- |
| ![Looping Lab cover](screenshots/looping-lab.png) | ![Agent communication and shared memory](screenshots/agent-round-table.png) |
| Solution | Reflection |
| ![Solution architecture](screenshots/solution.png) | ![The Thinker and reflection caption](screenshots/reflection.png) |
| Live demo | Next hackathon |
| ![Wise Owl live demo](screenshots/live-demo.png) | ![Next hackathon](screenshots/next-hackathon.png) |

This public closeout contains no private interviews, original private memory corpus, or credentials. The comprehensive private working backup is maintained separately.
