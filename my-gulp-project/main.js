// Your existing prizes array
let prizes = [
  { text: "YES", color: "hsl(197 30% 43%)" },
  { text: "NO", color: "hsl(173 58% 39%)" },
  { text: "YES", color: "hsl(43 74% 66%)" },
  { text: "NO", color: "hsl(27 87% 67%)" },
  { text: "YES", color: "hsl(43 74% 66%)" },
  { text: "NO", color: "hsl(27 87% 67%)" }
];

let prizesTwo = [
  { text: "YES", color: "hsl(197 30% 43%)" },
  { text: "NO", color: "hsl(173 58% 39%)" },
  { text: "MAYBE", color: "hsl(2 34% 47%)" },
  { text: "YES", color: "hsl(43 74% 66%)" },
  { text: "NO", color: "hsl(27 87% 67%)" },
  { text: "MAYBE", color: "hsl(2 34% 47%)" },
  { text: "YES", color: "hsl(43 74% 66%)" },
  { text: "NO", color: "hsl(27 87% 67%)" },
  { text: "MAYBE", color: "hsl(2 34% 47%)" },
];


const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");
let tickerAnim;
let rotation = 0;
let currentSlice = 0;
let prizeNodes;
let counterElementYes = document.querySelector(".counter.yes");
let counterElementNo = document.querySelector(".counter.no");
let numberCounterYes = 0;
let numberCounterNo = 0;
const btnOne = document.getElementById("btn-one")

// Utility to create prizes nodes for the spinner
const createPrizeNodes = () => {
  // Clear existing prizes first
  spinner.innerHTML = "";
  
  // Calculate slice and offset based on current prizes length
  const prizeSlice = 360 / prizes.length;

  const prizeOffset = Math.floor(180 / prizes.length);

  // Add new prize elements
  prizes.forEach(({ text, color }, i) => {
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    spinner.insertAdjacentHTML(
      "beforeend",
      `<li class="prize" style="--rotate: ${rotation}deg">
          <span class="text">${text}</span>
        </li>`
    );
  });
};

// Create conic gradient based on prizes
const createConicGradient = () => {
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
        from -90deg,
        ${prizes
      .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
      .reverse()
    }
      );`
  );
};

// Setup the wheel to render with current prizes
const setupWheel = () => {
  createConicGradient();
  createPrizeNodes();
  prizeNodes = wheel.querySelectorAll(".prize");
};

// Spin inertia calculation
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Ticker animation function
const runTickerAnimation = () => {
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];
  let rad = Math.atan2(b, a);

  if (rad < 0) rad += (2 * Math.PI);

  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / (360 / prizes.length));

  if (currentSlice !== slice) {
    ticker.style.animation = "none";
    setTimeout(() => ticker.style.animation = null, 10);
    currentSlice = slice;
  }

  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

// Select and display prize result
const selectPrize = () => {
  const prizeSlice = 360 / prizes.length;
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add("selected");

  if (prizes[selected].text === 'YES') {
    numberCounterYes++;
    counterElementYes.textContent = numberCounterYes;
  } else {
    numberCounterNo++;
    counterElementNo.textContent = numberCounterNo;
  }
};

// Spin wheel on button click
trigger.addEventListener("click", () => {
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  prizeNodes.forEach((prize) => prize.classList.remove("selected"));
  wheel.classList.add("is-spinning");
  spinner.style.setProperty("--rotate", rotation);
  ticker.style.animation = "none";
  runTickerAnimation();
});

// Handle end of spinning transition
spinner.addEventListener("transitionend", () => {
  cancelAnimationFrame(tickerAnim);
  trigger.disabled = false;
  rotation %= 360;
  selectPrize();
  wheel.classList.remove("is-spinning");
  spinner.style.setProperty("--rotate", rotation);
});

// Remove a subset of prizes and update wheel



document.getElementById("btn-one").onclick = () => {
  if (prizes.length === 6) { // Only run if there are 6 prizes
    prizes.splice(1, 4); // Remove 4 items starting from index 1
    console.log("Updated Prizes:", prizes);
    setupWheel(); // Re-render the wheel with updated prizes
  } else if (prizes.length === 4) {
    prizes.splice(1, 2);
    console.log("Updated Prizes:", prizes);
    setupWheel();
  }
}


document.getElementById("btn-two").onclick = () => {
  if (prizes.length === 6) { // Only run if there are 6 prizes
    prizes.splice(1, 2); // Remove 2 items starting from index 1
    console.log("Updated Prizes:", prizes);
    setupWheel(); // Re-render the wheel with updated prizes
  } else if (prizes.length === 2 ) {
    prizes.push(
      { text: "YES", color: "hsl(2 34% 47%)" },
      { text: "NO", color: "hsl(161, 47%, 65%)" }
    )
    console.log("Updated Prizes:", prizes);
    setupWheel(); // Re-render the wheel with updated prizes
  } 
}

document.getElementById("btn-three").onclick = () => {
  if (prizes.length === 6) { 
    // Only run if there are exactly 6 prizes
    prizes.splice(1, 0); // Adjust to actually remove an item if needed
    console.log("Updated Prizes:", prizes);
    setupWheel(); // Re-render the wheel with updated prizes
  } else if (prizes.length === 4) { 
    // Only run if there are exactly 4 prizes
    prizes.push(
      { text: "YES", color: "hsl(2 34% 47%)" },
      { text: "NO", color: "hsl(161, 47%, 65%)" }
    );
    console.log("Updated Prizes:", prizes);
    setupWheel(); // Ensure the wheel is updated with new prizes
  } else if (prizes.length === 2){
    prizes.push(
      { text: "YES", color: "hsl(2 34% 47%)" },
      { text: "NO", color: "hsl(161, 47%, 65%)" },
      { text: "YES", color: "hsl(2 34% 47%)" },
      { text: "NO", color: "hsl(161, 47%, 65%)" }
    )
    console.log("Updated Prizes:", prizes);
    setupWheel(); // Re-render the wheel with updated prizes
  }
};


let usingPrizesTwo = false;

// Set up "Maybe" button to toggle between prizes sets
document.getElementById("btn-maybe").onclick = () => {
  if (!usingPrizesTwo) {
    // Switch to prizesTwo
    prizes = [...prizesTwo];
    usingPrizesTwo = true;
  } else {
    // Revert to original prizes set
    prizes = [
      { text: "YES", color: "hsl(197 30% 43%)" },
      { text: "NO", color: "hsl(173 58% 39%)" },
      { text: "YES", color: "hsl(43 74% 66%)" },
      { text: "NO", color: "hsl(27 87% 67%)" },
      { text: "YES", color: "hsl(43 74% 66%)" },
      { text: "NO", color: "hsl(27 87% 67%)" }
    ];
    usingPrizesTwo = false;
  }

  console.log("Updated Prizes (Maybe):", prizes);
  setupWheel();  // Re-render the wheel with the selected prizes array
};

// "Yes or No" button to reset back to the default prize set
document.getElementById("btn-yesOrNo").onclick = () => {
  prizes = [
    { text: "YES", color: "hsl(197 30% 43%)" },
    { text: "NO", color: "hsl(173 58% 39%)" },
    { text: "YES", color: "hsl(43 74% 66%)" },
    { text: "NO", color: "hsl(27 87% 67%)" },
    { text: "YES", color: "hsl(43 74% 66%)" },
    { text: "NO", color: "hsl(27 87% 67%)" }
  ];
  usingPrizesTwo = false;

  console.log("Reset Prizes to Original (Yes/No):", prizes);
  setupWheel();  // Re-render the wheel with the original prizes array
};







// Initialize wheel setup
setupWheel();
