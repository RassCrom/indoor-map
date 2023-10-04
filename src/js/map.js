const map = (window.map = new maplibregl.Map({
    container: 'map',
    style:
    {
        'id': 'raster',
        'version': 8,
        'name': 'Raster tiles',
        'center': [0, 0],
        'zoom': 0,
        'sources': {
            'raster-tiles': {
                'type': 'raster',
                'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                'tileSize': 256,
                'minzoom': 0,
                'maxzoom': 19
            }
        },
        'layers': [
            {
                'id': 'background',
                'type': 'background',
                'paint': {
                    'background-color': '#e0dfdf'
                }
            },
            {
                'id': 'simple-tiles',
                'type': 'raster',
                'source': 'raster-tiles'
            }
        ]
    },
    zoom: 19,
    center: [71.428572161323359, 51.091671321981359],
    pitch: 60,
    bearing: 0,
    antialias: true
}));

const navControl = new maplibregl.NavigationControl({
    visualizePitch: true,
    showZoom: false,
    showCompass: true,
});

map.addControl(navControl, 'top-left')

map.on('load', () => {
    map.loadImage('./src/ext/door.png', function(error, image) {
        if (error) throw error;
        // Add the loaded image to the style's sprite with the ID 'kitten'.
        map.addImage('room', image);
    });
    map.addSource('im', {
        type: 'geojson',
        data: './src/ext/2im_4326.geojson',
        generateId: true
    });

    
    map.addLayer({
        id: 'room-extrusion',
        type: 'fill-extrusion',
        source: 'im',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'base_height'],
            'fill-extrusion-opacity': 1
        },
        filter: ['==', ['get', 'level'], 1]
    });

    map.addLayer({
        id: 'room-extrusion2',
        type: 'fill-extrusion',
        source: 'im',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'base_height'],
            'fill-extrusion-opacity': 1
        },
        filter: ['==', ['get', 'level'], 2]
    });
})

const popup = new maplibregl.Popup({
    closeButton: true,
    closeOnClick: false
});

map.on('click', 'room-extrusion', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    // console.log(e.features[0].properties)

    popup.setLngLat(e.lngLat).setHTML(`Комната: ${e.features[0].properties.name}<br>
    Площадь: ${e.features[0].properties.area_sqm}<br>
    <img class='photo-test' src='${e.features[0].properties.photo}'/>`).addTo(map)

})

map.on('click', 'room-extrusion2', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    popup.setLngLat(e.lngLat).setHTML(`Комната: ${e.features[0].properties.name}<br>
    Площадь: ${e.features[0].properties.area_sqm}<br>
    <img class='photo-test' src='${e.features[0].properties.photo}'/>`).addTo(map)
    

})


