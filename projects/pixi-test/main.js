console.log('starting ...');

var r, s, k, i, t, bg, fg, fg2, bf, pf, sf;
window.onload = function() {

	// init
	i = 0;
	r = new PIXI.autoDetectRenderer(1280, 300);
	s = new PIXI.Stage(0x00A2FF);
	document.body.appendChild(r.view);


	var _addBackground = function() {
		bf = new PIXI.BlurFilter();
		pf = new PIXI.PixelateFilter();
		pf.size = new PIXI.Point(6,6);

		bg = new PIXI.Sprite(PIXI.Texture.fromImage("../../other/kings-landing.jpg"));
		bg.position = new PIXI.Point(0, 0);
		bg.width = 1280;
		bg.anchor = new PIXI.Point(0, 0.38);
		bg.filters = [bf, pf];
		s.addChild(bg);
	};

	var _addForeground = function() {
		var px = new PIXI.PixelateFilter();
		px.size = new PIXI.Point(4,4);

		fg = new PIXI.Sprite(PIXI.Texture.fromImage("../../sprites/fg.png"));
		fg.position = new PIXI.Point(0, 50);
		fg.filters = [px];
		s.addChild(fg);
	};

	var _addForeground2 = function() {
		var fg2f = new PIXI.PixelateFilter();
		fg2f.size = new PIXI.Point(4,4);

		fg2 = new PIXI.Graphics();

		fg2.lineStyle(5, 0x3B4D10, 1);
		fg2.beginFill(0x6D803E);
		fg2.moveTo(0, 300);
		fg2.lineTo(0, 200);
		
		fg2.lineTo(100, 250);
		fg2.lineTo(400, 240);
		fg2.lineTo(410, 300);
		fg2.lineTo(450, 300);
		fg2.lineTo(450, 270);
		fg2.lineTo(490, 290);
		fg2.lineTo(800, 270);
		fg2.lineTo(1100, 230);
		fg2.lineTo(1120, 200);

		fg2.lineTo(1280, 230);
		fg2.lineTo(1280, 300);

		fg2.filters = [fg2f];

		fg2.endFill();


		s.addChild(fg2);
	}

	var _addPlayer = function() {
		sf = new PIXI.RGBSplitFilter();

		baseTexture = PIXI.BaseTexture.fromImage("../../sprites/skully_2.png", true, PIXI.scaleModes.NEAREST);
		texture = new PIXI.Texture(baseTexture);
		k = new PIXI.Sprite(texture);

		k.mask = null;
		// k.tint = 0xFF00FF;

		k.anchor = new PIXI.Point(0.5, 0.5);
		k.position = new PIXI.Point(640, 150);
		k.alpha = 0.8;
		// k.filters = [sf];
		s.addChild(k);
	};

	_addBackground();
	// _addForeground();
	_addForeground2();
	_addPlayer();

	s.addChild(new PIXI.Text('LITTLE ADVENTURE', {
		font: '30px Roboto',
		fill: '#00A2FF',
		stroke: '#FFFFFF',
		strokeThickness: 3
	}));


	var _animate = function() {
		i += 0.05;
		t++;
		var scale = Math.abs(Math.sin(i)) * 0.5 + 0.5;
		var jump = -1 * Math.abs(Math.sin(i*1.5)) * 50 + 190;
		var blur = Math.abs(Math.sin(i / 10)) * 20 * Math.random();

		// k.rotation += 0.1;
		// k.scale = new PIXI.Point(scale, scale);
		k.position.y = jump;

		bg.filters = Math.round(Math.random() * 100) % 1 === 0 ? [sf] : null;
		k.filters = Math.round(Math.random() * 100) % 1 === 0 ? [bf,pf] : null;
		k.filters = Math.round(Math.random() * 100) % 1 === 0 ? [bf,pf,sf] : null;

		// bf.blur = blur;

		r.render(s);
		requestAnimationFrame(_animate);
	};

	requestAnimationFrame(_animate);
};