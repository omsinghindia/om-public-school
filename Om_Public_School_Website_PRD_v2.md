# Product Requirements Document (PRD)
## Om Public School — Official Website

| | |
|---|---|
| **Document Owner** | Product/Web Team |
| **Prepared For** | Om Public School |
| **Version** | 2.0 |
| **Status** | Draft for Review |
| **Reference** | Approved visual mockup: Home, About Us, Academics, Admissions, Notices & Circulars, Gallery, Mobile Views |

---

## 1. Overview

Om Public School's official website is the school's primary digital front door — designed to feel warm, trustworthy, and student-centric while remaining fast, structured, and easy for non-technical staff to update. The approved design uses a **navy blue + warm orange/yellow** brand palette, a sun-and-open-book logo mark, and the tagline **"Learn · Grow · Build Tomorrow."** The site is built mobile-first and must render cleanly across phone, tablet, and desktop, matching the responsive mockups supplied.

### 1.1 Brand & Design System

| Element | Spec |
|---|---|
| Logo | Sun-rising-over-open-book mark + "OM PUBLIC SCHOOL" wordmark + tagline "Learn · Grow · Build Tomorrow" |
| Primary color | Navy blue (header, footer, nav, headings, sidebar active states) |
| Accent color | Warm orange/amber (CTA buttons, highlight bars, icon badges, active tab underline) |
| Supporting colors | Soft blue, green, purple, red tints for category icon cards (Programs, Student Life, Gallery filters) |
| Typography | Clean sans-serif; bold navy headings, medium-weight body text, generous white space |
| Card style | Rounded corners, soft drop shadow, icon-in-circle badges, consistent 2–4 column grids |
| Imagery | Real campus/student photography, warm and candid (not stock-corporate) |

### 1.2 Goals
- Ship a website that is a pixel-faithful, fully responsive build of the approved mockup (Home, About Us, Academics, Admissions, Notices & Circulars, Gallery, plus supporting pages).
- Make admissions the most prominent, frictionless action on every page.
- Give parents/students one place to find notices, results, calendar, and gallery content.
- Keep the site editable by school office staff via CMS — no page in §4 should require a developer to update text, images, or documents.
- Be bilingual (English/Hindi), accessible (WCAG 2.1 AA), and screen-reader friendly.
- Be fast, SEO-friendly, and installable as a PWA.

### 1.3 Non-Goals (Phase 1)
- Online fee payment gateway (Phase 2).
- Full student portal with live grades/homework (link out to the Android app instead — see companion App PRD).
- Native iOS/Android builds of the website itself (covered by the separate Android App PRD).

### 1.4 Success Metrics
- < 2.5s Largest Contentful Paint on 4G mobile.
- 90+ Lighthouse Performance/Accessibility/SEO scores.
- 30%+ increase in admission enquiry submissions within 3 months of launch.
- 100% of notices/circulars published digitally within 24 hrs of issuance.
- Mobile traffic share (based on responsive mockup priority) handled with zero horizontal scroll or clipped content on devices ≥320px wide.

---

## 2. Target Users / Personas

| Persona | Needs |
|---|---|
| **Prospective Parent** | Admissions process, fees, facilities, "Why Choose Us", enquiry form, brochure download |
| **Current Parent** | Notices & circulars, academic calendar, gallery, contact info, newsletter |
| **Student** | Curriculum by stage, student life (sports/clubs/events/achievements), gallery |
| **Teacher/Staff** | Parent/Staff Login link, internal circulars |
| **Media/Public** | About the school, achievements, press-worthy news |
| **School Admin (CMS user)** | Publish notices, update programs/gallery/academics content, manage enquiries |

---

## 3. Information Architecture / Sitemap
*(Matches the approved top navigation: Home · About Us · Academics · Admissions · Campus Life · Notices · News & Updates · Contact)*

```
Home
├── About Us
│   ├── Our Vision & Mission
│   ├── Why Choose Us
│   ├── From the Principal's Desk
│   └── Our Facilities
├── Academics
│   ├── Curriculum (Pre-Primary / Primary / Middle / Secondary / Senior Secondary)
│   │   └── Senior Secondary Streams (Science · Commerce · Humanities)
│   ├── Examination & Results
│   ├── Academic Calendar
│   └── Subjects & Streams
├── Admissions
│   ├── Admission Process (Enquiry → Documentation → Interaction → Confirmation)
│   ├── Eligibility & Age Criteria
│   ├── Fee Structure
│   ├── Online Enquiry / Application Form
│   └── FAQs
├── Campus Life
│   ├── Sports
│   ├── Clubs & Activities
│   ├── Events
│   ├── Achievements
│   └── Gallery (All / Events / Sports / Campus / Activities)
├── Notices & Circulars (All / Academics / Admissions / Exam / Holiday / Event / General)
├── News & Updates
├── Contact Us
│   ├── Enquiry Form
│   ├── Map/Location
│   └── Newsletter Signup
└── Parent/Staff Login (external portal link)
```

