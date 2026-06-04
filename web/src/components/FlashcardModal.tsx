import { useState, useEffect, useRef, type SubmitEvent } from 'react'
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
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = 'flashcard-modal-title'

  // Opens the native dialog and restores focus to the trigger element on unmount
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    return () => {
      previousFocus?.focus()
    }
  }, [])

  // ESC key fires the native 'cancel' event — prevent default close and delegate to React state
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    function handleCancel(e: Event) {
      e.preventDefault()
      onClose()
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose])

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
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="w-full max-w-md rounded-2xl p-8 shadow-2xl bg-white"
    >
      <div className="mb-6">
        <h2 id={titleId} className="text-xl font-bold text-gray-300">
          {isCreate ? 'Criar Flashcard' : 'Editar Flashcard'}
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Organize seu conhecimento com precisão e clareza
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-busy={loading}
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="modal-category"
            className="text-[10px] font-inter tracking-widest font-bold text-gray-200 uppercase"
          >
            Categoria
          </label>
          <div className="relative flex items-center">
            <img src={pasteIcon} alt="" aria-hidden="true" className="absolute left-3 pointer-events-none" />
            <select
              id="modal-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              autoFocus
              className="w-full border border-gray-100 rounded-lg pl-9 pr-9 py-2.5 text-sm text-gray-300 bg-white focus:outline-none focus:border-purple-200 focus:ring-2 focus:ring-purple-200/20 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Selecione a categoria do card
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <img src={chevronIcon} alt="" aria-hidden="true" className="absolute right-3 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="modal-question"
            className="text-[10px] font-inter tracking-widest font-bold text-gray-200 uppercase"
          >
            Pergunta
          </label>
          <div className="relative">
            <img src={questionIcon} alt="" aria-hidden="true" className="absolute left-3 top-3 w-4 h-4 pointer-events-none" />
            <textarea
              id="modal-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: O que é uma Closure no JavaScript?"
              required
              className="w-full h-24 border border-gray-100 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-200 font-medium placeholder:text-[#9ca3af] focus:outline-none focus:border-purple-200 focus:ring-2 focus:ring-purple-200/20 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="modal-answer"
            className="text-[10px] font-inter tracking-widest font-bold text-gray-200 uppercase"
          >
            Resposta
          </label>
          <div className="relative">
            <img src={descriptionIcon} alt="" aria-hidden="true" className="absolute left-3 top-4 pointer-events-none" />
            <textarea
              id="modal-answer"
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
            disabled={loading}
            className="flex-1 border bg-gray-100 text-gray-200 border-gray-100 text-sm font-semibold py-2.5 rounded-4xl hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-300 hover:bg-purple-200 text-white text-sm font-semibold py-2.5 rounded-4xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>

      {/* Região live para anunciar mudanças de estado assíncrono a leitores de tela */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {loading ? 'Salvando flashcard, aguarde...' : ''}
      </div>
    </dialog>
  )
}
