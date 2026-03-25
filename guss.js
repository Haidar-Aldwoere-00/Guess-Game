//Sitting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector(`h1`).innerHTML = gameName;
document.querySelector(`footer`).innerHTML =
  `${gameName} Game My Application With Elzero Web School`;

//Sitting Game Options
let numbersOfTries = 6;
let numbersOfLatter = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Word
let wordsToGuess = " ";
const words = [
  "ACTION",
  "ANIMAL",
  "BOTTLE",
  "BRIDGE",
  "BRIGHT",
  "CAMERA",
  "CANCER",
  "CHANCE",
  "CHURCH",
  "COFFEE",
  "DANGER",
  "DEVICE",
  "DINNER",
  "DOCTOR",
  "DOLLAR",
  "DRAGON",
  "DREAMY",
  "DRIVER",
  "ENERGY",
  "ENGINE",
  "FAMILY",
  "FARMER",
  "FINGER",
  "FLOWER",
  "FOREST",
  "FRIEND",
  "GARDEN",
  "GUITAR",
  "HAMMER",
  "HEALTH",
  "ISLAND",
  "JACKET",
  "JUNGLE",
  "KITTEN",
  "LAPTOP",
  "LEMONS",
  "MARKET",
  "MEMORY",
  "MOTHER",
  "MUSEUM",
  "NATURE",
  "NUMBER",
  "OFFICE",
  "ORANGE",
  "PERSON",
  "PLAYER",
  "POCKET",
  "POLICE",
  "SCHOOL",
  "STREET",
  "HAIDAR",
];
wordsToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// Manage Hints
document.querySelector(`.hint span`).innerHTML = numberOfHints;
const gitHintButton = document.querySelector(`.hint`);
gitHintButton.addEventListener("click", gitHint);
let messageArea = document.querySelector(".message");

function generateInput() {
  const inputContainer = document.querySelector(`.inputs`);
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement(`div`);
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try${i}</span>`;

    if (i !== 1) tryDiv.classList.add(`disabled-input`);

    for (let j = 1; j <= numbersOfLatter; j++) {
      const input = document.createElement(`input`);
      input.type = "text";
      input.id = `guess${i}-latter${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputContainer.appendChild(tryDiv);
  }
  inputContainer.children[0].children[1].focus();

  const inputInDisabledDiv = document.querySelectorAll(".disabled-input input");
  inputInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

console.log(wordsToGuess);
function handleGuesses() {
  let successGuess = true;

  for (let i = 1; i <= numbersOfLatter; i++) {
    if (currentTry > numbersOfTries) return;
    const inputField = document.querySelector(`#guess${currentTry}-latter${i}`);
    const latter = inputField.value.toLowerCase();
    const actualLatter = wordsToGuess[i - 1];

    //Game Logic
    if (latter === actualLatter) {
      inputField.classList.add("yes-in-place");
    } else if (wordsToGuess.includes(latter) && latter !== "") {
      inputField.classList.add("no-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  //Check If User Win Or Lose
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span> ${wordsToGuess}</span>`;
    gitHintButton.disabled = true;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congratz You Did't Use Hints</p> <span>You Win</span>`;
    }

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    guessButton.disabled = true;
  } else {
    let currentTryDiv = document.querySelector(`.try-${currentTry}`);
    if (currentTryDiv) {
      currentTryDiv.classList.add("disabled-input");
      let currentInputs = currentTryDiv.querySelectorAll("input");
      currentInputs.forEach((input) => (input.disabled = true));
    }

    currentTry++;

    let nextTryDiv = document.querySelector(`.try-${currentTry}`);

    if (nextTryDiv) {
      nextTryDiv.classList.remove("disabled-input");
      let nextInputs = nextTryDiv.querySelectorAll("input");
      nextInputs.forEach((input) => (input.disabled = false));

      if (nextInputs.length > 0) {
        nextInputs[0].focus();
      }
    } else {
      guessButton.disabled = true;
      gitHintButton.disabled = true;
      messageArea.innerHTML = `You Lose! The Word Was <span>${wordsToGuess.toUpperCase()}</span>`;
    }
  }
}

function gitHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(`.hint span`).innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    gitHintButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === "",
  );
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const IndexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (IndexToFill !== -1) {
      randomInput.value = wordsToGuess[IndexToFill].toUpperCase();
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function () {
  generateInput();
};
