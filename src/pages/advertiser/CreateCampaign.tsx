import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircleFill, ArrowRight, ArrowLeft, RocketFill, Camera2, MicFill } from 'react-bootstrap-icons'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../store/useAppStore'
import { neighborhoods, categories } from '../../data/mock'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'

const steps = ['Contenu', 'Ciblage', 'Budget', 'Paiement']
const BUDGETS = [500, 1000, 2000, 3000, 5000, 10000, 20000, 50000]

function getPrediction(budget: number, duration: number) {
  const base = budget * 1.7
  return {
    views: Math.round(base * duration * 0.8),
    clicks: Math.round(base * duration * 0.04),
    calls: Math.round(base * duration * 0.003),
  }
}

export function CreateCampaignPage() {
  const navigate = useNavigate()
  const addCampaign = useAppStore((s) => s.addCampaign)
  const [step, setStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', callNumber: '',
    category: 'Restauration', image: '',
    city: 'Dakar', neighborhoods: [] as string[], language: 'Wolof',
    budgetIdx: 4, duration: 1, provider: 'Wave',
  })

  const budget = BUDGETS[form.budgetIdx]
  const pred = getPrediction(budget, form.duration)
  const update = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }))
  const toggleNeighborhood = (n: string) => {
    setForm((f) => ({
      ...f, neighborhoods: f.neighborhoods.includes(n)
        ? f.neighborhoods.filter((x) => x !== n) : [...f.neighborhoods, n]
    }))
  }

  const next = () => {
    if (step === 0 && !form.title) { toast.error('Ajoute un titre'); return }
    if (step === 1 && form.neighborhoods.length === 0) { toast.error('Choisis au moins un quartier'); return }
    setStep((s) => s + 1)
  }

  const submit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    addCampaign({
      id: Date.now().toString(), title: form.title, description: form.description,
      category: form.category, status: 'active', budget, spent: 0,
      views: 0, clicks: 0, calls: 0, shares: 0,
      neighborhood: form.neighborhoods[0] || 'Dakar', city: form.city,
      language: form.language, startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + form.duration * 7 * 86400000).toISOString().slice(0, 10),
      callNumber: form.callNumber, color: '#16A34A', colorLight: '#DCFCE7',
      trending: false, aiGenerated: false, predictedReach: pred.views, commission: 25,
      weeklyData: [0, 0, 0, 0, 0, 0, 0],
    })
    setLoading(false)
    setSuccess(true)
  }

  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <Confetti numberOfPieces={200} colors={['#16A34A', '#F4C430', '#DCFCE7', '#fff']} recycle={false} />
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 12 }} style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'pulse-green 2s infinite' }}>
          <CheckCircleFill size={48} color="var(--primary)" />
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Campagne lancée !</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>Ta campagne <strong>{form.title}</strong> est maintenant en ligne. Elle sera diffusée dans les prochaines minutes.</p>
        <Button fullWidth size="lg" onClick={() => navigate('/dashboard/campaigns')}>
          Voir mes campagnes
        </Button>
      </motion.div>
    </div>
  )

  return (
    <div style={{ padding: '32px 24px', maxWidth: 700 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Nouvelle campagne</h1>
        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : undefined }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div animate={{ background: i <= step ? 'var(--gradient-primary)' : 'var(--bg-muted)' }}
                  style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i <= step ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {i < step ? <CheckCircleFill size={16} /> : i + 1}
                </motion.div>
                <span style={{ fontSize: 11, color: i === step ? 'var(--primary)' : 'var(--text-muted)', fontWeight: i === step ? 600 : 400, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, margin: '0 8px', marginBottom: 20, background: i < step ? 'var(--primary)' : 'var(--border-default)', borderRadius: 2, transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ padding: 32 }}>
            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Le contenu</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Décris ton annonce</p>
                
                {/* Upload zone */}
                <motion.div whileHover={{ borderColor: 'var(--primary)', background: 'var(--primary-light)' }} style={{ border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: 40, textAlign: 'center', marginBottom: 24, cursor: 'pointer', transition: 'all 0.2s' }}>
                  <Camera2 size={32} color="var(--text-muted)" style={{ marginBottom: 12 }} />
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Glisse une image ici</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>ou clique pour parcourir</div>
                </motion.div>

                {/* IA button */}
                <div style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)', borderRadius: 'var(--radius-md)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 24 }}
                  onClick={() => { update('title', 'Thiéboudienne Chez Fatou'); update('description', 'Le meilleur thiéboudienne de Parcelles ! Livraison rapide dans tout le quartier.'); toast.success('Contenu généré par l\'IA !') }}>
                  <MicFill size={20} color="#fff" />
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Générer avec l'IA</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Décris ton business, l'IA crée ta pub</div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={lbl}>Catégorie</label>
                  <select value={form.category} onChange={(e) => update('category', e.target.value)} style={sel}>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={lbl}>Titre de l'annonce *</label>
                  <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Ex: Thiéboudienne Chez Fatou" maxLength={60} style={inp}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none' }} />
                  <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{form.title.length}/60</div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={lbl}>Description</label>
                  <textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Décris ton produit ou service..." maxLength={200} rows={4}
                    style={{ ...inp, resize: 'none' as const }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }} />
                  <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{form.description.length}/200</div>
                </div>
                <div>
                  <label style={lbl}>Numéro d'appel</label>
                  <input value={form.callNumber} onChange={(e) => update('callNumber', e.target.value)} placeholder="+221 77 123 45 67" style={inp}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-default)' }} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Le ciblage</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Qui veux-tu atteindre ?</p>
                <div style={{ marginBottom: 20 }}>
                  <label style={lbl}>Ville</label>
                  <select value={form.city} onChange={(e) => update('city', e.target.value)} style={sel}>
                    {['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Kaolack'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={lbl}>Quartiers ({form.neighborhoods.length} sélectionné(s))</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {neighborhoods.map((n) => (
                      <motion.button key={n} whileTap={{ scale: 0.95 }} onClick={() => toggleNeighborhood(n)}
                        style={{ padding: '7px 14px', borderRadius: 'var(--radius-full)', border: `2px solid ${form.neighborhoods.includes(n) ? 'var(--primary)' : 'var(--border-default)'}`, background: form.neighborhoods.includes(n) ? 'var(--primary-light)' : '#fff', color: form.neighborhoods.includes(n) ? 'var(--primary-dark)' : 'var(--text-secondary)', fontSize: 13, fontWeight: form.neighborhoods.includes(n) ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                        {n}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={lbl}>Langue</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['Wolof', 'Français', 'Pulaar', 'Sérère'].map((l) => (
                      <motion.button key={l} whileTap={{ scale: 0.96 }} onClick={() => update('language', l)}
                        style={{ flex: 1, padding: '10px 8px', borderRadius: 'var(--radius-md)', border: `2px solid ${form.language === l ? 'var(--primary)' : 'var(--border-default)'}`, background: form.language === l ? 'var(--primary-light)' : '#fff', color: form.language === l ? 'var(--primary-dark)' : 'var(--text-muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                        {l}
                      </motion.button>
                    ))}
                  </div>
                </div>
                {form.neighborhoods.length > 0 && (
                  <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', padding: 16, border: '1px solid var(--border-strong)' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-dark)', marginBottom: 4 }}>Portée estimée</div>
                    <div style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>~{(form.neighborhoods.length * 2500).toLocaleString()} personnes</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Basé sur les campagnes similaires</div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Le budget</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Choisis ton investissement</p>
                
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <label style={lbl}>Budget : </label>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>{budget.toLocaleString()} FCFA</span>
                  </div>
                  <input type="range" min={0} max={BUDGETS.length - 1} value={form.budgetIdx} onChange={(e) => update('budgetIdx', parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--primary)', height: 6, cursor: 'pointer' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                    <span>500 FCFA</span><span>50 000 FCFA</span>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={lbl}>Durée</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                    {[{ v: 1, l: '1 semaine' }, { v: 2, l: '2 semaines' }, { v: 4, l: '1 mois' }].map((d) => (
                      <motion.button key={d.v} whileTap={{ scale: 0.97 }} onClick={() => update('duration', d.v)}
                        style={{ padding: 14, borderRadius: 'var(--radius-md)', border: `2px solid ${form.duration === d.v ? 'var(--primary)' : 'var(--border-default)'}`, background: form.duration === d.v ? 'var(--primary-light)' : '#fff', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' as const }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: form.duration === d.v ? 'var(--primary-dark)' : 'var(--text-primary)' }}>{d.l}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{(budget * d.v).toLocaleString()} FCFA</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', padding: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Prédiction IA</div>
                  {[
                    { label: 'Vues estimées', value: pred.views, max: 50000 },
                    { label: 'Clics estimés', value: pred.clicks, max: 2000 },
                    { label: 'Appels estimés', value: pred.calls, max: 150 },
                  ].map((p) => (
                    <div key={p.label} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{p.label}</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>~{p.value.toLocaleString()}</span>
                      </div>
                      <div style={{ background: 'var(--border-default)', borderRadius: 'var(--radius-full)', height: 6, overflow: 'hidden' }}>
                        <motion.div animate={{ width: `${Math.min((p.value / p.max) * 100, 100)}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
                          style={{ height: '100%', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Paiement</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Finalise ta commande</p>
                
                <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 24, border: '1px solid var(--border-strong)' }}>
                  <div style={{ fontWeight: 700, marginBottom: 12 }}>Récapitulatif</div>
                  {[
                    ['Campagne', form.title || 'Ma campagne'],
                    ['Quartiers', form.neighborhoods.slice(0, 2).join(', ') + (form.neighborhoods.length > 2 ? '...' : '') || 'Non défini'],
                    ['Durée', `${form.duration} semaine(s)`],
                    ['Budget', `${budget.toLocaleString()} FCFA/semaine`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                      <span style={{ fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ height: 1, background: 'var(--border-strong)', margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700 }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--primary)' }}>{(budget * form.duration).toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={lbl}>Mode de paiement</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { id: 'Wave', label: 'Wave', bg: '#CCFBF1', color: '#0D9488', border: '#0D9488' },
                      { id: 'Orange Money', label: 'Orange Money', bg: '#FFEDD5', color: '#EA580C', border: '#EA580C' },
                      { id: 'Free Money', label: 'Free Money', bg: '#EDE9FE', color: '#7C3AED', border: '#7C3AED' },
                    ].map((p) => (
                      <motion.div key={p.id} whileTap={{ scale: 0.98 }} onClick={() => update('provider', p.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 'var(--radius-md)', border: `2px solid ${form.provider === p.id ? p.border : 'var(--border-default)'}`, background: form.provider === p.id ? p.bg : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18 }}>{p.id[0]}</div>
                        <span style={{ fontWeight: 600, color: form.provider === p.id ? p.color : 'var(--text-primary)' }}>{p.label}</span>
                        {form.provider === p.id && <CheckCircleFill size={18} color={p.color} style={{ marginLeft: 'auto' }} />}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', gap: 12, padding: '20px 32px', borderTop: '1px solid var(--border)', background: 'var(--bg-muted)' }}>
          {step > 0 && <Button variant="outline" onClick={() => setStep((s) => s - 1)} leftIcon={<ArrowLeft size={16} />}>Retour</Button>}
          {step < 3 ? (
            <Button fullWidth onClick={next} rightIcon={<ArrowRight size={16} />}>Continuer</Button>
          ) : (
            <Button fullWidth size="lg" loading={loading} onClick={submit} leftIcon={<RocketFill size={18} />}>
              Lancer ma campagne — {(budget * form.duration).toLocaleString()} FCFA
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const lbl: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }
const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-md)', fontSize: 15, outline: 'none', color: 'var(--text-primary)', transition: 'all 0.2s', fontFamily: 'inherit' }
const sel: React.CSSProperties = { width: '100%', padding: '12px 14px', border: '2px solid var(--border-default)', borderRadius: 'var(--radius-md)', fontSize: 15, outline: 'none', background: '#fff', color: 'var(--text-primary)', cursor: 'pointer' }


