import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, Zap, CheckCircle, BarChart3, Brain, RefreshCw } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-black/50 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Fovea
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#features" className="text-gray-300 hover:text-white transition">
                Funzionalità
              </Link>
              <Link href="#guarantee" className="text-gray-300 hover:text-white transition">
                Garanzia ROI
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition">
                Prezzi
              </Link>
              <Link href="/sign-in" className="text-gray-300 hover:text-white transition">
                Accedi
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg transition-all"
              >
                Inizia Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10">
            <Shield className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-400">Garanzia ROI Positivo o Rimborso</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            L'Unico AI Ads Manager<br />
            con Garanzia ROI per Coach
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Ottimizza automaticamente le tue campagne Meta, Google e TikTok con l'AI.
            Se dopo 60 giorni il ROI è negativo, ti rimborsiamo completamente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all transform hover:scale-105"
            >
              Inizia Prova Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border border-white/20 hover:bg-white/10 rounded-lg transition-all"
            >
              Guarda Demo
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Nessuna carta richiesta</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Setup in 5 minuti</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Cancella quando vuoi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Guarantee Section */}
      <section id="guarantee" className="py-20 px-4 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              La Nostra Garanzia ROI Rivoluzionaria
            </h2>
            <p className="text-xl text-gray-400">
              Siamo così sicuri dei nostri risultati che garantiamo il successo
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="w-12 h-12 text-purple-400 mr-4" />
                  <h3 className="text-2xl font-bold">Garanzia 60 Giorni</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Se dopo 60 giorni di utilizzo il tuo ROI complessivo è negativo,
                  ti rimborsiamo l'intero abbonamento. Senza domande.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Monitoraggio automatico del ROI in tempo reale</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Report trasparenti e verificabili</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Rimborso processato in 48 ore</span>
                  </li>
                </ul>
              </div>
              <div className="bg-black/50 rounded-xl p-6 border border-white/10">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2">+247%</div>
                  <div className="text-gray-400 mb-4">ROI Medio dei Nostri Clienti</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-white">€15.3K</div>
                      <div className="text-gray-500">Spesa Media</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">€53.1K</div>
                      <div className="text-gray-500">Ritorno Medio</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              AI che Ottimizza 24/7 le Tue Campagne
            </h2>
            <p className="text-xl text-gray-400">
              Mentre dormi, Fovea lavora per massimizzare il tuo ROI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Creative Generator</h3>
              <p className="text-gray-400 mb-4">
                Genera copy persuasivo e creatività ottimizzate per la tua nicchia di coaching
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Copy basato su framework persuasivi</li>
                <li>• A/B test automatici</li>
                <li>• Immagini AI personalizzate</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ottimizzazione Budget</h3>
              <p className="text-gray-400 mb-4">
                L'AI ridistribuisce automaticamente il budget verso le campagne più performanti
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Bid optimization in tempo reale</li>
                <li>• Scaling automatico vincenti</li>
                <li>• Pausa automatica perdenti</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Unificati</h3>
              <p className="text-gray-400 mb-4">
                Dashboard unica per Meta, Google e TikTok con metriche che contano davvero
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• ROI in tempo reale</li>
                <li>• Customer acquisition cost</li>
                <li>• Lifetime value tracking</li>
              </ul>
            </div>
          </div>

          {/* Platform Integration */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Integrazione nativa con le principali piattaforme</p>
            <div className="flex justify-center gap-8 items-center opacity-60">
              <div className="text-2xl font-bold">META</div>
              <div className="text-2xl font-bold">Google Ads</div>
              <div className="text-2xl font-bold">TikTok</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Prezzi Trasparenti, ROI Garantito
            </h2>
            <p className="text-xl text-gray-400">
              Scegli il piano giusto per il tuo business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">€297</span>
                <span className="text-gray-400">/mese</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Fino a €5k/mese ad spend</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>1 piattaforma</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>AI Creative Generator</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Garanzia ROI 60 giorni</span>
                </li>
              </ul>
              <button className="w-full py-3 border border-white/20 hover:bg-white/10 rounded-lg transition">
                Inizia Prova Gratuita
              </button>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-gradient-to-b from-purple-900/30 to-transparent rounded-xl p-6 border border-purple-500/50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-xs">
                PIÙ POPOLARE
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">€697</span>
                <span className="text-gray-400">/mese</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Fino a €20k/mese ad spend</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>3 piattaforme</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>AI Creative Generator Pro</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Ottimizzazione automatica</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Garanzia ROI 60 giorni</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Account manager dedicato</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg transition">
                Inizia Prova Gratuita
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Ad spend illimitato</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Tutte le piattaforme</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>API personalizzate</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>White label disponibile</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Garanzia ROI 90 giorni</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Team dedicato</span>
                </li>
              </ul>
              <button className="w-full py-3 border border-white/20 hover:bg-white/10 rounded-lg transition">
                Contatta Vendite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold mb-4">
              Pronto a Garantire il Tuo ROI?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Unisciti ai coach che hanno già triplicato il loro ROI con Fovea.
              Inizia oggi con 14 giorni di prova gratuita.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all transform hover:scale-105"
            >
              Inizia Prova Gratuita
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Nessuna carta di credito richiesta • Setup in 5 minuti • Cancella quando vuoi
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-8 h-8 text-purple-500" />
                <span className="text-xl font-bold">Fovea</span>
              </div>
              <p className="text-gray-400 text-sm">
                L'unico AI Ads Manager con garanzia ROI per coach.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Prodotto</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Funzionalità</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">Prezzi</Link></li>
                <li><Link href="#guarantee" className="hover:text-white transition">Garanzia ROI</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Supporto</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/docs" className="hover:text-white transition">Documentazione</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contatti</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legale</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Termini</Link></li>
                <li><Link href="/refund" className="hover:text-white transition">Politica Rimborsi</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 Fovea. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  )
}
