// DOM elements
const verseTextElement = document.getElementById("verse-text");
const verseReferenceElement = document.getElementById("verse-reference");
const refreshButton = document.getElementById("refresh-btn");
const verseContainer = document.querySelector(".verse-container");
const currentYearElement = document.getElementById("current-year");
const modal = document.getElementById("about-modal");
const aboutProjectLink = document.getElementById("about-project-link");
const modalCloseButton = document.querySelector(".modal-close-button");

// App state
let versesData = [];

// Initialize app
function initApp() {
  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear();

  // Load initial verse
  loadVerses();

  // Set up event listeners
  refreshButton.addEventListener("click", displayVerse);
  setupModalListeners();
}

// Fetch verses from JSON file
async function loadVerses() {
  try {
    const response = await fetch("./content/verses.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    if (jsonData && Array.isArray(jsonData.versete)) {
      versesData = jsonData.versete;
      displayVerse();
    } else {
      throw new Error("Verse data is not in the expected format");
    }
  } catch (error) {
    console.error("Could not load verses:", error);
    verseTextElement.textContent = "Nu s-au putut încărca versetele.";
    verseReferenceElement.textContent = "Vă rugăm să încercați mai târziu.";
  }
}

// Get a random verse
function getRandomVerse() {
  if (!versesData || versesData.length === 0) {
    return { text: "Se încarcă versetele...", referinta: "" };
  }
  const randomIndex = Math.floor(Math.random() * versesData.length);
  return versesData[randomIndex];
}

// Display a verse with animation
function displayVerse() {
  // Reset animation
  verseContainer.classList.remove("fade-in");

  // Small delay before adding new content
  setTimeout(() => {
    const verse = getRandomVerse();
    verseTextElement.textContent = verse.text;
    verseReferenceElement.textContent = verse.referinta;

    // Trigger animation
    verseContainer.classList.add("fade-in");
  }, 300);
}

// Setup modal functionality
function setupModalListeners() {
  if (aboutProjectLink && modal && modalCloseButton) {
    aboutProjectLink.addEventListener("click", event => {
      event.preventDefault();
      modal.style.display = "block";
    });

    modalCloseButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal if user clicks outside of the modal content
    window.addEventListener("click", event => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Allow closing with Escape key
    window.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
  }
}

// Initialize the app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initApp);
