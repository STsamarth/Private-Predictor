// script.js
const buttons = document.querySelectorAll(".btn");
const resultDiv = document.getElementById("prediction-result");
const historyList = document.getElementById("history-list");
const restartButton = document.getElementById("restart-btn");

let binarySequence = "";
let nextPredictionBinary = null;

// Button Click Handlers
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const binaryValue = value === "big" ? "1" : "0";
    binarySequence += binaryValue;

    // Update History
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.textContent = `Input: ${value.toUpperCase()} (Binary: ${binaryValue})`;
    historyList.appendChild(historyItem);

    // Calculate Next Prediction After User Input
    nextPredictionBinary = predictNext(binarySequence);
    const nextPrediction = nextPredictionBinary === "1" ? "Big" : "Small";

    // Display Next Prediction
    resultDiv.textContent = `Next Prediction: ${nextPrediction}`;
  });
});

// Restart Button Handler
restartButton.addEventListener("click", () => {
  binarySequence = "";
  resultDiv.textContent = "Next Prediction: Waiting for input...";
  historyList.innerHTML = "<h3>Prediction History</h3>";
  nextPredictionBinary = null;
});

// Pattern-Based Prediction Logic
function predictNext(sequence) {
  if (sequence.length < 3) {
    // Default Prediction for Short Sequences
    return sequence[sequence.length - 1] === "1" ? "0" : "1";
  }

  const lastPattern = sequence.slice(-3);
  const occurrences = {};

  // Search for the same pattern in the sequence and record the next value
  for (let i = 0; i < sequence.length - 3; i++) {
    const pattern = sequence.slice(i, i + 3);
    const nextValue = sequence[i + 3];

    if (pattern === lastPattern) {
      occurrences[nextValue] = (occurrences[nextValue] || 0) + 1;
    }
  }

  // Decide the prediction based on the most frequent following value
  if (occurrences["1"] > (occurrences["0"] || 0)) {
    return "1";
  } else if (occurrences["0"] > (occurrences["1"] || 0)) {
    return "0";
  }

  // Fallback Prediction if no clear pattern
  return sequence[sequence.length - 1] === "1" ? "0" : "1";
}