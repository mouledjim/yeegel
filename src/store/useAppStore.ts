import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ───────────────────────────────────────────────────────────────
// INTERFACES
// ───────────────────────────────────────────────────────────────

export interface User {
  id: string
  firstName: string
  lastName: string
  name: string
  phone: string
  email: string
  role: 'advertiser' | 'sharer'
  city: string
  neighborhood: string
  language: string
  password: string
  avatar: string | null
  points: number
  balance: number
  reputationScore: number
  totalViews: number
  totalClicks: number
  totalCalls: number
  totalShares: number
  totalCampaigns: number
  totalSpent: number
  isVerified: boolean
  initials: string
  joinDate: string
}

export interface Campaign {
  id: string
  advertiserId: string
  title: string
  description: string
  category: string
  color: string
  status: 'active' | 'paused' | 'completed'
  neighborhood: string
  neighborhoods: string[]
  city: string
  language: string
  phoneNumber: string
  budget: number
  spent: number
  views: number
  clicks: number
  calls: number
  shares: number
  startDate: string
  endDate: string
  createdAt: string
  weeklyData?: { day: string; views: number; clicks: number; calls: number }[]
  sub?: string
}

export interface Notification {
  id: string
  title: string
  body: string
  type: 'success' | 'info' | 'warning' | 'error'
  time: string
  unread: boolean
  userId: string
}

export interface Review {
  id: string
  authorId: string
  authorName: string
  authorInitials: string
  authorAvatar: string | null
  targetId: string
  rating: number
  comment: string
  date: string
  type: 'campaign' | 'advertiser'
}

export interface RegisterData {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  city: string
  neighborhood: string
  language: string
  role: 'advertiser' | 'sharer'
}

// ───────────────────────────────────────────────────────────────
// STORE
// ───────────────────────────────────────────────────────────────

interface AppState {
  user: User | null
  isAuthenticated: boolean
  allUsers: User[]
  campaigns: Campaign[]
  notifications: Notification[]
  reviews: Review[]
  myShares: { campaignId: string; sharedAt: string; clicks: number }[]
  contactMessages: { name: string; email: string; message: string; date: string }[]
  sidebarOpen: boolean

