import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Brain } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Brain className="w-10 h-10 text-purple-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Fovea
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Bentornato</h1>
          <p className="text-gray-400">Accedi al tuo account per continuare</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-1 border border-white/10">
          <SignIn
            appearance={{
              baseTheme: 'dark',
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "bg-white/10 border border-white/20 hover:bg-white/20 text-white",
                dividerLine: "bg-white/20",
                dividerText: "text-gray-400",
                formFieldLabel: "text-gray-300",
                formFieldInput:
                  "bg-black/50 border-white/20 text-white placeholder:text-gray-500",
                formButtonPrimary:
                  "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
                footerActionLink: "text-purple-400 hover:text-purple-300",
                identityPreviewText: "text-gray-300",
                identityPreviewEditButton: "text-purple-400 hover:text-purple-300",
              },
            }}
          />
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Non hai un account?{' '}
          <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 transition">
            Registrati gratis
          </Link>
        </p>
      </div>
    </div>
  )
}