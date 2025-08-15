"use client";

import Script from "next/script";

/**
 * Voiceflow Webchat (V3) — безопасный загрузчик.
 * - используем widget-next (актуальная версия)
 * - грузим как ES-модуль
 * - защита от двойной инициализации
 * - не даёт ошибке уронить страницу
 */

const PROJECT_ID = "683dc9d2959a913e130af508"; // твой ID

export function VoiceflowScript() {
  return (
    <>
      {/* 1) Загружаем V3 bundle как ES-модуль */}
      <Script
        id="vf-bundle"
        type="module"
        src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onError={(e) => {
          // не роняем страницу, если CDN отвалился
          console.warn("Voiceflow bundle failed", e);
        }}
      />

      {/* 2) Инициализация — строго один раз */}
      <Script id="vf-init" type="module" strategy="afterInteractive">
        {`
          (function () {
            try {
              if (window.__vf_loaded) return;
              window.__vf_loaded = true;

              function init() {
                try {
                  // Защита от отсутствия объекта
                  if (!window.voiceflow || !window.voiceflow.chat) return;

                  window.voiceflow.chat.load({
                    verify: { projectID: '${PROJECT_ID}' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    allowIframe: true,
                    assistant: { overlays: { branding: { visible: false } } }
                  });
                } catch (err) {
                  console.warn('Voiceflow load() error', err);
                }
              }

              // ждём появления voiceflow.chat из модуля
              if (window.voiceflow?.chat) {
                init();
              } else {
                var tries = 0;
                var iv = setInterval(function () {
                  tries++;
                  if (window.voiceflow?.chat) {
                    clearInterval(iv); init();
                  } else if (tries > 200) { // ~10s
                    clearInterval(iv);
                    console.warn('Voiceflow did not expose chat in time');
                  }
                }, 50);
              }

              // мягко глушим возможные ошибки виджета, чтобы не рушить страницу
              window.addEventListener('error', function (e) {
                try {
                  var src = (e && e.filename) || '';
                  if (typeof src === 'string' && src.indexOf('voiceflow') !== -1) {
                    e.preventDefault && e.preventDefault();
                  }
                } catch (_) {}
              }, true);
            } catch (e) {
              console.warn('Voiceflow init failed', e);
            }
          })();
        `}
      </Script>
    </>
  );
}
