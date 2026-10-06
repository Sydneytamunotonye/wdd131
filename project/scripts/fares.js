// Fares & Routes page: fare table, calculator, landmark cards, tips,
// and the trip planner form with localStorage persistence.

const fareBody = document.getElementById("fare-body");
const landmarkGrid = document.getElementById("landmark-grid");
const tipsList = document.getElementById("tips-list");

// Build a fare lookup from the shared dataset.
const fareByMode = transportOptions.map((option) => ({
    mode: option.name,
    short: Math.round(option.fareLow * 0.6),
    medium: Math.round((option.fareLow + option.fareHigh) / 2),
    long: option.fareHigh
}));

// --- Fare table ---
if (fareBody) {
    fareBody.innerHTML = fareByMode
        .map(
            (row) => `
            <tr>
                <th scope="row">${row.mode}</th>
                <td>${formatNaira(row.short)}</td>
                <td>${formatNaira(row.medium)}</td>
                <td>${formatNaira(row.long)}</td>
            </tr>`
        )
        .join("");
}

// --- Landmark cards ---
if (landmarkGrid) {
    landmarkGrid.innerHTML = landmarks
        .map(
            (landmark) => `
            <article class="landmark-card">
                <h3>${landmark.name}</h3>
                <p>${landmark.note}</p>
            </article>`
        )
        .join("");
}

// --- Tips list ---
if (tipsList) {
    tipsList.innerHTML = commuteTips.map((tip) => `<li>${tip}</li>`).join("");
}

// --- Trip cost calculator ---
const calcBtn = document.getElementById("calc-btn");
const calcOutput = document.getElementById("calc-output");
const calcMode = document.getElementById("calc-mode");
const calcTrip = document.getElementById("calc-trip");

if (calcBtn) {
    calcBtn.addEventListener("click", () => {
        const mode = calcMode.value;
        const trip = calcTrip.value;

        const row = fareByMode.find((entry) => entry.mode === mode);

        if (!row) {
            calcOutput.textContent = "Sorry, we could not find fares for that mode.";
            return;
        }

        let low;
        let high;

        if (trip === "Short hop") {
            low = Math.round(row.short * 0.9);
            high = Math.round(row.short * 1.2);
        } else if (trip === "Medium trip") {
            low = Math.round(row.medium * 0.9);
            high = Math.round(row.medium * 1.15);
        } else {
            low = Math.round(row.long * 0.9);
            high = Math.round(row.long * 1.2);
        }

        calcOutput.textContent = `A ${trip.toLowerCase()} by ${mode.toLowerCase()} typically costs about ${formatNaira(low)} to ${formatNaira(high)}${mode === "Mini-bus" ? " per person." : "."}`;

        // Remember the last calculation.
        localStorage.setItem(
            "ph-guide-last-fare",
            JSON.stringify({ mode, trip, low, high })
        );
    });
}

// Restore the last calculation so the value survives a refresh.
if (calcOutput) {
    const stored = localStorage.getItem("ph-guide-last-fare");

    if (stored) {
        const saved = JSON.parse(stored);
        calcOutput.textContent = `Last time you checked: ${saved.trip.toLowerCase()} by ${saved.mode.toLowerCase()} — about ${formatNaira(saved.low)} to ${formatNaira(saved.high)}.`;
    }
}

// --- Trip planner form ---
const tripForm = document.getElementById("trip-form");
const formStatus = document.getElementById("form-status");

if (tripForm) {
    tripForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Read the fields. Use form.elements so none of these clash with
        // properties that belong to the form element itself.
        const fields = tripForm.elements;
        const name = fields.name.value.trim();
        const email = fields.email.value.trim();
        const from = fields.from.value.trim();
        const to = fields.to.value.trim();
        const when = fields.when.value;
        const notes = fields.notes.value.trim();
        const chosenMode = fields.mode.value;

        // Conditional validation.
        if (!name || !from || !to || !chosenMode) {
            formStatus.textContent = "Please fill in your name, both locations, and pick a mode.";
            formStatus.className = "form-status error";
            return;
        }

        if (email && !email.includes("@")) {
            formStatus.textContent = "That email address does not look right.";
            formStatus.className = "form-status error";
            return;
        }

        const plan = {
            name,
            email,
            from,
            to,
            mode: chosenMode,
            when,
            notes,
            savedAt: new Date().toISOString()
        };

        // Persist the plan(s) with localStorage.
        const existing = JSON.parse(localStorage.getItem("ph-guide-plans")) || [];
        const updated = [...existing, plan];
        localStorage.setItem("ph-guide-plans", JSON.stringify(updated));

        // Confirm with a template literal.
        formStatus.textContent = `Thanks, ${name}! Your ${when.toLowerCase()} trip from ${from} to ${to} by ${plan.mode.toLowerCase()} has been saved on this device (plan #${updated.length}).`;
        formStatus.className = "form-status success";

        tripForm.reset();
    });
}
