import { Button } from '@/components/button'
import { PageWithLayout } from '@/components/page'

const Page404: PageWithLayout = () => (
  <div className="text-center w-full py-16">
    <h1 className="font-bold text-fg-primary mb-4 text-8xl font-title">
      404
    </h1>
    <p className="mb-6">This page doesn't exist</p>
    <Button title="Go to home" href="/" canonical />
  </div>
)

Page404.getLayoutProps = () => ({
  title: '404: This page doesn\'t exist',
  protect: false,
  canonical: true,
})

export default Page404
