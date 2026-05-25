import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload, Check, X, LogOut, Lock, Globe, Bell, Eye, EyeSlash, Question, Mail, Phone } from 'react-bootstrap-icons'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui'
import { useAppStore } from '../../store/useAppStore'
import toast from 'react-hot-toast'
import { staggerContainer, fadeInUp } from '../../utils/animationVariants'

// ── Profile Page ───────────────────────────────────────────────────────
export function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAppStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [editMode, setEditMode] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        updateProfile({ avatar: base64 })
        toast.success('Photo de profil mise à jour 📸')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast.error('Erreur lors du téléchargement')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error('Les champs nom/prénom sont obligatoires')
      return
    }
    updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    })
    setEditMode(false)
    toast.success('Profil mis à jour ✅')
  }

  if (!user) return null

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 600 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        
        {/* Header */}
        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, margin: 0 }}>Mon Profil</h1>
        </motion.div>

        {/* Avatar Section */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
            <Avatar initials={`${user.firstName[0]}${user.lastName[0]}`} size={80} imageUrl={user.avatar} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                cursor: uploading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: uploading ? 0.6 : 1,
              }}>
              {uploading ? <span style={{ fontSize: 16 }}>⏳</span> : <Upload size={16} />}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)', marginBottom: 12 }}>
            Cliquez pour changer votre photo
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '8px 12px',
            background: 'var(--bg-muted)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'clamp(12px, 2vw, 13px)',
          }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{user.firstName} {user.lastName}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--text-muted)' }}>{user.role === 'advertiser' ? '🏪' : '👥'}</span>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(14px, 2vw, 16px)' }}>
              Informations personnelles
            </h3>
            <button
              onClick={() => setEditMode(!editMode)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 'clamp(12px, 2vw, 13px)',
              }}>
              {editMode ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {editMode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                  Prénom
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '2px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'clamp(13px, 2vw, 14px)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                  Nom
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '2px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'clamp(13px, 2vw, 14px)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '2px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'clamp(13px, 2vw, 14px)',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button fullWidth onClick={handleSave}>Enregistrer</Button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: 'var(--text-muted)', marginBottom: 4 }}>Prénom</div>
                <div style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: 600, color: 'var(--text-primary)' }}>{user.firstName}</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: 'var(--text-muted)', marginBottom: 4 }}>Nom</div>
                <div style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: 600, color: 'var(--text-primary)' }}>{user.lastName}</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: 'var(--text-muted)', marginBottom: 4 }}>Email</div>
                <div style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: 600, color: 'var(--text-primary)' }}>{user.email || '—'}</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: 'var(--text-muted)', marginBottom: 4 }}>Téléphone</div>
                <div style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: 600, color: 'var(--text-primary)' }}>{user.phone}</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: 'var(--text-muted)', marginBottom: 4 }}>Inscrit depuis</div>
                <div style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: 600, color: 'var(--text-primary)' }}>{user.joinDate}</div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Settings Page ───────────────────────────────────────────────────────
