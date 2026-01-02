// app/dashboard/page.tsx - ENHANCED WITH TABS
'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { 
  User, Heart, Eye, MessageSquare, Settings, LogOut, 
  Home, Bell, CreditCard, Calendar, Star, Shield 
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { icon: <Heart size={20} />, label: 'Saved Properties', value: 12, color: 'text-red-500', link: '/saved' },
    { icon: <Eye size={20} />, label: 'Property Views', value: 42, color: 'text-blue-500' },
    { icon: <Calendar size={20} />, label: 'Scheduled Tours', value: 3, color: 'text-green-500' },
    { icon: <MessageSquare size={20} />, label: 'Messages', value: 8, color: 'text-purple-500' },
  ]

  const recentActivity = [
    { action: 'Viewed "Modern Luxury Villa"', time: '2 hours ago', type: 'view' },
    { action: 'Saved "Downtown Penthouse" to favorites', time: 'Yesterday', type: 'save' },
    { action: 'Scheduled tour for "Lakeside Retreat"', time: '3 days ago', type: 'tour' },
    { action: 'Updated profile information', time: '1 week ago', type: 'profile' },
    { action: 'Contacted agent Sarah Johnson', time: '1 week ago', type: 'message' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Home size={18} /> },
    { id: 'properties', label: 'My Properties', icon: <Heart size={18} /> },
    { id: 'tours', label: 'Scheduled Tours', icon: <Calendar size={18} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center mt-2">
                  <Shield size={14} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Verified Account</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Dashboard Menu</h3>
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => router.push('/properties')}
                    className="w-full text-left p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Browse Properties
                  </button>
                  <button 
                    onClick={() => router.push('/sell')}
                    className="w-full text-left p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    List a Property
                  </button>
                  <button 
                    onClick={() => router.push('/calculator')}
                    className="w-full text-left p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Mortgage Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => stat.link && router.push(stat.link)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.color.replace('text', 'bg')}/10`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {activity.type === 'view' && <Eye size={18} className="text-blue-600" />}
                            {activity.type === 'save' && <Heart size={18} className="text-red-600" />}
                            {activity.type === 'tour' && <Calendar size={18} className="text-green-600" />}
                            {activity.type === 'profile' && <User size={18} className="text-purple-600" />}
                            {activity.type === 'message' && <MessageSquare size={18} className="text-yellow-600" />}
                          </div>
                          <div>
                            <p className="text-gray-700">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'properties' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">My Saved Properties</h2>
                  <div className="text-center py-12">
                    <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">You have 12 saved properties</p>
                    <button 
                      onClick={() => router.push('/saved')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View All Saved Properties
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-700 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-700 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Email notifications for new properties</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Property price change alerts</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}