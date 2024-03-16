let capture;
let desiredWidth, desiredHeight;
let currentFilterIndex = 0;
let filterTypes;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Creates webcam capture
  capture = createCapture(VIDEO, scaleCanvasToCapture);
  capture.hide();

  // TODO: Add an INVERT filter type to filterTypes
  filterTypes = [
    { name: GRAY },
    { name: THRESHOLD },
    { name: POSTERIZE, arg: 3 },
    { name: INVERT },
  ];
}

function draw() {
    image(capture, 0, 0);
    // Add a black border around the image
    stroke('#674d3c'); // Set stroke color to black
    strokeWeight(4); // Set stroke weight to 4 pixels
    noFill(); // Do not fill the rectangle
    rect(0, 0, width, height); // Draw a rectangle around the entire canvas
    let currentFilter = filterTypes[currentFilterIndex];
    // Applies filter, taking into account optional argument
    if (currentFilter.arg) {
      filter(currentFilter.name, currentFilter.arg);
    } else {
      filter(currentFilter.name);
    }
  }
  
  
function mousePressed() {
  // Cycles through filters when mouse is pressed
  currentFilterIndex++;
  if (currentFilterIndex >= filterTypes.length) {
    currentFilterIndex = 0;
  }
}

function scaleCanvasToCapture() {
  // Sets desired width of canvas to width of the window
  desiredWidth = windowWidth / 3;
  // Calculates height according to webcam feed's scale
  desiredHeight = windowWidth * (capture.height / capture.width / 3);
  // Resizes the canvas to the desired dimensions
  resizeCanvas(desiredWidth, desiredHeight);
  // Uses the .size() method to resize original webcam capture element
  capture.size(desiredWidth, desiredHeight);
}
