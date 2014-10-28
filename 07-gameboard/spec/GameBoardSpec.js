/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Prueba Game Board", function(){

	it("GameBoard.add()", function(){
		var gb = new GameBoard();
		gb.add(4);
		expect(gb.objects[0]).toEqual(4);
	});

	it("Metodos de borrado (GameBoard.remove(), GameBoard.resetRemoved() y GameBoard.finalizeRemoved()", function(){
		var gb = new GameBoard();
		gb.add(4);
		spyOn(gb, "resetRemoved").andCallThrough();
		gb.resetRemoved();
		expect(gb.resetRemoved).toHaveBeenCalled();
		gb.remove(4);
		expect(gb.removed.length).toEqual(1);
		gb.finalizeRemoved();
		expect(gb.objects.length).toEqual(0);	
	});

	it("GameBoard.iterate()", function(){
		var gb = new GameBoard();
		var dummy = {
			doThings: function(){}
		};
		spyOn(dummy, "doThings").andCallThrough();
		gb.add(dummy);
		gb.iterate('doThings');
		expect(dummy.doThings).toHaveBeenCalled();
	});

	it("GameBoard.detect()", function(){
		var gb = new GameBoard();
		gb.add(42);
		expect(gb.detect(function(){ return this > 0; })).toBe(42);
	});


});

/*


var GameBoard = function() {
    var board = this;

    // Colecci�n de objetos contenidos por este tablero
    this.objects = [];

    // Devuelve el primer objeto de objects para el que func es true
    this.detect = function(func) {
	for(var i = 0,val=null, len=this.objects.length; i < len; i++) {
	    if(func.call(this.objects[i])) return this.objects[i];
	}
	return false;
    };

    // Cuando Game.loop() llame a step(), hay que llamar al m�todo
    // step() de todos los objetos contenidos en el tablero.  Antes se
    // inicializa la lista de objetos pendientes de borrar, y despu�s
    // se borran los que hayan aparecido en dicha lista
    this.step = function(dt) { 
	this.resetRemoved();
	this.iterate('step',dt);
	this.finalizeRemoved();
    };

    // Cuando Game.loop() llame a draw(), hay que llamar al m�todo
    // draw() de todos los objetos contenidos en el tablero
    this.draw= function(ctx) {
	this.iterate('draw',ctx);
    };

    // Comprobar si hay intersecci�n entre los rect�ngulos que
    // circunscriben a los objetos o1 y o2
    this.overlap = function(o1,o2) {
	// return !((o1 encima de o2)    || (o1 debajo de o2)   ||
        //          (o1 a la izda de o2) || (o1 a la dcha de o2)
	return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
		 (o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
    };

    // Encontrar el primer objeto de tipo type que colisiona con obj
    // Si se llama sin type, en contrar el primer objeto de cualquier
    // tipo que colisiona con obj
    this.collide = function(obj,type) {
	return this.detect(function() {
	    if(obj != this) {
		var col = (!type || this.type & type) && board.overlap(obj,this)
		return col ? this : false;
	    }
	});
    };


};

*/
