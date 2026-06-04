import { useState } from 'react'
import trashIcon from '../assets/trash.png' 

interface DeleteModalProps {
  onConfirm: () => Promise<void>
  onClose: () => void
}

export function DeleteModal({ onConfirm, onClose }: DeleteModalProps) {
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      data-modal-backdrop="static"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm mx-4 p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <img src={trashIcon} alt="Ícone de lixeira" className="w-5" />
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-300 leading-snug mb-3">
          Tem certeza que deseja excluir<br />este card?
        </h2>

        <p className="text-sm text-gray-200 font-normal leading-relaxed mb-7">
          Esta ação não pode ser desfeita e o card será removido
          permanentemente da sua biblioteca.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-100 bg-gray-100 text-gray-300 font-manrope text-sm font-semibold py-2.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-[#9E3F4E] hover:bg-red-600 text-white font-manrope text-sm font-bold py-2.5 rounded-full transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  )
}
