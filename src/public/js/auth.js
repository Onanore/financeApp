// Constants
const API_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'finance_app_token';
const USER_KEY = 'finance_app_user';

// DOM Elements
const loginRegisterContainer = document.getElementById('login-register-container');
const appContainer = document.getElementById('app-container');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const logoutBtn = document.getElementById('logout-btn');
const userName = document.getElementById('user-name');

// Event Listeners
document.addEventListener('DOMContentLoaded', checkAuth);
loginTab.addEventListener('click', showLoginForm);
registerTab.addEventListener('click', showRegisterForm);
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
logoutBtn.addEventListener('click', handleLogout);

// Check if user is authenticated
function checkAuth() {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    
    if (token && user.name) {
        userName.textContent = user.name;
        loginRegisterContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        loadTransactions();
    }
}

// Show login form
function showLoginForm() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
}

// Show register form
function showRegisterForm() {
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        // Save token and user info
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify({
            id: data._id,
            name: data.name,
            email: data.email
        }));
        
        // Update UI
        userName.textContent = data.name;
        loginRegisterContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        
        // Reset form
        loginForm.reset();
        
        // Show success alert
        showAlert('Logged in successfully', 'success');
        
        // Load transactions
        loadTransactions();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Handle register form submission
async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        // Save token and user info
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify({
            id: data._id,
            name: data.name,
            email: data.email
        }));
        
        // Update UI
        userName.textContent = data.name;
        loginRegisterContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        
        // Reset form
        registerForm.reset();
        
        // Show success alert
        showAlert('Account created successfully', 'success');
        
        // Load transactions
        loadTransactions();
    } catch (error) {
        showAlert(error.message, 'error');
    }
}

// Handle logout
function handleLogout() {
    // Clear local storage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Update UI
    loginRegisterContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
    
    // Show login form
    showLoginForm();
    
    // Show success alert
    showAlert('Logged out successfully', 'success');
}

// Helper function to show alerts
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', `alert-${type}`);
    
    alertElement.innerHTML = `
        <span>${message}</span>
        <span class="close-alert">&times;</span>
    `;
    
    alertContainer.appendChild(alertElement);
    
    // Add event listener to close button
    alertElement.querySelector('.close-alert').addEventListener('click', () => {
        alertElement.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertElement.remove();
    }, 5000);
}

// Export functions for other modules
window.auth = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    getUserId: () => {
        const user = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return user.id;
    },
    showAlert
};