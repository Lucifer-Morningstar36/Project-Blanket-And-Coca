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
          initiateProcess();
        } else {
          selfDestruct();
        }
      }
    });
  
    promptText.textContent = "$ Enter Password: ";
    input.style.display = "block";
    input.focus();
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
          displayMessage("Process initiated...");
          displayMessage(" 'Project Blanket and Cocoa underway' ");
        } else {
          selfDestruct();
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
  
  function displayMessage(message) {
    var terminal = document.querySelector(".terminal");
    var output = document.createElement("div");
    output.textContent = message;
    output.style.color = "green";
    terminal.appendChild(output);
  }
  
  enterPassword();
  
