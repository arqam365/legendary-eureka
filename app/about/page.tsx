"use client"

import { useEffect, useState } from "react"
import {motion, Variants} from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Globe,
  Award,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react"
import Link from "next/link"

/* ---------- minimal motion ---------- */
const revealOnce: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  },
}
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

/* md+ detector: animate immediately on small screens (iOS Safari fixes) */
const useIsMdUp = () => {
  const [mdUp, setMdUp] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)")
    const onChange = () => setMdUp(mql.matches)
    onChange()
    mql.addEventListener?.("change", onChange)
    return () => mql.removeEventListener?.("change", onChange)
  }, [])
  return mdUp
}

export default function AboutPage() {
  const mdUp = useIsMdUp()

  const teamMembers = [
    {
      name: "Arqam Ahmad Siddiqui",
      role: "Founder & CEO",
      bio: "Driving Revzion’s vision with hands-on KMP, scalable cloud, and product leadership.",
      image: "/team/arqam.jpg",
      linkedin: "https://www.linkedin.com/in/arqam365/",
      twitter: "https://x.com/arqam365",
      github: "https://github.com/arqam365",
    },
    { name: "Sharad Pratap Singh Sengar", role: "Mobile Developer", bio: "Kotlin Multiplatform developer building fast, reliable Android & iOS apps.", image: "/team/sharad.jpg", linkedin: "#", twitter: "#", github: "#", },
    { name: "Raj Dwivedi", role: "Backend Engineer & DevOps Specialist", bio: "APIs, CI/CD, and cloud-native reliability across Node/Ktor and modern infra.", image: "/team/raj.jpg", linkedin: "#", twitter: "#", github: "#", },
    { name: "Bilal Sheikh", role: "Full Stack Engineer", bio: "Bridging frontend and backend to ship robust, user-centric features.", image: "/team/bilal.jpg", linkedin: "#", twitter: "#", github: "#", },
    { name: "Sneha Sahu", role: "Head of Business Development", bio: "Building partnerships and growth pipelines aligned with product value.", image: "/team/sneha.jpg", linkedin: "#", twitter: "#", github: "#", },
    { name: "Aanya Agrawal", role: "Mobile Developer", bio: "Compose & KMP enthusiast focused on smooth UX and performance.", image: "/team/aanya.jpg", linkedin: "#", twitter: "#", github: "#", },
    { name: "Saniya Khan", role: "UI/UX Developer", bio: "Designs intuitive, accessible interfaces with implementation ownership.", image: "/team/saniya.jpg", linkedin: "#", twitter: "#", github: "#", },
    { name: "Khushi Chaturvedi", role: "UI/UX Expert", bio: "Crafts delightful, user-first experiences grounded in research.", image: "/team/khushi.jpg", linkedin: "#", twitter: "#", github: "#", },
  ]

  const extendedTeam = [
    { name: "Gagandeep Singh", role: "Engineer", bio: "Full-stack & integrations." },
    { name: "Pulkit Shukla", role: "Engineer", bio: "Cloud & backend solutions." },
    { name: "Ankit Bose", role: "Engineer", bio: "APIs & reliability." },
    { name: "Prateek Singh", role: "Engineer", bio: "Frontend/Backend agility." },
    { name: "Jay Bhavsar", role: "Engineer", bio: "Mobile & frontend." },
    { name: "Yash Soni", role: "Engineer", bio: "Performance-minded full-stack." },
    { name: "Bharat Agarwal", role: "Engineer", bio: "Architecture & data." },
    { name: "Harshit Savita", role: "Engineer", bio: "Frontend/UI clean builds." },
  ]

  const values = [
    { icon: <Lightbulb className="h-8 w-8" />, title: "Innovation First", description: "We constantly push boundaries and explore cutting-edge technologies to deliver solutions that are ahead of their time." },
    { icon: <Users className="h-8 w-8" />, title: "Client Partnership", description: "We believe in long-term partnerships—understanding your vision and growing together." },
    { icon: <Target className="h-8 w-8" />, title: "Quality Excellence", description: "Every line of code and design detail is crafted with care and purpose." },
    { icon: <Heart className="h-8 w-8" />, title: "People-Centric", description: "We design with empathy—technology should serve people, not the other way around." },
    { icon: <Zap className="h-8 w-8" />, title: "Agile Delivery", description: "We deliver value incrementally while maintaining high standards." },
    { icon: <Globe className="h-8 w-8" />, title: "Global Impact", description: "Built to scale globally and create positive outcomes for businesses and communities." },
  ]

  const stats = [
    { value: "2019", label: "Founded" },
    { value: "15+ ", label: "Core & Extended Team" },
    { value: "100+", label: "Projects Delivered" },
    { value: "25+", label: "Countries Served" },
  ]

  const awards = [
    { title: "Best Tech Startup 2023", organization: "TechCrunch Awards" },
    { title: "Innovation Excellence", organization: "Global Tech Summit" },
    { title: "Top 50 Companies to Watch", organization: "Forbes" },
    { title: "Best Workplace Culture", organization: "Great Place to Work" },
  ]

  const [showMore, setShowMore] = useState(false)

  return (
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
                  About <span className="text-gradient-revzion">Revzion</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We're a team of technologists, designers, and innovators transforming businesses through modern software.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-2xl font-heading font-bold text-gray-900 mb-1">{s.value}</div>
                        <div className="text-sm text-gray-600">{s.label}</div>
                      </div>
                  ))}
                </div>

                <Button className="bg-gradient-revzion hover:opacity-90 transition-opacity">
                  <Link href="/contact">Join Our Journey</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <img
                    src="/modern-tech-team.png"
                    alt="Revzion team working together"
                    className="rounded-2xl shadow-2xl w-full h-auto"
                    loading="lazy"
                />
                {/* Glassy award badge */}
                <div className="absolute -bottom-6 -left-6 rounded-xl border bg-white/70 backdrop-blur p-6 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold text-gray-900">Award Winning</div>
                      <div className="text-sm text-gray-600">Tech Innovation 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-revzion mx-auto mb-8" />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Revzion (previously Next Level Programmers) was founded in 2019 by <strong>Arqam Ahmad Siddiqui</strong> to
                bridge the gap between modern engineering practices and real business outcomes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From early consulting to full-scale product builds across KMP, cloud, and AI, we’ve grown into a
                delivery-first partner for startups and enterprises.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we’ve shipped 100+ projects across 25+ countries—staying true to our mission: make advanced
                technology accessible, reliable, and genuinely useful.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              /* same md-up trick to ensure it reveals on mobile */
              {...(mdUp
                  ? { whileInView: "show", viewport: { once: true, amount: 0.25 } }
                  : { animate: "show" })}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Principles that guide every decision and partnership.
              </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerParent}
                initial="hidden"
                {...(mdUp
                    ? { whileInView: "show", viewport: { once: true, amount: 0.2, margin: "-10% 0px" } }
                    : { animate: "show" })}
            >
              {values.map((v) => (
                  <motion.div key={v.title} variants={revealOnce}>
                    <Card className="p-8 text-center hover:shadow-lg transition-shadow border-0 bg-white">
                      <div className="text-primary mb-4 flex justify-center">{v.icon}</div>
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">{v.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{v.description}</p>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <motion.div
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp
                  ? { whileInView: "show", viewport: { once: true, amount: 0.25 } }
                  : { animate: "show" })}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A compact senior team shipping at startup speed with enterprise discipline.
              </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerParent}
                initial="hidden"
                {...(mdUp
                    ? { whileInView: "show", viewport: { once: true, amount: 0.2, margin: "-10% 0px" } }
                    : { animate: "show" })}
            >
              {teamMembers.map((m) => (
                  <motion.div key={m.name} variants={revealOnce}>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow border-0">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                            src={m.image || "/placeholder.svg"}
                            alt={m.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-1">{m.name}</h3>
                        <p className="text-primary font-medium mb-3">{m.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{m.bio}</p>
                        <div className="flex space-x-3">
                          {m.linkedin && (
                              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label={`${m.name} on LinkedIn`}>
                                <Linkedin className="h-5 w-5" />
                              </a>
                          )}
                          {m.twitter && (
                              <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label={`${m.name} on Twitter/X`}>
                                <Twitter className="h-5 w-5" />
                              </a>
                          )}
                          {m.github && (
                              <a href={m.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label={`${m.name} on GitHub`}>
                                <Github className="h-5 w-5" />
                              </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>

            {/* Extended Team */}
            <div className="text-center mt-10">
              <Button variant="outline" className="px-6" onClick={() => setShowMore((v) => !v)}>
                {showMore ? "Hide Extended Team" : `See More Team (${extendedTeam.length})`}
              </Button>
            </div>

            {showMore && (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
                    variants={staggerParent}
                    initial="hidden"
                    animate="show"
                >
                  {extendedTeam.map((m) => (
                      <motion.div key={m.name} variants={revealOnce}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow border-0">
                          <div className="p-4">
                            <h3 className="text-lg font-heading font-semibold text-gray-900">{m.name}</h3>
                            <p className="text-primary text-sm mb-1">{m.role}</p>
                            <p className="text-gray-600 text-xs">{m.bio}</p>
                          </div>
                        </Card>
                      </motion.div>
                  ))}
                </motion.div>
            )}
          </motion.div>
        </section>

        {/* Awards */}
        <section className="py-20 bg-gray-50">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp
                  ? { whileInView: "show", viewport: { once: true, amount: 0.25 } }
                  : { animate: "show" })}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-6">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Honored by industry leaders for innovation and excellence.
            </p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerParent}
                initial="hidden"
                {...(mdUp
                    ? { whileInView: "show", viewport: { once: true, amount: 0.2, margin: "-10% 0px" } }
                    : { animate: "show" })}
            >
              {awards.map((a) => (
                  <motion.div key={a.title} variants={revealOnce}>
                    <Card className="p-6 text-left border bg-white/70 backdrop-blur hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-heading font-semibold text-gray-900 mb-1">{a.title}</h3>
                          <p className="text-gray-600">{a.organization}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-revzion">
          <motion.div
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
              variants={revealOnce}
              initial="hidden"
              {...(mdUp
                  ? { whileInView: "show", viewport: { once: true, amount: 0.25 } }
                  : { animate: "show" })}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let’s bring your vision to life with thoughtful design and solid engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">
                <Link href="/contact">Get In Touch</Link>
              </Button>
              <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3 bg-transparent"
              >
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
  )
}