'use strict';

var colors = ['#FFAA5C', '#DA727E', '#AC6C82', '#685C79', '#455C7B'];

var line = d3.svg.line().x(function (d) {
	return d.x;
}).y(function (d) {
	return d.y;
}).interpolate('linear');

var svg = d3.select('body').append('svg');

var svgW = d3.select('svg').node().clientWidth;
var svgH = d3.select('svg').node().clientHeight;

var w = svgW / 4;
var h = svgH / 4;

var data = [{ x: -w / 2, y: -h / 4 }, { x: 0, y: -h / 2 }, { x: w / 2, y: -h / 4 }, { x: w / Math.PI, y: h / 2.5 }, { x: -w / 4, y: h / 2.5 }];

var getPath = function getPath(d, i) {
	var path = [];

	var startPoint = { x: 0, y: 0 };
	// point 1
	path.push(startPoint);

	// point 2
	path.push(d);

	// point 3
	path.push(data[i + 1] || data[0]);

	// point 4
	path.push(startPoint);

	return path;
};

var g = svg.append('g').attr('transform', 'translate(' + svgW / 2 + ',' + svgH / 2 + ')');

g.selectAll('path').data(data).enter().append('path').attr({
	fill: function fill(d, i) {
		return colors[i];
	}
});

transition();

function transition() {

	data.map(function (d) {
		d.x = d3.random.normal(d['x'], 10)();
		d.y = d3.random.normal(d['y'], 10)();
		return d;
	});

	g.selectAll('path').data(data).transition().ease("linear").duration(500).attr('d', function (d, i) {
		return line(getPath(d, i));
	}).call(endall, function () {
		window.requestAnimationFrame(transition);
	});
}

function endall(transition, callback) {
	if (transition.size() === 0) {
		callback();
	}
	var n = 0;
	transition.each(function () {
		++n;
	}).each("end", function () {
		if (! --n) callback.apply(this, arguments);
	});
}
