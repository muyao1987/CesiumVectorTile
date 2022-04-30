import * as Cesium from "mars3d-cesium";
import { VectorTileImageryProvider } from "../VectorTileImageryProvider";

//根据zIndex属性调整图层顺序
Cesium.ImageryLayerCollection.prototype.orderByZIndex = function () {
  //调整带有index的图层顺序
  let layersHasIndex = [];
  for (let i = 0; i < this.length; i++) {
    let l = this.get(i);
    if (l.imageryProvider.zIndex || l.zIndex) {
      layersHasIndex.push(l);
      if (!l.zIndex) {
        l.zIndex = l.imageryProvider.zIndex;
      } else if (!l.imageryProvider.zIndex) {
        l.imageryProvider.zIndex = l.zIndex;
      }
    }
  }
  if (layersHasIndex && layersHasIndex.length) {
    layersHasIndex.sort(function (a, b) {
      if (a.zIndex > b.zIndex) {
        return 1;
      } else if (a.zIndex < b.zIndex) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  let that = this;
  layersHasIndex.forEach(function (l) {
    that.raiseToTop(l);
  });

  for (let i = 0; i < this.length; i++) {
    let l = this.get(i);
    //调整矢量图层顺序
    if (!Cesium.defined(l.imageryProvider.zIndex) && !Cesium.defined(l.zIndex) && l.imageryProvider instanceof VectorTileImageryProvider) {
      this.raiseToTop(l);
    }
  }

  for (let i = 0; i < this.length; i++) {
    let l = this.get(i);
    //调整矢量图层顺序
    if (
      !Cesium.defined(l.imageryProvider.zIndex) &&
      !Cesium.defined(l.zIndex) &&
      l.imageryProvider instanceof VectorTileImageryProvider &&
      (l.imageryProvider._lineOnly || l.imageryProvider._onlyPoint)
    ) {
      this.raiseToTop(l);
    }
  }
};
