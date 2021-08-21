let billAmount = 9999999999;
let tipPercent = 9999999999;
let numberOfPeople = 9999999999;

// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

/**
 * Accepts the a number, removes any instance of the % character,
 * and returns the number as a decimal
 */
function getSelectedTipPercentAsDecimal(tipAsString) {
  let tipPercentAsNumber = tipAsString.replace("%", "");
  let tipPercentAsDecimal = tipPercentAsNumber / 100;
  return tipPercentAsDecimal;
}

/**
 * onclick method for button inputs for tip percents.
 * Removes the class "buttonInputSelected" from the previous selected button,
 * adds the class to the new selected button,
 * sets tipPercent as the value of the selected button,
 * and calls the attemptCompute() method.
 */
function toggleSelected(event) {
  let previousSelected;

  //if previous selection was custom
  previousSelected = document.querySelector(".customInput");
  if (previousSelected === null) {
    //do nothing
  } else if (previousSelected.classList.contains("customInputSelected")) {
    previousSelected.classList.remove("customInputSelected");
  }

  //if previous selection was a button
  previousSelected = document.querySelector(".buttonInputSelected");
  if (previousSelected === null) {
    //do nothing
  } else {
    previousSelected.classList.remove("buttonInputSelected");
  }

  let target = event.target;
  target.classList.add("buttonInputSelected");

  tipPercent = getSelectedTipPercentAsDecimal(target.value);
  attemptCompute();
}

/**
 * onclick and oninput method for custom input for tip percents.
 * Adds class "customInputSelected" for styling,
 * removes styling from previously selected button,
 * sets tipPercent as "custom",
 * and calls the attemptCompute() method.
 */
function readSelected(event) {
  let target = event.target;

  if (target.value === "") {
    //do nothing
  } else {
    target.classList.add("customInputSelected");

    //remove selected styling from button
    let previousSelected = document.querySelector(".buttonInputSelected");
    if (previousSelected === null) {
      //do nothing
    } else {
      previousSelected.classList.remove("buttonInputSelected");
    }

    tipPercent = "custom";
    attemptCompute();
  }
}

/**
 * Reads the current value from the bill and numberOfPeople inputs,
 * if applicable, reads the current value from the custom tip percent input,
 * validates that all inputs are in the valid range,
 * then runs the calculations.
 */
function attemptCompute() {
  billAmount = document.querySelector(".bill input").value;
  numberOfPeople = document.querySelector(".numberOfPeople input").value;

  if (tipPercent === "custom") {
    let customTipPercent = getSelectedTipPercentAsDecimal(
      document.querySelector(".customInput").value
    );
    tipPercent = customTipPercent;
  }

  if (billAmountValid() && tipPercentValid() && numberOfPeopleValid()) {
    let tipPerPerson = (billAmount * tipPercent) / numberOfPeople;
    let totalPerPerson = billAmount / numberOfPeople + tipPerPerson;

    document.querySelector(
      ".tipAmountPerPerson .output"
    ).innerText = formatter.format(tipPerPerson);

    document.querySelector(
      ".totalAmountPerPerson .output"
    ).innerText = formatter.format(totalPerPerson);
  }
}

function billAmountValid() {
  if (billAmount >= 0.0 && billAmount <= 10000.0) {
    return true;
  } else {
    return false;
  }
}

function tipPercentValid() {
  if (tipPercent >= 0 && tipPercent <= 1) {
    return true;
  } else {
    return false;
  }
}

function numberOfPeopleValid() {
  if (numberOfPeople >= 1 && numberOfPeople <= 100) {
    return true;
  } else {
    return false;
  }
}

/**
 * Resets the form on the page,
 * removes any selection styling from tip percent inputs
 * and sets both calculation outputs back to ???.???
 */
function fullReset() {
  let form = document.querySelector("form");
  form.reset();

  //remove selected styling from button
  let previousSelected = document.querySelector(".buttonInputSelected");
  if (previousSelected === null) {
    //do nothing
  } else {
    previousSelected.classList.remove("buttonInputSelected");
  }

  //if previous selection was custom
  previousSelected = document.querySelector(".customInput");
  if (previousSelected === null) {
    //do nothing
  } else if (previousSelected.classList.contains("customInputSelected")) {
    previousSelected.classList.remove("customInputSelected");
  }

  tipPercent = 9999999999;

  document.querySelector(".tipAmountPerPerson .output").innerText = "???.???";

  document.querySelector(".totalAmountPerPerson .output").innerText = "???.???";
}
