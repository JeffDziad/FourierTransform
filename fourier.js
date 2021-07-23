let time = 0;
let path = [];

let x = [];
let y = [];
let fourierX;
let fourierY;

const magnification = 2;

function setup() {
    createCanvas(innerWidth, innerHeight);

    //populate signal array's
    for(let i = 0; i < drawing.length; i++) {
        x[i] = drawing[i].x / magnification;
        y[i] = drawing[i].y / magnification;
    }

    //convert real signal into frequency signal
    fourierX = dft(x);
    fourierY = dft(y);
}

function epiCycle(x, y, rotation, fourier) {

    for(let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;

        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2);
        stroke(255);
        line(prevx, prevy, x, y);
    }
    return createVector(x, y);
}

function draw() {
    background(0);

    let vx = epiCycle(400, 200, 0, fourierX);
    let vy = epiCycle(150, 500, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);

    path.unshift(v);

    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);
    beginShape();
    noFill();
    for(let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / fourierY.length;
    time += dt;
}