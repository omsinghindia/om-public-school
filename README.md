# Om Public School — Official Web Portal (PRD v2.0 Specification)

A modern, accessible, and student-centric institutional web portal built for **Om Public School**, strictly aligned with **`Om_Public_School_Website_PRD_v2.md`** and the approved visual mockups.

---

## 📱 Cross-Device Responsiveness (Laptop, Tablet, Phone)

The site is built **mobile-first** and thoroughly tested across all three device categories:

### 1. 💻 Laptop & Desktop Screen (≥ 1024px)
- Full desktop view exactly as specified in the approved visual mockup.
- Sticky navy header with dropdown navigation chevrons and persistent orange **"Apply for Admission"** CTA.
- 16:9 Hero carousel with pinned desktop QR code card (*"Scan for Online Admission Brochure"*).
- 5-column grid for **Our Programs** (Pre-Primary, Primary, Middle, Secondary, Senior Secondary).
- 3-column split section: News & Updates (left), Photo Gallery (center), Student Life (right).
- Dedicated 2-column sidebar layouts on inner pages (Academics, Admissions, Notices, Gallery).

### 2. 📱 Tablet Screen (768px – 1023px)
- Compact navigation layout.
- Programs grid wraps into a clean 3-column layout.
- Split section stacks into scannable stacked widgets with horizontal scroll on tabs.
- Inner page sidebars convert into a sleek horizontal chip menu above the content panel.
- 2x2 grid for **Why Choose Us?** and **Admission Process**.
- 2-column gallery grid.

### 3. 📱 Mobile Phone Screen (≤ 767px, down to 320px)
- **Zero horizontal scroll**: Every section stacks smoothly with full fluidity.
- Header collapses to sun logo + hamburger button.
- **Off-Canvas Slide-out Drawer**: Full navigation, utility links (Language toggle, Login, Font controls), and quick Apply button.
- **Persistent Mobile Bottom Action Bar**: Fixed at screen bottom with:
  - 📞 **Call School** (`tel:+915422345678`)
  - ✉️ **Enquiry Form** (opens admission modal)
  - ✏️ **Apply Now** (instant application trigger)
- Multi-column sections stack to 1 column; photo gallery displays in 2 columns.
- Notices table renders as touch-friendly cards with date badges and direct download buttons.
- Touch swipe gesture support on Hero banner carousel.

---

## 🌟 Feature Breakdown (PRD v2.0 Compliance)

1. **4.0 Global Header & Accessibility**:
   - Skip to main content (`#main-content-section`).
   - Font size scaling (`A-`, `A`, `A+`) and High-Contrast mode toggle (`◐ Mode`).
   - Bilingual localization toggle (**EN** / **हिन्दी**).
   - Breadcrumb navigation trail on every inner page.
2. **4.1 Home Page**:
   - Hero carousel with auto-rotation, touch swipe, manual navigation arrows.
   - Megaphone announcement ticker with pause-on-hover.
   - Principal's desk quote + 4 quick action cards (*Admissions*, *Our Academics*, *Campus Life*, *Our Facilities*).
   - 5 Colored stage cards (*Pre-Primary*, *Primary*, *Middle*, *Secondary*, *Senior Secondary*).
   - News tabs (*All*, *Notices*, *Admissions*, *Results*, *Events*).
   - Photo gallery preview + Student Life cards (*Sports*, *Clubs & Activities*, *Events*, *Achievements*).
   - Esteemed partners strip (*CBSE*, *CISCE*, *FIT INDIA*, *NITI AAYOG*, *Skill India*).
   - CTA closing band (*"Join a Legacy of Excellence"* + Nelson Mandela quote card).
3. **4.2 About Us Page**:
   - Vision & Mission cards.
   - Our History narrative.
   - Why Choose Us (4 cards: *Experienced Faculty*, *Modern Infrastructure*, *Holistic Development*, *Safe & Supportive Environment*).
   - Facilities & infrastructure guide.
4. **4.3 Academics Page**:
   - Interactive sidebar tabs:
     - **Curriculum**: Stage selector tabs with full descriptions.
     - **Senior Secondary Streams**: Color-coded cards for *Science*, *Commerce*, *Humanities*.
     - **Examination & Results**: Board statistics (100% pass rate, school aggregate).
     - **Academic Calendar**: Month-wise academic schedule.
     - **Subjects & Electives**: Detailed subject combinations.
5. **4.4 Admissions Page**:
   - Interactive sidebar tabs:
     - **Admission Process**: 4-step workflow (1. Enquiry → 2. Documentation → 3. Interaction → 4. Confirmation).
     - **Eligibility & Age Criteria**: Complete age and document requirements table.
     - **Fee Structure**: Class-wise tuition, admission, and lab fee table.
     - **Online Enquiry Form**: Working form with CAPTCHA security question (`5 + 3 = ?`), validation, and generated application reference code (`OPS-2025-XXXX`).
     - **FAQs**: 5 expandable accordion items.
6. **4.5 Notices & Circulars Page**:
   - Category filter tabs (*All*, *Academic*, *Admissions*, *Exam*, *Holiday*, *Event*, *General*).
   - Real-time search bar with instant keyword matching.
   - Notice list with publish dates, file sizes, and download actions.
   - Working pagination bar (`1`, `2`, `3`, `→`).
7. **4.6 Gallery Page**:
   - Category filter tabs (*All*, *Events*, *Sports*, *Campus*, *Activities*).
   - Responsive photo album cards.
   - **Interactive Lightbox Viewer**: Full-screen modal with Next/Prev navigation, captions, and close button.
8. **Modals & Utilities**:
   - Online Admission Enquiry Modal.
   - Document Previewer Modal.
   - Photo Lightbox Modal.
   - Mobile Navigation Drawer.

---

## 🚀 How to Run

1. Open in your browser:
   👉 **http://localhost:8080**
2. Or double-click **`index.html`** in Windows File Explorer (`d:\New folder (9)\index.html`).
