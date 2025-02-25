document.addEventListener("DOMContentLoaded", () => {
    const loginRegisterContainer = document.getElementById("login-register-container");
    const appContainer = document.getElementById("app-container");
    const logoutBtn = document.getElementById("logout-btn");
    const userNameElem = document.getElementById("user-name");
  
    // Проверка авторизации пользователя (предполагается, что auth.js управляет логином)
    function checkAuth() {
      // Например, auth.js может сохранять токен в localStorage
      const token = localStorage.getItem("authToken");
      if (token) {
        // Если пользователь авторизован – скрываем форму логина/регистрации и показываем дашборд
        loginRegisterContainer.classList.add("hidden");
        appContainer.classList.remove("hidden");
        loadDashboard();
      } else {
        // Если не авторизован – показываем формы
        loginRegisterContainer.classList.remove("hidden");
        appContainer.classList.add("hidden");
      }
    }
  
    checkAuth();
  
    // Функция загрузки данных дашборда
    function loadDashboard() {
      // Отображение имени пользователя (например, сохранённого в localStorage)
      const userName = localStorage.getItem("userName") || "Пользователь";
      userNameElem.innerText = userName;
  
      // Здесь можно добавить запрос для загрузки транзакций с сервера.
      // Пример (если имеется API):
      /*
      fetch("/api/transactions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      })
        .then(res => res.json())
        .then(data => {
          data.forEach(tx => window.transactionsModule.addTransaction(tx));
        })
        .catch(err => console.error(err));
      */
    }
  
    // Обработчик кнопки выхода из аккаунта
    logoutBtn.addEventListener("click", () => {
      // Удаляем токен и обновляем отображение интерфейса
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      loginRegisterContainer.classList.remove("hidden");
      appContainer.classList.add("hidden");
      // При необходимости можно вызвать функцию выхода из auth.js
    });
  
    // Обработка переключения вкладок "Login" и "Register" (если это не реализовано в auth.js)
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
  
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
    });
  
    registerTab.addEventListener("click", () => {
      registerTab.classList.add("active");
      loginTab.classList.remove("active");
      registerForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
    });
  });
  