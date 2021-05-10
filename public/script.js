const submitForm = document.querySelector('form');
const inputData = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

submitForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = inputData.value;
  messageOne.textContent = `Please wait while I search for ${location}`;
  messageTwo.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.place;
      messageTwo.textContent = data.weather;
    });
  });
});
