const canvas = document.getElementById("sketchBox");
const c = canvas.getContext("2d");

const downloadButton = document.getElementById("downloadSketch");

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

let mouseHeld = false;

let points = [];

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    c.fillStyle = "black";
    c.fillRect(0, 0, WIDTH, HEIGHT);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

downloadButton.addEventListener("click", () => {
    let pointsStrings = [];
    let filename;
    filename = "sketch.txt";
    for(let i = 0; i < points.length; i++) {
        pointsStrings.push(`{x: ${points[i].x}, y: ${points[i].y}}`);
    }
    let pointsText = pointsStrings.join(",");
    download(filename, pointsText);
});

addEventListener("mousedown", (event) => {
    if(event.button === 0) {
        mouseHeld = true;
    }
})

addEventListener("mouseup", (event) => {
    if(event.button === 0) {
        mouseHeld = false;
    }
})

addEventListener("mousemove", (event) => {
    if(mouseHeld) {
        points.push({x: event.clientX, y: event.clientY});
        c.fillStyle = "white";
        c.fillRect(event.clientX, event.clientY, 1, 1);
    }
});

init();