/* 
	Share on Facebook
*/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*
	Variáveis
*/
var sizeX, // largura do jogo
	sizeY, // altura do jogo
	fishCoordX, // coordenada X do peixe
	fishCoordY, // coordenada Y do peixe
	pinguimCoordX, // coordernada X do pinguim
	pinguimCoordY, // coordernada Y do pinguim
	speed, // velocidade do pinguim
	tempo, // duração do jogo
	score, // pontuação
	audiotheme;


window.onload = function(){
	console.log("load");
}

/*
	Inicializar Game
*/
function inicializarGame(){

	document.getElementById("divGameOver").style.display ="none";
	document.getElementById("imgStartGame").style.display ="none";
	document.getElementById("lightBox").style.display ="none";

	inicializarVariaveisGlobais();
	inicializarPinguim();
	inicializarFamilia();
	inicializarPeixe();
	inicializarScore();
	
	var contadorTempo = document.querySelector('#contadorTempo');
    startTimer(tempo, contadorTempo);

    audiotheme = new Audio('audio/theme.mp3');
	audiotheme.play();

}

/*
	Finalizar Game
*/
function finalizarGame(){

	document.getElementById('fish').style.display = "none";;
	document.getElementById('pinguim').style.display = "none";;
	document.getElementById("lightBox").style.display ="block";
	document.getElementById("divGameOver").style.display ="block";

	var audiogameover = new Audio('audio/gameover.wav');
		audiogameover.play();

	audiotheme.pause();

}

/*
	Inicializar Score
*/
function inicializarScore(){

	document.getElementById("totalScore").innerHTML = 0;
	document.getElementById("bestScore").innerHTML = 0;

	if (typeof(Storage) !== "undefined") { // Verifica se o navegador tem suporte para guardar informações nele
    	if (localStorage.getItem("score")) {
    		document.getElementById("bestScore").innerHTML = localStorage.getItem("score");
    	}
    }
}

/*
	Inicializar Variáveis Globais
*/
function inicializarVariaveisGlobais(){
	sizeX = document.getElementById('imagemJogo').width - 20; 
	sizeY = document.getElementById('imagemJogo').height - 20;
	pinguimCoordX = 400;
	pinguimCoordY = 450;
	speed = 15;
	tempo = 60 * 1;
	score = 0;
}

/*
	Inicializar Peixe
*/
function inicializarPeixe(){
	fishCoordX = Math.floor(Math.random() * sizeX) + 1;
	fishCoordY = Math.floor(Math.random() * sizeY) + 1;
	fishCoordX = fishCoordX - (fishCoordX % speed);
	fishCoordY = fishCoordY - (fishCoordY % speed);

	var fish = document.getElementById('fish');
	fish.style.display = "block";
	fish.style.left = fishCoordX + "px";
	fish.style.top = fishCoordY + "px";
}

/*
	Inicializar Familia
*/
function inicializarFamilia(){
	var familiaPinguim1 = document.getElementById('familiaPinguim1');
	var familiaPinguim2 = document.getElementById('familiaPinguim2');
	var familiaPinguim3 = document.getElementById('familiaPinguim3');
}

/*
	Inicializar Pinguim
*/
function inicializarPinguim(){

	var pinguim = document.getElementById('pinguim');
	pinguim.style.display = "block";
	pinguim.style.top = pinguimCoordY + "px";
	pinguim.style.left = pinguimCoordX + "px";
	
	document.onkeydown = function(e){

		// top
		if(e.keyCode == 38){
			pinguimCoordY -= speed;
			pinguim.style.top = pinguimCoordY + 'px';
			var myclass = new Array('back-right','back-stand','back-left');
			var n = Math.round(Math.random()*2);
			pinguim.setAttribute('class',myclass[n]);
		}

		// down
		if(e.keyCode == 40){
			pinguimCoordY += speed;
			pinguim.style.top = pinguimCoordY + 'px';
			var myclass = new Array('front-right','front-stand','front-left');
			var n = Math.round(Math.random()*2);
			pinguim.setAttribute('class',myclass[n]);
		}

		// left
		if(e.keyCode == 37){
			pinguimCoordX -= speed;
			pinguim.style.left = pinguimCoordX + 'px';
			var myclass = new Array('left-right','left-stand','left-left');
			var n = Math.round(Math.random()*2);
			pinguim.setAttribute('class',myclass[n]);
		}

		// right
		if(e.keyCode == 39){
			pinguimCoordX += speed;
			pinguim.style.left = pinguimCoordX + 'px';
			var myclass = new Array('right-right','right-stand','right-left');
			var n = Math.round(Math.random()*2);
			pinguim.setAttribute('class',myclass[n]);
		}

		if (pinguimCoordX > sizeX) {
			pinguimCoordX -= speed;
		}

		if (pinguimCoordX < 0) {
			pinguimCoordX += speed;
		}

		if (pinguimCoordY > sizeY) {
			pinguimCoordY -= speed;
		}

		if (pinguimCoordY < 0) {
			pinguimCoordY += speed;
		}
		
		//Depois de mover, verifica se o pinguim está na mesma posição do peixe
		if ((pinguimCoordX >= fishCoordX - 15 && pinguimCoordX <= fishCoordX + 15) && 
			(pinguimCoordY >= fishCoordY - 15 && pinguimCoordY <= fishCoordY + 15)){


			// Ações após pegar peixe

			var audiopickup = new Audio('audio/pickup.wav');
			audiopickup.play();

			score++;

			inicializarPeixe();

			document.getElementById('totalScore').innerHTML = score;
		}
	}
}

/* 
	Contador de Tempo
*/

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var intervalo = setInterval(function () {
        minutes = parseInt(timer / 60, 0);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalo);

            finalizarGame();

            if (typeof(Storage) !== "undefined") { // Verifica se o navegador tem suporte para guardar informações nele
            	if (!localStorage.getItem("score") || (localStorage.getItem("score") && (localStorage.getItem("score") < score))) {
            		localStorage.setItem("score", score);
            	}
            }
        }
    }, 1000);
}