Game.Play = function(game) {
	$blue = null; // make it local 
	var $blocks = null;
	var blocks = ['green', 'orange', 'purple', 'red'];
	var filter = null;
	var background = null;
	var input = null;

	var settings = {
		backgroundHeight: 0.2,
		backgroundColor: '#00A2FF',
		gravity: 0.8,
		bounce: 0.8,
		moveStepSize: 0.1,
		worldWidth: 1400,
		worldHeight: 1400
	};

	this.preload = function() {
		game.load.image('blue', 'sprites/blue.png');
		game.load.image('green', 'sprites/green.png');
		game.load.image('orange', 'sprites/orange.png');
		game.load.image('purple', 'sprites/purple.png');
		game.load.image('red', 'sprites/red.png');
	};

	this.create = function() {
		game.load.script('filter', '/filters/Fire.js');

		game.stage.backgroundColor = settings.backgroundColor;

		$blocks = game.add.group();

		_addInput();
		// _addPlayer();
		_addCanvasPlayer();
		_addPhysics();
		_addRandomBlocks(2000);
		// _addBackground();
		// _addFire();
	};

	this.update = function() {
		// $blue.rotation = game.physics.arcade.moveToPointer($blue, 60, game.input.activePointer, 500);
		if (input.upKey.isDown && $blue.y > 0) {
			$blue.y -= settings.moveStepSize;
		}
		if (input.downKey.isDown && $blue.y < game.world.bounds.height) {
			$blue.y += settings.moveStepSize;
		}
		if (input.leftKey.isDown && $blue.x > 0) {
			$blue.x -= settings.moveStepSize;
		}
		if (input.rightKey.isDown && $blue.x < game.world.bounds.width) {
			$blue.x += settings.moveStepSize;
		}

		$blue.angle++;

		if (filter) {
			filter.update();
		}
   		game.physics.arcade.collide($blocks, $blue, _hit);
	};

	var _hit = function($sprite1, $sprite2) {
		// $sprite1.scale.x *= 1.01;
		// $sprite1.scale.y *= 1.01;
		$sprite2.kill();

	};

	var _addRandomBlocks = function(count) {
		for (var i = 0; i < count; i++) {
			var x = Math.random() * game.world.width;
			var y = Math.random() * game.world.height;
			var block = blocks[Math.floor(Math.random() * blocks.length)];
			$block = game.add.sprite(x, y, block);
			game.physics.enable($block, Phaser.Physics.ARCADE);
			// game.physics.arcade.collide($blue, $block, _collideCallback);
			$block.body.bounce.setTo(1,1);
			$block.body.collideWorldBounds = true;
			$blocks.add($block);
		}
	};

	var _addPlayer = function() {
		$blue = game.add.sprite(game.world.width / 2, game.world.height / 2, 'blue');
		$blue.anchor.setTo(.5, .5);
		game.physics.enable($blue, Phaser.Physics.ARCADE);
		$blue.body.collideWorldBounds = true;
		$blue.body.bounce.setTo(1,1);
		game.camera.follow($blue);
	};

	var _addCanvasPlayer = function() {
		var canvas = Phaser.Canvas.create(size, size, '', true);
		var size = 50;

		var frame = new PIXI.Rectangle(0, 0, size, size);

		var baseTexture = new PIXI.BaseTexture.fromCanvas(canvas);
		var context = canvas.getContext('2d');

		canvas.width = size;
		canvas.height = size;
		context.beginPath();
		// context.arc(0, 0, 5, 0, Math.PI, false);
		context.fillStyle = '#01CC01';
		context.fillRect(0,0,size,size);
		context.stroke();

		var texture = new PIXI.Texture(baseTexture, frame);
		var textureFrame = new Phaser.Frame(0, 0, 0, this.game.width, this.game.height, 'debug', game.rnd.uuid());
		// var $sprite = new Phaser.Sprite(game, 0, 0, key, frame);

		$blue = game.add.sprite(game.world.width / 2, game.world.height / 2, texture, textureFrame);
		game.physics.enable($blue, Phaser.Physics.ARCADE);

		// PIXI.updateWebGLTexture(baseTexture, this.game.renderer.gl);
		$blue.anchor.setTo(.5, .5);
		$blue.body.collideWorldBounds = true;
		// $blue.body.bounce.set(settings.bounce);
		game.camera.follow($blue);
	};

	var _addInput = function() {
		input = {
			upKey: game.input.keyboard.addKey(Phaser.Keyboard.UP),
			downKey: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			leftKey: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
			rightKey: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
		};
	};

	var _addPhysics = function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.arcade.gravity.y = 100;
		// game.physics.arcade.gravity.x = 100;
		game.world.setBounds(0, 0, 1400, 1400);
		game.camera.x = 700;
		game.camera.y = 700;
	};

	var _addBackground = function() {
		var height = (1 - settings.backgroundHeight) * game.height;
		background = game.add.sprite(0, height);
		background.width = game.width;
		background.height = game.height;
	};

	var _addFire = function() {
		var height = settings.backgroundHeight * game.height;
		filter = game.add.filter('Fire', background.width, height);
		filter.alpha = 0.0;
		background.filters = [filter];
	};
};