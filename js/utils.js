

var uirand = function(max){
  return Math.floor(Math.random()*max);
}

function deg2rad(angle){
  return (angle / 180) * Math.PI;
}
function rad2deg (angle) {
  // http://jsphp.co/jsphp/fn/view/rad2deg
  // +   original by: Enrique Gonzalez
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: rad2deg(3.141592653589793);
  // *     returns 1: 180
  return angle * 57.29577951308232; // angle / Math.PI * 180
}

function normalizeAngleRad(angle){
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function zbuffSort() {
  var sortOrder = 1;
  return function (a,b) {
    var result = (a.y < b.y) ? -1 : (a.y > b.y) ? 1 : 0;
    return result * sortOrder;
  }
}

function fastIntersection(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y)
{
  var denominator = (x1*(y2 - y3) + y1*(x3 - x2) + x2*y3 - y2*x3);
  var t1 = (x*(y3 - y1) + y*(x1 - x3) - x1*y3 + y1*x3) / denominator;
  var t2 = (x*(y2 - y1) + y*(x1 - x2) - x1*y2 + y1*x2) / -denominator;
  var s = t1 + t2;

  return 0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1 && s <= 1;
}

function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
  var denominator, a, b, numerator1, numerator2, result = {
    x: null,
    y: null,
    onLine1: false,
    onLine2: false
  };
  denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
  if (denominator == 0) {
    return result;
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
  numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = line1StartX + (a * (line1EndX - line1StartX));
  result.y = line1StartY + (a * (line1EndY - line1StartY));
  /*
  // it is worth noting that this should be the same as:
  x = line2StartX + (b * (line2EndX - line2StartX));
  y = line2StartX + (b * (line2EndY - line2StartY));
  */
  // if line1 is a segment and line2 is infinite, they intersect if:
  if (a > 0 && a < 1) {
    result.onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (b > 0 && b < 1) {
    result.onLine2 = true;
  }
  // if line1 and line2 are segments, they intersect if both of the above are true
  return result;
};
