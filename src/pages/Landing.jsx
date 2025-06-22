// Using anchor tags instead of react-router Link for demo
import { Mail, Zap, Crown, ArrowRight, Star, Clock, Target, Shield, Sparkles, Users, DollarSign, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function Landing() {
  const [activeTone, setActiveTone] = useState('professional')

  const beforeAfterExamples = {
    professional: {
      before: "hey can u maybe help me with this thing if ur not too busy??? really need it done asap but no pressure lol",
      after: "Hi there, I hope you're doing well. I would appreciate your assistance with a project when you have a moment. The deadline is approaching, so your timely help would be greatly valued."
    },
    direct: {
      before: "Just checking in on this... not sure if you saw my last email... let me know when you can...",
      after: "Following up on my previous email regarding the project timeline. Could you please confirm receipt and provide an update by Friday?"
    },
    karen: {
      before: "Thanks for getting back to me so quickly... (sent 2 weeks ago)",
      after: "I understand you're busy, but this project deadline isn't going to extend itself. When can I expect a response?"
    }
  }

  const painPoints = [
    "Struggling to ask for that raise without sounding desperate?",
    "Following up without seeming pushy or passive?",
    "Explaining things to clients without sounding condescending?",
    "Declining requests while maintaining relationships?",
    "Writing performance reviews that don't sugarcoat?",
    "Networking emails that don't sound like spam?"
  ]

  const testimonials = [
    {
      quote: "I used to dread writing follow-ups — now it's actually fun. The 'karen' mode had me cackling.",
      author: "Sarah K.",
      role: "Marketing Manager"
    },
    {
      quote: "Finally, an AI that gets email anxiety. Went from cringe to confident in seconds.",
      author: "Mike R.",
      role: "Sales Director" 
    },
    {
      quote: "$5/month to never sound awkward again? That's cheaper than my therapy copay.",
      author: "Jessica L.",
      role: "Startup Founder"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-blue-600" />
          <span className="font-bold text-xl">EmailDrip.AI</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a href="pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </a>
          <a href="login" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-pulse">
            <Zap className="w-4 h-4 mr-2" />
            Email Anxiety Cure
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stop Cringing at Your Own 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Email Drafts
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn awkward rambles into professional gold. Our AI rewrites your emails to be confident, clear, or absolutely karen — your choice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="app" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              Make My Email Not Suck
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="pricing" 
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-colors hover:bg-gray-50"
            >
              $0.16/day to Never Sound Awkward
            </a>
          </div>

          {/* Interactive Demo Preview */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">See the Magic ✨</h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {Object.keys(beforeAfterExamples).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setActiveTone(tone)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTone === tone 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tone === 'professional' ? 'Professional' : tone === 'direct' ? 'Direct' : 'Karen'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-red-600 flex items-center gap-2">
                  😬 Before (Awkward)
                </h4>
                <div className="bg-red-50 p-4 rounded-lg text-left text-sm border-l-4 border-red-300 min-h-[80px] flex items-center">
                  {beforeAfterExamples[activeTone].before}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600 flex items-center gap-2">
                  ✨ After ({activeTone === 'professional' ? 'Professional' : activeTone === 'direct' ? 'Direct' : 'Karen'})
                </h4>
                <div className="bg-green-50 p-4 rounded-lg text-left text-sm border-l-4 border-green-300 min-h-[80px] flex items-center">
                  {beforeAfterExamples[activeTone].after}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Sound Familiar? 😅
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We've all been there. Email anxiety is real, and these situations make it worse:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-red-600 text-sm font-bold">!</span>
                  </div>
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stop Overthinking. Start Sending.
            </h3>
            <p className="text-gray-600 mb-6">
              EmailDrip.AI handles the anxiety so you can focus on what matters — getting things done.
            </p>
            <a 
              href="app" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all"
            >
              Fix My Email Anxiety Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Not ChatGPT Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              "Why Not Just Use ChatGPT?"
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Great question! While ChatGPT is amazing, EmailDrip.AI is specifically built for email perfection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">10x Faster</h3>
              <p className="text-gray-600 text-sm">
                No more crafting perfect prompts. Paste → Click → Perfect Email. What takes 3 minutes in ChatGPT takes 10 seconds here.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Email-Specific</h3>
              <p className="text-gray-600 text-sm">
                Trained specifically on email patterns, tone, and professional communication — not general AI responses.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Privacy First</h3>
              <p className="text-gray-600 text-sm">
                Your emails stay private. No training on your data, no storing sensitive information in chat histories.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Smart Features</h3>
              <p className="text-gray-600 text-sm">
                Built-in roast mode, email history, export options, and features designed specifically for email workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What People Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Choose Your Email Personality</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional</h3>
              <p className="text-gray-600">Perfect for work emails, client communication, and formal correspondence. Sound like the pro you are.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Friendly</h3>
              <p className="text-gray-600">Add warmth and personality while keeping it appropriate and engaging. Build relationships with every send.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Roast Mode</h3>
              <p className="text-gray-600">Get brutally honest feedback about what's wrong with your email. Sometimes you need the hard truth (for fun!).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tease */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cringe Insurance: $5/month
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">$0.16/day</div>
                <p className="text-gray-600 text-sm">Less than a pack of gum</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">One iced coffee</div>
                <p className="text-gray-600 text-sm">= 1 month of email confidence</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">Unlimited</div>
                <p className="text-gray-600 text-sm">Email rewrites & roasts</p>
              </div>
            </div>
            <a 
              href="pricing" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all transform hover:scale-105"
            >
              I'm Feeling Lucky
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Send Emails Like a Boss?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've ditched email anxiety for good.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="app" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Writing Like a Pro
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="app" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all"
            >
              I'm Feeling Karen
              <Zap className="w-5 h-5" />
            </a>
          </div>
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
            © 2024 EmailDrip.AI. All rights reserved. No more awkward emails guaranteed.
          </p>
        </div>
      </footer>
    </div>
  )
}