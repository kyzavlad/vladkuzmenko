'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  // …добавьте другие по нужде
]

export default function TranslateSwitcher() {
  const [current, setCurrent] = useState('en')

  // Читаем из куки, чтобы знать текущий язык
  useEffect(() => {
    const m = document.cookie.match(/googtrans=\/en\/([^;]+)/)
    if (m) setCurrent(m[1])
  }, [])

  // Смена языка: ставим куку и перезагружаем страницу
  function switchLang(lang: string) {
    document.cookie = `googtrans=/en/${lang};path=/`
    document.cookie = `googtrans=/en/${lang};path=/;domain=${location.hostname}`
    location.reload()
  }

  return (
    <div
      className="
        fixed bottom-4 right-4 z-50
        bg-white bg-opacity-90 backdrop-blur-sm
        border border-gray-200 rounded-lg p-2
        flex items-center space-x-2 shadow-lg
      "
    >
      <select
        value={current}
        onChange={e => switchLang(e.target.value)}
        className="px-2 py-1 border rounded"
      >
        {LANGUAGES.map(l => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>

      {current !== 'en' && (
        <button
          onClick={() => switchLang('en')}
          className="text-sm underline"
        >
          Оригинал
        </button>
      )}
    </div>
  )
}
