document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // 1. කලින් Save කරපු Theme එක බලලා Load කරන්න
    const savedTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-bs-theme", savedTheme);
    updateButtonText(savedTheme);

    // 2. Button එක තිබේ නම් (Login Page එකේ සමහර විට නැති නිසා), Click Event එක දාන්න
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            // Theme එක මාරු කරන්න
            htmlElement.setAttribute("data-bs-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateButtonText(newTheme);
        });
    }

    function updateButtonText(theme) {
        if (toggleButton) {
            toggleButton.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
            toggleButton.className = theme === "dark" ? "btn btn-outline-light btn-sm" : "btn btn-outline-dark btn-sm";
        }
    }
});