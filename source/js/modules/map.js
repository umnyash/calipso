/* * * * * * * * * * * * * * * * * * * * * * * *
 * map.js
 */
async function initMap(mapElement) {
  const COORDINATES = [44.008906, 56.323592];
  const containerElement = mapElement.querySelector('.map__inner');

  containerElement.classList.remove('map__inner--hidden');
  containerElement.style.filter = 'grayscale(1)';

  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapMarker,
    YMapDefaultFeaturesLayer
  } = ymaps3;

  const map = new YMap(
    containerElement,
    {
      location: {
        center: COORDINATES,
        zoom: 15
      }
    }
  );

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  const markerElement = document
    .querySelector('#map-marker-template')
    .content
    .querySelector('.map-marker')
    .cloneNode(true);

  const marker = new YMapMarker(
    {
      coordinates: COORDINATES,
    },
    markerElement
  );

  const timerId = setInterval(() => {
    const canvasElement = mapElement.querySelector('canvas');

    if (canvasElement) {
      clearInterval(timerId);
      canvasElement.style.filter = 'grayscale(1)';
      containerElement.style.filter = '';
      map.addChild(marker);
    }
  }, 1000);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
