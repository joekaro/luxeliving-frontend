// components/auth/RegisterModal.tsx - UPDATED WITH REAL AUTH
'use client'

import { useState } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { register, isLoading } = useAuth()

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const result = await register(formData.name, formData.email, formData.password)
    
    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        onClose()
        alert('Registration successful! Welcome to LuxeLiving Realty.')
      }, 1500)
    } else {
      setError(result.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fadeIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
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

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-center">
              <CheckCircle size={18} className="mr-2" />
              <span className="text-sm">Registration successful! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
                disabled={isLoading || success}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
                disabled={isLoading || success}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                disabled={isLoading || success}
              />
              <p className="text-gray-500 text-xs mt-1">At least 6 characters</p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                disabled={isLoading || success}
              />
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="terms" 
                className="mr-2" 
                required 
                disabled={isLoading || success}
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700">
                  Terms & Conditions
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full py-3 text-white rounded-lg font-bold transition-colors ${
                isLoading || success ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
            </button>

            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => {
                    onClose()
                    onSwitchToLogin()
                  }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}