export function SettingsPage() {
  const navigate = useNavigate()
  const { user, logout } = useAppStore()
  
  const [settings, setSettings] = useState({
    language: user?.language || 'Français',
    notificationsEnabled: true,
    emailNotifications: true,
    twoFactorEnabled: false,
    privateProfile: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success('Paramètres mises à jour ✅')
  }

  const handleLogout = () => {
    logout()
    toast.success('Déconnecté 👋')
    navigate('/login')
  }

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 600 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        
        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, margin: 0 }}>Paramètres</h1>
        </motion.div>

        {/* Language */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Globe size={20} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 15px)', color: 'var(--text-primary)' }}>Langue</div>
                <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)', marginTop: 2 }}>{settings.language}</div>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}
              style={{
                padding: '6px 10px',
                border: '2px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'clamp(12px, 2vw, 13px)',
                background: '#fff',
              }}>
              <option value="Français">Français</option>
              <option value="Wolof">Wolof</option>
              <option value="Anglais">Anglais</option>
            </select>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Bell size={20} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 15px)', color: 'var(--text-primary)' }}>Notifications push</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notificationsEnabled')}
              style={{
                width: 48,
                height: 28,
                borderRadius: '14px',
                border: 'none',
                background: settings.notificationsEnabled ? 'var(--primary)' : 'var(--border-default)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: 'background 0.2s',
              }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '12px',
                background: '#fff',
                marginLeft: settings.notificationsEnabled ? 'auto' : 0,
                transition: 'margin-left 0.2s',
              }} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mail size={20} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 15px)', color: 'var(--text-primary)' }}>Emails</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              style={{
                width: 48,
                height: 28,
                borderRadius: '14px',
                border: 'none',
                background: settings.emailNotifications ? 'var(--primary)' : 'var(--border-default)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: 'background 0.2s',
              }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '12px',
                background: '#fff',
                marginLeft: settings.emailNotifications ? 'auto' : 0,
                transition: 'margin-left 0.2s',
              }} />
            </button>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Lock size={20} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 15px)', color: 'var(--text-primary)' }}>Profil privé</div>
                <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)', marginTop: 2 }}>Masquer vos stats publiquement</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('privateProfile')}
              style={{
                width: 48,
                height: 28,
                borderRadius: '14px',
                border: 'none',
                background: settings.privateProfile ? 'var(--primary)' : 'var(--border-default)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
                transition: 'background 0.2s',
              }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '12px',
                background: '#fff',
                marginLeft: settings.privateProfile ? 'auto' : 0,
                transition: 'margin-left 0.2s',
              }} />
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div variants={fadeInUp}>
          <Button fullWidth variant="danger" onClick={handleLogout} leftIcon={<LogOut size={16} />}>
            Déconnexion
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Help Page ───────────────────────────────────────────────────────
export function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Comment créer une campagne?',
      a: 'Allez dans "Mes Campagnes", cliquez sur "Créer une campagne", remplissez les détails et confirmez. Votre annonce sera visible instantanément.',
    },
    {
      q: 'Combien de points je gagne par partage?',
      a: 'Vous gagnez 5 points à chaque fois que quelqu\'un clique sur une annonce que vous partagez. Plus de clics = plus de points!',
    },
    {
      q: 'Comment convertir mes points en argent?',
      a: '100 points = 500 FCFA. Allez dans "Gains", cliquez "Convertir", et nous vireons l\'argent sur votre compte Mobile Money.',
    },
    {
      q: 'Quel budget minimum pour une campagne?',
      a: 'Le minimum est 5,000 FCFA. Vous pouvez augmenter votre budget à tout moment pour plus de visibilité.',
    },
    {
      q: 'Puis-je modifier ma campagne après création?',
      a: 'Oui! Allez dans "Mes Campagnes", sélectionnez votre annonce, cliquez "Modifier" et changez ce que vous voulez.',
    },
    {
      q: 'Comment fonctionnent les avis/notes?',
      a: 'Après un achat, les clients peuvent laisser un avis sur votre commerçant. Plus d\'étoiles = meilleure réputation!',
    },
  ]

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 600 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        
        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, margin: 0 }}>Centre d'aide</h1>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 700, marginBottom: 16 }}>
            Questions fréquentes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(16px, 4vw, 20px)',
                  cursor: 'pointer',
                  border: expandedFaq === i ? '2px solid var(--primary)' : '1px solid var(--border)',
                }}
                whileHover={{ backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 15px)', color: 'var(--text-primary)' }}>
                    {faq.q}
                  </div>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: expandedFaq === i ? 'var(--primary)' : 'var(--bg-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: expandedFaq === i ? '#fff' : 'var(--text-muted)',
                    fontSize: 16,
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}>
                    {expandedFaq === i ? '−' : '+'}
                  </div>
                </div>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ marginTop: 12, fontSize: 'clamp(13px, 2vw, 14px)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Space Grotesk', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 700 }}>
            Nous contacter
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="mailto:support@yeegel.com" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <Mail size={20} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(13px, 2vw, 14px)' }}>Email</div>
                <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)' }}>support@yeegel.com</div>
              </div>
            </a>
            <a href="tel:+221771234567" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-primary)' }}>
              <Phone size={20} color="var(--primary)" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'clamp(13px, 2vw, 14px)' }}>WhatsApp</div>
                <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)' }}>+221 77 123 45 67</div>
              </div>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Payments Page ───────────────────────────────────────────────────────
