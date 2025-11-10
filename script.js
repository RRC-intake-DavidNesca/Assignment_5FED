// This waits for the window to fully load so our elements exist before we query them
window.onload = function () {
  // This grabs a reference to the form element so we can listen for events
  var form = document.getElementById("contactForm");
  // This grabs the input where the user types their name
  var nameInput = document.getElementById("name");
  // This grabs the input where the user types their email
  var emailInput = document.getElementById("email");
  // This grabs the textarea where the user types the message
  var messageInput = document.getElementById("message");
  // This grabs the small element that shows the character count
  var msgCount = document.getElementById("msgCount");
  // This grabs the container where we will show error or success messages
  var messages = document.getElementById("messages");
  // This defines the maximum number of characters allowed in the message box
  var MAX = 200;

  // This helper marks a given field element as valid
  function markValid(el) { el.classList.remove("invalid"); el.classList.add("valid"); }
  // This helper marks a given field element as invalid
  function markInvalid(el) { el.classList.remove("valid"); el.classList.add("invalid"); }

  // This updates the character counter and trims the text if it exceeds the limit
  function updateCounter() {
    // This reads the current length of the message
    var len = messageInput.value.length;
    // This trims extra characters if the limit is exceeded
    if (len > MAX) { messageInput.value = messageInput.value.substring(0, MAX); len = MAX; }
    // This writes the "current/max" count into the small element
    msgCount.textContent = len + "/" + MAX;
    // This ends the updateCounter helper
  }

  // This validates the name field while the user types
  nameInput.addEventListener("input", function () {
    // This checks whether the field contains any non-space characters
    if (nameInput.value.trim() !== "") { markValid(nameInput); } else { markInvalid(nameInput); }
    // This ends the name input handler
  });

  // This validates the email field while the user types
  emailInput.addEventListener("input", function () {
    // This reads the current email value and removes spaces at the ends
    var v = emailInput.value.trim();
    // This performs a very small email check using the presence of '@' and '.'
    var ok = v.indexOf("@") !== -1 && v.indexOf(".") !== -1;
    // This toggles the field's classes based on the quick check result
    if (ok) { markValid(emailInput); } else { markInvalid(emailInput); }
    // This ends the email input handler
  });

  // This validates the message field while the user types and updates the counter
  messageInput.addEventListener("input", function () {
    // This refreshes the visible character count
    updateCounter();
    // This marks the field valid if it meets the minimum length requirement
    if (messageInput.value.trim().length >= 10) { markValid(messageInput); } else { markInvalid(messageInput); }
    // This ends the message input handler
  });

  // This calls the counter once on load so users see 0/200 immediately
  updateCounter();

  // This handles the moment the user presses the Send button
  form.addEventListener("submit", function (event) {
    // This stops the browser from actually navigating away or reloading
    event.preventDefault();
    // This starts with no errors collected
    var errors = [];
    // This validates the name input and adds an error if it is empty
    if (nameInput.value.trim() === "") { errors.push("Please enter your name."); markInvalid(nameInput); }
    // This validates the email input using the tiny pattern check
    var e = emailInput.value.trim(); if (e.indexOf("@") === -1 || e.indexOf(".") === -1) { errors.push("Please enter a valid email."); markInvalid(emailInput); }
    // This validates the message input to ensure it is long enough
    if (messageInput.value.trim().length < 10) { errors.push("Your message must be at least 10 characters."); markInvalid(messageInput); }

    // This clears any previous messages so we only show fresh feedback
    messages.innerHTML = "";

    // This checks whether we found any errors during validation
    if (errors.length > 0) {
      // This builds an unordered list to display all error messages together
      var list = document.createElement("ul");
      // This loops through each error string we collected
      for (var i = 0; i < errors.length; i++) {
        // This creates a list item element for the current error
        var li = document.createElement("li");
        // This sets the visible text of the list item to the error message
        li.textContent = errors[i];
        // This appends the list item to the unordered list
        list.appendChild(li);
        // This ends one iteration of the loop
      }
      // This inserts the finished error list into the messages container
      messages.appendChild(list);
      // This stops the success branch from executing
      return;
      // This ends the error branch
    }

    // This creates a paragraph to show a success confirmation to the user
    var p = document.createElement("p");
    // This fills the paragraph with a brief confirmation that includes the user's name
    p.textContent = "Thanks " + nameInput.value.trim() + "! Your message was sent.";
    // This inserts the success paragraph into the messages container
    messages.appendChild(p);
    // This clears the form fields so the form looks fresh again
    form.reset();
    // This removes any validation classes left on the fields after the reset
    nameInput.classList.remove("valid", "invalid"); 
    emailInput.classList.remove("valid", "invalid"); 
    messageInput.classList.remove("valid", "invalid");
    // This resets the counter display after the fields are cleared
    updateCounter();
    // This ends the submit handler
  });

  // This clears feedback and classes whenever the user clicks the Clear button
  form.addEventListener("reset", function () {
    // This removes any feedback messages currently shown
    messages.innerHTML = "";
    // This removes validation classes from all fields
    nameInput.classList.remove("valid", "invalid"); 
    emailInput.classList.remove("valid", "invalid"); 
    messageInput.classList.remove("valid", "invalid");
    // This resets the character counter to match the now-empty textarea
    updateCounter();
    // This ends the reset handler
  });

  // This ends the onload handler
};
