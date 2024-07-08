document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expenses-form");
  const amountInput = document.getElementById("amount");
  const categoryInput = document.getElementById("category");
  const descriptionInput = document.getElementById("description");
  const expenseTable = document
    .getElementById("expense-table")
    .getElementsByTagName("tbody")[0];

  const totalExpensesDisplay = document.getElementById("total-expenses");
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function updateLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function updateTotalExpenses() {
    const total = expenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
    totalExpensesDisplay.textContent = total.toFixed(2);
  }

  function addExpenseToTable(expense, index) {
    const row = expenseTable.insertRow();

    row.insertCell(0).textContent = expense.amount;
    row.insertCell(1).textContent = expense.category;
    row.insertCell(2).textContent = expense.description;

    const actionsCell = row.insertCell(3);
    actionsCell.classList.add("actions");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editExpense(index));
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteExpense(index));
    actionsCell.appendChild(deleteButton);
  }

  function renderExpenses() {
    expenseTable.innerHTML = "";
    expenses.forEach((expense, index) => addExpenseToTable(expense, index));
    updateTotalExpenses();
  }

  function addExpense(event) {
    event.preventDefault();

    const expense = {
      amount: amountInput.value,
      category: categoryInput.value,
      description: descriptionInput.value,
    };

    expenses.push(expense);
    updateLocalStorage();
    renderExpenses();

    form.reset();
  }

  function editExpense(index) {
    const expense = expenses[index];

    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    descriptionInput.value = expense.description;

    expenses.splice(index, 1);
    updateLocalStorage();
    renderExpenses();
  }

  function deleteExpense(index) {
    expenses.splice(index, 1);
    updateLocalStorage();
    renderExpenses();
  }

  form.addEventListener("submit", addExpense);

  renderExpenses();
});
