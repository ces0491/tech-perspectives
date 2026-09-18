---
title: "Running to Stand Still: Why Perfect Code Still Gets Patched"
description: >-
  If AI ends up writing near-perfect code, do software updates become new features only? No. Some change you choose and some the world forces on you, and AI may soon handle the forced kind on its own.
date: 2026-09-18
tags: [ai, software, security]
---

It seems that most code is now written by machines rather than people, and it keeps getting better. That got me wondering whether it could get good enough that software updates would only ever add features. Perfect code would have no bugs to fix, and no vulnerabilities to patch either. But could such a thing as perfect code ever exist?

I've concluded not, but for a reason other than I initially expected. Code can get very close to perfect, as long as perfect means doing exactly what it was meant to do at the time it was written. Updates still won't be features only, because some changes you choose and others the world forces on you. What AI may change is who handles the forced ones. They could turn into something closer to an immune response, happening in the background without anyone deciding on it.

Most of the ideas here come from people who work much closer to these fields than I do, and I've credited them as they come up. What I've tried to do is put them together in a way that's digestible for a broad audience, who, like me, are interested but not experts.

## Perfect against what

Code can only be correct against something: a specification (spec), which is a precise description of what it should do. Proving code correct against its spec is already possible for some software. seL4, the core of an operating system, and CompCert, a compiler (the program that turns the code people write into instructions a computer runs), both come with mathematical proofs that the code does what its spec says. When researchers fed randomly generated programs to a range of C compilers to hunt for bugs, CompCert was [the only one](https://users.cs.utah.edu/~regehr/papers/pldi11-preprint.pdf) where they couldn't make the proven part produce wrong results. The bugs they did find were in a part the proof didn't cover, and in a corner the spec didn't describe fully.

Those proofs hold under stated assumptions, though. The seL4 team [lists theirs](https://www.sigops.org/s/conferences/sosp/2009/papers/klein-sosp09.pdf): the compiler used to build it, the start-up code and the hardware itself are among the things assumed to work correctly. And the spec has to say what you actually wanted. So a proof moves the question to the spec.

It's tempting to think that's where perfect code breaks down, because specs come from people and people get things wrong. Say I build an app to sell hotdogs and it sells hotdogs. Later I realise I should have been selling burgers. Nothing was wrong with the hotdog app. I changed my mind, and the burger version is a new release with that burger-selling feature.

What does count against the code is intent I had at the time and never wrote down. If the hotdog app lets someone order minus three hotdogs and collect a refund, I didn't change my mind about that. I never wanted it, and the spec never said so. A lot of security vulnerabilities look like this: specs describe what should happen, and rarely list everything that must not.

Machines can close most of that gap, because most unstated intent is shared: no negative quantities, no charging twice, no showing one customer another's orders. In my experience AI models are good at inferring those, and at finding the gaps and contradictions in a spec. It's why I now write a scope file before starting a project (see [*How Long Is a Piece of String?*](bounding-ai-code-reviews.html)). With a machine checking the spec and a proof tying the code to it, code that is correct against what you intended at the time looks achievable. It rests on proof tools getting much cheaper, which I think we can foresee happening over the coming years.

## Decided or imposed

Even if you grant all of that, updates don't become features only. MD5 and SHA-1 are hash algorithms, used to check that files and digital signatures haven't been tampered with. A perfectly correct implementation of either is still insecure today, because both were broken after they shipped: MD5 [in 2004](https://eprint.iacr.org/2004/199) and SHA-1 [in 2017](https://shattered.io/). RSA, the encryption behind much of the internet's security, is [expected to follow](https://nvlpubs.nist.gov/nistpubs/ir/2016/NIST.IR.8105.pdf) once quantum computers get large enough, which is why the US standards body NIST has already [published replacement standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). None of that code had a bug. The world it runs in changed.

You could argue that "I now want to be safe from the new attack" is just another change of intent, which would make it a feature too. Push that far, though, and every change is a feature, so perfect code is perfect by definition and the question stops meaning anything. Perhaps a more useful framing of change:

- **Decided:** I chose to change it. Burgers instead of hotdogs.
- **Imposed:** the change is forced on me, and I'd lose something by not making it. An algorithm gets broken, someone else's code that mine relies on gets withdrawn, a regulator changes the rules.

This framing is at least fifty years old. E. Burton Swanson [split software maintenance](http://www.mit.jyu.fi/ope/kurssit/TIES462/Materiaalit/Swanson.pdf) in 1976 into corrective work (fixing faults), adaptive work (keeping up with a changing environment) and perfective work (improvements people ask for). He described failures and environmental change as causes where "a response is typically unavoidable", against changes that reflect "the initiatives of user and maintenance personnel". Manny Lehman's [first law of software evolution](https://users.ece.utexas.edu/~perry/education/SE-Intro/lehman.pdf) says much the same: a program used in the real world "undergoes continual change or becomes progressively less useful."

What perfect code does to Swanson's categories is take corrective work, fixing bugs, to near zero. It does nothing about adaptive work, which arrives at the speed the world moves, however good the code is.

## Adapt or perish

Put that way, software starts to look like biology. The environment changes and an organism adapts or dies out. Treating software as an evolving ecosystem has a research literature of its own, and a [recent example](https://arxiv.org/abs/2512.02953) asks what AI coding tools will do to it. Security is a close match for what biologists call the Red Queen hypothesis, after the character in *Through the Looking-Glass* who has to keep running to stay in the same place. Attackers and defenders evolve against each other, and patching is the running. I'm not the first to [make that comparison](https://learn.microsoft.com/en-us/archive/blogs/tzink/the-red-queen-theory-of-internet-security) either.

Biology has no perfect organism, only organisms well suited to the environment they're in right now. Perfect code works the same way. It can be perfect against its spec at a point in time, and it stops being perfect when the world moves.

The analogy breaks on intent. Evolution has none: variation is random and selection does the work. Software has my "decided" changes too, and they get written straight into the next version. That makes software closer to Lamarck, who thought creatures passed on traits they acquired during their lives, than to Darwin.

## An immune system for code

Until now, both kinds of change went through a person. Someone decided on the burgers, and someone noticed the broken hash algorithm and wrote the patch. With AI writing the code, the imposed changes don't need a person any more. A security hole is announced, the affected code gets updated, the automated tests pass and the fix ships. That works more like an immune system than evolution - your body fights off a cold without you deciding to.

Stephanie Forrest and colleagues were building security on immune-system principles in the 1990s ([*Computer Immunology*](https://doi.org/10.1145/262793.262811), 1997), and software that repairs bugs by itself has been a research field for over fifteen years. It now runs end to end without a person. In DARPA's AI Cyber Challenge, which [finished in August 2025](https://www.darpa.mil/news/2025/aixcc-results), the finalists' autonomous systems between them found 18 real vulnerabilities in open-source software and supplied patches for 11.

So from a person's point of view, updates may well become features only. The imposed changes still happen, but as background maintenance nobody decides on or sees.

## When the immune system is the target

An immune system that runs on its own, while convenient, comes with its own perils and becomes a surface worth attacking. Whatever comes in through the update pipeline gets trusted and spread everywhere, so that's where an attacker should aim. The xz utils backdoor, found in 2024, was an early example: a contributor spent [over two years](https://research.swtch.com/xz-timeline) earning the trust of the people who maintain xz, a compression tool built into many Linux systems, then slipped a backdoor in through its normal release process. Automated repair has its own version. A 2025 study [wrote 51 fake bug reports](https://arxiv.org/abs/2509.05372) aimed at an AI repair system, and 90% of them got it to produce the patch the attacker wanted. In biology the equivalent is a pathogen that exploits the immune response, or an autoimmune disease where the defences attack the body.

The automation also speeds up the environment it's responding to. When each system adapts on its own, its changes become imposed changes for everything that depends on it, and those systems adapt in turn. The faster systems adapt, the faster the environment around them changes.

Having the same models write the spec, the code and the review makes this worse. As I found with AI code reviews, each run is one sample, and different runs share blind spots, so a miss in the spec can pass straight through all three. In [*Musings on the Future of Programming Languages*](the-future-of-programming-languages.html) I wondered whether reading code might become like reading the raw instructions a processor runs: possible, but rarely needed. If that happens, no person reads the code at all.

Computer scientists proposed a defence for this decades ago. In [proof-carrying code](https://doi.org/10.1145/263699.263712), described by George Necula in 1997, code from an untrusted source arrives with a mathematical proof that it follows an agreed set of safety rules, and the system receiving it checks the proof before running anything. Applied here, a model would produce the spec, the code and a proof that one matches the other, and a small, deliberately simple program called a proof checker would confirm the proof is valid. Trust would then rest on the proof checker, which is small enough for people to audit. It only protects what the spec describes, though. A tampered spec gets through, and so does an attack like the xz backdoor, which was hidden in the build process rather than in the code a proof would cover.

So code can get close to perfect and still need patching for as long as the world keeps changing. If machines take that patching over, the immune system becomes the thing to protect. Proof checking is one way to protect it, and it can only be as good as the spec.
