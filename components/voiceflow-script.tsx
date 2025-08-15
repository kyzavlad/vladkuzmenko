"use client";

import Script from "next/script";

// твой projectID
const PROJECT_ID = "683dc9d2959a913e130af508";

/**
 * Надёжный лоадер Voiceflow Webchat:
 * - грузим ES-модуль
 * - один раз (защита от дублей)
 * - не даём ошибкам уронить страницу
 * - поднимаем z-index и уводим кнопку от переключателя языка
 */
export function VoiceflowScript() {
  return (
    <>
      <Script
        id="vf-bundle"
        type="module"
        src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="vf-init" type="module" strategy="afterInteractive">
        {`
          (function () {
            try {
              if (window.__vf_loaded) return;
              window.__vf_loaded = true;

              function init() {
                if (!window.voiceflow || !window.voiceflow.chat) return;

                window.voiceflow.chat.load({
                  verify: { projectID: '${PROJECT_ID}' },
                  url: 'https://general-runtime.voiceflow.com',
                  versionID: 'production',
                  allowIframe: true,
                  assistant: { overlays: { branding: { visible: false } } }
                });

                // Поднять виджет поверх всего и чуть сдвинуть от правого нижнего угла
                var css = document.createElement('style');
                css.innerHTML = \`
                  .vfrc-launcher, .vfrc-widget { z-index: 2147483647 !important; }
                  .vfrc-launcher { right: 24px !important; bottom: 96px !important; }
                \`;
                document.head.appendChild(css);
              }

              if (window.voiceflow?.chat) {
                init();
              } else {
                var tries = 0;
                var iv = setInterval(function () {
                  tries++;
                  if (window.voiceflow?.chat) { clearInterval(iv); init(); }
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
