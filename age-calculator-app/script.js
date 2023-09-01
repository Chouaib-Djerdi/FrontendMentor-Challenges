const day_input = document.querySelector('input[name="day"]');
const month_input = document.querySelector('input[name="month"]');
const year_input = document.querySelector('input[name="year"]');
const labels = document.querySelectorAll("label");

const inputArray = [day_input, month_input, year_input];

const submit_btn = document.querySelector(".submit-btn");

const days_output = document.querySelector(".days-result");
const months_output = document.querySelector(".months-result");
const years_output = document.querySelector(".years-result");

let stat = true;
const now = new Date();
const todayYear = now.getFullYear();
const todayMonth = now.getMonth() + 1;
const todayDay = now.getDate();

function clearErrors() {
  inputArray.forEach((input) => {
    input.classList.remove("error-style");
    const errorP = input.nextElementSibling;
    if (errorP && errorP.classList.contains("error-msg")) {
      errorP.remove();
    }
  });
}

function validateInput(input, minValue, maxValue, errorMessage) {
  const inputValue = Number(input.value);
  if (inputValue < minValue || inputValue > maxValue) {
    stat = false;
    labels.forEach((label) => {
      label.style.color = "var(--light-red)";
    });
    inputArray.forEach((input) => {
      input.classList.add("error-style");
    });
    input.insertAdjacentHTML(
      "afterend",
      `<p class="error-msg">${errorMessage}</p>`
    );
  }
}

function validateWholeBirthDate(dayIn, monthIn, yearIn) {
  if (!dayIn.value || !monthIn.value || !yearIn.value) {
    stat = false;
    inputArray.forEach((input) => {
      input.classList.add("error-style");
      input.insertAdjacentHTML(
        "afterend",
        `<p class="error-msg">This field is required</p>`
      );
    });
    return;
  }
  validateInput(dayIn, 1, 31, "Must be a valid day");
  validateInput(monthIn, 1, 12, "Must be a valid month");
  validateInput(yearIn, 0, todayYear, "Must be in the past");
}

submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  //   debugger;
  clearErrors();

  const dayValue = Number(day_input.value);
  const monthValue = Number(month_input.value);
  const yearValue = Number(year_input.value);

  validateWholeBirthDate(day_input, month_input, year_input);
  console.log(stat);
  if (stat) {
    days_output.textContent = Math.abs(dayValue - todayDay);
    months_output.textContent = Math.abs(monthValue - todayMonth);
    years_output.textContent = Math.abs(yearValue - todayYear);
  }
});
