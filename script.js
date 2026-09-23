// Game values
let temperature = 50;
let power = 0;
let gameOver = false;

// Find the HTML elements we need to update
const temperatureText = document.getElementById("temperature");
const powerText = document.getElementById("power");
const temperatureFill = document.getElementById("temperature-fill");
const statusText = document.getElementById("status");
const powerButton = document.getElementById("power-button");
const coolButton = document.getElementById("cool-button");
const restartButton = document.getElementById("restart-button");

// Change the screen to match the current game values
function updateScreen() {
  temperatureText.textContent = temperature;
  powerText.textContent = power;
  temperatureFill.style.width = temperature + "%";

  if (temperature >= 75) {
    temperatureFill.style.background = "#e85d4a";
  } else if (temperature >= 50) {
    temperatureFill.style.background = "#ffb347";
  } else {
    temperatureFill.style.background = "#39c16c";
  }
}

// Generate power, but also create heat
function generatePower() {
  if (gameOver) return;

  power += 10;
  temperature += 10;

  if (temperature >= 100) {
    temperature = 100;
    gameOver = true;
    statusText.textContent = "MELTDOWN! The reactor overheated.";
    statusText.style.color = "#ff6b5f";
    powerButton.disabled = true;
    coolButton.disabled = true;
    restartButton.classList.remove("hidden");
  } else {
    statusText.textContent = "Power generated. Watch the temperature.";
  }

  updateScreen();
}

// Cooling lowers the temperature, but cannot go below zero
function coolReactor() {
  if (gameOver) return;

  temperature -= 15;
  if (temperature < 0) temperature = 0;

  statusText.textContent = "Cooling systems are running.";
  updateScreen();
}

// Put everything back at its starting value
function restartGame() {
  temperature = 50;
  power = 0;
  gameOver = false;
  statusText.textContent = "Reactor is stable.";
  statusText.style.color = "#76e39a";
  powerButton.disabled = false;
  coolButton.disabled = false;
  restartButton.classList.add("hidden");
  updateScreen();
}

// Connect each button to its function
powerButton.addEventListener("click", generatePower);
coolButton.addEventListener("click", coolReactor);
restartButton.addEventListener("click", restartGame);

// Show the starting values
updateScreen();
