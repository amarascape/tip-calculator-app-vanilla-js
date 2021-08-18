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
 * onclick method for custom input for tip percents.
 * Sets tipPercent as "custom",
 * and calls the attemptCompute() method.
 */
function readSelected(event) {
  let target = event.target;
  target.classList.add("customInputSelected");

  //remove selected styling from button
  let previousSelected = document.querySelector(".buttonInputSelected");
  console.log("attemptiong to remove styling from", previousSelected);
  if (previousSelected === null) {
    console.log("failed to remove styling from", previousSelected);
    //do nothing
  } else {
    console.log("successfully removed styling from", previousSelected);
    previousSelected.classList.remove("buttonInputSelected");
  }

  tipPercent = "custom";
  attemptCompute();
}

function readCustomTip() {
  tipPercent = "custom";
  attemptCompute();
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
    console.log("calculating...");
    let tipPerPerson = (billAmount * tipPercent) / numberOfPeople;
    console.log("tipPerPerson", tipPerPerson);
    let totalPerPerson = billAmount / numberOfPeople;

    document.querySelector(
      ".tipAmountPerPerson .output"
    ).innerText = formatter.format(tipPerPerson);

    document.querySelector(
      ".totalAmountPerPerson .output"
    ).innerText = formatter.format(totalPerPerson);
  }
}

function billAmountValid() {
  console.log("validating billAmount", billAmount);
  if (billAmount >= 0.0 && billAmount <= 10000.0) {
    console.log("validated billAmount");
    return true;
  } else {
    console.log("failed to validate billAmount");
    return false;
  }
}

function tipPercentValid() {
  console.log("validating tipPercent", tipPercent);
  if (tipPercent >= 0 && tipPercent <= 1) {
    console.log("validated tipPercent");
    return true;
  } else {
    console.log("failed to validate tipPercent");
    return false;
  }
}

function numberOfPeopleValid() {
  console.log("validating numberOfPeople", numberOfPeople);
  if (numberOfPeople >= 1 && numberOfPeople <= 100) {
    console.log("validated numberOfPeople");
    return true;
  } else {
    console.log("failed to validate numberOfPeople");
    return false;
  }
}
