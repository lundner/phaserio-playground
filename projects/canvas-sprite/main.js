var game = new Phaser.Game(400, 300, Phaser.AUTO, 'sprite-canvas');

Game = {};
Game.Start = function(game) {

	var _spriteCanvas = null;

	this.create = function() {

		game.stage.backgroundColor = '00A2FF';

		_spriteCanvas = new SpriteCanvas({
			game: game,
			key: 'myCanvasSprite',
			renderFunction: function(canvas, layout) {
				var context = canvas.getContext('2d');
				canvas.width = canvas.width;
				context.fillStyle = '#ff0000';
				context.arc(layout.width/2, layout.height/2, layout.width / 2, 0, 2 * Math.PI);
				context.fill();					
			},
			updateFunction: function(canvas, layout) {

			}
		});
	};
};

var SpriteCanvas = function( params ) {

	var _canvas = null;
	var _frame = null;
	var _texture = null;
	var _baseTexture = null;
	var _context = null;
	var _phaserFrame = null;
	var _sprite = null;

	var _game = null;
	var _key = null;

	var _layout = {
		x: 0,
		y: 0,
		width: 40,
		height: 40
	};

	this.getSprite = function() {
		return _sprite;
	};

	var _add = function() {
		_sprite = game.add.sprite(_game.world.width / 2, _game.world.height / 2, _texture, _phaseFrame);
		_sprite.anchor.setTo(0.5, 0.5);
		return _sprite;
	};

	var _setParams = function( params ) {
		_game = params.game;
		_key = params.key;
		_render = params.renderFunction || _render;
		_layout.x = params.x || _layout.x;
		_layout.y = params.y || _layout.y;
		_layout.width = params.width || _layout.width;
		_layout.height = params.height || _layout.height;
	};

	var _create = function( params ) {
		_setParams( params );

		_canvas = Phaser.Canvas.create(_layout.width, _layout.height, '', true);
		_frame = new PIXI.Rectangle(_layout.x, _layout.y, _layout.width, _layout.height);
		_baseTexture = new PIXI.BaseTexture.fromCanvas(_canvas);
		_texture = new PIXI.Texture(_baseTexture, _frame);
		_phaseFrame = new Phaser.Frame(0, _layout.x, _layout.y, _layout.width, _layout.height);

		_context = _canvas.getContext('2d');
		_render(_canvas, _layout);
		_add();
	};

	var _render = function(canvas, layout) {
		var context = canvas.getContext('2d');
		canvas.width = canvas.width;
		context.fillStyle = '#01CC01';
		context.fillRect(_layout.x, _layout.y, _layout.width, _layout.height);
		context.fill();		
	};

	_create( params );
};

game.state.add('start', Game.Start);
game.state.start('start');