---

## 4. Page-by-Page Specification
*(Each page shares the Global Header and Global Footer/CTA Band defined in §4.0 and §4.8)*

### 4.0 Global Header (all pages)
- **Utility bar** (navy, top strip): Skip to Content · Sitemap · Contact · Feedback (left) — Parent/Staff Login · EN/हि language toggle · A− A A+ font-size control · accessibility (reader) icon (right).
- **Brand row**: Logo mark + "OM PUBLIC SCHOOL" + tagline "Learn · Grow · Build Tomorrow" (left).
- **Primary nav** (with dropdown chevrons): Home, About Us▾, Academics▾, Admissions▾, Campus Life▾, Notices▾, News & Updates, Contact▾ — plus persistent orange **"Apply for Admission"** button, right-aligned.
- Sticky on scroll (desktop/tablet); collapses to hamburger + off-canvas menu on mobile, with "Apply for Admission" retained as a fixed bottom or top button.
- Every inner page shows a **breadcrumb trail** under a page-title hero banner, e.g. `Home > About Us`.

### 4.1 Home Page
Sections top-to-bottom, exactly as mocked:

1. **Hero Carousel** — full-width campus photo, headline "Shaping Bright Futures Through Quality Education," sub-line "Discipline | Knowledge | Character," "Know More" CTA, left/right arrows + dot indicators, swipe on touch. QR code card ("Download Admission Brochure") pinned bottom-right on desktop; moves into the enquiry/footer area on mobile.
2. **Latest Announcements ticker** — orange/amber bar, megaphone icon, auto-scrolling headline list (e.g. "Class 10 & 12 Board Exam Schedule Released • Admissions Open for 2025-26 • Annual Sports Day – 15 Nov 2025"), "View All" link to Notices page. Pausable on hover/focus.
3. **From the Principal's Desk** — circular photo, quote, name/title ("Principal, Om Public School"), "Learn More" link, plus 4 quick-link icon cards beside it: **Admissions**, **Our Academics**, **Campus Life**, **Our Facilities**.
4. **Our Programs** — 5 stage cards in a row (Pre-Primary, Primary, Middle School, Secondary, Senior Secondary), each with icon, short tagline, and link into Academics → Curriculum for that stage.
5. **Latest News & Updates** (left column) — tabbed list: All / Notices / Admissions / Results / Events, 3 recent dated items, "View All" → Notices & Circulars page.
6. **Photo Gallery** (right column) — 3 featured photos + "View All" → Gallery page; below it, **Student Life** — 4 icon cards: Sports, Clubs & Activities, Events, Achievements.
7. **Global Footer / CTA Band** (see §4.8).

