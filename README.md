# 🇸🇳 Yéégël - La régie pub des quartiers

**Yéégël** est une plateforme de publicité ultra-locale qui connecte les commerçants sénégalais avec les résidents de leurs quartiers via un réseau d'ambassadeurs WhatsApp.

## 🎯 À propos du projet

Yéégël résout le problème majeur des petits commerces sénégalais : **comment atteindre efficacement les clients locaux sans dépenser une fortune en publicité traditionnelle** ?

Notre solution :
- 📍 **Ciblage ultra-local** : Publicités ciblées par quartier (Médina, Parcelles, Grand Dakar, etc.)
- 👥 **Réseau d'ambassadeurs** : Des partageurs locaux diffusent les annonces à leurs réseaux WhatsApp
- 💰 **Paiement mobile** : Paiement simple via Wave, Orange Money ou Free Money
- 📊 **Analytics en temps réel** : Vues, clics, appels et partages suivis en direct
- 🚀 **Lancement express** : Votre campagne en ligne en moins de 5 minutes

## 📱 Rôles utilisateurs

### 👨‍💼 Annonceurs (Commerçants)
- Créer et gérer des campagnes publicitaires
- Consulter les statistiques en temps réel (vues, clics, appels, partages)
- Gérer les paiements et les retraits
- Analyser les performances par quartier

### 👥 Partageurs (Ambassadeurs)
- Découvrir les annonces disponibles dans leur quartier
- Gagner des points en partageant les annonces
- Convertir les points en revenus (FCFA)
- Participer à la ligue hebdomadaire pour remporter des récompenses

## 🛠 Stack technique

### Frontend
- **Framework** : React 18+ avec TypeScript
- **Build tool** : Vite
- **Animations** : Framer Motion
- **Charts** : Recharts
- **Icons** : React Bootstrap Icons
- **Design** : CSS Grid + Media queries responsives
- **State management** : Zustand-like store
- **Notifications** : React Hot Toast
- **Date/Time** : Dayjs

### Architecture

```
src/
├── components/
│   ├── ui/              # Composants réutilisables (Card, Badge, Avatar, etc.)
│   └── layout/          # Layout global (AppLayout, Sidebar)
├── pages/
│   ├── LandingPage.tsx  # Page d'accueil publique
│   ├── LoginPage.tsx    # Connexion
│   ├── RegisterPage.tsx # Inscription
│   ├── advertiser/      # Tableau de bord annonceur
│   │   ├── Dashboard.tsx
│   │   ├── Campaigns.tsx
│   │   └── CreateCampaign.tsx
│   ├── sharer/          # Tableau de bord partageur
│   │   └── Dashboard.tsx
│   └── shared/          # Pages communes (Profil, Notifications, Aide)
│       └── SharedPages.tsx
├── store/               # Gestion d'état (useAppStore)
├── data/                # Données mock/fixtures
├── hooks/               # Custom hooks
├── utils/               # Utilitaires (animations, formatage, etc.)
└── styles/              # CSS global
```

## 🎨 Design System

### Couleurs principales
- **Primaire** : #16A34A (Vert Dakar)
- **Texte secondaire** : #4B5563
- **Fond muted** : #F3F4F6
- **Or** : #FBBF24 (Pour les récompenses)
- **Erreur** : #EF4444
- **Succès** : #10B981

### Typographie
- **Font** : Space Grotesk (headings), Inter/system (body)
- **Responsive** : Utilise `clamp()` pour la fluidité
- **Breakpoints** : 
  - Desktop : 1024px+
  - Tablet : 768px - 1023px
  - Mobile : < 768px

### Responsive Design
L'application est **100% responsive** avec media queries CSS à 3 breakpoints :
- `@media (max-width: 1024px)` - Tablets
- `@media (max-width: 768px)` - Mobiles larges
- `@media (max-width: 480px)` - Mobiles petits

## 🚀 Installation et démarrage

### Prérequis
- Node.js 16+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/mouledjim/yeegel.git
cd yeegel

# Installer les dépendances
npm install
```

### Démarrage du serveur de développement

```bash
npm run dev
```

L'application s'ouvrira automatiquement à `http://localhost:3000`

### Build pour production

```bash
npm run build
```

Génère un dossier `dist/` optimisé pour le déploiement.

## 📦 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer le serveur de développement |
| `npm run build` | Compiler TypeScript et construire avec Vite |
| `npm run preview` | Prévisualiser le build production localement |

## 🌐 Déploiement

### Sur Vercel

1. **Connecter le repository GitHub**
   ```
   https://github.com/mouledjim/yeegel
   ```

2. **Configurer les variables d'environnement** (si nécessaire)
   - Ajouter dans les settings Vercel

3. **Déploiement automatique**
   - Chaque push sur `main` déclenche un déploiement automatique

4. **Configuration build**
   ```
   Build Command: npm run build
   Output Directory: dist
   ```

### En local (preview)

```bash
npm run build
npm run preview
```

## 📊 Fonctionnalités principales

### Pour les annonceurs
- ✅ Créer une campagne en 4 étapes simples
- ✅ Voir les stats en temps réel
- ✅ Cibler des quartiers spécifiques
- ✅ Gérer le budget et les paiements
- ✅ Consulter l'historique des campagnes

### Pour les partageurs
- ✅ Découvrir les annonces à partager
- ✅ Gagner des points par clic généré
- ✅ Retirer les gains via Wave
- ✅ Participer à la ligue hebdomadaire
- ✅ Voir son classement

### Pages communes
- ✅ Profil utilisateur
- ✅ Notifications
- ✅ Centre d'aide (FAQ)
- ✅ Contact et support

## 🔒 Sécurité

- **TypeScript** : Typage strict pour éviter les erreurs runtime
- **Validation** : Validation des données côté client
- **HTTPS** : Toujours utilisé en production (Vercel)
- **Mobile Money** : Intégration sécurisée des passerelles Wave/Orange/Free

## 📈 Performance

- **Build optimisé** : ~500KB gzippé après minification
- **Code splitting** : Recharts chargé dynamiquement
- **Images optimisées** : Format moderne avec fallbacks
- **SEO** : Meta tags, sitemap, robots.txt

## 🎯 Prochaines évolutions

- [ ] Authentification par SMS
- [ ] Système de recommandations IA
- [ ] Support multi-langues (Wolof, Français, Anglais)
- [ ] App mobile native (React Native)
- [ ] Intégration CRM pour les annonceurs
- [ ] Système de notation/avis
- [ ] Webhooks pour intégrations tierces

## 👥 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact et support

- **Email** : support@yeegel.sn
- **Téléphone** : +221 77 000 00 00
- **WhatsApp** : [Contact WhatsApp](https://wa.me/221770000000)
- **Site web** : https://yeegel.sn
- **GitHub** : https://github.com/mouledjim/yeegel

## 🙏 Remerciements

- L'équipe de Dakar pour l'inspiration
- La communauté React et TypeScript
- Tous les contributeurs et utilisateurs bêta

---

**Fait avec ❤️ au Sénégal 🇸🇳**
