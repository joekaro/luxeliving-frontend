// components/layout/Navbar.tsx - UPDATED WITH DASHBOARD ACCESS
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, Phone, ChevronDown, LogOut, Home, Settings, Heart, Bell } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'

interface NavbarProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export default function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LL</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl sm:text-2xl font-bold text-gray-800">LuxeLiving</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">Realty</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Properties
            </Link>
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                More
                <ChevronDown size={16} className="ml-1" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link href="/agents" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Agents
                  </Link>
                  <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Blog
                  </Link>
                  <Link href="/guides" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Guides
                  </Link>
                  <Link href="/market" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Market
                  </Link>
                  <Link href="/calculator" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Calculator
                  </Link>
                </div>
              )}
            </div>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sell
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium hidden lg:inline">
                      Hi, {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  
                  {isUserDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-50 border">
                      <div className="px-4 py-3 border-b">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      </div>
                      
                      <Link 
                        href="/dashboard" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Home size={18} className="mr-3" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link 
                        href="/saved" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Heart size={18} className="mr-3" />
                        <span>Saved Properties</span>
                      </Link>
                      
                      <Link 
                        href="/dashboard?tab=settings" 
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Settings size={18} className="mr-3" />
                        <span>Account Settings</span>
                      </Link>
                      
                      <div className="border-t mt-2 pt-2">
                        <button 
                          onClick={() => {
                            logout()
                            setIsUserDropdownOpen(false)
                          }}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={18} className="mr-3" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={onLoginClick}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Login"
                >
                  <User size={20} />
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden lg:inline">Create Account</span>
                  <span className="lg:hidden">Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/properties" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Properties
              </Link>
              <Link href="/agents" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Agents
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/guides" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Guides
              </Link>
              <Link href="/market" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Market
              </Link>
              <Link href="/calculator" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Calculator
              </Link>
              <Link href="/sell" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Sell
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 py-2" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              
              <div className="pt-4 border-t flex flex-col space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    
                    <Link 
                      href="/dashboard" 
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Home size={20} />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link 
                      href="/saved" 
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart size={20} />
                      <span>Saved Properties</span>
                    </Link>
                    
                    <Link 
                      href="/dashboard?tab=settings" 
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings size={20} />
                      <span>Account Settings</span>
                    </Link>
                    
                    <button 
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 text-red-600 hover:text-red-700 py-3"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onLoginClick()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 py-3"
                    >
                      <User size={20} />
                      <span>Login</span>
                    </button>
                    <button 
                      onClick={() => {
                        onRegisterClick()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
                    >
                      <span>Create Account</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}