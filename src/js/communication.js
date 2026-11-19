

const pages = {
dashboard: {
title: 'Dashboard',
ids: ['dashboard-stats', 'news-management', 'announcements']
},
'admissions-section': {
title: 'Admissions',
ids: ['admissions-section']
},
'academics-section': {
title: 'Academics',
ids: ['academics-section']
},
'communication-section': {
title: 'Communication',
ids: ['communication-section']
},
'staff-section': {
title: 'Staff Management',
ids: ['staff-section']
}
}

function showSection(name) {
const page = pages[name]

if (!page) return

Object.values(pages).forEach((section) => {
section.ids.forEach((id) => {
document.getElementById(id)?.classList.add('hidden')
})
})

page.ids.forEach((id) => {
document.getElementById(id)?.classList.remove('hidden')
})

const pageTitle = document.getElementById('page-title')

if (pageTitle) {
pageTitle.textContent = page.title
}

document.querySelectorAll('[data-section]').forEach((link) => {
const active = link.dataset.section === name

```
link.classList.toggle('bg-blue-900/80', active)
link.classList.toggle('text-white', active)
link.classList.toggle('hover:bg-slate-800/60', !active)

link.querySelector('i')?.classList.toggle('text-amber-400', active)
```

})
}

document.querySelectorAll('[data-section]').forEach((link) => {
link.addEventListener('click', (event) => {
event.preventDefault()
showSection(link.dataset.section)
})
})

/* ---------- Homepage content editor ---------- */

const list = (prefix, label, fields, rows) =>
rows.flatMap((row, i) =>
fields.map(([key, name, type], j) => [
`${prefix}-${i + 1}-${key}`,
`${label} ${i + 1}: ${name}`,
type,
row[j]
])
)

const sections = {
hero: ['Hero', [
['eyebrow', 'Welcome line', 'text', 'Welcome to BrightStar High School'],
['title', 'Headline', 'text', 'Shaping Bright Futures Through Quality Education'],
['text', 'Paragraph', 'area', 'A community where learners discover their potential, develop strong values, and prepare for a brighter future.'],
['button-1', 'Main button', 'text', 'Explore Admissions'],
['button-2', 'Second button', 'text', 'Discover Our School']
]],

about: ['About', [
['heading', 'Heading', 'text', 'Building Knowledge, Character and Confidence'],
['text', 'Paragraph', 'area', 'BrightStar High School is committed to providing quality education in a supportive environment where every learner can grow academically, socially and personally.'],
['box-1-title', 'Box 1: Title', 'text', 'Academic Excellence'],
['box-1-text', 'Box 1: Text', 'text', 'Helping learners achieve their potential.'],
['box-2-title', 'Box 2: Title', 'text', 'Strong Values'],
['box-2-text', 'Box 2: Text', 'text', 'Developing discipline and responsibility.']
]],

programs: ['Programs', list('program', 'Program', [
['title', 'Title', 'text'],
['text', 'Description', 'area']
], [
['Sciences & Mathematics', 'Encourage curiosity, analytical thinking, and problem-solving through scientific learning.'],
['Technology & Computing', 'Introduce learners to digital tools, technology, and creative problem-solving.'],
['Languages & Humanities', 'Develop communication, reading, research, and critical thinking skills.']
])],

stats: ['Statistics', [
['students', 'Students', 'text', '850+'],
['teachers', 'Teachers', 'text', '45+'],
['learning-areas', 'Learning areas', 'text', '12+'],
['years', 'Years of excellence', 'text', '20+']
]],

news: ['News & Announcements', list('news', 'Post', [
['category', 'Category', 'text'],
['date', 'Date', 'text'],
['title', 'Title', 'text'],
['text', 'Summary', 'area']
], [
['School Life', '10 October 2026', 'Welcome to a New School Term', 'Learn about preparations, student activities, and plans for the new term.'],
['Academics', '8 October 2026', 'Examination Preparation', 'Encourage learners to prepare well and follow their revision schedules.'],
['Events', '5 October 2026', 'Sports and Co-curricular Activities', 'Discover how sports and teamwork help students build confidence and discipline.']
])],

admissions: ['Admissions banner', [
['heading', 'Heading', 'text', "Your Child's Bright Future Starts Here"],
['text', 'Paragraph', 'area', 'Take the first step toward quality education in a supportive environment that encourages every learner to grow.'],
['button-1', 'Main button', 'text', 'Enquire Now'],
['button-2', 'Second button', 'text', 'Contact Admissions']
]],

contact: ['Contact details', [
['address', 'Address', 'text', 'Enter school address, Kenya'],
['phone', 'Phone', 'text', '+254 700 000 000'],
['email', 'Email', 'text', '[info@brightstar.example](mailto\:info@brightstar.example)'],
['hours', 'Office hours', 'text', 'Monday – Friday, 8:00 AM – 5:00 PM']
]]
}

const storageKey = 'homepage-content'
const store = JSON.parse(localStorage.getItem(storageKey) || '{}')

const select = document.getElementById('section-select')
const form = document.getElementById('content-form')
const message = document.getElementById('save-message')

const inputClass =
'w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus\:border-blue-900 focus\:ring-2 focus\:ring-blue-100'

const escape = (text) =>
String(text)
.replace(/&/g, '&')
.replace(/"/g, '"')
.replace(/\</g, '<')

function renderForm(name) {
if (!form || !message || !sections[name]) return

message.classList.add('hidden')

const fields = sections[name][1].map(([key, label, type, original]) => {
const id = `${name}-${key}`
const value = escape(store[id] ?? original)

const control = type === 'area'
  ? `<textarea id="${id}" name="${id}" rows="3" class="${inputClass}">${value}</textarea>`
  : `<input id="${id}" name="${id}" type="text" value="${value}" class="${inputClass}">`

return `<div>
  <label for="${id}" class="mb-2 block text-sm font-medium text-slate-700">${label}</label>
  ${control}
</div>`


})

const button = `     <button type="submit" class="rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-400">       Save changes     </button>   `

form.innerHTML = fields.join('') + button
}

if (select && form && message) {
select.innerHTML = Object.entries(sections)
.map(([key, [label]]) => `<option value="${key}">${label}</option>`)
.join('')

select.addEventListener('change', () => {
renderForm(select.value)
})

form.addEventListener('submit', (event) => {
event.preventDefault()

new FormData(form).forEach((value, key) => {
  store[key] = value
})

localStorage.setItem(storageKey, JSON.stringify(store))
message.classList.remove('hidden')
message.textContent = 'Changes saved successfully!'


})

renderForm(select.value)
}

if (document.getElementById('page-title')) {
showSection('dashboard')
}
