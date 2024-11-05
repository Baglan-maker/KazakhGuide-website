const currentMode = localStorage.getItem("theme");

if (currentMode === "dark") {
  document.body.classList.add("dark-mode");
}

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});


const toggleCitiesBtn = document.getElementById("toggleCitiesBtn");
const cityListItems = document.querySelectorAll("#cityList .city");

let showMainCitiesOnly = false;

toggleCitiesBtn.addEventListener("click", () => {
    showMainCitiesOnly = !showMainCitiesOnly;
    toggleCitiesBtn.textContent = showMainCitiesOnly ? "Show All Cities" : "Show Main Cities Only";

    cityListItems.forEach(city => {
        if (showMainCitiesOnly) {
            if (!city.classList.contains("main-city")) {
                city.style.display = "none";
            }
        } else {
            city.style.display = "list-item";
        }
    });
});


function updateDateTime() {
    const dateContainer = document.getElementById("datetime");
    
    const now = new Date();
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    
    const formattedDateTime = now.toLocaleString('en-US', options);
    dateContainer.textContent = formattedDateTime;
}

updateDateTime();

setInterval(updateDateTime, 1000);