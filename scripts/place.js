// ---------- Footer dynamic content ----------
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;
document.getElementById("lastmodified").textContent = document.lastModified;

// ---------- Responsive hamburger menu ----------
const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("open");

    const isOpen = nav.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

// ---------- Static weather data (metric) ----------
const temperature = 8;  // °C
const windSpeed = 12;   // km/h

/**
 * Calculate the wind chill factor (metric, °C / km/h).
 * Formula: Twc = 13.12 + 0.6215T - 11.37V^0.16 + 0.3965T * V^0.16
 * @param {number} temp - temperature in °C
 * @param {number} speed - wind speed in km/h
 * @returns {number} wind chill factor in °C
 */
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// Only calculate when conditions are viable (metric):
// temperature <= 10 °C AND wind speed > 4.8 km/h
function displayWindChill() {
    const output = document.getElementById("windchill");

    if (temperature <= 10 && windSpeed > 4.8) {
        const chill = calculateWindChill(temperature, windSpeed);
        output.textContent = `${chill.toFixed(1)} °C`;
    } else {
        output.textContent = "N/A";
    }
}

displayWindChill();
