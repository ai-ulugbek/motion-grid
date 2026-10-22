# LAMA · Bubble Tea

Dot Grid Moods v1.0.1 asosida: 11,5 soniya, 1920×1080, 30 fps.
Fon: yumshoq sutrang `#F7F2E8`. Chapda beshta ta’m, o‘ngda mos ichimlik.
Logo yuqorida, maskot pastki o‘ng burchakda. Ovoz va musiqa qo‘shilmagan.

## Yozuvlar

Foydalanuvchi tanlagan shrift — **Bubbly Humble**, Minimalist Eyes.
Rasmiy manba: https://www.creativefabrica.com/product/bubbly-humble/.
Foydalanuvchi yuborgan `Bubbly-Humble-149666812.zip` arxividagi asl OTF fayli ishlatilgan.
Ta’m nomlari ushbu shriftda saqlangan. Bu shriftning kichik harf gliflari katta
harflar bilan bir xil bo‘lgani uchun, bosh-kichik harflar bilan yozilgan shiorga
**DynaPuff Bold** ishlatilgan. DynaPuff SIL Open Font License 1.1 asosida
`assets/fonts/` ichida litsenziyasi bilan saqlangan.

Barcha yozuvlar HarfBuzz orqali shakllantirilgan va
`assets/lettering/` ichida SVG konturlar sifatida saqlangan. Shu sabab qayta render
uchun alohida shrift o‘rnatish kerak emas. Bubbly Humble’ning asl shrift fayli
repozitoriyga kiritilmagan.

Matn va rang:

- Matn rangi logo faylidagi asosiy rangga mos: `#FF5266`.
- Logo ostida: `Not Just Tea`.
- Yakunda: `Not Just Tea` — bosh-kichik harflar bilan.
- Yakuniy sahnada LAMA logosi yuqoridan pastga tushib, shiorning tepasida markazlashadi.

Yozuv matnlarini almashtirish uchun `scripts/build-lettering.py` ichidagi `LABELS`
qiymatlarini o‘zgartiring va o‘zingizdagi asl shrift fayli bilan qayta yarating.
Skript uchun Python, `fonttools` va `uharfbuzz` kerak. Misol:

```sh
python lama-motion/scripts/build-lettering.py /path/to/Bubbly-Humble.otf
```

HTMLdagi `alt` matnlarini va `content.json` ma’lumotlarini ham moslang.

## Ssenariy

| Vaqt | Sahna |
| --- | --- |
| 0–2 s | Logo, ro‘yxat va maskot paydo bo‘ladi |
| 2–3,5 s | OREO |
| 3,5–5 s | BANAN & XURMO |
| 5–6,5 s | MARAKUYA |
| 6,5–8 s | MATCHA |
| 8–9,5 s | ANANAS |
| 9,5–11,5 s | LAMA logosi pastga tushadi, ostida Not Just Tea paydo bo‘ladi; oxirgi ichimlik va maskot qoladi |

## Materiallar

`assets/` ichida foydalanuvchi yuborgan `lama_motion_optimized.zip` arxividan
olingan asl rasmlar saqlangan. `assets/transparent/` ichida ImageGen yordamida
fonlari olib tashlangan beshta ichimlik va maskotning RGBA PNG variantlari bor.
Sahnada aynan shaffof variantlar ishlatiladi: surat kartalari va maskotning
to‘rtburchak foni olib tashlangan. Logo asl faylidan, asl rangida ishlatiladi.

`../lama-transparent-pngs.zip` ushbu oltita shaffof PNG’ni o‘z ichiga oladi.

`index.html` — render qilinadigan sahna, GSAP vaqt jadvali va joylashuv.
`content.json` — ta’mlar, fayl nomlari va boshlanish vaqtlarining ma’lumotnomasi;
u HTMLga avtomatik qo‘llanmaydi. Matn yoki vaqtni o‘zgartirganda ikkalasini moslang.

## Qayta render qilish

Node.js, Chromium va FFmpeg kerak. Repo ildizidan:

```sh
HYPERFRAMES_BROWSER_PATH=/usr/bin/chromium HYPERFRAMES_NO_TELEMETRY=1 XDG_CACHE_HOME=/workspace/.cache \
  npx --yes --cache /workspace/.npm-cache hyperframes@0.8.185 render ./lama-motion \
  --output ./lama-motion.mp4 --fps 30 --quality high --resolution 1080p --workers 2
```

Kadrlarni tekshirish:

```sh
HYPERFRAMES_NO_TELEMETRY=1 XDG_CACHE_HOME=/workspace/.cache \
  npx --yes --cache /workspace/.npm-cache hyperframes@0.8.185 snapshot ./lama-motion \
  --at 1.2,2.9,4.4,5.9,7.4,8.9,11.1 --output ./lama-motion/review-lettering
```

Asl skill ko‘k aksent va olti rejimli nuqtalar sahnasiga mo‘ljallangan.
Ushbu loyiha foydalanuvchi talabiga ko‘ra beshta ichimlik, maskot, logo va sutrang fonga moslangan.
