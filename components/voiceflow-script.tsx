"use client";

import Script from "next/script";

export function VoiceflowScript() {
  return (
    <Script id="voiceflow-widget" strategy="afterInteractive">
      {`
        (function(d, t) {
          if (window.__vf_loaded) return;
          window.__vf_loaded = true;

          var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
          v.onload = function() {
            try {
              window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.load({
                verify: { projectID: '68d68da7396d9a683e17de9a' },
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'production',
                voice: { url: 'https://runtime-api.voiceflow.com' },
                allowIframe: true,
                assistant: {
                  title: 'Vlad Kuzmenko — AI Assistant',
                  description: 'Ask about business systems, projects, VisibilityOS, Warriors Team or working with Vlad.',
                  overlays: { branding: { visible: false } }
                }
              });

              var css = d.createElement('style');
              css.innerHTML = '.vfrc-launcher,.vfrc-widget{z-index:2147483647!important}.vfrc-launcher{right:24px!important;bottom:92px!important}';
              d.head.appendChild(css);
            } catch(e) {
              console.warn('Voiceflow load failed', e);
            }
          };
          v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
          v.type = 'text/javascript';
          s.parentNode.insertBefore(v, s);
        })(document, 'script');
      `}
    </Script>
  );
}
