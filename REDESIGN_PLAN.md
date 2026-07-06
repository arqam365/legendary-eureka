# Revzion Site Redesign Plan
> Status: PLANNING — do not start implementing until explicitly told to

---

## Brand System (Reference)

| Token | Value | Usage |
|---|---|---|
| Ink | `#0B1220` | Headlines, dark sections, nav |
| Mist | `#EEF1F6` | Section backgrounds, card fills |
| Signal Blue | `#2563EB` | CTAs, links, accents, icons |
| Aurum Gold | `#C9A227` | Eyebrow labels, decorative marks |
| Slate | `#64748B` | Body text, subtext |
| Paper | `#ffffff` | Default page bg |
| Display font | Fraunces 500/600 | H1, H2 only |
| Body font | Inter | Everything else |
| Border radius | `rounded-2xl` | Cards, chips |
| Section padding | `py-24 sm:py-32` | Consistent vertical rhythm |

---

## Page Priority Order

1. `/services` — highest traffic after homepage
2. `/portfolio` — client proof, second most important
3. `/about` — brand + founder story
4. `/contact` — conversion page
5. `/blogs` (listing) — SEO traffic
6. `/process` — trust builder
7. `/estimate` — conversion support
8. `/careers` — team building
9. `/labs` — brand personality
10. `/referrals` — partner channel
11. `/resources` — SEO / content
12. `/privacy-policy`, `/terms`, `/cookie-settings` — legal, minimal redesign

---

## Page Plans

---

### 1. `/services`

**Current state:** Long scrolling page with accordion process steps, service list, tech stack section, and a CTA. Functional but visually generic — all white/gray, small text, no strong visual hierarchy.

**Redesign goals:**
- Make each service feel distinct and premium
- Add a sticky sidebar or floating service nav on desktop
- Use the bento grid pattern (same as homepage "What We Build") for the 6 services at the top
- Each service gets its own expanded section below the fold with: deliverables, tech stack pills, case study link

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "ENGINEERING SERVICES"
  - Fraunces H1: "Everything your product needs — under one roof."
  - Subtext: 1 sentence
  - Two pills: "50+ Projects Delivered" · "99.9% SLA"

[Service Grid — bento]
  - Same 6-card bento as homepage (linked to anchors)
  - Mist background

[Expanded Service Sections × 6]
  Each has its own bg alternating white / Mist:
  - #s-enterprise | #s-ai | #s-saas | #s-cloud | #s-mobile | #s-data
  - Left: Gold number + service name + description + bullet deliverables
  - Right: tech stack pills + link to a case study
  - Quote/stat callout in Signal Blue

[Process Teaser]
  - 4-step horizontal timeline (simplified version of /process)
  - White bg

[FAQ Accordion]
  - 6 Q&As (schema already wired)
  - White bg

[CTA Bar]
  - Ink bg, same as homepage CTA section
```

---

### 2. `/portfolio`

**Current state:** Filter tabs, card grid. Cards show project name, category badge, short description, tech tags. Basic styling, looks like a template.

**Redesign goals:**
- Make it feel like a proper agency showreel
- Hero with a strong statement about outcomes, not just "our work"
- Large featured case study at top (Evolwe or most impressive)
- Remaining projects in a responsive masonry/card grid
- Each card: full-bleed image, overlay on hover (but subtle), clear outcome metric

**Section breakdown:**

```
[Hero]
  - Ink bg
  - Gold eyebrow: "SELECTED WORK"
  - Fraunces H1: "Problems we've solved. Products we've shipped."
  - Subtext: 1 sentence on range of clients
  - Two stat chips: "50+ Projects" · "12 Industries"

[Featured Case Study — full width]
  - 2-col layout: large image left, content right
  - White bg
  - Project name, category, challenge summary, result metric
  - "View case study →" link

[Project Filter + Grid]
  - Mist bg
  - Filter pills: All / Mobile / SaaS / AI / Web / E-commerce
  - Cards: white rounded-2xl, project image (full cover), category badge, name, 1 outcome metric
  - No hover effects — cards strong statically

[Testimonials Strip]
  - White bg
  - 2–3 client quotes (if available)

[CTA]
  - Ink bg
```

---

### 3. `/portfolio/[id]` (case study detail)

**Current state:** Unknown — check what exists. Likely minimal.

**Redesign goals:**
- Full editorial case study layout
- Clear problem → solution → outcome narrative
- Tech stack section
- Metrics dashboard (KPIs as large numbers)
- Next project navigation

**Section breakdown:**

```
[Hero]
  - Project cover image (full width, 60vh)
  - Overlay with project name + category + client
  - Ink tint overlay

[Overview Strip]
  - 4 stats: Timeline / Stack / Team size / Key metric
  - Mist bg

[Problem Statement]
  - White bg, max-w-3xl centered
  - Fraunces pull quote highlighting the core challenge

[Solution]
  - 2-col or narrative sections
  - Screenshots / mockups

[Tech Stack]
  - Pill grid of technologies used

