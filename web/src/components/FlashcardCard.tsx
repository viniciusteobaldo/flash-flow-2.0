import { useState } from 'react'
import type { Flashcard } from '../types'

interface FlashcardCardProps {
  flashcard: Flashcard
  onEdit: (flashcard: Flashcard) => void
  onDelete: (flashcard: Flashcard) => void
}

export function FlashcardCard({ flashcard, onEdit, onDelete }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  function handleFlip(e: React.MouseEvent) {
    e.stopPropagation()
    setIsFlipped((prev) => !prev)
  }

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation()
    onEdit(flashcard)
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation()
    onDelete(flashcard)
  }

  return (
    <div className="card-flip-container h-80 max-w-96 w-full">
      <div className={`card-flip-inner h-full w-full b-shadow ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="card-face bg-white rounded-xl p-5 flex flex-col h-full relative group">
          <div className="flex items-start justify-between shrink-0">
            <span className="bg-[#F0F4F7] text-gray-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
              {flashcard.category}
            </span>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleEdit}
                title="Editar"
                className="text-gray-200 hover:text-purple-300 transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11.333 2a1.885 1.885 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                title="Excluir"
                className="text-gray-200 hover:text-red-500 transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M5.333 4V2.667a.667.667 0 0 1 .667-.667h4a.667.667 0 0 1 .667.667V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333A.667.667 0 0 0 4.667 14h6.666a.667.667 0 0 0 .667-.667L12.667 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mt-4 flex items-center justify-center">
            <p className="text-gray-300 font-bold text-lg leading-relaxed text-center w-full wrap-break-word">
              {flashcard.question}
            </p>
          </div>

          <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100 shrink-0">
            <button
              onClick={handleFlip}
              title="Virar card"
              className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-200 hover:text-purple-300 hover:border-purple-100 transition-colors cursor-pointer"
            >
              <img src="src/assets/rotate.png" alt="Virar card" />
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="card-face card-back bg-white rounded-xl p-5 flex flex-col h-full relative group">
          <div className="flex items-start justify-between shrink-0">
            <span className="bg-gray-100 text-gray-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
              {flashcard.category}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleEdit}
                title="Editar"
                className="text-gray-200 hover:text-purple-300 transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11.333 2a1.885 1.885 0 0 1 2.667 2.667L4.667 14H2v-2.667L11.333 2Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                title="Excluir"
                className="text-gray-200 hover:text-red-500 transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M5.333 4V2.667a.667.667 0 0 1 .667-.667h4a.667.667 0 0 1 .667.667V4M6.667 7.333v4M9.333 7.333v4M3.333 4l.667 9.333A.667.667 0 0 0 4.667 14h6.666a.667.667 0 0 0 .667-.667L12.667 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mt-4">
            <div className="text-center flex flex-col items-center gap-2 py-2">
              <p className="font-inter text-gray-200 text-xs font-medium w-full wrap-break-word">
                {flashcard.question}
              </p>

              <p className="text-purple-300 font-medium text-sm leading-relaxed w-full wrap-break-word">
                {flashcard.answer}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end mt-4 pt-3 border-t border-purple-100 shrink-0">
            <button
              onClick={handleFlip}
              title="Virar card"
              className="w-8 h-8 rounded-full border border-purple-100 flex items-center justify-center text-purple-300 hover:text-purple-200 hover:border-purple-200 transition-colors cursor-pointer"
            >
              <img src="src/assets/rotate.png" alt="Virar card" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
