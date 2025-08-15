"use client";

import Script from "next/script";

const PROJECT_ID = "683dc9d2959a913e130af508"; // твой ID

export function VoiceflowScript() {
  return (
    <>
      {/* Загружаем актуальный bundle как ES-модуль */}
      <Script
        id="vf-bundle"
        type="module"
        src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      {/* Инициализация — ровно один раз */}
      <Script id="vf-init" type="module" strategy="afterInteractive">
        {`
          (function () {
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
              // поднимем кнопку чата над всем и отодвинем от переключателя языка
              const css = document.createElement('style');
              css.innerHTML = \`
                .vfrc-launcher, .vfrc-widget { z-index: 2147483647 !important; }
                .vfrc-launcher { bottom: 96px !important; right: 24px !important; }
              \`;
              document.head.appendChild(css);
            }

            if (window.voiceflow?.chat) {
              init();
            } else {
              var t = 0;
              var iv = setInterval(function () {
                t++;
                if (window.voiceflow?.chat) { clearInterval(iv); init(); }
                if (t > 200) clearInterval(iv);
              }, 50);
            }
          })();
        `}
      </Script>
    </>
  );
}
