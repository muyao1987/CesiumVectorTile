import * as Cesium from "mars3d-cesium";

function getColor(color) {
  if (typeof color == "string") {
    color = Cesium.Color.fromCssColorString(color);
  } else if (Array.isArray(color)) {
    color = Cesium.Color.fromBytes(color[0], color[1], color[2], color[3]);
  }
  return color;
}

/**
 *@param {Object} options 样式参数
 *@param {Cesium.Color|String}[options.outlineColor=Cesium.Color.YELLOW] 线或边颜色，仅线、面数据有效。
 *@param {Cesium.Color|String}[options.fillColor=Cesium.Color.fromBytes(0, 255, 255, 30)] 填充颜色，仅面数据有效。
 *@param {Cesium.Color|String}[options.backgroundColor] 背景色
 *@param {Number}[options.lineWidth=1.5] 线宽，仅线数据有效。
 *@param {Boolean}[options.outline=true] 是否显示边，仅面数据有效。
 *@param {Boolean}[options.fill=true] 是否填充，仅面数据有效。
 *@param {Cesium.Color|String}[options.fontColor=Cesium.Color.BLACK] 注记文本颜色
 *@param {Number}[options.fontSize=16] 注记文本字体大小，仅在数据有点时有效。
 *@param {String}[options.fontFamily="宋体"] 注记文本字体名称，仅在数据有点时有效。
 *@param {Boolean}[options.labelStroke] 是否显示注记文本轮廓线，仅在数据有点时有效。
 *@param {String}[options.labelStrokeWidth=1] 注记文本轮廓线宽，仅在数据有点时有效。
 *@param {Cesium.Color|String}[options.labelStrokeColor] 注记文本轮廓线颜色，仅在数据有点时有效。
 *
 *@param {Number}[options.pointSize=4] 注记点大小，仅在数据有点时有效。
 *@param {Cesium.Color|String}[options.pointColor=Cesium.Color.YELLOW] 注记点颜色，仅在数据有点时有效。
 *@param {String}[options.labelPropertyName='NAME'] 注记文本属性名称，仅在数据有点时有效。
 *@param {String}[options.makerImage=undefined] 注记点图标，如果设置点图标，则其他点样式参数无效，仅在数据有点时有效。
 *@param {Number}[options.ringRadius=2] 注记点样式为Ring时，圆心点大小（半径），仅在数据有点时有效。
 *@param {String}[options.pointStyle='Ring'] 注记点样式，仅在数据有点时有效。'Solid'为实心圆,'Ring'为带圆心的圆形,'Circle'为空心圆
 *@param {Number}[options.circleLineWidth=2] 注记点样式为Circle时，圆形线宽
 *@param {Boolean}[options.showMarker=true] 是否显示注记点，仅在数据有点时有效。
 *@param {Boolean}[options.showLabel=true] 是否显示文本，仅在数据有点时有效。
 *@param {Boolean}[options.showCenterLabel=true] 是否显示文本，仅对线和面数据有效。
 *@param {String}[options.centerLabelPropertyName] 几何中心注记文本属性名称，仅对线和面数据有效。
 *@param {Number}[options.labelOffsetX=10] 标注文本x方向偏移量，仅在数据有点时有效。以屏幕为参考，左上角为0，向右为正，单位为像素
 *@param {Number}[options.labelOffsetY=5] 标注文本y方向偏移量，仅在数据有点时有效。以屏幕为参考，左上角为0，向下为正，单位为像素
 *@param {Array.<Number>}[options.lineDash=undefined] 虚线样式，不设置则为实线
 *@param {String}[options.lineCap="butt"] 设置线条末端线帽的样式。 butt——默认。向线条的每个末端添加平直的边缘；round——向线条的每个末端添加圆形线帽；square——向线条的每个末端添加正方形线帽。
 *@param {String}[options.shadowColor=undefined] 设置用于阴影的颜色
 *@param {Number}[options.shadowBlur=undefined] 设置用于阴影的模糊级别
 *@param {Number}[options.shadowOffsetX=undefined] 设置阴影距形状的水平距离
 *@param {Number}[options.shadowOffsetY=undefined] 设置阴影距形状的垂直距离
 *@param {String}[options.lineJoin="miter"] 设置当两条线交汇时所创建边角的类型。bevel——斜角；round——创建圆角；miter——默认。创建尖角。
 *@param {Number}[options.miterLimit=10] 设置最大斜接长度。
//*@param {Number}[options.lineOffset=undefined] 双线样式参数，两线间距，单位为米(m)。不设置则为单线
 *@memberof Cesium
 *@constructor
 */
