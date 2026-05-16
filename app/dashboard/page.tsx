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

// Mock data for charts
const roiData = [
  { name: 'Gen', roi: 120, spend: 3000, revenue: 6600 },
  { name: 'Feb', roi: 180, spend: 4000, revenue: 11200 },
  { name: 'Mar', roi: 240, spend: 5500, revenue: 18700 },
  { name: 'Apr', roi: 210, spend: 6000, revenue: 18600 },
  { name: 'Mag', roi: 280, spend: 7200, revenue: 27360 },
  { name: 'Giu', roi: 320, spend: 8500, revenue: 35700 },
]

const platformData = [
  { platform: 'Meta', spend: 12000, conversions: 450, roi: 280 },
  { platform: 'Google', spend: 8500, conversions: 320, roi: 240 },
  { platform: 'TikTok', spend: 5500, conversions: 190, roi: 310 },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Get user email from localStorage (quick signup) or fallback
    const email = localStorage.getItem('fovea_user_email') || 'user@fovea.ai'
    setUserEmail(email)
  }, [])

  const totalSpend = 26000
  const totalRevenue = 89260
  const overallROI = ((totalRevenue - totalSpend) / totalSpend * 100).toFixed(0)
  const daysRemaining = 45 // Days remaining for ROI guarantee

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

        {/* ROI Guarantee Alert */}
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

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">ROI Totale</span>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">+{overallROI}%</div>
            <div className="text-sm text-green-500">+32% vs mese scorso</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Spesa Totale</span>
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">€{totalSpend.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Budget utilizzato: 73%</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Ricavi Totali</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">€{totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-500">+€12,340 questa settimana</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Conversioni</span>
              <Target className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">960</div>
            <div className="text-sm text-green-500">+18% tasso conversione</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* ROI Trend Chart */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Andamento ROI</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roiData}>
                <defs>
                  <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="roi" stroke="#a855f7" fillOpacity={1} fill="url(#colorROI)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Performance */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Performance per Piattaforma</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="platform" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="roi" fill="#a855f7" />
                <Bar dataKey="conversions" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Campaigns Table */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Campagne Attive</h3>
              <Link href="/dashboard/campaigns" className="text-purple-400 hover:text-purple-300 text-sm">
                Vedi tutte →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Nome</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Piattaforma</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Budget</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Spesa</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">ROI</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Stato</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">Coaching Accelerator</div>
                      <div className="text-sm text-gray-400">Lead generation</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">Meta</td>
                  <td className="p-4 text-gray-300">€5,000</td>
                  <td className="p-4 text-gray-300">€3,420</td>
                  <td className="p-4">
                    <span className="text-green-400 font-semibold">+285%</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Attiva</span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">Webinar Funnel</div>
                      <div className="text-sm text-gray-400">Conversioni dirette</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">Google</td>
                  <td className="p-4 text-gray-300">€3,500</td>
                  <td className="p-4 text-gray-300">€2,100</td>
                  <td className="p-4">
                    <span className="text-green-400 font-semibold">+195%</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Attiva</span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">TikTok Awareness</div>
                      <div className="text-sm text-gray-400">Brand awareness</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">TikTok</td>
                  <td className="p-4 text-gray-300">€2,000</td>
                  <td className="p-4 text-gray-300">€1,250</td>
                  <td className="p-4">
                    <span className="text-yellow-400 font-semibold">+85%</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Ottimizzando</span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Optimization Alert */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-start space-x-4">
            <Zap className="w-8 h-8 text-blue-400 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">AI Optimization in Corso</h3>
              <p className="text-gray-300 mb-3">
                L'AI ha identificato 3 ottimizzazioni che potrebbero aumentare il tuo ROI del +42%
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">
                  Applica Ottimizzazioni
                </button>
                <button className="border border-white/20 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition">
                  Rivedi Dettagli
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}