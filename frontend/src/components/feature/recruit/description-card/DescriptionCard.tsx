import { Card } from '@/components/ui'
import { cn } from '@/lib/utils'

import { StarIcon } from '../star-icon'

interface DescriptionCardProps {
  title: string
  description: string
  className?: string
}

export const DescriptionCard = ({
  title,
  description,
  className,
}: DescriptionCardProps) => {
  return (
    <Card
      className={cn(
        'mx-5 flex flex-col justify-center items-center px-6 py-4 sm:flex-row sm:justify-center sm:gap-6 md:px-12',
        className,
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="text-base font-semibold sm:text-lg">{title}</div>
        <StarIcon width={18} />
      </div>
      <div className="text-center text-sm sm:text-base">{description}</div>
    </Card>
  )
}
