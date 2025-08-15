"use client";

import Script from "next/script";

// твой projectID
const PROJECT_ID = "683dc9d2959a913e130af508";

/**
 * Грузим СТАБИЛЬНУЮ сборку виджета как ES-модуль
 * и защищаемся от двойной инициализации.
 */
export function VoiceflowScript() {
  return (
    <>
      {/* Стабильный bundle (НЕ /widget-next/) */}
      <Script
        id="vf-bundle"
        type="module"
        strategy="afterInteractive"
        src="https://cdn.voiceflow.com/widget/bundle.mjs"
      />
      <Script id="vf-init" type="module" strategy="afterInteractive">
        {`
          (function () {
            try {
              if (window.__vf_loaded) return;
              window.__vf_loaded = true;

              function init() {
                try {
                  window.voiceflow?.chat?.load({
                    verify: { projectID: '${PROJECT_ID}' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    allowIframe: true,
                    assistant: { overlays: { branding: { visible: false } } }
                  });
                } catch (e) {
                  console.warn('Voiceflow load() error', e);
                }
              }

              // если объект уже есть — сразу грузим,
              // иначе ждём появления
              if (window.voiceflow?.chat) {
                init();
              } else {
                const iv = setInterval(() => {
                  if (window.voiceflow?.chat) {
                    clearInterval(iv);
                    init();
                  }
                }, 50);
                setTimeout(() => clearInterval(iv), 10000); // страховка
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
