var tl = new TimelineLite;

tl
.staggerFromTo(".bottom", 0.5, {alpha: 0}, {alpha: 1, fill: "#000", delay: 1}, 0.25)

.fromTo("#rectangle", 7, {fill:"#000", alpha: "0%", height: "7%"}, {fill: "#f5e317", alpha: "100%", height: "66%", ease: Power3.easeInOut}, "-=1")

.staggerFromTo(".ray", 1, {alpha: 0}, {alpha: 1, fill: "#000"}, 0.1, "-=1.25")