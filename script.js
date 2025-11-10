// This waits for the page to load before attaching listeners
window.onload = function () {
  // This caches the form and inputs
  var form = document.getElementById("contactForm");
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");
  // This grabs the character counter element
  var msgCount = document.getElementById("msgCount");
  // This grabs the messages container
  var messages = document.getElementById("messages");
  // This sets the maximum message length
  var MAX = 200;

  // This marks a field valid
  function markValid(el) { el.classList.remove("invalid"); el.classList.add("valid"); }
  // This marks a field invalid
  function markInvalid(el) { el.classList.remove("valid"); el.classList.add("invalid"); }

  // This updates the character counter and trims if over the limit
  function updateCounter() {
    var len = messageInput.value.length;
    if (len > MAX) { messageInput.value = messageInput.value.substring(0, MAX); len = MAX; }
    msgCount.textContent = len + "/" + MAX;
  }

  // This validates while the user types
  nameInput.addEventListener("input", function () { if (nameInput.value.trim() !== "") { markValid(nameInput); } else { markInvalid(nameInput); } });
  emailInput.addEventListener("input", function () { var v = emailInput.value.trim(); var ok = v.indexOf("@") !== -1 && v.indexOf(".") !== -1; if (ok) { markValid(emailInput); } else { markInvalid(emailInput); } });
  messageInput.addEventListener("input", function () { updateCounter(); if (messageInput.value.trim().length >= 10) { markValid(messageInput); } else { markInvalid(messageInput); } });

  // This initializes the counter on load
  updateCounter();

  // This handles form submission with validation
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var errors = [];

    if (nameInput.value.trim() === "") { errors.push("Please enter your name."); markInvalid(nameInput); }
    var e = emailInput.value.trim(); if (e.indexOf("@") === -1 || e.indexOf(".") === -1) { errors.push("Please enter a valid email."); markInvalid(emailInput); }
    if (messageInput.value.trim().length < 10) { errors.push("Your message must be at least 10 characters."); markInvalid(messageInput); }

    messages.innerHTML = "";
    if (errors.length > 0) { var list = document.createElement("ul"); for (var i = 0; i < errors.length; i++) { var li = document.createElement("li"); li.textContent = errors[i]; list.appendChild(li); } messages.appendChild(list); return; }

    var p = document.createElement("p"); p.textContent = "Thanks " + nameInput.value.trim() + "! Your message was sent."; messages.appendChild(p);
    form.reset();
    nameInput.classList.remove("valid", "invalid"); emailInput.classList.remove("valid", "invalid"); messageInput.classList.remove("valid", "invalid");
    updateCounter();
  });
};
