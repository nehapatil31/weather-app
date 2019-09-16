
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')
navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function (registration) {
    console.log('Excellent, registered with scope: ', registration.scope);
});

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value;
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        })
    })
})