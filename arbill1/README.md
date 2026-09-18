# Panduan Pemasangan HTTPS Login Hotspot MikroTik

Dokumen ini berisi panduan langkah demi langkah pengunggahan tema login hotspot modern dan konfigurasi HTTPS (SSL/TLS Certificate) pada RouterOS MikroTik.

---

## 📁 Struktur Berkas Template Hotspot

```text
mikrotik/
├── css/
│   └── style.css         # Styling Glassmorphism & UI Design System
├── js/
│   └── md5.js            # Standard Enkripsi CHAP MD5 MikroTik
├── login.html            # Halaman Login Utama (HTTPS & CHAP MD5, Tab Voucher/Member)
├── status.html           # Halaman Dashboard Informasi Koneksi Pengguna
├── logout.html           # Halaman Konfirmasi Logout
├── errors.html           # Halaman Penanganan Pesan Error
├── redirect.html         # Halaman Pengalihan Otomatis
└── README.md             # Panduan Konfigurasi ini
```

---

## 🚀 Langkah 1: Unggah Berkas ke RouterOS MikroTik

1. Buka aplikasi **WinBox** dan hubungkan ke router MikroTik Anda.
2. Buka menu **Files** dari panel kiri WinBox.
3. Buat folder baru (misalnya `hotspot-https`) atau direktori default `hotspot`.
4. Seret (drag & drop) seluruh berkas (`login.html`, `status.html`, `logout.html`, `errors.html`, `redirect.html`, serta folder `css` dan `js`) ke dalam folder `hotspot-https` di WinBox.

---

## 🔒 Langkah 2: Konfigurasi Sertifikat SSL / HTTPS di MikroTik

Agar browser pengguna tidak menampilkan peringatan *"Not Secure"* atau *"Connection is not private"*, kita perlu memasang sertifikat SSL yang valid.

### Metode A: Menggunakan Let's Encrypt Gratis (RouterOS v7)

RouterOS v7 memiliki fitur bawaan Let's Encrypt melalui fitur ACME DNS / Certificate.

1. Pastikan Router MikroTik terhubung ke internet dan memiliki IP Publik / DDNS Cloud MikroTik aktif.
2. Aktifkan DDNS Cloud MikroTik (Opsional jika belum punya domain):
   ```routeros
   /ip cloud set ddns-enabled=yes
   /ip cloud print
   ```
   *Catatan: Catat nama DNS cloud Anda, contoh: `123456789abc.sn.mymikrotik.net`*

3. Request Sertifikat Let's Encrypt:
   ```routeros
   /certificate enable-ssl-certificate-renewal
   /certificate add name=hotspot-ssl common-name=login.domainanda.com key-size=2048
   ```

### Metode B: Impor Sertifikat SSL Pihak Ketiga (Custom Certificate .crt & .key)

Jika Anda sudah membeli SSL atau menggunakan Cloudflare / ZeroSSL:

1. Unggah berkas `certificate.crt` dan `private.key` ke menu **Files** MikroTik.
2. Impor sertifikat di Terminal MikroTik:
   ```routeros
   /certificate import file-name=certificate.crt
   /certificate import file-name=private.key
   ```
3. Buka `/certificate print` untuk memastikan sertifikat berstatus `K T` (Private Key Valid & Trusted).

---

## ⚙️ Langkah 3: Pengaturan Profile Hotspot MikroTik (HTTPS Login)

1. Buka menu **IP** -> **Hotspot** -> tab **Server Profiles**.
2. Klik ganda pada profile hotspot yang aktif (misalnya `hsprof1`).
3. Sesuaikan parameter berikut:

### Konfigurasi GUI (WinBox):
- **HTML Directory**: `hotspot-https`
- **DNS Name**: `wifi.domainanda.com` *(Harus sama persis dengan nama domain pada Sertifikat SSL)*

#### Tab Login:
- Centang pilihan login:
  - `[x] HTTP CHAP`
  - `[x] HTTP PAP`
  - `[x] HTTPS`
- **SSL Certificate**: Pilih sertifikat SSL yang telah diimpor (misalnya `hotspot-ssl`).

---

### Konfigurasi via Command Line (CLI):

```routeros
/ip hotspot profile
set [find name="default"] \
    dns-name="wifi.domainanda.com" \
    html-directory="hotspot-https" \
    login-by=http-chap,http-pap,https,cookie \
    ssl-certificate=hotspot-ssl
```

---

## 🌐 Langkah 4: HTTPS Direct Redirection (Walled Garden)

Tambahkan domain sertifikat SSL Anda ke dalam daftar Walled Garden agar klien yang belum login dapat memverifikasi OCSP / Certificate Chain:

```routeros
/ip hotspot walled-garden
add dst-host="*.domainanda.com" action=allow
add dst-host="*.letsencrypt.org" action=allow
```

---

## 🔍 Pengujian (Testing)

1. Hubungkan perangkat (smartphone/laptop) ke jaringan Wi-Fi Hotspot.
2. Browser akan otomatis membuka halaman login atau buka alamat `https://wifi.domainanda.com`.
3. Perhatikan ikon gembok hijau/aman pada bilah alamat URL browser (menandakan koneksi **HTTPS Terenkripsi 256-bit**).
4. Tes login menggunakan **Kode Voucher** atau **Username & Password Member**.
5. Setelah login, pengguna akan diarahkan ke halaman `status.html`.

---

### 💡 Tips Troubleshooting:
- **Peringatan Sertifikat pada Browser**: Dipastikan terjadi karena `DNS Name` pada Hotspot Server Profile tidak sama dengan Common Name (CN) atau Subject Alternative Name (SAN) yang ada pada sertifikat SSL.
- **Login Gagal CHAP**: Pastikan berkas `js/md5.js` terunggah secara utuh di folder `hotspot-https/js/`.
