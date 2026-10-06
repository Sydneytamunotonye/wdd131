// Home page: render "at a glance" stats and a greeting.
// Uses objects, arrays, array methods, conditional branching and template literals.

const statsGrid = document.getElementById("stats-grid");

if (statsGrid) {
    // Reduce the transport dataset into aggregate statistics.
    const cheapestFare = transportOptions.reduce(
        (lowest, option) => (option.fareLow < lowest ? option.fareLow : lowest),
        Infinity
    );

    const mostCommonBestFor = transportOptions.map((option) => option.bestFor).flat();

    const budgetFriendly = transportOptions.filter(
        (option) => option.bestFor.includes("budget")
    ).length;

    const stats = [
        { value: transportOptions.length, label: "transport modes covered" },
        { value: landmarks.length, label: "navigation landmarks" },
        { value: formatNaira(cheapestFare), label: "cheapest starting fare" },
        { value: budgetFriendly, label: "budget-friendly options" },
        { value: commuteTips.length, label: "practical commute tips" },
        { value: new Set(mostCommonBestFor).size, label: "ways to match your needs" }
    ];

    // Build the cards with template literals.
    statsGrid.innerHTML = stats
        .map(
            (stat) => `
            <div class="stat-card">
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>`
        )
        .join("");
}

// A small greeting that reacts to the time of day and is stored in localStorage.
const welcomeHeading = document.querySelector(".page-intro");

if (welcomeHeading) {
    const hour = new Date().getHours();

    let greeting;
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    const visits = Number(localStorage.getItem("ph-guide-visits")) || 0;
    localStorage.setItem("ph-guide-visits", String(visits + 1));

    const greetingNote = document.createElement("p");
    greetingNote.className = "greeting-note";
    greetingNote.textContent =
        visits === 0
            ? `${greeting}, and welcome! This is your first visit to the guide.`
            : `${greeting}! Welcome back — you have opened this guide ${visits + 1} times on this device.`;

    welcomeHeading.insertAdjacentElement("afterend", greetingNote);
}
