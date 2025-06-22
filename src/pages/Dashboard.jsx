import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, Calendar, Crown, BarChart3, FileText, Trash2, Download, ChevronDown, ChevronUp, Copy, Check, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getUserEmails, getUserUsage, checkUserIsPro } from '../lib/supabase'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  
  const [emails, setEmails] = useState([])
  const [usage, setUsage] = useState(0)
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [expandedEmails, setExpandedEmails] = useState(new Set())
  const [copiedText, setCopiedText] = useState('')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [emailsPerPage] = useState(10)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const loadDashboardData = async () => {
      try {
        const [userEmails, userUsage, userIsPro] = await Promise.all([
          getUserEmails(user.id),
          getUserUsage(user.id),
          checkUserIsPro(user.id)
        ])
        
        setEmails(userEmails)
        setUsage(userUsage)
        setIsPro(userIsPro)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [user, navigate])

  // Pagination calculations
  const totalPages = Math.ceil(emails.length / emailsPerPage)
  const startIndex = (currentPage - 1) * emailsPerPage
  const endIndex = startIndex + emailsPerPage
  const currentEmails = emails.slice(startIndex, endIndex)

  // Reset to first page when emails change
  useEffect(() => {
    setCurrentPage(1)
  }, [emails.length])

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateForExport = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const toggleEmailExpansion = (emailId) => {
    const newExpanded = new Set(expandedEmails)
    if (newExpanded.has(emailId)) {
      newExpanded.delete(emailId)
    } else {
      newExpanded.add(emailId)
    }
    setExpandedEmails(newExpanded)
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const exportEmails = async (format = 'json') => {
    if (!isPro) {
      alert('Export feature is only available for Pro users')
      return
    }

    setIsExporting(true)
    
    try {
      let content = ''
      let filename = ''
      let mimeType = ''

      if (format === 'json') {
        const exportData = {
          exportDate: new Date().toISOString(),
          totalEmails: emails.length,
          emails: emails.map(email => ({
            id: email.id,
            createdAt: email.created_at,
            original: email.original,
            rewritten: email.rewritten,
            roast: email.roast || null
          }))
        }
        content = JSON.stringify(exportData, null, 2)
        filename = `emails-export-${new Date().toISOString().split('T')[0]}.json`
        mimeType = 'application/json'
      } else if (format === 'csv') {
        const headers = ['Date Created', 'Original Email', 'Rewritten Email', 'Roast']
        const csvRows = [headers.join(',')]
        
        emails.forEach(email => {
          const row = [
            `"${formatDateForExport(email.created_at)}"`,
            `"${email.original.replace(/"/g, '""')}"`,
            `"${email.rewritten.replace(/"/g, '""')}"`,
            `"${email.roast ? email.roast.replace(/"/g, '""') : 'N/A'}"`
          ]
          csvRows.push(row.join(','))
        })
        
        content = csvRows.join('\n')
        filename = `emails-export-${new Date().toISOString().split('T')[0]}.csv`
        mimeType = 'text/csv'
      } else if (format === 'txt') {
        content = `Email Export - ${new Date().toLocaleDateString()}\n`
        content += `Total Emails: ${emails.length}\n`
        content += '=' * 50 + '\n\n'
        
        emails.forEach((email, index) => {
          content += `Email #${index + 1}\n`
          content += `Date: ${formatDateForExport(email.created_at)}\n`
          content += `\nOriginal:\n${email.original}\n`
          content += `\nRewritten:\n${email.rewritten}\n`
          if (email.roast) {
            content += `\nRoast:\n${email.roast}\n`
          }
          content += '\n' + '-' * 50 + '\n\n'
        })
        
        filename = `emails-export-${new Date().toISOString().split('T')[0]}.txt`
        mimeType = 'text/plain'
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error exporting emails:', error)
      alert('Failed to export emails. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/app')}
                className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <Mail className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {usage}{!isPro && '/5'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Emails</p>
                <p className="text-2xl font-bold text-gray-900">{emails.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isPro ? 'Pro' : 'Free'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Emails */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Emails</h2>
                {emails.length > 0 && (
                  <span className="text-sm text-gray-500">
                    Showing {startIndex + 1}-{Math.min(endIndex, emails.length)} of {emails.length}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Export Dropdown for Pro Users */}
                {isPro && emails.length > 0 && (
                  <div className="relative group w-full sm:w-auto">
                    <button 
                      className="flex items-center justify-center sm:justify-start gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      disabled={isExporting}
                    >
                      <Download className="w-4 h-4" />
                      <span className="whitespace-nowrap">
                        {isExporting ? 'Exporting...' : 'Export'}
                      </span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-2">
                        <button
                          onClick={() => exportEmails('json')}
                          className="w-full text-left px-4 py-3 sm:py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          disabled={isExporting}
                        >
                          Export as JSON
                        </button>
                        <button
                          onClick={() => exportEmails('csv')}
                          className="w-full text-left px-4 py-3 sm:py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          disabled={isExporting}
                        >
                          Export as CSV
                        </button>
                        <button
                          onClick={() => exportEmails('txt')}
                          className="w-full text-left px-4 py-3 sm:py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          disabled={isExporting}
                        >
                          Export as Text
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate('/app')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto whitespace-nowrap"
                >
                  Write New Email
                </button>
              </div>
            </div>
          </div>

          {emails.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No emails yet</h3>
              <p className="text-gray-600 mb-6">
                Start by rewriting your first email to see it appear here
              </p>
              <button 
                onClick={() => navigate('/app')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Write Your First Email
              </button>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {currentEmails.map((email) => {
                  const isExpanded = expandedEmails.has(email.id)
                  return (
                    <div key={email.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {formatDate(email.created_at)}
                              </span>
                            </div>
                            
                            <button
                              onClick={() => toggleEmailExpansion(email.id)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Show Less</span>
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  <span>Show More</span>
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">Original</h4>
                                <button
                                  onClick={() => copyToClipboard(email.original, `original-${email.id}`)}
                                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs transition-colors"
                                >
                                  {copiedText === `original-${email.id}` ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg whitespace-pre-wrap">
                                {isExpanded ? email.original : truncateText(email.original)}
                              </p>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">Rewritten</h4>
                                <button
                                  onClick={() => copyToClipboard(email.rewritten, `rewritten-${email.id}`)}
                                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs transition-colors"
                                >
                                  {copiedText === `rewritten-${email.id}` ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg whitespace-pre-wrap">
                                {isExpanded ? email.rewritten : truncateText(email.rewritten)}
                              </p>
                            </div>
                          </div>

                          {email.roast && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-red-600">🔥 Roast</h4>
                                <button
                                  onClick={() => copyToClipboard(email.roast, `roast-${email.id}`)}
                                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-xs transition-colors"
                                >
                                  {copiedText === `roast-${email.id}` ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg whitespace-pre-wrap">
                                {isExpanded ? email.roast : truncateText(email.roast)}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <button className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors ml-4">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              {emails.length > emailsPerPage && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      {/* Page numbers */}
                      <div className="hidden sm:flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Upgrade CTA for Free Users */}
        {!isPro && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <Crown className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Ready to Go Pro?</h3>
            <p className="text-blue-100 mb-6">
              Unlimited emails, advanced features, export functionality, and priority support
            </p>
            <button 
              onClick={() => navigate('/pricing')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Upgrade Now - $5/month
            </button>
          </div>
        )}
      </main>
    </div>
  )
}