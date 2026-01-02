// app/dashboard/admin/page.tsx - ADMIN DASHBOARD
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { 
  Home, Users, UserPlus, Building, PlusCircle, 
  BarChart, Settings, Eye, Edit, Trash2, Check, X,
  DollarSign, Calendar, TrendingUp
} from 'lucide-react'
import { api, User, Property } from '@/lib/api'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalAgents: 0,
    pendingListings: 0
  })
  const [users, setUsers] = useState<User[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/')
      return
    }
    fetchDashboardData()
  }, [user, router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch dashboard stats
      const statsResponse = await api.getDashboardStats()
      if (statsResponse.success && statsResponse.data) {
        setStats({
          totalProperties: statsResponse.data.totalProperties,
          totalUsers: statsResponse.data.totalUsers,
          totalAgents: statsResponse.data.totalAgents,
          pendingListings: 0 // You'll need to add this to your API
        })
        setProperties(statsResponse.data.recentProperties || [])
        setUsers(statsResponse.data.recentUsers || [])
      }
      
      // Fetch all users
      const usersResponse = await api.getAllUsers()
      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data)
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!confirm(`Change user role to ${newRole}?`)) return
    
    try {
      const response = await api.updateUserRole(userId, newRole)
      if (response.success) {
        alert('User role updated successfully')
        fetchDashboardData()
      }
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update user role')
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart size={20} /> },
    { id: 'properties', label: 'Properties', icon: <Home size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'agents', label: 'Agents', icon: <UserPlus size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-200">Manage your real estate platform</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                ADMIN
              </span>
              <Link
                href="/properties/add"
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 font-bold"
              >
                <PlusCircle size={20} />
                <span>Add Property</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.totalProperties}</div>
                <div className="text-gray-600">Total Properties</div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Home className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.totalUsers}</div>
                <div className="text-gray-600">Total Users</div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.totalAgents}</div>
                <div className="text-gray-600">Active Agents</div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserPlus className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800">{stats.pendingListings}</div>
                <div className="text-gray-600">Pending Listings</div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Admin Menu</h3>
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Properties */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Properties</h2>
                    <Link href="/properties" className="text-blue-600 hover:text-blue-700 text-sm">
                      View All →
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 text-gray-600">Property</th>
                          <th className="text-left py-3 text-gray-600">Price</th>
                          <th className="text-left py-3 text-gray-600">Status</th>
                          <th className="text-left py-3 text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.slice(0, 5).map((property) => (
                          <tr key={property.id} className="border-b hover:bg-gray-50">
                            <td className="py-3">
                              <div>
                                <div className="font-medium">{property.title}</div>
                                <div className="text-sm text-gray-600">{property.location}</div>
                              </div>
                            </td>
                            <td className="py-3">${property.price.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                property.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                                property.status === 'SOLD' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {property.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <Link 
                                  href={`/properties/${property.id}`}
                                  className="p-1 text-blue-600 hover:text-blue-700"
                                  title="View"
                                >
                                  <Eye size={18} />
                                </Link>
                                <Link 
                                  href={`/properties/${property.id}/edit`}
                                  className="p-1 text-green-600 hover:text-green-700"
                                  title="Edit"
                                >
                                  <Edit size={18} />
                                </Link>
                                <button
                                  onClick={() => {
                                    if (confirm('Delete this property?')) {
                                      // Handle delete
                                    }
                                  }}
                                  className="p-1 text-red-600 hover:text-red-700"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      View All →
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 text-gray-600">User</th>
                          <th className="text-left py-3 text-gray-600">Role</th>
                          <th className="text-left py-3 text-gray-600">Joined</th>
                          <th className="text-left py-3 text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                              </div>
                            </td>
                            <td className="py-3">
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="border rounded p-1 text-sm"
                              >
                                <option value="USER">User</option>
                                <option value="AGENT">Agent</option>
                                <option value="ADMIN">Admin</option>
                              </select>
                            </td>
                            <td className="py-3">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-600 hover:text-blue-700">
                                  <Eye size={18} />
                                </button>
                                <button className="p-1 text-red-600 hover:text-red-700">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">All Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 text-gray-600">User</th>
                        <th className="text-left py-3 text-gray-600">Role</th>
                        <th className="text-left py-3 text-gray-600">Email</th>
                        <th className="text-left py-3 text-gray-600">Joined</th>
                        <th className="text-left py-3 text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-bold">
                                  {user.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.phone || 'No phone'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="border rounded p-1 text-sm"
                            >
                              <option value="USER">User</option>
                              <option value="AGENT">Agent</option>
                              <option value="ADMIN">Admin</option>
                            </select>
                          </td>
                          <td className="py-3">{user.email}</td>
                          <td className="py-3">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-700">
                                <Eye size={18} />
                              </button>
                              <button className="p-1 text-red-600 hover:text-red-700">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}