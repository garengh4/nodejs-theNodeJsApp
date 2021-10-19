
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading: Please Wait...'
    messageTwo.textContent = ''
    
    // fetch('http://localhost:/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((da3000ta) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.innerHTML = '<b>Location: </b>'+data.location
                messageTwo.innerHTML = '<b>Forecast: </b>'+data.forecast
            }
        })
    })
})

