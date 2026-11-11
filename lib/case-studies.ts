export interface CaseStudyMetric {
  label: string
  value: string
}

export interface GalleryImage {
  src: string
  alt: string
  device: "desktop" | "mobile"
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  duration: string
  team?: string
  technologies: string[]
  heroImage?: string
  summary?: string
  liveUrl?: string
  featured: boolean
  problem: {
    title: string
    description: string
    challenges: string[]
  }
  solution: {
    title: string
    description: string
    features: string[]
  }
  results: {
    title: string
    description: string
    metrics: CaseStudyMetric[]
  }
  gallery?: GalleryImage[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "evolwe-ring",
    title: "Evolwe Ring",
    client: "Evolwe Inc.",
    category: "Mobile Apps",
    duration: "6 months",
    team: "Revzion team",
    technologies: ["React Native", "TypeScript", "Next.js", "Node.js", "BLE SDK", "TensorFlow Lite", "AWS", "Vercel"],
    heroImage: "/screenshots/evolwe-ring.jpg",
    gallery: [
      { src: "/screenshots/gallery/evolwe-ring-mobile-1.jpg", alt: "Evolwe product site on mobile", device: "mobile" },
      { src: "/screenshots/gallery/evolwe-ring-app.jpg", alt: "Evolwe companion app home screen with daily health score", device: "mobile" },
    ],
    summary: "India's most advanced smart ring — companion app, AI health insights & product site",
    liveUrl: "https://evolwering.com/",
    featured: true,
    problem: {
      title: "The Challenge",
      description:
        "The wearables market was dominated by subscription-gated platforms, overwhelming dashboards, and devices built primarily for Western users. Indian health-tech consumers had no premium smart ring option with local language support, relevant health benchmarks, and a one-time pricing model.",
      challenges: [
        "No premium smart ring option in the Indian market with local language support",
        "Subscription-gated platforms dominated by Western-centric health benchmarks",
        "Raw sensor data needed conversion into personalised, actionable health insights",
        "Oura Ring's subscription model was the only premium benchmark — pricing was a barrier",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We built the product website with premium 3D-inspired visuals and a React Native companion app pairing via BLE. An on-device ML pipeline converts SpO2, HRV, skin temperature, and accelerometer readings into actionable daily health scores through EVO AI.",
      features: [
        "15+ biometric metrics tracked continuously from ring sensors",
        "EVO AI engine translating raw biometric streams into daily health scores",
        "Women's Health Suite with menstrual cycle and ovulation tracking",
        "BLE companion app with background sync and 12-month trend history",
        "Next.js product site with 3D ring visualisations and conversion-optimised purchase flow",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "The product site and companion app launched together. Evolwe's no-subscription model is the core of its positioning against subscription-gated rings in the Indian market.",
      metrics: [
        { label: "Play Store Rating", value: "4.7/5" },
        { label: "Press Coverage", value: "3 majors" },
        { label: "Biometrics Tracked", value: "15+" },
        { label: "Subscription Cost", value: "₹0" },
      ],
    },
  },
  {
    id: "cognivia",
    title: "Cognivia",
    client: "Cognivia (Product)",
    category: "SaaS Platforms",
    duration: "9 months",
    team: "Revzion team",
    technologies: ["Next.js", "TypeScript", "React Native", "Node.js", "PostgreSQL", "OpenAI", "Redis", "AWS"],
    heroImage: "/screenshots/cognivia.jpg",
    gallery: [
      { src: "/screenshots/gallery/cognivia-desktop-2.jpg", alt: "Cognivia platform architecture section", device: "desktop" },
      { src: "/screenshots/gallery/cognivia-mobile-2.jpg", alt: "Cognivia site on mobile — fee collection and data residency", device: "mobile" },
    ],
    summary: "The operating system for modern educators — AI-first LMS with revenue automation",
    liveUrl: "https://cognivia-visit.vercel.app/",
    featured: true,
    problem: {
      title: "The Challenge",
      description:
        "Coaching institutes were juggling 4–6 disconnected tools for admissions, course delivery, fee collection, and parent communication. This fragmentation caused revenue leakage from missed fee follow-ups, poor learning outcomes from lack of analytics, and wasted admin hours on automatable tasks.",
      challenges: [
        "4–6 disconnected tools for admissions, course delivery, and fee collection",
        "Revenue leakage from missed and untracked fee follow-ups",
        "No analytics to predict student dropout risk before it happened",
        "Hours of admin time wasted on tasks that should be fully automated",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We designed and engineered Cognivia as a vertically integrated platform — covering the full educator workflow. The AI layer generates quiz questions, predicts dropout risk 2 weeks before it happens, and personalises learning paths. White-label iOS and Android apps give institutes a branded mobile presence.",
      features: [
        "AI Question Generator producing curriculum-aligned questions from uploaded syllabi",
        "ML dropout prediction identifying at-risk students 14 days before disengagement",
        "Automated recurring billing, reminders, and instalment management",
        "Fully branded white-label iOS and Android apps published under the institute's name",
        "Encryption in transit and at rest, with audit logging",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "AI-powered dropout detection and automated fee recovery target the two biggest revenue leaks in the coaching industry.",
      metrics: [
        { label: "Dropout Early Warning", value: "14 days" },
        { label: "White-label Apps", value: "iOS + Android" },
        { label: "Fee Collection", value: "Automated" },
      ],
    },
  },
  {
    id: "scottish-home-bargains",
    title: "Scottish Home Bargains",
    client: "Paul & Mathew Group (UK)",
    category: "E-Commerce",
    duration: "4 months",
    team: "Revzion team",
    technologies: ["Next.js", "TypeScript", "Stripe", "Klarna", "Clearpay", "Tailwind CSS", "Vercel", "Tawk.to"],
    heroImage: "/screenshots/scottish-home-bargains.jpg",
    gallery: [
      { src: "/screenshots/gallery/scottish-home-bargains-desktop-2.jpg", alt: "Scottish Home Bargains brand and delivery sections", device: "desktop" },
      { src: "/screenshots/gallery/scottish-home-bargains-mobile-1.jpg", alt: "Scottish Home Bargains storefront on mobile", device: "mobile" },
      { src: "/screenshots/gallery/scottish-home-bargains-mobile-2.jpg", alt: "Scottish Home Bargains category tiles on mobile", device: "mobile" },
    ],
    summary: "Full-stack e-commerce platform for a UK home goods & DIY retailer with BNPL integration",
    liveUrl: "https://www.scottishhomebargains.uk/",
    featured: true,
    problem: {
      title: "The Challenge",
      description:
        "The client needed a modern e-commerce storefront to handle a wide, diverse product catalogue — from Bosch power tools to Dulux paint to party supplies — with flexible payment options to reduce cart abandonment on higher-ticket items and a frictionless mobile browsing experience.",
      challenges: [
        "Diverse product catalogue spanning power tools, home décor, paint, and party supplies",
        "High cart abandonment on larger home improvement purchases without BNPL options",
        "UK consumers expecting Klarna and Clearpay as standard checkout options",
        "Mobile browsing experience critical for the UK retail audience",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We built a Next.js e-commerce site with image-optimised product carousels, category-driven navigation, and a multi-step checkout supporting Stripe, Klarna, and Clearpay. Trustpilot review integration and live chat via Tawk.to were embedded to build buyer confidence.",
      features: [
        "Multi-category catalogue managed from a single admin interface",
        "Klarna and Clearpay BNPL integrated alongside Stripe for flexible payments",
        "Live Trustpilot review integration at product and checkout level",
        "Tawk.to live chat with pre-chat qualification routing",
        "Free delivery over £20 with 14-day returns and UK-wide fulfilment",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "The platform went live with a full product catalogue, BNPL checkout reducing price-driven drop-off on larger home improvement purchases.",
      metrics: [
        { label: "Payment Methods", value: "4" },
        { label: "Product Categories", value: "10+" },
        { label: "Delivery Threshold", value: "£20" },
        { label: "Returns Window", value: "14 days" },
      ],
    },
  },
  {
    id: "mazencito",
    title: "Mazencito",
    client: "Mazencito Pizzeria (Jeddah, KSA)",
    category: "Websites",
    duration: "6 weeks",
    team: "Revzion team",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Arabic RTL"],
    heroImage: "/screenshots/mazencito.jpg",
    gallery: [
      { src: "/screenshots/gallery/mazencito-desktop-2.jpg", alt: "Mazencito delivery partners section", device: "desktop" },
      { src: "/screenshots/gallery/mazencito-mobile-1.jpg", alt: "Mazencito home screen on mobile", device: "mobile" },
      { src: "/screenshots/gallery/mazencito-mobile-2.jpg", alt: "Mazencito delivery links on mobile", device: "mobile" },
    ],
    summary: "Premium digital presence for a Neapolitan wood-fired pizza restaurant in Jeddah",
    liveUrl: "https://mazencito.vercel.app/",
    featured: false,
    problem: {
      title: "The Challenge",
      description:
        "Mazencito had exceptional food and a loyal following of 46.9K on Instagram but no website that matched the quality of the in-restaurant experience. Customers couldn't find delivery links, weekly promotions, or reservation details in one place — leading to lost orders.",
      challenges: [
        "46.9K Instagram following but no website to convert that audience",
        "Customers couldn't find delivery links, promotions, or contact in one place",
        "Fragmented digital presence leading to lost orders and a diluted brand impression",
        "No foundation for upcoming QR table ordering and proprietary mobile app",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We built a bilingual EN/AR restaurant website on Next.js with animated menu showcases, embedded delivery platform links (HungerStation, Keeta, Jahez, Lugmety), a promotions section for weekly deals, and architecture ready for QR ordering integration.",
      features: [
        "Full Arabic RTL layout with seamless EN/AR toggle for all audiences",
        "Numbered pizza showcase matching the in-restaurant menu identity",
        "One-click access to all four delivery platforms from the hero section",
        "Weekly promotions engine with BOGO and lunch offers",
        "Animated Google Review carousel for social proof at decision points",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "The site was shortlisted for Time Out Jeddah 2026 accolades. All four delivery partners are accessible from a single click. The numbered pizza showcase creates visual coherence between the physical menu and digital experience.",
      metrics: [
        { label: "Delivery Platforms", value: "4" },
        { label: "Instagram Following", value: "46.9K" },
        { label: "Recognition", value: "Time Out Jeddah" },
        { label: "Languages", value: "2" },
      ],
    },
  },
  {
    id: "everyday-fitness",
    title: "Everyday Fitness",
    client: "Everyday Fitness (India)",
    category: "Websites",
    duration: "6 weeks",
    team: "Revzion team",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    heroImage: "/screenshots/everyday-fitness.jpg",
    gallery: [
      { src: "/screenshots/gallery/everyday-fitness-desktop-2.jpg", alt: "Everyday Fitness about section", device: "desktop" },
      { src: "/screenshots/gallery/everyday-fitness-mobile-1.jpg", alt: "Everyday Fitness home screen on mobile", device: "mobile" },
      { src: "/screenshots/gallery/everyday-fitness-mobile-2.jpg", alt: "Everyday Fitness about section on mobile", device: "mobile" },
    ],
    summary: "High-performance fitness studio website with membership flows and class scheduling",
    liveUrl: "https://www.everydayfitness.in/",
    featured: false,
    problem: {
      title: "The Challenge",
      description:
        "Fitness studios in India rely heavily on walk-ins and word-of-mouth, but increasingly, potential members research online before visiting. Without a strong digital presence, Everyday Fitness was losing prospective members to competitors with more polished websites and clear membership purchase journeys.",
      challenges: [
        "Prospective members lost to competitors with stronger digital presence",
        "No clear online membership purchase or inquiry journey",
        "Heavy reliance on walk-ins with zero digital lead generation",
        "Majority of Indian users discover fitness studios on smartphones",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We built a fast, mobile-first website with strong visual hierarchy — class schedule display, trainer showcase, membership plan comparison, and a lead capture form routing enquiries directly to the sales team via WhatsApp and email.",
      features: [
        "Weekly class timetable with trainer, intensity, and capacity details",
        "Trainer profiles with certifications and direct booking pathways",
        "Tiered membership cards with feature comparison and prominent CTAs",
        "WhatsApp lead capture routing directly to the studio's team",
        "Next.js static generation for fast load times on mobile connections",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "The website established Everyday Fitness as a credible, premium brand in the local market. Clear CTAs on every section reduce friction between interest and inquiry for the majority of users on mobile.",
      metrics: [
        { label: "Lead Channels", value: "WhatsApp + email" },
        { label: "Rendering", value: "Static (Next.js)" },
      ],
    },
  },
]

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === id)
}
