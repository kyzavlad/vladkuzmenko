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
    // Google Translate использует cookie 'googtrans' в формате /sourceLang/targetLang (например, /en/ru)
    // Мы предполагаем, что исходный язык страницы всегда 'en', как указано в pageLanguage в layout.tsx
    const cookieMatch = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (cookieMatch && cookieMatch[1]) {
      const langFromCookie = cookieMatch[1];
      // Устанавливаем текущий язык, если он есть в нашем списке
      if (langs.some(l => l.code === langFromCookie)) {
        setCurrentLangCode(langFromCookie);
      }
    }

    // 2) Опционально: добавляем язык браузера пользователя в список, если его там нет
    // и он не является английским (чтобы не дублировать)
    if (typeof navigator !== 'undefined') {
      const userBrowserLang = navigator.language.split('-')[0];
      if (userBrowserLang !== 'en' && !langs.find(l => l.code === userBrowserLang)) {
        // Добавляем в начало списка, если такого языка еще нет
        setLangs(prevLangs => [
          { code: userBrowserLang, label: userBrowserLang.toUpperCase() }, // Отображаем код языка в верхнем регистре
          ...prevLangs.filter(l => l.code !== userBrowserLang) // Убираем возможное дублирование
        ]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Этот эффект должен запускаться один раз при монтировании компонента

  function switchLang(targetLangCode: string) {
    // Устанавливаем cookie, который использует Google Translate для смены языка.
    // Предполагаем, что исходный язык страницы 'en'.
    document.cookie = `googtrans=/en/${targetLangCode};path=/`;
    // Перезагружаем страницу, чтобы Google Translate применил новый язык.
    window.location.reload();
  }

  return (
    // Основной контейнер для переключателя языков:
    // - Позиционирован внизу справа
    // - Белый фон
    // - Легкий темный контур (серая рамка)
    // - Не слишком броский, но заметный
    <div
      className="
        fixed bottom-5 right-5 z-[9999] /* Позиционирование (z-index для отображения поверх других элементов) */
        bg-white /* Сплошной белый фон */
        rounded-lg /* Скругленные углы для всего виджета */
        shadow-md /* Мягкая тень (менее броская, чем shadow-lg) */
        border border-neutral-300 /* Легкий сероватый контур. Для более темного можно neutral-400 */
        flex items-center /* Элементы внутри (иконка, select, кнопка) выровнены по горизонтали */
        px-3 py-2 /* Внутренние отступы в виджете */
        space-x-2.5 /* Пространство между элементами внутри */
      "
    >
      {/* Иконка глобуса для наглядности */}
      <Globe size={18} className="text-neutral-500" /> {/* Цвет иконки можно настроить */}

      <select
        value={currentLangCode}
        onChange={e => switchLang(e.target.value)}
        // Стили для выпадающего списка <select>
        className="
          bg-white /* Белый фон для самого select */
          text-neutral-700 text-sm /* Темный цвет текста, стандартный размер шрифта */
          border border-neutral-300 /* Рамка для select, соответствует общей рамке виджета */
          rounded-md /* Скругленные углы для select */
          py-1 px-2 /* Внутренние отступы в select */
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 /* Стили при фокусе */
          cursor-pointer /* Указывает, что элемент кликабельный */
        "
        aria-label="Select language" // Для доступности
      >
        {langs.map(lang => (
          <option key={lang.code} value={lang.code} className="text-black bg-white"> {/* Опции должны быть читаемыми */}
            {lang.label}
          </option>
        ))}
      </select>

      {/* Кнопка "Original" для возврата на английский, если текущий язык не английский */}
      {currentLangCode !== 'en' && (
        <button
          onClick={() => switchLang('en')}
          className="
            text-xs /* Маленький размер шрифта */
            text-blue-600 /* Стандартный цвет для ссылок */
            hover:underline /* Подчеркивание при наведении */
            whitespace-nowrap /* Предотвращает перенос текста кнопки */
          "
          title="Switch to English (Original)" // Всплывающая подсказка
        >
          Original
        </button>
      )}
      {/* Блок <style jsx> с анимацией градиента удален, как и класс animate-gradient. */}
    </div>
  );
}
