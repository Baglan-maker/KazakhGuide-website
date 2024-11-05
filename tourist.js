const currentMode = localStorage.getItem("theme");

if (currentMode === "dark") {
  document.body.classList.add("dark-mode");
}

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
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

let activeAccordionItem = document.querySelector(".accordion-item.active");
const accordionItems = document.querySelectorAll(".accordion-item");

accordionBtnClick(activeAccordionItem);

accordionItems.forEach(item => {
    item.querySelector(".accordion-button").onclick = () => accordionBtnClick(item);
});

function accordionBtnClick(item) {
    if (activeAccordionItem && activeAccordionItem !== item) {
        toggleAccordion(activeAccordionItem);
    }

    toggleAccordion(item);

    activeAccordionItem = item.classList.contains("active") ? item : null;
}

function toggleAccordion(item) {
    const button = item.querySelector(".accordion-button");
    const content = item.querySelector(".accordion-collapse");

    item.classList.toggle("active");
    button.setAttribute("aria-expanded", item.classList.contains("active"));
    button.classList.toggle("collapsed");
    content.classList.toggle("show");

    content.style.height = content.classList.contains("show")
        ? `${content.querySelector(".accordion-body").clientHeight}px`
        : "0";
}
