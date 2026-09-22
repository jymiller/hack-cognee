# Architecture and learning loop

## The experiment

A hackathon has a beginning, middle, and end: ideate, build, review. The Looping Lab asks how much of that full SDLC can be repeated and improved with a prepared laptop, reusable methods, and durable memory. Participating in multiple events creates opportunities to compare what happened; the current project does not claim controlled experimental results.

## Current implementation

- **Human direction:** John briefs the roles and makes final choices.
- **Coordination:** Brain is the main Codex task and co-pilot. Supporting roles check in for shared context and help.
- **Memory:** a dedicated Cognee Cloud connection stores selected preparation methods and current project context in one `hackathon-prep` dataset. Separate node sets help organize role-specific observations alongside shared methods.
- **Roles:** Participant builds; Sponsor investigates attendee needs and useful sponsor involvement; Assess Hackathon extracts candidate lessons from evidence; Join New Hackathon prepares information to promote the next event.
- **Public artifacts:** the seven-chapter visual deck and Wise Owl browser advisor are static, hosted pages. The Solution chapter shows local Codex coordination, reviewed Cognee memory, local files, and the separate saved advisor catalog.
- **Working demo:** Wise Owl matches a question to one of four curated saved records. It makes no live Cognee or model request and does not search the full project history.

## Selecting durable memory

Assessment and the other roles bring observations, sources, and proposed lessons. Brain selects potentially reusable material while preserving uncertainty. John decides what belongs in durable memory. The selected material can then be indexed in Cognee and recall verified. This is a human-directed workflow, not automatic ingestion or a separate deployed service.

Wise Owl's saved catalog is a separate public artifact containing curated methods and approved public excerpts. A line between Cognee and the Codex team represents shared knowledge; it does not imply that the browser advisor calls Cognee live.

## From saved record to a decision

1. The answer panel begins blank. Selecting an example only fills the question; submitting it starts deterministic matching.
2. The bounded catalog covers working together, choosing scope, claims and evidence, and reviewing a result.
3. A matched record separates what happened and its evidence status from interpretation, reuse conditions, and a proposed experiment.
4. The advisor can challenge a blanket rule: making scope smaller is useful only if the resulting test can answer the actual question.
5. A human can copy the decision plan, run an observable check, and report the outcome. Editing the question clears the previous advice.
6. When the catalog lacks relevant evidence, the response says so. It does not fabricate a past project or default to shrinking scope.

`scope-goblin/lesson.json` contains the four public records, source locators, dates, qualifications, and authored experiments. Two records are existing curated methods; two use approved public presentation excerpts. Private source paths are locators for traceability, not bundled corpus files. Copying a plan does not automatically ingest it into Cognee.

## Evidence boundaries

A personal account is not a comparative outcome. A saved method does not demonstrate that it improved judging or build speed. An experiment and its hypothesis are proposals. The Walk the Line review's zero video-confirmed marks and 26 photographs are different units, not an accuracy score; the color mismatch remains an investigative lead rather than a proven cause.

The mindmap in the deck is a screenshot of observed Cognee data, not a live graph. The Team communication graph uses agent personas and connections to illustrate roles and shared context; it is not an execution monitor. Walk the Line supplies approved public presentation examples, while its original source corpus remains held from memory ingestion. Sponsor feedback in the public deck is limited to material approved for publication.

AWS, Strands, Docker Sandboxes, and Bright Data are not integrated into the delivered advisor. The Docker edition uses an ordinary container. The public browser edition needs no container, server API, or credentials. Earlier Scope Goblin / Focus Owl receipts and `DEVPOST.md` remain historical records of the project's evolution.
