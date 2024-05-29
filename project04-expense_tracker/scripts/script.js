"use strict";

let expenses = [];
let totalAmount = 0;

const categoryInput = document.getElementById("Category-input");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expenseTableBody = document.querySelector("tbody");
const totalAmountCell = document.getElementById("total-output");

// Load expenses from localStorage when the page loads
function loadExpenses() {
  const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = savedExpenses;
  totalAmount = 0;

  expenseTableBody.innerHTML = "";

  for (const expense of savedExpenses) {
    totalAmount += expense.amount;

    const newRow = expenseTableBody.insertRow();
    newRow.innerHTML = `
      <td>${expense.category}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.date}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    const deleteBtn = newRow.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      expenses.splice(expenses.indexOf(expense), 1);
      updateLocalStorage();

      totalAmount -= expense.amount;
      totalAmountCell.textContent = `₹${totalAmount}`;

      expenseTableBody.removeChild(newRow);
    });
  }

  totalAmountCell.textContent = `₹${totalAmount}`;
}

// Save expenses to localStorage
function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add new expense
addBtn.addEventListener("click", function () {
  const category = categoryInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === "") {
    alert("please select a category");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("please select a date");
    return;
  }

  const expense = { category, amount, date };
  expenses.push(expense);
  updateLocalStorage();

  totalAmount += amount;
  totalAmountCell.textContent = `₹${totalAmount}`;

  const newRow = expenseTableBody.insertRow();
  newRow.innerHTML = `
    <td>${category}</td>
    <td>$${amount.toFixed(2)}</td>
    <td>${date}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  const deleteBtn = newRow.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    expenses.splice(expenses.indexOf(expense), 1);
    updateLocalStorage();

    totalAmount -= expense.amount;
    totalAmountCell.textContent = `₹${totalAmount}`;

    expenseTableBody.removeChild(newRow);
  });

  categoryInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
});

// Initial call to load any existing expenses
loadExpenses();
