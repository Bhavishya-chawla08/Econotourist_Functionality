// Mapbox Public Access Key
mapboxgl.accessToken = 'pk.eyJ1IjoiaXNod2FyaS0yMiIsImEiOiJjbGplZjBzdWkyd3BwM2pxeTk3NmFrajVuIn0.jcNyUjD4Vsza5C0nvkC7QQ';

// Initializing Map
var map = new mapboxgl.Map({
    // Map Container ID
    container: 'map',
    // Mapbox Style URL
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12.56, // Default Zoom
    center: [121.037, 14.332] // Default centered coordinate
  });
  
  // Search Places
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: true,
  });
  
  // Direction Form
  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric', // Use metric unit (adjust if needed)
  });
  
  // Adding Search Places on Map
  map.addControl(geocoder, 'top-left');
  
  // Adding navigation control on Map
  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  

// Function to calculate distance and trip cost
function calculateDistanceAndTripCost() {
  // Find the directions summary element (adjust selector if needed)
  var summaryElement = document.querySelector('.mapbox-directions-route-summary');
  if (!summaryElement) {
      console.error('Directions summary element not found.');
      return;
  }

  // Extract distance text from summary element
  var distanceText = summaryElement.textContent.match(/\d+(?:\.\d*)?\s*km/); // Regex for distance in km
  if (!distanceText) {
      console.error('Distance not found in directions summary.');
      return;
  }

  // Extract numeric distance value
  var distanceInKm = parseFloat(distanceText[0]);

  // Calculate trip cost based on extracted distance
  var costola = 10; // Assuming a cost per kilometer
  var tripCost = distanceInKm * costola;
  tripCost = tripCost.toFixed(2); // Round to 2 decimal places

  document.getElementById('trip-cost').textContent = 'Estimated Trip Cost for Ola : ' + tripCost;
}

// Event handler for directions "route" event
directions.on('route', function(event) {
  // Calculate distance and trip cost when route is displayed
  calculateDistanceAndTripCost();
});


// Event listeners for direction buttons (optional)
$(function() {
  $('#get-direction').click(function() {
    // Adding Direction form and instructions on map (assuming buttons exist)
    map.addControl(directions, 'top-left');
    directions.container.setAttribute('id', 'direction-container');
    $(geocoder.container).hide();
    $(this).hide();
    $('#end-direction').removeClass('d-none');
    $('.marker').remove();
  });

  $('#end-direction').click(function() {
    direction_reset();
    $(this).addClass('d-none');
    $('#get-direction').show();
    $(geocoder.container).show();
  });
});

// Function to reset directions
function direction_reset() {
  map.removeControl(directions);
  document.getElementById('trip-cost').textContent = '';
}               






