# Sabil Valdano – Portfolio Website

Situs web personal dan portofolio profesional untuk Sabil Valdano (Technical Lead & Software Architect). Dibuat menggunakan React & Vite, disiapkan agar cepat, responsif, ramah SEO, dan hemat biaya hosting.

---

## 🌟 Fitur Utama

- **Tampilan Interaktif:** Banner utama, riwayat pengalaman kerja (bisa di-expand), daftar keahlian, dan bagian kontak.
- **Dua Bahasa (EN / ID):** Otomatis menyesuaikan bahasa bawaan browser pengunjung.
- **Mode Gelap/Terang:** Menyesuaikan pengaturan tampilan perangkat secara otomatis.
- **Keamanan & SEO Optimal:** Dilengkapi meta tag lengkap untuk pencarian Google, link pratinjau media sosial, dan perlindungan keamanan.
- **Imperial Admin Panel (`/manage-sabil-x82k9`):** Halaman rahasia bertema Star Wars untuk mengubah isi konten situs secara langsung tanpa perlu ubah kodingan.

---

## 🚀 Cara Menjalankan di Komputer Lokal

1. **Install dependensi:**
   ```bash
   npm install
   ```
2. **Jalankan server lokal:**
   ```bash
   npm run dev
   ```
3. Buka alamat `http://localhost:5173` di browser kamu.

---

## 🛠️ Perintah Utama (Scripts)

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Menjalankan web di mode pengembangan lokal |
| `npm run build` | Membuat file siap *deploy* ke folder `/dist` |
| `npm run preview` | Mencoba tampilan hasil *build* secara lokal |
| `npm run deploy` | Mengunggah versi terbaru langsung ke Cloudflare Worker |

---

## 📁 Ringkasan Folder Proyek

```
sabil-portfolio/
├── public/               # Gambar, favicon, & aturan header
├── src/
│   ├── admin/            # Halaman Admin Panel & styling Star Wars
│   ├── data.js           # SEMUA isi teks web (Inggris & Indonesia)
│   ├── App.jsx           # Tampilan utama portofolio
│   └── styles.css        # Desain warna dan tema tampilan
├── worker.js             # Pengatur rute situs & API Cloudflare Worker
├── wrangler.jsonc        # Konfigurasi deployment Cloudflare
└── package.json          # Daftar pustaka & skrip proyek
```

---

## ✏️ Cara Mengubah Isi Konten

Ada dua cara untuk mengubah teks/konten di web ini:

1. **Lewat Kodingan (Komputer Lokal):**
   Buka file `src/data.js` dan ubah teks di dalam blok `en` (Inggris) atau `id` (Indonesia).
2. **Lewat Admin Panel (Situs Live):**
   Akses jalur khusus rahasia (`/manage-sabil-x82k9`), masukkan kunci keamanan, dan ubah data JSON secara langsung.

---

## 🚀 Mengunggah Perubahan (Deployment)

Proyek ini terhubung langsung dengan **Cloudflare Workers**. Setiap kali kamu selesai mengubah kode:

1. Buat versi build terbaru:
   ```bash
   npm run build
   ```
2. Deploy ke Cloudflare:
   ```bash
   npx wrangler deploy
   ```

---

## 🎁 Easter Eggs

Buka *Developer Tools* / *Console* di browser kamu saat membuka situs ini untuk melihat pesan rahasia, atau ketik `sabil.help()` di console!

---

## 📄 Lisensi

Hak cipta dilindungi undang-undang. Proyek personal oleh Sabil Valdano.