const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const download = document.querySelector('#download');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineWidth = 100;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 360*Math.random();
let drawing = true;

function draw(e) {
  if(!isDrawing) return;
  //console.log(e);
  //ctx.strokeStyle = "#"+((1<<24)*Math.random()|0).toString(16);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if(hue>=360)
  {
    hue=0;
  }
  if(ctx.lineWidth>=100 || ctx.lineWidth<=1)
  {
    drawing = !drawing;
  }
  if(drawing)
  {
    ctx.lineWidth++;
  }
  else{
    ctx.lineWidth--;
  }
};

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue = 360*Math.random();
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing=false);
canvas.addEventListener('mouseout', () => isDrawing = false);
download.addEventListener('click', (e) => {
  var link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});