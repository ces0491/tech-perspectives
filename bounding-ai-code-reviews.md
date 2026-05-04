# How Long Is a Piece of String? Bounding AI Code Reviews

I've been using Claude Code as my main collaborator on a few tasks for the last few months. Last week I asked it to do an "ultrathink review" of a project — its term for a deeper-than-usual analysis. It came back with 27 findings: critical auth gaps, mislabeled fields, missing test coverage, spec drift, a long tail of nits.

Substantial. Useful. I noted them down. Then I asked something I'd been thinking about but never bothered asking before:

> If I started a fresh session and ran the exact same prompt tomorrow, would you come up with the same suggestions?

The answer (partly expected) was no. Substantially overlapping, but not identical. The 3 to 5 highest-impact items would recur — those are anchored in concrete code that any careful reader would catch. But the long tail of medium and low items would shift. Different session, different sampling path, different scope judgements, different framings.

That may seem frustrating but to be fair, that's not just an LLM property. The act of "review", framed openly, has no stop condition. Ask any competent reviewer "is this good?" and the honest answer is always "could be better." LLMs are just better at articulating the gap, repeatedly, in fresh permutations.

This is fixable. But the fix isn't to be more clever about what we ask. It's to stop asking open-ended questions in the first place.

## Reviews against an undefined ideal are unbounded

When I review my own code, I'm comparing it to some mental model of what good code looks like. That model is always richer than any real implementation. The gap is real, but it's also infinite, because the model has no upper limit.

A single LLM review is a sample from a much larger space of valid critique. There's a stable core — concrete bugs you can verify by pointing at the code. Those recur across runs. There's also a variable tail — taste calls, "consider extracting X," "this could be cleaner." Those shift session to session, depending on what the model happened to attend to and which framing got prominent in context.

Treat the core and the tail the same way, and you've conflated signal with sampling artefacts dressed as findings.

## Bounded versus unbounded domains

Some areas of software have known ceilings. Authentication, for instance: a typical SaaS auth implementation has a definable upper bound — JWT or OAuth2, RBAC or capabilities, audit on privileged actions, rate limiting, MFA, key rotation. You can list the complete set. Same with input validation, money handling, concurrency primitives, test coverage tiers.

For those domains, the right question isn't "is the auth good?" — it's "does it meet this ceiling?" That's binary. Reviews terminate.

Other areas don't have ceilings. Performance is workload-dependent. API ergonomics is taste. Architectural shape is contextual. For those, you can't propose a complete spec — you have to propose criteria specific to the project.

The mistake I see — and made for years — is reviewing both kinds against an undefined ideal. It sort of works when you have your own internal model of what "good" looks like but when you have a super coder like Claude Code who [you think] should know all things, things approach falls apart. What I should have been doing is acknowledge which domain I'm in. If bounded, propose the ceiling. Unbounded, Ask for criteria.

## The missing scaffolding

This brings me to the operational insight that's actually changing how I work.

When you start a project, conventional wisdom says set up version control, write a README, add a license, configure CI. None of these define what "done" looks like.

I've started writing a `SCOPE.md` at project init. It answers five questions:

1. What is this project for? One sentence.
2. What does "done" look like? Pass/fail criteria, not vibes.
3. What is explicitly out of scope?
4. What is the bar — POC, production, library, research script, throwaway?
5. Who decides when criteria are met?

You have to commit to scope before the first commit. Anybody who's done any kind of project management would scoff at how plainly obvious this is. But I manage projects, and I have not been doing this. Because I didn't see my coding agent as a collaborator, I saw it as a tool. I've never had to explain to Excel or R Studio what I'm doing but that sort of thinking doesn't translate to AI powered workflows.

Once it exists, reviews terminate. "Does this meet the criteria in SCOPE.md?" has a yes/no answer. So does "is this feature in scope?" when someone asks for one. So does "is this gold-plating?" when you're tempted to refactor. Anything outside SCOPE.md is either a deliberate scope change — update the doc — or it isn't happening.

The same trick works for AI reviews. If I tell Claude up front "review against criteria A, B, C — anything outside that is out of scope," I get a bounded answer. Without that, I get the next layer of an infinite spiral.

## The deeper realisation

The instinct to review against an undefined ideal isn't an LLM problem. It's a software discipline problem that LLMs make visible.

Senior reviewers in real teams handle this implicitly because they share context: they know what the team is trying to build, what's already accepted as scope, what the bar is. Junior reviewers ask "is this good?" and don't get useful answers because the question is unbounded. Teams that ask "does this meet our standards?" get terminating ones, because "our standards" is a definable artefact.

LLMs are new team members on every session. They don't have shared context. If you don't hand them the criteria, they default to the global ideal — which is unbounded by construction.

## What I changed

Two things, both small.

I added `SCOPE.md` to the list of files I create at project init, alongside `README.md`. Nothing automated about it — a habit shift.

Then, because habits decay, I wired it into Claude Code itself with a `SessionStart` hook. If I open a session in a project root that has the markers of a real project — a README, a `package.json`, a `pyproject.toml` — but no `SCOPE.md`, the harness injects a reminder telling Claude to propose one before doing meaningful work. There's an opt-out marker for throwaway repos.

The hook is deterministic. Memory and good intentions aren't.

## The takeaway

If you're using AI to review code — or honestly, if you're using any reviewer to review code — define the criteria before you ask. Otherwise you're asking how long a piece of string is, and you'll keep getting longer pieces of string back.

Done isn't when the reviewer stops finding things. Done is when the project does what it was scoped to do.

---
