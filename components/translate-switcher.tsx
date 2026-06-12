// components/TranslateSwitcher.tsx
'use client'

import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'; // Иконка глобуса. Установите: npm install lucide-react

export default function TranslateSwitcher() {
  // Список языков для переключения
  const [langs, setLangs] = useState([
    { code: 'en', label: 'English' }, // Английский по умолчанию
    { code: 'ru', label: 'Русский' },
    { code: 'uk', label: 'Українська' },
  ]);
  // Текущий выбранный язык (код)
  const [currentLangCode, setCurrentLangCode] = useState('en');

  useEffect(() => {
    // 1) Определяем ранее выбранный язык из cookie
    const cookieMatch = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (cookieMatch && cookieMatch[1]) {
      const langFromCookie = cookieMatch[1];
      if (langs.some(l => l.code === langFromCookie)) {
        setCurrentLangCode(langFromCookie);
      }
    }

    // 2) Опционально: добавляем язык браузера пользователя
    if (typeof navigator !== 'undefined') {
      const userBrowserLang = navigator.language.split('-')[0];
      if (userBrowserLang !== 'en' && !langs.find(l => l.code === userBrowserLang)) {
        setLangs(prevLangs => [
          { code: userBrowserLang, label: userBrowserLang.toUpperCase() },
          ...prevLangs.filter(l => l.code !== userBrowserLang)
        ]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function switchLang(targetLangCode: string) {
    document.cookie = `googtrans=/en/${targetLangCode};path=/`;
    window.location.reload();
  }

  return (
    <div
      className="
        fixed bottom-24 right-4 z-[9999] /* ИЗМЕНЕНО: Позиционирование как было у вас раньше (bottom-24, right-4) */
        bg-white 
        rounded-lg 
        shadow-md 
        border border-neutral-300 
        flex items-center 
        px-3 py-2 
        space-x-2.5 
      "
    >
      <Globe size={18} className="text-neutral-500" />
      
      <select
        value={currentLangCode}
        onChange={e => switchLang(e.target.value)}
        className="
          bg-white 
          text-neutral-700 text-sm 
          border border-neutral-300 
          rounded-md 
          py-1 px-2 
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 
          cursor-pointer
        "
        aria-label="Select language"
      >
        {langs.map(lang => (
          <option key={lang.code} value={lang.code} className="text-black bg-white">
            {lang.label}
          </option>
        ))}
      </select>

      {currentLangCode !== 'en' && (
        <button
          onClick={() => switchLang('en')}
          className="
            text-xs 
            text-blue-600 
            hover:underline 
            whitespace-nowrap
          "
          title="Switch to English (Original)"
        >
          Original
        </button>
      )}
    </div>
  );
}
