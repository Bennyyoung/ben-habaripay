// API client configuration
const API_BASE_URL = 'https://email-list-api-3.onrender.com';

export interface EmailContact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  isSubscribed: boolean;
  tags?: string[];
  lastEngagement?: string;
  source?: string;
}

export interface ApiResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ApiError extends Error {
  public status: number;

  constructor(options: { message: string; status: number }) {
    super(options.message);
    this.status = options.status;
    this.name = 'ApiError';
  }
}

// Generic API client
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage if available
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new ApiError({
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        });
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError({
        message: error instanceof Error ? error.message : 'Network error',
        status: 0,
      });
    }
  }

  // Email contacts endpoints
  async getContacts(params: {
    page?: number;
    limit?: number;
    search?: string;
    source?: string;
    isSubscribed?: boolean;
  } = {}): Promise<ApiResponse<EmailContact>> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.source) queryParams.append('source', params.source);
    if (params.isSubscribed !== undefined) {
      queryParams.append('isSubscribed', params.isSubscribed.toString());
    }

    const query = queryParams.toString();
    const endpoint = `/contacts${query ? `?${query}` : ''}`;
    
    return this.request<ApiResponse<EmailContact>>(endpoint);
  }

  async getContact(id: string): Promise<EmailContact> {
    return this.request<EmailContact>(`/contacts/${id}`);
  }

  async createContact(contact: Partial<EmailContact>): Promise<EmailContact> {
    return this.request<EmailContact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  async updateContact(id: string, contact: Partial<EmailContact>): Promise<EmailContact> {
    return this.request<EmailContact>(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contact),
    });
  }

  async deleteContact(id: string): Promise<void> {
    return this.request<void>(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Authentication endpoints (mock implementation)
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    // Mock authentication - in a real app this would call the API
    if (email === 'demo@brutalism.com' && password === 'demo123') {
      const mockToken = 'mock-jwt-token-' + Date.now();
      const user = {
        id: '1',
        name: 'Demo User',
        email: 'demo@brutalism.com',
      };
      
      this.setToken(mockToken);
      return { token: mockToken, user };
    }
    
    throw new ApiError({
      message: 'Invalid credentials',
      status: 401,
    });
  }

  logout() {
    this.setToken(null);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);