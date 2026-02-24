import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'

import { haedalLaptop } from '@/assets/images'
import { Footer, Header } from '@/components/feature'

import {
  RecruitBootCamp,
  RecruitEvent,
  RecruitHero,
  RecruitLinkButton,
  RecruitProcess,
  RecruitTrack,
} from './components'

/* ─── Twinkling Star Background (pure CSS — GPU accelerated) ─── */
const StarField = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5,
        delay: `${(Math.random() * 8).toFixed(1)}s`,
        dur: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.05; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.5)`,
            animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Main Page ─── */
export default function RecruitPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Background: Sun (warm) → Deep Space → Moon (cool slate)
  const bg = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [
    '#3d1200', '#150800', '#030308', '#1e293b',
  ])

  // Calculate scroll positions for the 5 stops (Sun, Gas Giant, BootCamp, Track, Moon)
  // 0.0 ~ 0.1   = Sun (Top)
  // 0.25 ~ 0.35 = Event Planet (Middle)
  // 0.50 ~ 0.60 = BootCamp Planet (Middle)
  // 0.75 ~ 0.85 = Track Planet (Middle)
  // 0.95 ~ 1.0  = Moon (Bottom)

  // Floating trajectory to "land" precisely on each section's surface
  const astroY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 0.95, 1],
    // BootCamp (0.5-0.6): moved to 18vh
    // Moon (0.95-1): Positioned in the exact spot next to the text as drawn by the user
    ['12vh', '15vh', '52vh', '52vh', '18vh', '18vh', '22vh', '22vh', '35vh', '-20vh'],
  )
  const astroX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 0.95, 1],
    // BootCamp (0.5-0.6): moved to 85vw
    // Moon (0.95-1): Shifted left slightly to align with the circle drawn by the user
    ['40vw', '45vw', '78vw', '78vw', '85vw', '85vw', '88vw', '88vw', '72vw', '72vw'],
  )
  const astroRotate = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 0.95, 1],
    [0, -5, -15, -5, 15, 5, -15, -5, 5, 0],
  )
  const astroScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.35, 0.5, 0.6, 0.75, 0.85, 0.95, 1],
    [0.9, 0.8, 1.0, 1.1, 1.0, 1.1, 1.0, 1.1, 0.9, 0.8],
  )
  // Z-index stays high so Haedal is always ON TOP of the planets
  const astroZ = useTransform(
    scrollYProgress,
    [0, 1],
    [50, 50],
  )

  // Dust effect opacity — peaks during the "landing" plateau phases
  const dustOpacity = useTransform(
    scrollYProgress,
    [
      0,
      0.22, 0.25, 0.35, 0.38,
      0.47, 0.5, 0.6, 0.63,
      0.72, 0.75, 0.85, 0.88,
      0.92, 0.95, 1,
    ],
    [
      0, // Sun
      0, 1, 1, 0, // Event Planet
      0, 1, 1, 0, // BootCamp Planet
      0, 1, 1, 0, // Track Planet
      0, 1, 1, // Moon
    ]
  )

  // Special yellow glow when finally landed on the Moon
  const moonGlowOpacity = useTransform(scrollYProgress, [0.92, 0.95], [0, 1])

  return (
    <motion.main
      ref={ref}
      style={{ backgroundColor: bg }}
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-namum-square text-white"
    >
      <Header />
      <StarField />

      {/* ─── Haedal Astronaut (scroll-synced) ─── */}
      <motion.div
        className="pointer-events-none fixed"
        style={{
          top: astroY,
          left: astroX,
          rotate: astroRotate,
          scale: astroScale,
          zIndex: astroZ,
        }}
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Landing Dust / Glow Effect */}
          <motion.div
            className="absolute inset-[-40px] rounded-[50%] bg-white/20 blur-[20px]"
            style={{ opacity: dustOpacity }}
          />
          {/* Final Moon Bright Yellow Aura */}
          <motion.div
            className="absolute inset-[-60px] rounded-full bg-yellow-400/40 blur-[30px]"
            style={{ opacity: moonGlowOpacity }}
          />
          {/* Subtle blue aura */}
          <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-2xl" />
          <img
            src={haedalLaptop}
            alt="Travelling Haedal"
            className="relative h-16 w-16 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)] sm:h-24 sm:w-24 md:h-32 md:w-32"
          />
        </motion.div>
      </motion.div>

      {/* ─── Content Sections: 해 → 달 ─── */}
      <div className="relative z-10 flex w-full flex-1 flex-col pt-16">

        {/* ═══ THE SUN — Process (start: 해) ═══ */}
        <RecruitProcess />
        <div className="flex justify-center my-8">
          <RecruitLinkButton />
        </div>

        {/* ═══ PLANET 1 — Event ═══ */}
        <motion.section
          className="overflow-visible"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <RecruitEvent />
        </motion.section>

        {/* ═══ PLANET 2 — Boot Camp ═══ */}
        <motion.section
          className="overflow-visible"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <RecruitBootCamp />
        </motion.section>

        {/* ═══ PLANET 3 — Track ═══ */}
        <motion.section
          className="overflow-visible"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <RecruitTrack />
        </motion.section>

        {/* ═══ MOON — Hero (end: 달) ═══ */}
        <motion.section
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <RecruitHero />
        </motion.section>

        <div className="flex justify-center mt-16 mb-8">
          <RecruitLinkButton />
        </div>
        <div className="py-16" />
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </motion.main>
  )
}
