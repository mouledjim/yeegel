import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  RocketFill, GeoAltFill, PeopleFill, CurrencyExchange,
  BarChartFill, ShieldFillCheck, CheckCircleFill, ArrowRight,
  StarFill, TelephoneFill, EnvelopeFill,
} from 'react-bootstrap-icons'
import { Button } from '../components/ui/Button'
import { AnimatedCounter } from '../components/ui'
import { fadeInUp, staggerContainer, scaleIn } from '../utils/animationVariants'
import { useInView } from 'react-intersection-observer'

const features = [
  { icon: <RocketFill size={24} />, title: 'Lancement express', desc: 'En ligne en moins de 5 minutes. Crée ta pub et touche ton quartier immédiatement.', color: 'var(--primary)' },
  { icon: <GeoAltFill size={24} />, title: 'Ciblage ultra-local', desc: 'Choisis exactement les quartiers que tu veux atteindre. Pas de budget gaspillé.', color: '#0891B2' },
  { icon: <PeopleFill size={24} />, title: 'Réseau d\'ambassadeurs', desc: 'Des partageurs locaux diffusent tes annonces à leurs réseaux WhatsApp.', color: '#7C3AED' },
  { icon: <CurrencyExchange size={24} />, title: 'Mobile Money', desc: 'Paiement par Wave, Orange Money ou Free Money. Simple et sécurisé.', color: '#D97706' },
  { icon: <BarChartFill size={24} />, title: 'Stats en temps réel', desc: 'Vues, clics, appels reçus. Tu sais exactement ce qui marche.', color: '#DB2777' },
  { icon: <ShieldFillCheck size={24} />, title: 'Annonces vérifiées', desc: 'Tous les commerçants sont vérifiés. Confiance garantie pour les clients.', color: 'var(--primary)' },
]

const testimonials = [
  { name: 'Fatou Sarr', neighborhood: 'Médina', text: 'Grâce à Yéégël, j\'ai eu 30% de clients en plus en une semaine. C\'est incroyable !', rating: 5 },
  { name: 'Ibrahima Diouf', neighborhood: 'Grand Dakar', text: 'Simple, rapide, efficace. J\'ai payé avec Wave et ma pub était en ligne en 5 minutes.', rating: 5 },
  { name: 'Mariama Ba', neighborhood: 'Parcelles', text: 'L\'équipe de partageurs est fantastique. Mon salon est maintenant connu dans tout le quartier.', rating: 5 },
]

