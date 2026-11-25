# Pulim 6.0 — shaxsiy moliya platformasi

HTML + CSS + vanilla JavaScript. Ishga tushirish: papkani `https://` hostingga joylang (GitHub Pages, Netlify, Vercel) yoki `http://localhost` orqali oching.

## 6.0 yangiliklari
- **Hisoblar:** ro'yxatdan o'tish, kirish, «meni eslab qol» (30 kun), chiqish.
- **Xavfsizlik:** parollar PBKDF2-SHA256 (150 000 takror, tasodifiy tuz) bilan xeshlanadi, ochiq saqlanmaydi. 5 marta noto'g'ri urinishdan keyin 60 soniya blok. Parol kuchi ko'rsatkichi.
- **Parolni tiklash:** ro'yxatdan o'tishda bir martalik tiklash kodi beriladi (nusxa olish / faylga saqlash). Kod ham xeshlangan holda saqlanadi. Sozlamalarda yangi kod olish mumkin.
- **Profil:** ism va emailni o'zgartirish, parolni o'zgartirish, hisobni o'chirish (parol bilan tasdiqlanadi).
- **Har bir foydalanuvchining ma'lumoti alohida** (`hisobchi-u-<id>` kaliti). Hisobsiz kiritilgan eski ma'lumotlar birinchi hisobga avtomatik ko'chiriladi.
- **Onboarding:** toza hisob yoki namuna ma'lumot bilan boshlash.
- **Yangi dizayn:** yorug' interfeys, Onest va Unbounded shriftlari (fayllar ichida, internet shart emas), SVG ikonkalar, kategoriya ranglari, telefonda pastki menyu va tez qo'shish oynasi, kunlar bo'yicha guruhlangan operatsiyalar, o'chirganda «Qaytarish», ketma-ket kunlar seriyasi, klaviatura: `N` yangi yozuv, `/` tezkor yozuv, `Esc` yopish.

## 6.5: yangi nom — Pulim
- Sayt nomi «Pulim» (avvalgi nom patentlangan). Sarlavha, manifest, menyu, xabarlar, uch tildagi tarjimalar, eksport fayllari nomlari (`pulim-...`) yangilandi.
- Yangi logotip: chot g'oyasi saqlangan holda «P» harfi — chap ustun, yarim doira ramka va oltin toshli cho'p.
- Foydalanuvchi ma'lumotlari saqlanadigan ichki kalitlar (`hisobchi-...`) ataylab o'zgartirilmadi: avvalgi hisoblar, yozuvlar va admin paroli joyida qoladi.

## 6.4: yangi logotip (Chot)
- Bozordagi hisob cho'ti: ikki ustun va o'rtadagi oltin toshlar «H» harfini hosil qiladi.
- Yangilangan: sayt ikonkasi (`logo.svg`, `icon-192.png`), telefon ikonkalari (`icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png`), yon menyu, kirish oynasi va admin paneli. Qorong'i rejimda logotip rangi moslashadi.

