# Squashing New Hardware Headaches

Getting a new machine should be exciting - a battery that can last for more than 23 minutes, more RAM, a fancy new NPU, and keys that click rather than squelch. But, if you're a data or software professional, it's often not. I recently traded up and just left my new machine in the box for a few days, dreading having to set it up - not that it's hard, it's just really boring and the first thing I run is almost guaranteed to break. My development environment isn't a handful of apps from the Microsoft Store, it's dozens of tools, hundreds of packages, specific configurations, environment variables, path settings, and all the little things that make my machine *mine*. The kind of setup where you only realise something's missing three weeks later when a project won't build.

This time, I tried something different. I used Claude Code to handle the migration. And it worked far better than I expected.

## The Old Way

Every developer knows the ritual. You get a new machine and spend the better part of a day (or two) reinstalling everything. You're on your nth new machine so you know the drill for the bulk of the procedures - you've probably got a dusty old bookmark in your browser somewhere telling you all the things that need getting. Then you remember you need to configure Git. Then you realise your Python packages aren't quite right. Then the R libraries. Then the VS Code extensions - all sixty-something of them. Somewhere along the way you forget to set an environment variable and spend an hour debugging why something isn't on PATH.

It's painful. And if you're in data or software development, you likely have a more complex setup than most — multiple languages, database clients, cloud CLIs, package managers, SSH keys. The kind of environment that's easy to use daily but painful to reconstruct from memory.

Some of us maintain dotfiles or setup scripts. But let's be honest — most of us don't. And even when we do, they go stale faster than we'd like to admit.

## The Experiment

Instead of reconstructing my setup manually, I described my old environment to Claude and asked it to generate the automation scripts I'd need to replicate everything on a fresh Windows machine (I'm a proud Excel power-user, so yes, Windows).

Here's what it produced:

- **A main PowerShell setup script** that installs 40+ applications via `winget`, creates a clean centralised folder structure under, and configures all the necessary environment variables
- **A Git configuration script** to set up credentials, default branch naming, line endings, and editor preferences
- **Package installation scripts** for Python, R, npm, and VS Code extensions
- **A credentials migration guide** covering SSH keys, API tokens, database connections, and app-specific re-authentication steps

The whole thing followed a clear nine-step workflow: run the main installer, refresh the shell, configure Git, set up Node via NVM, install language-specific packages, and handle credentials last.

What impressed me most wasn't any single script - it was the orchestration. The AI understood the dependency chain. It knew that environment variables needed to be set before package managers could install to custom paths. It knew NVM needed to be configured before Node packages could be installed. It structured everything in the right order without me having to think about sequencing.

## What Went Well

**Speed.** What would have taken me most of a day was reduced to about 45 minutes of automated installation time, plus some manual steps for credentials and authentication. The actual *thinking* - deciding what to install, where to put it, how to configure it - was handled almost entirely by the AI.

**Completeness.** When you set up a machine manually, you inevitably forget things. The AI was methodical in a way I wouldn't have been. It asked clarifying questions about my workflow, then produced a comprehensive list that included tools I'd have remembered only weeks later.

**Structure.** It designed a folder hierarchy that's cleaner than anything I'd have set up myself - separating interpreters, packages, tools, and projects into logical subdirectories. Every environment variable pointed somewhere intentional rather than wherever an installer happened to default.

**Documentation.** Each script was clearly commented. There was a README with step-by-step instructions. The credentials migration guide was thorough enough that I didn't have to guess which apps needed re-authentication.

## What Still Needed a Human

The AI handled about 90% of the process. The remaining 10% was the stuff that inherently requires human involvement:

- **Credentials and authentication**: SSH keys need to be physically transferred. OAuth flows need a browser and a human clicking "Authorise." API keys need to be copied from password managers. No script can do this for you, nor should it.
- **Licence activation**: JetBrains IDEs, Adobe tools, and similar software needed manual sign-in.
- **Personal preferences**: Theme choices, font sizes, window layouts. The AI set up sensible defaults, but the final tweaks were mine.
- **Validation**: I still needed to open each tool, verify it worked, and confirm package installations completed without errors.

None of this was surprising, and none of it was painful. It was the manageable 10% - the kind of work that feels reasonable when everything else has been handled for you.

## Why I think this is useful

I ran this as an experiment, but the implications go further than one person's setup.

**For developers and data professionals**, this approach could save hours of productivity lost to environment setup — whether it's a new hire onboarding, a hardware refresh, or recovering from a machine failure. Instead of maintaining brittle setup scripts that go stale, you describe your environment conversationally and generate fresh automation on demand.

**For teams**, there's an interesting possibility here. If an AI can generate a reproducible development environment from a description, teams could standardise setups without maintaining complex provisioning tools. A plain-language specification of "what our devs need" could replace pages of onboarding documentation.

**For IT departments**, this could shift laptop provisioning from a manual, error-prone process to something closer to infrastructure-as-code, but without requiring everyone to learn Ansible or write Dockerfiles.

## Conclusion

If you're in data or software development and you've been putting off a hardware migration because of the setup overhead, give it a go. Describe what you need, let the AI generate the automation, review what it produces, and run it. You might be surprised at how little of the process actually needs you, even for something as fiddly as this.
