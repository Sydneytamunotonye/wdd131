
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;


reviewCount += 1;


localStorage.setItem("reviewCount", reviewCount);

document.getElementById("reviewCount").textContent = reviewCount;
