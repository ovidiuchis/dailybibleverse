/**
 * Bible Study Script - Handles loading and displaying study questions for different Bible books
 * Can be used for any Bible book study with the correct configuration
 */

// Global initialization function
window.initBibleStudy = function (config) {
  // Default configuration
  const defaults = {
    book: "Marcu", // Default book name
    jsonFile: "./content/marcu_intrebari.json", // Default json file
    kidsJsonFile: "./content/marcu_intrebaricopii.json" // Default kids json file
  };

  // Merge supplied config with defaults
  const options = { ...defaults, ...config };

  console.log("Bible Study initialized with options:", options);

  // Flag to prevent double initialization
  window.bibleStudyInitialized = true;

  const weekSelector = document.getElementById("week");
  console.log("Week selector found:", weekSelector);

  const weekTitle = document.getElementById("week-title");
  console.log("Week title found:", weekTitle);

  const questionsList = document.getElementById("questions");
  console.log("Questions list found:", questionsList);

  const modeToggle = document.getElementById("mode-toggle");
  console.log("Mode toggle found:", modeToggle);
  // Create a container for the text reference
  const textReference = document.createElement("a");
  textReference.id = "text-reference";
  textReference.target = "_blank";
  if (weekTitle) {
    weekTitle.appendChild(textReference);
  } else {
    console.error("Week title element not found!");
  }

  // Check for saved mode preference
  const storageKey = `${options.book.toLowerCase()}_kidsMode`;
  const kidsMode = localStorage.getItem(storageKey) === "true";

  if (modeToggle) {
    // Only enable the toggle if kids mode is available
    if (options.kidsJsonFile) {
      modeToggle.checked = kidsMode;
      modeToggle.disabled = false;

      if (kidsMode) {
        document.body.classList.add("kids-mode");
      }

      // Toggle between adult and kids mode
      modeToggle.addEventListener("change", () => {
        console.log("Toggle changed:", modeToggle.checked);
        const isKidsMode = modeToggle.checked;
        localStorage.setItem(storageKey, isKidsMode);

        document.body.classList.toggle("kids-mode", isKidsMode);

        // Reload questions for current selection
        loadQuestions(weekSelector.value);
      });
    } else {
      // No kids version available
      modeToggle.checked = false;
      modeToggle.disabled = true;
      document.body.classList.remove("kids-mode"); // Add a tooltip or note that kids mode is not available
      const toggleContainer = modeToggle.closest(".mode-toggle-container");
      const toggleLabel = toggleContainer ? toggleContainer.querySelector(".toggle-label") : null;
      if (toggleLabel && !toggleLabel.textContent.includes("(indisponibil)")) {
        toggleLabel.textContent += " (indisponibil)";
        toggleLabel.style.opacity = "0.7";
      }
    }
  } else {
    console.error("Mode toggle element not found!");
  }

  // Load saved week from localStorage
  const weekStorageKey = `${options.book.toLowerCase()}_selectedWeek`;
  const savedWeek = localStorage.getItem(weekStorageKey) || "1";

  if (weekSelector) {
    weekSelector.value = savedWeek;

    // Update content when week is selected
    weekSelector.addEventListener("change", () => {
      const selectedWeek = weekSelector.value;
      console.log("Selected week changed to:", selectedWeek);
      localStorage.setItem(weekStorageKey, selectedWeek);
      loadQuestions(selectedWeek);
    });
  } else {
    console.error("Week selector element not found!");
  }

  // Function to load questions based on selected week and mode
  function loadQuestions(selectedWeek) {
    if (!questionsList) {
      console.error("Questions list element not found!");
      return;
    }

    // Determine which json file to use based on mode and availability
    let jsonFile = options.jsonFile;
    if (modeToggle && modeToggle.checked && options.kidsJsonFile) {
      jsonFile = options.kidsJsonFile;
    }

    console.log("Loading questions from:", jsonFile, "for week:", selectedWeek);

    // Try with and without leading slash
    const jsonUrl = jsonFile.startsWith("/") ? jsonFile : `/${jsonFile}`;

    fetch(jsonUrl)
      .then(response => {
        console.log("Fetch response:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data loaded:", Object.keys(data));

        // Dynamically get the week key and range
        const weekKey = Object.keys(data).find(key => key.startsWith(`Săptămâna ${selectedWeek}`));

        if (!weekKey) {
          console.error("Week key not found:", `Săptămâna ${selectedWeek}`);
          questionsList.innerHTML = `<li class="error">Săptămâna ${selectedWeek} nu a fost găsită în datele încărcate.</li>`;
          return;
        }

        console.log("Found week key:", weekKey);
        const weekRange = weekKey.match(/\((.*?)\)/)?.[1] || "";

        // Update title
        if (weekTitle) {
          weekTitle.textContent = `📖 Săptămâna ${selectedWeek}`;

          // Update text reference
          textReference.textContent = `${weekRange}`;
          textReference.href = getBibleUrl(weekRange, options.book);

          // Ensure the text reference is appended correctly
          if (!weekTitle.contains(textReference)) {
            weekTitle.appendChild(textReference);
          }
        }

        // Update questions
        questionsList.innerHTML = "";
        if (data[weekKey]) {
          console.log("Questions found:", data[weekKey].length);
          data[weekKey].forEach(question => {
            const li = document.createElement("li");
            li.textContent = question;
            questionsList.appendChild(li);
          });
        } else {
          console.error("No questions found for week:", weekKey);
          questionsList.innerHTML = `<li class="error">Nu s-au găsit întrebări pentru Săptămâna ${selectedWeek}.</li>`;
        }
      })
      .catch(error => {
        console.error("Error loading questions:", error);
        questionsList.innerHTML = `<li class="error">A apărut o eroare la încărcarea întrebărilor: ${error.message}</li>`;
      });
  }

  // Load initial questions
  loadQuestions(savedWeek);

  // Helper function to get Bible.com URL
  function getBibleUrl(range, book) {
    // Books and their acronyms in Bible.com
    const bookAcronyms = {
      Marcu: "MRK",
      Coloseni: "COL"
      // Add more books as needed
    };

    const acronym = bookAcronyms[book] || book.substring(0, 3).toUpperCase();

    // Remove any book name text that might be in the range
    const cleanRange = range.replace(new RegExp(`${book}\\s*`, "i"), "");
    const baseUrl = `https://www.bible.com/bible/126/${acronym}.`;
    return `${baseUrl}${cleanRange.replace(/:/g, ".").replace(/-/g, "-")}.NTR`;
  }
};

// For backwards compatibility with Marcu study
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  // If this script is included in a page without explicit initialization,
  // check if we're on marcu-8sapt.html and initialize with default Marcu settings
  if (!window.bibleStudyInitialized) {
    console.log("Bible study not initialized yet, checking path");
    const path = window.location.pathname;
    console.log("Current path:", path);

    if (path.includes("marcu-8sapt")) {
      console.log("On Marcu page, auto-initializing");
      window.initBibleStudy({
        book: "Marcu",
        jsonFile: "./content/marcu_intrebari.json",
        kidsJsonFile: "./content/marcu_intrebaricopii.json"
      });
    } else if (path.includes("coloseni-8sapt")) {
      console.log("On Coloseni page, auto-initializing");
      window.initBibleStudy({
        book: "Coloseni",
        jsonFile: "./content/coloseni_intrebari.json",
        kidsJsonFile: null // No kids version for Coloseni
      });
    }
  }
});
