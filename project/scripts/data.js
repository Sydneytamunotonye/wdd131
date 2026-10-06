// Shared data and helpers for Getting Around Port Harcourt

// The core dataset of transport options used across the site.
const transportOptions = [
    {
        name: "Keke (tricycle)",
        icon: "🛺",
        blurb: "Three-wheeled tricycles that dart through short neighbourhood routes and market areas.",
        bestFor: ["short", "budget"],
        fareLow: 300,
        fareHigh: 800,
        speed: 3,
        safety: 2,
        pros: "Cheap, everywhere, great for short hops and streets buses cannot enter.",
        cons: "Open to weather, no fixed price, can be uncomfortable with luggage."
    },
    {
        name: "Mini-bus",
        icon: "🚌",
        blurb: "Shared buses that follow fixed routes between major areas and parks for a flat fare.",
        bestFor: ["long", "budget"],
        fareLow: 400,
        fareHigh: 1200,
        speed: 3,
        safety: 3,
        pros: "Very cheap for long distances and predictable routes.",
        cons: "Crowded at rush hour and slower in heavy traffic."
    },
    {
        name: "Shared taxi",
        icon: "🚕",
        blurb: "Standard cars that pick up several passengers going the same way.",
        bestFor: ["budget", "speed"],
        fareLow: 500,
        fareHigh: 1500,
        speed: 4,
        safety: 3,
        pros: "Faster than buses and still affordable when shared.",
        cons: "You may wait until the car fills before it leaves."
    },
    {
        name: "Ride-hailing (app)",
        icon: "📱",
        blurb: "App-booked private cars with a set price shown before you ride.",
        bestFor: ["safety", "long"],
        fareLow: 900,
        fareHigh: 4000,
        speed: 4,
        safety: 5,
        pros: "Fixed price, air-conditioning, trackable trip, no haggling.",
        cons: "The most expensive option and surge pricing in the rain."
    },
    {
        name: "Water transport",
        icon: "⛴️",
        blurb: "Riverboats and ferries linking waterside communities across the creeks.",
        bestFor: ["long", "speed"],
        fareLow: 500,
        fareHigh: 2500,
        speed: 5,
        safety: 3,
        pros: "Skips road traffic entirely — often the fastest way across water.",
        cons: "Requires life jackets and good weather; limited landing points."
    }
];

// Landmarks commuters use to navigate.
const landmarks = [
    { name: "Rumuokoro", note: "Major bus park and gateway to the north of the city." },
    { name: "Mile 1 / Mile 3 Market", note: "Busy central markets and transport hubs." },
    { name: "Garrison / GRA", note: "Government and business district, well known to drivers." },
    { name: "Trans-Amadi", note: "Industrial and commercial area with heavy daytime traffic." },
    { name: "Choba / UNIPORT", note: "University corridor with student-focused transport." },
    { name: "Airport Road", note: "Route toward the airport, best planned well ahead." }
];

// Practical commute tips.
const commuteTips = [
    "Agree the fare before you board; keke and taxi prices are negotiable.",
    "Carry small naira notes and coins — drivers rarely have change.",
    "Avoid the 7am–10am and 4pm–7pm peaks if your trip is flexible.",
    "During the rainy season (roughly April–October) allow up to double the travel time.",
    "For night travel, prefer app-based rides that can be tracked and shared.",
    "Keep valuables out of sight and sit where you can see your route."
];

// Simple helper: format a number as naira.
const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;

// Simple helper: pick a fare range string from the dataset.
const fareRange = (option) => `${formatNaira(option.fareLow)} – ${formatNaira(option.fareHigh)}`;
