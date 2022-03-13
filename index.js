let metarParser = require("metar-parser");
// const NodeGeocoder = require('node-geocoder')

// const options = {
//   provider: 'yandex',
//   language: 'english'
// };

// const geocoder = NodeGeocoder(options);


document.addEventListener("DOMContentLoaded", function () {
  // All pages
  let homePage = document.querySelector("#home-page");
  let tableViewPage = document.querySelector("#metar-table");
  let mapViewPage = document.querySelector("#map-page");
  let satellitePage = document.querySelector("#satellite-page");
  let radarPage = document.querySelector("#radar-page");
  let docsPage = document.querySelector('#docs-page');
  let lightningPage = document.querySelector('#lightning-page');

  // All page links
  let homeLink = document.querySelector("#home-link");
  let tableViewLink = document.querySelector("#table-view-link");
  let mapViewLink = document.querySelector("#map-view-link");
  let satelliteLink = document.querySelector("#satellite-link");
  let radarLink = document.querySelector("#radar-link");
  let docsLink = document.querySelector("#docs-link");
  let lightningLink = document.querySelector('#lightning-link');

  let actualData = document.querySelector("#actual-data");

  // Hide all pages except home page
  tableViewPage.style.display = "none";
  mapViewPage.style.display = "none";
  satellitePage.style.display = "none";
  radarPage.style.display = "none";
  tableViewPage.style.display = "none";
  docsPage.style.display = "none";
  lightningPage.style.display = "none";


  homeLink.addEventListener("click", function(e) {
    e.preventDefault();
    hidePagesExcept(homePage);
    makeActiveLink(homeLink);
    
  })

  // Display table-view page
  tableViewLink.addEventListener("click", function (e) {
    //tableViewPage.style.display = 'block';
    e.preventDefault();
    hidePagesExcept(tableViewPage);
    makeActiveLink(tableViewLink);
    getMetarData();
  });

  // Display map-view page
  mapViewLink.addEventListener("click", function (e) {
    e.preventDefault();
    hidePagesExcept(mapViewPage);
    makeActiveLink(mapViewLink);
    getMap();
  });

  satelliteLink.addEventListener("click", function (e) {
    e.preventDefault();
    hidePagesExcept(satellitePage);
    makeActiveLink(satelliteLink);

  });

  radarLink.addEventListener("click", function (e) {
    e.preventDefault();
    hidePagesExcept(radarPage);
    makeActiveLink(radarLink);


    let radarImageDivs = document.querySelectorAll(".radar-image-div");
    radarImageDivs.forEach((radarImageDiv) => {
      radarImageDiv.style.display = "none";
    });

    let radarButtons = document.querySelectorAll(".radar-button");
    radarButtons.forEach((radarButton) => {
      radarButton.onclick = function () {
        let station = radarButton.innerText;
        let radarImageDivs = document.querySelectorAll(".radar-image-div");
        radarImageDivs.forEach((radarImageDiv) => {
          radarImageDiv.style.display = "none";
        });
        document.getElementById(`${station}`).style.display = "block";
      };
    });

    docsLink.addEventListener("click", function(e) {
      e.preventDefault();
    hidePagesExcept(docsPage);
    makeActiveLink(docsLink);
    //docsPage.innerHTML = marked.parse('# This is heading \n ## This is heading 2 \n ### This is heading \n Let us write a quick text and sign off! Here is a list \n - Hello \n - World');
    getMarkdown(docsPage);
//     var req = new XMLHttpRequest();
// req.onload = function(){
//     process_webgl_data(this.responseText);
// };
// req.open('GET', './content/hello.md');
// req.send();
// docsPage.innerHTML = req.responseText;

      
    })

    lightningLink.addEventListener('click', function() {
      hidePagesExcept(lightningPage);
      console.log(lightningPage.innerHTML);
      makeActiveLink(lightningLink);
    })
  });

  function getMarkdown(docsPage) {
    fetch('/content/docs.md')
    .then(response => response.blob())
    .then(blob => blob.text())
    .then(markdown => {
      docsPage.innerHTML = marked.parse(markdown);
      console.log(markdown);
    })
  }

  actualData.style.display = "none";
  //   tableViewLink.onclick = function () {
  //     getMetarData();
  //   };
});

