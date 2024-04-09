const formContainer = document.getElementById('formContainer');
const progressBar = document.getElementById('progressBar');
const screens = document.querySelectorAll('.form-screen');
let currentScreen = 0;
let progress = 1; // Starting progress at 1%

// Display initial screen
screens[currentScreen].style.display = 'block';
updateProgressBar();

// Function to update progress bar
function updateProgressBar() {
  progressBar.style.width = `${progress}%`;
}

// Function to move to next screen
function nextScreen() {
  if (currentScreen < screens.length - 1) {
    screens[currentScreen].style.display = 'none';
    currentScreen++;
    screens[currentScreen].style.display = 'block';
    if (currentScreen === screens.length - 1) {
      // Set progress to 100% when transitioning to the last screen
      progress = 100;
      updateProgressBar();
    }
  }
}

// Function to move to previous screen
function previousScreen() {
  if (currentScreen > 0) {
    screens[currentScreen].style.display = 'none';
    currentScreen--;
    screens[currentScreen].style.display = 'block';
    // Decrease progress by 33.33% when going back to previous screen
    progress -= 33.33;
    updateProgressBar();
  }
}

// Event listener for input completion and text validation
document.querySelectorAll('.form-screen input[type="text"]').forEach(input => {
  input.addEventListener('input', () => {
    // Check if it's the last input in the current screen
    const inputsInCurrentScreen = Array.from(screens[currentScreen].querySelectorAll('input[type="text"]'));
    const lastInputIndex = inputsInCurrentScreen.length - 1;
    const currentInputIndex = inputsInCurrentScreen.indexOf(input);
    if (currentInputIndex === lastInputIndex) {
      // Check if all inputs in the current screen are valid
      let allInputsValid = true;
      inputsInCurrentScreen.forEach(input => {
        if (input.value.trim().length < 3 || !/^[a-zA-Z\s]+$/.test(input.value.trim())) {
          allInputsValid = false;
        }
      });
      if (allInputsValid) {
        // Increase progress by 33.33% for each input filled (since there are 3 screens)
        progress += 33.33;
        updateProgressBar();
        nextScreen();
      }
    }
  });
});

// Event listener for select boxes
document.querySelectorAll('.form-screen select').forEach(select => {
  select.addEventListener('change', () => {
    // Check if it's the last select box in the current screen
    const selectsInCurrentScreen = screens[currentScreen].querySelectorAll('select');
    const lastSelectIndex = selectsInCurrentScreen.length - 1;
    const currentSelectIndex = Array.from(selectsInCurrentScreen).indexOf(select);
    if (currentSelectIndex === lastSelectIndex) {
      // Check if any option other than the default one is selected
      if (select.value !== '') {
        progress += 33.33; // Increase progress by 33.33% for each select box selected (since there are 3 screens)
        updateProgressBar();
        nextScreen();
      }
    }
  });
});

// Event listener for radio buttons
document.querySelectorAll('.form-screen input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    // Check if it's the last radio button in the current screen
    const radiosInCurrentScreen = screens[currentScreen].querySelectorAll('input[type="radio"]');
    const lastRadioIndex = radiosInCurrentScreen.length - 1;
    const currentRadioIndex = Array.from(radiosInCurrentScreen).indexOf(radio);
    if (currentRadioIndex === lastRadioIndex) {
      // Check if any radio button is selected
      if (document.querySelector('.form-screen input[type="radio"]:checked')) {
        progress += 33.33; // Increase progress by 33.33% for each radio button selected (since there are 3 screens)
        updateProgressBar();
        nextScreen();
      }
    }
  });
});

// Event listener for previous button
document.querySelectorAll('.form-screen .previous-btn').forEach(button => {
  button.addEventListener('click', () => {
    previousScreen();
  });
});
