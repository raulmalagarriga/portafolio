"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import type { KeyboardEvent } from "react"
import {
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image, { type StaticImageData } from "next/image"
import ExploreButton from "@/components/explore-button"
import ParticlesBackground from "@/components/particles-background"
import ThemeSelector from "@/components/theme-selector"
import LanguageSelector from "@/components/languaje-selector"
import { useLanguage } from "@/contexts/language-context"
import DecryptText from "@/components/decrypt-text"
import ScrollIndicator from "@/components/scroll-indicator"
import ContactForm from "@/components/contact-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
// Images and logos
import PULSE from "@/assets/PULSE.svg"
import SLIVE from "@/assets/SLIVE.svg"
import SentimentAnalyzer from "@/assets/sentiment.svg"
import Battleship from "@/assets/battleship.svg"
import SliveMenu from "@/assets/slive/sliveMenu.png"
import SliveChat from "@/assets/slive/sliveChat.png"
import SliveInterfaz from "@/assets/slive/SLIVE2.png"
import SentimentNeutral from "@/assets/sentiment/SentimentNeutral.png"
import SentimentHappy from "@/assets/sentiment/SentimentHappy.png"
import WaitingBattleship from "@/assets/battleship/Waiting.png"
import PlayingBattleship from "@/assets/battleship/Playing.png"
import LandingPulse1 from "@/assets/pulse/landing.png"
import LandingPulse2 from "@/assets/pulse/landing2.png"
import InterfazPulse from "@/assets/pulse/pulseinterfaz.png"


type ProjectDefinition = {
  key: string
  tech: string[]
  url?: string
  github?: string | null
  logo?: StaticImageData
  logoWidth?: number
  logoHeight?: number
  gallery: string[]
  summaryKey: string
}

type Project = ProjectDefinition & {
  name: string
  description: string
  summary: string
}

const projectDefinitions: ProjectDefinition[] = [
  {
    key: "projects.ecommerce",
    tech: [".NET", "Next JS", "MongoDB", "PostgreSQL"],
    url: "https://slive.ai/",
    github: "",
    logo: SLIVE,
    logoWidth: 25,
    logoHeight: 25,
    gallery: [SliveMenu.src, SliveChat.src, SliveInterfaz.src],
    summaryKey: "projects.ecommerce.desc",
  },
  {
    key: "projects.sentiment",
    tech: ["Python", "Next JS", "FastAPI"],
    github: "https://github.com/raulmalagarriga/sentimentAnalyzer",
    url: "https://happy-face-sentiment-analyzer.vercel.app/",
    logo: SentimentAnalyzer,
    logoWidth: 20,
    logoHeight: 20,
    gallery: [SentimentNeutral.src, SentimentHappy.src],
    summaryKey: "projects.sentiment.desc",
  },
  {
    key: "projects.chat",
    tech: ["NodeJS", "Javascript", "Express", "Socket.io"],
    github: "https://github.com/raulmalagarriga/Battleship_game",
    logo: Battleship,
    logoWidth: 20,
    logoHeight: 20,
    gallery: [PlayingBattleship.src, WaitingBattleship.src],
    summaryKey: "projects.chat.desc",
  },
  {
    key: "projects.pulse",
    tech: ["NodeJS", "Typescript", "MongoDB", "React native"],
    github: null,
    logo: PULSE,
    logoWidth: 15,
    logoHeight: 15,
    gallery: [LandingPulse1.src, LandingPulse2.src, InterfazPulse.src],
    summaryKey: "projects.pulse.desc",
  }
]

export default function Portfolio() {
  const { t, language } = useLanguage()
  const [activeSection, setActiveSection] = useState("hero")
  const [typedText, setTypedText] = useState("")
  const [currentTitle, setCurrentTitle] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  // Visibility states for each section
  const [aboutVisible, setAboutVisible] = useState(false)
  const [projectsVisible, setProjectsVisible] = useState(false)
  const [profilesVisible, setProfilesVisible] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  const staticText = "> Hello World. I am a "
  const titles = ["Backend Developer.", "Software Developer.", "Software Architect."]
  const typingRef = useRef<NodeJS.Timeout | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Sections for navigation
  const sections = ["hero", "about", "projects", "profiles", "contact"]

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

  const projects: Project[] = useMemo(
    () =>
      projectDefinitions.map((project) => {
        const titleKey = `${project.key}.title` as Parameters<typeof t>[0]
        const descriptionKey = `${project.key}.desc` as Parameters<typeof t>[0]
        const summary = t(project.summaryKey as Parameters<typeof t>[0])

        return {
          ...project,
          name: t(titleKey),
          description: t(descriptionKey),
          summary,
        }
      }),
    [language, t],
  )

  const handleProjectOpen = (project: Project) => {
    setSelectedProject(project)
    setProjectModalOpen(true)
  }

  const handleProjectCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, project: Project) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleProjectOpen(project)
    }
  }

  const isProjectModalVisible = projectModalOpen && !!selectedProject

  useEffect(() => {
    setGalleryIndex(0)
  }, [selectedProject?.key])

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
                {["about", "projects", "profiles", "contact"].map((section) => (
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
              {["home", "about", "projects", "profiles", "contact"].map((section) => (
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
                <ExploreButton onClick={() => scrollToSection("about")}>
                  {t("hero.explore")} <ArrowRight className="h-4 w-4" />
                </ExploreButton>
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
                <div className="relative w-80 h-80 md:w-64 md:h-64 overflow-hidden border-6 border-black">
                  <Image src="/images/profile-photo.png" alt="Profile Photo" fill className="object-cover" />
                </div>
              </div>
            </div>
            {/* Skills */}
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 section-title">
                <span className="text-white">{">"}</span>{" "}
                {aboutVisible ? (
                  <DecryptText
                    text={t("skills.title")}
                    duration={1200}
                    isVisible={true}
                    animationColor="text-theme-light"
                  />
                ) : (
                  t("skills.title")
                )}
              </h3>
              <div className="section-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {skillCategories.map((category, index) => (
                  <div
                    key={index}
                    className={`border border-theme-30 p-3 rounded-md bg-black/80 opacity-0 hover-holographic-effect ${
                      aboutVisible ? "animate-fade-in-up" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "forwards",
                      height: "100%",
                    }}
                  >
                    <h4 className="text-white text-base sm:text-lg font-semibold mb-2">{category.title}</h4>
                    <ul className="space-y-1 text-sm">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2">
                          <span className="text-theme">$</span>{" "}
                          {aboutVisible ? (
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
              {projects.map((project, index) => (
                <div
                  key={project.key}
                  role="button"
                  tabIndex={0}
                  aria-label={`${project.name} ${t("projects.modal.openDetails")}`}
                  onClick={() => handleProjectOpen(project)}
                  onKeyDown={(event) => handleProjectCardKeyDown(event, project)}
                  className={`border border-theme-30 p-3 sm:p-4 rounded-md bg-black/80 transition-colors opacity-0 hover-holographic-effect cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme ${
                    projectsVisible ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: "forwards",
                    height: "100%",
                  }}
                >
                  <h3 className="text-white text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
                    {project.logo && (
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={project.logoWidth ?? 24}
                        height={project.logoHeight ?? 24}
                        className="inline-block"
                      />
                    )}
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
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs bg-theme-20 text-theme-light px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {project.github ? (
                      <Link
                        target="_blank"
                        href={project.github}
                        onClick={(event) => event.stopPropagation()}
                        className="flex items-center gap-2 text-theme hover:text-theme-light transition-colors"
                      >
                        <Github className="h-4 w-4" /> {t("projects.view")}
                      </Link>
                    ) : project.github === null ? (
                      <span className="text-xs text-gray-400">{t("projects.comming")}</span>
                    ) : null}
                    {project.url && (
                      <Link
                        target="_blank"
                        href={project.url}
                        onClick={(event) => event.stopPropagation()}
                        className="flex items-center gap-2 text-theme hover:text-theme-light transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" /> {t("projects.visit")}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Dialog
              open={projectModalOpen}
              onOpenChange={(open) => {
                setProjectModalOpen(open)
                if (!open) {
                  setSelectedProject(null)
                }
              }}
            >
              <DialogContent
                className="w-full max-w-[92vw] sm:max-w-2xl border border-theme-30 bg-black/95 text-gray-200 font-mono rounded-lg sm:rounded-xl p-4 sm:p-6 max-h-[85vh] overflow-hidden"
              >
                {selectedProject && (
                  <div className="flex h-full flex-col gap-4">
                    <DialogHeader className="space-y-2 text-center sm:text-left">
                      <DialogTitle className="flex flex-col items-center gap-3 text-center text-white sm:flex-row sm:items-center sm:gap-3 sm:text-left">
                        {selectedProject.logo && (
                          <Image
                            src={selectedProject.logo}
                            alt={`${selectedProject.name} logo`}
                            width={selectedProject.logoWidth ?? 24}
                            height={selectedProject.logoHeight ?? 24}
                          />
                        )}
                        <DecryptText
                          text={selectedProject.name}
                          duration={900}
                          isVisible={isProjectModalVisible}
                          className="text-lg sm:text-xl font-semibold"
                          animationColor="text-theme-light"
                        />
                      </DialogTitle>
                      <DialogDescription asChild className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        <DecryptText
                          text={selectedProject.summary}
                          duration={1100}
                          isVisible={isProjectModalVisible}
                          className="block"
                          animationColor="text-theme-light"
                        />
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                      {selectedProject.gallery.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-wide text-theme-light">
                            <DecryptText
                              text={t("projects.modal.gallery")}
                              duration={800}
                              isVisible={isProjectModalVisible}
                              className="uppercase tracking-wide text-theme-light text-xs"
                              animationColor="text-theme-light"
                            />
                          </h4>
                          <div className="mt-3">
                            <div className="relative overflow-hidden rounded-md border border-theme-30 bg-black/70">
                              <div className="relative aspect-[16/9] w-full sm:aspect-[21/10]">
                                {selectedProject.gallery.map((imageSrc, index) => (
                                  <Image
                                    key={`${selectedProject.key}-image-${index}`}
                                    src={imageSrc}
                                    alt={`${selectedProject.name} screenshot ${index + 1}`}
                                    fill
                                    className={`object-cover transition-opacity duration-500 ${
                                      index === galleryIndex ? "opacity-100" : "opacity-0"
                                    }`}
                                    sizes="(min-width: 640px) 512px, 90vw"
                                    priority={index === galleryIndex}
                                  />
                                ))}
                              </div>
                              {selectedProject.gallery.length > 1 && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setGalleryIndex((prev) =>
                                        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
                                      )
                                    }
                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-theme-30 bg-black/70 p-1 text-theme transition-colors hover:border-theme-light hover:text-theme-light"
                                    aria-label={t("projects.modal.previousImage")}
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setGalleryIndex((prev) =>
                                        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
                                      )
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-theme-30 bg-black/70 p-1 text-theme transition-colors hover:border-theme-light hover:text-theme-light"
                                    aria-label={t("projects.modal.nextImage")}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                  <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
                                    {selectedProject.gallery.map((_, index) => (
                                      <button
                                        key={`${selectedProject.key}-dot-${index}`}
                                        type="button"
                                        onClick={() => setGalleryIndex(index)}
                                        className={`h-2 w-2 rounded-full border border-theme-40 transition-colors ${
                                          index === galleryIndex ? "bg-theme-30" : "bg-transparent"
                                        }`}
                                        aria-label={`${t("projects.modal.goToImage")} ${index + 1}`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <DialogFooter className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                      <DialogClose asChild>
                        <button className="w-full sm:w-auto border border-theme-30 px-4 py-2 rounded-md text-theme hover:text-theme-light hover:border-theme-light transition-colors">
                          {t("projects.modal.close")}
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>
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
                    className={`border border-theme-30 p-3 sm:p-4 rounded-md bg-black/80 transition-colors flex flex-col items-center text-center opacity-0 hover-holographic-effect ${
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
