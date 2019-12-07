const fs = require('fs')
const utmObj = require('utm-latlng');
const data = require('./data.json');

const utm = new utmObj();

const zoneNum = 33;
const zoneLetter = 'N';

const {features} = data;

const dataCollection = {
  type: "FeatureCollection",
  features: features.map(feature => {
  return {
    type: "Feature",
    properties: feature.properties,
    geometry: {
      type: "LineString",
      coordinates:
        feature.geometry.coordinates[0].map(utmArray => {
          const {lat, lng} = utm.convertUtmToLatLng(utmArray[0], utmArray[1], zoneNum, zoneLetter);
          return [
            lng, lat
          ]
        })
    }
  }
})};




try {
  fs.writeFileSync('./output.json', JSON.stringify(dataCollection))
  console.log('DONE@@@')
} catch (err) {
  console.error(err)
}
