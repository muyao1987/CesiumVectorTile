import * as Cesium from "mars3d-cesium";
import shp from "shpjs/lib/index.js";
import * as Path from "./Path";
import { readAsArrayBuffer } from "./readAsArrayBuffer";
import { readAsText } from "./readAsText";

export function groupFiles(files) {
  let group = {};
  for (let i = 0; i < files.length; i++) {
    let name = Path.ChangeExtension(files[i].name, "");
    if (!group[name]) {
      group[name] = [];
    }
    group[name].push(files[i]);
  }
  return group;
}

export function loadShp(base, whiteList) {
  return shp(base, whiteList);
}

export function parseShpFiles(files, encoding) {
  if (!files || files.length > 0) {
    let df = Cesium.defer();
    let promise = df.promise;
    let shpFile, dbfFile, prjFile;

    for (let i = 0; i < files.length; i++) {
      if (files[i].name.toLocaleLowerCase().indexOf(".shp") > 0) {
        shpFile = files[i];
      }
      if (files[i].name.toLocaleLowerCase().indexOf(".prj") > 0) {
        prjFile = files[i];
      }
      if (files[i].name.toLocaleLowerCase().indexOf(".dbf") > 0) {
        dbfFile = files[i];
      }
    }

    if (!shpFile || !prjFile || !dbfFile) {
      df.reject(new Error("打开文件失败,请通过ctrl+同时选择shp、prj、dbf三个文件"));
      return promise;
    }
    readAsArrayBuffer(shpFile)
      .then(function (shpBuffer) {
        readAsText(prjFile, encoding)
          .then(function (prjBuffer) {
            readAsArrayBuffer(dbfFile)
              .then(function (dbfBuffer) {
                let parsed = shp.combine([shp.parseShp(shpBuffer, prjBuffer), shp.parseDbf(dbfBuffer, encoding)]);
                parsed.fileName = shpFile.name.toLocaleLowerCase();

                df.resolve(parsed);
              })
              .catch(function (err) {
                df.reject(err);
              });
          })
          .catch(function (err) {
            df.reject(err);
          });
      })
      .catch(function (err) {
        df.reject(err);
      });

    return promise;
  } else {
    throw new Error("文件列表不能为空");
  }
}

export function isShpLocalFiles(files) {
  let isFile = files.length >= 3;
  if (!isFile) {
    return false;
  }
  let shpFile, dbfFile, prjFile;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (!(file instanceof File || (file instanceof Blob && file.name))) {
      return false;
    }
    if (files[i].name.toLocaleLowerCase().indexOf(".shp") > 0) {
      shpFile = files[i];
    }
    if (files[i].name.toLocaleLowerCase().indexOf(".prj") > 0) {
      prjFile = files[i];
    }
    if (files[i].name.toLocaleLowerCase().indexOf(".dbf") > 0) {
      dbfFile = files[i];
    }
  }
  if (!shpFile || !prjFile || !dbfFile) {
    return false;
  }
  return true;
}
