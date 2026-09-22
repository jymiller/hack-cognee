# The Looping Lab

## Tagline

One lab. Every hackathon, another loop. A shared Cognee brain helps a human-led agent team carry useful methods from ideation to build, review, and the next event.

## Inspiration

After participating in dozens of hackathons, I wanted the learning to compound. Every event has a beginning, middle, and end: ideation, build, and review. Too often, its methods and lessons stay in yesterday's directory. The Looping Lab asks: what should we remember so the next hackathon starts from a better place?

The ambition is simple: arrive with my laptop and context ready, choose an idea, and say, “Go build it, factory.”

## What it does

The Looping Lab combines one cumulative Hackathon Brain with a human-directed team in Codex. I direct the Brain co-pilot, which helps Participant, Sponsor, Assess Hackathon, and Join New Hackathon work from shared context. Role-specific memory sections keep their perspectives distinguishable.

A visual presentation connects the lab, the team, the previous Walk the Line project, reflection, and our live demo. Move right to follow the story and down to inspect details.

Our working artifact is **Scope Goblin**: enter an oversized pitch and get a gentle roast, one small next action, and an observable check. “Keep my tiny plan” reveals a copyable plan with its saved method and provenance. It demonstrates how remembered guidance can shape a product.

## How we built it

We selected preparation methods and project context for Cognee Cloud, then used local Codex tasks as our human-directed agent team. One dedicated dataset supports shared, participant, sponsor, and assessment context; these are retrieval filters, not separate security boundaries.

Scope Goblin uses Python's standard library in an ordinary Docker container. Its self-contained JavaScript browser edition runs on the public presentation site. Both apply the same curated lesson: build the smallest runnable slice and check something observable. The game is deterministic; it makes no live model or Cognee calls.

The presentation uses HTML, CSS, JavaScript, and SVG, hosted with Sites. Private keys and memory files stay outside the public site and repository.

## Challenges we ran into

The challenge was deciding what deserves to become memory. We had to separate goals from completed work, owner reflections from measured results, and an agent's helpful interpretation from source evidence. We also reduced the architecture to a local team we could actually demonstrate. AWS, Strands, Docker Sandboxes, and Bright Data were explored but are not implemented in this submission.

## Accomplishments that we're proud of

- Connected the core roles to the dedicated Hackathon Brain and checked retrieval of their role definitions.
- Turned one saved method into a small, playable artifact with a source-linked plan.
- Matched eight cases across the Python and browser game engines and exercised the main browser flows.
- Made the learning story inspectable through a public deck, runnable code, and screenshots.

## What we learned

Memory is useful when it changes the next decision. “Build a smaller slice” becomes concrete when the output includes one action and a way to check it. A human remains essential for choosing what to remember, resolving ambiguity, and deciding which lessons to carry forward.

This is an initial demonstration, not evidence of faster future builds. The previous Walk the Line session corpus has not been ingested; presenting its visuals and reflections is separate from loading it into memory.

## What's next

Close each loop with a reviewed account of what happened, qualify lessons with their evidence, and bring selected lessons into the next event. Compare the next build with the previous one: did remembered guidance change the scope, reduce rework, or improve the result? Extend participant and sponsor feedback while keeping private interviews out of public material.

## Built with

Cognee · Codex · Python · JavaScript · HTML · CSS · SVG · Docker · Sites

## Project links

- Presentation: https://milbird-three-layers-sep26.john821249.chatgpt.site/#story
- Play Scope Goblin: https://milbird-three-layers-sep26.john821249.chatgpt.site/scope-goblin/
- GitHub: https://github.com/jymiller/hack-cognee
- Hackathon history: https://milbird.com/hackathons/

No demo video has been recorded for this submission yet.
