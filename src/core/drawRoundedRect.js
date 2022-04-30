// function Rect(x, y, w, h) {
//   return { x: x, y: y, width: w, height: h };
// }

let Point = function (x, y) {
  return { x: x, y: y };
};

export function drawRoundedRect(rect, r, ctx) {
  let ptA = Point(rect.x + r, rect.y);
  let ptB = Point(rect.x + rect.width, rect.y);
  let ptC = Point(rect.x + rect.width, rect.y + rect.height);
  let ptD = Point(rect.x, rect.y + rect.height);
  let ptE = Point(rect.x, rect.y);

  ctx.beginPath();

  ctx.moveTo(ptA.x, ptA.y);
  ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
  ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
  ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
  ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);

  ctx.fill();
  ctx.stroke();
}
