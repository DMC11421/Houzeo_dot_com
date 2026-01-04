let map;
let markers = [];

const properties = [
    {
        id: 1,
        lat: 30.2672,
        lng: -97.7431,
        price: '$3,349,000',
        beds: 4,
        baths: 3,
        sqft: 998
    },
    {
        id: 2,
        lat: 30.2850,
        lng: -97.7340,
        price: '$3,349,000',
        beds: 4,
        baths: 3,
        sqft: 998
    },
    {
        id: 3,
        lat: 30.2500,
        lng: -97.7500,
        price: '$3,349,000',
        beds: 4,
        baths: 3,
        sqft: 998
    },
    {
        id: 4,
        lat: 30.2750,
        lng: -97.7600,
        price: '$3,349,000',
        beds: 4,
        baths: 3,
        sqft: 998
    }
];

function initMap() {

    const austinCenter = { lat: 30.2672, lng: -97.7431 };

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);

    let mapElementId = 'map-desktop';
    if (isMobile) {
        mapElementId = 'map-mobile';
    }
    console.log(mapElementId)
    map = new google.maps.Map(document.getElementById(mapElementId), {
        zoom: 12,
        center: austinCenter,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    properties.forEach((property) => {
        const marker = new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map: map,
            title: property.price,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#0E5293',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="font-family: 'Poppins', sans-serif; padding: 8px;">
                    <div style="font-weight: 600; font-size: 16px; color: #333; margin-bottom: 4px;">
                        ${property.price}
                    </div>
                    <div style="font-size: 13px; color: #666;">
                        ${property.beds} Beds • ${property.baths} Baths • ${property.sqft} sqft
                    </div>
                </div>
            `
        });

        marker.addListener('click', () => {
            closeAllInfoWindows();
            infoWindow.open(map, marker);
        });

        marker.infoWindow = infoWindow;
        markers.push(marker);
    });
}

function closeAllInfoWindows() {
    markers.forEach(marker => {
        if (marker.infoWindow) {
            marker.infoWindow.close();
        }
    });
}

window.initMap = initMap;
