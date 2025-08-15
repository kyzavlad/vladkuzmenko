"use client";

import Script from "next/script";

const PROJECT_ID = "683dc9d2959a913e130af508"; // твой Voiceflow projectID

/**
 * Стабильный лоадер Voiceflow Webchat:
 * - без дубликатов, без падений
 * - модульный бандл V3
 * - поднимаем z-index и сдвигаем кнопку от угла
 */
export function VoiceflowScript() {
  return (
    <>
      {/* 1) Загружаем бандл */}
      <Script
        id="vf-bundle"
        type="module"
        src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* 2) Инициализация 1 раз */}
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

                  // гарантируем видимость лаунчера
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
                  if (tries > 200) clearInterval(iv); // ~10s таймаут
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
