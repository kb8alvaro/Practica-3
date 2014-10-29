/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/

describe("Prueba Player Missile", function(){

  beforeEach(function(){
		loadFixtures('index.html');
		s = SpriteSheet;	
	});
  afterEach(function(){
		SpriteSheet = s;	
	});


	it("PlayerMissile.step()", function(){
		SpriteSheet = { map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } } }
		var board = new GameBoard();
		spyOn(board,"remove");
		var pm = new PlayerMissile(0,17);
		board.add(pm);
		pm.step(0.01);
		expect(pm.y).toEqual(0);
		pm.step(1);
		expect(board.remove).toHaveBeenCalled();
	});

});

/*
// Constructor los misiles.
// Los metodos de esta clase los a�adimos a su prototipo. De esta
// forma solo existe una copia de cada uno para todos los misiles, y
// no una copia para cada objeto misil
var PlayerMissile = function(x,y) {
    this.w = SpriteSheet.map['missile'].w;
    this.h = SpriteSheet.map['missile'].h;
    this.x = x - this.w/2; 

    this.y = y - this.h; 
    this.vy = -700;
};


PlayerMissile.prototype.draw = function(ctx)  {
    SpriteSheet.draw(ctx,'missile',this.x,this.y);
};


$(function() {
    Game.initialize("game",sprites,startGame);
});
*/
