var cordeis = document.getElementById('catalogue');

var mainID = Math.floor(Math.random() * Cordeis.length);

function selector(a){
  document.getElementById("consulta").style.visibility = 'hidden';
  document.getElementById("cria").style.visibility = 'hidden';
  switch (a) {
    case 0:
      document.getElementById("beat").pause();
      break;
    case 1:
      document.getElementById("consulta").style.visibility = 'visible';
      document.getElementById("beat").pause();
      break;
    case 2:
      document.getElementById("cria").style.visibility = 'visible';
      // document.getElementById("beat").play();
      break;
  }
}

function selectDisplay(){
  if(document.getElementById("image").checked){
    document.getElementById("page").value = 1;
    showPage(1);
  } else {
    show(document.getElementById('catalogue').value);
  };
}

function show(key){
  // var id = document.getElementById("catalogue").value;
  var id = key || Math.floor(Math.random() * Cordeis.length);
  var pages = Cordeis[id].Folhas;
  document.getElementById("titulo").innerHTML = Cordeis[id].Titulo;
  document.getElementById("autor").innerHTML = Cordeis[id].Autor;
  document.getElementById("data").innerHTML = Cordeis[id].Data;
  document.getElementById("localidade").innerHTML = Cordeis[id].Localidade;
  document.getElementById("page").max = Cordeis[id].Folhas;
  document.getElementById("totpag").innerHTML = Cordeis[id].Folhas;

  var p = 1;
  document.getElementById("page").value = 1;

  document.getElementById("text_container").innerHTML = "";
  document.getElementById("text_container").style.padding = "0 0 0 5%";
  var textoHTML = Cordeis[id].Texto;
  textoHTML = textoHTML.replace(/(\r\n|\n|\r)/gm,"<br>")
  document.getElementById("text_container").innerHTML = textoHTML;

}

function showPage(p){
  var id = document.getElementById("catalogue").value;
  document.getElementById("titulo").innerHTML = Cordeis[id].Titulo;
  document.getElementById("autor").innerHTML = Cordeis[id].Autor;
  document.getElementById("data").innerHTML = Cordeis[id].Data;
  document.getElementById("localidade").innerHTML = Cordeis[id].Localidade;
  document.getElementById("page").max = Cordeis[id].Folhas;
  document.getElementById("totpag").innerHTML = Cordeis[id].Folhas;
  document.getElementById("text_container").style.padding = "0";
  if (document.getElementById("image").checked){
    p = p || 1;
    var id = document.getElementById("catalogue").value;
    var img = new Image();
    img.onload = function() {
      // image exists and is loaded
      // document.body.appendChild(img);
      document.getElementById("text_container").innerHTML =
      '<img src=\'cordeis_small/'+ Cordeis[id].Codigo + '-' + p + '.JPEG\' width=100% />';
    }
    img.onerror = function() {
      // image did not load
      // var err = new Image();
      // err.src = 'cordeis_small/'+ Cordeis[id].Codigo + '-0' + p + '.JPEG';
      // document.body.appendChild(err);
      document.getElementById("text_container").innerHTML =
      '<img src=\'cordeis_small/'+ Cordeis[id].Codigo + '-0' + p + '.JPEG\' width=100% />';
    }

    img.src = 'cordeis_small/'+ Cordeis[id].Codigo + '-' + p + '.JPEG';
  }

}


window.onload = function() {
  var option;
  for (var i = 0; i < Cordeis.length; i++) {
      option = document.createElement('option');
      option.text = Cordeis[i].Titulo;
      option.value = i;
      cordeis.add(option);
  }
  document.getElementById("catalogue").value = Math.floor(Math.random() * Cordeis.length);
};


function findCordel(sometext){
  var result = [];
  var amount = 50;
  var key = 0;
  var text = "";
  var len = sometext.length;
  for (var i = 0; i < Cordeis.length; i++){
    if ( Cordeis[i].Titulo.search(sometext) > 0 ){
      var start = Cordeis[i].Titulo.search(sometext);
      key = i;
      if (start >= amount/2){
        text = "... " + Cordeis[i].Titulo.substring(start - amount/2,start) + "<b>" +
          Cordeis[i].Titulo.substr(start,len) + "</b>" +
          Cordeis[i].Titulo.substr(start+len,start + amount/2-len);
      } else {
        text = Cordeis[i].Titulo.substr(0,start) + "<b>" +
          Cordeis[i].Titulo.substr(start,len) + "</b>" +
          Cordeis[i].Titulo.substr(start+len,amount/2 + start-len) + "... ";
      }
      result.push({key,text});
    } else if (Cordeis[i]["Palavras-chave"].search(sometext) > 0) {
      var start = Cordeis[i]["Palavras-chave"].search(sometext);
      key = i;
      text = "<b>" + Cordeis[i]["Palavras-chave"].substr(start,len) + "</b>" +
        Cordeis[i]["Palavras-chave"].substr(start+len,amount-len);
      result.push({key,text});
    } else if (Cordeis[i].Texto.search(sometext) > 0) {
      var start = Cordeis[i].Texto.search(sometext);

      key = i;
      text = "... <b>" +
          Cordeis[i].Texto.substr(start,len) + "</b>" +
          Cordeis[i].Texto.substr(start+len,amount-len) + "...";
      result.push({key,text});
    }
  }
  return result;
}

function buscaCordel(texto){
  document.getElementById("buscaMenu").innerHTML="";
  var show = [];
  var len = texto.length;
  if (len >= 3) {
    show = findCordel(texto);
  } else if (len > 0) {
    var node = document.createElement('div');
    node.innerHTML = "Digite pelo menos 3 caracteres...<br/>+ Clique 2 vezes no resultado!";
    document.getElementById("buscaMenu").appendChild(node);
  }
  for (var i=0; i<show.length; i++){
    var node = document.createElement('div');
    node.innerHTML = "<a href='#' onclick='inspira("+ show[i].key +");'>"
              + show[i].text +"</a>";
    document.getElementById("buscaMenu").appendChild(node);
  }
}

function inspira(num) {
  selector(2);
  var textoHTML = Cordeis[num].Texto;
  textoHTML = textoHTML.replace(/(\r\n|\n|\r)/gm,"<br>")
  document.getElementById("content2").innerHTML = textoHTML;
}
