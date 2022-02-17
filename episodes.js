// // This function should retrieve the JSON from the `countryURL` and then call onCountryDataReceived() with the JSON
function getData(URL, callback) {
  fetch(URL)
    // Get the response and extract the JSON
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((data) => {
      callback(data);
      // console.log(data);
    })
    // If something goes wrong
    .catch((error) => console.log(error));
}
