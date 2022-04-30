export function LonLatProjection(width, height) {
  let imageSize = { width: width, height: height };
  function getBoundingRect(regions) {
    let LIMIT = Number.MAX_VALUE;
    let min, max;
    let boundingRect = { xMin: LIMIT, yMin: LIMIT, xMax: -LIMIT, yMax: -LIMIT };

    for (let i = 0, L = regions.length; i < L; i++) {
      let rect = regions[i].getBoundingRect();

      min = { x: rect.xMin, y: rect.yMin };
      max = { x: rect.xMax, y: rect.yMax };

      boundingRect.xMin = boundingRect.xMin < min.x ? boundingRect.xMin : min.x;
      boundingRect.yMin = boundingRect.yMin < min.y ? boundingRect.yMin : min.y;
      boundingRect.xMax = boundingRect.xMax > max.x ? boundingRect.xMax : max.x;
      boundingRect.yMax = boundingRect.yMax > max.y ? boundingRect.yMax : max.y;
    }

    return boundingRect;
  }

  function project(coordinate, boundingRect) {
    let width = boundingRect.xMax - boundingRect.xMin;
    let height = boundingRect.yMin - boundingRect.yMax;
    let distanceX = Math.abs(coordinate[0] - boundingRect.xMin);
    let distanceY = coordinate[1] - boundingRect.yMax;

    let percentX = distanceX / width;
    let percentY = distanceY / height;

    let px = percentX * imageSize.width,
      py = percentY * imageSize.height;
    return { x: px, y: py };
  }

  function unproject(pt, boundingRect) {
    let width = boundingRect.xMax - boundingRect.xMin;
    let height = boundingRect.yMin - boundingRect.yMax;
    let lon = (pt.x / imageSize.width) * width,
      lat = (pt.y / imageSize.height) * height;
    return [lon, lat];
  }

  this.project = project;
  this.unproject = unproject;
  this.getBoundingRect = getBoundingRect;
}