const plans = [
  { name: 'Starter', price: '500', period: 'semaine', reach: '1 000', neighborhoods: '1 quartier', color: 'var(--text-secondary)', highlight: false },
  { name: 'Pro', price: '2 000', period: 'semaine', reach: '5 000', neighborhoods: '5 quartiers', color: 'var(--primary)', highlight: true },
  { name: 'Business', price: '5 000', period: 'semaine', reach: '15 000', neighborhoods: 'Toute la ville', color: '#7C3AED', highlight: false },
]

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(247,253,249,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 22, color: 'var(--primary)' }}>
        Yéégël
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
          Se connecter
        </Button>
        <Button size="sm" onClick={() => navigate('/register')}>
          Commencer
        </Button>
      </div>
    </nav>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true })

  return (
    <div style={{ background: 'var(--bg-root)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '100vh', paddingTop: 64,
        background: 'var(--gradient-hero)',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Cercles décoratifs */}
        {[400, 600, 800].map((size, i) => (
          <div key={i} style={{
            position: 'absolute', right: -size / 3, top: '50%',
            transform: 'translateY(-50%)',
            width: size, height: size, borderRadius: '50%',
            border: `1px solid rgba(22,163,74,${0.08 - i * 0.02})`,
            pointerEvents: 'none',
          }} />
        ))}

        <div className="container" style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Texte hero */}
            <motion.div
              variants={staggerContainer}
              initial="hidden" animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--primary-light)', color: 'var(--primary-dark)',
                  padding: '6px 14px', borderRadius: 'var(--radius-full)',
                  fontSize: 13, fontWeight: 600, marginBottom: 24,
                }}>
                  <span>🇸🇳</span> Fait pour le Sénégal
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} style={{
                fontFamily: 'Space Grotesk', fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700, lineHeight: 1.1, marginBottom: 24, color: 'var(--text-primary)',
              }}>
                La régie pub{' '}
                <span style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  des quartiers
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} style={{
                fontSize: 18, color: 'var(--text-secondary)', marginBottom: 36,
                lineHeight: 1.7, maxWidth: 480,
              }}>
                Lance ta pub locale dès <strong style={{ color: 'var(--primary)' }}>500 FCFA</strong>.
                Touche tes voisins, pas le monde entier.
              </motion.p>

              <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button size="lg" onClick={() => navigate('/register')} rightIcon={<ArrowRight size={18} />}>
                  Créer ma première pub
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
                  J'ai déjà un compte
                </Button>
              </motion.div>
            </motion.div>

            {/* Illustration hero */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <HeroIllustration />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
              marginTop: 80, padding: '32px', background: '#fff',
              borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)',
            }}
          >
            {[
              { value: 2400, suffix: '+', label: 'Commerçants actifs' },
              { value: 48000, suffix: '+', label: 'Pubs diffusées' },
              { value: 380, suffix: '+', label: 'Quartiers couverts' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: 'var(--primary)' }}>
                  {statsInView && <AnimatedCounter end={stat.value} suffix={stat.suffix} separator=" " />}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-muted)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <motion.h2 variants={fadeInUp} style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, marginBottom: 16 }}>
              Comment ça marche ?
            </motion.h2>
            <motion.p variants={fadeInUp} style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
              En 3 étapes simples, ta pub touche tout ton quartier
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}
          >
            {[
              { num: '01', icon: <RocketFill size={32} />, title: 'Crée ta pub', desc: 'Décris ton business, ajoute une photo et choisis ton quartier. Prêt en 2 minutes.' },
              { num: '02', icon: <PeopleFill size={32} />, title: 'On diffuse', desc: 'Nos partageurs locaux envoient ton annonce à leurs contacts WhatsApp et réseaux.' },
              { num: '03', icon: <TelephoneFill size={32} />, title: 'Tes clients appellent', desc: 'Tu reçois des appels directement. Tu paies uniquement pour les résultats.' },
            ].map((step, i) => (
              <motion.div key={i} variants={scaleIn}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--radius-xl)', padding: 32,
                  boxShadow: 'var(--shadow-md)', textAlign: 'center', position: 'relative',
                  border: '1px solid var(--border)',
                }}>
                  <div style={{
                    position: 'absolute', top: -14, left: 24,
                    background: 'var(--gradient-primary)', color: '#fff',
                    fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 13,
                    padding: '4px 12px', borderRadius: 'var(--radius-full)',
                  }}>{step.num}</div>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'var(--primary-light)', color: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '16px auto 20px',
                  }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, marginBottom: 16 }}>
              Tout ce dont tu as besoin
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--radius-lg)', padding: 28,
                  boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)',
                  transition: 'all 0.25s ease', height: '100%',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 'var(--radius-md)',
                    background: f.color + '18', color: f.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16,
                  }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tarifs */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-muted)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, marginBottom: 16 }}>
              Des tarifs accessibles
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)' }}>Commence avec 500 FCFA. Augmente quand tu veux.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'stretch' }}>
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{
                  background: '#fff', borderRadius: 'var(--radius-xl)', padding: 32,
                  border: plan.highlight ? `2px solid ${plan.color}` : '1px solid var(--border)',
                  boxShadow: plan.highlight ? 'var(--shadow-green)' : 'var(--shadow-md)',
                  position: 'relative', display: 'flex', flexDirection: 'column',
                }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    background: plan.color, color: '#fff', fontSize: 12, fontWeight: 700,
                    padding: '4px 16px', borderRadius: 'var(--radius-full)',
                  }}>Le plus populaire</div>
                )}
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, marginBottom: 8, color: plan.color }}>
                  {plan.name}
                </div>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: 700 }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: 'var(--text-muted)' }}> FCFA/{plan.period}</span>
                </div>
                <div style={{ flex: 1 }}>
                  {[`~${plan.reach} vues estimées`, plan.neighborhoods, 'Stats en temps réel', 'Paiement Mobile Money'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <CheckCircleFill size={16} color="var(--primary)" />
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  fullWidth style={{ marginTop: 24 }}
                  onClick={() => navigate('/register')}
                >
                  Choisir ce plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, textAlign: 'center', marginBottom: 56 }}
          >
            Ils nous font confiance
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{
                  background: '#fff', borderRadius: 'var(--radius-lg)', padding: 28,
                  boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {Array(t.rating).fill(0).map((_, j) => <StarFill key={j} size={14} color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--primary)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700,
                  }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.neighborhood}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section style={{
        padding: '100px 24px',
        background: 'var(--gradient-cta)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', marginBottom: 20 }}>
            Prêt à toucher ton quartier ?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>
            Rejoins 2 400+ commerçants qui font confiance à Yéégël
          </p>
          <Button
            size="lg" onClick={() => navigate('/register')}
            style={{ background: '#fff', color: 'var(--primary)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
            rightIcon={<ArrowRight size={18} />}
          >
            Commencer gratuitement
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 24px', background: '#0F2318', color: 'rgba(255,255,255,0.7)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 20, color: 'var(--primary)', marginBottom: 6 }}>Yéégël</div>
            <div style={{ fontSize: 13 }}>La régie des quartiers — Dakar, Sénégal</div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 14 }}>
            {['À propos', 'Contact', 'Conditions', 'Confidentialité'].map((link) => (
              <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="mailto:contact@yeegel.sn" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <EnvelopeFill size={20} />
            </a>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
          © 2025 Yéégël. Fait avec amour au Sénégal.
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          section > div > div[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function HeroIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative', width: 340, height: 380 }}
    >
      {/* Phone */}
      <div style={{
        width: 200, height: 340, background: '#fff',
        borderRadius: 32, margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden', position: 'relative',
      }}>
        <div style={{ background: 'var(--gradient-primary)', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 20 }}>Yéégël</span>
        </div>
        <div style={{ padding: 16 }}>
          {[{ w: '100%', h: 12, r: 6, mb: 8 }, { w: '80%', h: 10, r: 6, mb: 16 }].map((b, i) => (
            <div key={i} style={{ width: b.w, height: b.h, background: 'var(--bg-muted)', borderRadius: b.r, marginBottom: b.mb }} />
          ))}
          <div style={{ background: 'var(--primary-light)', borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700 }}>CAMPAGNE ACTIVE</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Thiéboudienne Chez Fatou</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>8 420 vues • 342 clics</div>
          </div>
          <div style={{ background: 'var(--gradient-primary)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
            Nouvelle campagne
          </div>
        </div>
      </div>

      {/* Badges flottants */}
      {[
        { text: '342 clics', top: 40, right: -20, color: 'var(--primary)', delay: 0 },
        { text: '+500 FCFA', bottom: 80, left: -20, color: 'var(--gold)', delay: 0.5 },
        { text: '28 appels', top: '50%', right: -30, color: '#0891B2', delay: 1 },
      ].map((badge, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, delay: badge.delay }}
          style={{
            position: 'absolute', top: badge.top, bottom: badge.bottom,
            right: badge.right, left: badge.left,
            background: '#fff', border: `2px solid ${badge.color}`,
            borderRadius: 'var(--radius-full)', padding: '6px 12px',
            fontSize: 12, fontWeight: 700, color: badge.color,
            boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap',
          }}
        >{badge.text}</motion.div>
      ))}
    </motion.div>
  )
}


