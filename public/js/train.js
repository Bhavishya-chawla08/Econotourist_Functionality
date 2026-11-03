document.addEventListener('DOMContentLoaded', function () {
  // ***************************** Access Token for Map ******************************************
    // mapboxgl.accessToken = '';
    mapboxgl.accessToken = '';
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0], // Default center (replace with user's location if available)
          zoom: 12 // Default zoom
        });
      
        const searchForm = document.getElementById('search-form');
        const trainDetails = document.getElementById('train-details');
      
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            map.setCenter(userLocation);
          },
          (error) => console.error('Error fetching user location:', error)
        );
      });     
        
      
       
