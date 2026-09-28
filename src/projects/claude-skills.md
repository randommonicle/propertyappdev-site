---
layout: layouts/project.njk
title: "claude-skills: Guardrails for Claude Code | Ben Graham"
description: "An open-source library of Claude Code skills and hooks. Most exist because the mistake they prevent already shipped in one of my production codebases."
heading: "claude-skills: engineering guardrails for Claude Code"
cardTitle: "claude-skills"
tag: "Open source"
strap: "An open-source library of the rules I use to keep AI coding agents honest."
summary: "I build software by directing AI coding agents, and they repeat the same kinds of mistake. Each skill is a short rule Claude Code loads at the moment it is about to make one. Most came from a defect that had already shipped."
status: "Public on GitHub, Apache-2.0"
order: 3
updated: "2026-09-28"
lead: "I build software by directing AI coding agents, and they make the same kinds of mistake again and again. claude-skills is the set of rules I wrote to stop them, published on GitHub for anyone who uses Claude Code."
facts:
  - label: Contents
    value: "Skills, hooks and always-on norms, installable as a Claude Code plugin"
  - label: Licence
    value: "Apache-2.0"
  - label: Source
    value: '<a href="https://github.com/randommonicle/claude-skills" rel="noopener noreferrer" target="_blank">github.com/randommonicle/claude-skills</a>'
  - label: Status
    value: "Public and maintained"
---

## The problem it solves

AI coding agents are quick and confident, and they declare success too easily. A command exits without an error, a deploy reports "accepted", and the agent calls the job done without checking that anything actually changed. On a platform that handles service charge money or leaseholders' personal data, that habit is dangerous.

Each skill in the library is a short rule that Claude Code loads by itself at the moment it is about to do the thing the rule covers. The two that change the most behaviour are `verify-the-effect`, which says never call something done because a command exited cleanly, and `prove-it-can-fail`, which says a test that cannot go red is not a test.

## Where the rules come from

Most skills were distilled from the lessons-learned records of four production codebases, one of them a regulated UK property management platform. A lesson only becomes a skill once it has turned up in more than one of them.

## How it is organised

The library holds {{ site.facts.skills }} skills in four layers. Hooks run automatically around what Claude does, for example asking before any code is pushed to GitHub or blocking a command that would print a secret. Six always-on norms sit in every session. Hub skills own a moment in the workflow, such as planning a change or declaring it done, and route to narrow leaf skills with tightly worded triggers. The layering matters once a library passes a few dozen skills, because loosely described skills start firing on each other's work.

Some rules come straight from regulated work. `ai-surface-discipline` applies to any feature that sends data to a language model: send the minimum personal data it needs, constrain what comes back, and keep a person in the loop.

## Using it

The library installs once per machine as a Claude Code plugin and applies to every project on it. Installation takes about five minutes, and the steps are in the [repository README](https://github.com/randommonicle/claude-skills). This site was built with the library installed, and every change to it runs an automated check of links, metadata and structured data before it can deploy.
