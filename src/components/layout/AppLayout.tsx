import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface AppLayoutProps { children: ReactNode }

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        marginLeft: 'var(--sidebar-width)',
        minHeight: '100vh',
        background: 'var(--bg-root)',
        transition: 'margin-left 0.3s ease',
      }}
        className="main-content-area"
      >
        {children}
      </main>
      <style>{`
        @media (max-width: 1024px) {
          .main-content-area { margin-left: 220px !important; }
        }
        @media (max-width: 768px) {
          .main-content-area { margin-left: 0 !important; padding-top: 0 !important; }
        }
        @media (max-width: 480px) {
          .main-content-area { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  )
}