export function VectorStyle(options = {}) {
  this.fillColor = Cesium.defaultValue(getColor(options.fillColor), getColor([0, 255, 255, 30]));

  this.fill = Cesium.defaultValue(options.fill, true);

  this.labelStroke = options.labelStroke;
  this.labelStrokeWidth = Cesium.defaultValue(options.labelStrokeWidth, 1);
  this.labelStrokeColor = Cesium.defaultValue(getColor(options.labelStrokeColor), getColor([160, 99, 57]));

  //线样式
  this.outlineColor = Cesium.defaultValue(getColor(options.outlineColor), getColor("yellow"));

  this.backgroundColor = getColor(options.backgroundColor);

  this.lineWidth = Cesium.defaultValue(options.lineWidth, 1.5);
  this.outline = Cesium.defaultValue(options.outline, true);

  //注记样式
  this.fontColor = getColor(Cesium.defaultValue(options.fontColor, "black"));

  this.fontSize = Cesium.defaultValue(options.fontSize, 16);
  this.fontFamily = Cesium.defaultValue(options.fontFamily, "宋体");
  this.pointSize = Cesium.defaultValue(options.pointSize, 4);
  this.pointColor = getColor(Cesium.defaultValue(options.pointColor, "yellow"));

  this.pointStyle = Cesium.defaultValue(options.pointStyle, "Ring"); //'Solid','Ring','Circle'
  this.labelPropertyName = Cesium.defaultValue(options.labelPropertyName, "NAME");
  this.ringRadius = Cesium.defaultValue(options.ringRadius, 2);
  this.circleLineWidth = Cesium.defaultValue(options.circleLineWidth, 2);
  if (Cesium.defined(options.showMaker)) {
    this.showMarker = Cesium.defaultValue(options.showMaker, true);
  }
  if (Cesium.defined(options.showMarker)) {
    this.showMarker = Cesium.defaultValue(options.showMarker, true);
  }

  this.showLabel = Cesium.defaultValue(options.showLabel, true);

  this.showCenterLabel = Cesium.defaultValue(options.showCenterLabel, false);
  this.centerLabelPropertyName = options.centerLabelPropertyName;

  this.labelOffsetX = Cesium.defaultValue(options.labelOffsetX, 0);
  this.labelOffsetY = Cesium.defaultValue(options.labelOffsetY, 0);
  this.markerImage = options.markerImage;

  this.lineDash = options.lineDash;
  //this.lineOffset = options.lineOffset;
  this.lineCap = Cesium.defaultValue(options.lineCap, "butt");
  this.lineJoin = Cesium.defaultValue(options.lineJoin, "miter");
  this.shadowColor = getColor(options.shadowColor);

  this.shadowBlur = options.shadowBlur;
  this.shadowOffsetX = options.shadowOffsetX;
  this.shadowOffsetY = options.shadowOffsetY;
  this.miterLimit = Cesium.defaultValue(options.miterLimit, 10);

  this.markerImageEl = null;
  let makerImagePromise = null;
  let deferred = Cesium.defer();
  this.readyPromise = deferred.promise;
  let that = this;
  if (typeof this.markerImage == "string") {
    let image = new Image();
    image.onload = function () {
      that.markerImageEl = this;
      deferred.resolve(true);
    };
    image.onerror = function (err) {
      deferred.reject(err);
    };
    image.src = this.markerImage;
  } else {
    if (this.markerImage instanceof Image || this.markerImage instanceof HTMLCanvasElement) {
      this.markerImageEl = this.markerImage;
    }
    setTimeout(function () {
      deferred.resolve(true);
    }, 10);
  }
}

VectorStyle.prototype.clone = function () {
  let style = new VectorStyle();
  for (let i in this) {
    if (this.hasOwnProperty(i)) {
      if (typeof Cesium != "undefined" && this[i] instanceof Cesium.Color) {
        style[i] = Cesium.Color.clone(this[i]);
      } else {
        style[i] = this[i];
      }
    }
  }
  return style;
};

/**
 *
 *@type {Cesium.VectorStyle}
 */
VectorStyle.Default = new VectorStyle();
