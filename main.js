const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 1;
let y = 1;
let z = 1;

let x2 = 1.1;
let y2 = 1.1;
let z2 = 1.1;

const a = 10;
const b = 28;
const c = 8/3;

const dt = 0.01;

const trail = [];
const trail2 = [];
const maxTrailLength = 300;
const pointSize = 2;
const scaleFactor = 12;

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let dx = a * (y - x);
  let dy = x * (b - z) - y;
  let dz = x * y - c * z;

  let dx2 = a * (y2 - x2);
  let dy2 = x2 * (b - z2) - y2;
  let dz2 = x2 * y2 - c * z2;

  x += dx * dt;
  y += dy * dt;
  z += dz * dt;

  x2 += dx2 * dt;
  y2 += dy2 * dt;
  z2 += dz2 * dt;

  trail.push({ x: x, z: z });
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 0, 0, " + (1 - i / maxTrailLength) + ")";
    ctx.arc(
      (trail[i].x * scaleFactor) + canvas.width / 2,
      (trail[i].z * scaleFactor) + canvas.height / 2,
      pointSize,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  trail2.push({ x: x2, z: z2 });
  if (trail2.length > maxTrailLength) {
    trail2.shift();
  }

  for (let i = 0; i < trail2.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 255, 0, " + (1 - i / maxTrailLength) + ")";
    ctx.arc(
      (trail2[i].x * scaleFactor) + canvas.width / 2,
      (trail2[i].z * scaleFactor) + canvas.height / 2,
      pointSize,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

window.onload = draw;
