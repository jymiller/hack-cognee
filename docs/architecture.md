# Architecture and learning loop

## The experiment

A hackathon has a beginning, middle, and end: ideate, build, review. The Looping Lab asks how much of that full SDLC can be repeated and improved with a prepared laptop, reusable methods, and durable memory. Participating in multiple events creates opportunities to compare what happened; the current project does not claim controlled experimental results.

## Current implementation

- **Human direction:** John briefs the roles and makes final choices.
- **Coordination:** Brain is the main Codex task and co-pilot. Supporting roles check in for shared context and help.
- **Memory:** a dedicated Cognee Cloud connection stores selected preparation methods and current project context in one `hackathon-prep` dataset. Separate node sets help organize role-specific observations alongside shared methods.
- **Roles:** Participant builds; Sponsor investigates attendee needs and useful sponsor involvement; Assess Hackathon extracts candidate lessons from evidence; Join New Hackathon prepares information to promote the next event.
- **Public artifacts:** the visual deck and browser edition of Focus Owl are static, hosted pages.
- **Working demo:** a saved, curated method informs Focus Owl’s deterministic idea-to-focus-plan rules. The game itself makes no live Cognee or model request.

## A memory-to-artifact example

1. A saved method says to lock one actor/problem/outcome and build the smallest runnable slice.
2. Participant uses it to define an input-to-verdict toy with a visible next action and check.
3. Focus Owl produces that action and check for a pitch, with source metadata.
4. A human can copy the plan, run the check, and report the outcome.
5. Proposed lessons can be reviewed for a future memory increment. Copying the plan does not automatically ingest it.

The method excerpt included in `scope-goblin/lesson.json` is the public provenance record. It references private source paths for traceability; the underlying corpus is not shipped.

## Evidence boundaries

The mindmap in the deck is a screenshot of observed Cognee data, not a live graph. Agent personas illustrate roles; the picture is not an execution monitor. Walk the Line supplies presentation examples, while its source corpus remains held from memory ingestion. Sponsor feedback in the public deck is limited to material approved for publication.

AWS, Strands, Docker Sandboxes, and Bright Data are not integrated into the delivered demo. The separate Docker edition uses an ordinary container. The public browser edition needs no container, server API, or credentials.
