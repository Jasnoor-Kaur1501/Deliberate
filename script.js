const input = document.getElementById("input");
const counter = document.getElementById("counter");
const submitBtn = document.getElementById("submitBtn");

const MAX_CHARS = 120;
let locked = true;
let timeLeft = 10;

/* ===== INITIAL STATE ===== */
counter.textContent = MAX_CHARS;
submitBtn.textContent = `Locked (${timeLeft}s)`;

/* ===== CHARACTER COUNTER ===== */
input.addEventListener("input", () => {
  const remaining = MAX_CHARS - input.value.length;
  counter.textContent = remaining;

  if (remaining <= 10) {
    counter.style.opacity = "1";
  }
});

/* ===== NO BACKSPACE / DELETE ===== */
input.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    e.preventDefault();
  }
});

/* ===== LOCK TIMER ===== */
const lockInterval = setInterval(() => {
  timeLeft--;
  submitBtn.textContent = `Locked (${timeLeft}s)`;

  if (timeLeft <= 0) {
    locked = false;
    submitBtn.textContent = "Submit";
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    clearInterval(lockInterval);
  }
}, 1000);

/* ===== SUBMIT ===== */
submitBtn.addEventListener("click", () => {
  if (locked) return;

  input.disabled = true;
  submitBtn.disabled = true;

  submitBtn.textContent = "Submitted";

  // Visual end state
  input.style.opacity = "0.4";
  input.style.filter = "blur(1px)";
  counter.textContent = "Session ended";

  document.querySelector(".constraints").style.opacity = "0.2";
});
