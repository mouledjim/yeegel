import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { EyeFill, EyeSlashFill, TelephoneFill, LockFill, CheckCircleFill } from 'react-bootstrap-icons'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'
import { fadeInLeft, fadeInRight } from '../utils/animationVariants'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'advertiser' | 'sharer'>('advertiser')

  const handleLogin = async () => {
    if (!phone) { toast.error('Entre ton numéro de téléphone'); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    login(role)
    toast.success('Connexion réussie !')
    navigate(role === 'advertiser' ? '/dashboard' : '/sharer')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-root)' }}>
      {/* Gauche — illustration */}
      <motion.div
        variants={fadeInLeft} initial="hidden" animate="visible"
        style={{
          flex: 1, background: 'var(--gradient-hero)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: 48,
          borderRight: '1px solid var(--border)',
        }}
        className="login-left"
      >
        <div style={{ maxWidth: 400 }}>
          <Link to="/" style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 28, color: 'var(--primary)', textDecoration: 'none', display: 'block', marginBottom: 48 }}>
            Yéégël
          </Link>
          <div style={{ marginBottom: 40 }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 32px', boxShadow: 'var(--shadow-green)',
              animation: 'pulse-green 3s ease-in-out infinite',
            }}>
              <span style={{ fontSize: 48 }}>🏪</span>
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>
              Bienvenue sur Yéégël
            </h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: 15, lineHeight: 1.7 }}>
              La régie publicitaire locale qui connecte commerçants et quartiers au Sénégal.
            </p>
          </div>
          {[
            '500+ commerçants nous font confiance',
            'Pubs diffusées en moins de 5 minutes',
            'Paiement sécurisé Mobile Money',
          ].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <CheckCircleFill size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Droite — formulaire */}
      <motion.div
        variants={fadeInRight} initial="hidden" animate="visible"
        style={{
          width: 480, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 48, background: '#fff',
        }}
        className="login-right"
      >
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Connecte-toi
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>S'inscrire</Link>
          </p>

          {/* Choix du rôle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
            {(['advertiser', 'sharer'] as const).map((r) => (
              <motion.button
                key={r} whileTap={{ scale: 0.97 }}
                onClick={() => setRole(r)}
                style={{
                  padding: '12px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  border: `2px solid ${role === r ? 'var(--primary)' : 'var(--border-default)'}`,
                  background: role === r ? 'var(--primary-light)' : '#fff',
                  color: role === r ? 'var(--primary-dark)' : 'var(--text-muted)',
                  fontWeight: 600, fontSize: 13, transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                {r === 'advertiser' ? '🏪 Commerçant' : '📤 Partageur'}
              </motion.button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Numéro de téléphone
              </label>
              <div style={{ display: 'flex', gap: 0 }}>
                <div style={{
                  padding: '12px 14px', background: 'var(--bg-muted)',
                  border: '2px solid var(--border-default)', borderRight: 'none',
                  borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                  fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                }}>
                  🇸🇳 +221
                </div>
                <input
                  type="tel" placeholder="77 123 45 67"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  style={{
                    flex: 1, padding: '12px 14px',
                    border: '2px solid var(--border-default)', borderLeft: 'none',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    fontSize: 15, outline: 'none', color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 44px 12px 14px',
                    border: '2px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)', fontSize: 15, outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
                />
                <button
                  onClick={() => setShowPwd(!showPwd)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                    display: 'flex',
                  }}
                >
                  {showPwd ? <EyeSlashFill size={18} /> : <EyeFill size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="#" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>
                Mot de passe oublié ?
              </Link>
            </div>

            <Button fullWidth size="lg" loading={loading} onClick={handleLogin}>
              Se connecter
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>ou connexion rapide</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-default)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: 'Wave', bg: '#CCFBF1', color: '#0D9488' },
              { label: 'Orange', bg: '#FFEDD5', color: '#EA580C' },
              { label: 'Free', bg: '#EDE9FE', color: '#7C3AED' },
            ].map((p) => (
              <motion.button
                key={p.label} whileTap={{ scale: 0.96 }}
                onClick={handleLogin}
                style={{
                  padding: '10px 8px', borderRadius: 'var(--radius-md)',
                  border: 'none', background: p.bg, color: p.color,
                  fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}


