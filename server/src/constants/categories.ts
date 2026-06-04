export const CATEGORIES = [
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Node',
] as const

export type Category = (typeof CATEGORIES)[number]
