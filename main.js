const form = document.querySelector('form')
const dateInput = form.querySelector('input')
const mathNumberText = document.querySelector('.math_number')
const mathDateText = document.querySelector('.math_date')

form.addEventListener('submit', e => {
  e.preventDefault()
  const formData = new FormData(e.target)

  const myBirthdate = formData.get('birthday')
  calculateMathBirthDate(myBirthdate)
})

function calculateMathBirthDate(birthdate) {
  let currentDate = new Date(birthdate)
  let now = new Date()

  let elapsetMs = now - currentDate

  let mathDay
  let mathDate

  for (let n = 0; n < 10; n++) {
    const mathBirthday = new Date(currentDate.getTime() + Math.pow(10, n) * 24 * 60 * 60 * 1000)
    console.log(mathBirthday.toDateString())

    mathDay = n
    mathDate = mathBirthday.toDateString()

    if (mathBirthday.getTime() > now.getTime()) {
      console.log(n, mathBirthday.toDateString())
      break
    }
  }
  mathNumberText.textContent = mathDay
  mathDateText.textContent = mathDate
}
