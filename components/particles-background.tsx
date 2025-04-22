"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-tsparticles"
import type { Container, Engine } from "tsparticles-engine"
import { loadFull } from "tsparticles"
import { useThemeColor } from "@/contexts/theme-context"

export default function ParticlesBackground() {
  const { themeColor } = useThemeColor()
  const [particleColor, setParticleColor] = useState("#10b981") // Default green

  useEffect(() => {
    // Update particle color based on theme
    switch (themeColor) {
      case "green":
        setParticleColor("#10b981")
        break
      case "blue":
        setParticleColor("#3b82f6")
        break
      case "yellow":
        setParticleColor("#f59e0b")
        break
      case "white":
        setParticleColor("#e5e7eb")
        break
      default:
        setParticleColor("#10b981")
    }
  }, [themeColor])

  const particlesInit = useCallback(async (engine: Engine) => {
    // This loads the full tsparticles package with all the features
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container)
  }, [])

  return (
    <Particles
      className="fixed inset-0 -z-10"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
          zIndex: -1,
        },
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
              // distance: 100,
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 70,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
