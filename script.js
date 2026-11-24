
const $ = (id) => document.getElementById(id);

const music = $("bgMusic");
const musicToggle = $("musicToggle");

let musicStarted = false;

function showScene(id) {
  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.remove("active");
  });

  $(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ENVELOPE OPENING

$("openEnvelope").addEventListener("click", async () => {

  $("envelope").classList.add("open");

  if (!musicStarted) {
    try {
      await music.play();
      musicStarted = true;
      updateMusicButton();
    } catch (error) {
      musicToggle.querySelector("span").textContent = "Tap for music";
    }
  }

  setTimeout(() => {
    showScene("letterScene");
  }, 1900);

});

// LETTER TO HEART

$("toHeart").addEventListener("click", () => {
  showScene("heartScene");
});

// HEART OPENING

$("openHeart").addEventListener("click", () => {

  const heart = $("heartVisual");

  $("openHeart").disabled = true;
  $("openHeart").textContent = "Opening my heart...";

  setTimeout(() => {
    heart.classList.add("opened");
  }, 100);

  setTimeout(() => {
    $("revealMessage").classList.add("show");
    $("openHeart").style.display = "none";
  }, 1700);

});

// HEART TO PROPOSAL

$("toProposal").addEventListener("click", () => {
  showScene("proposalScene");
});

// YES BUTTON

$("yesBtn").addEventListener("click", () => {

  showScene("celebrationScene");

  const layer = $("confettiLayer");

  const symbols = ["♥", "♡", "✦", "🎀", "💕"];

  for (let i = 0; i < 90; i++) {

    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (12 + Math.random() * 20) + "px";
    piece.style.animationDelay = Math.random() * 2 + "s";

    layer.appendChild(piece);

    setTimeout(() => piece.remove(), 6500);
  }

});

// TAKE YOUR TIME

$("timeBtn").addEventListener("click", () => {

  $("responseMessage").textContent =
    "Take all the time you need. Your feelings matter. ♡";

});

// MUSIC CONTROL

function updateMusicButton() {

  const playing = !music.paused;

  musicToggle.querySelector("span").textContent =
    playing ? "Music On" : "Music Off";
}

musicToggle.addEventListener("click", async () => {

  if (music.paused) {

    try {
      await music.play();
      musicStarted = true;
    } catch (error) {
      musicToggle.querySelector("span").textContent =
        "Music unavailable";
    }

  } else {
    music.pause();
  }

  updateMusicButton();

});

music.addEventListener("pause", updateMusicButton);
music.addEventListener("play", updateMusicButton);
