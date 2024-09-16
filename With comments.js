function calculateReminder() {
  // Get the values from the input fields for random number and survey number
  var randomNumber = parseInt(document.getElementById("randomNumber").value);
  var surveyNumber = parseInt(document.getElementById("surveyNumber").value);

  // Validate input to make sure valid numbers are entered
  if (isNaN(randomNumber) || isNaN(surveyNumber) || randomNumber === 0 || surveyNumber === 0) {
    alert("Please enter valid numbers greater than 0.");
    return;
  }

  // Calculate the selected survey number by using the remainder of the division
  var selectedSurveyNumber = randomNumber % surveyNumber;

  // If remainder is 0, set the survey number to the divisor itself
  if (selectedSurveyNumber === 0) {
    selectedSurveyNumber = surveyNumber;
  }

  // Display the result in the HTML element with id "result"
  document.getElementById("result").innerText = "Selected survey number: " + selectedSurveyNumber;

  // Create a prompt asking whether to reject the selected survey number
  var reminderPrompt = 'Do you want to reject selected survey number? ';
  reminderPrompt += '<button type="button" onclick="enterReminder(' + selectedSurveyNumber + ')">Yes</button>';
  reminderPrompt += '<button type="button" onclick="continueWithReminder(' + selectedSurveyNumber + ')">No</button>';

  // Display the prompt in the HTML element with id "reminderPrompt"
  document.getElementById("reminderPrompt").innerHTML = reminderPrompt;
}

function enterReminder(actualReminder) {
  // Check if the input box for entering custom survey number is already created
  if (!document.getElementById("userReminder")) {
    // Create an input box for entering a custom survey number along with a submit button
    var userReminderBox = '<br><label for="userReminder"><b>Enter your survey number choice:<b></label>';
    userReminderBox += '<input type="number" id="userReminder" name="userReminder" min="1" max="' + actualReminder + '">';
    userReminderBox += '<button type="button" onclick="calculateReminderWithUserChoice(' + actualReminder + ')">Submit</button>';

    // Append the input box to the existing HTML element
    document.getElementById("reminderPrompt").innerHTML += userReminderBox;
  }
}

function continueWithReminder(reminder) {
  // Create input fields to capture the number of subdivisions and calculate the final result
  var subdivisionsInput = '<label for="subdivisions">Number of Subdivisions:</label>';
  subdivisionsInput += '<input type="number" id="subdivisions" name="subdivisions" min="1">';
  subdivisionsInput += '<button type="button" onclick="calculateFinalReminder(' + reminder + ')">Calculate selected subdivision</button>';

  // Display the input fields in the HTML element with id "subdivisionsInput"
  document.getElementById("subdivisionsInput").innerHTML = subdivisionsInput;
}

function calculateReminderWithUserChoice(maxReminder) {
  // Retrieve the original survey number value
  var surveyNumber = parseInt(document.getElementById("surveyNumber").value);

  // Get the custom survey number entered by the user
  var userReminder = parseInt(document.getElementById("userReminder").value);

  // Validate the custom survey number entered by the user
  if (isNaN(userReminder) || userReminder <= 0 || userReminder > surveyNumber) {
    alert("Please enter a valid survey number greater than 0 and not exceeding the Highest Survey Number.");
    return;
  }

  // Continue to the next step using the user's custom survey number
  continueWithReminder(userReminder);
}

function calculateFinalReminder(reminder) {
  // Get the number of subdivisions entered by the user
  var subdivisions = parseInt(document.getElementById("subdivisions").value);

  // Validate the subdivisions input
  if (isNaN(subdivisions) || subdivisions <= 0) {
    alert("Please enter a valid number of subdivisions greater than 0.");
    return;
  }

  // Calculate the selected subdivision number using the remainder
  var selectedSubdivisionNumber = reminder % subdivisions;

  // If the remainder is 0, set it to the number of subdivisions
  if (selectedSubdivisionNumber === 0) {
    selectedSubdivisionNumber = subdivisions;
  }

  // Display the final result in the HTML element with id "finalReminder"
  document.getElementById("finalReminder").innerHTML = '<b>Selected subdivision number:</b> ' + selectedSubdivisionNumber;

  // Add a refresh button to reload the page
  var clearButton = '<button type="button" onclick="clearForm()">Refresh Page</button>';
  document.getElementById("finalReminder").innerHTML += clearButton;
}

// Function to reload the page and clear the form inputs
function clearForm() {
  location.reload();
}
