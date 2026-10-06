// Footer dynamic dates for all pages.
const yearSpan = document.getElementById("currentyear");
const modifiedSpan = document.getElementById("lastmodified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
}
