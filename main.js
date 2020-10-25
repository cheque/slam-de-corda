// var grid_canvas = $("#my_canvas");
var canvas = document.getElementById("thecanvas");
var ctx = canvas.getContext("2d");
var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;

canvas.style.position = "fixed";
canvas.setAttribute("width", viewWidth);
canvas.setAttribute("height", viewHeight);
canvas.style.top = 0;
canvas.style.left = 0;

var w = canvas.width;
var h = canvas.height;

var back = new Image();
var varal = new Image();
var team = new Image();
var ieb = new Image();

var up = 0;
var down = 1;

function init() {
  back.src = 'img/fundo_cidade_preto_fundocordel.png';
  varal.src = 'img/slam_de_corda.png';
  team.src = 'img/logo_sesamo1branco_fundo_transp.png';
  ieb.src = 'img/IEBsite122.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.globalCompositeOperation = 'destination-source';
  ctx.clearRect(0, 0, w, h); // clear canvas
  // ctx.drawImage(team );
  ctx.drawImage(back,0,0,w,h);

  ctx.save();
  if (Math.random() < 0.03 && up < 0.15) {
    up = up + 0.01;
  } else if (Math.random() < 0.03 && up > -0.15){
    up = up - 0.01;
  }
  ctx.transform(1, 0, up, 1, 0, 0)
  ctx.drawImage(varal,-10,50,w+20,(w+20)*varal.height/varal.width);
  ctx.restore();

  ctx.drawImage(ieb,50,h-(ieb.height + 50));
  ctx.drawImage(team,w-(team.width + 50),h-(team.height + 40));

  window.requestAnimationFrame(draw);
}

init();
