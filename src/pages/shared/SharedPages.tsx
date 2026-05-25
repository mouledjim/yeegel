import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircleFill, InfoCircleFill, ExclamationTriangleFill, XCircleFill, BellSlashFill, PersonFill, StarFill, ShieldLockFill, QuestionCircleFill, EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { Card, Badge, Avatar, AnimatedCounter, ProgressBar } from '../../components/ui'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../store/useAppStore'
import { weeklyData, monthlyData, mockPayments } from '../../data/mock'
import { staggerContainer, fadeInUp } from '../../utils/animationVariants'
import { useState } from 'react'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

// ── Notifications ─────────────────────────────────────────────────────
const notifIcon: Record<string, JSX.Element> = {
  success: <CheckCircleFill size={20} color="var(--primary)" />,
  info: <InfoCircleFill size={20} color="#0891B2" />,
  warning: <ExclamationTriangleFill size={20} color="var(--gold)" />,
  error: <XCircleFill size={20} color="var(--error)" />,
}

export function NotificationsPage() {
  const { notifications, markNotifRead, markAllRead } = useAppStore()
  const unread = notifications.filter((n) => n.unread).length

  return (
    <div style={{ padding: '32px 24px', maxWidth: 700 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700 }}>Notifications</h1>
          {unread > 0 && <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>{unread} non lue(s)</p>}
        </div>
        {unread > 0 && <Button variant="secondary" size="sm" onClick={markAllRead}>Tout marquer lu</Button>}
      </div>

      <AnimatePresence>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)' }}>
            <BellSlashFill size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Aucune notification</div>
          </div>
        ) : (
          <Card padding={0}>
            {notifications.map((n, i) => (
              <motion.div key={n.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ delay: i * 0.06 }}
                onClick={() => markNotifRead(n.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 20px',
                  background: n.unread ? 'var(--primary-light)' : '#fff',
                  borderBottom: i < notifications.length - 1 ? '1px solid var(--border)' : undefined,
                  cursor: 'pointer', transition: 'background 0.2s',
                }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>{notifIcon[n.type] || notifIcon.info}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: n.unread ? 700 : 500, fontSize: 14 }}>{n.title}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{n.body}</p>
                </div>
                {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 6 }} />}
              </motion.div>
            ))}
          </Card>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Profile ───────────────────────────────────────────────────────────
export function ProfilePage() {
  const { user } = useAppStore()
  return (
    <div style={{ padding: '32px 24px', maxWidth: 700 }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>Mon Profil</h1>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <Avatar initials={user?.initials || 'U'} size={80} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', cursor: 'pointer' }}>
              <PersonFill size={12} color="#fff" />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700 }}>{user?.name}</h2>
              {user?.isVerified && <Badge label="Vérifié" variant="success" />}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>{user?.phone}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{user?.neighborhood}, {user?.city}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, textAlign: 'center' }}>
          {[
            { label: 'Campagnes', value: user?.totalCampaigns || 0 },
            { label: 'Vues totales', value: user?.totalViews || 0 },
            { label: 'Points', value: user?.points || 0 },
          ].map((s) => (
            <div key={s.label} style={{ background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', padding: 16 }}>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 22, color: 'var(--primary)' }}>
                <AnimatedCounter end={s.value} separator=" " />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Informations</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Nom complet', value: user?.name || '' },
            { label: 'Téléphone', value: user?.phone || '' },
            { label: 'Email', value: user?.email || 'Non renseigné' },
            { label: 'Ville', value: user?.city || '' },
            { label: 'Quartier', value: user?.neighborhood || '' },
          ].map((f) => (
            <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{f.label}</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{f.value}</span>
            </div>
          ))}
        </div>
        <Button fullWidth style={{ marginTop: 20 }} variant="secondary" onClick={() => toast.success('Fonctionnalité bientôt disponible')}>
          Modifier mes informations
        </Button>
      </Card>

      <Card>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Réputation</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4, 5].map((s) => <StarFill key={s} size={20} color={s <= Math.floor(user?.reputationScore || 0) ? '#F59E0B' : '#E5E7EB'} />)}
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700 }}>{user?.reputationScore}/5</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Basé sur 127 avis de clients</div>
      </Card>
    </div>
  )
}

