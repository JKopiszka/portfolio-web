const buttons = document.querySelectorAll("nav button");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("main").classList.remove("show");
        setTimeout(() => {
            document.querySelector("main").classList.add("show");
        }, 50);
    });
});

const interests = document.querySelector(".interests-section");

function checkScroll() {
    const rect = interests.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
        interests.classList.add("show");
    }
}
window.addEventListener("scroll", checkScroll);
checkScroll();

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector("main").classList.add("show");
    }, 50);
});