import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/useAppStore'
import toast from 'react-hot-toast'
import { staggerContainer, fadeInUp } from '../utils/animationVariants'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAppStore(s => s.login)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!phone.trim()) {
      toast.error('Veuillez entrer votre numéro')
      return
    }

    const phoneDigits = phone.replace(/\D/g, '')
    if (phoneDigits.length < 9) {
      toast.error('Le numéro doit contenir 9 chiffres')
      return
    }

    if (!password) {
      toast.error('Veuillez entrer votre mot de passe')
      return
    }

    setLoading(true)

    try {
      const result = login(phone, password)

      if (!result.success) {
        toast.error(result.error || 'Erreur lors de la connexion')
        setLoading(false)
        return
      }

      toast.success('Connexion réussie ! 🎉')
      
      // Redirect based on user role
      const user = useAppStore.getState().user
      setTimeout(() => {
        navigate(user?.role === 'advertiser' ? '/dashboard' : '/sharer')
      }, 1000)
    } catch (error) {
      toast.error('Une erreur est survenue')
      setLoading(false)
    }
  }

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
          maxWidth: 400,
          background: '#fff',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'clamp(24px, 5vw, 40px)',
        }}>

        {/* Header */}
        <motion.div variants={fadeInUp} style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: 'Space Grotesk',
            fontSize: 'clamp(22px, 5vw, 28px)',
            fontWeight: 700,
            margin: '0 0 12px 0',
          }}>
            Connexion
          </h1>
          <p style={{
            fontSize: 'clamp(13px, 2vw, 14px)',
            color: 'var(--text-muted)',
            margin: 0,
          }}>
            Tu n'as pas de compte ?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}>
              S'inscrire
            </button>
          </p>
        </motion.div>

        {/* Form */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Phone */}
          <motion.div variants={fadeInUp}>
            <label style={{
              display: 'block',
              fontSize: 'clamp(13px, 2vw, 14px)',
              fontWeight: 600,
              marginBottom: 8,
              color: 'var(--text-secondary)',
            }}>
              Numéro WhatsApp *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+221 77 123 45 67"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '2px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'clamp(13px, 2vw, 14px)',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={fadeInUp}>
            <label style={{
              display: 'block',
              fontSize: 'clamp(13px, 2vw, 14px)',
              fontWeight: 600,
              marginBottom: 8,
              color: 'var(--text-secondary)',
            }}>
              Mot de passe *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  paddingRight: 40,
                  border: '2px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--primary)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-default)' }}
              />
              <button
                type="button"
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

          {/* Submit */}
          <motion.div variants={fadeInUp} style={{ marginTop: 8 }}>
            <Button
              fullWidth
              size="lg"
              onClick={handleLogin}
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </motion.div>

          {/* Help link */}
          <motion.div variants={fadeInUp} style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/help')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: 'clamp(12px, 2vw, 13px)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}>
              Mot de passe oublié ?
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
