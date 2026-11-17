import './style.css'

const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')
const menuIcon = document.getElementById('menu-icon')

function setMenu(open) {
  mobileMenu.classList.toggle('hidden', !open)
  menuToggle.setAttribute('aria-expanded', String(open))
  menuIcon.textContent = open ? '✕' : '☰'
}

if (menuToggle && mobileMenu && menuIcon) {
  menuToggle.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')))
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)))
}

document.querySelectorAll('.footer-year').forEach((el) => {
  el.textContent = new Date().getFullYear()
})