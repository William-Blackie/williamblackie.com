import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="bg-ctp-mantle ring-ctp-surface0/70 w-full ring-1" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-auto focus:outline-none"
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
