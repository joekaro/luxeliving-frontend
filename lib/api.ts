// lib/api.ts - EXPANDED VERSION
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'AGENT' | 'ADMIN'
  phone?: string
  avatar?: string
  createdAt: string
}

export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  sqft: number
  propertyType: 'HOUSE' | 'APARTMENT' | 'VILLA' | 'CONDO' | 'TOWNHOUSE'
  status: 'AVAILABLE' | 'SOLD' | 'PENDING'
  images: string[]
  features: string[]
  amenities: string[]
  isFeatured: boolean
  yearBuilt?: number
  garage?: number
  agentId: string
  agent?: User
  createdAt: string
  updatedAt: string
}

export interface Agent extends User {
  bio?: string
  experience?: number
  listingsCount?: number
  specialties?: string[]
  licenseNumber?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  total?: number
  page?: number
  totalPages?: number
}

class ApiService {
  private getHeaders() {
    const token = localStorage.getItem('token')
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
  }

  // ========== AUTH ENDPOINTS ==========
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    })
    return response.json()
  }

  async register(data: {
    name: string
    email: string
    password: string
    phone?: string
    role?: 'USER' | 'AGENT'
  }): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  // ========== PROPERTY ENDPOINTS ==========
  async getProperties(params?: {
    page?: number
    limit?: number
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
    bathrooms?: number
    propertyType?: string
    location?: string
    status?: string
    agentId?: string
  }): Promise<ApiResponse<{ properties: Property[]; total: number; page: number; totalPages: number }>> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const response = await fetch(`${API_URL}/properties?${queryParams}`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async getFeaturedProperties(): Promise<ApiResponse<Property[]>> {
    const response = await fetch(`${API_URL}/properties/featured`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async createProperty(data: Partial<Property>): Promise<ApiResponse<Property>> {
    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async updateProperty(id: string, data: Partial<Property>): Promise<ApiResponse<Property>> {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async deleteProperty(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })
    return response.json()
  }

  // ========== USER/SAVED PROPERTIES ==========
  async getSavedProperties(userId: string): Promise<ApiResponse<Property[]>> {
    const response = await fetch(`${API_URL}/users/${userId}/saved-properties`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async saveProperty(userId: string, propertyId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/users/${userId}/saved-properties`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ propertyId })
    })
    return response.json()
  }

  async unsaveProperty(userId: string, propertyId: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/users/${userId}/saved-properties/${propertyId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    })
    return response.json()
  }

  // ========== AGENT ENDPOINTS ==========
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    const response = await fetch(`${API_URL}/agents`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async getAgent(id: string): Promise<ApiResponse<Agent>> {
    const response = await fetch(`${API_URL}/agents/${id}`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async getAgentProperties(agentId: string): Promise<ApiResponse<Property[]>> {
    const response = await fetch(`${API_URL}/agents/${agentId}/properties`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  // ========== ADMIN ENDPOINTS ==========
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: this.getHeaders()
    })
    return response.json()
  }

  async updateUserRole(userId: string, role: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ role })
    })
    return response.json()
  }

  async getDashboardStats(): Promise<ApiResponse<{
    totalProperties: number
    totalUsers: number
    totalAgents: number
    recentProperties: Property[]
    recentUsers: User[]
  }>> {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      headers: this.getHeaders()
    })
    return response.json()
  }
}

export const api = new ApiService()