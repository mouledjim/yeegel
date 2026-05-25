import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { TrophyFill, ShareFill, ArrowUpRight, Wallet2, EyeFill, CursorFill } from 'react-bootstrap-icons'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, AnimatedCounter, Badge, Avatar, ProgressBar } from '../../components/ui'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../store/useAppStore'
import { mockLeaderboard, weeklyData } from '../../data/mock'
import { staggerContainer, fadeInUp } from '../../utils/animationVariants'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export function SharerDashboardPage() {
  const { user, campaigns } = useAppStore()
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 22, secs: 45 })

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev
        secs--
        if (secs < 0) { secs = 59; mins-- }
        if (mins < 0) { mins = 59; hours-- }
        if (hours < 0) { hours = 23; days-- }
        return { days, hours, mins, secs }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const myRank = mockLeaderboard.find((l) => l.isMe)

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200 }}>
      {/* Ligue banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'var(--gradient-gold)', borderRadius: 'var(--radius-xl)', padding: '28px 32px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <TrophyFill size={28} color="#fff" />
              <span style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: '#fff' }}>
                Tu es #{myRank?.rank} cette semaine sur Dakar !
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
              Continue à partager pour gagner plus. Top 3 = récompenses Wave automatiques.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Jours', value: timeLeft.days },
              { label: 'Heures', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.mins },
              { label: 'Sec', value: timeLeft.secs },
            ].map((t) => (
              <div key={t.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: '10px 14px', minWidth: 54 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, color: '#fff' }}>
                  {String(t.value).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }} className="sharer-stats"
      >
        {[
          { icon: <Wallet2 size={20} />, value: user?.balance || 0, label: 'Gains totaux', suffix: ' FCFA', color: 'var(--gold)' },
          { icon: <ShareFill size={20} />, value: user?.totalShares || 0, label: 'Partages', suffix: '', color: 'var(--primary)' },
          { icon: <CursorFill size={20} />, value: user?.totalClicks || 0, label: 'Clics générés', suffix: '', color: '#0891B2' },
          { icon: <TrophyFill size={20} />, value: user?.points || 0, label: 'Points ligue', suffix: '', color: '#7C3AED' },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card hoverable style={{ borderLeft: `4px solid ${s.color}`, textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: s.color + '18', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: s.color }}>
                <AnimatedCounter end={s.value} suffix={s.suffix} separator=" " />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Retrait + Classement */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }} className="sharer-grid">
        <Card>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Retirer mes gains</h3>
          <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 44, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>
              <AnimatedCounter end={user?.balance || 0} suffix=" FCFA" separator=" " />
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Disponible au retrait</div>
            <Button fullWidth size="lg" variant="wave" onClick={() => toast.success('Retrait de 12 500 FCFA initié sur Wave !')}>
              Retirer sur Wave
            </Button>
            <div style={{ marginTop: 16 }}>
              <ProgressBar value={((user?.balance || 0) / 20000) * 100} color="var(--gold)" height={8} />
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>Prochain palier Or : 20 000 FCFA</div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700 }}>Top Partageurs</h3>
            <Button size="sm" variant="secondary" onClick={() => navigate('/sharer/leaderboard')}>Voir tout</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockLeaderboard.slice(0, 5).map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 'var(--radius-md)', background: p.isMe ? 'var(--primary-light)' : 'var(--bg-muted)', border: p.isMe ? '1.5px solid var(--primary)' : '1px solid transparent' }}>
                <div style={{ width: 24, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, color: i < 3 ? 'var(--gold)' : 'var(--text-muted)', textAlign: 'center', flexShrink: 0 }}>#{p.rank}</div>
                <Avatar initials={p.initials} size={32} color={p.isMe ? 'var(--primary)' : '#6B7280'} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.points.toLocaleString()} pts</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', flexShrink: 0 }}>{(p.earnings / 1000).toFixed(1)}k</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Annonces disponibles */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700 }}>Annonces à partager</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/sharer/ads')}>Voir tout</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="ads-grid">
          {campaigns.filter((c) => c.status === 'active').slice(0, 3).map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              <div style={{ height: 6, background: c.color }} />
              <div style={{ padding: 20 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                  <Badge label={`+${c.commission} pts/clic`} variant="success" />
                  <Badge label={c.neighborhood} variant="default" />
                </div>
                <Button fullWidth size="sm" onClick={() => {
                  navigator.clipboard.writeText(`https://yeegel.sn/ad/${c.id}?ref=MD001`)
                  toast.success('Lien copié ! Partage-le sur WhatsApp')
                }} leftIcon={<ShareFill size={14} />}>
                  Partager & Gagner
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.sharer-stats{grid-template-columns:repeat(2,1fr)!important}.sharer-grid{grid-template-columns:1fr!important}.ads-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:640px){.sharer-stats{grid-template-columns:repeat(2,1fr)!important}.ads-grid{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  )
}

export function LeaderboardPage() {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '32px 24px', maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Ligue des Partageurs</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Classement hebdomadaire — Dakar</p>

      {/* Podium top 3 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 16, marginBottom: 48, padding: '0 24px' }}>
        {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((p, i) => {
          const heights = [160, 200, 140]
          const colors = ['#94A3B8', '#F59E0B', '#CD7F32']
          const sizes = [44, 56, 40]
          return (
            <motion.div key={p.rank} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              style={{ flex: 1, textAlign: 'center', maxWidth: 160 }}>
              <Avatar initials={p.initials} size={sizes[i]} color={colors[i]} style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{p.points.toLocaleString()} pts</div>
              <div style={{ height: heights[i], background: `linear-gradient(to top, ${colors[i]}, ${colors[i]}44)`, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 12 }}>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 22, color: '#fff' }}>#{[2, 1, 3][i]}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {mockLeaderboard.map((p, i) => (
            <motion.div key={p.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: p.isMe ? 'var(--primary-light)' : 'transparent', borderBottom: i < mockLeaderboard.length - 1 ? '1px solid var(--border)' : undefined, borderRadius: p.isMe ? 'var(--radius-md)' : undefined }}>
              <div style={{ width: 32, textAlign: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: i < 3 ? 'var(--gold)' : 'var(--text-muted)', flexShrink: 0 }}>#{p.rank}</div>
              <Avatar initials={p.initials} size={40} color={p.isMe ? 'var(--primary)' : '#6B7280'} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                  {p.isMe && <Badge label="Toi" variant="success" size="sm" />}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.city} · {p.shares} partages</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: 'var(--primary)' }}>{p.earnings.toLocaleString()} FCFA</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.points.toLocaleString()} pts</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function AvailableAdsPage() {
  const { campaigns } = useAppStore()
  const [filter, setFilter] = useState('all')
  const active = campaigns.filter((c) => c.status === 'active')
  const filtered = filter === 'all' ? active : active.filter((c) => c.category.toLowerCase().includes(filter))

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200 }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Annonces disponibles</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{active.length} annonces actives à partager</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {['all', 'restauration', 'beauté', 'auto', 'santé'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '7px 16px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: filter === f ? 'var(--primary)' : 'var(--bg-muted)', color: filter === f ? '#fff' : 'var(--text-muted)', transition: 'all 0.2s' }}>
            {{ all: 'Toutes', restauration: 'Restauration', beauté: 'Beauté', auto: 'Auto', santé: 'Santé' }[f]}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="avail-grid">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
            style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', transition: 'all 0.25s' }}>
            <div style={{ height: 6, background: c.color }} />
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>{c.category}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                <Badge label={`+${c.commission} pts/clic`} variant="success" />
                <Badge label={c.neighborhood} variant="default" />
                <Badge label={c.language} variant="info" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                <div style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Déjà partagé</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.shares}x</div>
                </div>
                <div style={{ background: 'var(--primary-light)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--primary)' }}>Commission</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{c.commission} pts</div>
                </div>
              </div>
              <Button fullWidth leftIcon={<ShareFill size={14} />} onClick={() => { navigator.clipboard.writeText(`https://yeegel.sn/ad/${c.id}?ref=MD001`); toast.success('Lien copié ! Partage sur WhatsApp', { icon: '📤' }) }}>
                Partager maintenant
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`@media(max-width:1024px){.avail-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:640px){.avail-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}


