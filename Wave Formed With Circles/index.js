var ocean = document.querySelector(".ocean"),
  spacing = 18,
  diameter = 32,
  rotation = 8,
  rows = 20,
  cols = 30,
  x = 0,
  y = 0,
  i,
  j,
  r;

function draw() {
  reset();

  for (i = 0; i < rows; i++) {

    for (j = 0; j < cols; j++) {
      r = i * rotation + j * rotation;
      createCircle(ocean, x, y, r);
      x += spacing;
      if (j == cols - 1) x = 0;
    }

    y += spacing;
  }
}

function createCircle(ocean, x, y, r) {
  var c = document.createElement("div"),
    d = document.createElement("div");

  c.className = "circle";
  c.style.left = x + "px";
  c.style.top = y + "px";
  c.style.width = diameter + "px";
  c.style.height = diameter + "px";

  d.className = "dot";
  d.style.transform = "rotateZ(" + r + "deg)";
  c.appendChild(d);
  ocean.appendChild(c);
}

function reset() {
  x = 0;
  y = 0;
  while (ocean.firstChild) {
    ocean.removeChild(ocean.firstChild);
  }
}

function initControls() {
  var showCheckbox = document.querySelector("#show"),
    diameterInput = document.querySelector("#diameter"),
    spacingInput = document.querySelector("#spacing"),
    rotationInput = document.querySelector("#rotation");

  showCheckbox.addEventListener("click", function() {
    ocean.classList.toggle("show");
  });
  diameterInput.addEventListener("change", function() {
    diameter = parseInt(this.value);
    draw();
  });
  spacingInput.addEventListener("change", function() {
    spacing = parseInt(this.value);
    draw();
  });
  rotationInput.addEventListener("change", function() {
    rotation = parseInt(this.value);
    draw();
  });
}

initControls();
draw();