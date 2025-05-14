# Scriptura Zilnică 🌱

O aplicație web simplă care afișează versete din Biblie aleatorii pentru inspirație zilnică. Aplicația preia versetele dintr-un fișier JSON și le prezintă într-un design curat și minimalist.

## 🚨 Accesează siteul live aici:

[![Live](https://img.shields.io/badge/Vezi_live-uncuvant.ro-brightgreen?style=for-the-badge)](http://uncuvant.ro)

## 🌟 Funcționalități
- Afișează aleatoriu un verset biblic cu referința sa.
- Animație de fade-in lină pentru tranzițiile versetelor.
- Design modern, receptiv, folosind CSS Flexbox și variabile personalizate.
- Optimizat pentru mobil și desktop.
- Ușor de personalizat prin adăugarea de versete suplimentare în fișierul JSON.

## 🛠️ Tehnologii Utilizate
- **HTML5**
- **CSS3** (cu variabile pentru o temă ușor de personalizat)
- **JavaScript (ES6)**
- JSON (pentru datele versetelor)

## 🚀 Pași pentru Începere

1. **Clonează repository-ul:**

```bash
git clone [https://github.com/ovidiuchis/randombibleverse.git]
```

2. **Deschide proiectul local:**

- Deschide `index.html` în browserul tău preferat.

3. **Personalizează versetele:**

- Modifică fișierul `verses.json` aflat în folderul `content` pentru a adăuga sau actualiza versete biblice.

4. **Structura Fișierelor:**

```
📦 project-root
├── 📂 assets
│   ├── main.js
│   ├── styles.css
│   └── bible.png
├── content
│   └── verses.json
└── index.html
```

## 📂 Descrierea Fișierelor

- **index.html** – Structura principală HTML și layout-ul aplicației.
- **assets/styles.css** – Fișierul CSS care include stilurile și animațiile aplicației.
- **assets/main.js** – Fișierul JavaScript care gestionează preluarea și afișarea versetelor.
- **content/verses.json** – Fișier JSON care conține versetele biblice și referințele acestora.

## 🎯 Utilizare
- Apasă pe butonul "Verset Nou" pentru a afișa un verset aleatoriu.
- Toate versetele sunt preluate din fișierul `verses.json`.

## ✅ Îmbunătățiri viitoare
- Integrarea unui comutator pentru temă deschisă/închisă.
