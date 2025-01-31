## HERCA GROUP

## API untuk menampilkan komisi dari setiap marketing.
![alt text](https://raw.githubusercontent.com/Teddir/herca/refs/heads/main/public/komisi.png)
![alt text](https://raw.githubusercontent.com/Teddir/herca/refs/heads/main/public/view_client_komisi.png)

## Table pembayaran, dimana fungsinya adalah untuk melakukan pembayaran secara kredit.
![alt text](https://raw.githubusercontent.com/Teddir/herca/refs/heads/main/public/table_pembayaran.png)

## API pembayaran
![alt text](https://raw.githubusercontent.com/Teddir/herca/refs/heads/main/public/add_pembayaran.png)

## Postman collection
[Download Postman Collection JSON](https://raw.githubusercontent.com/Teddir/herca/refs/heads/main/public/postman_collection.json)

# Panduan Instalasi dan Penggunaan

## Prerequisites
Pastikan Anda telah menginstal:
- **Node.js** (versi terbaru disarankan)
- **Bun** atau **npm**

## Struktur Folder
```
herca/
│-- frontend/      # Next.js frontend
│-- backend/       # Elysia.js backend
│-- package.json   # Script dan dependensi
│-- README.md      # Dokumentasi proyek
```

## Cara Install
1. Clone repositori dari GitHub:
   ```sh
   git clone https://github.com/Teddir/herca.git
   ```
2. Masuk ke direktori proyek:
   ```sh
   cd herca
   ```
3. Install dependencies:
   ```sh
   bun install-pkg
   ```
   atau jika menggunakan npm:
   ```sh
   npm run install-pkg
   ```
4. Tambahkan file `.env` di folder frontend dengan konfigurasi berikut:
   ```sh
   BASE_BE_URL=http://localhost:3001
   ```

## Menjalankan Proyek
1. Jalankan :
   ```sh
   bun start:dev
   ```
   atau dengan npm:
   ```sh
   npm run start:dev
   ```
2. API terdokumentasi di Swagger, akses melalui:
   ```sh
   BASE_BE_URL/swagger
   ```

## Update Proyek
Jika Anda telah meng-clone proyek sebelumnya, lakukan update dengan:
```sh
cd herca
git pull
```
Kemudian pastikan dependencies terbaru telah diinstal:
```sh
bun install-pkg
```
atau
```sh
npm run install-pkg
```

## Standar Kontribusi
- Gunakan **branching** dengan konvensi: `feature/nama-fitur` atau `bugfix/nama-bug`
- Pastikan semua commit memiliki pesan yang jelas dan deskriptif
- Gunakan **pull request** untuk menggabungkan perubahan ke branch utama

## Lisensi
Proyek ini menggunakan lisensi [MIT](LICENSE).

