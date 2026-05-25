import { create } from 'zustand'
import { mockUser, mockCampaigns, mockNotifications } from '../data/mock'

interface AppState {
  user: typeof mockUser | null
  isAuthenticated: boolean
  campaigns: typeof mockCampaigns
  notifications: typeof mockNotifications
  sidebarOpen: boolean

  login: (role: 'advertiser' | 'sharer') => void
  logout: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  markNotifRead: (id: string) => void
  markAllRead: () => void
  addCampaign: (campaign: (typeof mockCampaigns)[0]) => void
  updateCampaign: (id: string, updates: Partial<(typeof mockCampaigns)[0]>) => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  campaigns: mockCampaigns,
  notifications: mockNotifications,
  sidebarOpen: true,

  login: (role) => set({
    user: { ...mockUser, role },
    isAuthenticated: true,
  }),

  logout: () => set({ user: null, isAuthenticated: false }),

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  markNotifRead: (id) => set((s) => ({
    notifications: s.notifications.map((n) =>
      n.id === id ? { ...n, unread: false } : n
    ),
  })),

  markAllRead: () => set((s) => ({
    notifications: s.notifications.map((n) => ({ ...n, unread: false })),
  })),

  addCampaign: (campaign) => set((s) => ({
    campaigns: [campaign, ...s.campaigns],
  })),

  updateCampaign: (id, updates) => set((s) => ({
    campaigns: s.campaigns.map((c) => c.id === id ? { ...c, ...updates } : c),
  })),
}))
