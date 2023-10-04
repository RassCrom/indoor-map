const showStage = document.getElementById('show-stage');
const listStages = document.querySelector('.list-stages');
const firstStage = document.getElementById('first-stage')
    secondStage = document.getElementById('second-stage')
    allStage = document.getElementById('all-stage')
    toggleD = document.getElementById('toggleD');

function showStageList() {
    const checkClass = listStages.classList;
    Object.values(checkClass).includes('not-active') 
    ? checkClass.remove('not-active') : checkClass.add('not-active');
};

showStage.addEventListener('click', showStageList);

function changeStageVis(polygonId, pointId) {
    let visibility = map.getLayoutProperty(polygonId, 'visibility');

    if (visibility === 'visible' ) {
        map.setLayoutProperty(polygonId, 'visibility', 'none');
        // map.setLayoutProperty(pointId, 'visibility', 'none');
    } else {
        map.setLayoutProperty(polygonId, 'visibility', 'visible');
        // map.setLayoutProperty(pointId, 'visibility', 'visible');
    }
}

firstStage.addEventListener('click', () => changeStageVis('room-extrusion', 'point_lvl1'));
secondStage.addEventListener('click', () => changeStageVis('room-extrusion2', 'point_lvl2'));

allStage.addEventListener('click', () => {
    changeStageVis('room-extrusion', 'point_lvl1');
    changeStageVis('room-extrusion2', 'point_lvl2');
});

toggleD.addEventListener('click', changeDimension);

function changeDimension() {
    if (toggleD.innerHTML === '2D') {
        toggleD.innerHTML = '3D';
        map.setMaxPitch(0);
        map.setBearing(0)
    } else {
        toggleD.innerHTML = '2D';
        map.setMaxPitch(60);
        map.setPitch(60);
    }
    changeLayerType();
}

function changeLayerType() {
    const layerType = map.getLayer('room-extrusion').type;
    if (layerType === 'fill-extrusion') {

        map.removeLayer('room-extrusion');
        map.removeLayer('room-extrusion2');

        map.addLayer({
            id: 'room-extrusion',
            type: 'fill',
            source: 'im',
            paint: {
                'fill-color': ['get', 'color'],
            },
            filter: ['==', ['get', 'level'], 1],
        });

        map.addLayer({
            id: 'room-extrusion2',
            type: 'fill',
            source: 'im',
            paint: {
                'fill-color': ['get', 'color'],
            },
            filter: ['==', ['get', 'level'], 2],
        }); 
       
        map.addLayer({
            id: 'point_lvl1',
            type: 'symbol',
            source: 'im',
            layout: {
                visibility: 'visible',
                'icon-image': 'room',
                'icon-size': 0.06, // Adjust the size as needed
            },
            'filter': ['==', ['get', 'level'], 11]
        });

        map.addLayer({
            id: 'point_lvl2',
            type: 'circle',
            source: 'im',
            layout: {
                visibility: 'visible',
            },
            'paint': {
                'circle-radius': 6,
                'circle-color': '#B42222',
                },
            'filter': ['==', ['get', 'level'], 12]
        });
    } else {
        map.removeLayer('room-extrusion');
        map.removeLayer('room-extrusion2');
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

    };
 
};