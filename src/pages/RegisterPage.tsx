import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircleFill, ArrowRight, ArrowLeft } from 'react-bootstrap-icons'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'
import { neighborhoods } from '../data/mock'

const steps = ['Identité', 'Localisation', 'Rôle']

export default function RegisterPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    city: 'Dakar', neighborhood: '', language: 'Français',
    role: '' as 'advertiser' | 'sharer' | '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const next = () => {
    if (step === 0 && (!form.firstName || !form.phone)) { toast.error('Remplis les champs obligatoires'); return }
    if (step === 1 && !form.neighborhood) { toast.error('Choisis ton quartier'); return }
    setStep((s) => s + 1)
  }

  const submit = async () => {
    if (!form.role) { toast.error('Choisis ton rôle'); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    login(form.role)
    toast.success('Compte créé avec succès !')
    navigate(form.role === 'advertiser' ? '/dashboard' : '/sharer')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-root)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 520 }}>
        <Link to="/" style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 24, color: 'var(--primary)', textDecoration: 'none', display: 'block', textAlign: 'center', marginBottom: 32 }}>
          Yéégël
        </Link>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : undefined }}>
              <motion.div
                animate={{ background: i <= step ? 'var(--gradient-primary)' : 'var(--bg-muted)' }}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i <= step ? '#fff' : 'var(--text-muted)',
                  fontWeight: 700, fontSize: 14, flexShrink: 0,
                }}
              >
                {i < step ? <CheckCircleFill size={18} /> : i + 1}
              </motion.div>
              <span style={{ fontSize: 12, color: i === step ? 'var(--primary)' : 'var(--text-muted)', marginLeft: 8, fontWeight: i === step ? 600 : 400, display: 'none' }} className="step-label">{s}</span>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, margin: '0 12px', background: i < step ? 'var(--primary)' : 'var(--border-default)', borderRadius: 2, transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', padding: 40, border: '1px solid var(--border)' }}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Ton identité</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Quelques infos pour créer ton compte</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <Field label="Prénom *" value={form.firstName} onChange={(v) => update('firstName', v)} placeholder="Mamadou" />
                  <Field label="Nom" value={form.lastName} onChange={(v) => update('lastName', v)} placeholder="Diallo" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Téléphone *</label>
                  <div style={{ display: 'flex' }}>
                    <div style={{ padding: '12px 14px', background: 'var(--bg-muted)', border: '2px solid var(--border-default)', borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      🇸🇳 +221
                    </div>
                    <input type="tel" placeholder="77 123 45 67" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                      style={{ flex: 1, padding: '12px 14px', border: '2px solid var(--border-default)', borderLeft: 'none', borderRadius: '0 var(--radius-md) var(--radius-md) 0', fontSize: 15, outline: 'none' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }}
                    />
                  </div>
                </div>
                <Field label="Email (optionnel)" value={form.email} onChange={(v) => update('email', v)} placeholder="mamadou@email.com" type="email" />
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Ta localisation</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Pour cibler les bonnes annonces</p>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Ville</label>
                  <select value={form.city} onChange={(e) => update('city', e.target.value)} style={selectStyle}>
                    {['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Kaolack'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Quartier *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {neighborhoods.slice(0, 12).map((n) => (
                      <motion.button key={n} whileTap={{ scale: 0.96 }} onClick={() => update('neighborhood', n)}
                        style={{
                          padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: 13, cursor: 'pointer',
                          border: `2px solid ${form.neighborhood === n ? 'var(--primary)' : 'var(--border-default)'}`,
                          background: form.neighborhood === n ? 'var(--primary-light)' : '#fff',
                          color: form.neighborhood === n ? 'var(--primary-dark)' : 'var(--text-secondary)',
                          fontWeight: form.neighborhood === n ? 600 : 400, transition: 'all 0.15s',
                        }}
                      >{n}</motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Langue préférée</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {['Wolof', 'Français', 'Pulaar', 'Sérère'].map((l) => (
                      <motion.button key={l} whileTap={{ scale: 0.96 }} onClick={() => update('language', l)}
                        style={{
                          flex: 1, padding: '10px 8px', borderRadius: 'var(--radius-md)', fontSize: 13, cursor: 'pointer',
                          border: `2px solid ${form.language === l ? 'var(--primary)' : 'var(--border-default)'}`,
                          background: form.language === l ? 'var(--primary-light)' : '#fff',
                          color: form.language === l ? 'var(--primary-dark)' : 'var(--text-muted)',
                          fontWeight: form.language === l ? 600 : 400, transition: 'all 0.15s',
                        }}
                      >{l}</motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Tu es plutôt…</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Tu pourras changer à tout moment</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { role: 'advertiser', emoji: '🏪', title: 'Je suis commerçant', desc: 'Je veux promouvoir mon business et attirer plus de clients dans mon quartier.', benefits: ['Créer des campagnes locales', 'Payer par Mobile Money', 'Voir mes stats en temps réel'] },
                    { role: 'sharer', emoji: '📤', title: 'Je suis partageur', desc: 'Je veux gagner de l\'argent en partageant des publicités de commerçants locaux.', benefits: ['Partager des annonces facilement', 'Gagner des points convertibles', 'Ligue hebdomadaire avec récompenses'] },
                  ].map((r) => (
                    <motion.div key={r.role} whileTap={{ scale: 0.98 }} onClick={() => update('role', r.role)}
                      style={{
                        border: `2px solid ${form.role === r.role ? 'var(--primary)' : 'var(--border-default)'}`,
                        borderRadius: 'var(--radius-lg)', padding: 24, cursor: 'pointer',
                        background: form.role === r.role ? 'var(--primary-light)' : '#fff',
                        transition: 'all 0.2s ease', position: 'relative',
                      }}
                    >
                      {form.role === r.role && (
                        <div style={{ position: 'absolute', top: 16, right: 16 }}>
                          <CheckCircleFill size={20} color="var(--primary)" />
                        </div>
                      )}
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{r.emoji}</div>
                      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{r.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.6 }}>{r.desc}</div>
                      {r.benefits.map((b) => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <CheckCircleFill size={14} color="var(--primary)" />
                          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{b}</span>
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} leftIcon={<ArrowLeft size={16} />}>
                Retour
              </Button>
            )}
            {step < 2 ? (
              <Button fullWidth onClick={next} rightIcon={<ArrowRight size={16} />}>
                Continuer
              </Button>
            ) : (
              <Button fullWidth loading={loading} onClick={submit}>
                Créer mon compte
              </Button>
            )}
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
            Déjà inscrit ? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }
const selectStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-md)', fontSize: 15, outline: 'none', background: '#fff', color: 'var(--text-primary)', cursor: 'pointer' }

function Field({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-md)', fontSize: 15, outline: 'none', color: 'var(--text-primary)' }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)' }}
        onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}


