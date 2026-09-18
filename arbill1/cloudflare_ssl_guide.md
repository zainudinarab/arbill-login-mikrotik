# Panduan Setup Cloudflare SSL & DNS untuk Domain wifi.arabpay.my.id di MikroTik Hotspot

Panduan ini menjelaskan langkah demi langkah pembuatan dan pemasangan Sertifikat SSL Cloudflare Origin CA untuk subdomain **wifi.arabpay.my.id** pada RouterOS MikroTik Hotspot.

---

## 📌 BACA TERLEBIH DAHULU (PENTING)
Mengapa menggunakan **Cloudflare Origin CA Certificate**?
1. **Gratis & Masa Berlaku Panjang**: Masa berlaku hingga **15 tahun** (bebas repot perpanjang sertifikat tiap 3 bulan).
2. **Proses Cepat**: Dibuat langsung dari dashboard Cloudflare tanpa butuh port HTTP 80 terbuka dari luar ke router Anda.

---

## 🌐 LANGKAH 1: Pengaturan DNS Record di Cloudflare

1. Login ke Dashboard [Cloudflare](https://dash.cloudflare.com/).
2. Pilih nama domain Anda: **arabpay.my.id**.
3. Masuk ke menu **DNS** -> **Records**.
4. Klik **Add Record** dan masukkan konfigurasi berikut:
   - **Type**: `A`
   - **Name**: `wifi` (otomatis menjadi `wifi.arabpay.my.id`)
   - **IPv4 address**: Masukkan **IP Address Gateway Hotspot MikroTik Anda** (Contoh: `192.168.88.1` atau `10.5.5.1`).
   - **Proxy status**: Ubah menjadi **DNS only** (Awan warna **ABU-ABU** / *Grey Cloud*).
     > ⚠️ **WAJIB**: JANGAN gunakan mode *Proxied* (Awan Oranye) agar koneksi perangkat lokal di bawah hotspot tidak terhalang oleh CDN Cloudflare.
5. Klik **Save**.

---

## 🔒 LANGKAH 2: Membuat Sertifikat SSL Origin di Cloudflare

1. Masuk ke menu **SSL/TLS** -> **Origin Server** di Cloudflare Dashboard.
2. Klik tombol **Create Certificate**.
3. Pengaturan Sertifikat:
   - **Generate private key and CSR with Cloudflare**: Pilih `RSA (2048)`.
   - **Hostnames**: Masukkan:
     - `wifi.arabpay.my.id`
     - `*.arabpay.my.id`
   - **Certificate Validity**: Pilih `15 years`.
4. Klik **Create**.
5. Cloudflare akan menampilkan 2 kotak kode teks:
   - **Origin Certificate** (Teks diawali `-----BEGIN CERTIFICATE-----`)
   - **Private Key** (Teks diawali `-----BEGIN PRIVATE KEY-----`)

> 🚨 **PERHATIAN**: Private Key HANYA ditampilkan SATU KALI ini saja oleh Cloudflare. Jangan tutup tab browser sebelum Anda menyalin keduanya!

---

## 💾 LANGKAH 3: Menyimpan Berkas Sertifikat

1. Buat berkas baru di komputer Anda bernama **`wifi_arabpay.crt`**. Salin teks **Origin Certificate** lalu tempel ke dalam file ini.
2. Buat berkas baru di komputer Anda bernama **`wifi_arabpay.key`**. Salin teks **Private Key** lalu tempel ke dalam file ini.

*(Atau buat file di folder project ini `wifi_arabpay.crt` dan `wifi_arabpay.key`)*.

---

## 📤 LANGKAH 4: Upload & Impor Sertifikat ke RouterOS MikroTik

1. Buka **WinBox** -> Hubungkan ke Router MikroTik Anda.
2. Buka menu **Files**.
3. Drag & drop berkas `wifi_arabpay.crt` dan `wifi_arabpay.key` ke dalam daftar file WinBox.
4. Buka **New Terminal** di WinBox, lalu jalankan perintah berikut secara berurutan:

```routeros
# 1. Impor Berkas Sertifikat
/certificate import file-name=wifi_arabpay.crt name=arabpay-ssl passphrase=""

# 2. Impor Berkas Private Key (Gunakan nama sertifikat yang sama)
/certificate import file-name=wifi_arabpay.key name=arabpay-ssl passphrase=""
```

5. Verifikasi Sertifikat:
   Jalankan perintah `/certificate print`.
   Pastikan sertifikat `arabpay-ssl` memiliki tanda huruf **`K T`** (K = Private Key ada, T = Trusted).

---

## ⚙️ LANGKAH 5: Terapkan SSL ke Hotspot Profile MikroTik

Jalankan perintah berikut di **New Terminal**:

```routeros
/ip hotspot profile
set [find name="default"] \
    dns-name="wifi.arabpay.my.id" \
    html-directory="hotspot" \
    login-by=http-chap,http-pap,https,cookie \
    ssl-certificate=arabpay-ssl
```

*Atau via WinBox GUI:*
1. Buka **IP** -> **Hotspot** -> tab **Server Profiles**.
2. Klik 2x profile hotspot Anda.
3. Isikan **DNS Name**: `wifi.arabpay.my.id`
4. Pada tab **Login**:
   - Centang **HTTPS**.
   - Pilih **SSL Certificate**: `arabpay-ssl`.
5. Klik **Apply** -> **OK**.

---

## 🛡️ LANGKAH 6: Tambahkan Walled Garden (Agar Klien Bebas Akses SSL Domain)

Jalankan skrip berikut agar verifikasi SSL di HP/Laptop klien lancar:

```routeros
/ip hotspot walled-garden
add dst-host="*.arabpay.my.id" action=allow
add dst-host="*.cloudflare.com" action=allow
```

---

## ✅ UJI COBA

1. Sambungkan HP/Laptop ke WiFi Hotspot MikroTik.
2. Halaman captive portal akan otomatis mengarah ke `https://wifi.arabpay.my.id/login`.
3. Periksa bilah alamat browser: Koneksi kini bertanda **Gembok Hijau / Safe HTTPS 256-bit** tanpa ada peringatan keamanan!
