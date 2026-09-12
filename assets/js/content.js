/**
 * Om Public School - Data Repository (PRD v2.0 Aligned)
 * Complete data for Home, About, Academics, Admissions, Notices, Gallery, News
 */

const schoolData = {
  profile: {
    name: "OM PUBLIC SCHOOL",
    tagline: "Learn • Grow • Build Tomorrow",
    hindiName: "ओम पब्लिक स्कूल",
    hindiTagline: "सीखें • बढ़ें • भविष्य का निर्माण करें",
    address: "Om Public School, Kashi, Varanasi - 221005 (UP)",
    phone: "+91 542 2345678 / +91 98765 43210",
    email: "info@ompublicschool.in",
    admissionsEmail: "admissions@ompublicschool.in",
    affiliation: "Affiliated to CBSE, New Delhi (Affiliation No: 2130894 | School Code: 71203)",
    establishedYear: "2005",
    studentCount: "3,200+",
    teacherCount: "150+",
    campusArea: "12+ Acres Green Campus"
  },

  announcements: [
    { title: "Class 10 & 12 Board Exam Schedule Released", date: "12 Sep 2025", category: "Exam", link: "view-notices" },
    { title: "Admissions Open for Session 2025-26 (Pre-Primary to Class XI)", date: "10 Sep 2025", category: "Admissions", link: "view-admissions" },
    { title: "Annual Sports Day Scheduled for 15 Nov 2025", date: "05 Sep 2025", category: "Event", link: "view-gallery" },
    { title: "Parent-Teacher Meeting (PTM) for Term 1 on Saturday, 20 Sep 2025", date: "01 Sep 2025", category: "Academic", link: "view-notices" },
    { title: "Om Public School Bags State Level Science Expo Gold Trophy", date: "28 Aug 2025", category: "Achievement", link: "view-news" }
  ],

  principal: {
    name: "Dr. Sunita Verma",
    qualifications: "M.A., M.Ed., Ph.D. (30+ Years Pedagogical Leadership)",
    title: "Principal, Om Public School",
    quote: "Education is not just about acquiring knowledge, but about building character, confidence and compassion for a better tomorrow.",
    hindiQuote: "शिक्षा केवल ज्ञान प्राप्त करने का नाम नहीं है, बल्कि बेहतर कल के लिए चरित्र, आत्मविश्वास और करुणा के निर्माण का मार्ग है।",
    photo: "assets/images/principal.svg"
  },

  programs: [
    {
      id: "pre-primary",
      name: "Pre-Primary",
      tagline: "Play • Learn • Grow",
      badgeClass: "prog-pre-primary",
      description: "Play-based sensorial learning, language stimulation, fine motor skills, and creative expression in nurturing joyful spaces.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>`
    },
    {
      id: "primary",
      name: "Primary",
      tagline: "Build Strong Basics",
      badgeClass: "prog-primary",
      description: "Foundational literacy, numeracy, environmental awareness, inquiry-driven thinking, and collaborative classroom activities.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
    },
    {
      id: "middle",
      name: "Middle School",
      tagline: "Explore • Learn • Excel",
      badgeClass: "prog-middle",
      description: "Integrated STEM laboratories, coding, Indian heritage, analytical problem solving, and inter-school competitions.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    },
    {
      id: "secondary",
      name: "Secondary",
      tagline: "Prepare For Tomorrow",
      badgeClass: "prog-secondary",
      description: "Rigorous CBSE board curriculum, conceptual mastery, career counseling, continuous diagnostic assessments, and sports.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
    },
    {
      id: "sr-secondary",
      name: "Senior Secondary",
      tagline: "Your Future, Our Focus",
      badgeClass: "prog-sr-secondary",
      description: "Science, Commerce, and Humanities streams with specialized foundation coaching for JEE, NEET, CUET, and CLAT.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/></svg>`
    }
  ],

  streams: [
    {
      name: "Science Stream",
      group: "PCM / PCB / PCMB",
      subjects: ["Physics", "Chemistry", "Mathematics / Biology", "English Core", "Computer Science / Physical Education / AI"],
      color: "#1d4ed8",
      bgColor: "#eff6ff",
      borderColor: "#bfdbfe",
      description: "Prepares scholars for engineering, medicine, pure research, computer sciences, and aerospace careers."
    },
    {
      name: "Commerce Stream",
      group: "Business & Finance",
      subjects: ["Accountancy", "Business Studies", "Economics", "English Core", "Applied Mathematics / Informatics Practices"],
      color: "#b45309",
      bgColor: "#fffbeb",
      borderColor: "#fde68a",
      description: "Builds rigorous acumen in chartered accountancy, investment banking, corporate law, and entrepreneurial management."
    },
    {
      name: "Humanities Stream",
      group: "Liberal Arts & Social Sciences",
      subjects: ["History", "Political Science", "Geography / Psychology", "Economics", "English Core / Legal Studies"],
      color: "#15803d",
      bgColor: "#f0fdf4",
      borderColor: "#bbf7d0",
      description: "Fosters analytical depth for civil services (UPSC), judicial examinations, diplomacy, journalism, and public policy."
    }
  ],

  whyChooseUs: [
    {
      icon: "👨‍🏫",
      title: "Experienced Faculty",
      desc: "150+ certified CBSE master trainers with an average of 12+ years of pedagogical expertise."
    },
    {
      icon: "🏢",
      title: "Modern Infrastructure",
      desc: "12-acre campus featuring Atal Tinkering Labs, AI suites, digital smart boards, and Olympiad labs."
    },
    {
      icon: "🌟",
      title: "Holistic Development",
      desc: "Equal emphasis on sports, performing arts, yoga, moral values, debate societies, and community outreach."
    },
    {
      icon: "🛡️",
      title: "Safe & Supportive Environment",
      desc: "24/7 CCTV surveillance, GPS-monitored school transport, certified nurses, and full POCSO compliance."
    }
  ],

  studentLife: [
    {
      title: "Sports & Athletics",
      sub: "Play. Compete. Grow.",
      desc: "Olympic-dimension basketball courts, FIFA-grade turf, cricket academy, and indoor badminton arena.",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/></svg>`
    },
    {
      title: "Clubs & Activities",
      sub: "Discover. Create. Lead.",
      desc: "Robotics Club, Eco Club, Model United Nations (MUN), Heritage Society, and Literary Guild.",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: "Campus Events",
      sub: "Celebrate Together.",
      desc: "Annual Cultural Carnival, Inter-School Science Conclave, Investiture Ceremony, and Founder's Day.",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
    },
    {
      title: "Achievements",
      sub: "Proud Moments.",
      desc: "100% CBSE distinction rate, National Science Olympiad winners, and State Junior Athletic Champions.",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`
    }
  ],

  newsItems: {
    all: [
      { id: 1, title: "Class 10 & 12 Board Exam Schedule Released", date: "12 Sep 2025", category: "Exam", color: "#1e3a8a", excerpt: "Official date sheet, instructions, and hall ticket schedule issued for secondary board examinations." },
      { id: 2, title: "Admissions Open for Academic Session 2025-26", date: "10 Sep 2025", category: "Admissions", color: "#d97706", excerpt: "Registration open for Nursery to Class XI. Campus walk-in tours available every Saturday." },
      { id: 3, title: "Annual Sports Day - 15 Nov 2025", date: "05 Sep 2025", category: "Events", color: "#059669", excerpt: "Track and field events, inter-house relays, and drill display schedules finalized." },
      { id: 4, title: "Inter-School Science Expo Gold Trophy", date: "01 Sep 2025", category: "Results", color: "#7c3aed", excerpt: "Om Public School AI project wins First Prize across 45 participating schools." },
      { id: 5, title: "Revised School Bus Timings for Winter Session", date: "28 Aug 2025", category: "Notices", color: "#0284c7", excerpt: "Updated GPS tracking routes and pick-up/drop-off timetable for all city zones." }
    ],
    notices: [
      { id: 1, title: "Class 10 & 12 Board Exam Schedule Released", date: "12 Sep 2025", category: "Notices", color: "#1e3a8a", excerpt: "Detailed timetable published for term assessments." },
      { id: 5, title: "Revised School Bus Timings for Winter Session", date: "28 Aug 2025", category: "Notices", color: "#0284c7", excerpt: "Safety circular regarding early winter departures." }
    ],
    admissions: [
      { id: 2, title: "Admissions Open for Academic Session 2025-26", date: "10 Sep 2025", category: "Admissions", color: "#d97706", excerpt: "Prospectus and registration link live for all classes." },
      { id: 6, title: "Scholarship Entrance Test for Class XI Merit Batch", date: "20 Aug 2025", category: "Admissions", color: "#ea580c", excerpt: "100% tuition waiver for meritorious students scoring 95%+ in Class X." }
    ],
    results: [
      { id: 4, title: "Inter-School Science Expo Gold Trophy", date: "01 Sep 2025", category: "Results", color: "#7c3aed", excerpt: "Our robotics scholars honored by district education authorities." },
      { id: 7, title: "100% First Divisions in CBSE Board Examination 2025", date: "15 Jul 2025", category: "Results", color: "#16a34a", excerpt: "School aggregate average hits 88.6% with 42 students scoring above 95%." }
    ],
    events: [
      { id: 3, title: "Annual Sports Day - 15 Nov 2025", date: "05 Sep 2025", category: "Events", color: "#059669", excerpt: "Preparations underway for track events and march-past." },
      { id: 8, title: "Grand Independence Day & Cultural Carnival", date: "15 Aug 2025", category: "Events", color: "#b91c1c", excerpt: "Tricolor hoisting followed by patriotic performances." }
    ]
  },

  noticesList: [
    { id: "not-1", title: "Class 10 & 12 Board Exam Schedule 2025-26", date: "12 Sep 2025", type: "PDF", size: "450 KB", category: "Exam", desc: "Detailed date sheet, shift timings, reporting protocols, and CBSE instructions for Board candidates." },
    { id: "not-2", title: "Fee Structure & Payment Policy for Session 2025-26", date: "10 Sep 2025", type: "PDF", size: "620 KB", category: "Admissions", desc: "Complete quarterly fee breakdown, sibling concessions, bus transport slabs, and online portal guides." },
    { id: "not-3", title: "Annual Academic Calendar & Gazetted Holiday List", date: "01 Sep 2025", type: "PDF", size: "380 KB", category: "Holiday", desc: "List of all term breaks, gazetted festivals, examination weeks, and sports days for the academic year." },
    { id: "not-4", title: "Parent Teacher Meeting (PTM) Schedule for Term 1", date: "28 Aug 2025", type: "PDF", size: "290 KB", category: "Academic", desc: "Roll number-wise time slots for parents to consult with class educators and subject teachers." },
    { id: "not-5", title: "Annual Sports Day Event Rules & House Guidelines", date: "20 Aug 2025", type: "PDF", size: "510 KB", category: "Event", desc: "Track, relay, shot put, and march-past event guidelines for Red, Blue, Green, and Gold houses." },
    { id: "not-6", title: "Mandatory Public Disclosure Document (CBSE)", date: "15 Aug 2025", type: "PDF", size: "780 KB", category: "General", desc: "School affiliation certificate, building safety, fire safety, sanitation certificates, and SMC list." },
    { id: "not-7", title: "Guidelines for Inter-House Science & Robotics Expo", date: "05 Aug 2025", type: "PDF", size: "340 KB", category: "Academic", desc: "Project submission deadlines, mentor allocation, and evaluation parameters for Classes 6-12." },
    { id: "not-8", title: "School Transport Safety Circular & Bus Fleet Helpline", date: "25 Jul 2025", type: "PDF", size: "410 KB", category: "General", desc: "Updated driver credentials, GPS app configuration instructions, and emergency contact numbers." }
  ],

  galleryPhotos: [
    { id: 1, title: "Annual Day Celebration", date: "15 Oct 2025", category: "Events", color: "linear-gradient(135deg, #1e3a8a, #3b82f6)", icon: "🎭", desc: "Vibrant cultural gala featuring orchestra, classical dances, and drama performances in the school auditorium." },
    { id: 2, title: "Sports Day Track Finals", date: "12 Nov 2024", category: "Sports", color: "linear-gradient(135deg, #065f46, #10b981)", icon: "🏃‍♂️", desc: "Thrilling 100m, 400m, and 4x100m relay finals on our Olympic-dimension athletic turf." },
    { id: 3, title: "Science & Robotics Exhibition", date: "10 Oct 2025", category: "Activities", color: "linear-gradient(135deg, #7c2d12, #f97316)", icon: "🤖", desc: "Scholars presenting autonomous rover prototypes, AI vision models, and hydraulic arms." },
    { id: 4, title: "Independence Day Parade", date: "15 Aug 2024", category: "Events", color: "linear-gradient(135deg, #4c1d95, #a855f7)", icon: "🇮🇳", desc: "Cadet march-past, flag hoisting ceremony, and patriotic choir recitals." },
    { id: 5, title: "Digital Classroom Learning", date: "05 Aug 2024", category: "Campus", color: "linear-gradient(135deg, #0f172a, #334155)", icon: "💻", desc: "Interactive smartboard lessons and collaborative project-based learning sessions." },
    { id: 6, title: "School Campus & Sports Oval", date: "01 Aug 2024", category: "Campus", color: "linear-gradient(135deg, #0369a1, #38bdf8)", icon: "🏫", desc: "12-acre lush green campus with architectural beauty, shaded pavilions, and modern labs." },
    { id: 7, title: "Swimming Championship", date: "22 Sep 2024", category: "Sports", color: "linear-gradient(135deg, #0284c7, #06b6d4)", icon: "🏊‍♂️", desc: "Inter-house aquatic meet in our all-weather semi-Olympic swimming pool." },
    { id: 8, title: "Art & Pottery Workshop", date: "18 Jul 2024", category: "Activities", color: "linear-gradient(135deg, #be123c, #fb7185)", icon: "🎨", desc: "Hands-on pottery and canvas painting workshop exploring Indian folk art traditions." }
  ],

  partners: [
    { name: "CBSE", sub: "Affiliation No. 2130894" },
    { name: "CISCE / State Board", sub: "Standard Curriculum" },
    { name: "FIT INDIA", sub: "Certified Active Campus" },
    { name: "NITI AAYOG", sub: "Atal Tinkering Lab" },
    { name: "Skill India", sub: "Vocational Skill Hub" }
  ],

  eligibility: [
    { class: "Nursery / Pre-Primary", age: "3+ Years as on 31st March", doc: "Birth Certificate, 4 Photos, Immunization Record" },
    { class: "Kindergarten (KG)", age: "4+ Years as on 31st March", doc: "Birth Certificate, Photos, Previous School Report (if any)" },
    { class: "Class 1 to 5 (Primary)", age: "5+ to 9+ Years", doc: "Birth Certificate, Transfer Certificate (TC), Marksheet" },
    { class: "Class 6 to 8 (Middle)", age: "10+ to 12+ Years", doc: "Original TC (countersigned), Progress Report, Aadhaar Card" },
    { class: "Class 9 & 10 (Secondary)", age: "13+ to 14+ Years", doc: "Class VIII / IX Marksheet, Original TC, Registration Card" },
    { class: "Class 11 (Sr. Secondary)", age: "15+ Years", doc: "CBSE Class X Board Marksheet, Migration Certificate, TC" }
  ],

  feeStructure: [
    { level: "Pre-Primary (Nursery - KG)", tuition: "₹ 3,200 / month", admission: "₹ 12,000 (One time)", lab: "Included" },
    { level: "Primary (Class 1 - 5)", tuition: "₹ 3,800 / month", admission: "₹ 15,000 (One time)", lab: "₹ 1,500 / year" },
    { level: "Middle (Class 6 - 8)", tuition: "₹ 4,400 / month", admission: "₹ 15,000 (One time)", lab: "₹ 2,000 / year" },
    { level: "Secondary (Class 9 - 10)", tuition: "₹ 5,000 / month", admission: "₹ 18,000 (One time)", lab: "₹ 3,000 / year" },
    { level: "Senior Secondary (Science)", tuition: "₹ 6,200 / month", admission: "₹ 20,000 (One time)", lab: "₹ 4,500 / year" },
    { level: "Senior Secondary (Comm/Hum)", tuition: "₹ 5,600 / month", admission: "₹ 20,000 (One time)", lab: "₹ 2,500 / year" }
  ],

  faqs: [
    {
      q: "What is the admission procedure for the 2025-26 session?",
      a: "The procedure follows 4 simple steps: 1. Submit an online enquiry or visit school reception; 2. Complete registration and submit required documents; 3. Informal student-parent interaction with our counseling team; 4. Fee deposit and admission confirmation."
    },
    {
      q: "Does the school provide GPS-tracked transportation across Varanasi?",
      a: "Yes. Om Public School operates a modern fleet of GPS-equipped buses covering all major zones and colonies of Varanasi. Each bus has a female attendant, first-aid kit, and speed governors."
    },
    {
      q: "What board is Om Public School affiliated with?",
      a: "Om Public School is affiliated with the Central Board of Secondary Education (CBSE), New Delhi (Affiliation No: 2130894), following the National Education Policy (NEP 2020) curriculum."
    },
    {
      q: "What are the school timings?",
      a: "Pre-Primary: 8:30 AM to 12:30 PM (Mon-Fri). Classes 1 to 12: 7:50 AM to 2:15 PM (Mon-Sat). Second Saturdays are holidays."
    },
    {
      q: "Are scholarships available for meritorious students?",
      a: "Yes. Merit scholarships offering up to 100% tuition waivers are awarded to top scorers in our annual Scholarship Aptitude Test (OPSAT) and scholars scoring 95%+ in Class X board exams."
    }
  ]
};
