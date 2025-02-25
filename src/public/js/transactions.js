document.addEventListener("DOMContentLoaded", () => {
    // Элементы модального окна и формы транзакций
    const transactionModal = document.getElementById("transaction-modal");
    const addTransactionBtn = document.getElementById("add-transaction-btn");
    const transactionForm = document.getElementById("transaction-form");
    const transactionsList = document.getElementById("transactions-list");
    const closeModalButtons = document.querySelectorAll(".close-modal, .cancel-modal");
  
    // Локальное хранилище транзакций
    let transactions = [];
    let editingTransactionId = null;
  
    // Функция для открытия модального окна (для добавления или редактирования транзакции)
    function openTransactionModal(transaction = null) {
      if (transaction) {
        editingTransactionId = transaction.id;
        document.getElementById("transaction-amount").value = transaction.amount;
        document.getElementById("transaction-type").value = transaction.type;
        document.getElementById("transaction-category").value = transaction.category;
        document.getElementById("transaction-description").value = transaction.description;
        document.getElementById("transaction-date").value = transaction.date;
        document.getElementById("modal-title").innerText = "Редактировать транзакцию";
      } else {
        editingTransactionId = null;
        transactionForm.reset();
        document.getElementById("modal-title").innerText = "Добавить транзакцию";
      }
      transactionModal.classList.remove("hidden");
    }
  
    // Функция для закрытия модального окна
    function closeTransactionModal() {
      transactionModal.classList.add("hidden");
      transactionForm.reset();
      editingTransactionId = null;
    }
  
    // Обработчик нажатия кнопки "Добавить транзакцию"
    addTransactionBtn.addEventListener("click", () => {
      openTransactionModal();
    });
  
    // Обработчики закрытия модального окна (крестик и кнопка "Отмена")
    closeModalButtons.forEach(btn => {
      btn.addEventListener("click", closeTransactionModal);
    });
  
    // Обработка отправки формы транзакции
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const amount = parseFloat(document.getElementById("transaction-amount").value);
      const type = document.getElementById("transaction-type").value;
      const category = document.getElementById("transaction-category").value;
      const description = document.getElementById("transaction-description").value;
      const date = document.getElementById("transaction-date").value;
  
      if (editingTransactionId) {
        // Редактирование существующей транзакции
        transactions = transactions.map(tx => {
          if (tx.id === editingTransactionId) {
            return { id: editingTransactionId, amount, type, category, description, date };
          }
          return tx;
        });
      } else {
        // Создание новой транзакции
        const newTransaction = {
          id: Date.now().toString(),
          amount,
          type,
          category,
          description,
          date
        };
        transactions.push(newTransaction);
      }
  
      updateTransactionsUI();
      closeTransactionModal();
    });
  
    // Функция для обновления списка транзакций в интерфейсе
    function updateTransactionsUI() {
      transactionsList.innerHTML = "";
      transactions.forEach(tx => {
        const transactionItem = document.createElement("div");
        transactionItem.className = "transaction-item";
        transactionItem.innerHTML = `
          <div class="transaction-info">
            <span class="transaction-category">${tx.category}</span>
            <span class="transaction-date">${tx.date}</span>
            <p class="transaction-description">${tx.description}</p>
          </div>
          <div class="transaction-amount ${tx.type}">
            ${tx.type === "expense" ? "-" : "+"}$${tx.amount.toFixed(2)}
          </div>
          <div class="transaction-actions">
            <button class="edit-transaction" data-id="${tx.id}">Редактировать</button>
            <button class="delete-transaction" data-id="${tx.id}">Удалить</button>
          </div>
        `;
        transactionsList.appendChild(transactionItem);
      });
      attachTransactionActionListeners();
      updateTotals();
    }
  
    // Функция для обновления итоговых сумм
    function updateTotals() {
      const totalIncomeElem = document.getElementById("total-income");
      const totalExpenseElem = document.getElementById("total-expense");
      const totalBalanceElem = document.getElementById("total-balance");
  
      let totalIncome = 0;
      let totalExpense = 0;
  
      transactions.forEach(tx => {
        if (tx.type === "income") {
          totalIncome += tx.amount;
        } else if (tx.type === "expense") {
          totalExpense += tx.amount;
        }
      });
  
      totalIncomeElem.innerText = "$" + totalIncome.toFixed(2);
      totalExpenseElem.innerText = "$" + totalExpense.toFixed(2);
      totalBalanceElem.innerText = "$" + (totalIncome - totalExpense).toFixed(2);
    }
  
    // Функция для прикрепления обработчиков событий к кнопкам редактирования и удаления
    function attachTransactionActionListeners() {
      document.querySelectorAll(".edit-transaction").forEach(button => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          const transaction = transactions.find(tx => tx.id === id);
          if (transaction) {
            openTransactionModal(transaction);
          }
        });
      });
  
      document.querySelectorAll(".delete-transaction").forEach(button => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          transactions = transactions.filter(tx => tx.id !== id);
          updateTransactionsUI();
        });
      });
    }
  
    // Экспорт модуля (при необходимости доступа из других файлов)
    window.transactionsModule = {
      getTransactions: () => transactions,
      addTransaction: (tx) => {
        transactions.push(tx);
        updateTransactionsUI();
      },
      updateTransactionsUI
    };
  });
  