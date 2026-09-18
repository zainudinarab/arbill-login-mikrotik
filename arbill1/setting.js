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
  BILLING_URL: 'http://localhost:3006',

  // 2. IDENTITAS & BRANDING WIFi
  BRAND_NAME: 'WIFI ARABPAY',
  BRAND_SUBTITLE: 'Super Fast & Secure Internet',
  SSL_BADGE_TEXT: 'HTTPS SSL 256-bit',

  // 3. KONTAK & PEMBELIAN VOUCHER VIA WHATSAPP
  // Format nomor WhatsApp: gunakan kode negara tanpa simbol + (contoh: 6281234567890)
  WHATSAPP_ADMIN: '6281234567890',
  WHATSAPP_DISPLAY: '0812-3456-7890', // Tampilan nomor di footer

  // 4. PENGATURAN JADWAL SHOLAT (100% OFFLINE)
  PRAYER_TIMES: {
    ENABLED: true, // true: tampilkan widget jadwal sholat, false: sembunyikan
    CITY_LABEL: 'WIB & Sekitarnya', // Nama kota / wilayah
    TIMEZONE: 7, // 7 = WIB (Jawa/Sumatera), 8 = WITA (Bali/Sulawesi), 9 = WIT (Papua/Maluku)
    // Koordinat lintang dan bujur (Default: Jakarta/Jawa)
    LATITUDE: -6.2088,
    LONGITUDE: 106.8456
  },

  // 5. FITUR-FITUR TAMPILAN
  FEATURES: {
    ENABLE_FLASH_SALE: true, // Tampilkan banner promo Flash Sale jika aktif di billing
    ENABLE_LIVE_CLOCK: true, // Jam digital realtime di sudut atas
    ENABLE_THEME_SWITCHER: true // Tombol pilihan tema Gelap / Gold / Terang
  },

  // 6. DAFTAR PAKET CADANGAN (FALLBACK)
  // Tampil jika server billing sedang offline atau belum terhubung
  FALLBACK_PACKAGES: [
    {
      name: '1 JAM',
      price: 2000,
      badge: '',
      speed: '5 Mbps'
    },
    {
      name: '24 JAM',
      price: 5000,
      badge: 'POPULER',
      speed: '10 Mbps'
    },
    {
      name: '7 HARI',
      price: 25000,
      badge: 'HEMAT',
      speed: '15 Mbps'
    }
  ]
};
