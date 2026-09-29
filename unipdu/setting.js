/**
 * ====================================================================
 * UNIVERSITAS PESANTREN TINGGI DARUL 'ULUM (UNIPDU) JOMBANG
 * KONFIGURASI HOTSPOT & API REGISTRASI TAMU
 * ====================================================================
 */

window.UNIPDU_CONFIG = {
  // 1. API BACKEND REGISTRASI TAMU
  // Masukkan URL API backend yang bertugas membuat user hotspot tamu di MikroTik/Radius/Billing.
  // Catatan: Pastikan domain API ini sudah didaftarkan di Walled Garden MikroTik:
  // Command MikroTik: /ip hotspot walled-garden add dst-host="*.arabpay.my.id"
  GUEST_API_URL: 'https://arbill.arabpay.my.id/api/guest/register',

  // 2. ID / NAMA ROUTER (Opsional jika billing mengelola multi-router)
  ROUTER_ID: 'UNIPDU-MAIN',

  // 3. IDENTITAS & BRAND KAMPUS
  CAMPUS_NAME: "UNIPDU JOMBANG",
  CAMPUS_FULLNAME: "Universitas Pesantren Tinggi Darul 'Ulum",

  // 4. MODE SIMULASI / CADANGAN JIKA BACKEND BELUM TERHUBUNG
  // Jika true: jika API backend sedang maintenance/offline, sistem tetap memberikan
  // simulasi kode akses tamu langsung login untuk keperluan pengetesan template.
  ENABLE_MOCK_FALLBACK: true
};
