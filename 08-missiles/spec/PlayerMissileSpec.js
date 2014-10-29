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
		var pm = new PlayerMissile(1,17);
		board.add(pm);
		pm.step(0.01);
		expect(pm.y).toEqual(0);
		pm.step(1);
		expect(board.remove).toHaveBeenCalled();
	});

	it("PlayerMissile.draw()", function(){
		SpriteSheet = { map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } }, draw: function(){} }
		var board = new GameBoard();
		spyOn(SpriteSheet,"draw").andCallThrough();
		var pm = new PlayerMissile(1,17);
		board.add(pm);
		pm.step(0.01);
		pm.draw();
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toBe('missile');
		expect(SpriteSheet.draw.calls[0].args[2]).toBe(0);
		expect(SpriteSheet.draw.calls[0].args[3]).toBe(0);
	});

});


