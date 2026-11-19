const sessionKey = 'admin-logged-in'
const loginPage = './admindashboardlogin.html'

// Not signed in? Back to the login page.
if (
  !localStorage.getItem(sessionKey) &&
  !sessionStorage.getItem(sessionKey)
) {
  location.replace(loginPage)
}

// Sign out
document.querySelectorAll('[data-sign-out]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()

    localStorage.removeItem(sessionKey)
    sessionStorage.removeItem(sessionKey)

    location.href = loginPage
  })
})