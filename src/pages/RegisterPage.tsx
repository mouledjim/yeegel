import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeSlash } from 'react-bootstrap-icons'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'
import { staggerContainer, fadeInUp } from '../utils/animationVariants'

const cities = ['Dakar', 'Thiès', 'Kaolack', 'Tambacounda', 'Saint-Louis', 'Kolda']
const neighborhoods = {
  Dakar: ['Médina', 'Plateau', 'Grand Dakar', 'Parcelles Assainies', 'Sacré-Cœur', 'Yoff', 'Almadies'],
  Thiès: ['Centre-ville', 'Thiès-Kaolack', 'Kaolack'],
  Kaolack: ['Centre', 'Kahone'],
  Tambacounda: ['Centre', 'Sénéga'],
  'Saint-Louis': ['Centre', 'Sor'],
  Kolda: ['Centre'],
}
const languages = ['Français', 'Wolof', 'Anglais']
const roles = [
  { value: 'advertiser', label: 'Je suis commerçant', icon: '🏪', desc: 'Je veux promouvoir mon business' },
  { value: 'sharer', label: 'Je suis partageur', icon: '👥', desc: 'Je veux gagner en partageant' },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const register = useAppStore(s => s.register)

  const [step, setStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    neighborhood: '',
    language: '',
    role: '' as 'advertiser' | 'sharer' | '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateStep0 = () => {
    if (!formData.firstName.trim()) {
      toast.error('Veuillez entrer votre prénom')
      return false
    }
    if (!formData.lastName.trim()) {
      toast.error('Veuillez entrer votre nom')
      return false
    }
    if (!formData.phone.trim()) {
      toast.error('Veuillez entrer votre numéro')
      return false
    }
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 9) {
      toast.error('Le numéro doit contenir 9 chiffres')
      return false
    }
    if (!formData.password) {
      toast.error('Veuillez entrer un mot de passe')
      return false
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return false
    }
    return true
  }

  const validateStep1 = () => {
    if (!formData.city) {
      toast.error('Veuillez sélectionner une ville')
      return false
    }
    if (!formData.neighborhood) {
      toast.error('Veuillez sélectionner un quartier')
      return false
    }
    if (!formData.language) {
      toast.error('Veuillez sélectionner une langue')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.role) {
      toast.error('Veuillez sélectionner votre rôle')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    if (step < 2) setStep(step + 1)
  }

  const handleSubmit = () => {
    if (!validateStep2()) return

    const result = register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      city: formData.city,
      neighborhood: formData.neighborhood,
      language: formData.language,
      role: formData.role as 'advertiser' | 'sharer',
    })

    if (!result.success) {
      toast.error(result.error || 'Erreur lors de l\'inscription')
      return
    }

    toast.success('Compte créé avec succès ! 🎉')
    setTimeout(() => {
      navigate(formData.role === 'advertiser' ? '/dashboard' : '/sharer')
    }, 1000)
  }

  const availableNeighborhoods = neighborhoods[formData.city as keyof typeof neighborhoods] || []


  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gradient-hero)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(20px, 5vw, 40px)',
    }}>
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        style={{
          width: '100%',
          maxWidth: 500,
          background: '#fff',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'clamp(24px, 5vw, 40px)',
        }}>

        {/* Header */}
        <motion.div variants={fadeInUp} style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)}
              style={{
                background: 'var(--bg-muted)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
              }}>
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 700, margin: '0 0 4px 0' }}>
              {step === 0 ? 'Créer un compte' : step === 1 ? 'Localisation' : 'Choisir votre rôle'}
            </h1>
            <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)' }}>
              Étape {step + 1} sur 3
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div variants={fadeInUp} style={{
          height: 4,
          background: 'var(--bg-muted)',
          borderRadius: 'var(--radius-full)',
          marginBottom: 32,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((step + 1) / 3) * 100}%`,
            background: 'var(--gradient-primary)',
            transition: 'width 0.3s ease',
          }} />
        </motion.div>

        {/* Step 0 - Identité */}
        {step === 0 && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Prénom */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Prénom *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Mohamed"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
              />
            </motion.div>

            {/* Nom */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Nom *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Sarr"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
              />
            </motion.div>

            {/* Téléphone */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Numéro WhatsApp * <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>(format: +221 XX XXX XX XX)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+221 77 123 45 67"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Email <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>(optionnel)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="vous@example.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
              />
            </motion.div>

            {/* Mot de passe */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Mot de passe * <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>(minimum 6 caractères)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 12px',
                    border: '2px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'clamp(13px, 2vw, 14px)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: 0,
                  }}>
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* Confirmer mot de passe */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Confirmer mot de passe *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'clamp(13px, 2vw, 14px)',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: 0,
                  }}>
                  {showConfirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* Bouton */}
            <motion.div variants={fadeInUp} style={{ marginTop: 16 }}>
              <Button fullWidth size="lg" onClick={handleNext}>
                Suivant
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 1 - Localisation */}
        {step === 1 && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Ville */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 8, color: 'var(--text-secondary)' }}>
                Ville
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  background: '#fff',
                  cursor: 'pointer',
                }}>
                <option value="">Sélectionner une ville</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </motion.div>

            {/* Quartier */}
            {formData.city && (
              <motion.div variants={fadeInUp}>
                <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 10, color: 'var(--text-secondary)' }}>
                  Quartier
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
                  {availableNeighborhoods.map(n => (
                    <button
                      key={n}
                      onClick={() => setFormData(prev => ({ ...prev, neighborhood: n }))}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: formData.neighborhood === n ? '2px solid var(--primary)' : '2px solid var(--border-default)',
                        background: formData.neighborhood === n ? 'var(--primary-light)' : 'transparent',
                        color: formData.neighborhood === n ? 'var(--primary)' : 'var(--text-secondary)',
                        fontSize: 'clamp(12px, 2vw, 13px)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Langue */}
            <motion.div variants={fadeInUp}>
              <label style={{ display: 'block', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600, marginBottom: 10, color: 'var(--text-secondary)' }}>
                Langue préférée
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setFormData(prev => ({ ...prev, language: lang }))}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: formData.language === lang ? '2px solid var(--primary)' : '2px solid var(--border-default)',
                      background: formData.language === lang ? 'var(--primary-light)' : 'transparent',
                      color: formData.language === lang ? 'var(--primary)' : 'var(--text-secondary)',
                      fontSize: 'clamp(12px, 2vw, 13px)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                    {lang}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Bouton */}
            <motion.div variants={fadeInUp} style={{ marginTop: 16 }}>
              <Button fullWidth size="lg" onClick={handleNext}>
                Suivant
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2 - Rôle */}
        {step === 2 && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {roles.map((role) => (
              <motion.div
                key={role.value}
                variants={fadeInUp}
                onClick={() => setFormData(prev => ({ ...prev, role: role.value as 'advertiser' | 'sharer' }))}
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-lg)',
                  border: formData.role === role.value ? '2px solid var(--primary)' : '2px solid var(--border-default)',
                  background: formData.role === role.value ? 'var(--primary-light)' : 'var(--bg-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                whileHover={{ scale: 1.02 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 28 }}>{role.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--text-primary)' }}>
                      {role.label}
                    </div>
                    <div style={{ fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)', marginTop: 4 }}>
                      {role.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Bouton */}
            <motion.div variants={fadeInUp} style={{ marginTop: 16 }}>
              <Button fullWidth size="lg" onClick={handleSubmit}>
                Créer mon compte
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div variants={fadeInUp} style={{ marginTop: 24, textAlign: 'center', fontSize: 'clamp(12px, 2vw, 13px)', color: 'var(--text-muted)' }}>
          Tu as déjà un compte ?{' '}
          <button onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}>
            Se connecter
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}


