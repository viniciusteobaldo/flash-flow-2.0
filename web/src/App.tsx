import { useState, useEffect } from 'react'
import type { Flashcard, ModalMode } from './types'
import {
  fetchFlashcards,
  fetchCategories,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from './services/api'
import { Header } from './components/Header'
import { CategoryFilter } from './components/CategoryFilter'
import { FlashcardCard } from './components/FlashcardCard'
import { FlashcardModal } from './components/FlashcardModal'
import { DeleteModal } from './components/DeleteModal'
import addIcon from './assets/add.png'

import Raio from './assets/raio.svg'

export function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [modalMode, setModalMode] = useState<ModalMode | null>(null)
  const [editingFlashcard, setEditingFlashcard] = useState<Flashcard | undefined>()
  const [flashcardToDelete, setFlashcardToDelete] = useState<Flashcard | null>(null)

  useEffect(() => {
    fetchFlashcards().then(setFlashcards).catch(console.error)
    fetchCategories().then(setCategories).catch(console.error)
  }, [])

  const filtered =
    selectedCategory === 'Todos'
      ? flashcards
      : flashcards.filter((f) => f.category === selectedCategory)

  function openCreate() {
    setEditingFlashcard(undefined)
    setModalMode('create')
  }

  function openEdit(flashcard: Flashcard) {
    setEditingFlashcard(flashcard)
    setModalMode('edit')
  }

  function closeModal() {
    setModalMode(null)
    setEditingFlashcard(undefined)
  }

  async function handleSave(data: { question: string; answer: string; category: string }) {
    if (modalMode === 'create') {
      const created = await createFlashcard(data)
      setFlashcards((prev) => [created, ...prev])
    } else if (modalMode === 'edit' && editingFlashcard) {
      const updated = await updateFlashcard(editingFlashcard.id, data)
      setFlashcards((prev) => prev.map((f) => (f.id === updated.id ? updated : f)))
    }
    closeModal()
  }

  async function handleDelete() {
    if (!flashcardToDelete) return
    await deleteFlashcard(flashcardToDelete.id)
    setFlashcards((prev) => prev.filter((f) => f.id !== flashcardToDelete.id))
    setFlashcardToDelete(null)
  }

  return (
    <div className="min-h-screen max-w-7xl m-auto bg-[#F7F9FB]">
      <Header onCreateClick={openCreate} />

      <main className="pt-16">
        {/* Hero + Filters */}
        <section className="px-8 py-10 flex items-center justify-between flex-wrap gap-8">
          <div>
            <span className="text-purple-300 font-bold text-xs uppercase">Painel de Aprendizado</span>
            <h1 className="font-manrope text-gray-300 font-extrabold text-4xl leading-tight">
              Domine tecnologia com foco <br /> total.
            </h1>
          </div>

          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Cards Grid */}
        <section className="px-8 py-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-12 h-12 bg-[#D9E4EA] rounded-full flex items-center justify-center">
                <img src={Raio} alt="Icone de Raio" />
              </div>
              <div>
                <p className="font-inter text-gray-200 font-regular max-w-xs m-auto text-sm mt-1">
                  {selectedCategory === 'Todos'
                    ? <p>Você ainda não possui flashcards. <br />Que tal criar um para começar?</p>
                    : `Nenhum card na categoria "${selectedCategory}".`}
                </p>
              </div>
              {selectedCategory === 'Todos' && (
                <button
                  onClick={openCreate}
                  className="bg-purple-300 hover:bg-purple-200 text-white text-sm font-semibold px-6 py-2.5 rounded-4xl transition-colors cursor-pointer"
                >
                  Novo Flashcard
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {filtered.map((flashcard) => (
                <FlashcardCard
                  key={flashcard.id}
                  flashcard={flashcard}
                  onEdit={openEdit}
                  onDelete={setFlashcardToDelete}
                />
              ))}

              {/* Add new card button */}
              <button
                onClick={openCreate}
                className="flex flex-col items-center justify-center h-80 max-w-96 w-full border-2 border-dashed bg-[#F0F4F7] border-[#A9B4B9] rounded-xl text-gray-200 hover:border-purple-200 hover:text-purple-200 transition-colors cursor-pointer gap-2"
              >
           
                <div className="flex items-center justify-center w-16 h-16 bg-[#D9E4EA] rounded-4xl">
                  <img src={addIcon} alt="Ícone de adicionar" />
                </div>
                <span className="font-manrope text-lg font-bold">Criar nova card</span>
                <p className="text-xs text-gray-200 font-normal">
                  Adicione um novo desafio à sua biblioteca e <br /> mantenha o ritmo.
                </p>
              </button>
            </div>
          )}
        </section>
      </main>

      {modalMode && (
        <FlashcardModal
          mode={modalMode}
          categories={categories}
          flashcard={editingFlashcard}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {flashcardToDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onClose={() => setFlashcardToDelete(null)}
        />
      )}
    </div>
  )
}
