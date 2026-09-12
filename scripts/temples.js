
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;
document.getElementById("lastmodified").textContent = document.lastModified;


const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("open");

    const isOpen = nav.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});
