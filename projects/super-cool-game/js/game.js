window.onload = function() {
	g = new Phaser.Game(s.WIDTH, s.HEIGHT, Phaser.AUTO, 'firstGame');
	g.state.add('load', Game.Load);
	g.state.add('play', Game.Play);
	g.state.start('load');
}

if(!window.Game) window.Game = {};
Game.Load = function(game) {

	var _sinCounter = 0;

	var startHere = null;
	var gameName = null;
	var background = null;
	var freakOn = false;
	var filter = [new PIXI.RGBSplitFilter()];

	this.preload = function() {
		game.load.image("background", "../../other/flowers.jpg");
	};

	this.create = function() {
		console.log('creating');
		game.stage.backgroundColor = '#00A2FF';

		background = game.add.image(g.width / 2, g.height / 2, 'background');
		background.anchor = new Phaser.Point(0.5, 0.5);


		gameName = game.add.text( g.width / 2, g.height / 2, 'SUPER COOL GAME', {
			font: '60px Bangers',
			fill: '#BBF1BB'
		});

		gameName.anchor = new Phaser.Point(0.5,0.5);

		startHere = game.add.text( g.width / 2, (g.height / 2) + 75, 'CLICK HERE TO START!', {
			font: '30px Bangers',
			fill: '#fff'
		});

		startHere.anchor = new Phaser.Point(0.5, 0.5);
		startHere.inputEnabled = true;

		startHere.events.onInputDown.add(_startPlayState, this);
		startHere.events.onInputOver.add(function() {
			_setFreak(true);
		});
		startHere.events.onInputOut.add(function() {
			_setFreak(false);
		});
	};

	var _startPlayState = function() {
		g.state.start('play');
	};

	var _scaleStartHere = function() {
		startHere.scale = new Phaser.Point(this, this);
	};

	var _setFreak = function(on) {
		freakOn = on;
	};

	this.update = function() {
		var scale = Math.abs(Math.sin(_sinCounter++ / 10) / 5) + 1; 
		background.filters = freakOn ? filter : null;
		gameName.filters = freakOn ? filter : null;
		gameName.angle = freakOn ? gameName.angle + 10 : 0;
		background.scale = freakOn ? new Phaser.Point(-1 * scale, -1 * scale) : new Phaser.Point(1,1);
	};
};

Game.Play = function(game) {
	this.create = function() {
		game.stage.backgroundColor = '#BBF1BB';
	};
}
