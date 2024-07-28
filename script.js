const color_picker = document.getElementById("color-picker");
const bg = document.getElementById("bg-color");
const font = document.getElementById("font-size");
const canvas = document.getElementById("canvas");

// Buttons
const clear = document.getElementById("btn-1");
const download = document.getElementById("btn-2");
const retrieve = document.getElementById("btn-3");

// Get Context of canvas
const ctx = canvas.getContext("2d");

// Initialize drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Choose the color of the stroke
color_picker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

// To track the stroke
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

// canvas.addEventListener("mouseout", () => {
//   isDrawing = false;
// });

// Change background color
bg.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Clear canvas
clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download canvas
download.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());
  const link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Font-size
font.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

// Retrieve canvas from local storage
retrieve.addEventListener("click", () => {
  const savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
