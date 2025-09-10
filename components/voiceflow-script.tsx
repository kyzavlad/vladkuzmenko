"use client";

import Script from "next/script";

/**
 * Изначальная рабочая схема Voiceflow: инлайновый сниппет.
 * Добавлена мягкая зачистка дублей, чтобы ничего не мешало.
 */
export function VoiceflowScript() {
  return (
    <>
      <Script id="vf-clean" strategy="afterInteractive">
        {`
          try {
            document.querySelectorAll('link[rel="preload"],link[rel="prefetch"]').forEach(function(l){
              var href = (l.getAttribute('href') || '');
              if (href.includes('voiceflow.com')) l.parentNode && l.parentNode.removeChild(l);
            });
            document.querySelectorAll('script').forEach(function(s){
              var src = s.getAttribute('src') || '';
              if (src.includes('voiceflow.com') && !/\\bvf-inline\\b/.test(s.id || '')) {
                s.parentNode && s.parentNode.removeChild(s);
              }
            });
            try { delete window.__vf_loaded; } catch(_) {}
            try { delete window.voiceflow; } catch(_) {}
          } catch(e) { /* no-op */ }
        `}
      </Script>

      <Script id="vf-inline" strategy="afterInteractive">
        {`
          (function(d, t) {
            if (window.__vf_loaded) return;
            window.__vf_loaded = true;

            var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
            v.onload = function() {
              try {
                window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.load({
                  verify: { projectID: '68c159075f4b2160b7d6f348' },
                  url: 'https://general-runtime.voiceflow.com',
                  versionID: 'production',
                  voice: { url: 'https://runtime-api.voiceflow.com' },
                  allowIframe: true,
                  assistant: { overlays: { branding: { visible: false } } }
                });

                var css = d.createElement('style');
                css.innerHTML = ".vfrc-launcher,.vfrc-widget{z-index:2147483647!important}.vfrc-launcher{right:24px!important;bottom:96px!important}";
                d.head.appendChild(css);
              } catch(e){ console.warn('Voiceflow load failed', e); }
            };
            v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
            v.type = "text/javascript";
            s.parentNode.insertBefore(v, s);
          })(document, 'script');
        `}
      </Script>
    </>
  );
}
