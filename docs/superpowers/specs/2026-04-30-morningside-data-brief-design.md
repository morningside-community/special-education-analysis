# Design: Morningside Special Education Staffing Data Brief Website

## Overview

A static website presenting the research-backed case for retaining full-time special education staffing at Morningside Elementary School, Granite School District, Utah. The site is designed to be shared with district administrators, school board members, community members, and media. It presents as a neutral research brief — data-driven, professionally styled, with no named author.

## Tech Stack

- Static HTML/CSS (no build tools, no framework)
- Bootstrap 5 (CDN) for layout and component styling
- Chart.js (CDN) for bar charts and pie charts
- Bootstrap Icons (CDN) — used sparingly, only where they aid comprehension
- Font Awesome 7 (CDN) — used sparingly, same rule
- No emojis anywhere
- Source documents stored in `/docs/` folder for download

## File Structure

```
/sped_study/
  index.html              # Main data brief (single-page scrolling)
  conclusions.html         # General-audience conclusions page
  css/
    style.css             # Custom styles on top of Bootstrap
  js/
    charts.js             # Chart.js chart definitions
  docs/
    (source PDFs and documents)
```

## Pages

### index.html — Main Data Brief

Single-page scrolling layout with sticky navbar for section anchors.

**Sections in order:**

1. **Header/Hero**
   - Title: "Morningside Special Education Staffing: A Data Brief"
   - Subtitle: "A Research-Based Analysis of Special Education Staffing Needs at Morningside Elementary School, Granite School District"
   - Date: April 2026
   - No author attribution

2. **The Situation**
   - Brief factual summary in 3-4 sentences
   - Key numbers callout cards: 21 students (current K-4), 20 (district threshold), 19 (count when decision was made)
   - Simple statement of what's proposed (full-time to half-time, split between two schools)

3. **The Workload Gap**
   - Horizontal bar chart: required hours/week (31.94) vs. full-time available (31.0) vs. half-time available (14.5)
   - Large callout: "55% of required work cannot be done at half-time"
   - Breakdown table: direct instruction, IEP meetings, paperwork, collaboration, SB 241 — hours per week per category
   - Methodology note: all estimates use conservative/low-end figures from published research

4. **Granite School District's Own Data**
   - Source: November 2025 board presentation
   - Key stats in card layout: 8,102 SPED students, 349 teachers, 23.2 avg caseload, 64,000 daily service minutes, 8,000+ IEP meetings/year, $70K per due process case
   - Pie chart: student placement breakdown (63% gen-ed pullouts, 23% 60-179 min/day, 13% self-contained)
   - Bar chart: Morningside caseload (21) vs. district average (23.2) — point: Morningside is already below average yet being cut
   - Note: 50% of new SPED hires lack proper licensure

5. **What Research Says**
   - Bar chart or stat cards for key findings:
     - 72% of SPED teachers say large caseloads hurt ability to meet student needs
     - 72% of 4th graders with disabilities below basic in reading (NAEP 2024)
     - 44% of Utah SPED teachers transferred in 8 years (vs 31% elementary gen-ed)
     - Students of burned-out teachers have lower academic outcomes and less IEP goal attainment
     - 55% of schools report difficulty filling SPED positions
     - NEA: SPED teachers already work 6+ hours/week beyond available time
   - Each stat with a footnote citation

6. **SB 241: New Mandates, Less Staff**
   - Brief explanation of what SB 241 (Early Literacy, signed March 2026) requires
   - Table: new responsibilities added to SPED teacher workload (IRP development, literacy team participation, benchmark coordination, retention exemption documentation, PD requirements)
   - Estimated additional hours: 77 hours/year (2.14 hrs/week)
   - Callout: "SB 241 takes effect July 1, 2026 — the same school year the position would be cut to half-time"

7. **Legal Obligations**
   - IDEA/FAPE requirements in plain language
   - Bulleted compliance risks of half-time staffing
   - Cost comparison: salary difference (half-time savings) vs. $70,000 per due process case (district's own estimate)
   - Bar chart: cost of one due process hearing vs. annual cost difference between half-time and full-time

8. **Sources & Downloads**
   - Full numbered citation list with hyperlinks
   - Download links to source documents stored in /docs/
   - Grouped by category: Utah/Granite data, federal law, research studies, SB 241

### conclusions.html — Conclusions

Separate page linked from navbar and bottom of index.html.

- Summary of what the data shows (3-4 paragraphs, plain language)
- What it means for students at Morningside specifically
- The broader argument: staffing decisions should be based on workload analysis, not arbitrary caseload thresholds
- The ask: revisit the decision using updated data and workload methodology
- Same citation footer and source links

## Visual Design

- Bootstrap 5 default styling as base
- White background, dark text (#212529)
- Single accent color: Bootstrap primary blue (#0d6efd) — used for chart bars, callout borders, navbar
- Cards with subtle shadows for stat callouts
- Zebra-striped tables
- Responsive: readable on phone screens (important for social sharing)
- No hero images, no stock photos, no decorative elements
- No emojis
- Icons (Bootstrap Icons / Font Awesome 7) only where they genuinely aid comprehension (e.g., a download icon next to document links, a scale icon next to legal section)

## Charts (Chart.js)

1. **Workload gap bar chart** — horizontal bars, three bars (required / full-time / half-time), color-coded (red for gap)
2. **Workload breakdown bar chart** — stacked or grouped bars by category
3. **Student placement pie chart** — three segments (gen-ed, partial, self-contained)
4. **Caseload comparison bar chart** — Morningside (21) vs. district average (23.2)
5. **Cost comparison bar chart** — half-time savings vs. due process cost
6. **Key research stats** — horizontal bar chart or stat cards (whichever reads better)

## Source Documents (/docs/)

Store locally for download:
- Literature review (our markdown, converted context)
- Workload analysis (our markdown)
- Links to external PDFs that can't be redistributed will remain as hyperlinks only

## Content Principles

- Every claim has a citation
- Conservative estimates throughout, noted as such
- Neutral, research-brief tone — no emotional language, no advocacy framing
- Data speaks for itself
- "The data has changed; the decision should be revisited" is the implicit message, never stated as a demand
