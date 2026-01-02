// components/auth/LoginModal.tsx - FIXED VERSION
'use client'

import { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const result = await login(email, password)
    
    if (result.success) {
      onClose()
      // Show success message or redirect
      alert('Login successful! Welcome back.')
    } else {
      setError(result.message || 'Login failed. Please try again.')
    }
  }

  const handleDemoLogin = async () => {
    // Set demo credentials
    setEmail('john@example.com')
    setPassword('password123')
    
    // Wait a moment so user can see the fields filled
    setTimeout(async () => {
      const result = await login('john@example.com', 'password123')
      if (result.success) {
        onClose()
        alert('Demo login successful! Welcome John.')
      }
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fadeIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" disabled={isLoading} />
                <span className="text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700 text-sm">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white rounded-lg font-bold transition-colors ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
            >
              Try Demo Account
            </button>

            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button 
                  type="button" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => {
                    onClose()
                    onSwitchToRegister()
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}