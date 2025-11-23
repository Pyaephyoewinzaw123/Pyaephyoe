// Mobile nav toggle
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.style.display =
      mobileNav.style.display === "flex" ? "none" : "flex";
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Contact form (simple fake submit)
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

if (contactForm && contactFormMessage) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactFormMessage.textContent = "Thanks! We received your message.";
    contactFormMessage.style.color = "#047857";
    contactForm.reset();
  });
}

// Program filter on programs.html
const filterButtons = document.querySelectorAll(".filter-btn");
const programCards = document.querySelectorAll("#programList .program-card");

if (filterButtons.length && programCards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-level");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      programCards.forEach((card) => {
        const cardLevels = card.getAttribute("data-level");
        if (level === "all" || cardLevels.includes(level)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Dashboard – BMI calculator
const bmiHeightInput = document.getElementById("bmiHeight");
const bmiWeightInput = document.getElementById("bmiWeight");
const bmiBtn = document.getElementById("bmiCalcBtn");
const bmiValue = document.getElementById("bmiValue");
const bmiMessage = document.getElementById("bmiMessage");

if (bmiBtn && bmiHeightInput && bmiWeightInput && bmiValue && bmiMessage) {
  bmiBtn.addEventListener("click", () => {
    const h = parseFloat(bmiHeightInput.value);
    const w = parseFloat(bmiWeightInput.value);

    if (!h || !w) {
      bmiMessage.textContent = "Please enter both height and weight.";
      bmiMessage.style.color = "#b91c1c";
      return;
    }

    const heightMeters = h / 100;
    const bmi = w / (heightMeters * heightMeters);
    const rounded = bmi.toFixed(1);
    bmiValue.textContent = rounded;

    let msg = "";
    if (bmi < 18.5) msg = "Underweight – consider gentle strength training.";
    else if (bmi < 25) msg = "Normal – keep maintaining your routine!";
    else if (bmi < 30) msg = "Overweight – regular activity can help.";
    else msg = "Obese – consistent changes and guidance recommended.";

    bmiMessage.textContent = msg;
    bmiMessage.style.color = "#0f766e";
  });
}

// Dashboard – Add workout (front-end only)
const workoutForm = document.getElementById("workoutForm");
const workoutTable = document.getElementById("workoutTable");
const workoutFormMessage = document.getElementById("workoutFormMessage");
const caloriesToday = document.getElementById("caloriesToday");
const workoutsWeek = document.getElementById("workoutsWeek");
const progressFill = document.getElementById("progressFill");

let totalCaloriesToday = 0;
let workoutCountWeek = 0;

if (workoutForm && workoutTable) {
  workoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("workoutName").value.trim();
    const duration = parseInt(
      document.getElementById("workoutDuration").value,
      10
    );
    const calories = parseInt(
      document.getElementById("workoutCalories").value,
      10
    );

    if (!name || !duration || !calories) {
      if (workoutFormMessage) {
        workoutFormMessage.textContent = "Please fill in all fields correctly.";
        workoutFormMessage.style.color = "#b91c1c";
      }
      return;
    }

    const tbody = workoutTable.querySelector("tbody");
    const row = document.createElement("tr");

    const today = new Date();
    const dateStr = today.toLocaleDateString();

    row.innerHTML = `
      <td>${dateStr}</td>
      <td>${name}</td>
      <td>${duration} min</td>
      <td>${calories} kcal</td>
    `;
    tbody.prepend(row);

    totalCaloriesToday += calories;
    workoutCountWeek += 1;

    if (caloriesToday) {
      caloriesToday.textContent = `${totalCaloriesToday} kcal`;
    }
    if (workoutsWeek) {
      workoutsWeek.textContent = workoutCountWeek;
    }
    if (progressFill) {
      // fake simple progress up to 100%
      const progress = Math.min(workoutCountWeek * 15, 100);
      progressFill.style.width = progress + "%";
    }

    workoutForm.reset();
    if (workoutFormMessage) {
      workoutFormMessage.textContent = "Workout added!";
      workoutFormMessage.style.color = "#047857";
    }
  });
}
