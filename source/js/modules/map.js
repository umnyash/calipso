/* * * * * * * * * * * * * * * * * * * * * * * *
 * map.js
 */
async function initMap(mapElement) {
  const COORDINATES = [44.008906, 56.323592];
  const containerElement = mapElement.querySelector('.map__inner');

  setTimeout(() => {
    containerElement.classList.remove('map__inner--hidden');
  }, 8000);

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

  map.addChild(new YMapDefaultSchemeLayer({
    customization: customizationFile,
  }));

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

  map.addChild(marker);
}
/* * * * * * * * * * * * * * * * * * * * * * * */
