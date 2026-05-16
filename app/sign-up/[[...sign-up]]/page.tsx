'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleQuickSignup = async () => {
    if (!email || !email.includes('@')) {
      alert('Inserisci una email valida')
      return
    }

    setLoading(true)

    try {
      // Salva email e vai subito alla dashboard
      localStorage.setItem('fovea_user_email', email)
      localStorage.setItem('fovea_user_verified', 'true')

      // Redirect immediato
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Quick signup error:', error)
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Brain className="w-10 h-10 text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Fovea
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Inizia la Prova Gratuita</h1>
          <p className="text-gray-400 mb-6">14 giorni gratis, nessuna carta richiesta</p>

          {/* Benefits */}
          <div className="space-y-2 text-left bg-purple-900/20 rounded-lg p-4 border border-purple-500/20 mb-6">
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Garanzia ROI 60 giorni o rimborso</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-300">AI che ottimizza campagne 24/7</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Integrazione Meta, Google, TikTok</span>
            </div>
          </div>
        </div>

        {/* Quick Signup Form */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la-tua-email@esempio.com"
                className="w-full px-3 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleQuickSignup()}
              />
            </div>

            <button
              onClick={handleQuickSignup}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Accesso...</span>
                </>
              ) : (
                <span>🚀 Accesso Immediato</span>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Inserisci la tua email e accedi subito.<br />
              <span className="text-purple-400">Nessuna verifica richiesta per il test!</span>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Hai già un account?{' '}
          <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 transition">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  )
}