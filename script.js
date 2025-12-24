document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const counter = document.getElementById("counter");
  const submitBtn = document.getElementById("submitBtn");

  const MAX_CHARS = 120;
  let timeLeft = 10;
  let locked = true;

  /* ===== INITIAL STATE ===== */
  submitBtn.disabled = true;
  submitBtn.textContent = `Locked (${timeLeft}s)`;
  counter.textContent = MAX_CHARS;

  /* ===== CHARACTER COUNTER ===== */
  input.addEventListener("input", () => {
    const remaining = MAX_CHARS - input.value.length;
    counter.textContent = remaining;
  });

  /* ===== HARD BLOCK DELETE ===== */
  input.addEventListener("beforeinput", (e) => {
    if (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward") {
      e.preventDefault();
    }
  });

  /* ===== LOCK TIMER ===== */
  const timer = setInterval(() => {
    timeLeft--;
    submitBtn.textContent = `Locked (${timeLeft}s)`;

    if (timeLeft <= 0) {
      locked = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      clearInterval(timer);
    }
  }, 1000);

  /* ===== SUBMIT ===== */
  submitBtn.addEventListener("click", () => {
    if (locked) return;

    input.disabled = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitted";

    counter.textContent = "Session ended";
    input.style.opacity = "0.4";
    input.style.filter = "blur(1px)";
  });
});
