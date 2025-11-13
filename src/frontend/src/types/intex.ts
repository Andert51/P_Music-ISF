/**
 * Tipos para Sprint 2
 * Versión inicial (Sesión 1)
 */

export interface Song {
  id: number
  title: string
  artist: string
  duration: number
  genre: string
  file_path: string
  cover_image?: string | null
  created_at: string
  user_id: number
}

export interface Album {
  id: number
  title: string
  description?: string | null
  cover_image?: string | null
  release_date?: string | null
  user_id: number
  created_at: string
}

export interface User {
  id: number
  username: string
  email: string
  full_name?: string | null
  role: 'listener' | 'creator' | 'admin'
}
