# arbill-login-mikrotik

Koleksi Template Login Hotspot MikroTik Modern & Responsive untuk Arbill / ArabPay.

## ✨ Fitur Utama
- 📱 **Desain Modern Glassmorphism & Responsif**: Tampilan rapi dan ramah pengguna di perangkat mobile maupun desktop.
- 🔒 **Mendukung Login HTTPS / SSL**: Integrasi sertifikat SSL (Let's Encrypt / Cloudflare Origin CA) untuk keamanan kredensial login.
- ⚡ **CHAP MD5 & PAP Auth**: Kompatibel penuh dengan autentikasi default RouterOS MikroTik.
- 💳 **Integrasi Billing Arbill / ArabPay**: Mendukung pembelian voucher online otomatis, integrasi QRIS, dan widget paket realtime.
- 🕌 **Fitur Jadwal Sholat Offline & Jam Digital**: Widget jadwal sholat otomatis berbasis koordinat lokal tanpa memerlukan akses internet tambahan.

## 📁 Struktur Direktori
- `arbill1/`: Tema hotspot default dengan desain Neon Glassmorphism, tab login Member & Voucher, widget promo/flash sale, dan panduan lengkap instalasi.

## 🚀 Panduan Penggunaan
1. Buka folder template pilihan Anda (misalnya `arbill1/`).
2. Sesuaikan konfigurasi di file `setting.js` (nama hotspot, URL billing, nomor WhatsApp admin).
3. Unggah berkas ke RouterOS MikroTik melalui WinBox (**Files**).
4. Panduan lengkap instalasi SSL/HTTPS dapat dibaca di `arbill1/README.md` atau `arbill1/cloudflare_ssl_guide.md`.