// Store Latitude and Longitude
let lat = [], long = [];
let LatLongStore = [
  {'latitude': 23.8315, 'longitude': 91.2868, 'title': 'Agartala', 'color': 'green'},
  {'latitude': 23.0225, 'longitude': 72.5714, 'title': 'Ahmedabad', 'color': 'green'},
  {'latitude': 25.4358, 'longitude': 81.8463, 'title': 'Allahabad', 'color': 'green'},
  {'latitude': 31.6340, 'longitude': 74.8723, 'title': 'Amritsar', 'color': 'green'},
  {'latitude': 12.9716, 'longitude': 77.5946, 'title': 'Bangalore', 'color': 'green'},
  {'latitude': 22.3072, 'longitude': 73.1812, 'title': 'Baroda', 'color': 'green'},
  {'latitude': 23.2599, 'longitude': 77.4126, 'title': 'Bhopal', 'color': 'green'},
  {'latitude': 20.2961, 'longitude': 85.8100, 'title': 'Bhubaneswar', 'color': 'green'},
  {'latitude': 13.0827, 'longitude': 80.2707, 'title': 'Chennai', 'color': 'green'},
  {'latitude': 11.0168, 'longitude': 76.9558, 'title': 'Coimbatore', 'color': 'green'},
  {'latitude': 6.9271, 'longitude': 79.8612, 'title': 'Colombo', 'color': 'green'},
  {'latitude': 28.7041, 'longitude': 77.1025, 'title': 'Delhi', 'color': 'green'},
  {'latitude': 30.3165, 'longitude': 78.0322, 'title': 'Dehradun', 'color': 'green'},
  {'latitude': 26.1445, 'longitude': 91.7362, 'title': 'Gauhati', 'color': 'green'},
  {'latitude': 24.7914, 'longitude': 85.0002, 'title': 'Gaya', 'color': 'green'},
  {'latitude': 15.2993, 'longitude': 74.1240, 'title': 'Goa', 'color': 'green'},
  {'latitude': 17.3850, 'longitude': 78.4867, 'title': 'Hyderabad', 'color': 'green'},
  {'latitude': 22.7196, 'longitude': 75.8577, 'title': 'Indore', 'color': 'green'},
  {'latitude': 23.1815, 'longitude': 79.9864, 'title': 'Jabalpur', 'color': 'green'},
  {'latitude': 26.9124, 'longitude': 75.7873, 'title': 'Jaipur', 'color': 'green'},
  {'latitude': 9.9312, 'longitude': 76.2673, 'title': 'Kochi', 'color': 'green'},
  {'latitude': 22.5726, 'longitude': 88.3639, 'title': 'Kolkata', 'color': 'green'},

  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},
  // {'city': 'Agartala', 'lat': 2343.34, 'long': 34},

]


function deleteTable() {
  let tableParentDiv = document.querySelector("#metar-table");
  let tableDivs = document.querySelectorAll(".metar-table-entry");
  tableDivs.forEach((tableDiv) => {
    tableParentDiv.removeChild(tableDiv);
  });
}

function hidePagesExcept(thisPage) {
  let pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.style.display = "none";
  });
  thisPage.style.display = "block";
}

function makeActiveLink(navbarLink) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.style.color = "grey";
  });
  navbarLink.style.color = "ghostwhite";
}

/* Store Metar data for each city */
let cleanData = [];

/* Add intermediate entries to cleanData */
let adder = [];

/* Decoded Metar for each city */
let decodedData = [];

async function getMetarData() {
  const response = await fetch(
    "https://young-waters-99383.herokuapp.com/https://amssdelhi.gov.in/Palam4.php",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/php",
      },
    }
  )
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#actual-data").innerHTML = data;
      let tables = document.querySelectorAll("table");
      let counter = 0;

      tables.forEach((table) => {
        for (let row of table.rows) {
          for (let cell of row.cells) {
            if (counter == 1) {
              adder.push(cell.innerText);
            }
          }
          if (counter == 1) {
            cleanData.push(adder);
            adder = [];
          }
        }
        counter++;
      });
      showData();
      //storeLatLong();
    });
}

