const sessionKey = 'admin-logged-in'
const loginPage = '/src/pages/staffloginpage.html'

// Not signed in? Back to the login page.
if (!localStorage.getItem(sessionKey) && !sessionStorage.getItem(sessionKey)) {
  location.replace(loginPage)
}

// Any link marked data-sign-out clears the login and returns to the login page.
document.querySelectorAll('[data-sign-out]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    localStorage.removeItem(sessionKey)
    sessionStorage.removeItem(sessionKey)
    location.href = loginPage
  })
})