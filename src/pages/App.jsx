import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Wand2, LogOut, User, Crown, Flame } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getUserUsage, checkUserIsPro } from '../lib/supabase'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export default function App() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  
  const [emailInput, setEmailInput] = useState('')
  const [tone, setTone] = useState('Polite')
  const [roastMode, setRoastMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [usage, setUsage] = useState(0)
  const [isPro, setIsPro] = useState(false)

  const tones = ['Polite', 'Funny', 'Karen', 'Direct']
  const FREE_LIMIT = 5

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const loadUserData = async () => {
      try {
        const [userUsage, userIsPro] = await Promise.all([
          getUserUsage(user.id),
          checkUserIsPro(user.id)
        ])
        setUsage(userUsage)
        setIsPro(userIsPro)
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }

    loadUserData()
  }, [user, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const handleRewrite = async () => {
    if (!emailInput.trim()) return
    
    if (usage >= FREE_LIMIT && !isPro) {
      alert('You\'ve reached your daily limit! Upgrade to Pro for unlimited emails.')
      navigate('/pricing')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/rewrite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          tone: tone,
          roast: roastMode,
          user_id: user.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to rewrite email')
      }

      const data = await response.json()
      setResult(data)
      setUsage(prev => prev + 1)
    } catch (error) {
      console.error('Error rewriting email:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const canUseService = isPro || usage < FREE_LIMIT

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EmailDrip.AI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                {isPro ? (
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    <Crown className="w-4 h-4" />
                    Pro
                  </div>
                ) : (
                  <span className="text-gray-600">
                    {usage}/{FREE_LIMIT} free emails today
                  </span>
                )}
              </div>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
              >
                <User className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Transform Your Email
            </h2>
            <p className="text-gray-600">
              Paste your awkward email below and watch the magic happen
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Draft
              </label>
              <textarea
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Paste your email here... Don't worry, we've seen worse 😉"
                className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {tones.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={roastMode}
                    onChange={(e) => setRoastMode(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Roast Mode (for fun)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleRewrite}
              disabled={!emailInput.trim() || loading || !canUseService}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  AI is working its magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Fix My Email
                </>
              )}
            </button>

            {!canUseService && (
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium mb-2">
                  You've reached your daily limit!
                </p>
                <button
                  onClick={() => navigate('/pricing')}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Upgrade to Pro for unlimited emails →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ✨ Your Improved Email
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {result.rewritten}
                </p>
              </div>
            </div>

            {result.roast && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  🔥 Roast Report
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {result.roast}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}