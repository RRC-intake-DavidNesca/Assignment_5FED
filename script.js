// This waits for the page to fully load before attaching events
window.onload = function () {
  // This grabs a reference to the form
  var form = document.getElementById("contactForm");
  // This grabs the feedback area where we print errors or success
  var messages = document.getElementById("messages");

  // This attaches a submit handler to the form
  form.addEventListener("submit", function (event) {
    // This prevents the browser from navigating away on submit
    event.preventDefault();

    // This prepares an array to collect any errors
    var errors = [];
    // This reads the user’s name
    var name = document.getElementById("name").value.trim();
    // This reads the user’s email
    var email = document.getElementById("email").value.trim();
    // This reads the selected topic
    var topic = document.getElementById("topic").value;
    // This reads the user’s message
    var message = document.getElementById("message").value.trim();

    // This checks that a name was entered
    if (name === "") { errors.push("Please enter your name."); }
    // This performs a tiny email check for '@' and '.'
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) { errors.push("Please enter a valid email."); }
    // This requires at least 10 characters for a message
    if (message.length < 10) { errors.push("Your message must be at least 10 characters."); }

    // This clears any previous output
    messages.innerHTML = "";

    // This shows errors if any were found
    if (errors.length > 0) {
      // This builds a list to display all errors
      var list = document.createElement("ul");
      // This loops through each error message
      for (var i = 0; i < errors.length; i++) {
        // This creates a list item
        var item = document.createElement("li");
        // This sets the visible text of the item
        item.textContent = errors[i];
        // This appends the item to the list
        list.appendChild(item);
        // This ends one loop iteration
      }
      // This inserts the list into the messages area
      messages.appendChild(list);
      // This stops and waits for the user to correct errors
      return;
      // This ends the error branch
    }

    // This creates a success paragraph
    var success = document.createElement("p");
    // This writes a friendly message referencing the chosen topic
    success.textContent = "Thanks " + name + "! We received your " + topic.toLowerCase() + ".";
    // This appends the success message to the page
    messages.appendChild(success);
    // This clears the form so it looks fresh again
    form.reset();
    // This ends the submit handler
  });

  // This ends the onload handler
};
