interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const all = ['Todos', ...categories]

  return (
    <div className="flex items-center gap-2 flex-wrap bg-[#F0F4F7] p-3 rounded-full">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`font-inter px-4 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selected === cat
              ? 'bg-purple-100 text-purple-300'
              : 'bg-transparent text-gray-300 hover:border-purple-200 hover:text-purple-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
