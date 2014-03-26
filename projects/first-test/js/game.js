var game = new Phaser.Game(static.WIDTH, static.HEIGHT, Phaser.Canvas, 'mygame');

game.state.add('boot', Game.Boot);
game.state.add('load', Game.Load);
game.state.add('play', Game.Play);

game.state.start('boot');