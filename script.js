// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// Fetch #1: random dev joke
const jokeBtn = document.getElementById("joke-btn");
const jokeOutput = document.getElementById("joke-output");

jokeBtn.addEventListener("click", () => {
  jokeOutput.textContent = "Loading...";

  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((res) => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then((data) => {
      jokeOutput.textContent = data.setup + " — " + data.punchline;
    })
    .catch(() => {
      jokeOutput.textContent = "Couldn't load a joke. Try again later.";
    });
});

// Fetch #2: random activity
const activityBtn = document.getElementById("activity-btn");
const activityOutput = document.getElementById("activity-output");

// List of fallback activities
const activities = [
  "Learn a new programming language",
  "Build a small project",
  "Read a tech blog",
  "Practice coding challenges",
  "Watch a tutorial on YouTube",
  "Contribute to open source",
  "Review your code from last week",
  "Plan your next project",
  "Write documentation for your project",
  "Take a break and go for a walk",
  "Solve a coding problem on LeetCode",
  "Read a book about software development",
  "Organize your files and folders",
  "Update your portfolio",
  "Learn about a new framework"
];

activityBtn.addEventListener("click", () => {
  activityOutput.textContent = "Loading...";

  fetch("https://www.boredapi.com/api/activity")
    .then((res) => {
      if (!res.ok) throw new Error("API error");
      return res.json();
    })
    .then((data) => {
      if (data.activity) {
        activityOutput.textContent = data.activity;
      } else {
        throw new Error("No activity");
      }
    })
    .catch(() => {
      // Use local fallback if API fails
      const randomIndex = Math.floor(Math.random() * activities.length);
      activityOutput.textContent = activities[randomIndex] + " (try this!)";
    });
});

// Contact form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks! Your message has been received.";
  contactForm.reset();
});