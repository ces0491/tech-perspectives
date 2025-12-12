# Musings on the Future of Programming Languages

*A follow-up to [AI: The Final Nail in the Coffin for Proprietary Software Languages?](ai-end-of-proprietary-platforms.md)*

Last month, I suggested that AI would accelerate the decline of proprietary analysis languages like Stata and MATLAB. But I've been thinking about this more, and went down the rabbit hole of considering the future of programming languages in general. So, putting [digital] pen to paper, I've jotted down some thoughts on why we may continue to need human-readable code at all.

Consider what code used to (and still does) do for us: communication with computers, collaboration with other humans, verification that it does what we intended, and reuse so we can run it again later.

Now, when you ask Gemini to write an ETL pipeline in Python, you're asking it to translate between two machines - itself and the computer that will run the code. Python is just the middle layer we insist on because it's the only way we know how to verify what's happening. Python was designed for humans to read write, not for machines to generate. The AI doesn't need any of that. It could generate something far more efficient - direct computation graphs, optimized instruction sequences, or some new format designed specifically for AI-to-machine communication.

Consider the typical process: I describe what I want in natural language, AI generates Python code so I can check its work, then a computer runs that code to produce the actual output. Why do we need step 2? If I want a data analysis, why not have the AI directly produce the analysis? If I need a dashboard, why generate the Python that creates HTML instead of just generating the final HTML?

I went about in circles thinking about this but, as of now (and probably subject to change), concluded that it's to do with trust and verification. ChatGPT et al does want to just generate the final HTML, but anyone who's attempted this will know it is hardly ever what you wanted and riddled with clever tricks to look good but have no functionality. I ask for Python code because I can read it and confirm it's doing what I want. Having said that, are we maintaining an entire translation layer that exists solely for human verification? Every request carries this overhead. Makes sense though - we know that these tools are prone to error - but for how long?

In attempt to provide some structure to the scramble of thoughts I have about this, I'll look at code as serving three different purposes.

## Code for Verification

First, there's code for verification - one-off tasks where I just want to check the AI's logic before trusting the results. A quick analysis, a report, data exploration. The code is pure overhead here. As trust grows, this will become unnecessary.

## Code for Exact Reproducibility

Second, there's code for exact reproducibility - work that must produce identical results every time. This is where my initial thinking broke down. Code is deterministic. The same Python script with the same input produces the same output, bit-for-bit. AI doesn't do that. Ask Claude to analyze a dataset three times, you get three different analyses. They might all be reasonable, might reach similar conclusions, but they won't be identical. Science doesn't look for essence, it looks for exact. When a researcher shares Stata code, another researcher can verify that they get identical results - not similar results. AI can't provide that specification.

## Code as a Deliverable

Third, there's code as a deliverable - building systems where infrastructure demands it. Web applications need HTML, CSS, and JavaScript because that's what browsers execute. Data pipelines need code that deployment systems can run. The entire computing stack was built around these languages - we can't just skip them.

The inefficiency isn't just one unnecessary layer either. AI translates my intent to Python, Python gets transpiled to JavaScript, JavaScript gets compiled to bytecode. Each step exists because of decisions made when humans were the ones writing code.

---

So the future splits along these lines: verification-only code disappears as trust grows. Reproducibility-required code persists because determinism matters. Infrastructure-required code persists because our systems demand it.

This reframes how I think about proprietary languages. Stata isn't surviving on institutional inertia or comfortable syntax - it's serving a functional need for deterministic reproducibility in research. That's real infrastructure, just social rather than technical. If economics journals require code that produces identical results for peer review, then Stata (or Python, or R) remains necessary regardless of AI capabilities. Unless the definition of reproducibility itself changes, but that's a much bigger cultural shift than just adopting new tools.

We used to write code to communicate with computers. And while that is no longer our exclusive means of communication, I am becoming increasingly convinced that the varied and nuanced uses of code can not be made entirely obsolete by AI, at least not rapidly. Verification will fade as trust grows. But deterministic specification will persist. As will infrastructure requirements which are locked in by decades of technical decisions. While nothing is forever, it will take time for this to change - I'm tempted to make inferences from our transition away from fossil fuel infrastructure to renewables.

Python and JavaScript will survive - embedded in our infrastructure. Stata and MATLAB persist where exact reproducibility matters. Whether we'll still need to understand them is another matter. Reading code might become like reading assembly - technically possible but rarely necessary. They might become invisible to most of us who just want to build things, still running everything but no longer something we need to comprehend.

---
