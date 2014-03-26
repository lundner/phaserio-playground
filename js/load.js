Game = {};

Game.Boot = function(game) {

	this.preload = function() {},

	this.create = function() {
		game.stage.backgroundColor = '#01CC01';
		game.state.start('load');
	}
};

Game.Load = function(game) {
	this.game = game;

	this.preload = function() {
		label2 = game.add.text(game.width / 2, game.height / 2, 'LOADING', {
			font: '60px Roboto',
			fill: '#BBF1BB'
		});
		label2.anchor.setTo(0.5, 0.5);
	};

	this.create = function() {
		setTimeout(function() {
			game.state.start('play');
		}, 1000);
	};
}