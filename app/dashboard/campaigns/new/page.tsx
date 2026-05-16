'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Brain, Sparkles, ArrowRight, Target, DollarSign,
  Users, Image, Loader2, CheckCircle, Zap, Wand2, Shield
} from 'lucide-react'

export default function NewCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [aiMode, setAiMode] = useState(true)

  const [campaignData, setCampaignData] = useState({
    name: '',
    product: '',
    niche: '',
    objective: 'conversions',
    platform: 'meta',
    monthlyBudget: 5000,
    targetAudience: '',
    creativeConcept: '',
    targetROI: 200
  })

  const [generatedStrategy, setGeneratedStrategy] = useState<any>(null)
  const [generatedCreatives, setGeneratedCreatives] = useState<any[]>([])

  const handleGenerateStrategy = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-strategy',
          data: campaignData
        })
      })

      const result = await response.json()
      setGeneratedStrategy(result.strategy)
      setStep(2)
    } catch (error) {
      console.error('Error generating strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCreatives = async () => {
    setLoading(true)
    try {
      // Generate multiple creative variations
      const creativePromises = [
        { style: 'modern minimalist', angle: 'problem-focused' },
        { style: 'bold and dynamic', angle: 'benefit-focused' },
        { style: 'professional corporate', angle: 'authority-focused' }
      ].map(async (variant) => {
        const response = await fetch('/api/ai/campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'generate-creative',
            data: {
              ...campaignData,
              style: variant.style,
              angle: variant.angle
            }
          })
        })
        return response.json()
      })

      const creatives = await Promise.all(creativePromises)
      setGeneratedCreatives(creatives)
      setStep(3)
    } catch (error) {
      console.error('Error generating creatives:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLaunchCampaign = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-campaign',
          data: {
            ...campaignData,
            creative: generatedCreatives[0], // Use first creative
            targeting: generatedStrategy?.targeting
          }
        })
      })

      const result = await response.json()
      if (result.success) {
        router.push('/dashboard/campaigns')
      }
    } catch (error) {
      console.error('Error launching campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-white">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Nuova Campagna AI</h1>
            </div>
            {aiMode && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-purple-600/20 rounded-full border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-400">AI Mode Active</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          <div className={`flex items-center space-x-3 ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-purple-600' : 'bg-white/10'
            }`}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className="font-medium">Informazioni Base</span>
          </div>
          <div className="flex-1 h-[2px] bg-white/10 mx-4">
            <div className={`h-full bg-purple-600 transition-all ${
              step >= 2 ? 'w-full' : 'w-0'
            }`}></div>
          </div>
          <div className={`flex items-center space-x-3 ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-purple-600' : 'bg-white/10'
            }`}>
              {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
            </div>
            <span className="font-medium">Strategia AI</span>
          </div>
          <div className="flex-1 h-[2px] bg-white/10 mx-4">
            <div className={`h-full bg-purple-600 transition-all ${
              step >= 3 ? 'w-full' : 'w-0'
            }`}></div>
          </div>
          <div className={`flex items-center space-x-3 ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-purple-600' : 'bg-white/10'
            }`}>
              {step > 3 ? <CheckCircle className="w-5 h-5" /> : '3'}
            </div>
            <span className="font-medium">Creatività AI</span>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <h2 className="text-xl font-bold">Claude AI + Meta MCP</h2>
              </div>
              <p className="text-gray-300">
                Sto usando Claude con Meta Ads MCP e Higgsfield per creare campagne ottimizzate automaticamente.
                L'AI genererà strategia, targeting e creatività basate sui tuoi obiettivi di ROI.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Campagna
                </label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  placeholder="es. Coaching Accelerator Q1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prodotto/Servizio
                </label>
                <input
                  type="text"
                  value={campaignData.product}
                  onChange={(e) => setCampaignData({...campaignData, product: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  placeholder="es. Coaching 1-on-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nicchia Coaching
                </label>
                <input
                  type="text"
                  value={campaignData.niche}
                  onChange={(e) => setCampaignData({...campaignData, niche: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  placeholder="es. Business, Fitness, Life"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Obiettivo
                </label>
                <select
                  value={campaignData.objective}
                  onChange={(e) => setCampaignData({...campaignData, objective: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                >
                  <option value="conversions">Conversioni</option>
                  <option value="leads">Lead Generation</option>
                  <option value="traffic">Traffico</option>
                  <option value="awareness">Brand Awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Mensile
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                  <input
                    type="number"
                    value={campaignData.monthlyBudget}
                    onChange={(e) => setCampaignData({...campaignData, monthlyBudget: parseInt(e.target.value)})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ROI Target (%)
                </label>
                <input
                  type="number"
                  value={campaignData.targetROI}
                  onChange={(e) => setCampaignData({...campaignData, targetROI: parseInt(e.target.value)})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience (descrizione)
              </label>
              <textarea
                value={campaignData.targetAudience}
                onChange={(e) => setCampaignData({...campaignData, targetAudience: e.target.value})}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white h-24"
                placeholder="es. Imprenditori 25-45 anni che vogliono scalare il business..."
              />
            </div>

            <button
              onClick={handleGenerateStrategy}
              disabled={loading || !campaignData.name || !campaignData.product}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>Genera Strategia con AI</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: AI Strategy */}
        {step === 2 && generatedStrategy && (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4">Strategia AI Generata</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-purple-400 mb-2">Budget Allocation</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-black/50 rounded-lg p-4">
                      <div className="text-2xl font-bold">60%</div>
                      <div className="text-sm text-gray-400">Meta (€{(campaignData.monthlyBudget * 0.6).toFixed(0)})</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4">
                      <div className="text-2xl font-bold">30%</div>
                      <div className="text-sm text-gray-400">Google (€{(campaignData.monthlyBudget * 0.3).toFixed(0)})</div>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4">
                      <div className="text-2xl font-bold">10%</div>
                      <div className="text-sm text-gray-400">TikTok (€{(campaignData.monthlyBudget * 0.1).toFixed(0)})</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-purple-400 mb-2">Campaign Structure</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>70% Prospecting - Cold audiences</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>20% Retargeting - Website visitors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>10% Lookalike - Based on converters</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-purple-400 mb-2">Projected Results</h3>
                  <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg p-4 border border-green-500/30">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">+{campaignData.targetROI}%</div>
                        <div className="text-sm text-gray-400">Expected ROI</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">€{(campaignData.monthlyBudget * (1 + campaignData.targetROI/100)).toFixed(0)}</div>
                        <div className="text-sm text-gray-400">Revenue</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{Math.floor(campaignData.monthlyBudget / 50)}</div>
                        <div className="text-sm text-gray-400">Conversions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateCreatives}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Image className="w-5 h-5" />
                  <span>Genera Creatività con Higgsfield</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: AI Creatives */}
        {step === 3 && generatedCreatives.length > 0 && (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-4">Creatività Generate con Higgsfield</h2>

              <div className="grid grid-cols-3 gap-6">
                {generatedCreatives.map((creative, index) => (
                  <div key={index} className="bg-black/50 rounded-lg p-4 border border-white/10">
                    <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                      <Image className="w-16 h-16 text-white/50" />
                    </div>
                    <h3 className="font-semibold mb-2">Variante {index + 1}</h3>
                    <p className="text-sm text-gray-400 mb-2">{creative.style}</p>
                    <div className="text-xs text-gray-500">
                      <div>Headline: {creative.headline || 'AI Generated'}</div>
                      <div>CTA: {creative.ctaText || 'Learn More'}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-2 text-purple-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">A/B Test Automatico</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Tutte le varianti verranno testate automaticamente. L'AI ottimizzerà il budget verso le creatività più performanti.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setStep(2)}
                className="border border-white/20 hover:bg-white/10 text-white py-4 rounded-lg font-medium"
              >
                ← Modifica Strategia
              </button>
              <button
                onClick={handleLaunchCampaign}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    <span>Lancia Campagna</span>
                  </>
                )}
              </button>
            </div>

            {/* ROI Guarantee Reminder */}
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="font-semibold text-green-400">Garanzia ROI Attiva</h3>
                  <p className="text-sm text-gray-300">
                    Questa campagna è coperta dalla nostra garanzia ROI 60 giorni. Se il ROI è negativo, rimborso completo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}