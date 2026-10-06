// Mobile navigation toggle for all pages
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle && navList) {
    const closeMenu = () => {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link is chosen (mobile)
    navList.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            closeMenu();
        }
    });

    // Close when resizing up to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 760) {
            closeMenu();
        }
    });
}
