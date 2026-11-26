
const whatsappNumber = "916369061301";

const prices = {
  "6 x 4 Inch": 250,
  "6 x 8 Inch": 350,
  "10 x 8 Inch": 450,
  "A4 Paper Size": 550,
  "12 x 8 Inch": 550,
  "12 x 15 Inch": 1000,
  "12 x 18 Inch": 1100
};

const frameSize = document.getElementById("frameSize");
const quantity = document.getElementById("quantity");

function updatePrice() {
  const size = frameSize.value;
  const qty = Math.max(1, Number(quantity.value) || 1);
  const price = prices[size] || 0;

  document.getElementById("unitPrice").textContent =
    "₹" + price.toLocaleString("en-IN");

  document.getElementById("totalPrice").textContent =
    "₹" + (price * qty).toLocaleString("en-IN");
}

frameSize.addEventListener("change", updatePrice);
quantity.addEventListener("input", updatePrice);

// WhatsApp order
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const size = frameSize.value;
  const qty = Math.max(1, Number(quantity.value));
  const details = document.getElementById("details").value.trim();

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Enter a valid 10 digit mobile number.");
    return;
  }

  if (!prices[size] || qty < 1) {
    alert("Please select a valid frame size and quantity.");
    return;
  }

  const unitPrice = prices[size];
  const total = unitPrice * qty;

  const message = `
🖼️ SM DESIGN WORK - NEW ORDER

Customer Name: ${name}
Mobile: ${mobile}

Frame Size: ${size}
Price Per Frame: ₹${unitPrice}
Quantity: ${qty}
Total Amount: ₹${total}

Requirements: ${details}

Thank you!
SM DESIGN WORK
6369061301 / 7639316162
`;

  window.open(
    "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
});

// CATCH THE FRAME GAME

let score = 0;
let timeLeft = 20;
let gameActive = false;
let gameInterval;
let timerInterval;

const target = document.getElementById("target");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameMessage = document.getElementById("gameMessage");
const startButton = document.getElementById("startGame");

function moveTarget() {
  const maxX = gameArea.clientWidth - target.offsetWidth;
  const maxY = gameArea.clientHeight - target.offsetHeight;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

function startGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  score = 0;
  timeLeft = 20;
  gameActive = true;

  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  gameMessage.textContent = "Catch the frame!";
  target.style.display = "block";
  startButton.textContent = "PLAY AGAIN";

  moveTarget();

  gameInterval = setInterval(moveTarget, 900);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

target.addEventListener("click", () => {
  if (!gameActive) return;

  score++;
  scoreDisplay.textContent = score;
  moveTarget();
});

function endGame() {
  gameActive = false;

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  target.style.display = "none";
  gameMessage.textContent = "🎉 Game Over! Your Score: " + score;
  startButton.textContent = "PLAY AGAIN";
}

startButton.addEventListener("click", startGame);

updatePrice();
