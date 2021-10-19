import { useBrandLayout } from '@/models/page/brand-layout/context'
import styles from './footer.module.css'

const MadeBy = () => {
  const [layout] = useBrandLayout()
  const year = new Date().getFullYear()
  return (
    <div className={styles['madeBy']}>
      <p>© {year} · <span className="font-bold font-title text-fg-primary">{layout.titleName}</span></p>
    </div>
  )
}

const Footer = () => (
  <footer className="p pb-6 c-lg t-16 lg:pb-12">
    <MadeBy />
  </footer>
)

export default Footer
