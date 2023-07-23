 function simulateKeyPress(element, key) {
  var eventObj = document.createEventObject
    ? document.createEventObject()
    : document.createEvent("Events");

  if (eventObj.initEvent) {
    eventObj.initEvent("keydown", true, true);
  }

  eventObj.keyCode = key;
  eventObj.which = key;

  element.dispatchEvent
    ? element.dispatchEvent(eventObj)
    : element.fireEvent("onkeydown", eventObj);
}

function typeText(element, text) {
  for (var i = 0; i < text.length; i++) {
    simulateKeyPress(element, text.charCodeAt(i));
  }
}

function initiateProcess() {
  var confirmationContainer = document.querySelector(".confirmation-container");
  var input = confirmationContainer.querySelector("input");
  var promptText = confirmationContainer.querySelector(".prompt-text");

  input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });

  input.addEventListener("input", function (event) {
    promptText.textContent =
      "$ This process is irreversible. Do you want to continue? (Yes/No)";
  });

  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      var confirmation = input.value.trim().toLowerCase();
      promptText.style.display = "none";
      input.style.display = "none";
      simulateKeyPress(document.body, 13);

      if (confirmation === "yes") {
        enterPassword(); 
      } else {
        displayMessage("May the Force be with you",);
      }
    }
  });

  promptText.textContent = "$ This process is irreversible. Do you want to continue? (Yes/No)";
  input.style.display = "block";
  input.focus();
}

function selfDestruct() {
  displayMessage("Intruder...");
}

function enterPassword() {
  var passwordContainer = document.querySelector(".password-container");
  var input = passwordContainer.querySelector("input");
  var promptText = passwordContainer.querySelector(".prompt-text");
  var password = "";

  input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });

  input.addEventListener("input", function (event) {
    password = input.value.trim();
    promptText.textContent = "$ Enter Password: " + "*".repeat(password.length);
  });

  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      promptText.style.display = "none";
      input.style.display = "none";
      simulateKeyPress(document.body, 13);

      if (password === "makeitrain") {
        displayMessage("Process initiated...");
        displayMessage(" 'Project Blanket and Cocoa underway' ");
        displayMatrixAnimation();
      } else {
        displayMessage("Intruder");
      }
    }
  });

  promptText.textContent = "$ Enter Password: ";
  input.style.display = "block";
  input.focus();
}

function displayMatrixAnimation() {
  const canvas = document.getElementById('matrixAnimation');
  const ctx = canvas.getContext('2d');

  // Set the canvas size to match the window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersArray = characters.split('');

  const fontSize = 16;
  const columns = canvas.width / fontSize;

  // Array to store the matrix columns
  const drops = [];

  // Initialize drops with random values
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height);
  }

  function drawMatrix() {
    // Set a semi-transparent black background to create fading effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Matrix green color
    ctx.font = fontSize + 'px monospace';

    // Loop through each column and each character in that column
    for (let i = 0; i < drops.length; i++) {
      const text = charactersArray[Math.floor(Math.random() * charactersArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Randomly reset the drop to start from the top to create a flowing effect
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      // Increment the drop's position
      drops[i]++;
    }
  }

  // Function to animate the Matrix
  function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
  }

  // Start the animation
  animateMatrix();
}

function displayMessage(message) {
  var terminal = document.querySelector(".terminal");
  var output = document.createElement("div");
  output.textContent = message;
  output.style.color = "green";
  terminal.appendChild(output);
}

initiateProcess();
