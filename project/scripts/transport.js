// Transport page: filter and sort the option cards.
// Exercises DOM selection/modification, event listeners, conditionals,
// array methods, template literals and objects.

const optionGrid = document.getElementById("option-grid");
const filterForm = document.getElementById("filter-form");
const filterNeed = document.getElementById("filter-need");
const sortBtn = document.getElementById("sort-btn");
const resultCount = document.getElementById("result-count");

let currentlySorted = false;

// Build one card's HTML from an option object using a template literal.
const buildCard = (option) => {
    const prosItems = option.pros.split(", ").map((item) => `<li>${item}</li>`).join("");

    // Conditional badge based on the cheapest starting fare.
    const valueBadge =
        option.fareLow <= 500
            ? `<p class="badge badge-value">Great value</p>`
            : `<p class="badge badge-premium">Comfort pick</p>`;

    return `
        <article class="option-card">
            <header class="option-head">
                <span class="option-icon" aria-hidden="true">${option.icon}</span>
                <h3>${option.name}</h3>
            </header>
            ${valueBadge}
            <p class="option-blurb">${option.blurb}</p>
            <p class="option-fare"><strong>Typical fare:</strong> ${fareRange(option)}</p>
            <p class="option-pros"><strong>Advantages:</strong></p>
            <ul>${prosItems}</ul>
            <p class="option-cons"><strong>Watch out for:</strong> ${option.cons}</p>
        </article>`;
};

// Render a list of options into the grid.
const renderOptions = (list) => {
    if (list.length === 0) {
        optionGrid.innerHTML = `<p class="empty">No options match that need. Try another filter.</p>`;
    } else {
        optionGrid.innerHTML = list.map(buildCard).join("");
    }

    resultCount.textContent = `Showing ${list.length} of ${transportOptions.length} options.`;
};

// Apply the current filter and sort state.
const applyView = () => {
    const need = filterNeed.value;

    let visible = transportOptions;

    if (need !== "all") {
        visible = transportOptions.filter((option) => option.bestFor.includes(need));
    }

    if (currentlySorted) {
        visible = [...visible].sort((a, b) => a.fareLow - b.fareLow);
    }

    renderOptions(visible);
};

// React to filter changes.
filterForm.addEventListener("change", applyView);

// Toggle sorting by fare.
sortBtn.addEventListener("click", () => {
    currentlySorted = !currentlySorted;
    sortBtn.textContent = currentlySorted
        ? "Sorted by fare (low to high)"
        : "Sort by typical fare (low to high)";
    applyView();
});

// Initial render.
renderOptions(transportOptions);