## 6.3: yorug' va qorong'i rejim
- Uch xil: **Yorug'**, **Qorong'i**, **Tizim** (telefon/kompyuter sozlamasiga avtomatik moslashadi; standart).
- Almashtirish: yon menyuda oy/quyosh tugmasi, telefonda «Ko'proq» oynasida, Sozlamalar → Ko'rinish, kirish oynasida va admin panelida. Tanlov eslab qolinadi.
- Sahifa ochilganda oq «miltillash» bo'lmaydi: rejim CSS yuklanishidan oldin qo'llanadi. Brauzer elementlari (sana tanlash, aylantirish chizig'i) ham rejimga mos.
- Fayl: `theme.js`; ranglar `style.css` dagi `:root[data-theme="dark"]` blokida.

## 6.2: administrator paneli («Ma'lumotlar bazasi»)
- **Kirish:** kirish oynasida login `admin`, parol `admin1234`. Birinchi kirishdan keyin **parolni darhol o'zgartiring** (Sozlamalar → Administrator paroli). Panel buni sariq ogohlantirish bilan eslatib turadi.
- Parol kodda ochiq yozilmagan: faqat PBKDF2 xeshi saqlanadi. 5 ta noto'g'ri urinishdan keyin 60 soniya blok. Admin sessiyasi 4 soat yoki brauzer yopilguncha.
- **Umumiy:** foydalanuvchilar soni, faollar (7 kun), jami yozuvlar, ma'lumotlar hajmi, umumiy aylanma grafigi, barcha foydalanuvchilar bo'yicha xarajat kategoriyalari, yangi ro'yxatdan o'tganlar va oxirgi faollik.
- **Foydalanuvchilar:** qidiruv, har bir hisob kartasi (balans, yozuvlar soni, oxirgi operatsiyalar), vaqtinchalik parol berish, hisobni JSON qilib yuklab olish, hisobni o'chirish.
- **Ma'lumotlar bazasi:** 6 ta jadval (foydalanuvchilar, operatsiyalar, qarzlar, eslatmalar, maqsadlar, byudjet). Qidiruv, ustun bo'yicha saralash, sahifalash (25 qator), CSV eksport.
- **Sozlamalar:** admin parolini o'zgartirish, to'liq bazani bitta JSON faylga zaxiralash va undan tiklash, barcha foydalanuvchilar operatsiyalarini CSV qilib yuklab olish, barcha hisoblarni o'chirish.
- Fayl: `admin.js`. Uch tilda ishlaydi.
- **Cheklov:** panel shu brauzerdagi hisoblarni ko'rsatadi. Barcha qurilmalardagi foydalanuvchilarni bitta joyda ko'rish uchun bulutli baza (Supabase/Firebase) kerak.

## 6.1: uch til
- **O'zbek, rus, ingliz.** Til kirish ekranida, yon menyuda (telefonda «Ko'proq») va Sozlamalarda almashtiriladi. Tanlov eslab qolinadi; birinchi kirishda brauzer ruscha bo'lsa ruscha, aks holda o'zbekcha ochiladi.
- **Yordamchi uch tilda tushunadi:** «Потратил 150 тысяч на продукты», «Коплю 5 млн на телефон», «Spent 150k on groceries», «Saving 5m for a phone», «Remind me tomorrow to pay internet», «Какой у меня бюджет?» va hokazo. Javoblar tanlangan tilda.
- Sana, oy, hafta kunlari va valyuta (so'm / сум / UZS) tilga mos ko'rsatiladi.
- Fayllar: `i18n.js` (til tizimi), `i18n-dict.js` (480+ tarjima). Yangi matn qo'shganda: o'zbekcha yozing va `i18n-dict.js` ga `"o'zbekcha": ["ruscha", "inglizcha"]` qatorini qo'shing. Raqamli matnlarda `{n}` (son) va `{m}` (pul) ishlatiladi.
- Foydalanuvchi yozgan matnlar (izoh, ism, maqsad nomi) tarjima qilinmaydi.

## Fayllar
- `auth.js` — hisoblar, xeshlash, sessiya
- `core.js` — ma'lumotlar, o'zbekcha gap tahlilchisi, hisob-kitoblar, demo, eksport
- `app.js` — interfeys va sahifalar
- `authui.js` — kirish / ro'yxatdan o'tish ekranlari, profil, ishga tushirish
- `style.css`, `fonts/`, `sw.js` (oflayn), `manifest.webmanifest`

## Muhim cheklov
Hisoblar **qurilmaning o'zida** saqlanadi: boshqa telefondan shu hisobga kirib bo'lmaydi, ma'lumotlar shifrlanmagan (parol ilovaga kirishni himoya qiladi). Bulutli hisob uchun `auth.js` dagi `signUp`, `signIn`, `resetPw` funksiyalarini Firebase Authentication yoki Supabase Auth chaqiruvlari bilan almashtirish va `Store.save/load` ni bulut bazasiga ulash kerak — interfeys o'zgarmaydi.

---
# 5.0 va oldingi versiyalar hujjati
## 5.0 — shaxsiy moliyaviy yordamchi

HTML + CSS + vanilla JavaScript, localStorage. Server va API kalit yo'q. Ishga tushirish: papkani `https://` hostingga joylang (GitHub Pages, Netlify) yoki `http://localhost` (VS Code → Live Server) orqali oching.

## 5.0 yangiliklari
- **Xush kelibsiz ekrani + Demo ma'lumot**: bo'sh ilovada «✨ Demo ma'lumot bilan ko'rish» tugmasi 6 oylik namunaviy daromad, xarajat, qarz, eslatma, byudjet va maqsadlarni yuklaydi. Oldingi ma'lumot zaxiraga olinadi va «Sozlamalar»dan qaytariladi.
- **💰 Byudjet limitlari**: har bir xarajat kategoriyasi uchun oylik limit. Jarayon chizig'i (80% da sariq, 100% da qizil), oyning bugungi kuni belgisi, «oy tezligidan oldinda» ogohlantirishi, kunlik sarf imkoni, limitsiz xarajatlar ro'yxati. Bosh sahifada va AI tavsiyalarida ogohlantirish chiqadi.
- **AI chat kengaydi**: «Telefon uchun 5 mln jamg'armoqchiman, 1-iyungacha» → jamg'arma maqsadi; «Oziq-ovqatga oyiga 2 mln limit qo'y» → byudjet limiti; «Byudjetim qanday?» → holat. Yetishmagan ma'lumotni so'raydi, saqlashdan oldin tasdiq oladi.
- **📲 PWA**: `manifest.webmanifest` va ikonkalar — telefonga ilova sifatida o'rnatiladi. Service Worker fayllarni keshlaydi — **internetsiz ham ochiladi**. Tezkor havolalar: `?p=ai`, `?p=an`, `?p=bud`.
- **💾 Zaxira nusxa**: JSON yuklab olish/tiklash (boshqa qurilmaga ko'chirish), Excel uchun CSV eksport. 20+ yozuv bo'lsa va 30 kundan beri nusxa olinmagan bo'lsa, eslatadi.
- **🔍 Qidiruv va filtr**: Daromad/Xarajat ro'yxatlarida izoh, kategoriya, summa bo'yicha qidiruv, oy va kategoriya filtri.
- **⚙ Sozlamalar** sahifasi, oflayn holat belgisi, favicon, meta/OG teglar.
- Ma'lumot tuzilmasi `v:5` (`budgets` qo'shildi). 4.0 ma'lumotlari avtomatik ko'chiriladi, nusxa `hisobchi-v2-v4-backup` kalitida.

