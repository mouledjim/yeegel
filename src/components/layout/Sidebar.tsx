import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HouseDoorFill, MegaphoneFill, BarChartFill, CreditCardFill,
  PersonFill, GearFill, QuestionCircleFill, BoxArrowRight,
  PlusCircleFill, ShareFill, TrophyFill, WalletFill,
  BellFill, XLg, List,
} from 'react-bootstrap-icons'
import { useAppStore } from '../../store/useAppStore'
import { Avatar } from '../ui'
import { useState, useEffect } from 'react'

interface NavItem {
  icon: React.ReactNode
  label: string
  path: string
  highlight?: boolean
}

const advertiserNav: NavItem[] = [
  { icon: <HouseDoorFill size={18} />, label: 'Tableau de bord', path: '/dashboard' },
  { icon: <MegaphoneFill size={18} />, label: 'Mes Campagnes', path: '/dashboard/campaigns' },
  { icon: <PlusCircleFill size={18} />, label: 'Nouvelle Campagne', path: '/dashboard/campaigns/new', highlight: true },
  { icon: <BarChartFill size={18} />, label: 'Analytiques', path: '/dashboard/analytics' },
  { icon: <CreditCardFill size={18} />, label: 'Paiements', path: '/dashboard/payments' },
  { icon: <BellFill size={18} />, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: <PersonFill size={18} />, label: 'Profil', path: '/dashboard/profile' },
  { icon: <GearFill size={18} />, label: 'Paramètres', path: '/dashboard/settings' },
  { icon: <QuestionCircleFill size={18} />, label: 'Aide', path: '/dashboard/help' },
]

const sharerNav: NavItem[] = [
  { icon: <HouseDoorFill size={18} />, label: 'Tableau de bord', path: '/sharer' },
  { icon: <ShareFill size={18} />, label: 'Annonces dispo', path: '/sharer/ads' },
  { icon: <MegaphoneFill size={18} />, label: 'Mes partages', path: '/sharer/my-shares' },
  { icon: <WalletFill size={18} />, label: 'Mes gains', path: '/sharer/earnings' },
  { icon: <TrophyFill size={18} />, label: 'Ligue', path: '/sharer/leaderboard', highlight: true },
  { icon: <BellFill size={18} />, label: 'Notifications', path: '/sharer/notifications' },
  { icon: <PersonFill size={18} />, label: 'Profil', path: '/sharer/profile' },
  { icon: <GearFill size={18} />, label: 'Paramètres', path: '/sharer/settings' },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()
  const navItems = user?.role === 'sharer' ? sharerNav : advertiserNav

  const handleNav = (path: string) => {
    navigate(path)
    onClose?.()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 16px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingLeft: 8 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 22, color: 'var(--primary)' }}>Yéégël</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>La régie des quartiers</div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, display: 'flex' }}>
            <XLg size={20} />
          </button>
        )}
      </div>

      {/* User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 28 }}>
        <Avatar initials={user?.initials || 'U'} size={40} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {user?.role === 'advertiser' ? 'Annonceur' : 'Partageur'}
            {user?.isVerified && <span style={{ color: 'var(--primary)', marginLeft: 4 }}>✓</span>}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && item.path !== '/sharer' && location.pathname.startsWith(item.path))
          return (
            <motion.button
              key={item.path}
              onClick={() => handleNav(item.path)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', borderRadius: 'var(--radius-md)',
                border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                background: isActive ? 'var(--primary-light)' : item.highlight ? 'var(--gradient-primary)' : 'transparent',
                color: isActive ? 'var(--primary-dark)' : item.highlight ? '#fff' : 'var(--text-secondary)',
                fontWeight: isActive || item.highlight ? 600 : 500,
                fontSize: 14, transition: 'all 0.15s ease',
                boxShadow: item.highlight && !isActive ? 'var(--shadow-green)' : undefined,
              }}
            >
              {item.icon}
              {item.label}
            </motion.button>
          )
        })}
      </nav>

      {/* Balance */}
      <div style={{ background: 'var(--gradient-primary)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 16, color: '#fff' }}>
        <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>
          {user?.role === 'advertiser' ? 'SOLDE DISPONIBLE' : 'GAINS ACCUMULÉS'}
        </div>
        <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700 }}>
          {(user?.balance || 0).toLocaleString('fr-FR')} FCFA
        </div>
      </div>

      {/* Logout */}
      <motion.button
        onClick={() => { logout(); navigate('/login') }}
        whileHover={{ x: 2 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 'var(--radius-md)',
          border: 'none', cursor: 'pointer', background: '#FEE2E2',
          color: '#DC2626', fontWeight: 600, fontSize: 14, width: '100%',
        }}
      >
        <BoxArrowRight size={18} />
        Déconnexion
      </motion.button>
    </div>
  )
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setSidebarOpen(true)
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [setSidebarOpen])

  if (isMobile) {
    return (
      <>
        {/* Bouton hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'fixed', top: 16, left: 16, zIndex: 1100,
            background: '#fff', border: '1px solid var(--border)',
            borderRadius: 10, padding: '8px 10px', cursor: 'pointer',
            boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center',
          }}
        >
          <List size={22} color="var(--primary)" />
        </button>

        {/* Drawer mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1200 }}
              />
              <motion.div
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  position: 'fixed', left: 0, top: 0, bottom: 0,
                  width: 280, background: '#fff', zIndex: 1300,
                  overflowY: 'auto', boxShadow: 'var(--shadow-lg)',
                }}
              >
                <SidebarContent onClose={() => setSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <motion.aside
      initial={{ x: -260 }} animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed', left: 0, top: 0, bottom: 0,
        width: 'var(--sidebar-width)', background: '#fff',
        borderRight: '1px solid var(--border)',
        overflowY: 'auto', zIndex: 100,
        boxShadow: '2px 0 20px rgba(0,0,0,0.04)',
      }}
    >
      <SidebarContent />
    </motion.aside>
  )
}
