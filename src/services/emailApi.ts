import axios from 'axios'
import type { Email, EmailResponse, PaginationParams } from '../types/email'

export interface EmailApiParams extends PaginationParams {
  search?: string
  filter?: string
  sort?: string
}

// Real API base URL
const API_BASE_URL = 'https://email-list-api-3.onrender.com'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased timeout for external API
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth and redirect to login
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const emailApi = {
  // Authenticate user
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      const response = await api.post('/api/auth', { email, password })
      return response.data
    } catch (error) {
      console.error('Authentication failed:', error)
      throw error
    }
  },

  // Get emails with pagination and filters
  async getEmails(params: EmailApiParams): Promise<EmailResponse> {
    try {
      const queryParams = new URLSearchParams()

      // Add pagination
      queryParams.append('page', params.page.toString())
      queryParams.append('limit', params.limit.toString())

      // Add search if provided
      if (params.search) {
        queryParams.append('search', params.search)
      }

      // Add filter if provided and not 'all'
      if (params.filter && params.filter !== 'all') {
        queryParams.append('filter', params.filter)
      }

      // Add sort if provided
      if (params.sort) {
        queryParams.append('sort', params.sort)
      }

      const response = await api.get(`/api/emails?${queryParams.toString()}`)

      // Transform response to match our interface
      const data = response.data
      return {
        emails: data.emails || data.data || [],
        total: data.total || data.totalCount || 0,
        page: data.page || data.currentPage || params.page,
        limit: data.limit || data.pageSize || params.limit,
        totalPages: data.totalPages || Math.ceil((data.total || 0) / params.limit),
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error)

      // For development/demo purposes, return empty state
      return {
        emails: [],
        total: 0,
        page: params.page,
        limit: params.limit,
        totalPages: 0,
      }
    }
  },

  // Get a single email by ID
  async getEmail(id: string): Promise<Email> {
    try {
      const response = await api.get(`/api/emails/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch email:', error)
      throw error
    }
  },

  // Update an email (mark as read, star, etc.)
  async updateEmail(id: string, updates: Partial<Email>): Promise<Email> {
    try {
      const response = await api.patch(`/api/emails/${id}`, updates)
      return response.data
    } catch (error) {
      console.error('Failed to update email:', error)
      throw error
    }
  },

  // Search emails (may be handled by getEmails with search param)
  async searchEmails(query: string, pagination: PaginationParams): Promise<EmailResponse> {
    return this.getEmails({
      ...pagination,
      search: query,
    })
  },
}