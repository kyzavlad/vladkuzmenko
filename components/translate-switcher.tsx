'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  // …другие языки
]

export default function TranslateSwitcher() {
  const [current, setCurrent] = useState('en')

  // прочитаем куку единожды
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/)
    if (match) setCurrent(match[1])
  }, [])

  // меняем куку и перезагружаем
  function switchLang(lang: string) {
    document.cookie = `googtrans=/en/${lang};path=/`
    document.cookie = `googtrans=/en/${lang};path=/;domain=${location.hostname}`
    // только reload, без новой установки в beforeInteractive
    location.reload()
  }

  return (
    <div
      className="
        fixed bottom-16 right-4 z-[9999]
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
