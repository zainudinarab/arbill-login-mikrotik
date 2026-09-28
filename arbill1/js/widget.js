(function () {
  // Cegah duplikasi script & container jika widget dipanggil lebih dari sekali
  if (window.__ARBILL_CHAT_WIDGET_LOADED__ || document.getElementById("chat-widget-wrapper")) {
    return;
  }
  window.__ARBILL_CHAT_WIDGET_LOADED__ = true;

  // 1. Ambil identitas group dari tag script
  const scriptTag = document.getElementById("chat-widget") || document.currentScript;
  const groupID = (scriptTag && scriptTag.getAttribute("data-group")) ? scriptTag.getAttribute("data-group").trim() : "global";
  let serverUrl = "https://chat.arabpay.my.id";
  try {
    if (scriptTag && scriptTag.src) {
      const parsed = new URL(scriptTag.src, window.location.href);
      if (parsed.origin && parsed.origin !== "null" && parsed.origin.startsWith("http")) {
        serverUrl = parsed.origin;
      }
    }
  } catch(e) {}

  // 2. Tambahkan CSS secara dinamis
  const style = document.createElement("style");
  style.innerHTML = `
        #chat-widget-wrapper { position: fixed; bottom: 82px; right: 18px; z-index: 999999; }
        #chat-window { 
            display: none; position: fixed; bottom: 82px; right: 20px; 
            width: 380px; height: 560px; max-height: calc(100vh - 96px); border-radius: 16px; 
            overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.35); 
            background: #ffffff; border: 1px solid rgba(255,255,255,0.2); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
            z-index: 1000000;
        }
        .chat-fab { 
            width: 54px; height: 54px; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; 
            border-radius: 50%; display: flex; align-items: center; justify-content: center; 
            font-size: 24px; cursor: pointer; box-shadow: 0 4px 18px rgba(6, 182, 212, 0.45); 
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
        .chat-fab:hover { transform: scale(1.08); box-shadow: 0 6px 22px rgba(6, 182, 212, 0.65); }
        .chat-fab-badge {
            position: absolute; top: -5px; right: -5px;
            background: #25d366; color: white; font-size: 11px; font-weight: bold;
            min-width: 22px; height: 22px; padding: 0 5px; border-radius: 11px;
            display: none; align-items: center; justify-content: center;
            box-shadow: 0 2px 8px rgba(37, 211, 102, 0.6); border: 2px solid white;
        }
        .chat-fab svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2; pointer-events: none; }
        
        @media (max-width: 640px) {
            #chat-window { bottom: 0; right: 0; width: 100%; height: 100%; border-radius: 0; border: none; max-height: 100vh; }
            #chat-widget-wrapper { bottom: 80px; right: 16px; }
        }
    `;
  document.head.appendChild(style);

  // 3. Buat Elemen HTML
  const wrapper = document.createElement("div");
  wrapper.id = "chat-widget-wrapper";

  // Kita tambahkan parameter group ke URL iframe
  wrapper.innerHTML = `
        <div id="chat-window">
            <iframe src="${serverUrl}/chat?group=${encodeURIComponent(groupID)}" 
                    id="chat-iframe"
                    style="width:100%; height:100%; border:none;"
                    allow="camera; microphone"></iframe>
        </div>
        <div class="chat-fab" id="chat-fab-btn">
            <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <div class="chat-fab-badge" id="chat-fab-badge"></div>
        </div>
    `;
  document.body.appendChild(wrapper);

  // 4. Logika Buka/Tutup (Scoped ke wrapper)
  const btn = wrapper.querySelector("#chat-fab-btn");
  const win = wrapper.querySelector("#chat-window");

  if (btn && win) {
    btn.onclick = (e) => {
      if (e) e.stopPropagation();
      win.style.display = "block";
      btn.style.display = "none"; // 🔥 sembunyikan FAB
    };
  }

  // 5. Mendengarkan perintah tutup dari dalam iframe (postMessage)
  window.addEventListener("message", (event) => {
    if (event.origin !== serverUrl) return; // 🔒 keamanan tambahan

    if (event.data === "closeChat") {
      if (win) win.style.display = "none";
      if (btn) btn.style.display = "flex";
    }
    if (event.data && event.data.type === "unreadCount") {
      const badge = wrapper.querySelector("#chat-fab-badge");
      if (badge) {
        if (event.data.count > 0) {
          badge.innerText = event.data.count > 99 ? "99+" : event.data.count;
          badge.style.display = "flex";
        } else {
          badge.style.display = "none";
        }
      }
    }
  });
})();
