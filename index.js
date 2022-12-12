$("#navbar").load("/components/navbar.html");
$("#footer").load("/components/footer.html");
$("#search-result").load("/components/advertise.html")

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
      document.getElementById("src-airports-container").style.visibility = "hidden";
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
      document.getElementById("dest-airports-container").style.visibility = "hidden";
    });
});

function onSrcCityFocusHandler(input, event) {
  var srcAirports = document.getElementById("src-airports-container");

  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
    srcAirports.style.visibility = "visible";
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
  }
}

function onDestCityFocusHandler(input, event) {
  var destAirports = document.getElementById("dest-airports-container");

  if (event.type == "focus") {
    input.setAttribute("rel", input.getAttribute("placeholder"));
    input.removeAttribute("placeholder");
    destAirports.style.visibility = "visible";
  }

  if (event.type == "blur") {
    input.setAttribute("placeholder", input.getAttribute("rel"));
    input.removeAttribute("rel");
  }
}

$(document).ready(function () {
  $(".depart-datePicker").persianDatepicker({
    autoClose: true,
    initialValue: false,
    format: "YYYY/MM/DD",
  });

  $(".return-datePicker").persianDatepicker({
    autoClose: true,
    initialValue: false,
    format: "YYYY/MM/DD",
  });
});

var srcCityInput = document.querySelector("#src-city");
srcCityInput.addEventListener("input", function () {
  const itemsContainer = $(".src-airports");
  const containerNode = document.querySelector(".src-airports");
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.firstChild);
  }
  $.getJSON("/data/airports.json", function (data) {
    if (srcCityInput.value !== "") {
      var newItems = data.filter((item) =>
        item.name.includes(srcCityInput.value)
      );
    } else {
      newItems = data;
    }
    for (var keys in newItems) {
      itemsContainer.append(
        `<li class="airport-item">${newItems[keys].name}</li>`
      );
    }
    document
      .querySelector(".src-airports")
      .addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.airport-item")) {
          srcCityInput.value = e.target.innerText;
        }
      });
  });
});

var destCityInput = document.querySelector("#dest-city");
destCityInput.addEventListener("input", function () {
  const itemsContainer = $(".dest-airports");
  const containerNode = document.querySelector(".dest-airports");
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.firstChild);
  }
  $.getJSON("/data/airports.json", function (data) {
    if (destCityInput.value !== "") {
      var newItems = data.filter((item) =>
        item.name.includes(destCityInput.value)
      );
    } else {
      newItems = data;
    }
    for (var keys in newItems) {
      itemsContainer.append(
        `<li class="airport-item">${newItems[keys].name}</li>`
      );
    }
    document
      .querySelector(".dest-airports")
      .addEventListener("click", function (e) {
        if (e.target && e.target.matches("li.airport-item")) {
          destCityInput.value = e.target.innerText;
        }
      });
  });
});

$("#search").click(function () {
  $.get('/components/thicket.html', function (thicketHtml) {
    $.getJSON("/data/thickets.json", function (data) {
      const html = $("#search-result")
      html.html("")

      for (let i = 0; i < data.length; i++) {
        const thicket = data[i];
        html.append(`<div class="thicket-${i}">${thicketHtml}</div>`)

        $(`.thicket-${i} #from-airport`).text(`از ${thicket['from']['airport']['name']} (${thicket['from']['airport']['code']})`)
        $(`.thicket-${i} #to-airport`).text(`به ${thicket['to']['airport']['name']} (${thicket['to']['airport']['code']})`)
        $(`.thicket-${i} #from-city`).text(thicket['from']['airport']['city'])
        $(`.thicket-${i} #to-city`).text(thicket['to']['airport']['city'])

        $(`.thicket-${i} #type`).text(`پرواز ${thicket['type']}`)
        $(`.thicket-${i} #duration`).text(`به مدت ${thicket['duration']} دقیقه`)
        $(`.thicket-${i} #price`).text(`${thicket['price']} تومان`)

        const standardFromDate = Date.parse(thicket['from']['date'])
        const standardToDate = Date.parse(thicket['to']['date'])

        const persianFromDate = new persianDate(standardFromDate)
        const persianToDate = new persianDate(standardToDate)

        $(`.thicket-${i} #from-date`).text(persianFromDate.format('dddd DD MMMM YYYY ساعت h:mm:ss a'));
        $(`.thicket-${i} #to-date`).text(persianToDate.format('dddd DD MMMM YYYY ساعت h:mm:ss a'));

        $(`.thicket-${i} #price-box`).click(function () {
          console.log("clicked")
          window.location.href = "/cart";
        });
      }
    })
  })
})