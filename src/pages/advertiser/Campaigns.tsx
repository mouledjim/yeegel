// Campaigns List
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PlusCircleFill, EyeFill, CursorFill, TelephoneFill, ShareFill, Search } from 'react-bootstrap-icons'
import { Card, Badge, ProgressBar } from '../../components/ui'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../store/useAppStore'
import { useState } from 'react'
import { fadeInUp, staggerContainer } from '../../utils/animationVariants'

const statusLabel: Record<string, { label: string; variant: 'success' | 'warning' | 'default' }> = {
  active: { label: 'Actif', variant: 'success' },
  paused: { label: 'En pause', variant: 'warning' },
  completed: { label: 'Terminé', variant: 'default' },
}

export function CampaignsPage() {
  const { campaigns, updateCampaign } = useAppStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 1200 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700 }}>Mes Campagnes</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(13px, 2vw, 14px)', marginTop: 4 }}>{campaigns.length} campagne(s) au total</p>
        </div>
        <Button leftIcon={<PlusCircleFill size={16} />} onClick={() => navigate('/dashboard/campaigns/new')}>
          Nouvelle campagne
        </Button>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            placeholder="Rechercher une campagne..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 40px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-full)', fontSize: 'clamp(13px, 2vw, 14px)', outline: 'none', background: '#fff' }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }}
          />
        </div>
        {['all', 'active', 'paused', 'completed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600,
              background: filter === f ? 'var(--primary)' : 'var(--bg-muted)',
              color: filter === f ? '#fff' : 'var(--text-muted)', transition: 'all 0.2s',
            }}
          >{{ all: 'Toutes', active: 'Actives', paused: 'En pause', completed: 'Terminées' }[f]}</button>
        ))}
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(16px, 4vw, 20px)',
        }} className="campaigns-grid"
      >
        {filtered.map((c, i) => (
          <motion.div key={c.id} variants={fadeInUp} whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
            style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.25s' }}
            onClick={() => navigate(`/dashboard/campaigns/${c.id}`)}
          >
            <div style={{ height: 6, background: c.color }} />
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ flex: 1, marginRight: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>{c.category}</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15 }}>{c.title}</div>
                </div>
                <Badge label={statusLabel[c.status].label} variant={statusLabel[c.status].variant} dot={c.status === 'active'} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Budget</span><span style={{ fontWeight: 600 }}>{c.spent.toLocaleString()} / {c.budget.toLocaleString()} FCFA</span>
                </div>
                <ProgressBar value={(c.spent / c.budget) * 100} color={c.color} height={5} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, textAlign: 'center', marginBottom: 16 }}>
                {[{ icon: <EyeFill size={11} />, v: c.views }, { icon: <CursorFill size={11} />, v: c.clicks }, { icon: <TelephoneFill size={11} />, v: c.calls }, { icon: <ShareFill size={11} />, v: c.shares }].map((s, j) => (
                  <div key={j} style={{ background: 'var(--bg-muted)', borderRadius: 6, padding: '5px 2px' }}>
                    <div style={{ color: 'var(--text-muted)', display: 'flex', justifyContent: 'center', marginBottom: 2 }}>{s.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{s.v >= 1000 ? (s.v / 1000).toFixed(1) + 'k' : s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {c.status === 'active' && (
                  <button onClick={(e) => { e.stopPropagation(); updateCampaign(c.id, { status: 'paused' }) }}
                    style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-muted)', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    Pause
                  </button>
                )}
                {c.status === 'paused' && (
                  <button onClick={(e) => { e.stopPropagation(); updateCampaign(c.id, { status: 'active' }) }}
                    style={{ flex: 1, padding: '8px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary-light)', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: 'var(--primary-dark)' }}>
                    Reprendre
                  </button>
                )}
                <button onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/campaigns/${c.id}`) }}
                  style={{ flex: 2, padding: '8px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--gradient-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#fff' }}>
                  Voir détails
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Aucune campagne trouvée</div>
          <Button onClick={() => navigate('/dashboard/campaigns/new')} style={{ marginTop: 16 }}>Créer ma première campagne</Button>
        </div>
      )}
      <style>{`@media(max-width:1024px){.campaigns-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:640px){.campaigns-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}


