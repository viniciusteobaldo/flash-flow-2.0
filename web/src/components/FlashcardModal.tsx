import { useState, useEffect, type SubmitEvent } from 'react'
import type { Flashcard, ModalMode } from '../types'
import pasteIcon from '../assets/paste.png'
import chevronIcon from '../assets/chevron.png'
import questionIcon from '../assets/question.png'
import descriptionIcon from '../assets/description.png'

interface FlashcardModalProps {
  mode: ModalMode
  categories: string[]
  flashcard?: Flashcard
  onSave: (data: { question: string; answer: string; category: string }) => Promise<void>
  onClose: () => void
}

export function FlashcardModal({
  mode,
  categories,
  flashcard,
  onSave,
  onClose,
}: FlashcardModalProps) {
  const [category, setCategory] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && flashcard) {
      setCategory(flashcard.category)
      setQuestion(flashcard.question)
      setAnswer(flashcard.answer)
    } else {
      setCategory('')
      setQuestion('')
      setAnswer('')
    }
  }, [mode, flashcard])

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!category || !question.trim() || !answer.trim()) return
    setLoading(true)
    try {
      await onSave({ question: question.trim(), answer: answer.trim(), category })
    } finally {
      setLoading(false)
    }
  }

  const isCreate = mode === 'create'

  return (
    <div
      data-modal-backdrop="static"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-300">
            {isCreate ? 'Criar Flashcard' : 'Editar Flashcard'}
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Organize seu conhecimento com precisão e clareza
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-inter tracking-widest font-bold text-gray-200 uppercase">
              Categoria
            </label>
            <div className="relative flex items-center">
              <img src={pasteIcon} alt="" className="absolute left-3 pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-100 rounded-lg pl-9 pr-9 py-2.5 text-sm text-gray-300 bg-white focus:outline-none focus:border-purple-200 focus:ring-2 focus:ring-purple-200/20 transition-all appearance-none cursor-pointer"
              >
                <option id="category-option-placeholder" value="" disabled>
                  Selecione a categoria do card
                </option>
                {categories.map((cat) => (
                  <option key={cat} id={`category-option-${cat.toLowerCase().replace(/\s+/g, '-')}`} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <img src={chevronIcon} alt="" className="absolute right-3 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-inter tracking-widest font-bold text-gray-200 uppercase">
              Pergunta
            </label>
            <div className="relative">
              <img src={questionIcon} alt="" className="absolute left-3 top-3 w-4 h-4 pointer-events-none" />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ex: O que é uma Closure no JavaScript?"
                required
                className="w-full h-24 border border-gray-100 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-200 font-medium placeholder:text-[#9ca3af] focus:outline-none focus:border-purple-200 focus:ring-2 focus:ring-purple-200/20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-inter tracking-widest font-bold text-gray-200 uppercase">
              Resposta
            </label>
            <div className="relative">
              <img src={descriptionIcon} alt="" className="absolute left-3 top-4 pointer-events-none" />
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Ex: Uma closure é a combinação de uma função com o ambiente léxico..."
                required
                rows={3}
                className="w-full h-32 border border-gray-100 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-300 placeholder:text-[#9ca3af] focus:outline-none focus:border-purple-200 focus:ring-2 focus:ring-purple-200/20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border bg-gray-100 text-gray-200 border-gray-100 text-sm font-semibold py-2.5 rounded-4xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-300 hover:bg-purple-200 text-white text-sm font-semibold py-2.5 rounded-4xl transition-colors disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
