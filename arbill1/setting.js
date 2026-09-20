/**
 * ====================================================================
 * WIFI ARABPAY - PENGATURAN TEMPLATE HOTSPOT MIKROTIK
 * ====================================================================
 * File ini digunakan untuk mengubah semua pengaturan template login
 * tanpa perlu mengedit file login.html.
 */

window.APP_CONFIG = {
  // 1. PENGATURAN URL BILLING SERVER (ARBILBARU)
  // - Saat uji coba di komputer lokal: 'http://localhost:3006'
  // - Saat dipasang di router MikroTik fisik:
  //   Ganti dengan IP Komputer Server Billing Anda, misalnya: 'http://192.168.1.100:3006'
  //   Atau domain jika pakai Cloudflare/VPN: 'https://billing.arab.net'
  BILLING_URL: 'https://arbill.arabpay.my.id',

  // 1.2. FILTER ROUTER MIKROTIK (OPSIONAL)
  // Masukkan ID Router (misal: 'rtr-mtv0hjfd') atau Nama Router di Arbill Baru.
  // Jika diisi, halaman login HANYA mengambil & menampilkan paket voucher milik router ini.
  // Jika dikosongkan (''), sistem otomatis membaca identity MikroTik atau menampilkan semua paket.
  ROUTER_ID: '',

  // 1.5. URL PEMINDAI KAMERA QR CODE VOUCHER (HTTPS)
  // Browser HP wajib membuka scanner lewat HTTPS agar diizinkan akses kamera
  QR_SCAN_URL: 'https://arbill.arabpay.my.id/myqr/',

  // 2. IDENTITAS & BRANDING WIFi
  BRAND_NAME: 'WIFI ARABPAY',
  BRAND_SUBTITLE: 'Super Fast & Secure Internet',
  SSL_BADGE_TEXT: 'HTTPS SSL 256-bit',

  // 3. KONTAK & PEMBELIAN VOUCHER VIA WHATSAPP
  // Format nomor WhatsApp: gunakan kode negara tanpa simbol + (contoh: 6281234567890)
  WHATSAPP_ADMIN: '6281234567890',
  WHATSAPP_DISPLAY: '0812-3456-7890', // Tampilan nomor di footer

  // 4. SCANNER QR / BARCODE HTTPS (ARBILL CYBER SCANNER)
  // Menghubungkan ke scanner kamera HTTPS agar kamera langsung aktif di HP Android/iOS
  // tanpa peringatan browser memblokir kamera di jaringan HTTP.
  QR_SCANNER_URL: 'https://arbill.arabpay.my.id/myqr/',

  // 4. PENGATURAN JADWAL SHOLAT (100% OFFLINE)
  PRAYER_TIMES: {
    ENABLED: true, // true: tampilkan widget jadwal sholat, false: sembunyikan
    CITY_LABEL: 'WIB & Sekitarnya', // Nama kota / wilayah
    TIMEZONE: 7, // 7 = WIB (Jawa/Sumatera), 8 = WITA (Bali/Sulawesi), 9 = WIT (Papua/Maluku)
    // Koordinat lintang dan bujur (Default: Jakarta/Jawa)
    LATITUDE: -6.2088,
    LONGITUDE: 106.8456
  },

  // 5. FORMAT KODE VOUCHER
  // Pilihan: 'lowercase' (huruf kecil - default Arbill Baru), 'uppercase' (huruf besar), atau 'none' (sesuai ketikan pelanggan)
  VOUCHER_CASE: 'lowercase',

  // 6. FITUR-FITUR TAMPILAN
  FEATURES: {
    ENABLE_FLASH_SALE: true, // Tampilkan banner promo Flash Sale jika aktif di billing
    ENABLE_LIVE_CLOCK: true, // Jam digital realtime di sudut atas
    ENABLE_THEME_SWITCHER: true // Tombol pilihan tema Gelap / Gold / Terang
  },

  // 7. LIVE CHAT WIDGET (ARBILL-CHAT & AREZA)
  // Menghubungkan obrolan pelanggan di hotspot langsung ke sistem Live Chat
  LIVE_CHAT: {
    ENABLED: true, // true: tampilkan tombol widget chat melayang, false: sembunyikan
    PROVIDER: 'areza', // 'areza' untuk Arbill-Chat / Areza, atau 'intergram' untuk Telegram Bot
    // URL script widget dari server Arbill-Chat Golang Anda:
    // - Produksi Cloudflare Tunnel: 'https://chat.arabpay.my.id/js/widget.js'
    // - Saat uji coba lokal: 'http://localhost:8000/js/widget.js'
    AREZA_URL: 'https://chat.arabpay.my.id/js/widget.js',
    // Nama Group/Room Obrolan:
    // - Jika dikosongkan (''), sistem otomatis memakai nama router MikroTik $(identity)
    // - Atau isi nama grup kustom, misalnya: 'wifinet'
    AREZA_GROUP: 'arbill1',
    CHAT_ID: "-4034685266", // Telegram Chat ID jika memakai provider 'intergram'
    TITLE_CLOSED: 'Chat Admin',
    TITLE_OPEN: 'Sedang Chat',
    INTRO_MESSAGE: 'Assalamualaikum, Selamat Datang di WiFi Hotspot.',
    AUTO_RESPONSE: 'Terima kasih telah menghubungi kami. Ada yang bisa kami bantu? Jika baru beli voucher ketik kodenya secara manual. Admin segera membalas pesan Anda.',
    AUTO_NO_RESPONSE: 'Mohon tunggu sebentar, admin segera membalas pesan Anda.',
    MAIN_COLOR: '#06b6d4', // Warna utama tombol chat (Cyan / Hex color)
    ALWAYS_USE_FLOATING_BUTTON: false
  },

  // 8. DAFTAR PAKET CADANGAN (FALLBACK)
  // Tampil jika server billing sedang offline atau belum terhubung
  FALLBACK_PACKAGES: [
    {
      name: '1 JAM',
      price: 2000,
      badge: '',
      speed: '5 Mbps',
      desc: 'Cocok browsing cepat & sosmed'
    },
    {
      name: '3 JAM',
      price: 3000,
      badge: '',
      speed: '7 Mbps',
      desc: 'Nonton YouTube & streaming lancar'
    },
    {
      name: '12 JAM',
      price: 5000,
      badge: '',
      speed: '10 Mbps',
      desc: 'Aktif setengah hari full speed'
    },
    {
      name: '24 JAM',
      price: 7000,
      badge: 'POPULER',
      speed: '12 Mbps',
      desc: 'Paket harian paling diminati'
    },
    {
      name: '3 HARI',
      price: 15000,
      badge: '',
      speed: '15 Mbps',
      desc: 'Akses 3 hari tanpa batas kuota'
    },
    {
      name: '7 HARI',
      price: 25000,
      badge: 'HEMAT',
      speed: '15 Mbps',
      desc: 'Paket mingguan hemat & stabil'
    },
    {
      name: '14 HARI',
      price: 45000,
      badge: '',
      speed: '20 Mbps',
      desc: 'Dua pekan online ngebut'
    },
    {
      name: '30 HARI',
      price: 75000,
      badge: 'BEST VALUE',
      speed: '25 Mbps',
      desc: 'Paket bulanan full unlimited'
    }
  ]
};
