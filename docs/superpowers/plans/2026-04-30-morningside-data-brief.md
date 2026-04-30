# Morningside SPED Data Brief — Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static website presenting the research-backed case for retaining full-time special education staffing at Morningside Elementary, with charts, tables, and downloadable source documents.

**Architecture:** Static HTML site using Bootstrap 5 for layout, Chart.js for data visualizations. Two pages: `index.html` (main data brief with 8 scrolling sections) and `conclusions.html`. Source documents in `/docs/`. No build tools — open directly in browser.

**Tech Stack:** HTML5, Bootstrap 5.3 (CDN), Chart.js 4.x (CDN), Bootstrap Icons (CDN), Font Awesome 7 (CDN), vanilla JS.

**Spec:** `docs/superpowers/specs/2026-04-30-morningside-data-brief-design.md`

---

### Task 1: Update workload_analysis.md with Granite District data

**Files:**
- Modify: `workload_analysis.md`

- [ ] **Step 1: Add Granite-specific data section after methodology**

Add a new section after the methodology noting that Granite School District's own data (from November 2025 board presentation) is used where available. Key district numbers to incorporate:
- 8,102 SPED students / 349 teachers = 23.2 avg caseload
- 64,000 daily service minutes district-wide
- 8,000+ IEP meetings/year district-wide = ~23 per teacher
- 3,410 evaluations/year = ~9.8 per teacher
- $70,000 per due process case (district estimate)
- 13% SPED prevalence (vs 11% state average)
- 50% of new hires lack SPED licensure

