"use client";

import Script from "next/script";

const PROJECT_ID = "683dc9d2959a913e130af508"; // твой Voiceflow projectID

/**
 * Лоадер Voiceflow Webchat c auto-clean:
 * - удаляет все старые вставки Voiceflow (<script> и <link rel="preload">), если они есть;
 * - не даёт виджету падать и дублироваться;
 * - загружает модульный bundle (V3) и инициализирует чат 1 раз;
 * - поднимает z-index и сдвигает кнопку.
 */
export function VoiceflowScript() {
  return (
    <>
      {/* 0) Чистим дубли ДО загрузки бандла */}
      <Script id="vf-clean" strategy="afterInteractive">
        {`
          (function () {
            try {
              // Удаляем любые preload/prefetch ссылок Voiceflow
              document.querySelectorAll('link[rel="preload"],link[rel="prefetch"]').forEach(function(l){
                var href = (l.getAttribute('href') || '');
                if (href.includes('voiceflow.com')) l.parentNode && l.parentNode.removeChild(l);
              });

              // Удаляем любые посторонние скрипты Voiceflow (оставим те, что с id vf-bundle/vf-init)
              document.querySelectorAll('script').forEach(function(s){
                var src = s.getAttribute('src') || '';
                if (src.includes('voiceflow.com') && !/\\b(vf-bundle|vf-init)\\b/.test(s.id || '')) {
                  s.parentNode && s.parentNode.removeChild(s);
                }
              });

              // Сбросим глобальные флаги, если кто-то уже ставил
              try { delete window.__vf_loaded; } catch(_) {}
              try { delete window.voiceflow; } catch(_) {}
            } catch (e) { console.warn('VF clean error', e); }
          })();
        `}
      </Script>

      {/* 1) Загружаем модульный бандл */}
      <Script
        id="vf-bundle"
        type="module"
        src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onError={(e) => console.warn("Voiceflow bundle failed", e)}
      />

      {/* 2) Инициализация ровно один раз */}
      <Script id="vf-init" type="module" strategy="afterInteractive">
        {`
          (function () {
            try {
              if (window.__vf_loaded) return;
              window.__vf_loaded = true;

              function boot() {
                if (!window.voiceflow || !window.voiceflow.chat) return;
                try {
                  window.voiceflow.chat.load({
                    verify: { projectID: '${PROJECT_ID}' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    allowIframe: true,
                    assistant: { overlays: { branding: { visible: false } } }
                  });

                  // Гарантируем видимость лаунчера и отступ от угла
                  var css = document.createElement('style');
                  css.innerHTML = \`
                    .vfrc-launcher, .vfrc-widget { z-index: 2147483647 !important; }
                    .vfrc-launcher { right: 24px !important; bottom: 96px !important; }
                    .vfrc-launcher { display: block !important; opacity: 1 !important; visibility: visible !important; }
                  \`;
                  document.head.appendChild(css);
                } catch (e) { console.warn('voiceflow load error', e); }
              }

              if (window.voiceflow?.chat) {
                boot();
              } else {
                var tries = 0;
                var iv = setInterval(function () {
                  tries++;
                  if (window.voiceflow?.chat) { clearInterval(iv); boot(); }
                  if (tries > 200) clearInterval(iv); // ~10s
                }, 50);
              }
            } catch (e) {
              console.warn('Voiceflow init failed', e);
            }
          })();
        `}
      </Script>
    </>
  );
}