### 4.2 About Us Page
- Hero banner: "About Our School" title over campus image, breadcrumb `Home > About Us`.
- **Our Vision & Mission** — two icon cards (Our Vision / Our Mission), supporting paragraph, campus image, "Read More" button.
- **Why Choose Us?** — 4 icon cards: Experienced Faculty, Modern Infrastructure, Holistic Development, Safe & Supportive Environment.
- (Sub-pages/anchors reachable from this page or the About Us dropdown: From the Principal's Desk — full message; Our Facilities — detailed infrastructure list/gallery.)

### 4.3 Academics Page
- Hero banner: "Academics," breadcrumb `Home > Academics`.
- **Left sidebar nav** (sticky on desktop, accordion on mobile): Curriculum (default active), Examination & Results, Academic Calendar, Subjects & Streams.
- **Curriculum panel**: intro paragraph + stage tabs — Pre-Primary / Primary / Middle / Secondary / Senior Secondary (active tab highlighted in navy/orange).
- **Senior Secondary Streams** — 3 color-coded cards: **Science** (PCM/PCB/PCMB), **Commerce** (Accounts/Business Studies), **Humanities** (History/Geography/Political Science).
- **"Empowering Minds"** feature block — image + "Preparing for a Better Tomorrow" copy + "Learn More" button.
- Examination & Results, Academic Calendar, and Subjects & Streams panels follow the same sidebar+content pattern (exam schedule/results lookup, downloadable calendar, subject list per stream).

### 4.4 Admissions Page
- Hero banner: "Admissions," breadcrumb `Home > Admissions`.
- **Left sidebar nav**: Admission Process (default active), Eligibility & Age Criteria, Fee Structure, Online Enquiry/Application, FAQs.
- **Admission Process** — 4 numbered steps with icon markers: **1. Enquiry** (fill the form to know about the school), **2. Documentation** (submit required documents), **3. Interaction** (meet with the school authority), **4. Confirmation** (get admission confirmation).
- **Apply Online panel** — campus/student image + "Start your child's journey with us" + **"Fill Enquiry Form"** button, linking to the Online Enquiry/Application form (name, DOB, class applying for, parent contact, previous school, document upload, CAPTCHA).
- Eligibility, Fee Structure, and FAQs panels follow the same sidebar+content layout, each independently CMS-editable.

### 4.5 Notices & Circulars Page
- Hero banner: "Notices & Circulars," breadcrumb `Home > Notices & Circulars`.
- **Left sidebar filter**: All (default), Academics, Admissions, Exam, Holiday, Event, General.
- **Search bar**: "Search notices..." with live filtering.
- **Notice list**: each row = icon, title, publish date, **Download** button (PDF); newest first.
- **Pagination** at bottom (`1 2 3 →`).
- Notices published from this module also feed the Home page ticker and News & Updates tab automatically.

### 4.6 Gallery Page
*(Reached via Campus Life → Gallery; breadcrumb `Home > Campus Life > Gallery`)*
- Hero banner: "Gallery."
- **Left sidebar/tab filter**: All (default), Events, Sports, Campus, Activities.
- **Photo grid** (responsive: 3-col desktop / 2-col tablet / 1–2-col mobile): each tile has a caption + date, e.g. "Annual Day Celebration – 15 Oct 2025," "Sports Day – 12 Nov 2024," "Science Exhibition – 10 Oct 2025," "Independence Day – 15 Aug 2024," "Classroom Activities – 05 Aug 2024," "School Campus – 01 Aug 2024."
- Tapping a tile opens a lightbox with next/prev navigation; supports photo albums and embedded video.

### 4.7 News & Updates Page
- Same tabbed structure as the Home page widget (All / Notices / Admissions / Results / Events) but as a full, paginated, filterable list — the canonical destination for the Home page's "View All."

### 4.8 Global Footer & Closing CTA Band (all pages)
- **CTA band** immediately above the footer: navy-on-left / photo-on-right split. Left: "Join a Legacy of Excellence" headline, **"Apply for Admission"** + **"Explore Our School"** buttons. Right: school photo, logo/tagline, an inspirational quote (attributed), and 3 quick-link icons — **Visit Campus** (Schedule a Visit), **Contact Us** (Get in Touch), **Follow Us** (Stay Connected).
- **Footer** (navy): logo + tagline blurb · **Quick Links** (Home, About Us, Academics, Admissions, Campus Life) · **Important Links** (Notices & Circulars, News & Updates, Careers, Contact Us, Student/Parent/Staff Portal) · **Contact Us** (address, phone, email) · **Newsletter** signup (email field + Subscribe).
- **Bottom bar**: © [year] Om Public School. All Rights Reserved · Privacy Policy · Terms of Use · Accessibility · social icons (Facebook, Instagram, YouTube, LinkedIn).

### 4.9 Mobile Responsive Behavior (all pages)
As shown in the mobile mockup row (5 phone frames — Home, About/Academics, Admissions, Notices, Gallery):
- Header collapses to logo + hamburger; utility bar tucks into the off-canvas menu; "Apply for Admission" remains reachable via a persistent top or bottom button.
- Hero carousel crops to portrait/square, swipe-only navigation, QR/brochure card relocates below the fold.
- Multi-column sections (Programs, Why Choose Us, Streams, Student Life) stack to 1 column; card grids that were 3–4 wide become 2-wide or a horizontal swipe carousel.
- Sidebar navigation (Academics, Admissions, Notices, Gallery) converts to a horizontal scroll chip bar or an expandable accordion at the top of the content panel.
- Notices list and Gallery grid remain scannable at 1–2 columns with sticky search/filter bar.
- Footer link columns collapse into stacked accordions; newsletter field remains full-width.

---

## 5. Cross-Cutting Functional Requirements

| # | Requirement |
|---|---|
| FR-1 | Responsive build matching mockups at mobile (≤480px), large mobile (481–767px), tablet (768–1023px), desktop (1024–1439px), large desktop (≥1440px). |
| FR-2 | Bilingual toggle (English/हिन्दी) — header switch — with all static content and PDFs available per locale where applicable. |
| FR-3 | Accessibility toolbar: font-size steps (A−/A/A+), high-contrast/reader mode, skip-to-content link, ARIA labels, mandatory alt text on all uploaded images. |
| FR-4 | Notices & Circulars module: categorized (Academics/Admissions/Exam/Holiday/Event/General), searchable, paginated, downloadable PDFs, feeds Home ticker + News & Updates automatically. |
| FR-5 | Gallery module: filterable albums (All/Events/Sports/Campus/Activities), lightbox viewer, lazy-loaded images, optional video embeds. |
| FR-6 | Admissions Enquiry/Application form: multi-field validation, file upload, CAPTCHA/spam protection, auto-email + CMS notification, status trackable by Admin. |
| FR-7 | Academics module: stage-based curriculum tabs (Pre-Primary → Senior Secondary), stream cards (Science/Commerce/Humanities), downloadable academic calendar, exam/result info. |
| FR-8 | CMS (headless or traditional) enabling office staff to edit every section in §4 — text, images, PDFs, notice items, gallery albums — with no code changes. |
| FR-9 | Role-based CMS access (Super Admin, Editor, Content Contributor). |
| FR-10 | Newsletter signup capturing email → mailing list/CRM integration. |
| FR-11 | SEO: meta tags per page, sitemap.xml, robots.txt, Open Graph tags, EducationalOrganization structured data. |
| FR-12 | Analytics (GA4) + cookie consent banner (DPDP Act–style compliance). |
| FR-13 | 404, 500, and maintenance-mode pages, on-brand. |
| FR-14 | PWA support: installable, offline fallback page, app icons/favicon. |
| FR-15 | "Parent/Staff Login" links out to the school's staff/parent portal (or the companion Android app's web login, if applicable). |

