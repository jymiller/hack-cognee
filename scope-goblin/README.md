# Wise Owl — your hackathon advisor

**Know what we tried. Choose what to try next.**

Wise Owl starts with a question. Its answer panel is blank until submission and clears when the question changes. The advisor matches the question to a bounded catalog of four saved records, distinguishes evidence from proposals, and suggests when to reuse a lesson or challenge a rule with an observable experiment.

Local Docker URL: http://127.0.0.1:8793/

The public presentation keeps the compatible `/scope-goblin/` URL. Brain owns its copy and publication. The source directory and Docker names also retain their original names for compatibility; the visible product is Wise Owl.

## Available evidence

- **Working together:** John’s approved public reflection about a short trial with Rene and the enjoyment of building together. Personal account; no measured speedup or actual two-hour duration is claimed.
- **Choosing scope:** an existing curated operating method. No comparative outcome is recorded. A connected end-to-end test may be more useful than automatically making a component smaller.
- **Claims and evidence:** a curated communication method. Evidence labels and execution claims retain their limits; no outcome improvement is assumed.
- **Reviewing a result:** the approved public Walk the Line video/photo review. Zero video-confirmed marks and 26 reviewed photos are different units, not an accuracy score. The color mismatch is an unresolved lead, not a proven cause.

`lesson.json` contains the curated catalog, source locators, dates, evidence labels, reuse conditions and proposed experiments. No original Walk the Line source or private interview was used, and nothing was ingested into Cognee. An unmatched question gets an explicit missing-evidence response, never a fabricated past project or an automatic scope-reduction recommendation.

This is saved-record matching, not a live model or full Cognee search. Suggestions and experiments are authored proposals. The wider team can investigate records that are absent from this small catalog.

## Run and build

From this directory:

```sh
docker build --pull=false -t looping-lab-scope-goblin:local .
docker run --rm -d --name looping-lab-scope-goblin --read-only --cap-drop ALL --security-opt no-new-privileges --memory 64m --cpus 0.5 -p 127.0.0.1:8793:8080 looping-lab-scope-goblin:local
```

To stop this local app: `docker stop looping-lab-scope-goblin`.

The ordinary Docker container uses a non-root user, a read-only filesystem and localhost binding. It contains only the Python app, HTML and curated catalog. No credentials, provider calls, request logs or persistent question storage are used.

`POST /api/advise` accepts a `question` string of 5–600 characters. The historical `/api/roast` route and `idea` field remain aliases but return the new advisor response schema. `GET /health` identifies Wise Owl and the four loaded records.

## Portable browser edition

Run `python3 -B build-portable.py` to generate `portable/index.html`, a standalone page with the catalog and JavaScript engine embedded. It makes no backend requests. Keep `browser-engine.js` and `app.py` consistent.

Preserve the header’s **Back to the presentation** link. It returns to the public presentation’s `#today` chapter in the same tab. Brain owns the presentation, deployment, public URL and screenshot updates.

## Verification

Run `python3 -B verify-wise-owl.py` for nine question-routing and Python/browser equivalence cases, invalid inputs, evidence boundaries, JavaScript syntax, standalone output and return-link checks. Node is needed only for this development check, not the container or deployed page.

`wise-owl-verification.json` records the latest browser and Docker checks: blank initial output; no answer when merely selecting an example; four distinct themes; explicit unknown for Bright Data history; clearing stale advice when editing; complete copyable decision plan; and a working return to the presentation. Source review found no unsupported outcome or causal claims.

Older verification files document the preceding Scope Goblin / Focus Owl builds. They are historical receipts and do not establish the current advisor’s behavior or a measured improvement in hackathon outcomes.

`wise-owl-public-verification.json` separately records the published Site v15 browser round trip, including the blank initial answer, qualified collaboration response, copyable decision plan, and return navigation.
