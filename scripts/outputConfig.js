
//库名称
exports.library = "CesiumVectorTile";

//输出的主js名称
exports.jsFileName = "CesiumVectorTile.min.js";
exports.jsSrcFileName = "CesiumVectorTile.js";

//输出的目录
exports.outputPath = "dist";

//获取当前库的相关基本信息,并写入version文件
const packageinfo = require("../package.json");

//当前时间
function getTime() {
  let now = new Date();
  let m = now.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = now.getDate();
  d = d < 10 ? "0" + d : d;
  let h = now.getHours();
  h = h < 10 ? "0" + h : h;
  let min = now.getMinutes();
  min = min < 10 ? "0" + min : min;
  let s = now.getSeconds();
  s = s < 10 ? "0" + s : s;
  return `${now.getFullYear()}-${m}-${d} ${h}:${min}:${s}`;
}
let update = getTime();

//输出SDK相关banner注释信息
exports.banner = `${packageinfo.description}
版本信息：v${packageinfo.version}, hash值: [hash]
编译日期：${update}
Github：${packageinfo.homepage}
`;

exports.banner2 = `/*!
 * ${packageinfo.description}
 * 版本信息：v${packageinfo.version}
 * 编译日期：${update}
 * Github：${packageinfo.homepage}
 */`;
