import type { Flashcard } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

export async function fetchFlashcards(): Promise<Flashcard[]> {
  const res = await fetch(`${API_URL}/flashcards`)
  if (!res.ok) throw new Error('Failed to fetch flashcards')
  return res.json()
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function createFlashcard(
  data: Omit<Flashcard, 'id' | 'created_at'>
): Promise<Flashcard> {
  const res = await fetch(`${API_URL}/flashcards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create flashcard')
  return res.json()
}

export async function updateFlashcard(
  id: string,
  data: Omit<Flashcard, 'id' | 'created_at'>
): Promise<Flashcard> {
  const res = await fetch(`${API_URL}/flashcards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update flashcard')
  return res.json()
}

export async function deleteFlashcard(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/flashcards/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete flashcard')
}
