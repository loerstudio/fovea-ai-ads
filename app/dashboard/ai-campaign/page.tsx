'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import {
  Brain, Sparkles, ArrowRight, Target, DollarSign,
  Users, Image, Loader2, CheckCircle, Zap, Wand2,
  ThumbsUp, ThumbsDown, Play, Settings
} from 'lucide-react'

export default function AICampaignPage() {
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [campaignIdea, setCampaignIdea] = useState('')
  const [budget, setBudget] = useState(1000)
  const [targetAudience, setTargetAudience] = useState('')

  // AI Generated data
  const [strategy, setStrategy] = useState<any>(null)
  const [creatives, setCreatives] = useState<any[]>([])
  const [approvedCreatives, setApprovedCreatives] = useState<string[]>([])

  // Step 1: Idea Input
  const handleGenerateFromIdea = async () => {
    if (!campaignIdea.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/ai/campaign-from-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: campaignIdea,
          budget: budget,
          targetAudience: targetAudience
        })
      })

      const result = await response.json()
      setStrategy(result.strategy)
      setCreatives(result.creatives)
      setStep(2)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Creative Approval
  const toggleCreativeApproval = (creativeId: string) => {
    setApprovedCreatives(prev =>
      prev.includes(creativeId)
        ? prev.filter(id => id !== creativeId)
        : [...prev, creativeId]
    )
  }

  // Step 3: Launch Campaigns
  const handleLaunchCampaigns = async () => {
    if (approvedCreatives.length === 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/ai/launch-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approvedCreativeIds: approvedCreatives,
          strategy: strategy,
          budget: budget
        })
      })

      const result = await response.json()
      if (result.success) {
        setStep(3)
      }
    } catch (error) {
      console.error('Error:', error)
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
            <div>
              <h1 className="text-3xl font-bold">AI Campaign Creator</h1>
              <p className="text-gray-400 mt-1">
                Dall'idea al lancio in 3 step automatici
              </p>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-purple-400">Claude + Higgsfield + Meta MCP</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          <div className={`flex items-center space-x-3 ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-purple-600' : 'bg-white/10'
            }`}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
            </div>
            <span className="font-medium">Descrivi l'Idea</span>
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
              {step > 2 ? <CheckCircle className="w-5 h-5" /> : <ThumbsUp className="w-5 h-5" />}
            </div>
            <span className="font-medium">Approva Creative</span>
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
              <Play className="w-5 h-5" />
            </div>
            <span className="font-medium">Lancia Campagne</span>
          </div>
        </div>

        {/* Step 1: Idea Input */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Descrivi la Tua Idea di Business</h2>
              <p className="text-gray-400">
                L'AI analizzerà la tua idea e creerà automaticamente strategia + creatività
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Idea / Prodotto / Servizio
              </label>
              <textarea
                value={campaignIdea}
                onChange={(e) => setCampaignIdea(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white h-32 resize-none"
                placeholder="es. Coaching online per imprenditori che vogliono scalare da 6 a 7 cifre usando strategie di automazione e team building..."
              />

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Mensile
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                      className="w-full bg-black/50 border border-white/20 rounded-lg pl-8 pr-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white"
                    placeholder="es. Imprenditori 30-45 anni"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateFromIdea}
              disabled={loading || !campaignIdea.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Genera Campagna AI</span>
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-400">
              ⏱ Tempo stimato: 30-60 secondi
            </div>
          </div>
        )}

        {/* Step 2: Creative Approval */}
        {step === 2 && creatives.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Creatività Generate con Higgsfield</h2>
              <p className="text-gray-400">
                Seleziona le creatività che vuoi lanciare su Meta Ads
              </p>
            </div>

            {/* Strategy Overview */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">Strategia AI Generata</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{strategy?.objective || 'Conversions'}</div>
                  <div className="text-sm text-gray-400">Obiettivo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">€{(budget * 2.5).toFixed(0)}</div>
                  <div className="text-sm text-gray-400">Revenue Stimata</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{Math.floor(budget / 50)}</div>
                  <div className="text-sm text-gray-400">Conversioni Stimate</div>
                </div>
              </div>
            </div>

            {/* Creative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatives.map((creative, index) => (
                <div
                  key={creative.id}
                  className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border transition-all cursor-pointer ${
                    approvedCreatives.includes(creative.id)
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-white/10 hover:border-purple-500/50'
                  }`}
                  onClick={() => toggleCreativeApproval(creative.id)}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    {creative.imageUrl ? (
                      <img
                        src={creative.imageUrl}
                        alt={creative.angle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image className="w-16 h-16 text-white/50" />
                    )}

                    {/* Approval Indicator */}
                    <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                      approvedCreatives.includes(creative.id)
                        ? 'bg-green-500'
                        : 'bg-black/50'
                    }`}>
                      {approvedCreatives.includes(creative.id) ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-white/50 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">{creative.angle}</h3>
                    <div className="text-sm space-y-1">
                      <div className="text-gray-300">
                        <strong>Headline:</strong> {creative.copy?.headline || 'AI Generated'}
                      </div>
                      <div className="text-gray-400 text-xs">
                        <strong>Copy:</strong> {creative.copy?.primaryText || 'Professional ad copy'}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-400">CTR Stimato: {creative.estimatedPerformance || '2.5%'}</span>
                        <span className="text-green-400">ROAS: 3.2x</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium"
              >
                ← Modifica Idea
              </button>

              <button
                onClick={handleLaunchCampaigns}
                disabled={loading || approvedCreatives.length === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Lancia {approvedCreatives.length} Campagne</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Launch Success */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-8 border border-green-500/30">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-400 mb-2">Campagne Lanciate!</h2>
              <p className="text-gray-300 mb-6">
                {approvedCreatives.length} campagne sono state create automaticamente sul tuo account Meta Ads
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold">{approvedCreatives.length}</div>
                  <div className="text-sm text-gray-400">Campagne Attive</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">€{budget}</div>
                  <div className="text-sm text-gray-400">Budget Totale</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">60 giorni</div>
                  <div className="text-sm text-gray-400">Garanzia ROI</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-medium"
              >
                Vai al Dashboard
              </button>
              <button
                onClick={() => {
                  setStep(1)
                  setCampaignIdea('')
                  setCreatives([])
                  setApprovedCreatives([])
                  setStrategy(null)
                }}
                className="flex-1 border border-white/20 hover:bg-white/10 text-white py-3 rounded-lg font-medium"
              >
                Crea Nuova Campagna
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}