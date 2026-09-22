# Focus Owl (formerly Scope Goblin)

A tiny Participant-built focus coach: one big idea → one small next action, a visible definition of done, and extras to park for later. **Turn a big idea into one small thing you can finish.** The **Keep my focus plan** button reveals a complete Markdown plan, selected for copying. It includes the saved source, role, event, observation time and an explicit unverified-suggestion status.

**Local URL:** http://127.0.0.1:8793

## What actually works

The app runs in an ordinary Docker container from the locally cached `python:3.12-alpine` image, with a Python standard-library HTTP server and a single HTML page. Pizza, pet, productivity, pitch/AI and generic ideas map to simple topic rules. Three focus messages depend on broad scope and extra features. This is deterministic code using a curated saved Brain method, not live model reasoning or fresh Cognee retrieval. Docker Sandboxes, AWS and Bright Data are not integrated.

The lesson in `lesson.json` is an exact excerpt from `brain/hackathon-prep/increments/05-looping-lab-prep-dispatch.md`, also found in the saved `prep/cognee-ready/memory/build_eval_plan.json`. It shapes the app's action-plus-check format. Topic selection and jokes are authored rules; no improved-outcome claim follows from using the lesson.

No keys, env files or private corpus are copied into the image. The build allowlist contains only the app, page and curated lesson. The container runs as a non-root user with a read-only filesystem, and its port is bound to localhost. Pitches are not logged or stored by the server. Copying a plan remains a user action.

## Run

From the `scope-goblin/` directory:

```sh
docker build --pull=false -t looping-lab-scope-goblin:local .
docker run --rm -d --name looping-lab-scope-goblin --read-only --cap-drop ALL --security-opt no-new-privileges --memory 64m --cpus 0.5 -p 127.0.0.1:8793:8080 looping-lab-scope-goblin:local
```

If this named container is already running, use the local URL. To stop this app:

```sh
docker stop looping-lab-scope-goblin
```

## Thirty-second demonstration

1. Open the local URL and click **Pizza empire**.
2. Click **Find my focus**. The owl says, “Big wings. Small first flight.” It reduces the idea to one button choosing from three sample dinners.
3. Point to the observable check and expand the saved-method explanation.
4. Click **Keep my focus plan** to expose the source-linked Markdown record. Copy it if useful.

Suggested line: **“We built the Brain, and then our Participant used one of its saved methods to build an owl that helps us choose one thing to finish.”**

## Verification and limits

`focus-owl-verification.json` records the latest rename, focus-plan flow and engine parity checks. The older `verification.json` records the original Goblin local HTTP checks, invalid-input handling, exact lesson provenance and browser checks. The pizza and hamster flows and the copyable plan were exercised in Codex. A 390px viewport had no horizontal overflow. These are preparer checks, not audience feedback or independent assessment. No submission, award eligibility, faster future build, live memory query or full hackathon lifecycle is claimed. Walk the Line source and ingestion remain held. No Site/shared files were edited.


## Browser edition for the presentation Site

`portable/index.html` is the complete self-contained browser edition. Copy this file as a page in a static Site; no server API, asset directory, API key or localhost connection is needed. It preserves the local toy's existing cartoon interface, verdict, action, observable check and copyable plan. It is labeled **Browser edition** and makes no container-execution claim. No animation or extra feature was added in this portability pass.

Regenerate with `python3 -B build-portable.py` after changing the local page or curated lesson. The JavaScript engine is in `browser-engine.js`; keep its rules in sync with `app.py`. Eight cases matched all Python response fields except generation timestamps, and the pizza-to-copyable-plan flow passed in Codex. See `portable-verification.json`. Brain owns the Site copy, final-page link and publication.

The source directory, Docker image/container name and `/api/roast` route retain their original names for compatibility. The visible product is Focus Owl. Brain owns updating the public Site and deck; `/scope-goblin/` remains a compatible public path.
