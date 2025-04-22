"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Github, Linkedin, ExternalLink, Send, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ParticlesBackground from "@/components/particles-background"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("")
  const [typedText, setTypedText] = useState("")
  const [currentTitle, setCurrentTitle] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const staticText = "> Hello World. I am a "
  const titles = ["Backend Developer.", "Software Developer.", "Software Architect."]
  const typingRef = useRef<NodeJS.Timeout>()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Enhanced typing effect with multiple titles
  useEffect(() => {
    const handleTyping = () => {
      const currentTitleText = titles[currentTitle]
      const shouldComplete = !isDeleting && typedText === staticText + currentTitleText
      const shouldStartDeleting = !isDeleting && typedText === staticText + currentTitleText
      const shouldSwitchTitle = isDeleting && typedText === staticText

      // Clear existing timeout
      if (typingRef.current) {
        clearTimeout(typingRef.current)
      }

      // Complete current title
      if (shouldComplete) {
        typingRef.current = setTimeout(() => {
          setIsDeleting(true)
          setTypingSpeed(50) // Faster when deleting
        }, 2000) // Pause at complete title
        return
      }

      // Start deleting
      if (shouldStartDeleting) {
        setIsDeleting(true)
        setTypingSpeed(50)
        return
      }

      // Switch to next title
      if (shouldSwitchTitle) {
        setIsDeleting(false)
        setCurrentTitle((prev) => (prev + 1) % titles.length)
        setTypingSpeed(100)
        return
      }

      // Handle typing or deleting
      typingRef.current = setTimeout(() => {
        if (isDeleting) {
          setTypedText((prev) => prev.substring(0, prev.length - 1))
        } else {
          const fullText = staticText + currentTitleText
          setTypedText((prev) => fullText.substring(0, prev.length + 1))
        }
      }, typingSpeed)
    }

    handleTyping()

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current)
      }
    }
  }, [typedText, isDeleting, currentTitle, typingSpeed, titles])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // Close mobile menu after selection
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-green-500/30 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <span className="text-white">dev</span>
            <span className="text-green-500">@portfolio</span>
            <span className="text-white">:~$</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            {["about", "skills", "projects", "profiles", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize hover:text-white transition-colors ${
                  activeSection === section ? "text-white" : ""
                }`}
              >
                {section}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-green-500/30 text-green-500 hover:bg-green-500/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            ref={mobileMenuRef}
            className={`absolute top-full right-0 w-48 bg-black border border-green-500/30 rounded-md shadow-lg py-2 px-1 md:hidden transition-all duration-200 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {["home", "about", "skills", "projects", "profiles", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section === "home" ? "hero" : section)}
                className="block w-full text-left px-4 py-2 capitalize hover:bg-green-500/10 hover:text-white transition-colors rounded"
              >
                <span className="text-green-500 mr-2">$</span>
                {section}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section id="hero" className="h-[80vh] flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="h-[80px] sm:h-[100px] md:h-[120px] mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {typedText}
                <span className="animate-pulse">_</span>
              </h1>
            </div>
            <div className="animate-fade-in">
              <p className="text-lg sm:text-xl text-gray-400 mb-8">
                I build robust, scalable backend systems and APIs that power modern applications.
              </p>
              <Button
                onClick={() => scrollToSection("about")}
                className="bg-green-500 text-black hover:bg-green-400 flex items-center gap-2"
              >
                Explore <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 border-t border-green-500/30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">01.</span> About Me
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="space-y-4 text-gray-300 md:w-2/3 order-2 md:order-1">
                <p>
                  I'm a backend developer with a passion for building efficient, scalable, and maintainable systems.
                  With expertise in server-side technologies, databases, and API development, I create the robust
                  foundations that power modern applications.
                </p>
                <p>
                  My approach combines technical excellence with problem-solving skills to deliver solutions that meet
                  business requirements while maintaining high performance and security standards. I'm constantly
                  exploring new technologies and methodologies to enhance my development toolkit.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center order-1 md:order-2">
                <div className="relative w-64 h-64 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-green-500/30">
                  <Image src="/images/profile-photo.png" alt="Profile Photo" fill className="object-cover" />
                  <div className="absolute inset-0 border-4 border-green-500/10 rounded-full pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 border-t border-green-500/30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">02.</span> Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-green-500/30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">Languages</h3>
                <ul className="space-y-2">
                  {["JavaScript", "TypeScript", "Python", "Go", "Java"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-green-500/30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">Frameworks</h3>
                <ul className="space-y-2">
                  {["Node.js", "Express", "NestJS", "Django", "Spring Boot"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-green-500/30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">Databases</h3>
                <ul className="space-y-2">
                  {["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-green-500/30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">Cloud & DevOps</h3>
                <ul className="space-y-2">
                  {["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-green-500/30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">Tools</h3>
                <ul className="space-y-2">
                  {["Git", "Postman", "Swagger", "Jira", "VS Code"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-green-500/30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">Concepts</h3>
                <ul className="space-y-2">
                  {["RESTful APIs", "GraphQL", "Microservices", "Authentication", "Performance Optimization"].map(
                    (skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">$</span> {skill}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 border-t border-green-500/30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">03.</span> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "E-Commerce API",
                  description:
                    "A scalable RESTful API for e-commerce platforms with authentication, product management, and order processing.",
                  tech: ["Node.js", "Express", "MongoDB", "JWT"],
                  github: "#",
                },
                {
                  name: "Real-time Chat Service",
                  description:
                    "Microservice architecture for a real-time messaging platform with WebSocket integration and message persistence.",
                  tech: ["Go", "WebSockets", "Redis", "PostgreSQL"],
                  github: "#",
                },
                {
                  name: "Content Management System",
                  description:
                    "Headless CMS with a flexible content model, role-based access control, and comprehensive API.",
                  tech: ["Python", "Django", "PostgreSQL", "Docker"],
                  github: "#",
                },
                {
                  name: "Data Processing Pipeline",
                  description:
                    "Distributed system for processing and analyzing large datasets with fault tolerance and horizontal scaling.",
                  tech: ["Java", "Kafka", "Elasticsearch", "AWS"],
                  github: "#",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="border border-green-500/30 p-5 rounded-md bg-black/80 hover:border-green-400 transition-colors"
                >
                  <h3 className="text-white text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.github}
                    className="flex items-center gap-2 text-green-500 hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4" /> View on GitHub
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profiles Section */}
        <section id="profiles" className="py-16 border-t border-green-500/30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">04.</span> Profiles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "GitHub",
                  description: "Check out my code repositories and contributions",
                  icon: <Github className="h-6 w-6" />,
                  url: "#",
                },
                {
                  name: "LinkedIn",
                  description: "Connect with me professionally",
                  icon: <Linkedin className="h-6 w-6" />,
                  url: "#",
                },
                {
                  name: "Fiverr",
                  description: "Hire me for freelance backend development",
                  icon: <ExternalLink className="h-6 w-6" />,
                  url: "#",
                },
                {
                  name: "Resume",
                  description: "Download my resume in PDF format",
                  icon: <ArrowRight className="h-6 w-6" />,
                  url: "#",
                  isDownload: true,
                },
              ].map((profile, index) => (
                <Link
                  href={profile.url}
                  key={index}
                  download={profile.isDownload}
                  className="border border-green-500/30 p-5 rounded-md bg-black/80 hover:border-green-400 transition-colors flex flex-col items-center text-center"
                >
                  <div className="bg-green-500/10 p-4 rounded-full mb-4">{profile.icon}</div>
                  <h3 className="text-white text-lg font-semibold mb-2">{profile.name}</h3>
                  <p className="text-gray-300 text-sm">{profile.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 border-t border-green-500/30">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">05.</span> Contact Me
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="bg-black/80 border-green-500/30 text-white focus:border-green-400 focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-black/80 border-green-500/30 text-white focus:border-green-400 focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Project Inquiry"
                  className="bg-black/80 border-green-500/30 text-white focus:border-green-400 focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="I'd like to discuss a project..."
                  rows={6}
                  className="bg-black/80 border-green-500/30 text-white focus:border-green-400 focus:ring-0"
                />
              </div>
              <Button type="submit" className="bg-green-500 text-black hover:bg-green-400 flex items-center gap-2">
                Send Message <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-500/30 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            <span className="text-green-500">$</span> Designed and built by [Your Name]
          </p>
          <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
