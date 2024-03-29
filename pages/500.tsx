import { Button } from '@/components/button'
import { PageWithLayout } from '@/components/page'

const Page404: PageWithLayout = () => (
  <div className="text-center w-full py-16">
    <h1 className="font-bold text-fg-primary mb-4 text-8xl">
      500
    </h1>
    <p className="mb-6">Oops, un error interno ha aparecido 😥</p>
    <Button title="Go to home" href="/" canonical />
  </div>
)

Page404.getLayoutProps = () => ({
  title: '500: Oops, error interno',
  protect: false,
  canonical: true,
})

export default Page404
