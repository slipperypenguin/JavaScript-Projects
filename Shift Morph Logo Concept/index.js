var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = window.innerWidth;
var ch = c.height = window.innerHeight;
var cx = cw / 2,
  cy = ch / 2;
var rad = Math.PI / 180;
var frames = 0;
var a = Math.PI / 3; // angle for hexagon
var n = ~~(ch / 30); // interpolation points

var R = ch / 6; // hexagon radius
var mov = R / 4; // moviment amplitude
var H = Math.sqrt(3) * R; // hexagon height
var W = 2 * R; // hexagon width
var S = 3 / 2 * R;
var r = R / 3;
var hexX = 4,
  hexY = 2; // hexagons number in X & Y
var x, y;

ctx.strokeStyle = "#555";
ctx.lineWidth = .5;

var frames = 0;
var stopped = true;

function drawHexagon(Hub, R, frames) {
  var p = [];
  for (var i = 0; i < 7; i++) {
    x = Hub.x + R * Math.cos(a * i);
    y = Hub.y + R * Math.sin(a * i) + mov * Math.sin(frames * rad + x * rad);
    var o = {
      x: x,
      y: y
    }
    p.push(o);
  }
  for (var i = 1; i < p.length; i++) {
    trianglePoints(Hub, p[i - 1], p[i], n);
  }
}

function trianglePoints(a, b, c, n) {
  var pointsRy = [
    [],
    [],
    []
  ];
  interpolate(a, b, n, pointsRy[0]);
  interpolate(b, c, n, pointsRy[1]);
  interpolate(c, a, n, pointsRy[2]);
  ctx.beginPath()
  for (var i = 0; i < pointsRy[0].length; i++) {
    ctx.moveTo(pointsRy[0][i].x, pointsRy[0][i].y);
    ctx.lineTo(pointsRy[1][i].x, pointsRy[1][i].y);
    ctx.lineTo(pointsRy[2][i].x, pointsRy[2][i].y);
    ctx.closePath();
  }
  ctx.stroke();
}

function interpolate(a, b, n, pointsRy) {
  for (var i = 1; i <= n; i++) {
    var o = {}
    o.x = ((b.x - a.x) * i / n) + a.x,
      o.y = ((b.y - a.y) * i / n) + a.y
    pointsRy.push(o);
  }
}

function Draw() {
  frames += 3;
  ctx.clearRect(0, 0, cw, ch);
  for (var i = 0; i < hexY; i++) {
    for (var j = 0; j < hexX; j++) {
      x = (j * S) + (cw - R * hexX) / 2;
      y = i * H + (ch - S * hexY) / 2;
      if (j % 2 == 0) {
        y += H / 2
      }
      var Hub = {
        x: x,
        y: y
      }
      drawHexagon(Hub, R, frames);
    }
  }
  requestId = window.requestAnimationFrame(Draw);
}

function start() {
  requestId = window.requestAnimationFrame(Draw);
  stopped = false;
}

function stopAnim() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
  }
  stopped = true;
}

window.addEventListener("load", start(), false);

c.addEventListener("click", function() {
  (stopped == true) ? start(): stopAnim();
}, false)
