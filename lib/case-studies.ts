export interface CaseStudyMetric {
  label: string
  value: string
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  duration: string
  team?: string
  technologies: string[]
  heroImage: string
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
  gallery?: string[]
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
        "The launch site achieved strong organic traffic from day one, earning coverage from Forbes, WIRED, and TechCrunch. The no-subscription model became Evolwe's key conversion driver against Oura Ring in the Indian market.",
      metrics: [
        { label: "Play Store Rating", value: "4.7/5" },
        { label: "Press Coverage", value: "3 majors" },
        { label: "Biometrics Tracked", value: "15+" },
        { label: "Subscription Cost", value: "₹0" },
      ],
    },
  },
  {
    id: "rynox",
    title: "Rynox",
    client: "Rynox (Product)",
    category: "SaaS Platforms",
    duration: "8 months",
    team: "Revzion team",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Redis", "Vercel", "Tailwind CSS"],
    heroImage: "/screenshots/rynox.jpg",
    summary: "All-in-one billing & franchise command platform for multi-location beauty and wellness brands",
    liveUrl: "https://www.rynox.io/",
    featured: true,
    problem: {
      title: "The Challenge",
      description:
        "Franchise operators managing 5–500+ locations were running billing on generic POS software never designed for multi-unit command. They had no unified view of pricing consistency, no franchise-level profit auditing, and no way to benchmark individual location performance without manual spreadsheet reconciliation.",
      challenges: [
        "Generic POS software not designed for multi-unit franchise operations",
        "No unified pricing visibility or consistency enforcement across locations",
        "Manual spreadsheet reconciliation for franchise vs. location P&L comparisons",
        "Commission and incentive disputes causing month-end friction",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We designed and built Rynox from the ground up — a multi-tenant SaaS platform with location-level data isolation, a centralised pricing engine, an analytics layer surfacing franchise vs. location P&L, and a staff incentive calculator that eliminates manual commission disputes.",
      features: [
        "Single dashboard controls pricing and settings across every franchise unit",
        "Real-time P&L comparison identifying underperforming units vs. franchise average",
        "Unified billing supporting Stripe, PayPal, and Square with split payments",
        "Automated commission and incentive calculations reducing payroll admin",
        "Native connectors for QuickBooks, Xero, Zapier, Mailchimp, and Slack",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "Rynox serves franchise networks from single units to 500+ location operations. Operators replace a 3-tool stack with one command centre. Customer acquisition accelerated through word-of-mouth within the beauty franchise community.",
      metrics: [
        { label: "Locations Supported", value: "500+" },
        { label: "Tools Replaced", value: "3 → 1" },
        { label: "Billing Integrations", value: "3 gateways" },
        { label: "Accounting Sync", value: "Real-time" },
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
        "SOC 2, GDPR, and ISO 27001 certified with end-to-end encryption and audit logging",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "Cognivia operates at 99.7% uptime and is positioned head-to-head against Classplus and Teachmint. AI-powered dropout detection and automated fee recovery directly address the two biggest revenue leaks in the coaching industry.",
      metrics: [
        { label: "Compliance Certs", value: "3" },
        { label: "Uptime SLA", value: "99.7%" },
        { label: "Dropout Detection", value: "14 days" },
        { label: "Admin Hours Saved", value: "80%+" },
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
    summary: "Full-stack e-commerce platform for a UK home goods & DIY retailer with BNPL integration",
    liveUrl: "https://www.scottishhomebargains.uk/",
    featured: false,
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
        "The platform went live with a full product catalogue, BNPL checkout reducing price-driven drop-off on larger home improvement purchases. The site is fully VAT-registered and GDPR-compliant for UK trading.",
      metrics: [
        { label: "Payment Methods", value: "4" },
        { label: "Product Categories", value: "10+" },
        { label: "Delivery Threshold", value: "£20" },
        { label: "Returns Window", value: "14 days" },
      ],
    },
  },
  {
    id: "mawasim",
    title: "Mawasim",
    client: "Mawasim (Saudi Arabia)",
    category: "E-Commerce",
    duration: "3 months",
    team: "Revzion team",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Arabic RTL", "Stripe", "WhatsApp API", "Vercel"],
    heroImage: "/screenshots/mawasim.jpg",
    summary: "Luxury premium dates e-commerce brand from Saudi Arabia with Arabic-first design",
    liveUrl: "https://www.mawasim.com.sa/",
    featured: false,
    problem: {
      title: "The Challenge",
      description:
        "A generations-old Saudi date merchant with unmatched product quality had no credible digital presence. Sales were entirely offline and through personal networks. The brand's 50-year heritage story was invisible to modern consumers who discover premium food through digital channels.",
      challenges: [
        "50-year heritage brand with zero digital presence or online discoverability",
        "Sales entirely offline through personal networks with no e-commerce capability",
        "Full Arabic RTL design required to serve the primary Saudi market authentically",
        "B2B corporate gifting is a primary revenue channel in Saudi Arabia",
      ],
    },
    solution: {
      title: "Our Approach",
      description:
        "We designed and built a luxury bilingual e-commerce platform with full Arabic RTL support, premium food photography showcase, a heritage storytelling section communicating the brand's 50-year provenance, and a WhatsApp-integrated enquiry flow for B2B gifting orders.",
      features: [
        "Full RTL Arabic layout with EN/AR language toggle throughout",
        "Heritage-driven product cards communicating origin region and artisanal quality",
        "WhatsApp integration capturing B2B corporate gifting enquiries",
        "SAR 500 free delivery threshold optimised for gifting average order value",
        "Stripe checkout with Saudi Riyal pricing and KSA VAT compliance",
      ],
    },
    results: {
      title: "The Impact",
      description:
        "The platform gave Mawasim a flagship digital storefront worthy of a SAR 380+ product. The bilingual design serves both Arabic-speaking domestic buyers and international English-speaking audiences.",
      metrics: [
        { label: "Languages Supported", value: "2" },
        { label: "Origin Regions", value: "12" },
        { label: "Heritage Communicated", value: "50+ yrs" },
        { label: "Free Delivery From", value: "SAR 500" },
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
        { label: "Load Time", value: "<1.5s" },
        { label: "Lead Channels", value: "2" },
        { label: "Mobile-First", value: "100%" },
        { label: "Membership Tiers", value: "Clear CTAs" },
      ],
    },
  },
]

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.id === id)
}
