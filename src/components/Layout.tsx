import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-ctp-mantle ring-1 ring-ctp-surface0/70" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-auto focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
