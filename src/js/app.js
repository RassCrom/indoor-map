const showStage = document.getElementById('show-stage');
const listStages = document.querySelector('.list-stages');
const firstStage = document.getElementById('first-stage')
    secondStage = document.getElementById('second-stage')
    allStage = document.getElementById('aal-stage');

function showStageList() {
    const checkClass = listStages.classList;
    Object.values(checkClass).includes('not-active') 
    ? checkClass.remove('not-active') : checkClass.add('not-active');
};

showStage.addEventListener('click', showStageList);

firstStage.addEventListener('click', () => {
    let visibility = map.getLayoutProperty('room-extrusion', 'visibility');
    // const features = map.queryRenderedFeatures({ layers: ['room-extrusion'] });
    // console.log(features)
    // features.forEach(element => {
    //     element.properties.level === 2 
    //         ? map.setLayoutProperty(element.id, 'visibility', 'none') 
    //         : map.setLayoutProperty(element.id, 'visibility', 'visible') 
    //     console.log(element.layer)
    // });
    visibility === 'visible' 
        ? map.setLayoutProperty('room-extrusion', 'visibility', 'none') 
        : map.setLayoutProperty('room-extrusion', 'visibility', 'visible');
})

secondStage.addEventListener('click', () => {
    let visibility = map.getLayoutProperty('room-extrusion2', 'visibility');

    visibility === 'visible' 
        ? map.setLayoutProperty('room-extrusion2', 'visibility', 'none') 
        : map.setLayoutProperty('room-extrusion2', 'visibility', 'visible');
})
