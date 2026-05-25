import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppStore } from './store/useAppStore'
import { AppLayout } from './components/layout/AppLayout'

import LandingPage from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import AdvertiserDashboard from './pages/advertiser/Dashboard'
import { CampaignsPage } from './pages/advertiser/Campaigns'
import { CreateCampaignPage } from './pages/advertiser/CreateCampaign'
import { SharerDashboardPage, LeaderboardPage, AvailableAdsPage } from './pages/sharer/Dashboard'
import {
  NotificationsPage, ProfilePage, AnalyticsPage,
  PaymentsPage, SettingsPage, HelpPage, NotFoundPage
} from './pages/shared/SharedPages'

function ProtectedRoute({ children, role }: { children: JSX.Element; role?: string }) {
  const { isAuthenticated, user } = useAppStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (role && user?.role !== role) return <Navigate to={user?.role === 'advertiser' ? '/dashboard' : '/sharer'} replace />
  return children
}

export default function App() {
  const { user } = useAppStore()

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { borderRadius: 12, fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14 },
        success: { iconTheme: { primary: '#16A34A', secondary: '#fff' } },
      }} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Advertiser */}
        <Route path="/dashboard" element={<ProtectedRoute role="advertiser"><AppLayout><AdvertiserDashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/campaigns" element={<ProtectedRoute role="advertiser"><AppLayout><CampaignsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/campaigns/new" element={<ProtectedRoute role="advertiser"><AppLayout><CreateCampaignPage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute role="advertiser"><AppLayout><AnalyticsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/payments" element={<ProtectedRoute role="advertiser"><AppLayout><PaymentsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><AppLayout><NotificationsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/dashboard/help" element={<ProtectedRoute><AppLayout><HelpPage /></AppLayout></ProtectedRoute>} />

        {/* Sharer */}
        <Route path="/sharer" element={<ProtectedRoute role="sharer"><AppLayout><SharerDashboardPage /></AppLayout></ProtectedRoute>} />
        <Route path="/sharer/ads" element={<ProtectedRoute role="sharer"><AppLayout><AvailableAdsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/sharer/leaderboard" element={<ProtectedRoute role="sharer"><AppLayout><LeaderboardPage /></AppLayout></ProtectedRoute>} />
        <Route path="/sharer/notifications" element={<ProtectedRoute><AppLayout><NotificationsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/sharer/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />
        <Route path="/sharer/settings" element={<ProtectedRoute><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}


