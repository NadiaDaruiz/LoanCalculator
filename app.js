document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // hide results 
  document.getElementById("results").style.display = "none";
  // show loader 
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000)

});

function calculateResults() {

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // monthly payment calculation
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // to hide the loader and show the results
    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "block";


  } else {
    showError("Please check your numbers")
  }
}

function showError(error) {
  // hide results and loader
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "none";

  const errorDiv = document.createElement("div");
  const heading = document.querySelector(".heading");
  const card = document.querySelector(".card");

  errorDiv.className = "alert alert-dark";
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  // clear error after 3 sec
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}