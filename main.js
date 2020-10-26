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
var img = new Image();
img.src = 'img/blank.png';

var up = 0;
var down = 1;
var imgORtext = 0;

var cordeis = document.getElementById('catalogue');

function init(content) {
  back.src = 'img/fundo_cidade_preto_fundocordel.png';
  varal.src = 'img/slam_de_corda.png';
  team.src = 'img/logo_sesamo1branco_fundo_transp.png';
  ieb.src = 'img/IEBsite122.png';
  window.requestAnimationFrame(draw,content);
}

function draw(content) {
  ctx.globalCompositeOperation = 'destination-source';
  ctx.clearRect(0, 0, w, h); // clear canvas
  // ctx.drawImage(team );
  ctx.drawImage(back,0,0,w,h);

  ctx.drawImage(ieb,50,h-(ieb.height + 50));
  ctx.drawImage(team,w-(team.width + 50),h-(team.height + 40));

  if (content){
    ctx.drawImage(img,350,150,500,500*img.height/img.width);
    // console.log(img.src);
  }

  ctx.save();
  if (Math.random() < 0.03 && up > -0.15){
    up = up - 0.01;
  } else if (Math.random() < 0.03 && up < 0.15) {
    up = up + 0.01;
  }
  ctx.transform(1, 0, up, 1, 0, 0)
  ctx.drawImage(varal,-10,20,w+20,(w+20)*varal.height/varal.width);
  ctx.restore();

  window.requestAnimationFrame(draw,content);
}

window.onresize = function(){
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
  canvas.setAttribute("width", viewWidth);
  canvas.setAttribute("height", viewHeight);
  w = canvas.width;
  h = canvas.height;
}

function selector(a){
  document.getElementById("menu").style.visibility = 'hidden';
  document.getElementById("content1").style.visibility = 'hidden';
  document.getElementById("audio").style.visibility = 'hidden';
  switch (a) {
    case 1:
      document.getElementById("content1").style.visibility = 'visible';
      document.getElementById("pages").style.visibility = 'visible';
      imgORtext = 1;
      break;
    case 2:
      document.getElementById("content1").style.visibility = 'visible';
      document.getElementById("content2").style.visibility = 'visible';
      document.getElementById("audio").style.visibility = 'visible';
      document.getElementById("pages").style.visibility = 'hidden';
      document.getElementById("beat").play();
      imgORtext = 2;
      img.src = 'img/blank.png';
      break;
    case 3:
      // document.getElementById("content1").style.visibility = 'visible';
      img.src = 'img/blank.png';
      break;
    default:
      // document.getElementById("menu").style.visibility = 'visible';
      img.src = 'img/blank.png';
  }
}

function show_select(a){
  switch (a) {
    case 1:
      show();
      break;
    case 2:
      show_text();
      break;
  }
}

function show(){
  var id = document.getElementById("catalogue").value;
  var pages = Cordeis[id].Folhas;
  document.getElementById("titulo").innerHTML = "";
  document.getElementById("titulo").innerHTML = Cordeis[id].Titulo;
  document.getElementById("autor").innerHTML = "";
  document.getElementById("autor").innerHTML = Cordeis[id].Autor;
  document.getElementById("data").innerHTML = "";
  document.getElementById("data").innerHTML = Cordeis[id].Data;
  document.getElementById("localidade").innerHTML = "";
  document.getElementById("localidade").innerHTML = Cordeis[id].Localidade;
  document.getElementById("page").max = Cordeis[id].Folhas;

  var p = document.getElementById("page").value;

  img.src = 'cordeis/'+ Cordeis[id].Codigo + '-' + p + '.jpg';
  init(true);
}

function show_text(){
  var id = document.getElementById("catalogue").value;
  var pages = Cordeis[id].Folhas;
  document.getElementById("titulo").innerHTML = "";
  document.getElementById("titulo").innerHTML = Cordeis[id].Titulo;
  document.getElementById("autor").innerHTML = "";
  document.getElementById("autor").innerHTML = Cordeis[id].Autor;
  document.getElementById("data").innerHTML = "";
  document.getElementById("data").innerHTML = Cordeis[id].Data;
  document.getElementById("localidade").innerHTML = "";
  document.getElementById("localidade").innerHTML = Cordeis[id].Localidade;
  document.getElementById("page").max = Cordeis[id].Folhas;

  document.getElementById("text_container").innerHTML = "";
  var textoHTML = Cordeis[id].Texto;
  textoHTML = textoHTML.replace(/(\r\n|\n|\r)/gm,"<br>")
  document.getElementById("text_container").innerHTML = textoHTML;

  // var p = document.getElementById("page").value;
  // img.src = 'cordeis/'+ Cordeis[id].Codigo + '-' + p + '.jpg';
  init(true);
}


window.onload = function() {
  var option;
  for (var i = 0; i < Cordeis.length; i++) {
      option = document.createElement('option');
      option.text = Cordeis[i].Titulo;
      option.value = i;
      cordeis.add(option);
  }
};

init();
