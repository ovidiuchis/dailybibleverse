# Scriptura Zilnică 🌱

A simple web application that displays random Bible verses for daily inspiration. The application fetches verses from a JSON file and presents them with a clean, minimalist design.

## 🌟 Features
- Randomly displays a Bible verse with its reference.
- Smooth fade-in animation for verse transitions.
- Modern, responsive design using CSS Flexbox and custom properties.
- Optimized for mobile and desktop.
- Easy to customize with additional verses in the JSON file.

## 🛠️ Technologies Used
- **HTML5**
- **CSS3** (with variables for easy theming)
- **JavaScript (ES6)**
- JSON (for verse data)

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone [repository-url]
cd [repository-folder]
```

2. **Open the project locally:**

- Open `index.html` in your preferred browser.

3. **Customize the verses:**

- Modify the `verses.json` file located in the `content` folder to add or update Bible verses.

4. **Structure Overview:**

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

## 📂 File Descriptions

- **index.html** – The main HTML structure and layout.
- **assets/styles.css** – Styling for the application, including animations and responsive design.
- **assets/main.js** – JavaScript file that handles fetching and displaying verses.
- **content/verses.json** – JSON file containing Bible verses and references.

## 🎯 Usage
- Click the "Verset Nou" button to display a new random verse.
- All verses are fetched from the `verses.json` file.

## ✅ Future Enhancements
- Integrate a light/dark theme toggle.
