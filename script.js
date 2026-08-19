// SPA section switching
const buttons = document.querySelectorAll(".menu button");
const sections = document.querySelectorAll(".section");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.section;
        const section = document.getElementById(target);

        if (!section) return;

        sections.forEach(sec => sec.classList.remove("active"));
        section.classList.add("active");

        document.querySelector("main").classList.remove("show");
        setTimeout(() => {
            document.querySelector("main").classList.add("show");
        }, 50);

        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// fade-in for interests
const interests = document.querySelector(".interests-section");

function checkScroll() {
    const rect = interests.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
        interests.classList.add("show");
    }
}
window.addEventListener("scroll", checkScroll);
checkScroll();

// fade-in for technologies
const techSection = document.querySelector(".technologies-section");

function checkTechScroll() {
    const rect = techSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
        techSection.classList.add("show");
    }
}
window.addEventListener("scroll", checkTechScroll);
checkTechScroll();

// initial fade-in
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector("main").classList.add("show");
    }, 50);
});

// dynamic publications from GitHub
async function loadPublications() {
    const list = document.getElementById("pub-list");
    const fallback = document.createElement("h2");
    fallback.textContent = "Oops, nothing on here yet...";
    fallback.style.textAlign = "center";
    fallback.style.marginTop = "40px";
    fallback.style.opacity = "0.7";

    try {
        const response = await fetch(
            "https://api.github.com/repos/JKopiszka/portfolio-web/contents/publications"
        );

        if (!response.ok) {
            list.replaceWith(fallback);
            return;
        }

        const files = await response.json();

        // Jeśli folder jest pusty
        if (!files || files.length === 0) {
            list.replaceWith(fallback);
            return;
        }

        list.innerHTML = "";
        let added = 0;

        files.forEach(file => {
            if (file.type !== "file") return;

            const li = document.createElement("li");

            const cleanName = file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/-/g, " ")
                .replace(/_/g, " ");

            const a = document.createElement("a");
            a.href = file.download_url;
            a.textContent = cleanName;
            a.target = "_blank";
            a.style.color = "var(--accent)";
            a.style.textDecoration = "none";
            a.style.fontSize = "20px";

            li.appendChild(a);
            list.appendChild(li);
            added++;
        });

        // Jeśli nie dodano żadnego pliku (np. same foldery)
        if (added === 0) {
            list.replaceWith(fallback);
        }

    } catch (err) {
        console.error("Failed to load publications:", err);
        list.replaceWith(fallback);
    }
}

loadPublications();

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
});