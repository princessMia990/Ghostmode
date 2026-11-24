function welcomeMessage() {
    alert("Welcome to GhostMode! 👻💜");
}
function changeMessage() {
    const el = document.getElementById("changeText");
    if (el) el.innerHTML = "You are worthy. You are capable. Keep going! 💜🚀";
}
function contactMessage() {
    alert("Hello! Thanks for visiting GhostMode! 💕");
}
function secretMessage() {
    const el = document.getElementById("secretMessageText");
    if (el) el.innerHTML = "👻 YOU FOUND THE SECRET ROOM! 💜 Never stop creating! ✨";
}

let ghostsFound = 0;
function huntGhost() {
    const message = document.getElementById("gameMessage");
    const score = document.getElementById("score");
    if (!message || !score) return;
    if (Math.random() < 0.5) {
        ghostsFound++;
        message.innerHTML = "👻 YOU FOUND A GHOST!";
    } else {
        message.innerHTML = "Nothing here... Try again! 🌙";
    }
    score.innerHTML = "Ghosts Found: " + ghostsFound;
}
function resetGame() {
    ghostsFound = 0;
    const score = document.getElementById("score");
    const message = document.getElementById("gameMessage");
    if (score) score.innerHTML = "Ghosts Found: 0";
    if (message) message.innerHTML = "Let's hunt for ghosts! 👻";
}

const music = document.getElementById("backgroundMusic");
async function toggleMusic() {
    const button = document.getElementById("musicButton");
    if (!music || !button) return;
    if (music.paused) {
        try {
            await music.play();
            button.innerHTML = "⏸ Pause Music";
        } catch (error) {
            alert("Music couldn't play. Check that ghost-music.mp3 is in your website folder!");
            console.error("Music error:", error);
        }
    } else {
        music.pause();
        button.innerHTML = "🎵 Play Music";
    }
}

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.innerHTML = "✦";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = (Math.random() * 4 + 3) + "s";
    sparkle.style.fontSize = (Math.random() * 15 + 10) + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 7000);
}
setInterval(createSparkle, 500);

const mouseGhost = document.getElementById("mouseGhost");
if (mouseGhost && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    mouseGhost.style.display = "block";
    document.addEventListener("mousemove", function(event) {
        mouseGhost.style.left = event.clientX + "px";
        mouseGhost.style.top = event.clientY + "px";
    });
}

document.addEventListener("click", function(event) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "✨";
        sparkle.style.position = "fixed";
        sparkle.style.left = event.clientX + "px";
        sparkle.style.top = event.clientY + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "99999";
        sparkle.style.fontSize = "20px";
        document.body.appendChild(sparkle);
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        sparkle.animate([
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], { duration: 800, easing: "ease-out" });
        setTimeout(() => sparkle.remove(), 800);
    }
});

let secretCode = "";
document.addEventListener("keydown", function(event) {
    if (event.key.length !== 1) return;
    secretCode += event.key.toLowerCase();
    secretCode = secretCode.slice(-5);
    if (secretCode === "ghost") {
        const message = document.getElementById("secretMessageText");
        if (message) message.innerHTML = "🎉 YOU UNLOCKED THE GHOSTMODE SECRET! 👻💜";
        const room = document.getElementById("secretRoom");
        if (room) room.scrollIntoView({ behavior: "smooth" });
        secretCode = "";
    }
});

let caughtGhosts = 0;
function setupCatchGame() {
    caughtGhosts = 0;
    const ghosts = document.querySelectorAll(".catchGhost");
    ghosts.forEach(ghost => {
        ghost.disabled = false;
        ghost.innerHTML = "👻";
    });
    const score = document.getElementById("ghostScore");
    if (score) score.innerHTML = "Ghosts Caught: 0 / 3";
}
document.querySelectorAll(".catchGhost").forEach(ghost => {
    ghost.addEventListener("click", function() {
        if (ghost.disabled) return;
        caughtGhosts++;
        ghost.disabled = true;
        ghost.innerHTML = "✨";
        const score = document.getElementById("ghostScore");
        if (score) score.innerHTML = "Ghosts Caught: " + caughtGhosts + " / 3";
        if (caughtGhosts === 3) {
            setTimeout(() => alert("YOU CAUGHT ALL THE GHOSTS! 👻🏆"), 200);
        }
    });
});
function resetCatchGame() {
    setupCatchGame();
}