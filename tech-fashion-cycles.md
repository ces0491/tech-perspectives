# Everything Old Is New Again: Technology's Fashion Cycles

I was recently at the dentist — not the regular kind, the maxillofacial surgeon kind, because apparently that's where your thirties take you — and ended up in an unexpected conversation about technology. My surgeon, a man who's been in practice longer than I've been alive, was genuinely baffled at how a phone could do the same things as a much larger, more powerful computer. More RAM, more processing power, bigger everything — and yet this little device in his pocket could do it all?

I explained that, in most cases, his phone isn't actually doing the heavy lifting. It's a frontend. The processing happens somewhere else — on servers in a data centre — and his phone just displays the results. He's consuming outputs, not running computations.

It's a conversation I forgot about until recently, when I was training a mixed convolusion network in a Google Colab notebook, borrowing a T4 GPU from Google's infrastructure because my own machine is just too slow for the task. My laptop was doing very little. The real work was happening somewhere else. I was just watching the results stream in through a browser tab.

My laptop, in that moment, was a terminal. A pretty, high-resolution terminal with all the modern conveniences — but functionally, a terminal. Connected to someone else's powerful machine in a room somewhere else, doing the actual compute. Which reminded me of the mainframe systems from the 1960s and 70s (not that I was around then).

## The Cloud Is Just a Mainframe You Don't Own

The mainframe model was simple: a powerful, expensive machine sat in a room, and users accessed it through dumb terminals. You didn't own the compute. You didn't manage the hardware. You just connected and used it.

The PC revolution of the 80s and 90s was a rebellion against that. Computing became personal, distributed, local. Your machine, your software, your data. And then, gradually, we gave it all back. AWS launched in 2006, and within a decade, we'd collectively moved most of our compute back to someone else's machine in a room somewhere. We just started calling it "the cloud" instead of "the mainframe," and replaced dumb terminals with browsers.

Even the pricing model echoes the old days. Time-sharing on a mainframe meant you paid for the compute cycles you used. Today, we call that serverless billing.

## The Pendulum Swings Back. Again

What's interesting is that the counter-reaction has already started. Companies like Basecamp have publicly pulled workloads off the cloud, citing cost. Amazon moved parts of Prime Video from microservices back to a monolith. Edge computing is pushing processing back to devices. Apple is running LLMs on-device. Your phone has a neural processing unit now.

We centralised, then distributed, then centralised again, and now we're distributing again. It's not a circle — it's a spiral. The same ideas return, but at a higher level of capability.

This pattern repeats across the industry.

## Thin Clients, Thick Clients, Thin Clients

The dumb terminal gave way to the PC. The PC gave way to the Chromebook — which is, functionally, a dumb terminal with a nicer screen and a browser. Windows 365 lets you stream an entire desktop from the cloud. We've spent forty years building increasingly powerful local hardware, only to use it as a window into someone else's server.

## Monoliths, Microservices, Monoliths

Rails-style monoliths were the standard. Then microservices became gospel — break everything apart, deploy independently, scale individually. A few years later, teams started discovering that managing hundreds of services, each with its own deployment pipeline, monitoring, and failure modes, created more complexity than it solved. The industry is quietly moving back toward "well-structured monoliths" or "modular monoliths" — which is what good monoliths always were.

## Vertical Integration Returns

For decades, the industry trend was horizontal — commodity hardware running commodity software. It didn't matter who made your processor or your operating system as long as they spoke x86 and ran Windows or Linux.

Then Apple released the M1, and suddenly vertical integration — designing the chip, the OS, and the software together — was exciting again. This is the same philosophy that Sun Microsystems, SGI, and early IBM built their businesses on. Custom silicon for custom software. We just forgot how powerful that approach was because commodity hardware was good enough for long enough.

## So What Comes Back Next?

If the pattern holds, I'd watch a few spaces.

**Local-first software.** Before the internet, all software was local-first by default. Your data lived on your machine. We moved everything to the cloud for convenience and collaboration, but a growing community of developers is building local-first tools — using CRDTs and sync engines to keep data on your device and sync it when convenient. Your data, your machine, but with the collaboration we've come to expect. That's the original model, re-engineered.

**Declarative and functional programming.** LISP is from 1958. The ideas behind it — immutability, first-class functions, declarative composition — keep resurfacing. React is a declarative UI framework. SQL has always been declarative. Every few years, the industry rediscovers that telling the machine *what* you want is more maintainable than telling it *how*, step by step.

**Owned infrastructure.** The cloud made it easy to not think about hardware. But as costs climb and data sovereignty becomes a regulatory concern, more companies are reconsidering what they actually need to rent versus what they should own. It's not a full retreat to on-prem, but it's a correction — hybrid models that look a lot like the managed data centres of the early 2000s.

## Why This Matters

This isn't just trivia. Recognising these cycles is genuinely useful if you're making technology decisions.

When an idea is presented as revolutionary, ask whether it's actually new or whether it's a repackaging of something that fell out of fashion. If it fell out of fashion, ask *why*. The reasons it failed last time might still apply — or they might have been solved by other advances in the interim. Cloud computing works better than mainframe time-sharing because the internet is fast and ubiquitous now. The concept is the same; the enabling conditions changed.

Conversely, when everyone is stampeding toward the latest paradigm — microservices, serverless, everything-as-a-service — it's worth asking what we're losing in the transition. The pendulum always swings back, and the people who see it coming early tend to make better decisions than those who follow the herd to the extreme.

Technology doesn't move in a straight line. It spirals. And if you pay attention to where the spiral has been, you get a much better sense of where it's going.

---
