## Inspiration
Every hackathon has a beginning, a middle and an end: ideation, build and review. But too often, the lessons stay behind when the event ends. The Looping Lab treats each hackathon as an experiment in running the full software development lifecycle—and carries useful learning into the next one.

The ambition is simple: arrive with the knowledge, tools and working methods ready, choose an idea, and say, “Go build it, factory.”

## What it does
The Looping Lab gives a human-directed team of Codex agents one cumulative Cognee Hackathon Brain. John directs the Brain co-pilot, which supports four roles: Participant, Sponsor, Assessment and Next Hackathon.

Together, they help build the project, gather attendee feedback, review what happened and prepare for the next event. A visual presentation records the story as it develops: move right through the story and down into the evidence.

Our working demonstration is Focus Owl, originally called Scope Goblin. Give it an oversized idea and it helps you choose one small action, park distractions and define an observable check for “done.”

## How we built it
We seeded Cognee Cloud with a selected hackathon-prep corpus, processed it into memory and verified retrieval. The team uses a dedicated Hackathon Brain connection with shared and role-specific memory sections. Local files preserve briefs, decisions, source material and verification records.

The agents work locally in Codex under human direction. Focus Owl applies a curated remembered scoping method through deterministic rules. It runs as a standalone browser game and in an ordinary local Docker container. The game itself makes no live model or Cognee calls.

We built a keyboard-navigable presentation and published the code, README and screenshots so the work can be inspected and reused.

## Challenges we ran into
The challenge was deciding what deserved to become memory. Loading everything takes time and can bury the useful lessons. We prioritized the initial corpus, kept source context and separated observations from interpretations.

We also had to keep the presentation aligned with a fast-changing project. Private interviews stayed private, and unreviewed material from the previous hackathon remained outside the memory ingestion process.

## Accomplishments that we're proud of
We connected a shared Hackathon Brain and verified role-specific retrieval. We brought a human-directed team of agents into the same working context, built a playable demonstration of a remembered method, and made the learning loop visible through an interactive presentation.

The result is inspectable: a public game, a public repository, presentation screenshots and a story that distinguishes completed work from future ambitions.

## What we learned
Useful memory needs curation, provenance and a clear reason to retrieve it. A lesson becomes valuable when it changes a concrete decision—not simply because it appears in a graph.

Small commitments help keep a build moving. One actor, one problem, one outcome and an observable check make a practical starting point. Reflection during the event can also capture things that a code repository misses, including the experience of building together and what attendees need from sponsors.

## What's next for The Looping Lab
Review the new lessons, add selected evidence to the brain, and apply it at the next hackathon. We want to compare experiments over time: what we reused, what changed, what worked and what should be remembered.

We have not yet measured a speedup. The next step is to test whether this accumulated knowledge helps us start better, control scope and complete more useful learning loops.

## Links
[Presentation](https://milbird-three-layers-sep26.john821249.chatgpt.site/) · [Play Focus Owl](https://milbird-three-layers-sep26.john821249.chatgpt.site/scope-goblin/) · [GitHub, README and screenshots](https://github.com/jymiller/hack-cognee)
