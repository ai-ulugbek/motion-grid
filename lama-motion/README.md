# LAMA · Bubble Tea

Dot Grid Moods v1.0.1 asosida: 11,5 soniya, 1920×1080, 30 fps.
Fon: yumshoq sutrang `#F7F2E8`. Chapda beshta ta’m, o‘ngda mos ichimlik.
Logo yuqorida, maskot pastki o‘ng burchakda. Ovoz va musiqa qo‘shilmagan.

## Ssenariy

| Vaqt | Sahna |
| --- | --- |
| 0–2 s | Logo, ro‘yxat va maskot paydo bo‘ladi |
| 2–3,5 s | OREO |
| 3,5–5 s | BANAN & XURMO |
| 5–6,5 s | MARAKUYA |
| 6,5–8 s | MATCHA |
| 8–9,5 s | ANANAS |
| 9,5–11,5 s | Oxirgi ichimlik, logo va maskot bilan yakun |

## Materiallar

`assets/` ichida foydalanuvchi yuborgan `lama_motion_optimized.zip` arxividan
olingan asl rasmlar joylashgan. Mahsulotlar o‘zgartirilmagan; suratlarning
kadr chegaralari CSS orqali tanlangan. Logo asl rangida saqlangan.

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
  --at 1.2,2.9,4.4,5.9,7.4,8.9,11.1 --output ./lama-motion/review-final
```

Asl skill ko‘k aksent va olti rejimli nuqtalar sahnasiga mo‘ljallangan.
Ushbu loyiha foydalanuvchi talabiga ko‘ra beshta ichimlik, maskot, logo va sutrang fonga moslangan.
