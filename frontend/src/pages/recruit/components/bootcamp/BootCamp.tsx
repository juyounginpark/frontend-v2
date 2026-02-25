import { motion } from 'framer-motion'

import { DescriptionCard } from '@/components/feature'

import { BootcampAccordionCard } from './accordion-card'
import { BootcampScheduleTable } from './schedule-table'

/**
 * Bootcamp — Rocky Planet with visible lava cracks & craters that spin.
 */
export const RecruitBootCamp = () => {
  return (
    <div className="relative flex flex-col items-center py-32 lg:py-48">
      {/* Heat haze glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-[600px] w-[600px] rounded-full bg-orange-600/15 blur-[120px] animate-pulse-4s sm:h-[800px] sm:w-[800px]"
        />
      </div>

      {/* Planet container — floats */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-14s">
        {/* Planet body with surface features — spins */}
        <div
          className="relative h-[400px] w-[400px] overflow-hidden rounded-full animate-spin-slow-80s sm:h-[550px] sm:w-[550px]"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, #fb923c 0%, #ea580c 20%, #9a3412 45%, #7c2d12 65%, #431407 100%)',
            boxShadow:
              '0 0 100px 30px rgba(234,88,12,0.25), inset -60px -30px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Lava cracks — visible spinning features */}
          <div className="absolute top-[30%] left-[20%] h-2 w-40 rotate-[25deg] rounded-full bg-orange-400/50 blur-[1px] sm:w-56" />
          <div className="absolute top-[45%] left-[35%] h-1.5 w-32 rotate-[-20deg] rounded-full bg-red-400/40 blur-[1px] sm:w-44" />
          <div className="absolute top-[60%] left-[15%] h-1 w-24 rotate-[40deg] rounded-full bg-yellow-500/35 blur-[1px] sm:w-36" />
          <div className="absolute top-[38%] left-[50%] h-1.5 w-20 rotate-[60deg] rounded-full bg-orange-300/40 sm:w-28" />
          {/* Craters */}
          <div className="absolute top-[25%] left-[55%] h-10 w-10 rounded-full bg-red-900/40 sm:h-14 sm:w-14" />
          <div className="absolute top-[55%] left-[65%] h-7 w-7 rounded-full bg-orange-900/35 sm:h-10 sm:w-10" />
          <div className="absolute top-[70%] left-[30%] h-5 w-5 rounded-full bg-red-800/30 sm:h-8 sm:w-8" />
          {/* Hot spots */}
          <div className="absolute top-[35%] left-[40%] h-6 w-8 rounded-full bg-yellow-400/30 blur-[2px]" />
          <div className="absolute top-[50%] left-[55%] h-4 w-6 rounded-full bg-orange-300/25 blur-[1px]" />
        </div>
      </div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-12 text-center"
      >
        <h2
          className="text-4xl font-black lg:text-6xl"
          style={{
            background: 'linear-gradient(90deg, #fdba74, #f97316, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.5))',
          }}
        >
          부트캠프
        </h2>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 flex w-full max-w-[1600px] flex-col items-center gap-10 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl xl:max-w-[1300px]"
        >
          <DescriptionCard
            title="부트캠프란?"
            description="해달 준회원의 필수 참여 코스로 매주 2회, 총 8차시로 진행됩니다."
            className="border-orange-500/20 bg-orange-950/30 text-slate-200 shadow-[0_0_40px_rgba(234,88,12,0.15)]"
          />
        </motion.div>

        <div className="flex w-full flex-col items-center gap-10 xl:flex-row xl:items-start xl:justify-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full xl:w-auto flex justify-center"
          >
            <BootcampAccordionCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-3xl xl:w-auto flex justify-center"
          >
            <div className="w-full rounded-2xl border border-orange-500/20 bg-black/50 p-4 shadow-[0_0_50px_rgba(234,88,12,0.2)] backdrop-blur-xl">
              <BootcampScheduleTable />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