export function PaymentsPage() {
  const { user } = useAppStore()
  const [showWithdrawal, setShowWithdrawal] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')

  const pointsBalance = user?.points || 0
  const fcfaValue = Math.floor((pointsBalance / 100) * 500)
  const conversionRate = 100

  const handleWithdraw = () => {
    if (!withdrawalAmount || parseInt(withdrawalAmount) <= 0) {
      toast.error('Veuillez entrer un montant valide')
      return
    }
    if (parseInt(withdrawalAmount) > fcfaValue) {
      toast.error('Vous n\'avez pas assez de points')
      return
    }
    toast.success('Demande de retrait envoyée! 📤')
    setShowWithdrawal(false)
    setWithdrawalAmount('')
  }

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 600 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        
        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, margin: 0 }}>Mes Gains</h1>
        </motion.div>

        {/* Points Balance */}
        <motion.div variants={fadeInUp} style={{
          background: 'var(--gradient-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(20px, 5vw, 32px)',
          color: '#fff',
          marginBottom: 24,
        }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 'clamp(13px, 2vw, 14px)', opacity: 0.8, marginBottom: 4 }}>Solde en points</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px, 8vw, 48px)', fontWeight: 700 }}>
              {pointsBalance.toLocaleString()}
            </div>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: 16 }} />
          <div>
            <div style={{ fontSize: 'clamp(13px, 2vw, 14px)', opacity: 0.8, marginBottom: 4 }}>Équivalent en FCFA</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 700 }}>
              {fcfaValue.toLocaleString()} FCFA
            </div>
          </div>
        </motion.div>

        {/* Conversion Info */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
          marginBottom: 24,
          border: '2px solid var(--primary-light)',
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ fontSize: 28 }}>📊</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 'clamp(14px, 2vw, 15px)', marginBottom: 4, color: 'var(--text-primary)' }}>
                Taux de conversion
              </div>
              <div style={{ fontSize: 'clamp(13px, 2vw, 14px)', color: 'var(--text-muted)' }}>
                {conversionRate} points = 500 FCFA
              </div>
            </div>
          </div>
        </motion.div>

        {/* Withdrawal Section */}
        {showWithdrawal ? (
          <motion.div variants={fadeInUp} style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(16px, 4vw, 24px)',
            marginBottom: 24,
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Space Grotesk', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 700 }}>
              Demander un retrait
            </h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Montant (FCFA)
              </label>
              <input
                type="number"
                value={withdrawalAmount}
                onChange={e => setWithdrawalAmount(e.target.value)}
                placeholder="ex: 5000"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ marginTop: 8, fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)' }}>
                Max: {fcfaValue.toLocaleString()} FCFA
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button fullWidth onClick={handleWithdraw}>Demander</Button>
              <Button fullWidth variant="secondary" onClick={() => setShowWithdrawal(false)}>Annuler</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={fadeInUp}>
            <Button fullWidth size="lg" onClick={() => setShowWithdrawal(true)}>
              Demander un retrait
            </Button>
          </motion.div>
        )}

        {/* Recent Transactions */}
        <motion.div variants={fadeInUp} style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(16px, 4vw, 24px)',
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontFamily: 'Space Grotesk', fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 700 }}>
            Historique récent
          </h3>
          <div style={{ color: 'var(--text-muted)', fontSize: 'clamp(13px, 2vw, 14px)', textAlign: 'center', padding: '24px' }}>
            Aucune transaction pour le moment
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Notifications Page ───────────────────────────────────────────────────────
export function NotificationsPage() {
  const { notifications, markNotifRead } = useAppStore()
  const unread = notifications.filter(n => n.unread).length

  const notifIcon: Record<string, JSX.Element> = {
    success: <Check size={18} color="var(--primary)" />,
    info: <Bell size={18} color="#0891B2" />,
    warning: <span style={{ fontSize: 14 }}>⚠️</span>,
    error: <X size={18} color="var(--error)" />,
  }

  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 700 }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        
        <motion.div variants={fadeInUp} style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 700, margin: 0 }}>
            Notifications
          </h1>
          {unread > 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(13px, 2vw, 14px)', marginTop: 4 }}>
              {unread} non lue(s)
            </p>
          )}
        </motion.div>

        {notifications.length === 0 ? (
          <motion.div variants={fadeInUp} style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: 'var(--text-muted)',
          }}>
            <Bell size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              Aucune notification
            </div>
            <div style={{ fontSize: 'clamp(13px, 2vw, 14px)' }}>
              Vous recevrez des notifications ici
            </div>
          </motion.div>
        ) : (
          <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {notifications.map((notif, i) => (
              <motion.div
                key={notif.id}
                variants={fadeInUp}
                onClick={() => markNotifRead(notif.id)}
                style={{
                  background: notif.unread ? 'var(--primary-light)' : '#fff',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(12px, 3vw, 16px)',
                  border: `1px solid ${notif.unread ? 'var(--primary)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                whileHover={{ translateX: 4 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    {notifIcon[notif.type] || notifIcon.info}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 'clamp(13px, 2vw, 14px)', color: 'var(--text-primary)', marginBottom: 2 }}>
                      {notif.message}
                    </div>
                    <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)' }}>
                      {new Date(parseInt(notif.id)).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  {notif.unread && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// ── 404 Page ───────────────────────────────────────────────────────
export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 400 }}>
        <div style={{ fontSize: '96px', marginBottom: '24px' }}>🔍</div>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(24px, 8vw, 48px)', fontWeight: 700, marginBottom: '12px' }}>
          Page non trouvée
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--text-muted)', marginBottom: '32px' }}>
          La page que vous cherchez n'existe pas.
        </p>
        <Button fullWidth onClick={() => navigate('/')}>
          Retourner à l'accueil
        </Button>
      </motion.div>
    </div>
  )
}

// ── Analytics Page (Analytics placeholder) ───────────────────────────────────────────────────────
export function AnalyticsPage() {
  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', maxWidth: 1200, textAlign: 'center', color: 'var(--text-muted)' }}>
      <h1>Analytics</h1>
      <p>Page en construction 🔨</p>
    </div>
  )
}
