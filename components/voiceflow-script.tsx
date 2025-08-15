"use client";

import Script from "next/script";

// ВСТАВЬ СВОЙ projectID ниже (он у тебя: 683dc9d2959a913e130af508)
const PROJECT_ID = "683dc9d2959a913e130af508";

// Один раз подключаем виджет как ES-модуль + безопасная инициализация
export default function VoiceflowScript() {
  return (
    <>
      {/* загрузка БЕЗ -next, стабильная сборка */}
      <Script
        id="vf-bundle"
        type="module"
        strategy="afterInteractive"
        src="https://cdn.voiceflow.com/widget/bundle.mjs"
      />
      <Script id="vf-init" type="module" strategy="afterInteractive">
        {`
          try {
            if (!window.__vf_loaded) {
              window.__vf_loaded = true;
              window.voiceflow?.chat?.load({
                verify: { projectID: '${PROJECT_ID}' },
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'production',
                // опционально:
                assistant: { overlays: { branding: { visible: false } } },
                allowIframe: true
              });
            }
          } catch (e) {
            console.warn('Voiceflow init failed', e);
          }
        `}
      </Script>
    </>
  );
}
