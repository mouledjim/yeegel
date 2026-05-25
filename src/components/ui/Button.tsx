import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold' | 'wave' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  style?: React.CSSProperties
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'inherit', fontWeight: 600, borderRadius: 'var(--radius-full)',
    border: 'none', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
    whiteSpace: 'nowrap',
  },
  primary: {
    background: 'var(--gradient-primary)', color: '#fff',
    boxShadow: 'var(--shadow-green)',
  },
  secondary: {
    background: 'var(--primary-light)', color: 'var(--primary-dark)',
  },
  outline: {
    background: 'transparent', color: 'var(--primary)',
    border: '2px solid var(--primary)',
  },
  ghost: {
    background: 'transparent', color: 'var(--text-secondary)',
  },
  danger: {
    background: '#FEE2E2', color: '#DC2626',
  },
  gold: {
    background: 'var(--gradient-gold)', color: '#fff',
    boxShadow: 'var(--shadow-gold)',
  },
  wave: {
    background: 'var(--wave)', color: '#fff',
  },
  sm: { fontSize: 13, padding: '8px 16px', height: 36 },
  md: { fontSize: 14, padding: '10px 22px', height: 44 },
  lg: { fontSize: 16, padding: '14px 32px', height: 54 },
}

export function Button({
  children, variant = 'primary', size = 'md',
  loading, disabled, fullWidth, leftIcon, rightIcon,
  onClick, type = 'button', style
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      style={{
        ...styles.base,
        ...styles[variant],
        ...styles[size],
        width: fullWidth ? '100%' : undefined,
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {loading ? (
        <span style={{
          width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: '#fff', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', display: 'inline-block'
        }} />
      ) : leftIcon}
      {!loading && children}
      {!loading && rightIcon}
    </motion.button>
  )
}