  // Auth
  register: (data: RegisterData) => { success: boolean; error?: string }
  login: (phone: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  updateAvatar: (base64: string) => void

  // Campaigns
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  addShare: (campaignId: string) => void

  // Reviews
  addReview: (review: Review) => void
  getReviewsForTarget: (targetId: string) => Review[]

  // Notifications
  addNotification: (notification: Omit<Notification, 'id'>) => void
  markNotifRead: (id: string) => void
  markAllRead: () => void

  // UI
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Utilities
  addPoints: (amount: number) => void
  getAverageRating: (targetId: string) => number
  addContactMessage: (name: string, email: string, message: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      allUsers: [],
      campaigns: [],
      notifications: [],
      reviews: [],
      myShares: [],
      contactMessages: [],
      sidebarOpen: false,

      // ─── AUTH ────────────────────────────────────────────────
      register: (data: RegisterData) => {
        const state = get()
        const { phone, password, confirmPassword, firstName, lastName, email, city, neighborhood, language, role } = data

        // Validation
        if (!firstName || !lastName || !phone || !password) {
          return { success: false, error: 'Veuillez remplir tous les champs obligatoires' }
        }

        if (password !== confirmPassword) {
          return { success: false, error: 'Les mots de passe ne correspondent pas' }
        }

        if (password.length < 6) {
          return { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' }
        }

        const normalizedPhone = phone.startsWith('+221') ? phone : `+221${phone.replace(/\D/g, '')}`

        // Check if phone already exists
        if (state.allUsers.some(u => u.phone === normalizedPhone)) {
          return { success: false, error: 'Ce numéro est déjà utilisé' }
        }

        // Create user
        const newUser: User = {
          id: Date.now().toString(),
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          phone: normalizedPhone,
          email: email || '',
          role,
          city,
          neighborhood,
          language,
          password,
          avatar: null,
          points: role === 'sharer' ? 0 : 0,
          balance: 0,
          reputationScore: 5,
          totalViews: 0,
          totalClicks: 0,
          totalCalls: 0,
          totalShares: 0,
          totalCampaigns: 0,
          totalSpent: 0,
          isVerified: false,
          initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
          joinDate: new Date().toISOString(),
        }

        set({
          allUsers: [...state.allUsers, newUser],
          user: newUser,
          isAuthenticated: true,
          notifications: [
            ...state.notifications,
            {
              id: Date.now().toString(),
              title: 'Bienvenue sur Yéégël ! 🎉',
              body: `Compte ${role === 'advertiser' ? 'commerçant' : 'partageur'} créé avec succès`,
              type: 'success',
              time: 'À l\'instant',
              unread: true,
              userId: newUser.id,
            },
          ],
        })

        return { success: true }
      },

      login: (phone: string, password: string) => {
        const state = get()
        const normalizedPhone = phone.startsWith('+221') ? phone : `+221${phone.replace(/\D/g, '')}`

        const user = state.allUsers.find(u => u.phone === normalizedPhone && u.password === password)

        if (!user) {
          return { success: false, error: 'Numéro ou mot de passe incorrect' }
        }

        set({
          user,
          isAuthenticated: true,
        })

        return { success: true }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          sidebarOpen: false,
        })
      },

      updateProfile: (updates: Partial<User>) => {
        const state = get()
        if (!state.user) return

        const updatedUser = { ...state.user, ...updates }
        const updatedAllUsers = state.allUsers.map(u => (u.id === state.user!.id ? updatedUser : u))

        set({
          user: updatedUser,
          allUsers: updatedAllUsers,
        })
      },

      updateAvatar: (base64: string) => {
        const state = get()
        if (!state.user) return

        const updatedUser = { ...state.user, avatar: base64 }
        const updatedAllUsers = state.allUsers.map(u => (u.id === state.user!.id ? updatedUser : u))

        set({
          user: updatedUser,
          allUsers: updatedAllUsers,
        })
      },

      // ─── CAMPAIGNS ───────────────────────────────────────────
      addCampaign: (campaign: Campaign) => {
        const state = get()
        if (!state.user) return

        set({
          campaigns: [...state.campaigns, campaign],
          user: {
            ...state.user,
            totalCampaigns: state.user.totalCampaigns + 1,
          },
          notifications: [
            ...state.notifications,
            {
              id: Date.now().toString(),
              title: 'Campagne créée ✅',
              body: `"${campaign.title}" est maintenant en ligne`,
              type: 'success',
              time: 'À l\'instant',
              unread: true,
              userId: state.user.id,
            },
          ],
        })
      },

      updateCampaign: (id: string, updates: Partial<Campaign>) => {
        const state = get()
        set({
          campaigns: state.campaigns.map(c => (c.id === id ? { ...c, ...updates } : c)),
        })
      },

      deleteCampaign: (id: string) => {
        const state = get()
        set({
          campaigns: state.campaigns.filter(c => c.id !== id),
        })
      },

      addShare: (campaignId: string) => {
        const state = get()
        if (!state.user) return

        const campaign = state.campaigns.find(c => c.id === campaignId)
        if (!campaign) return

        const existingShare = state.myShares.find(s => s.campaignId === campaignId)

        if (existingShare) {
          set({
            myShares: state.myShares.map(s =>
              s.campaignId === campaignId ? { ...s, clicks: s.clicks + Math.floor(Math.random() * 5) + 1 } : s
            ),
          })
        } else {
          set({
            myShares: [...state.myShares, { campaignId, sharedAt: new Date().toISOString(), clicks: 0 }],
          })
        }

        get().addPoints(5)
      },

      // ─── REVIEWS ─────────────────────────────────────────────
      addReview: (review: Review) => {
        const state = get()
        set({
          reviews: [...state.reviews, review],
        })

        // Mettre à jour le reputation score du user cible
        const targetUser = state.allUsers.find(u => u.id === review.targetId)
        if (targetUser) {
          const userReviews = state.reviews.filter(r => r.targetId === review.targetId)
          const avgRating = (userReviews.reduce((sum, r) => sum + r.rating, 0) + review.rating) / (userReviews.length + 1)
          
          set({
            allUsers: state.allUsers.map(u =>
              u.id === review.targetId ? { ...u, reputationScore: Math.min(5, avgRating) } : u
            ),
          })
        }

        if (state.user?.id === review.targetId) {
          get().addNotification({
            title: 'Nouvel avis reçu ⭐',
            body: `${review.authorName} vous a laissé une note de ${review.rating} étoile(s)`,
            type: 'info',
            time: 'À l\'instant',
            unread: true,
            userId: state.user.id,
          })
        }
      },

      getReviewsForTarget: (targetId: string) => {
        return get().reviews.filter(r => r.targetId === targetId)
      },

      // ─── NOTIFICATIONS ───────────────────────────────────────
      addNotification: (notification: Omit<Notification, 'id'>) => {
        const state = get()
        set({
          notifications: [
            {
              ...notification,
              id: Date.now().toString(),
            },
            ...state.notifications,
          ],
        })
      },

      markNotifRead: (id: string) => {
        const state = get()
        set({
          notifications: state.notifications.map(n => (n.id === id ? { ...n, unread: false } : n)),
        })
      },

      markAllRead: () => {
        const state = get()
        set({
          notifications: state.notifications.map(n => ({ ...n, unread: false })),
        })
      },

      // ─── UI ──────────────────────────────────────────────────
      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }))
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open })
      },

      // ─── UTILITIES ───────────────────────────────────────────
      addPoints: (amount: number) => {
        const state = get()
        if (!state.user) return

        const updatedUser = { ...state.user, points: state.user.points + amount }
        const updatedAllUsers = state.allUsers.map(u => (u.id === state.user!.id ? updatedUser : u))

        set({
          user: updatedUser,
          allUsers: updatedAllUsers,
        })
      },

      getAverageRating: (targetId: string) => {
        const state = get()
        const targetReviews = state.reviews.filter(r => r.targetId === targetId)
        if (targetReviews.length === 0) return 0
        return targetReviews.reduce((sum, r) => sum + r.rating, 0) / targetReviews.length
      },

      addContactMessage: (name: string, email: string, message: string) => {
        const state = get()
        set({
          contactMessages: [
            ...state.contactMessages,
            {
              name,
              email,
              message,
              date: new Date().toISOString(),
            },
          ],
        })
      },
    }),
    {
      name: 'yeegel-storage',
    }
  )
)
