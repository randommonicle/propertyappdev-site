---
layout: layouts/project.njk
title: "AI Property Inspection App: Voice to Report | Ben Graham"
description: "A voice-and-photo inspection app for iPhone and Android. Claude files each spoken observation under the right report heading and drafts the report."
heading: "Property inspection app: from voice notes to a finished report"
cardTitle: "Property inspection app"
tag: "Mobile app and AI"
strap: "Voice-led block inspections that end with a finished, branded report in the inspector's inbox."
summary: "Property managers dictate what they see as they walk a building and take photos as they go. Claude sorts each observation into the report, describes the photos and drafts the write-up, which used to take about two hours per inspection."
status: "Live since May 2026"
order: 1
updated: "2026-09-28"
lead: "Inspections used to mean handwritten notes on site and about two hours at a desk afterwards turning them into a report. I built an app that takes a property manager's spoken notes and photos during the visit and produces the finished report."
facts:
  - label: Role
    value: "Designed and built it, and support the colleagues who use it"
  - label: Platforms
    value: "iPhone and Android, built with Capacitor and React"
  - label: Services
    value: "Node.js on Railway, Supabase, Deepgram speech-to-text, Claude Sonnet and Claude Opus, Resend"
  - label: Status
    value: "Live since May 2026"
---

## What it replaced

A block inspection produces dozens of small observations, such as a cracked light fitting on the second floor or a fire door that no longer closes on its own. Written up by hand afterwards, each report took about two hours. The write-up was the bottleneck, so that is what the app removes.

## How an inspection runs now

The property manager picks the property, starts an inspection and walks the building. For each area they tap record and describe what they see. Deepgram transcribes the speech as they talk, and Claude Sonnet reads each observation and files it under the right section of the report. Photos are taken along the way and either linked to an observation or left for later.

Everything is saved on the phone first. Plant rooms, basements and stairwells often have no signal, and nothing is lost if the connection drops. When the inspection is finished it syncs to Supabase, and Claude Opus then describes each photo and writes its caption.

Back at the office, one tap builds the report. The observations are written up as professional prose, anything also raised at the previous inspection is flagged as a recurring issue, and a condition summary is added. The property manager receives a branded Word document by email, with a link to an interactive HTML copy.

## Decisions that mattered

- The app works offline. It writes to SQLite on the device and syncs in the background, so an inspection never stops for a weak signal.
- Photos are analysed once they have synced. That keeps the walk-round quick, and no model calls are spent on photos that end up deleted.
- The server holds no data of its own. Everything lives in Supabase, so the server can be restarted or redeployed at any time without losing an inspection.
- Phones get shared, so the app asks for a login again whenever it starts fresh.
- Model usage is logged, so running costs are attributed per workflow and reviewed against the time the app saves.

## Where it stands

The app has been in use since May 2026 and has handled {{ site.facts.inspections }} inspections. Colleagues use it on iPhone and I use the Android build. It is part of the [AI adoption programme](/projects/ai-adoption-programme/) I run at the firm, and it was built using the working rules I publish as [claude-skills](/projects/claude-skills/).
