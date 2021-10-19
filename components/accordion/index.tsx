import type { FC } from 'react'
import { useRef, useState } from 'react'
import { ChevronDown24 } from '@carbon/icons-react'
import styles from './style.module.css'

export type AccordionProps = {
  className?: string
  open?: boolean
  title?: string
}

const Accordion: FC<AccordionProps> = ({ children, title, open, className = '' }) => {
  const contentEl = useRef<HTMLDivElement>()
  const [isOpen, setOpen] = useState(open)
  return (
    <div className="flex flex-col border rounded-lg border-x-gray-400 p-4 w-full border-opacity-50">
      <div
        className={`flex w-full border-fg-primary cursor-pointer justify-between text-fg-primary`}
        onClick={() => setOpen(!isOpen)}
      >
        <h4 className="text-md font-bold">{title}</h4>
        <ChevronDown24 className="text-fg-primary" style={{
          transition: 'transform ease 0.2s',
          transform: `rotate(${ isOpen ? 180 : 0 }deg)`
        }} />
      </div>
      <div
        ref={contentEl}
        className={`${className} overflow-hidden`}
        style={{
          transition: 'height ease 0.2s',
          height: isOpen ? contentEl.current?.scrollHeight || 'auto' : '0px'
        }}
      >
        <div style={{ paddingTop: '1rem' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Accordion
