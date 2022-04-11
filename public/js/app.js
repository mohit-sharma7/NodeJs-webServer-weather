console.log("client side javascript file loaded");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

// Goal: weather!

// fetch("http://localhost:3000/weather?address=boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log("Error: ", data.error);
//     } else {
//       console.log(`Forecast: ${data.forecast}`);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

// weatherForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const location = search.value;
//   //   console.log("testing!");
//   console.log(location);
// });

// Goal: use input value to get weather
//
//1. Migrate fetch call into the submit callback
//2. use the search text as the address query string value
//3. Submit the form with a valid and invalid value to the test.

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = 'Loading........... '

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          //   console.log("Error: ", data.error);
          message1.textContent = `Error: ${data.error}`;
          message2.textContent = "";
        } else {
          //   console.log(`Forecast: ${data.forecast}`);
          message1.textContent = "";
          message2.textContent = `Location: ${data.location}
          Forecast: ${data.forecast}`;
        }
      });
    }
  );
});
