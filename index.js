$("#navbar").load("/components/navbar.html");

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
    const containerDiv = $('.src-airports');
    for (var keys in data) {
      containerDiv.append(`<li>${data[keys].name}</li>`)
    }
})

function onSrcCityFocusHandler (input, event) {
  var srcAirports = document.getElementById("src-airports-container");

  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
    srcAirports.style.display = "block";
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
    srcAirports.style.display = "none";
  }
}

function onDestCityFocusHandler (input, event) {
  var destAirports = document.getElementById("dest-airports-container");

  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
    destAirports.style.display = "block";
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
    destAirports.style.display = "none";
  }

}