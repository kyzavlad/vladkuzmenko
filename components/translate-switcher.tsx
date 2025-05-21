'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  // …другие
]

export default function TranslateSwitcher() {
  const [current, setCurrent] = useState('en')

  useEffect(() => {
    const m = document.cookie.match(/googtrans=\/en\/([^;]+)/)
    if (m) setCurrent(m[1])
  }, [])

  function switchLang(lang: string) {
    document.cookie = `googtrans=/en/${lang};path=/`
    document.cookie = `googtrans=/en/${lang};path=/;domain=${location.hostname}`
    location.reload()
  }

  return (
    <div className="fixed bottom-24 right-4 z-[9999]">
      {/* анимированная градиентная рамка */}
      <div className="relative p-[2px] rounded-xl overflow-hidden animate-gradient">
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg flex items-center space-x-2 px-4 py-2 shadow-lg">
          <select
            value={current}
            onChange={e => switchLang(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded focus:outline-none"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
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
      </div>

      {/* градиентная анимация через global CSS */}
      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background: linear-gradient(270deg,
            #4ade80, #22d3ee, #a78bfa, #fb7185, #facc15);
          background-size: 500% 500%;
          animation: gradientBG 8s ease infinite;
        }
      `}</style>
    </div>
  )
}