[Outcomes / Results]
  - 3–4 large stat cards (Signal Blue numbers, Mist bg)

[Next Project]
  - Ink bg strip with link to next case study
```

---

### 4. `/about`

**Current state:** Team avatars (generated), founder section, values list, basic layout.

**Redesign goals:**
- Lead with Arqam's story — personal, founder-forward
- Make the team section feel real (even with generated avatars)
- Values section: icon + short statement, not a bullet list
- Mission statement as a large Fraunces pull quote

**Section breakdown:**

```
[Hero]
  - Split 2-col: left = content, right = founder image/avatar
  - Mist bg
  - Gold eyebrow: "OUR STORY"
  - Fraunces H1: "Built by engineers, for engineers."
  - 2–3 sentence founder note

[Founder Feature]
  - White bg, full-width
  - Large name treatment (Fraunces), role, bio
  - Social links (LinkedIn, GitHub, Twitter, portfolio)
  - Quote block with gold left border

[Mission / Vision]
  - Ink bg
  - Large Fraunces pull quote: the mission statement
  - 3 stat chips below

[Values Grid]
  - Mist bg
  - 6 values as cards: icon (blue) + value name (bold) + 1-line explanation
  - White cards, same bento feel

[Team Section]
  - White bg
  - Horizontal scroll on mobile, grid on desktop
  - Avatar + name + role + social icons

[CTA]
  - Same Ink CTA bar
```

---

### 5. `/contact`

**Current state:** Form on left, contact info on right. Functional, plain. No personality.

**Redesign goals:**
- Hero with a warm but professional opening statement
- Make the form feel premium — larger fields, clear labels, progress feel
- Right side: key info + availability badge + response time promise

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "START A CONVERSATION"
  - Fraunces H1: "Tell us what you want to build."
  - Subtext: "We'll respond within 24 hours with a focused assessment — not a sales pitch."

[Contact Split — main content]
  - White bg
  - Left (60%): form
    - Name, Email, Company, Phone
    - Service dropdown
    - Budget range
    - Message (textarea)
    - Submit button (Signal Blue, full width on mobile)
  - Right (40%): contact details
    - Email chips (contact, arqam)
    - Location + timezone
    - "Typically responds in < 24 hours" badge
    - LinkedIn / GitHub links

[FAQ Strip]
  - Mist bg
  - 4–5 quick accordion Q&As (already wired)

[Map / Location Visual]
  - Optional: simple styled map or illustrated India map
```

---

### 6. `/blogs` (listing)

**Current state:** BlogsClient with post cards. Layout unknown.

**Redesign goals:**
- Magazine-style listing, not a basic card grid
- Featured post at top (latest or pinned)
- Category filter
- Cards with cover image, category badge, title, author, read time, date

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "INSIGHTS"
  - Fraunces H1: "Engineering perspectives."
  - Subtext: "Deep dives on SaaS, AI, mobile, and the craft of building software."

[Featured Post — full width card]
  - White bg
  - Large horizontal card: image left, content right
  - Category badge, title, excerpt, author, date, read time

[Post Grid]
  - Mist bg
  - 3-col on desktop, 1-col mobile
  - Cards: cover image (16:9), category pill, title, author chip, date

[Newsletter / Subscribe strip]
  - Ink bg
  - "Get engineering insights in your inbox" + email input
```

---

### 7. `/process`

**Current state:** 6-step process with icons, accordion FAQ, some callout cards. Decent content, basic styling.

**Redesign goals:**
- Make the 6 steps feel like a timeline / journey
- Each step card: bold number, strong title, deliverables as chips
- Visual connector between steps (line/dots)

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "HOW WE WORK"
  - Fraunces H1: "A process built for reliability, not heroics."
  - Subtext: 1 sentence on weekly demos and predictable delivery

[6-Step Timeline]
  - White bg
  - Alternating left/right layout on desktop (timeline down center)
  - Each step: number (large, Ink), title, description, deliverable chips (Mist pills)
  - Connector line in Signal Blue/Mist

[Why It Works — 3 stat callouts]
  - Ink bg
  - "Weekly demos" · "Fixed scope estimates" · "Post-launch SLOs"

[FAQ Accordion]
  - White bg (already wired with JSON-LD)

[CTA Bar]
  - Ink bg
```

---

### 8. `/estimate`

**Current state:** Unknown — likely a form or pricing table.

**Redesign goals:**
- Multi-step estimate wizard or simple scoping form
- Budget range selector
- Timeline selector
- Summary card on right that updates based on selections

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "GET AN ESTIMATE"
  - Fraunces H1: "What does your project cost?"
  - Subtext: "Answer a few questions. We'll give you a realistic range in minutes."

[Estimate Form / Wizard]
  - White bg
  - Step 1: What type of project? (6 service options as clickable cards)
  - Step 2: What's your timeline? (pill selector)
  - Step 3: Team & budget preference (radio/slider)
  - Step 4: Contact info to receive estimate
  - Right panel (desktop): live estimate summary card

