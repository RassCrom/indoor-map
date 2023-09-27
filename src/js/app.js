const showStage = document.getElementById('show-stage');
const listStages = document.querySelector('.list-stages');
const firstStage = document.getElementById('first-stage');

function showStageList() {
    const checkClass = listStages.classList;
    Object.values(checkClass).includes('not-active') 
    ? checkClass.remove('not-active') : checkClass.add('not-active');
};

showStage.addEventListener('click', showStageList);

firstStage.addEventListener('click', () => {
    let visibility = map.getLayoutProperty('room-extrusion', 'visibility');
    visibility === 'visible' 
        ? map.setLayoutProperty('room-extrusion', 'visibility', 'none') 
        : map.setLayoutProperty('room-extrusion', 'visibility', 'visible');
})