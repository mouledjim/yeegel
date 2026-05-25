import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { EyeFill, CursorFill, TelephoneFill, ShareFill, PlusCircleFill, ArrowUpRight, MegaphoneFill, TrophyFill, LightbulbFill } from 'react-bootstrap-icons'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, AnimatedCounter, Badge, ProgressBar, Avatar } from '../../components/ui'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../store/useAppStore'
import { weeklyData } from '../../data/mock'
import { staggerContainer, fadeInUp } from '../../utils/animationVariants'
import { useState } from 'react'
import dayjs from 'dayjs'

const statusLabel: Record<string, { label: string; variant: 'success' | 'warning' | 'default' }> = {
  active: { label: 'Actif', variant: 'success' },
  paused: { label: 'En pause', variant: 'warning' },
  completed: { label: 'Terminé', variant: 'default' },
}

export default function AdvertiserDashboard() {
  const { user, campaigns } = useAppStore()
  const navigate = useNavigate()
  const [chartMetric, setChartMetric] = useState<'views' | 'clicks' | 'calls'>('views')

  const active = campaigns.filter((c) => c.status === 'active')

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200 }}>
      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
        <motion.div variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar initials={user?.initials || 'U'} size={44} />
              <div>
                <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700 }}>
                  Bonjour, {user?.name?.split(' ')[0]} 👋
                </h1>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {dayjs().format('dddd D MMMM YYYY')} · {user?.neighborhood}
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => navigate('/dashboard/campaigns/new')} leftIcon={<PlusCircleFill size={16} />}>
            Nouvelle campagne
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}
        className="stats-grid"
      >
        {[
          { icon: <EyeFill size={20} />, value: user?.totalViews || 0, label: 'Vues totales', color: 'var(--primary)', change: '+12%' },
          { icon: <CursorFill size={20} />, value: user?.totalClicks || 0, label: 'Clics totaux', color: '#0891B2', change: '+8%' },
          { icon: <TelephoneFill size={20} />, value: user?.totalCalls || 0, label: 'Appels reçus', color: '#D97706', change: '+23%' },
          { icon: <ShareFill size={20} />, value: user?.totalShares || 0, label: 'Partages', color: '#7C3AED', change: '+15%' },
        ].map((stat, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card hoverable style={{ borderLeft: `4px solid ${stat.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: stat.color + '18', color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {stat.icon}
                </div>
                <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ArrowUpRight size={12} />{stat.change}
                </span>
              </div>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, color: stat.color }}>
                <AnimatedCounter end={stat.value} separator=" " />
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }} className="chart-grid">
        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700 }}>Performance 7 jours</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['views', 'clicks', 'calls'] as const).map((m) => (
                  <button key={m} onClick={() => setChartMetric(m)}
                    style={{
                      padding: '5px 12px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                      background: chartMetric === m ? 'var(--primary)' : 'var(--bg-muted)',
                      color: chartMetric === m ? '#fff' : 'var(--text-muted)',
                      transition: 'all 0.2s',
                    }}
                  >{m === 'views' ? 'Vues' : m === 'clicks' ? 'Clics' : 'Appels'}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 13 }} />
                <Area type="monotone" dataKey={chartMetric} stroke="var(--primary)" strokeWidth={2.5} fill="url(#colorGrad)" dot={{ fill: 'var(--primary)', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card style={{ height: '100%' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Actions rapides</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <PlusCircleFill size={20} color="var(--primary)" />, label: 'Créer une campagne', sub: 'Nouvelle pub locale', path: '/dashboard/campaigns/new', bg: 'var(--primary-light)' },
                { icon: <TrophyFill size={20} color="#D97706" />, label: 'Voir la ligue', sub: 'Classement partageurs', path: '/sharer/leaderboard', bg: 'var(--gold-light)' },
                { icon: <LightbulbFill size={20} color="#7C3AED" />, label: 'Aide & conseils', sub: 'Optimise tes campagnes', path: '/dashboard/help', bg: '#EDE9FE' },
              ].map((a, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(a.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                    borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    background: a.bg, border: '1px solid var(--border)', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {a.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Campagnes actives */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700 }}>
            Mes campagnes ({campaigns.length})
          </h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/campaigns')}>
            Voir tout
          </Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="campaign-grid">
          {campaigns.slice(0, 3).map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
              style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.25s ease' }}
              onClick={() => navigate(`/dashboard/campaigns/${c.id}`)}
            >
              <div style={{ height: 8, background: c.color }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{c.category}</div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{c.title}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                    <Badge label={statusLabel[c.status].label} variant={statusLabel[c.status].variant} dot={c.status === 'active'} />
                    {c.aiGenerated && <Badge label="IA" variant="purple" size="sm" />}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                    <span>Budget utilisé</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{c.spent.toLocaleString()} / {c.budget.toLocaleString()} FCFA</span>
                  </div>
                  <ProgressBar value={(c.spent / c.budget) * 100} color={c.color} height={6} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, textAlign: 'center' }}>
                  {[
                    { icon: <EyeFill size={12} />, v: c.views },
                    { icon: <CursorFill size={12} />, v: c.clicks },
                    { icon: <TelephoneFill size={12} />, v: c.calls },
                    { icon: <ShareFill size={12} />, v: c.shares },
                  ].map((s, j) => (
                    <div key={j} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '6px 4px' }}>
                      <div style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', marginBottom: 2 }}>{s.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{s.v.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .chart-grid { grid-template-columns: 1fr !important; }
          .campaign-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .campaign-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}


