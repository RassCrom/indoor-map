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
    antialias: true
}));

map.on('load', () => {
    map.addSource('im', {
        'type': 'geojson',
        'data': './src/ext/2im.geojson'
    });
    
    map.addLayer({
        'id': 'room-extrusion',
        'type': 'fill-extrusion',
        'source': 'im',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-extrusion-color': ['get', 'color'],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'base_height'],
            'fill-extrusion-opacity': 0.5
        }
    })
})

const popup = new maplibregl.Popup({
    closeBuuton: true,
    closeOnClick: true
});

map.on('click', 'room-extrusion', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    const coordinates = e.features[0].geometry.coordinates.slice();
    console.log(e.features[0].properties)

    popup.setLngLat(e.lngLat).setHTML(`Комната: ${e.features[0].properties.name}<br>
    Площадь: ${e.features[0].properties.area_sqm}<br>
    <img class='photo-test' src='${e.features[0].properties.photo}'/>`).addTo(map)

})

