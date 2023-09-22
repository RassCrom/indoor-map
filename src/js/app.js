const map = (window.map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
    zoom: 19,
    center: [71.428572161323359, 51.091671321981359],
    pitch: 60,
    antialias: true
}));

map.on('load', () => {
map.addSource('im', {
    'type': 'geojson',
    'data': './src/ext/indoor_polygons.geojson'
});
map.addLayer({
    'id': 'room-extrusion',
    'type': 'fill-extrusion',
    'source': 'im',
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
console.log(e)

popup.setLngLat(e.lngLat).setHTML(e.features[0].properties.name).addTo(map)

})

