/* ---------- CHANGE THESE ---------- */
const credentials = {
  usernames: ['admin', 'admin@brightstar.example'],
  password: 'admin123',
}
const dashboardPage = '/src/pages/admindashboard.html'
const sessionKey = 'admin-logged-in'
/* ---------------------------------- */

const form = document.getElementById('login-form')
const usernameInput = document.getElementById('login-username')
const passwordInput = document.getElementById('login-password')
const rememberInput = document.getElementById('remember-me')
const errorBox = document.getElementById('login-error')
const toggle = document.getElementById('password-toggle')
const toggleIcon = document.getElementById('password-toggle-icon')

// Already signed in? Go straight to the dashboard.
if (localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey)) {
  location.replace(dashboardPage)
}

function showError(text) {
  errorBox.textContent = text
  errorBox.classList.remove('hidden')
}

toggle.addEventListener('click', () => {
  const show = passwordInput.type === 'password'
  passwordInput.type = show ? 'text' : 'password'
  toggle.setAttribute('aria-pressed', String(show))
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password')
  toggleIcon.classList.toggle('fa-eye', !show)
  toggleIcon.classList.toggle('fa-eye-slash', show)
})

document.getElementById('forgot-password').addEventListener('click', () => {
  showError('Please contact the system administrator to reset your password.')
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const username = usernameInput.value.trim().toLowerCase()
  const password = passwordInput.value

  if (!username || !password) {
    showError('Enter your username and password.')
    return
  }

  if (!credentials.usernames.includes(username) || password !== credentials.password) {
    showError('Incorrect username or password. Please try again.')
    passwordInput.value = ''
    passwordInput.focus()
    return
  }

  // "Remember me" keeps the login after the browser closes; otherwise only this tab.
  const storage = rememberInput.checked ? localStorage : sessionStorage
  storage.setItem(sessionKey, 'true')
  location.href = dashboardPage
})

const year = document.querySelector('.footer-year')
if (year) year.textContent = new Date().getFullYear()