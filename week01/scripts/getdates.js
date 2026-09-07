// Dynamically output the current year into the footer's first paragraph
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Dynamically output the date the document was last modified
document.getElementById("lastmodified").textContent = document.lastModified;