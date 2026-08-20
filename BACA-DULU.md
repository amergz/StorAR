# Katalog Langganan — PWA

## Kandungan folder
- `index.html` — halaman utama
- `manifest.json` — maklumat app (nama, ikon, warna)
- `sw.js` — service worker (untuk cache & sokongan offline)
- `icons/` — ikon app (192px, 512px, 512px maskable)

## PENTING: PWA WAJIB host di HTTPS
Ciri "Pasang App" **tidak akan berfungsi** jika anda buka `index.html` terus dari
komputer (file://) atau letak dalam Google Drive/Dropbox biasa. Browser hanya
benarkan pemasangan PWA dari:
- Domain HTTPS sebenar (cth: `https://katalog-anda.com`), ATAU
- `localhost` semasa ujian

## Cara mudah untuk host (percuma)
Pilih salah satu:

1. **GitHub Pages** (paling senang & percuma)
   - Buat repo baru di GitHub, muat naik semua fail dalam folder ini (kekalkan struktur folder `icons/`)
   - Settings → Pages → pilih branch `main` → Save
   - Dapat URL macam `https://username.github.io/nama-repo/`

2. **Netlify / Vercel**
   - Drag & drop folder ini ke netlify.com/drop
   - Dapat URL HTTPS serta-merta

3. **Cloudflare Pages**
   - Sambung repo GitHub atau upload terus

## Cara user pasang app (selepas host)
- **Android (Chrome):** Buka link → akan nampak banner "Pasang app ini" di dalam
  page, ATAU tekan menu (⋮) → "Add to Home screen" / "Install app"
- **iPhone (Safari):** Buka link → Share (kotak dengan anak panah) →
  "Add to Home Screen" (banner custom tak muncul di Safari, ini had Apple)
- **Desktop (Chrome/Edge):** Ikon "Pasang" akan muncul di hujung address bar,
  atau guna banner dalam page

Selepas dipasang, app akan ada ikon sendiri di skrin utama/desktop dan
terbuka tanpa bar alamat browser — sama macam app biasa.

## Nota tentang data
- App masih tarik harga terkini terus dari Google Sheets setiap kali dibuka
  (bukan dicache), jadi anda boleh kemas kini harga bila-bila masa tanpa
  perlu update app.
- Fail app shell (HTML/CSS/ikon) dicache oleh service worker supaya app boleh
  dibuka walaupun tiada internet — tapi harga produk perlukan sambungan
  internet untuk kemas kini.

## Nak tukar ikon app?
Ganti fail dalam `icons/` (kekalkan nama & saiz yang sama: 192x192 dan
512x512 piksel, format PNG).
