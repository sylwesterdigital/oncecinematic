
// Reference to the creative's various properties and elements.
var creative = {};


/**
 * Called on the window load event.
 */
function preInit() {
  setupDom();

  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
}

/**
 * Set up references to DOM elements.
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.exit = document.getElementById('exit');
  creative.dom.image0 = document.getElementById('main-img-0');
}

/**
 * The Enabler is now initialized and any extra modules have been loaded.
 */
function init() {
  addListeners();
  // Polite loading
  if (Enabler.isVisible()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
  }
}

/**
 * Add appropriate listeners after the creative's DOM has been set up.
 */
function addListeners() {
  creative.dom.exit.addEventListener('click', exitClickHandler);
}


function animation() {
	
	// The canvas element we are drawing into.      
	var $canvas = $('#canvas');
	var $canvas2 = $('#canvas2');
	var $canvas3 = $('#canvas3');
	var ctx2 = $canvas2[0].getContext('2d');
	var ctx = $canvas[0].getContext('2d');
	var w = $canvas[0].width,
		h = $canvas[0].height;
	var img = new Image();
	var W = 970;
	var H = 250;

	// A puff.
	var Puff = function (p) {
		var opacity,
			sy = (Math.random() * (H / 2)) >> 0,
			sx = (Math.random() * (W / 2)) >> 0;

		this.p = p;

		this.move = function (timeFac) {
			p = this.p + 0.3 * timeFac;
			opacity = (Math.sin(p * 0.05) * 0.5);
			if (opacity < 0) {
				p = opacity = 0;
				sy = (Math.random() * (H / 2)) >> 0;
				sx = (Math.random() * (W / 2)) >> 0;
			}
			this.p = p;
			ctx.globalAlpha = opacity;
			ctx.drawImage($canvas3[0], sy + p, sy + p, (W / 2) - (p * 2), (H / 2) - (p * 2), 0, 0, w, h);
		};
	};

	var puffs = [];
	var sortPuff = function (p1, p2) {
		return p1.p - p2.p;
	};
	puffs.push(new Puff(0));
	puffs.push(new Puff(20));
	puffs.push(new Puff(40));

	var newTime, oldTime = 0,
		timeFac;

	var loop = function () {
		newTime = new Date().getTime();
		if (oldTime === 0) {
			oldTime = newTime;
		}
		timeFac = (newTime - oldTime) * 0.1;
		if (timeFac > 3) {
			timeFac = 3;
		}
		oldTime = newTime;
		puffs.sort(sortPuff);

		for (var i = 0; i < puffs.length; i++) {
			puffs[i].move(timeFac);
		}
		ctx2.drawImage($canvas[0], 0, 0, W, H);
		setTimeout(loop, 10);
	};

	var $canvas3 = $('#canvas3');
	var ctx3 = $canvas3[0].getContext('2d');
	$(img).bind('load', null, function () {
		ctx3.drawImage(img, 0, 0, W, H);
		loop();
	});
	img.src = 'images/nebula.jpg';	
}


/**
 *  Shows the ad.
 */
function show() {
  creative.dom.exit.style.display = "block";
	$('#wrapper').css('display','block')
  //creative.dom.wrapper.style.visibility  = 'visible';

	animation();
	
	
	
	
	
	
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

function exitClickHandler() {
  Enabler.exit('BackgroundExit');
}

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);