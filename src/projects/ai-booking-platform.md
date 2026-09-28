---
layout: layouts/project.njk
title: "AI Booking Platform for a Local Business | Ben Graham"
description: "A conversational booking system on Netlify and the Claude API. Customers ask questions and book through an AI assistant, and the server blocks double bookings."
heading: "AI booking platform for a local service business"
cardTitle: "AI booking platform"
tag: "Full-stack development"
strap: "A conversational booking system that replaced phone and email enquiries for a small business."
summary: "Customers talk to an AI assistant, which answers their questions, can look at a photo of the problem, checks availability and takes the booking. Confirmations go out by email, and the owner manages bookings from a dashboard."
status: "Live and taking bookings"
order: 5
updated: "2026-09-28"
lightbox: true
lead: "A small business was taking every enquiry by phone and email. I built them a booking platform where customers talk to an AI assistant, get their questions answered and book a slot, while the owner manages everything from a dashboard."
facts:
  - label: Client
    value: "Small local service business, through my independent practice"
  - label: Stack
    value: "HTML, Node.js on Netlify Functions, Netlify Blobs, Resend, Claude API"
  - label: Features
    value: "Conversational booking, photo analysis, double-booking prevention, email confirmations, admin dashboard"
  - label: Status
    value: "Live and taking bookings"
---

## For customers

The AI assistant is the front door. Customers describe what they need in their own words and can upload a photo, which Claude looks at to understand the job. The assistant answers questions, checks availability and takes the booking. Once a booking is confirmed, the customer gets an email confirmation with a link to add the appointment to Google Calendar.

## Behind the scenes

Availability and double-booking checks run on the server, so a confused conversation cannot overbook the diary. Bookings are stored in Netlify Blobs and confirmation emails are sent through Resend.

The owner has an admin dashboard behind a login, where they can view, change and export bookings. The platform replaced a manual process of phone calls and emails and has taken live bookings since it launched.

## Screenshots

<div class="screenshots-grid">
  <img src="/images/icc-1-800.webp" data-full="/images/icc-1.webp" alt="AI booking platform: homepage" class="screenshot-img" width="800" height="397" loading="lazy" decoding="async" tabindex="0" role="button" aria-label="Open enlarged view: homepage">
  <img src="/images/icc-2-800.webp" data-full="/images/icc-2.webp" alt="AI booking platform: AI chat interface" class="screenshot-img" width="800" height="393" loading="lazy" decoding="async" tabindex="0" role="button" aria-label="Open enlarged view: AI chat interface">
  <img src="/images/icc-3-800.webp" data-full="/images/icc-3.webp" alt="AI booking platform: booking enquiry form" class="screenshot-img screenshot-img--bottom" width="800" height="389" loading="lazy" decoding="async" tabindex="0" role="button" aria-label="Open enlarged view: booking enquiry form">
  <img src="/images/icc-4-800.webp" data-full="/images/icc-4.webp" alt="AI booking platform: about section" class="screenshot-img" width="800" height="385" loading="lazy" decoding="async" tabindex="0" role="button" aria-label="Open enlarged view: about section">
</div>
