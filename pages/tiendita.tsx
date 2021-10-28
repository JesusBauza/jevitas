import { PageWithLayout } from '@/components/page'
import { ProductBrowser } from '@ecwid/nextjs-ecwid-plugin'

const Index: PageWithLayout = () => {
  return (
    <div className="c-lg py-16">
      <ProductBrowser
        storeId="39979509"
      />
    </div>
  )
}

export default Index
