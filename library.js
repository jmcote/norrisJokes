/**
 * Uses AJAX to query an internet data source for zip codes
 * @param {string} zipId The element id that has the zip code
 */
function pullChar(charId) {
    // First get the zip code from the HTML textbox
    var charName = document.getElementById(charId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if (this.status === 200) {
                // The request was successful!
                console.log("successful request!");
                displayCharData(this.responseText);
            } else if (this.status === 404) {
                console.log("Data not found");
                displayPlace('{ "name" : "404" }');
            } else {
                console.log("We have a problem...server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "https://api.chucknorris.io/jokes/random?category=" + charName;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayCharData(data) {
    var charData = JSON.parse(data);
    if (charData.name === "404" || charData.name == "Error") {
        document.getElementById("name").className = "alert alert-warning";
        document.getElementById("name").innerHTML = "No character matches that full name."
    } else {
        document.getElementById("name").className = "alert alert-success";
        document.getElementById("name").innerHTML = charData.value;
    }
}
