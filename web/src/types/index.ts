export interface Flashcard {
  id: string
  question: string
  answer: string
  category: string
  created_at: string
}

export type ModalMode = 'create' | 'edit'
