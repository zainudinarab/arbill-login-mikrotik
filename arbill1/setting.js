/**
 * ====================================================================
 * WIFI ARABPAY - PENGATURAN TEMPLATE HOTSPOT MIKROTIK
 * ====================================================================
 * File ini digunakan untuk mengubah semua pengaturan template login & status
 * tanpa perlu mengedit file login.html atau status.html.
 */

window.APP_CONFIG = {
  // 1. PENGATURAN URL BILLING SERVER (ARBILBARU)
  // Cukup atur URL domain ini saja, link scanner QR otomatis mengarah ke [BILLING_URL]/myqr/
  BILLING_URL: 'https://arbill.arabpay.my.id',

  // 2. FILTER ROUTER MIKROTIK
  // Masukkan ID Router atau Nama Router di Arbill Baru (misal: 'DESKTOP-AUTJKVA').
  // Nilai ini digunakan langsung untuk mengambil voucher & sinkronisasi billing.
  ROUTER_ID: 'DESKTOP-AUTJKVA',

  // 3. IDENTITAS & BRANDING WIFI
  BRAND_NAME: 'WIFI ARABPAY',
  BRAND_SUBTITLE: 'Super Fast & Secure Internet',
  SSL_BADGE_TEXT: 'HTTPS SSL 256-bit',

  // 4. KONTAK & PEMBELIAN VOUCHER VIA WHATSAPP
  // Format nomor WhatsApp: gunakan kode negara tanpa simbol + (contoh: 6281234567890)
  WHATSAPP_ADMIN: '6281234567890',
  WHATSAPP_DISPLAY: '0812-3456-7890', // Tampilan nomor di footer

  // 5. PENGATURAN JADWAL SHOLAT (100% OFFLINE)
  PRAYER_TIMES: {
    ENABLED: true, // true: tampilkan widget jadwal sholat, false: sembunyikan
    CITY_LABEL: 'WIB & Sekitarnya', // Nama kota / wilayah
    TIMEZONE: 7, // 7 = WIB (Jawa/Sumatera), 8 = WITA (Bali/Sulawesi), 9 = WIT (Papua/Maluku)
    LATITUDE: -6.2088, // Koordinat lintang (Default: Jakarta/Jawa)
    LONGITUDE: 106.8456 // Koordinat bujur
  },

  // 6. FORMAT KODE VOUCHER
  // Pilihan: 'lowercase' (huruf kecil), 'uppercase' (huruf besar), atau 'none' (sesuai ketikan pelanggan)
  VOUCHER_CASE: 'lowercase',

  // 7. FITUR-FITUR TAMPILAN
  FEATURES: {
    ENABLE_FLASH_SALE: true, // Tampilkan banner promo Flash Sale jika aktif di billing
    ENABLE_LIVE_CLOCK: true, // Jam digital realtime di sudut atas
    ENABLE_THEME_SWITCHER: true // Tombol pilihan tema Gelap / Gold / Terang
  },

  // 8. DAFTAR PAKET CADANGAN (FALLBACK JIKA OFFLINE)
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

// URL Scanner QR otomatis ditambahkan '/myqr/' dari domain BILLING_URL
window.APP_CONFIG.QR_SCANNER_URL = (window.APP_CONFIG.BILLING_URL || 'https://arbill.arabpay.my.id').replace(/\/+$/, '') + '/myqr/';
window.APP_CONFIG.QR_SCAN_URL = window.APP_CONFIG.QR_SCANNER_URL;
