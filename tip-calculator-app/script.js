"use-strict";
//inputs
const bill_input = document.querySelector(".text-currency");
const customTip_input = document.querySelector(".custom-tip");
const fixedTip_btns = document.querySelectorAll("input[type=button]");
const nbrPeople_input = document.querySelector(".text-person");
const reset_btn = document.querySelector(".reset-btn");

//outputs
const tipPerPerson_output = document.querySelector(".tipPerPerson-wrapper h1");
const totalPerPerson_output = document.querySelector(
  ".totalPerPerson-wrapper h1"
);

const clearErrors = function () {
  nbrPeople_input.classList.remove("error-style");
  const errorP = nbrPeople_input.nextElementSibling;
  if (errorP && errorP.classList.contains("error-msg")) {
    errorP.remove();
  }
};

const calculateTip = function (billTotal, tipPercentage, nbrPeople) {
  return parseFloat(
    ((billTotal * (tipPercentage / 100)) / nbrPeople).toFixed(2)
  );
};

const calculateTotal = function (billTotal, tipPerPerson, nbrPeople) {
  return (billTotal / nbrPeople + tipPerPerson).toFixed(2);
};

const showResults = function (e) {
  e.preventDefault();
  clearErrors();
  if (!nbrPeople_input.value) {
    nbrPeople_input.classList.add("error-style");
    nbrPeople_input.insertAdjacentHTML(
      "afterend",
      `<p class="error-msg">Can't be zero</p>`
    );
  } else {
    const btn = e.target; // Get a reference to the button that triggered the event

    const tip = Number(btn.value.replace("%", ""));

    const billTotal = Number(bill_input.value);
    const nbrPeople = Number(nbrPeople_input.value);

    const tipPerPerson = calculateTip(billTotal, tip, nbrPeople);
    const totalPerPerson = calculateTotal(billTotal, tipPerPerson, nbrPeople);
    tipPerPerson_output.textContent = `$${tipPerPerson}`;
    totalPerPerson_output.textContent = `$${totalPerPerson}`;
  }
};

const resetTipCalculator = function (e) {
  e.preventDefault();
  tipPerPerson_output.textContent = `$0.00`;
  totalPerPerson_output.textContent = `$0.00`;
  nbrPeople_input.value = "";
  bill_input.value = "";
  customTip_input.value = "";
};

customTip_input.addEventListener("input", showResults);

fixedTip_btns.forEach((btn) => btn.addEventListener("click", showResults));

reset_btn.addEventListener("click", resetTipCalculator);
