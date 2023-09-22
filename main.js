import './style.scss'

const app = document.querySelector('body')
const form = document.querySelector('form')
const input = form.querySelector('input')
const button = form.querySelector('button')
const mathNumberText = document.querySelector('.math_number')
const mathDateText = document.querySelector('.math_date')

const aside = document.querySelector('aside')

const calculatedClass = 'calculated'
const visibleClass = 'visible'

/*----------  forom  ----------*/

input.addEventListener('input', e => {
  button.setAttribute('disabled', true)
  hideResult()

  console.log(e.target.value)

  if (e.target.value.length > 0) {
    button.removeAttribute('disabled')
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const myBirthdate = formData.get('birthday')
  const { mathDay, mathDate } = calculateMathBirthDate(myBirthdate)
  showResult(mathDay, mathDate)
})

/*----------  calculations  ----------*/

function calculateMathBirthDate(birthdate) {
  let currentDate = new Date(birthdate)
  let now = new Date()

  let mathDay
  let mathDate

  for (let n = 0; n < 10; n++) {
    const mathBirthday = new Date(currentDate.getTime() + Math.pow(10, n) * 24 * 60 * 60 * 1000)

    mathDay = n
    mathDate = mathBirthday.toDateString()

    console.log(n, mathBirthday.toDateString())

    if (mathBirthday.getTime() > now.getTime()) break
  }
  return {
    mathDay,
    mathDate,
  }
}

/*----------  visual response  ----------*/
console.log(aside)
window
  .fetch('./picture.svg')
  .then(res => res.text())
  .then(svg => {
    aside.innerHTML = svg
  })

  .catch(err => {
    console.log('Error cargando svg', err)
  })

function showResult(day, date) {
  mathNumberText.textContent = day
  mathDateText.textContent = date

  for (let candle = 1; candle <= day; candle++) {
    let candleItem = document.querySelector(`#candle${candle}`)
    candleItem.classList.add(visibleClass)
  }

  app.classList.add(calculatedClass)
}

function hideResult() {
  app.classList.remove(calculatedClass)
  for (let candle = 1; candle <= 5; candle++) {
    let candleItem = document.querySelector(`#candle${candle}`)
    candleItem.classList.remove(visibleClass)
  }
}