---

## 6. Non-Functional Requirements

- **Performance:** Core Web Vitals green; WebP/AVIF images, lazy loading, CDN-served static assets.
- **Accessibility:** WCAG 2.1 AA; keyboard-navigable; screen-reader tested against the A−/A/A+ and reader-mode toggle.
- **Security:** HTTPS everywhere, input sanitization, rate-limited forms, CSRF protection, Admin 2FA, dependency patching.
- **Scalability:** Handles admission-season and result-day traffic spikes (auto-scaling hosting/CDN).
- **Browser Support:** Latest 2 versions of Chrome, Safari, Edge, Firefox; graceful degradation on older browsers.
- **Uptime:** 99.9% SLA.
- **Backup:** Daily automated DB + media backups, 30-day retention.

---

## 7. Proposed Tech Stack (Full Stack)

| Layer | Recommendation | Alternative |
|---|---|---|
| Frontend | Next.js (React) + TypeScript + Tailwind CSS (matches card/grid-heavy design system) | Nuxt.js (Vue) |
| CMS | Headless CMS — Strapi or Sanity | WordPress (if staff prefer a familiar admin UI) |
| Backend/API | Node.js (NestJS/Express) REST or GraphQL | Django REST Framework |
| Database | PostgreSQL | MySQL |
| Media Storage | AWS S3 / Cloudinary (image + PDF, auto-optimization) | Firebase Storage |
| Search (Notices) | Meilisearch or Algolia | Elasticsearch |
| Hosting | Vercel/Netlify (frontend) + AWS/DigitalOcean (backend, DB) | Single VPS + Docker Compose |
| CDN | Cloudflare | AWS CloudFront |
| Forms/Email | SendGrid/Amazon SES | Nodemailer + SMTP |
| Auth (staff portal link) | JWT-based, SSO-ready | Auth0 |
| Analytics | Google Analytics 4 + Search Console | Plausible |
| CI/CD | GitHub Actions | GitLab CI |
| Monitoring | Sentry + UptimeRobot | Datadog |

---

## 8. High-Level Data Model (Core Entities)

