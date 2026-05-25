import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

// ── Card ──────────────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode
  hoverable?: boolean
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  padding?: number | string
}

export function Card({ children, hoverable, style, onClick, padding = 24 }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { y: -4, boxShadow: 'var(--shadow-lg)' } : undefined}
      style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        padding,
        border: '1px solid var(--border)',
        cursor: onClick ? 'pointer' : undefined,
        transition: 'box-shadow 0.25s ease',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────
type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'gold' | 'purple'

const badgeColors: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: '#DCFCE7', color: '#15803D' },
  warning: { bg: '#FEF3C7', color: '#B45309' },
  error:   { bg: '#FEE2E2', color: '#B91C1C' },
  info:    { bg: '#CFFAFE', color: '#0E7490' },
  gold:    { bg: '#FEF3C7', color: '#92400E' },
  purple:  { bg: '#EDE9FE', color: '#6D28D9' },
  default: { bg: '#F3F4F6', color: '#374151' },
}

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  dot?: boolean
  icon?: ReactNode
  size?: 'sm' | 'md'
}

export function Badge({ label, variant = 'default', dot, icon, size = 'md' }: BadgeProps) {
  const c = badgeColors[variant]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.color,
      padding: size === 'sm' ? '2px 8px' : '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: size === 'sm' ? 11 : 12,
      fontWeight: 600, whiteSpace: 'nowrap',
    }}>
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: c.color, animation: 'pulse-green 2s infinite',
          display: 'inline-block',
        }} />
      )}
      {icon}
      {label}
    </span>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────
interface AvatarProps {
  initials: string
  size?: number
  color?: string
  imageUrl?: string | null
}

export function Avatar({ initials, size = 40, color = 'var(--primary)', imageUrl }: AvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
        alt={initials}
      />
    )
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 700, fontSize: size * 0.35,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

// ── AnimatedCounter ───────────────────────────────────────────────────
interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  separator?: string
  style?: React.CSSProperties
}

export function AnimatedCounter({
  end, prefix = '', suffix = '', duration = 1.5,
  decimals = 0, separator = ' ', style
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <span ref={ref} style={style}>
      {inView ? (
        <CountUp
          start={0} end={end} duration={duration}
          prefix={prefix} suffix={suffix}
          decimals={decimals} separator={separator}
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}

// ── ProgressBar ───────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number // 0-100
  color?: string
  height?: number
  showLabel?: boolean
  animated?: boolean
}

export function ProgressBar({
  value, color = 'var(--primary)', height = 8, showLabel, animated = true
}: ProgressBarProps) {
  return (
    <div>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: 'var(--text-muted)' }}>
          <span>Progression</span>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{Math.round(value)}%</span>
        </div>
      )}
      <div style={{
        background: 'var(--bg-muted)', borderRadius: 'var(--radius-full)',
        height, overflow: 'hidden',
      }}>
        <motion.div
          initial={animated ? { width: 0 } : undefined}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            height: '100%', background: color,
            borderRadius: 'var(--radius-full)',
          }}
        />
      </div>
    </div>
  )
}

// ── Input ─────────────────────────────────────────────────────────────
interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
  required?: boolean
  disabled?: boolean
  style?: React.CSSProperties
}

export function Input({
  label, placeholder, value, onChange, type = 'text',
  leftIcon, rightIcon, error, required, disabled, style
}: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}{required && <span style={{ color: 'var(--error)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', display: 'flex',
          }}>
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          style={{
            width: '100%',
            padding: leftIcon ? '12px 14px 12px 42px' : rightIcon ? '12px 42px 12px 14px' : '12px 14px',
            border: `2px solid ${error ? 'var(--error)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius-md)',
            fontSize: 15,
            background: disabled ? 'var(--bg-muted)' : '#fff',
            color: 'var(--text-primary)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)'
            e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--error)' : 'var(--border-default)'
            e.target.style.boxShadow = 'none'
          }}
        />
        {rightIcon && (
          <span style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-muted)', display: 'flex', cursor: 'pointer',
          }}>
            {rightIcon}
          </span>
        )}
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--error)' }}>{error}</span>}
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────
export function Spinner({ size = 24, color = 'var(--primary)' }: { size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `3px solid ${color}22`,
      borderTopColor: color,
      animation: 'spin 0.8s linear infinite',
      flexShrink: 0,
    }} />
  )
}


