---
layout: layouts/project.njk
title: "PropOS: A Property Management Platform | Ben Graham"
description: "PropOS is a property management platform I am building for managing agents and RMC boards: Section 20, service charge ledgers, compliance and building safety."
heading: "PropOS: a property management platform for leasehold blocks"
cardTitle: "PropOS"
tag: "Platform in development"
strap: "Block management software built around how leasehold property is actually run."
summary: "A property management platform for managing agents, smaller agencies and self-managed RMC and RTM blocks. Compliance, Section 20, a double-entry service charge ledger, collections and year-end reporting are built; the sales-pack workspace and the higher-risk building module are in progress."
status: "In development"
order: 4
updated: "2026-09-28"
lead: "Most of my working week happens inside block management software, so I know where it helps and where it gets in the way. PropOS is the platform I would want to use, built from the start around Section 20 consultation and service charge accounting."
facts:
  - label: Role
    value: "Product owner and developer, building with AI coding agents"
  - label: For
    value: "Managing agents, smaller agencies, and RMC and RTM companies that manage their own blocks"
  - label: Stack
    value: "React, TypeScript, Supabase (Postgres, Auth, Storage, Edge Functions), Claude API, Vercel"
  - label: Status
    value: "In development; the repository is private"
---

## What is built

On the compliance side there is a compliance tracker, an insurance tracker, a contractor register with managed trade categories, and works orders that go out to contractors by email with a page for their response. Section 20 consultation is covered through its full lifecycle.

The financial core covers bank accounts, service charge accounts, demands and transactions, with a double-entry ledger underneath. Payments and bank account closures need two people to authorise them, and bank statements can be imported and reconciled.

Built on top of that are a collections workflow with its statutory notice stages, including the section 20B time limit on demands, a creditors module, and year-end and variance reporting with an AI-assisted wizard that drafts the variance narrative. The Building Safety Act golden thread, the record of a building's safety information, has its data model in place.

## What is in progress

- A workspace for leasehold property enquiry (LPE1) packs when a flat is sold.
- The rest of the higher-risk building module: mandatory occurrence reporting, a register of higher-risk buildings, principal accountable persons and building safety cases.

After that come reporting (AGM packs and section 20B schedules among them) and a wider AI layer for documents, works triage and compliance alerts.

## How it is built

The data lives in Supabase Postgres, protected by row-level security policies. Schema changes go in as numbered migrations, and each migration that changes the database carries a query that verifies the change once it has been applied. There is a Playwright end-to-end smoke suite, and notes on UK GDPR, RICS requirements, the Building Safety Act and the Landlord and Tenant Act sit in the repository alongside the code.

I build it by directing AI coding agents under written rules for planning, testing and verification. The rules that proved themselves on PropOS and my other projects are published as [claude-skills](/projects/claude-skills/).