[Pricing Philosophy]
  - Mist bg
  - "Why we don't publish fixed prices" — transparent explanation
  - 3 pricing model explanations: Fixed Scope / Retainer / T&M

[CTA]
  - Ink bg
```

---

### 9. `/careers`

**Current state:** 3 job listings with apply dialog. Simple, clean but minimal.

**Redesign goals:**
- Lead with culture/team story
- Job cards that feel like offers, not listings
- Benefits/perks section
- Open application CTA at bottom

**Section breakdown:**

```
[Hero]
  - Ink bg
  - Gold eyebrow: "JOIN THE TEAM"
  - Fraunces H1: "Build real things with a senior team."
  - Subtext: "Remote-first. Fast-paced. Meritocratic."
  - 3 culture chips: "Remote-first" · "Senior mentorship" · "Real products"

[Open Roles]
  - White bg
  - 3 job cards (bento style — different widths for visual interest)
  - Each: role title, type badge, description, "Apply →" button
  - JobPosting JSON-LD already wired

[Why Revzion]
  - Mist bg
  - 4–6 perk cards: icon + short title + 1-line description
  - e.g. "Remote-first" / "No bureaucracy" / "Ship fast" / "Learn constantly"

[Open Application]
  - Ink bg
  - "Don't see your role? Apply anyway."
  - Email link to careers@revzion.com

[CTA]
  - Same pattern
```

---

### 10. `/labs`

**Current state:** Has a ROADMAP.md and knowledge.md — likely experimental content.

**Redesign goals:**
- Showcase Revzion's experimental projects, open-source tools, and research
- Make it feel like a playground/workshop — slightly more playful than other pages
- Card grid of lab projects with status badges (In Progress / Shipped / Concept)

**Section breakdown:**

```
[Hero]
  - Ink bg with subtle grid texture
  - Gold eyebrow: "REVZION LABS"
  - Fraunces H1: "Where experiments become products."
  - Subtext: 1 sentence on the innovation culture

[Lab Projects Grid]
  - Mist bg
  - Cards: project name, status badge (color coded), short description, tech tags
  - Status: Shipped (green) / In Progress (blue) / Concept (gold)

[Open Source / Contributions]
  - White bg
  - GitHub links to any open-source work

[Research Notes / Articles]
  - Mist bg
  - Links to knowledge.md content or blog posts tagged "Labs"
```

---

### 11. `/referrals`

**Current state:** Unknown.

**Redesign goals:**
- Simple, clear partner program page
- How it works (3 steps)
- Reward/commission structure
- CTA to submit a referral

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "PARTNER PROGRAM"
  - Fraunces H1: "Refer a client. Earn a reward."

[How It Works — 3 steps]
  - White bg, horizontal 3-col
  - Step 1: Submit a referral / Step 2: We close the project / Step 3: You earn

[Reward Structure]
  - Mist bg
  - Callout card with commission % or flat fee

[Submit Referral Form]
  - White bg
  - Simple form: Your name, their name, their email, context

[CTA]
  - Ink bg
```

---

### 12. `/resources`

**Current state:** Unknown.

**Redesign goals:**
- Curated content hub: guides, templates, checklists
- Categories: SaaS / Mobile / AI / DevOps

**Section breakdown:**

```
[Hero]
  - Mist bg
  - Gold eyebrow: "RESOURCES"
  - Fraunces H1: "Tools and guides we actually use."

[Resource Grid]
  - White/Mist alternating
  - Cards with: icon, type (Guide / Template / Checklist), title, description, download/link CTA

[CTA]
  - Ink bg: "Have a specific question? Ask us directly."
```

---

### 13. `/privacy-policy`, `/terms`, `/cookie-settings`

**Redesign goals:** Minimal — just apply brand typography and layout.

```
[Header]
  - Mist bg, Fraunces H1, date last updated

[Content]
  - White bg, max-w-3xl prose, clean Inter body text
  - Section headings in Fraunces or Inter bold
  - Signal Blue links

No CTA needed.
```

---

## Shared Components to Build / Update

| Component | What changes |
|---|---|
| `<Footer />` | Add newsletter input, better link grouping, Ink bg |
| `<Navigation />` | Already done |
| `<EstimateCallout />` | Needs brand-aligned styling check |
| `<TrustSection />` | Audit styling against theme |
| Section eyebrow | Standardise: `text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]` |
| CTA Bar | Extract as shared `<CTASection />` component |
| Stat card | Extract as shared `<StatCard />` component |

---

## Implementation Order (when told to start)

```
Phase 1 — Core commercial pages (highest impact)
  → /services
  → /portfolio (listing)
  → /about

Phase 2 — Conversion pages
  → /contact
  → /estimate
  → /process

Phase 3 — Content pages
  → /blogs (listing)
  → /careers
  → /labs

Phase 4 — Supporting pages
  → /portfolio/[id] (case study detail)
  → /referrals
  → /resources
  → /privacy-policy, /terms, /cookie-settings
```

---

> **DO NOT START** any implementation until the user says "start" or names a specific page to begin with.