```
User (id, name, role[admin/editor/contributor], email, password_hash)
Page (id, slug, title_en, title_hi, hero_image, breadcrumb, content_blocks[], seo_meta, updated_at)
Notice (id, title, category[academics/admissions/exam/holiday/event/general], file_url, publish_date, expiry_date, status)
GalleryAlbum (id, title, category[events/sports/campus/activities], cover_image, date)
GalleryMedia (id, album_id, url, type[photo/video], caption)
NewsArticle (id, title, excerpt, body, category[notices/admissions/results/events], publish_date, cover_image)
AdmissionEnquiry (id, student_name, dob, class_applying, parent_name, phone, email, previous_school, file_url, status, submitted_at)
AcademicStage (id, name[pre-primary/primary/middle/secondary/senior-secondary], description, streams[])
Stream (id, stage_id, name[science/commerce/humanities], subjects[])
FacultyMember (id, name, designation, department, photo, bio)
NewsletterSubscriber (id, email, subscribed_at, status)
NavigationMenu (id, label, url, parent_id, order)
```

---

## 9. Responsive Layout Rules (per page)

| Page/Section | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (≤767px) |
|---|---|---|---|
| Header | Full nav + utility bar + CTA | Condensed nav, utility bar in overflow | Hamburger + off-canvas menu, sticky CTA |
| Home – Hero Carousel | 16:9, QR card visible | 16:9, QR card hidden | Portrait crop, swipe-only, QR moved below fold |
| Home – Programs (5 cards) | 5-column row | 3-column, wraps | 2-column grid |
| Home – News/Gallery split | 2-column (60/40) | Stacked, tabs above gallery | Stacked, tabs as horizontal scroll |
| About Us – Why Choose Us (4 cards) | 4-column | 2-column | 1-column stacked |
| Academics – Sidebar + Content | Sticky left sidebar (25%) + content (75%) | Sidebar as top chip bar | Sidebar as accordion at top |
| Academics – Streams (3 cards) | 3-column | 2-column, wraps | 1-column stacked |
| Admissions – 4-step process | 4-column row | 2x2 grid | 1-column vertical stepper |
| Notices – Sidebar + list | Sidebar (25%) + list (75%) | Sidebar as chip bar | Sidebar as accordion; list 1-column |
| Gallery – Grid | 3-column | 2-column | 1–2 column, infinite scroll |
| CTA Band | Split 50/50 | Split 50/50, reduced padding | Stacked, image below text |
| Footer | 4-column | 2-column | 1-column accordion |

---

## 10. Content & Assets Required from School (Pre-Launch Checklist)
- Final logo files (SVG/PNG) and confirmed brand colors.
- Principal photo + quote/message (EN + HI).
- Campus/hero photography (building exterior, students walking — matching hero mockup style).
- Vision & Mission statements, "Why Choose Us" copy (Experienced Faculty, Modern Infrastructure, Holistic Development, Safe & Supportive Environment).
- Curriculum descriptions per stage + stream subject lists (Science/Commerce/Humanities).
- Admission process details, eligibility criteria, fee structure, FAQs, admission brochure PDF (for QR code).
- Current notices/circulars (min. 10) to seed the module.
- Gallery photos tagged by category (Events, Sports, Campus, Activities) with captions/dates.
- Contact details, map embed link, social handles, inspirational quote for CTA band.
- Legal pages: Privacy Policy, Terms of Use, Accessibility statement.

---

## 11. Phased Rollout Plan

| Phase | Scope | Timeline (indicative) |
|---|---|---|
| Phase 0 | Design QA against mockup, content audit, brand asset collection | Week 1–2 |
| Phase 1 (MVP) | Header/Footer, Home, About Us, Admissions, Notices & Circulars, responsive build, CMS setup | Week 3–8 |
| Phase 2 | Academics (curriculum/streams), Gallery, News & Updates, newsletter, search | Week 9–12 |
| Phase 3 | Parent/Staff login integration, PWA, multilingual completeness, analytics dashboards | Week 13+ |
| Phase 4 | QA, accessibility audit, performance tuning, cross-device UAT against mockup, launch | Final 2 weeks |

---

## 12. Open Questions
1. Confirm exact hex codes for navy/orange brand palette and final logo file.
2. Will "Examination & Results" show live result lookup (roll-no search) or static downloadable PDFs only in Phase 1?
3. Is the Admission Process 4-step flow purely informational, or should each step have an in-app status tracker tied to a submitted enquiry?
4. Should the Gallery support user (parent/student) photo submissions, or Admin-only uploads?
5. Confirm which inspirational quote/attribution is approved for the closing CTA band (copyright/permission check if quoting a named author).

---

*End of PRD — v2.0 (aligned to approved visual mockup)*
