import L from 'leaflet';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form") as HTMLFormElement;
    const typeSelect = document.getElementById("type") as HTMLSelectElement;
    
    let departureCoords: { lat: number; lng: number } | null = null;
    let arrivalCoords: { lat: number; lng: number } | null = null;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });

    // Listen for changes in the type of cargo
    typeSelect.addEventListener("change", updateDistance);

    // Listen for click events on the maps
    const departureMap = L.map('departure-map').setView([51.505, -0.09], 13);
    const arrivalMap = L.map('arrival-map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(departureMap);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(arrivalMap);

    const departureMarker = L.marker([51.505, -0.09]).addTo(departureMap);
    const arrivalMarker = L.marker([51.505, -0.09]).addTo(arrivalMap);

    departureMap.on('click', function(e: L.LeafletMouseEvent) {
        const coords = e.latlng;
        departureMarker.setLatLng(coords);
        departureCoords = coords;
        reverseGeocode(coords, 'departure-coordinates');
        updateDistance();
    });

    arrivalMap.on('click', function(e: L.LeafletMouseEvent) {
        const coords = e.latlng;
        arrivalMarker.setLatLng(coords);
        arrivalCoords = coords;
        reverseGeocode(coords, 'arrival-coordinates');
        updateDistance();
    });

    // Function to reverse geocode coordinates to place name
    function reverseGeocode(coords: L.LatLngLiteral, inputId: string) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                (document.getElementById(inputId) as HTMLInputElement).value = data.display_name;
            })
            .catch(error => {
                console.error('Error during reverse geocoding:', error);
            });
    }

    // Function to calculate distance between two coordinates
    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    // Function to update the distance input field
    function updateDistance() {
        if (departureCoords && arrivalCoords) {
            const baseDistance = calculateDistance(departureCoords.lat, departureCoords.lng, arrivalCoords.lat, arrivalCoords.lng);
            const transportType = (document.getElementById('type') as HTMLSelectElement).value;
            
            let adjustedDistance;
            switch (transportType) {
                case 'maritime':
                    adjustedDistance = baseDistance * 1.1; // Example adjustment for maritime
                    break;
                case 'aerien':
                    adjustedDistance = baseDistance * 0.9; // Example adjustment for aerien
                    break;
                case 'routier':
                    adjustedDistance = baseDistance * 1.2; // Example adjustment for routier
                    break;
                default:
                    adjustedDistance = baseDistance;
            }

            (document.getElementById('distance') as HTMLInputElement).value = adjustedDistance.toFixed(2);
        }
    }

    // Add search functionality
    document.getElementById('departure-search')!.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            searchLocation((event.target as HTMLInputElement).value, 'departure-map', departureMarker);
        }
    });

    document.getElementById('arrival-search')!.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            searchLocation((event.target as HTMLInputElement).value, 'arrival-map', arrivalMarker);
        }
    });

    function searchLocation(query: string, mapId: string, marker: L.Marker) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const result = data[0];
                    const coords = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
                    const map = mapId === 'departure-map' ? departureMap : arrivalMap;

                    map.setView(coords, 13);
                    marker.setLatLng(coords);

                    if (mapId === 'departure-map') {
                        departureCoords = coords;
                        (document.getElementById('departure-coordinates') as HTMLInputElement).value = result.display_name;
                    } else {
                        arrivalCoords = coords;
                        (document.getElementById('arrival-coordinates') as HTMLInputElement).value = result.display_name;
                    }

                    updateDistance();
                } else {
                    alert('Lieu non trouvé');
                }
            })
            .catch(error => {
                console.error('Error during search:', error);
            });
    }

    // Function to validate the form
    function validateForm(): boolean {
        let isValid = true;

        // Libellé
        const libelle = document.getElementById("libelle") as HTMLInputElement;
        const libelleError = document.getElementById("error-libelle") as HTMLElement;
        if (libelle.value.trim() === "") {
            libelleError.textContent = "Le libellé est requis.";
            isValid = false;
        } else {
            libelleError.textContent = "";
        }

        // Type de cargaison
        const type = document.getElementById("type") as HTMLSelectElement;
        const typeError = document.getElementById("error-type") as HTMLElement;
        if (type.value === "") {
            typeError.textContent = "Le type de cargaison est requis.";
            isValid = false;
        } else {
            typeError.textContent = "";
        }

        // Poids total
        const poids = document.getElementById("poids") as HTMLInputElement;
        const poidsError = document.getElementById("error-poids") as HTMLElement;
        if (poids.value.trim() === "" || parseFloat(poids.value) <= 0) {
            poidsError.textContent = "Le poids total doit être un nombre positif.";
            isValid = false;
        } else {
            poidsError.textContent = "";
        }

        // Distance totale
        const distance = document.getElementById("distance") as HTMLInputElement;
        const distanceError = document.getElementById("error-distance") as HTMLElement;
        if (distance.value.trim() === "" || parseFloat(distance.value) <= 0) {
            distanceError.textContent = "La distance totale doit être un nombre positif.";
            isValid = false;
        } else {
            distanceError.textContent = "";
        }

        // Date de départ
        const datedepart = document.getElementById("datedepart") as HTMLInputElement;
        const datedepartError = document.getElementById("error-datedepart") as HTMLElement;
        if (datedepart.value.trim() === "") {
            datedepartError.textContent = "La date de départ est requise.";
            isValid = false;
        } else {
            datedepartError.textContent = "";
        }

        // Date d'arrivée
        const datearrivee = document.getElementById("datearrivee") as HTMLInputElement;
        const datearriveeError = document.getElementById("error-datearrivee") as HTMLElement;
        if (datearrivee.value.trim() === "") {
            datearriveeError.textContent = "La date d'arrivée est requise.";
            isValid = false;
        } else {
            datearriveeError.textContent = "";
        }

        // Lieu de départ
        const departureCoordinates = document.getElementById("departure-coordinates") as HTMLInputElement;
        const departureError = document.getElementById("error-departure") as HTMLElement;
        if (departureCoordinates.value.trim() === "") {
            departureError.textContent = "Le lieu de départ est requis.";
            isValid = false;
        } else {
            departureError.textContent = "";
        }

        // Lieu d'arrivée
        const arrivalCoordinates = document.getElementById("arrival-coordinates") as HTMLInputElement;
        const arrivalError = document.getElementById("error-arrival") as HTMLElement;
        if (arrivalCoordinates.value.trim() === "") {
            arrivalError.textContent = "Le lieu d'arrivée est requis.";
            isValid = false;
        } else {
            arrivalError.textContent = "";
        }

        return isValid;
    }
});