function showData() {
  let tList = [];
  // for (let i = 1; i < cleanData.length; i++) {
  //     for (let j = 1; j < 3; j++) {
  //     tList.push(metarParser(cleanData[i][2].innerText));
  //     }
  //     decodedData.push(tList);
  //     tList = [];
  // }
  for (let i = 1; i < cleanData.length; i++) {
    let data = cleanData[i];
    for (let j = 0; j < data.length; j++) {
      if (j == 2) {
        tList.push(metarParser(data[j]));
      } else {
        tList.push(data[j]);
      }
    }
    decodedData.push(tList);
    tList = [];
  }
  //console.log(metarParser('VEAT 121300Z 00000KT 4000 HZ FEW100 28/21 Q1008 NOSIG='));
  console.log(decodedData[0][2].station);
  showTable();
}

function showTable() {
  let tableParentDiv = document.getElementById("metar-table");

  for (let row = 0; row < decodedData.length; row++) {
    let tableDiv = document.createElement("div");
    let tableDivColor = "Springgreen";
    tableDiv.className = "metar-table-entry";
    let weather = document.createElement("div");
    let airport = document.createElement("div");
    let temp = document.createElement("div");
    let vis = document.createElement("div");
    //let weather = document.createElement('div');
    //let clouds = document.createElement('div');
    console.log(decodedData[row]);
    //weather.innerText = decodedData[row][0];
    if (decodedData[row][2].weather.length > 0) {
      weather.innerText = decodedData[row][2].weather[0].obscuration;
    } else {
      weather.innerText = "No information available";
    }
    airport.innerText = decodedData[row][1];

    if (decodedData[row][2].temperature) {
      temp.innerText = decodedData[row][2].temperature.celsius;
    } else {
      temp.innerText = "No information available";
    }

    if (decodedData[row][2].visibility) {
      vis.innerText = decodedData[row][2].visibility.meters;
      if (parseInt(decodedData[row][2].visibility.meters) <= 1000) {
        tableDivColor = "rgb(240, 116, 116)";
      } else if (parseInt(decodedData[row][2].visibility.meters) <= 1500) {
        tableDivColor = "yellow";
      }
    } else {
      vis.innerText = "No information available";
    }
    //weather.innerText = decodedData[row][2];
    //clouds.innerText = decodedData[row][2].clouds;
    tableDiv.append(airport);
    tableDiv.append(temp);
    tableDiv.append(vis);
    tableDiv.append(weather);
    //tableDiv.append(sNo);
    tableParentDiv.append(tableDiv);
    console.log(tableDivColor);
    tableDiv.style.backgroundColor = tableDivColor;
    // if (tableDivColor === "crimson") {
    //   tableDiv.className = 'metar-table-entry color-red';
    // }
  }
}

function getMap() {
  let mapViewPage = document.querySelector("#map-page");
  var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.homeZoomLevel = 4;
chart.homeGeoPoint = {
  latitude: 23,
  longitude: 83
};

// Set map definition
chart.geodata = am4geodata_worldIndiaLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#66a5b2");

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#6689b2");

var imageSeries = chart.series.push(new am4maps.MapImageSeries());

var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 8;
//circle.fill = "color";


circle.nonScaling = true;
circle.tooltipText = "{title}";

setMarkersColor();
console.log(LatLongStore);

imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";
imageSeriesTemplate.propertyFields.fill = "color";

imageSeries.data = LatLongStore;

// Select India
chart.events.on("ready", function(ev) {
  polygonSeries.getPolygonById("IN").isHover = true;
});
}

function setMarkersColor() {
  for (let i = 0; i < LatLongStore.length; i++) {
    let station = LatLongStore[i].title;
    for (let j = 0; j < decodedData.length; j++) {
      if (decodedData[j][1] === station) {
        if (decodedData[j][2].visibility) {
          if (parseInt(decodedData[j][2].visibility) <= 1000) {
            LatLongStore[i].color = 'red';
          }
          else if (parseInt(decodedData[j][2].visibility) <= 1500) {
            LatLongStore[i].color = 'yellow';
          }
        }
        else {
          LatLongStore[i].color = 'blue';
        }
        break;
      }
    }
  }
}
