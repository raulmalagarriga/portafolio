"use client"

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
import DecryptText from "@/components/decrypt-text"
import ScrollIndicator from "@/components/scroll-indicator"
import ContactForm from "@/components/contact-form"

export default function Portfolio() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("hero")
  const [typedText, setTypedText] = useState("")
  const [currentTitle, setCurrentTitle] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // Visibility states for each section
  const [aboutVisible, setAboutVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const [projectsVisible, setProjectsVisible] = useState(false)
  const [profilesVisible, setProfilesVisible] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  const staticText = "> Hello World. I am a "
  const titles = ["Backend Developer.", "Software Developer.", "Software Architect."]
  const typingRef = useRef<NodeJS.Timeout>()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Sections for navigation
  const sections = ["hero", "about", "skills", "projects", "profiles", "contact"]

  // Call Sentiment Analyzer API on page load
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL ?? 'https://sentimentanalyzer-y8tk.onrender.com';
  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => console.log("Sentiment analyzer response:", data))
      .catch((err) => console.error("Sentiment analyzer fetch error:", err))
  }, [])

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      const currentIndex = sections.indexOf(activeSection)

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1)
        scrollToSection(sections[nextIndex])
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        const prevIndex = Math.max(currentIndex - 1, 0)
        scrollToSection(sections[prevIndex])
      } else if (e.key === "Home") {
        e.preventDefault()
        scrollToSection(sections[0])
      } else if (e.key === "End") {
        e.preventDefault()
        scrollToSection(sections[sections.length - 1])
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [sections, activeSection, isScrolling])

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(sectionId)

            // Set visibility state based on which section is visible
            switch (sectionId) {
              case "about":
                setAboutVisible(true)
                break
              case "skills":
                setSkillsVisible(true)
                break
              case "projects":
                setProjectsVisible(true)
                break
              case "profiles":
                setProfilesVisible(true)
                break
              case "contact":
                setContactVisible(true)
                break
            }
          } else if (!entry.isIntersecting) {
            // Reset visibility state when section is no longer visible
            switch (sectionId) {
              case "about":
                setAboutVisible(false)
                break
              case "skills":
                setSkillsVisible(false)
                break
              case "projects":
                setProjectsVisible(false)
                break
              case "profiles":
                setProfilesVisible(false)
                break
              case "contact":
                setContactVisible(false)
                break
            }
          }
        })
      },
      { threshold: [0.1, 0.5] }, // Track both entering and exiting viewport
    )

    const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    sectionElements.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sectionElements.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [sections])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // Close mobile menu after selection

      // Update active section immediately for better UX
      setActiveSection(sectionId)

      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  // Skill categories with their items
  const skillCategories = [
    {
      title: t("skills.languages"),
      items: ["C#", "JavaScript", "TypeScript", "Python"],
    },
    {
      title: t("skills.frameworks"),
      items: [".NET", "Entity Framework", "Node.js", "Express", "FastAPI"],
    },
    {
      title: t("skills.databases"),
      items: ["PostgreSQL", "SQL Server", "MongoDB", "Redis"],
    },
    {
      title: t("skills.cloud"),
      items: ["Ubuntu Server", "Docker", "Windows Server", "CI/CD"],
    },
    {
      title: t("skills.tools"),
      items: ["Git", "Postman", "Swagger", "Jira"],
    },
    {
      title: t("skills.concepts"),
      items: ["RESTful APIs", "JWT", "Microservices", "Authentication"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-theme font-mono relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator sections={sections} activeSection={activeSection} onDotClick={scrollToSection} />

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-theme-30 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-lg sm:text-xl font-bold">
              {/* <span className="text-white">dev</span> */}
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
              <nav className="hidden md:flex space-x-4 lg:space-x-6">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="h-[60px] sm:h-[80px] md:h-[100px] mb-4 sm:mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  {typedText}
                  <span className="animate-pulse">_</span>
                </h1>
              </div>
              <div className="animate-fade-in">
                <p className="text-base sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8">{t("hero.intro")}</p>
                <Button
                  onClick={() => scrollToSection("about")}
                  className="bg-theme text-black hover:bg-theme-light flex items-center gap-2"
                >
                  {t("hero.explore")} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t border-theme-30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 section-title">
              <span className="text-white">{">"}</span>{" "}
              {aboutVisible ? (
                <DecryptText
                  text={t("about.title")}
                  duration={1200}
                  isVisible={true}
                  animationColor="text-theme-light"
                />
              ) : (
                t("about.title")
              )}
            </h2>
            <div className="section-content flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <div className="space-y-3 text-gray-300 md:w-2/3 order-2 md:order-1">
                <div
                  className={`${aboutVisible ? "animate-fade-in-up" : "opacity-0"} min-h-[60px]`}
                  style={{
                    animationDelay: "200ms",
                    animationFillMode: "forwards",
                  }}
                >
                  {aboutVisible ? (
                    <DecryptText
                      text={t("about.p1")}
                      startDelay={300}
                      duration={1800}
                      isVisible={true}
                      className="text-gray-300 text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base">{t("about.p1")}</p>
                  )}
                </div>
                <div
                  className={`${aboutVisible ? "animate-fade-in-up" : "opacity-0"} min-h-[60px]`}
                  style={{
                    animationDelay: "400ms",
                    animationFillMode: "forwards",
                  }}
                >
                  {aboutVisible ? (
                    <DecryptText
                      text={t("about.p2")}
                      startDelay={600}
                      duration={1800}
                      isVisible={true}
                      className="text-gray-300 text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base">{t("about.p2")}</p>
                  )}
                </div>
              </div>
              <div className="md:w-1/3 hidden md:flex justify-center order-1 md:order-2">
                <div className="relative w-64 h-64 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-theme-30">
                  <Image src="/images/profile-photo.png" alt="Profile Photo" fill className="object-cover" />
                  <div className="absolute inset-0 border-4 border-theme-10 rounded-full pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="border-t border-theme-30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 section-title">
              <span className="text-white">{">"}</span>{" "}
              {skillsVisible ? (
                <DecryptText
                  text={t("skills.title")}
                  duration={1200}
                  isVisible={true}
                  animationColor="text-theme-light"
                />
              ) : (
                t("skills.title")
              )}
            </h2>
            <div className="section-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className={`border border-theme-30 p-3 rounded-md bg-black/80 opacity-0 hover-gradient-effect ${
                    skillsVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "forwards",
                    height: "100%",
                  }}
                >
                  <h3 className="text-white text-base sm:text-lg font-semibold mb-2">{category.title}</h3>
                  <ul className="space-y-1 text-sm">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <span className="text-theme">$</span>{" "}
                        {skillsVisible ? (
                          <DecryptText
                            text={item}
                            startDelay={itemIndex * 150 + 300}
                            duration={1500}
                            isVisible={true}
                          />
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="border-t border-theme-30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 section-title">
              <span className="text-white">{">"}</span>{" "}
              {projectsVisible ? (
                <DecryptText
                  text={t("projects.title")}
                  duration={1200}
                  isVisible={true}
                  animationColor="text-theme-light"
                />
              ) : (
                t("projects.title")
              )}
            </h2>
            <div className="section-content grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  name: t("projects.ecommerce.title"),
                  description: t("projects.ecommerce.desc"),
                  tech: [".NET", "Next JS", "MongoDB", "PostgreSQL"],
                  github: null,
                },
                {
                  name: t("projects.sentiment.title"),
                  description: t("projects.sentiment.desc"),
                  tech: ["Python", "Next JS", "FastAPI"],
                  github: "https://github.com/raulmalagarriga/sentimentAnalyzer",
                  url: "https://happy-face-sentiment-analyzer.vercel.app/"
                },
                {
                  name: t("projects.chat.title"),
                  description: t("projects.chat.desc"),
                  tech: ["NodeJS", "Javascript", "Express", "Socket.io"],
                  github: "https://github.com/raulmalagarriga/Battleship_game",
                },
                {
                  name: t("projects.pulse.title"),
                  description: t("projects.pulse.desc"),
                  tech: ["NodeJS", "Typescript", "MongoDB", "React native"],
                  github: null,
                },
                {
                  name: t("projects.data.title"),
                  description: t("projects.data.desc"),
                  tech: ["NodeJS", "Javascript", "Express", "MongoDB"],
                  github: "https://github.com/raulmalagarriga/calendarApp-backend",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className={`border border-theme-30 p-3 sm:p-4 rounded-md bg-black/80 transition-colors opacity-0 hover-gradient-effect ${
                    projectsVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: "forwards",
                    height: "100%",
                  }}
                >
                  <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
                    {projectsVisible ? (
                      <DecryptText
                        text={project.name}
                        startDelay={index * 100}
                        duration={1200}
                        isVisible={true}
                        className="text-white"
                        animationColor="text-theme-light"
                      />
                    ) : (
                      project.name
                    )}
                  </h3>
                  <div className="min-h-[60px] mb-3">
                    {projectsVisible ? (
                      <DecryptText
                        text={project.description}
                        startDelay={index * 100 + 300}
                        duration={1800}
                        isVisible={true}
                        className="text-gray-300 text-xs sm:text-sm"
                      />
                    ) : (
                      <p className="text-gray-300 text-xs sm:text-sm">{project.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-theme-20 text-theme-light px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    {
                      project.github ? 
                      (
                        <Link
                          target="_blank"
                          href={project.github}
                          className="flex items-center gap-2 text-theme hover:text-theme-light transition-colors text-sm"
                          >
                        <Github className="h-4 w-4" /> {t("projects.view")}
                      </Link>
                      ) 
                      : 
                      (
                        <p>{t("projects.comming")}</p>   
                      ) 
                    }
                    {
                      project.url ?
                      (
                        <Link target="_blank"
                          href={project.url}
                          className="flex items-center gap-2 text-theme hover:text-theme-light transition-colors text-sm"
                        >
                          | {t("projects.visit")}
                        </Link>
                      ) 
                      :
                      (<></>)
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profiles Section */}
        <section id="profiles" className="border-t border-theme-30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 section-title">
              <span className="text-white">{">"}</span>{" "}
              {profilesVisible ? (
                <DecryptText
                  text={t("profiles.title")}
                  duration={1200}
                  isVisible={true}
                  animationColor="text-theme-light"
                />
              ) : (
                t("profiles.title")
              )}
            </h2>
            <div className="section-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  name: t("profiles.github"),
                  description: t("profiles.github.desc"),
                  icon: <Github className="h-5 w-5 sm:h-6 sm:w-6" />,
                  url: "https://github.com/raulmalagarriga",
                },
                {
                  name: t("profiles.linkedin"),
                  description: t("profiles.linkedin.desc"),
                  icon: <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />,
                  url: "https://www.linkedin.com/in/rjmalagarrigat/",
                },
                {
                  name: t("profiles.blog"),
                  description: t("profiles.blog.desc"),
                  icon: <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />,
                  url: "https://medium.com/@rjmalagarrigat",
                },
                {
                  name: t("profiles.resume"),
                  description: t("profiles.resume.desc"),
                  icon: <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />,
                  url: "/Resume-RaulJMalagarriga.pdf",
                  isDownload: "Resume-RaulJMalagarriga",
                },
              ].map((profile, index) => (
                <Link
                  href={profile.url}
                  key={index}
                  target="_blank"
                  download={profile.isDownload}
                  className={`border border-theme-30 p-3 sm:p-4 rounded-md bg-black/80 transition-colors flex flex-col items-center text-center opacity-0 hover-gradient-effect ${
                    profilesVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: "forwards",
                    height: "100%",
                  }}
                >
                  <div className="bg-theme-10 p-3 rounded-full mb-3">{profile.icon}</div>
                  <h3 className="text-white text-base sm:text-lg font-semibold mb-2">
                    {profilesVisible ? (
                      <DecryptText
                        text={profile.name}
                        startDelay={index * 100}
                        duration={1000}
                        isVisible={true}
                        className="text-white"
                        animationColor="text-theme-light"
                      />
                    ) : (
                      profile.name
                    )}
                  </h3>
                  <div className="min-h-[40px] sm:min-h-[50px]">
                    {profilesVisible ? (
                      <DecryptText
                        text={profile.description}
                        startDelay={index * 100 + 200}
                        duration={1500}
                        isVisible={true}
                        className="text-gray-300 text-xs sm:text-sm"
                      />
                    ) : (
                      <p className="text-gray-300 text-xs sm:text-sm">{profile.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t border-theme-30">
          <ContactForm contactVisible={true} />
        </section>

        {/* Footer */}
        <footer className="border-t border-theme-30 py-2 mt-4 relative">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              <span className="text-theme">$</span> {t("footer.designed")} [Raul Malagarriga]
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © {new Date().getFullYear()} {t("footer.rights")}
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
