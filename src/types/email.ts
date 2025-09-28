export interface Email {
  id: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  labels: string[]
  attachments?: number
}

export interface EmailFilters {
  search: string
  isRead?: boolean
  isStarred?: boolean
  isImportant?: boolean
  label?: string
}

export interface EmailResponse {
  emails: Email[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginationParams {
  page: number
  limit: number
}