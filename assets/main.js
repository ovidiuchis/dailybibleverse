let versesData = [];

// DOM elements
const verseTextElement = document.getElementById("verse-text");
const verseReferenceElement = document.getElementById("verse-reference");
const refreshButton = document.getElementById("refresh-btn");
const verseContainer = document.querySelector(".verse-container");
const currentYearElement = document.getElementById("current-year");

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Fetch verses from JSON file
async function loadVerses() {
  try {
    const response = await fetch("../content/verses.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Extrage array-ul de versete din cheia "versete"
    const jsonData = await response.json();
    if (jsonData && Array.isArray(jsonData.versete)) {
      versesData = jsonData.versete;
    } else {
      versesData = []; // Fallback to empty array if data is not as expected
      console.error("Verse data is not in the expected format:", jsonData);
    }
    displayVerse(); // Display initial verse after loading data
  } catch (error) {
    console.error("Could not load verses:", error);
    verseTextElement.textContent = "Nu s-au putut încărca versetele. Verifică consola.";
  }
}

// Get a random verse
function getRandomVerse() {
  if (!versesData || versesData.length === 0) {
    // Verifică dacă versesData este definit și are elemente
    return { text: "Se încarcă versetele...", referinta: "" }; // Folosește "referinta" și text tradus
  }
  const randomIndex = Math.floor(Math.random() * versesData.length);
  return versesData[randomIndex];
}

// Display a verse with animation
function displayVerse() {
  // Reset animation
  verseContainer.classList.remove("fade-in");

  // Small delay before adding new content to allow for transition
  setTimeout(() => {
    const verse = getRandomVerse();
    verseTextElement.textContent = verse.text;
    verseReferenceElement.textContent = verse.referinta; // Folosește "referinta" din JSON

    // Trigger animation
    verseContainer.classList.add("fade-in");
  }, 300);
}

// Initial verse display
// displayVerse(); // Called by loadVerses after data is fetched
loadVerses(); // Load verses from JSON

// Add event listener to refresh button
refreshButton.addEventListener("click", displayVerse);
