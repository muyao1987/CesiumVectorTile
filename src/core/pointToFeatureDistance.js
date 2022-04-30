import * as turf from "@turf/turf";

function pointToPolygonDistance(pt, polygon, options) {
  let line = turf.polygonToLine(polygon);
  if (line.type == "Feature") {
    if (line.geometry.type == "LineString") {
      return turf.pointToLineDistance(pt, line, options);
    } else {
      return pointToMultiLineDistance(pt, line, options);
    }
  } else if (line.type == "FeatureCollection") {
    let dist = Number.MAX_VALUE;
    let fcs = line;
    turf.featureEach(fcs, function (fc) {
      let geometry = fc.geometry;
      if (!geometry) {
        return;
      }
      if (geometry.type == "LineString") {
        dist = Math.min(turf.pointToLineDistance(pt, line, options), dist);
      } else {
        dist = Math.min(pointToMultiLineDistance(pt, line, options), dist);
      }
    });
    if (dist == Number.MAX_VALUE) {
      return undefined;
    }
    return dist;
  }
}

function pointToMultiPolygonDistance(pt, multiPolygon, options) {
  let coordinates = turf.getCoords(multiPolygon);
  let lineString = null;
  let dist = Number.MAX_VALUE;
  coordinates.forEach(function (polygonCoords) {
    let polygon = turf.polygon(polygonCoords);
    let timepDist = pointToPolygonDistance(pt, polygon, options);
    dist = Math.min(timepDist, dist);
  });
  coordinates = [];
  if (dist == Number.MAX_VALUE) {
    return undefined;
  }

  return dist;
}

function pointToMultiLineDistance(pt, multiLineString, options) {
  let coordinates = turf.getCoords(multiLineString);
  let lineString = null;
  let dist = Number.MAX_VALUE;
  coordinates.forEach(function (lineCoords) {
    lineString = turf.lineString(lineCoords);
    let timepDist = turf.pointToLineDistance(pt, lineString, options);
    dist = Math.min(timepDist, dist);
  });
  coordinates = [];
  if (dist == Number.MAX_VALUE) {
    return undefined;
  }

  return dist;
}

export function pointToFeatureDistance(pt, fc, options) {
  let dist = undefined;
  switch (fc.geometry.type) {
    case "Point":
      dist = turf.distance(pt, fc, options);
      break;
    case "MultiPoint":
      {
        let coordinates = turf.getCoords(fc);
        let pts = [];
        coordinates.forEach(function (coord) {
          pts.push(turf.point(coord));
        });
        pts = turf.featureCollection(pts);
        let nearest = turf.nearestPoint(pt, pts);
        pts = [];
        dist = nearest.properties.distanceToPoint;
      }
      break;
    case "LineString":
      dist = turf.pointToLineDistance(pt, fc, options);
      break;
    case "MultiLineString":
      dist = pointToMultiLineDistance(pt, fc, options);
      break;
    case "Polygon":
      dist = pointToPolygonDistance(pt, fc, options);
      break;
    case "MultiPolygon":
      dist = pointToMultiPolygonDistance(pt, fc, options);
      break;
    default:
      break;
  }
  return dist;
}
