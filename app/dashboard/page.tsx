'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Brain, TrendingUp, DollarSign, Target, Zap, Plus,
  Settings, LogOut, ChevronDown, MoreVertical,
  ArrowUpRight, ArrowDownRight, Shield, AlertCircle, BarChart3
} from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// No mock data - real dashboard starts empty

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Get user email from localStorage (quick signup) or fallback
    const email = localStorage.getItem('fovea_user_email') || 'user@fovea.ai'
    setUserEmail(email)
  }, [])

  const totalSpend = 0
  const totalRevenue = 0
  const overallROI = 0
  const daysRemaining = 60 // Days remaining for ROI guarantee
  const hasNoCampaigns = totalSpend === 0

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/10">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <Brain className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Fovea
            </span>
          </Link>

          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-purple-600/20 text-white">
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/campaigns" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300">
              <Target className="w-5 h-5" />
              <span>Campagne</span>
            </Link>
            <Link href="/dashboard/creatives" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300">
              <Zap className="w-5 h-5" />
              <span>AI Creatives</span>
            </Link>
            <Link href="/dashboard/analytics" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300">
              <TrendingUp className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300">
              <Settings className="w-5 h-5" />
              <span>Impostazioni</span>
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Coach</div>
              <div className="text-xs text-gray-400">{userEmail}</div>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm">
            <LogOut className="w-4 h-4" />
            <span>Esci</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Benvenuto, ecco il tuo ROI in tempo reale</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              <option value="7d">Ultimi 7 giorni</option>
              <option value="30d">Ultimi 30 giorni</option>
              <option value="90d">Ultimi 90 giorni</option>
            </select>
            <Link
              href="/dashboard/campaigns/new"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nuova Campagna</span>
            </Link>
          </div>
        </div>

        {/* Welcome/ROI Guarantee */}
        {hasNoCampaigns ? (
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30 mb-8">
            <div className="flex items-center space-x-4">
              <Zap className="w-12 h-12 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Benvenuto in Fovea AI!</h3>
                <p className="text-gray-300">
                  Inizia creando la tua prima campagna AI. La garanzia ROI di 60 giorni parte dal primo lancio.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="w-12 h-12 text-purple-400" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Garanzia ROI Attiva</h3>
                  <p className="text-gray-300">
                    {daysRemaining} giorni rimanenti • ROI attuale: <span className="text-green-400 font-bold">+{overallROI}%</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Stato Garanzia</div>
                <div className="text-green-400 font-bold text-lg">ROI POSITIVO ✓</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">ROI Totale</span>
              <DollarSign className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{overallROI}%</div>
            <div className="text-sm text-gray-400">Inizia la prima campagna</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Spesa Totale</span>
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">€{totalSpend.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Nessuna spesa ancora</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Ricavi Totali</span>
              <TrendingUp className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">€{totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-400">In attesa di ricavi</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Conversioni</span>
              <Target className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">0</div>
            <div className="text-sm text-gray-400">Campagne in attesa</div>
          </div>
        </div>

        {/* Get Started Section */}
        {hasNoCampaigns && (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Inizia la Tua Prima Campagna AI</h3>
              <p className="text-gray-400 mb-8">
                Crea campagne ottimizzate con l'AI in pochi minuti. La garanzia ROI di 60 giorni inizia al primo lancio.
              </p>
              <div className="space-y-4">
                <Link
                  href="/dashboard/ai-campaign"
                  className="block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-4 px-8 rounded-lg transition-all"
                >
                  🤖 Crea Campagna con AI
                </Link>
                <Link
                  href="/dashboard/campaigns/new"
                  className="block border border-white/20 hover:bg-white/10 text-white font-medium py-4 px-8 rounded-lg transition-all"
                >
                  ⚡ Crea Campagna Manuale
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Empty state for when user has campaigns but no data yet */}
        {!hasNoCampaigns && (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Campagne Attive</h3>
            </div>
            <div className="p-8 text-center text-gray-400">
              <p>I dati delle campagne appariranno qui una volta attivate.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}