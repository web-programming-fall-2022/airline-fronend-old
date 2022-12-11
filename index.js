$("#navbar").load("/components/navbar.html");

var selectedAirportName = "";
var srcCity = document.getElementById("src-city");
var destCity = document.getElementById("dest-city");

function removePlaceHolder(input, event) {
  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
  }
}

$.getJSON("/data/airports.json", function (data) {
  const containerDiv = $(".src-airports");
  for (var keys in data) {
    containerDiv.append(`<li class="airport-item">${data[keys].name}</li>`);
  }

  document
    .querySelector(".src-airports")
    .addEventListener("click", function (e) {
      if (e.target && e.target.matches("li.airport-item")) {
        selectedAirportName = e.target.innerText;
        srcCity.setAttribute("value", selectedAirportName);
      }
    });
});

$.getJSON("/data/airports.json", function (data) {
  const containerDiv = $(".dest-airports");
  for (var keys in data) {
    containerDiv.append(`<li class="airport-item">${data[keys].name}</li>`);
  }

  document
    .querySelector(".dest-airports")
    .addEventListener("click", function (e) {
      if (e.target && e.target.matches("li.airport-item")) {
        selectedAirportName = e.target.innerText;
        destCity.setAttribute("value", selectedAirportName);
      }
    });
});

function onSrcCityFocusHandler(input, event) {
  var srcAirports = document.getElementById("src-airports-container");

  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
    srcAirports.style.opacity = "1";
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
    srcAirports.style.opacity = "0";
  }
}

function onDestCityFocusHandler(input, event) {
  var destAirports = document.getElementById("dest-airports-container");

  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
    destAirports.style.opacity = "1";
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
    destAirports.style.opacity = "0";
  }
}

$(document).ready(function() {
  $(".example1").persianDatePicker();
});