// ── Analytics ─────────────────────────────────────────────────────────
export function AnalyticsPage() {
  const [period, setPeriod] = useState<'7j' | '30j' | '90j'>('7j')
  const pieData = [
    { name: 'Restauration', value: 35, color: 'var(--primary)' },
    { name: 'Beauté', value: 25, color: '#DB2777' },
    { name: 'Auto', value: 20, color: '#D97706' },
    { name: 'Santé', value: 12, color: '#0891B2' },
    { name: 'Autre', value: 8, color: '#7C3AED' },
  ]
  return (
    <div style={{ padding: '32px 24px', maxWidth: 1200 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700 }}>Analytiques</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['7j', '30j', '90j'] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding: '7px 16px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: period === p ? 'var(--primary)' : 'var(--bg-muted)', color: period === p ? '#fff' : 'var(--text-muted)', transition: 'all 0.2s' }}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }} className="analytics-main">
        <Card>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Vues par jour</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 13 }} />
              <Bar dataKey="views" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Par catégorie</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {pieData.map((d) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{d.name}</span>
                <span style={{ fontWeight: 600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Revenus mensuels</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', fontSize: 13 }} formatter={(v) => [`${Number(v).toLocaleString()} FCFA`]} />
            <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <style>{`@media(max-width:768px){.analytics-main{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

// ── Payments ──────────────────────────────────────────────────────────
export function PaymentsPage() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 800 }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Paiements</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Historique de tes transactions</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }} className="pay-stats">
        {[
          { label: 'Total dépensé', value: '45 000 FCFA', color: 'var(--error)', bg: '#FEE2E2' },
          { label: 'Rechargements', value: '20 000 FCFA', color: 'var(--primary)', bg: 'var(--primary-light)' },
          { label: 'Campagnes payées', value: '12', color: '#0891B2', bg: '#CFFAFE' },
        ].map((s) => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 'var(--radius-md)', padding: 20 }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <Card padding={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontWeight: 700, display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
          <span>Date</span><span>Description</span><span style={{ textAlign: 'center' }}>Moyen</span><span style={{ textAlign: 'right' }}>Montant</span>
        </div>
        {mockPayments.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 8, padding: '16px 20px', borderBottom: i < mockPayments.length - 1 ? '1px solid var(--border)' : undefined, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{dayjs(p.date).format('DD MMM')}</span>
            <span style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</span>
            <span style={{ textAlign: 'center' }}><Badge label={p.provider} variant={p.provider === 'Wave' ? 'info' : 'warning'} size="sm" /></span>
            <span style={{ textAlign: 'right', fontWeight: 700, color: p.amount > 0 ? 'var(--primary)' : 'var(--error)', fontSize: 14 }}>
              {p.amount > 0 ? '+' : ''}{p.amount.toLocaleString()} F
            </span>
          </motion.div>
        ))}
      </Card>
      <style>{`@media(max-width:640px){.pay-stats{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

// ── Settings ──────────────────────────────────────────────────────────
export function SettingsPage() {
  const [notifs, setNotifs] = useState({ campaigns: true, clicks: true, payments: true, league: false })
  const toggle = (k: keyof typeof notifs) => setNotifs((n) => ({ ...n, [k]: !n[k] }))
  return (
    <div style={{ padding: '32px 24px', maxWidth: 700 }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 28 }}>Paramètres</h1>
      <Card style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldLockFill size={18} color="var(--primary)" /> Notifications
        </h3>
        {[
          { key: 'campaigns', label: 'Nouvelles campagnes', desc: 'Alertes quand une campagne est approuvée' },
          { key: 'clicks', label: 'Clics et interactions', desc: 'Notifications des clics sur tes annonces' },
          { key: 'payments', label: 'Paiements', desc: 'Confirmations de paiements et retraits' },
          { key: 'league', label: 'Ligue des partageurs', desc: 'Changements de classement hebdomadaire' },
        ].map((item) => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
            </div>
            <motion.div whileTap={{ scale: 0.9 }} onClick={() => toggle(item.key as keyof typeof notifs)}
              style={{ width: 48, height: 26, borderRadius: 13, background: notifs[item.key as keyof typeof notifs] ? 'var(--primary)' : '#E5E7EB', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
              <motion.div animate={{ left: notifs[item.key as keyof typeof notifs] ? 24 : 4 }}
                style={{ position: 'absolute', top: 4, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
            </motion.div>
          </div>
        ))}
      </Card>
      <Card>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldLockFill size={18} color="var(--primary)" /> Sécurité
        </h3>
        {['Modifier mon mot de passe', 'Mes sessions actives', 'Déconnexion de tous les appareils'].map((item, i) => (
          <div key={item} onClick={() => toast.success('Bientôt disponible')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 2 ? '1px solid var(--border)' : undefined, cursor: 'pointer' }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: i === 2 ? 'var(--error)' : 'var(--text-primary)' }}>{item}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

// ── Help ──────────────────────────────────────────────────────────────
export function HelpPage() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: 'Comment créer ma première campagne ?', a: 'Clique sur "Nouvelle campagne" dans le menu, suis les 4 étapes : contenu, ciblage, budget et paiement. Ta campagne sera en ligne en moins de 5 minutes.' },
    { q: 'Quels sont les modes de paiement acceptés ?', a: 'Nous acceptons Wave, Orange Money et Free Money. Tu peux recharger ton compte depuis n\'importe lequel de ces services.' },
    { q: 'Comment fonctionne le système de partageurs ?', a: 'Les partageurs sont des personnes qui diffusent tes annonces dans leurs réseaux WhatsApp. Ils reçoivent des points pour chaque clic généré, convertibles en FCFA.' },
    { q: 'Comment voir les statistiques de ma campagne ?', a: 'Va dans "Mes Campagnes", clique sur une campagne puis "Voir détails". Tu verras les vues, clics, appels et partages en temps réel.' },
    { q: 'Puis-je modifier une campagne en cours ?', a: 'Tu peux mettre en pause ou arrêter une campagne. La modification du contenu n\'est pas encore disponible mais arrive bientôt.' },
    { q: 'Comment retirer mes gains en tant que partageur ?', a: 'Dans ton tableau de bord, clique sur "Retirer sur Wave". Le minimum de retrait est de 500 FCFA. Le virement est instantané.' },
  ]
  return (
    <div style={{ padding: '32px 24px', maxWidth: 700 }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Aide & Support</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Trouve des réponses à tes questions</p>
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <QuestionCircleFill size={18} color="var(--primary)" /> Questions fréquentes
        </h3>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : undefined }}>
            <div onClick={() => setOpen(open === i ? null : i)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer', gap: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} style={{ color: 'var(--primary)', fontSize: 20, flexShrink: 0 }}>⌄</motion.span>
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: 16 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Card>
      <Card>
        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Nous contacter</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }} className="contact-grid">
          {[
            { icon: <EnvelopeFill size={22} color="var(--primary)" />, label: 'Email', value: 'support@yeegel.sn', href: 'mailto:support@yeegel.sn', bg: 'var(--primary-light)' },
            { icon: <TelephoneFill size={22} color="#0891B2" />, label: 'Téléphone', value: '+221 77 000 00 00', href: 'tel:+221770000000', bg: '#CFFAFE' },
            { icon: <QuestionCircleFill size={22} color="var(--gold)" />, label: 'WhatsApp', value: 'Discuter maintenant', href: '#', bg: 'var(--gold-light)' },
          ].map((c, i) => (
            <a key={i} href={c.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, borderRadius: 'var(--radius-md)', background: c.bg, gap: 10, border: '1px solid var(--border)' }}>
              {c.icon}
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{c.label}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>{c.value}</span>
            </a>
          ))}
        </div>
      </Card>
      <style>{`@media(max-width:640px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

// ── 404 ───────────────────────────────────────────────────────────────
export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', background: 'var(--bg-root)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
        <div style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(80px,15vw,160px)', fontWeight: 700, color: 'var(--primary-light)', lineHeight: 1, marginBottom: 24, userSelect: 'none' }}>404</div>
        <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Page introuvable</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15 }}>Cette page n'existe pas… encore.</p>
        <Button onClick={() => navigate('/')} size="lg">Retour à l'accueil</Button>
      </motion.div>
    </div>
  )
}


