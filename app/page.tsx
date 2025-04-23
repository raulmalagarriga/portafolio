"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Github, Linkedin, ExternalLink, Send, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ParticlesBackground from "@/components/particles-background"
import ThemeSelector from "@/components/theme-selector"
import LanguageSelector from "@/components/languaje-selector"
import { useLanguage } from "@/contexts/language-context"

export default function Portfolio() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("")
  const [typedText, setTypedText] = useState("")
  const [currentTitle, setCurrentTitle] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const staticText = t("hero.title");
  const titles = [t("hero.title.backend"), t("hero.title.software"), t("hero.title.architec")]
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
    <div className="min-h-screen bg-black text-theme font-mono relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-theme-30 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            <span className="text-theme">raulmalagarriga</span>
            <span className="text-white">.dev</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme and Language Selectors */}
            <div className="hidden sm:flex items-center gap-3 mr-4">
              <ThemeSelector />
              <LanguageSelector />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              {["about", "skills", "projects", "profiles", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-white transition-colors ${
                    activeSection === section ? "text-white" : ""
                  }`}
                >
                  {t(section)}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-theme-30 text-theme hover:bg-theme-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            ref={mobileMenuRef}
            className={`absolute top-full right-0 w-64 bg-black border border-theme-30 rounded-md shadow-lg py-2 px-1 md:hidden transition-all duration-200 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            {/* Mobile Theme and Language Selectors */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-theme-30 mb-2">
              <ThemeSelector />
              <LanguageSelector />
            </div>

            {/* Mobile Navigation */}
            {["home", "about", "skills", "projects", "profiles", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section === "home" ? "hero" : section)}
                className="block w-full text-left px-4 py-2 capitalize hover:bg-theme-10 hover:text-white transition-colors rounded"
              >
                <span className="text-theme mr-2">$</span>
                {t(section)}
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
              <p className="text-lg sm:text-xl text-gray-400 mb-8">{t("hero.intro")}</p>
              <Button
                onClick={() => scrollToSection("about")}
                className="bg-theme text-black hover:bg-theme-light flex items-center gap-2"
              >
                {t("hero.explore")} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 border-t border-theme-30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">01.</span> {t("about.title")}
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="space-y-4 text-gray-300 md:w-2/3 order-2 md:order-1">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
              </div>
              <div className="md:w-1/3 flex justify-center order-1 md:order-2">
                <div className="relative w-64 h-64 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-theme-30">
                  <Image src="/images/profile-photo.png" alt="Profile Photo" fill className="object-cover" />
                  <div className="absolute inset-0 border-4 border-theme-10 rounded-full pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 border-t border-theme-30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">02.</span> {t("skills.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-theme-30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">{t("skills.languages")}</h3>
                <ul className="space-y-2">
                  {["C#", "TypeScript", "Javascript"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-theme">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-theme-30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">{t("skills.frameworks")}</h3>
                <ul className="space-y-2">
                  {[".NET", "Entity Framework", "Node.js", "Express", "Socket.io", "React", "React Native", "Next.js"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-theme">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-theme-30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">{t("skills.databases")}</h3>
                <ul className="space-y-2">
                  {["PostgreSQL", "SQL Server", "MongoDB", "Redis"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-theme">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-theme-30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">{t("skills.cloud")}</h3>
                <ul className="space-y-2">
                  {["Ubuntu Server", "Docker", "Windows Server", "CI/CD"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-theme">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-theme-30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">{t("skills.tools")}</h3>
                <ul className="space-y-2">
                  {["Git", "Postman", "Swagger", "Jira", "VS Code"].map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-theme">$</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-theme-30 p-4 rounded-md bg-black/80">
                <h3 className="text-white text-lg font-semibold mb-3">{t("skills.concepts")}</h3>
                <ul className="space-y-2">
                  {["RESTful APIs", "Microservices", "Authentication", "Performance Optimization"].map(
                    (skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-theme">$</span> {skill}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 border-t border-theme-30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">03.</span> {t("projects.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: t("projects.ecommerce.title"),
                  description: t("projects.ecommerce.desc"),
                  tech: ["Node.js", "Express", "MongoDB", "JWT"],
                  github: "#",
                },
                {
                  name: t("projects.chat.title"),
                  description: t("projects.chat.desc"),
                  tech: ["Node.js", "Express", "Javascript", "Socket.io"],
                  github: "https://github.com/raulmalagarriga/Battleship_game",
                },
                {
                  name: t("projects.pulse.title"),
                  description: t("projects.pulse.desc"),
                  tech: ["Node.js", "Express", "React Native", "MongoDB"],
                  github: null,
                },
                {
                  name: t("projects.data.title"),
                  description: t("projects.data.desc"),
                  tech: ["Java", "Kafka", "Elasticsearch", "AWS"],
                  github: "#",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="border border-theme-30 p-5 rounded-md bg-black/80 hover:border-theme-light transition-colors"
                >
                  <h3 className="text-white text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-theme-20 text-theme-light px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.github ? (
                    <Link
                      href={project.github}
                      className="flex items-center gap-2 text-theme hover:text-theme-light transition-colors"
                    >
                      <Github className="h-4 w-4" /> {t("projects.view")}
                    </Link>
                  ) : 
                  (
                    <p className="text-theme">{t("projects.comming")}</p>
                  )
                  }
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profiles Section */}
        <section id="profiles" className="py-16 border-t border-theme-30">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">04.</span> {t("profiles.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: t("profiles.github"),
                  description: t("profiles.github.desc"),
                  icon: <Github className="h-6 w-6" />,
                  url: "#",
                },
                {
                  name: t("profiles.linkedin"),
                  description: t("profiles.linkedin.desc"),
                  icon: <Linkedin className="h-6 w-6" />,
                  url: "#",
                },
                {
                  name: t("profiles.blog"),
                  description: t("profiles.blog.desc"),
                  icon: <ExternalLink className="h-6 w-6" />,
                  url: "#",
                },
                {
                  name: t("profiles.resume"),
                  description: t("profiles.resume.desc"),
                  icon: <ArrowRight className="h-6 w-6" />,
                  url: "#",
                  isDownload: true,
                },
              ].map((profile, index) => (
                <Link
                  href={profile.url}
                  key={index}
                  download={profile.isDownload}
                  className="border border-theme-30 p-5 rounded-md bg-black/80 hover:border-theme-light transition-colors flex flex-col items-center text-center"
                >
                  <div className="bg-theme-10 p-4 rounded-full mb-4">{profile.icon}</div>
                  <h3 className="text-white text-lg font-semibold mb-2">{profile.name}</h3>
                  <p className="text-gray-300 text-sm">{profile.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 border-t border-theme-30">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-white">05.</span> {t("contact.title")}
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    {t("contact.name")}
                  </label>
                  <Input
                    id="name"
                    placeholder={t("contact.placeholder.name")}
                    className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    {t("contact.email")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contact.placeholder.email")}
                    className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2">
                  {t("contact.subject")}
                </label>
                <Input
                  id="subject"
                  placeholder={t("contact.placeholder.subject")}
                  className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  {t("contact.message")}
                </label>
                <Textarea
                  id="message"
                  placeholder={t("contact.placeholder.message")}
                  rows={6}
                  className="bg-black/80 border-theme-30 text-white focus:border-theme-light focus:ring-0"
                />
              </div>
              <Button type="submit" className="bg-theme text-black hover:bg-theme-light flex items-center gap-2">
                {t("contact.send")} <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-theme-30 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            <span className="text-theme">$</span> {t("footer.designed")} [Raul Malagarriga]
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  )
}
