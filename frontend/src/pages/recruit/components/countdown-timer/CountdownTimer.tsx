import { useEffect, useMemo, useState } from 'react'

import { getDateDistance } from '@toss/date'

export const CountdownTimer = () => {
  /**
   * 모집 마감 타이머
   *
   * @todo 새 학기 시작 시 모집 마감 시간 교체
   */
  const endDate = useMemo(() => new Date('2026-03-04T23:59:59+09:00'), [])

  const [distance, setDistance] = useState(getDateDistance(new Date(), endDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(getDateDistance(new Date(), endDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className="flex justify-center bg-black py-12 text-white">
      <div className="relative flex aspect-[3/1] max-h-[464px] w-3/4 max-w-[1402px] items-center justify-center rounded-[50%] border-2 lg:border-4">
        {/* '서류 마감까지,' badge moved outside the main border styling to overlap properly */}
        <div className="absolute -left-4 -top-6 flex aspect-[5/2] min-w-[160px] max-w-[285px] items-center justify-center rounded-[50%] bg-white px-2 text-black sm:-top-4 sm:left-4 sm:min-w-[180px] md:min-w-[200px] lg:min-w-[240px]">
          <div className="whitespace-nowrap text-sm font-bold md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            서류 마감까지,
          </div>
        </div>
        <div className="font-archivo text-clamp tracking-widest">
          {padZero(distance.days)}
          <span className="px-1 text-gray-500 opacity-50 lg:px-2">:</span>
          {padZero(distance.hours)}
          <span className="px-1 text-gray-500 opacity-50 lg:px-2">:</span>
          {padZero(distance.minutes)}
          <span className="px-1 text-gray-500 opacity-50 lg:px-2">:</span>
          {padZero(distance.seconds)}
        </div>
      </div>
    </div>
  )
}

const padZero = (num: number) => String(num).padStart(2, '0')
