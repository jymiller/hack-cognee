# The Looping Lab

**One lab. Every hackathon, another loop.**

The Looping Lab is a human-led hackathon learning system: **ideation → build → review → reuse**. Each event is an experiment in running the full software development lifecycle. The aim is to arrive with the laptop, methods, and context ready, choose the next idea, and say: “Go build it, factory.”

Built for **Battle of the Personal Brains**, September 21, 2026.

- **[Open the presentation](https://milbird-three-layers-sep26.john821249.chatgpt.site/#story)** — Left/Right advances the story; Down opens the evidence and detail.
- **[Play Scope Goblin](https://milbird-three-layers-sep26.john821249.chatgpt.site/scope-goblin/)** — turn an overambitious pitch into a small, checkable next step.
- **[Explore Milbird’s hackathon history](https://milbird.com/hackathons/)** — the broader series of projects and experiments.

## What we built

A shared Cognee brain carries hackathon methods and selected project context into a human-directed team in Codex. John directs the Brain co-pilot. The Participant, Sponsor, Assess Hackathon, and Join New Hackathon roles work with that shared context, each bringing a different perspective. John remains the decision owner.

The presentation tells the learning loop visually: the lab, the team around a round table, the previous Walk the Line build, reflection, the live demo, and the next event. Details and evidence sit below each chapter.

**Scope Goblin** is the small working artifact built by the Participant. It uses a saved Brain method—build the smallest runnable slice and check observable behavior—to turn a pitch into a gentle roast, one next action, and an observable check. It can reveal a copyable plan containing its source and verification status.

## Screenshots

Captured from the running presentation:

| The learning loop | The agent team |
| --- | --- |
| ![The Looping Lab: ideation, build, review](docs/screenshots/looping-lab.png) | ![The team collaborating around a round table](docs/screenshots/agent-round-table.png) |
| Reflection | Live demo |
| ![Reflection with Rodin’s The Thinker](docs/screenshots/reflection.png) | ![The Scope Goblin live demo slide](docs/screenshots/live-demo.png) |

## Architecture

```mermaid
flowchart LR
    John[John: direction and decisions] --> Brain[Brain co-pilot]
    Brain <--> Memory[(Cognee: shared hackathon memory)]
    Brain <--> Participant[Participant]
    Brain <--> Sponsor[Sponsor]
    Brain <--> Assessment[Assess Hackathon]
    Brain <--> Next[Join New Hackathon]
    Participant --> Goblin[Scope Goblin]
    Assessment --> Lessons[Proposed lessons with evidence]
    Lessons --> Brain
    Brain --> Deck[Visual presentation]
```

The project’s Cognee dataset is `hackathon-prep`, in the `hackathon machine` workspace. Role-specific node sets organize shared, participant, sponsor, and assessment context. They are retrieval filters, not separate security boundaries. Memory is selected and reviewed before ingestion; the previous Walk the Line corpus has not been ingested.

The agents run in local Codex tasks. Cognee memory is hosted on Cognee Cloud. The public presentation and browser game are static pages; they do not carry API keys or call the private brain. The game uses deterministic rules and a curated saved method, not a live language model. AWS, Strands, Docker Sandboxes, and Bright Data were discussed but are not part of the delivered demo. An ordinary Docker version of Scope Goblin is included.

See [the architecture notes](docs/architecture.md) and [verification records](scope-goblin/portable-verification.json).

## Run the presentation and browser demo locally

Python 3 is sufficient; there is no package install or build step.

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory presentation
```

Open [the presentation](http://127.0.0.1:4173/) or [Scope Goblin](http://127.0.0.1:4173/scope-goblin/).

To regenerate the standalone game after editing its source:

```sh
python3 -B scope-goblin/build-portable.py
cp scope-goblin/portable/index.html presentation/scope-goblin/index.html
```

## Run Scope Goblin in Docker

```sh
cd scope-goblin
docker build -t looping-lab-scope-goblin:local .
docker run --rm --name looping-lab-scope-goblin --read-only --cap-drop ALL --security-opt no-new-privileges --memory 64m --cpus 0.5 -p 127.0.0.1:8793:8080 looping-lab-scope-goblin:local
```

Open [the container edition](http://127.0.0.1:8793/). The container uses only Python’s standard library, runs as a non-root user, and does not store pitches.

## A 30-second demo

1. Open Scope Goblin and choose **Pizza empire**.
2. Choose **Roast my scope**: “You have ten minutes, not a Series B.”
3. Show the single dinner-picker action and its observable check.
4. Choose **Keep my tiny plan** to reveal the source-linked Markdown plan.
5. Return to the presentation’s reflection: what should the next loop remember?

## Verification and scope

The original implementation was checked in a local Docker container and browser, including invalid input and a 390px viewport. Eight cases matched the Python and browser engines, excluding generation timestamps. The public browser demo’s pizza-to-plan flow and the local hamster flow were rechecked before submission. These are preparer checks, not independent assessment or a demonstrated improvement in future outcomes.

This repository is the public submission snapshot: runnable demo code, the public presentation, screenshots, and documentation. It excludes API keys, local credential files, private memory corpora, and private interview transcripts. The historical preparation repository remains private. No video recording is included yet.

## Credits

Created by John Miller / [Milbird](https://milbird.com/) with a human-directed Codex agent team and Cognee memory. The team illustration is an illustrative scene rather than a transcript of live agent activity. See [visual credits](docs/visual-credits.md) for image provenance and the Rodin photograph’s CC BY-SA 3.0 attribution.
