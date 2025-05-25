import { Link } from 'react-router-dom'
import { Mail, Zap, Crown, ArrowRight, Star } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-blue-600" />
          <span className="font-bold text-xl">EmailDrip.AI</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link to="/login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Email Assistant
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Awkward Emails Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Professional Gold
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop cringing at your own emails. Our AI rewrites them to be professional, funny, or absolutely savage - your choice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/app" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Try Free Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/pricing" 
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              View Pricing
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-red-600">Before (Awkward)</h3>
                <div className="bg-red-50 p-4 rounded-lg text-left text-sm">
                  hey can u maybe help me with this thing if ur not too busy??? really need it done asap but no pressure lol
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-green-600">After (Professional)</h3>
                <div className="bg-green-50 p-4 rounded-lg text-left text-sm">
                  Hi there, I hope you're doing well. I would appreciate your assistance with a project when you have a moment. The deadline is approaching, so your timely help would be greatly valued.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Choose Your Email Personality</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional</h3>
              <p className="text-gray-600">Perfect for work emails, client communication, and formal correspondence.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Funny</h3>
              <p className="text-gray-600">Add humor and personality while keeping it appropriate and engaging.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Roast Mode</h3>
              <p className="text-gray-600">Get brutally honest feedback about what's wrong with your email (for fun!).</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Level Up Your Email Game?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've already improved their email communication.
          </p>
          <Link 
            to="/app" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
          >
            Start Writing Better Emails
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-6 w-6" />
            <span className="font-bold">EmailDrip.AI</span>
          </div>
          <p className="text-gray-400">
            © 2024 EmailDrip.AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}