Source: [Granite SD board presentation](https://citizenportal.ai/articles/6271113/Utah/Granite-School-District-presents-special-education-update-as-caseload-and-costs-rise)

- [ ] **Step 2: Update Part C (IEP Meetings) with district-derived estimates**

Replace national estimates with Granite-derived where possible:
- District average: 8,000+ meetings / 349 teachers = ~23 meetings/teacher/year
- District average: 3,410 evals / 349 teachers = ~9.8 evals/teacher/year
- Keep Morningside-specific estimates (21 annuals, ~7 triennials) since those are based on actual caseload, but note district averages for comparison

- [ ] **Step 3: Add Utah-specific attrition data**

Add to the document:
- 44% of Utah SPED teachers transferred at least once in 8 years (vs 31% elementary gen-ed, 28% secondary)
- Source: [KSL](https://www.ksl.com/article/43487557/teacher-turnover-in-utah-exceeded-55-over-8-years)
- 42% turnover in first 5 years for 2016 cohort
- Source: [IES/REL West](https://ies.ed.gov/learn/blog/confronting-early-career-teacher-attrition-utah)

- [ ] **Step 4: Add USEAP recommendation reference**

Note that Utah's own Special Education Advisory Panel (USEAP) issued a 2019 recommendation stating adequate staffing requires "belonging within a school community and an appropriate caseload" — both undermined by split assignments.
Source: [USEAP](https://www.schools.utah.gov/specialeducation/_specialeducation/_organizationsandpartnerships/_useap/_memorandums/USEAP2019AdequateSupportStaff.pdf)

- [ ] **Step 5: Update sources section with all Granite/Utah sources**

Add all new sources with full URLs.

---

### Task 2: Create directory structure and CSS

**Files:**
- Create: `css/style.css`
- Create: `docs/` directory (for source documents)
- Create: `js/charts.js` (empty placeholder)

- [ ] **Step 1: Create directories**

```bash
mkdir -p /c/sped_study/css /c/sped_study/js /c/sped_study/docs
```

- [ ] **Step 2: Write css/style.css**

Custom styles layered on Bootstrap 5:
- Sticky navbar offset for anchor scrolling (scroll-padding-top)
- Section spacing (padding-top/bottom on each section)
- Stat card styling (border-left accent, subtle shadow)
- Callout box styling (large number callouts like "55%")
- Table responsive overrides
- Chart container max-widths for readability
- Print styles (hide navbar, show full content)
- No emoji, no decorative elements
- Color palette: Bootstrap primary blue (#0d6efd) as accent, muted grays for backgrounds, red (#dc3545) for "gap" highlights

- [ ] **Step 3: Verify directory structure**

```bash
ls -R /c/sped_study/css /c/sped_study/js /c/sped_study/docs
```

---

### Task 3: Build index.html — structure, navbar, and sections 1-2

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write HTML boilerplate with CDN links**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morningside Special Education Staffing: A Data Brief</title>
    <!-- Bootstrap 5.3 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Font Awesome 7 -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/style.css" rel="stylesheet">
</head>
```

Note: Font Awesome 7 may not be on CDN yet — use 6.5.x as fallback, which provides the same icon set.

- [ ] **Step 2: Write sticky navbar**

Navbar with anchor links to all 8 sections plus Conclusions page link:
- The Situation
- Workload Gap
- District Data
- Research
- SB 241
- Legal
- Sources
- Conclusions (links to conclusions.html)

- [ ] **Step 3: Write Section 1 — Header/Hero**

Content:
- Title: "Morningside Special Education Staffing: A Data Brief"
- Subtitle: "A Research-Based Analysis of Special Education Staffing Needs at Morningside Elementary School, Granite School District"
- Date: April 2026
- No author. Simple centered layout with muted background.

- [ ] **Step 4: Write Section 2 — The Situation**

Content:
- 3-4 sentence factual summary
- Three Bootstrap cards in a row: "21" (current K-4 students with IEPs), "20" (district threshold for full-time), "19" (count when decision was made)
- Brief explanation of the proposed change (full-time to half-time split)

- [ ] **Step 5: Open in browser and verify layout**

```bash
start "" "/c/sped_study/index.html"
```

Verify: navbar renders, sections scroll, cards display, responsive on narrow window.

---

### Task 4: Build index.html — Section 3 (Workload Gap)

**Files:**
- Modify: `index.html`
- Modify: `js/charts.js`

- [ ] **Step 1: Write Section 3 HTML structure**

Content:
- Section heading: "The Workload Gap"
- Canvas element for workload gap bar chart (id: `workloadGapChart`)
- Large callout card: "55% of required work cannot be done at half-time"
- Breakdown table with columns: Category | Hours/Week | Source

Table rows:
| Category | Hours/Week | Source |
|----------|-----------|--------|
| Direct instruction (IEP service minutes) | 15.00 | IEP service minutes / group size |
| IEP meetings & compliance | 3.80 | Annual/triennial/amendment meetings + prep |
| Paperwork & documentation | 5.00 | Vannest & Hagan-Burke (2010) |
| Collaboration & consultation | 6.00 | Gen-ed teams, related services, parents |
| SB 241 new responsibilities | 2.14 | IRPs, benchmarks, retention, PD |
| **Total required** | **31.94** | |

- Methodology note paragraph below table

- [ ] **Step 2: Write workload gap chart in charts.js**

Horizontal bar chart with three bars:
- "Required" (31.94 hrs) — blue
- "Full-Time Available" (31.0 hrs) — green
- "Half-Time Available" (14.5 hrs) — red

Chart.js config: type 'bar', indexAxis 'y', no legend needed (labels on bars), clear axis labels.

- [ ] **Step 3: Add workload breakdown stacked bar chart**

Second canvas (id: `workloadBreakdownChart`). Stacked horizontal bar showing the 5 workload categories stacked to 31.94, with a vertical line at 14.5 (half-time) and 31.0 (full-time) for reference.

- [ ] **Step 4: Verify in browser**

Check: charts render, table is readable, callout is prominent, responsive layout works.

---

### Task 5: Build index.html — Section 4 (Granite District Data)

**Files:**
- Modify: `index.html`
- Modify: `js/charts.js`

- [ ] **Step 1: Write Section 4 HTML structure**

Content:
- Section heading: "Granite School District's Own Data"
- Subheading: "Source: November 2025 Board Presentation"
- 6 stat cards in 2 rows of 3:
  - 8,102 SPED students served
  - 349 special education teachers
  - 23.2 average caseload per teacher
  - 64,000 daily service minutes delivered
  - 8,000+ IEP meetings per year
  - ~$70,000 cost per due process case
- Canvas for pie chart (id: `placementPieChart`)
- Canvas for caseload comparison bar chart (id: `caseloadCompareChart`)
- Note card: "50% of new special education hires in Granite SD lack proper SPED licensure"

- [ ] **Step 2: Write placement pie chart in charts.js**

Pie chart with 3 segments:
- 63% — General education with pullouts (blue)
- 23% — 60-179 minutes/day (medium blue)
- 13% — Self-contained 180+ minutes/day (dark blue)

- [ ] **Step 3: Write caseload comparison bar chart in charts.js**

Vertical bar chart, 2 bars:
- "Morningside Elementary" — 21 (blue)
- "Granite SD Average" — 23.2 (gray)

Annotation or subtitle: "Morningside is below the district average, yet its position is being cut"

- [ ] **Step 4: Verify in browser**

Check: stat cards render in grid, pie chart labels are readable, bar chart comparison is clear.

---

### Task 6: Build index.html — Section 5 (Research)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write Section 5 HTML structure**

Content:
- Section heading: "What Research Says"
- 6 stat cards, each with a large number, a description, and a footnote citation:

1. **72%** — of SPED teachers say large caseloads negatively impact ability to meet student needs (ERIC, 2020)
2. **72%** — of 4th graders with disabilities scored below basic in reading (NAEP, 2024)
3. **44%** — of Utah SPED teachers transferred at least once in 8 years, vs 31% of elementary gen-ed teachers (KSL/UEPC)
4. **6+ hrs/week** — additional time SPED teachers work beyond available hours to meet responsibilities (NEA, 2019)
5. **55%** — of schools report difficulty filling special education positions (EdResearch for Action, 2024)
6. **Lower outcomes** — Students of teachers with high burnout experience lower academic achievement and less IEP goal attainment (Brunsting et al., 2023, 2025)

Each card links to its source via footnote number.

- [ ] **Step 2: Verify in browser**

Check: cards are readable, grid layout works on mobile, citations are present.

---

### Task 7: Build index.html — Section 6 (SB 241)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write Section 6 HTML structure**

Content:
- Section heading: "SB 241: New Mandates, Less Staff"
- Brief paragraph explaining SB 241 (Early Literacy, signed March 18, 2026, effective July 1, 2026)
- Key requirements list: individualized reading plans, literacy teams, benchmark expansion to K, third-grade retention, science of reading PD
- Table of new SPED teacher responsibilities:

| New SB 241 Responsibility | Estimated Annual Hours |
|---------------------------|----------------------|
| Literacy team / IRP development (15 students) | 15.0 |
| IRP review/revision (3x/year) | 22.5 |
| IRP-IEP coordination documentation | 7.5 |
| Benchmark assessment coordination | 11.0 |
| Retention exemption documentation | 6.0 |
| Science of reading professional development | 15.0 |
| **Total** | **77.0 hrs/year (2.14 hrs/week)** |

- Callout card: "SB 241 takes effect July 1, 2026 — the same school year the position would be cut to half-time"
- Note: 72-74% of elementary students with disabilities read below basic nationally (NAEP), so most SPED students will require IRPs

- [ ] **Step 2: Verify in browser**

Check: table renders, callout is prominent, links to bill text work.

---

### Task 8: Build index.html — Section 7 (Legal) and Section 8 (Sources)

**Files:**
- Modify: `index.html`
- Modify: `js/charts.js`

- [ ] **Step 1: Write Section 7 — Legal Obligations**

Content:
- Section heading: "Legal Obligations"
- IDEA/FAPE summary in plain language (3-4 bullet points):
  - Staffing shortages do not reduce FAPE obligations
  - IEP teams cannot determine services based on staffing availability or cost
  - Districts must provide all IEP-specified services regardless of staffing levels
  - States cannot waive SPED personnel certification requirements
- Compliance risks list (5 bullets from literature review)
- Canvas for cost comparison chart (id: `costCompareChart`)
- Paragraph about due process risk

- [ ] **Step 2: Write cost comparison chart in charts.js**

Vertical bar chart, 2 bars:
- "Estimated annual savings from half-time" — ~$30,000-$40,000 (use $35,000 as midpoint, green)
- "Cost of one due process case" — $70,000 (red)

Subtitle: "Granite SD estimates due process hearings cost ~$70,000 per case"

- [ ] **Step 3: Write Section 8 — Sources & Downloads**

Content:
- Section heading: "Sources & Downloads"
- Grouped citation list with hyperlinks, organized by category:
  - Utah & Granite School District Data
  - Federal Law & Compliance
  - Research Studies (Caseload, Workload, Burnout)
  - Utah SB 241
- Download section with links to `/docs/` files:
  - Full Literature Review (literature_review.md)
  - Workload Analysis (workload_analysis.md)
  - Presentation Plan (presentation_plan.md)
- Each download link uses Bootstrap Icons download icon

- [ ] **Step 4: Add Bootstrap JS and Chart.js script tags at bottom of body**

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="js/charts.js"></script>
```

- [ ] **Step 5: Verify in browser**

Check: legal section renders, cost chart is clear, source links work, download links point to /docs/ files.

---

### Task 9: Build conclusions.html

**Files:**
- Create: `conclusions.html`

- [ ] **Step 1: Write conclusions.html**

Same boilerplate, navbar, and footer as index.html. Navbar "Conclusions" item is active; other items link back to index.html sections.

Content sections:

**What the Data Shows** (2-3 paragraphs)
- Morningside has 21 K-4 students with IEPs, exceeding the district's own 20-student threshold
- A workload analysis using conservative estimates shows 31.94 hours/week of required work, vs 14.5 available at half-time — a 55% gap
- SB 241 adds 77 hours/year of new responsibilities starting the same school year
- The district's own data shows Morningside's caseload is below the district average of 23.2, yet it's the position being cut

**What It Means for Students**
- IEP service minutes at risk of non-delivery
- Reduced collaboration between SPED and gen-ed teachers
- Delayed crisis response on days the teacher is at the other school
- Fragmented relationships with students and families

**The Broader Principle**
- Staffing decisions based solely on caseload counts miss the full picture
- The NEA and multiple state frameworks advocate workload analysis as the appropriate methodology
- A threshold of 20 students does not account for grade span, disability mix, service intensity, IEP complexity, or new state mandates like SB 241
- Utah's own USEAP recommends staffing based on "belonging within a school community and an appropriate caseload"

**Looking Forward**
- The data has changed since the original decision — from 19 students to 21
- The regulatory landscape has changed — SB 241 adds substantial new obligations
- A workload-based analysis demonstrates that half-time staffing creates an impossible gap
- This analysis uses conservative national estimates; actual Morningside IEP data would likely show a larger gap

- [ ] **Step 2: Verify in browser**

Check: page renders, navbar links work between pages, content reads well, footer matches index.html.

---

### Task 10: Copy source documents to /docs/ and final verification

**Files:**
- Copy: `literature_review.md` to `docs/literature_review.md`
- Copy: `workload_analysis.md` to `docs/workload_analysis.md`
- Copy: `presentation_plan.md` to `docs/presentation_plan.md`

- [ ] **Step 1: Copy source documents**

```bash
cp /c/sped_study/literature_review.md /c/sped_study/docs/
cp /c/sped_study/workload_analysis.md /c/sped_study/docs/
cp /c/sped_study/presentation_plan.md /c/sped_study/docs/
```

- [ ] **Step 2: Full site walkthrough**

Open index.html in browser. Verify:
- All 8 sections render
- All 6 charts render with correct data
- All tables have correct numbers
- All source links work (external URLs open, /docs/ files download)
- Navbar scrolling works
- Conclusions page link works
- Mobile responsive (narrow browser window)
- No emojis anywhere
- Print view is usable (Ctrl+P)

- [ ] **Step 3: Verify all external links**

Spot-check 5-10 citation URLs to confirm they resolve.

- [ ] **Step 4: Initialize git and commit**

```bash
cd /c/sped_study
git init
git add index.html conclusions.html css/ js/ docs/
git commit -m "feat: initial Morningside SPED data brief site"
```
