let map;
let markers = [];
const austinCenter = { lat: 30.2672, lng: -97.7431 };
const properties = generateRandomProperties(austinCenter, 250, 300, 10000);

function generateRandomProperties(center, count = 50, minDistance = 200, maxDistance = 3000) {
    const properties = [];
    const earthRadius = 6378137; // meters

    for (let i = 0; i < count; i++) {
        const distance = Math.random() * (maxDistance - minDistance) + minDistance;
        const angle = Math.random() * 2 * Math.PI;

        const deltaLat = (distance * Math.cos(angle)) / earthRadius;
        const deltaLng = (distance * Math.sin(angle)) / (earthRadius * Math.cos((center.lat * Math.PI) / 180));

        const lat = center.lat + (deltaLat * 180) / Math.PI;
        const lng = center.lng + (deltaLng * 180) / Math.PI;

        properties.push({
            id: i + 1,
            lat,
            lng,
            price: `$${(2.5 + Math.random() * 1.5).toFixed(2)}M`,
            beds: Math.floor(Math.random() * 3) + 3,
            baths: Math.floor(Math.random() * 3) + 2,
            sqft: Math.floor(Math.random() * 600) + 800
        });
    }

    return properties;
}

// const properties = [
//     {
//         id: 1,
//         lat: 30.2672,
//         lng: -97.7431,
//         price: '$3,349,000',
//         beds: 4,
//         baths: 3,
//         sqft: 998
//     },
//     {
//         id: 2,
//         lat: 30.2850,
//         lng: -97.7340,
//         price: '$3,349,000',
//         beds: 4,
//         baths: 3,
//         sqft: 998
//     },
//     {
//         id: 3,
//         lat: 30.2500,
//         lng: -97.7500,
//         price: '$3,349,000',
//         beds: 4,
//         baths: 3,
//         sqft: 998
//     },
//     {
//         id: 4,
//         lat: 30.2750,
//         lng: -97.7600,
//         price: '$3,349,000',
//         beds: 4,
//         baths: 3,
//         sqft: 998
//     }
// ];

function initMap() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);

    let mapElementId = 'map-desktop';
    if (isMobile) {
        mapElementId = 'map-mobile';
    }

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
                path: `
                    M12 2
                    C8.13 2 5 5.13 5 9
                    c0 5.25 7 13 7 13
                    s7-7.75 7-13
                    c0-3.87-3.13-7-7-7
                    z

                    M9 8
                    L12 5
                    L15 8
                    V12
                    H13
                    V10
                    H11
                    V12
                    H9
                    Z
                    `,
                fillColor: "#0E5293",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
                scale: 2,
                anchor: new google.maps.Point(12, 22)
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

$('.property-carousel').each(function () {
    const startIndex = Number($(this).data('start')) || 0;

    $(this).owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        nav: false,
        autoplay: false,
        smartSpeed: 600,
        startPosition: startIndex
    });
});

// Custom arrows
$('.nav-arrow-left').click(function () {
    $(this).siblings('.property-carousel').trigger('prev.owl.carousel');
});

$('.nav-arrow-right').click(function () {
    $(this).siblings('.property-carousel').trigger('next.owl.carousel');
});