import customizationFile from '../vendor/yandex-map/customization.json';

async function initMap(element) {
  const COORDINATES = [37.588144, 55.733842];
  await ymaps3.ready; // eslint-disable-line

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapMarker,
    YMapDefaultFeaturesLayer
  } = ymaps3; // eslint-disable-line

  const map = new YMap(
    element,
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

export { initMap };
