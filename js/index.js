!function () {
	const canvas= document.querySelector('canvas');
	const c= canvas.getContext('2d');
	console.dir(c);
	
	canvas.width= window.innerWidth*.8;
	canvas.height= window.innerHeight*.8;

	/*c.fillRect(20, 20, 100, 100);
	c.fillRect(50, 50, 100, 100);

	c.beginPath();
	c.moveTo(100, 250);
	c.lineTo(500.5, 50);
	c.lineTo(500.5, 150.5);
	c.lineTo(600, 150.5);
	c.strokeStyle= "#ff0000";
	c.lineWidth = 1;
	c.stroke();

	c.globalAlpha = 0.2;
	for (var i = 0; i < 7; i++){
    c.beginPath();
    c.arc(175, 175, 20 + 20 * i, 0*Math.PI, Math.PI * 2, true);
    c.fill();
  }

	c.beginPath();
	c.globalAlpha = 1;
	c.strokeStyle= "transparent";
	c.arc(250, 250, 30, 0, Math.PI * 2, true);
  c.arc(250, 250, 15, 0, Math.PI * 2, true);
  c.fill('evenodd');
	
	c.strokeStyle= "blue";
	c.beginPath();
  c.arc(300, 300, 30, 0, Math.PI * 2, false);
  c.stroke();

  for (var i = 0; i <= 30; i++) {
  	const x= generateRandom(0, canvas.width),
  		y= generateRandom(0, canvas.height);
  	console.log(x, y);
  	c.beginPath();
	  c.arc(x, y, 30, 0, Math.PI * 2, false);
	  c.stroke();
  }*/
	
	var mouse= {
		x: undefined,
		y: undefined
	};

	var maxRadius= 40;

	var colorArray= [
		'#52AEA0',
		'#224E6A',
		'#627E8F',
		'#FFB0A2',
		'#737373'
	];

	window.addEventListener('mousemove', function(e) {
		mouse.x= e.x;
		mouse.y= e.y;
		console.log(e.x, e.y)
	});
	window.addEventListener('resize', function(e) {
		canvas.width= window.innerWidth*.8;
		canvas.height= window.innerHeight*.8;
		init();
	});
	function Circle ( x, y, dx, dy, r ) {
		this.x= x;
		this.y= y;
		this.dx= dx;
		this.dy= dy;
		this.r= r;
		this.minR= r;
		this.color= colorArray[Math.floor(Math.random() * colorArray.length)];

		this.draw= function() {
			c.beginPath();
		  c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		  c.fillStyle= this.color;
		  c.fill();
		}

		this.update= function() {
			if( this.x + this.r > canvas.width || this.x - this.r < 0 ) {
		  	this.dx= -this.dx;
		  }
		  if( this.y + this.r > canvas.height || this.y - this.r < 0 ) {
		  	this.dy= -this.dy;
		  }
		  this.x+= this.dx;
		  this.y+= this.dy;
			
			if( mouse.x - this.x < 50 && mouse.x - this.x > -50 
				&& mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
				// console.log(mouse.x-50, mouse.x+50)
				// c.clearRect(mouse.x-50, mouse.y-50, mouse.x+50, mouse.y+50);
				if( this.r < maxRadius ) this.r+= 1;
			} else if( this.r > this.minR ) {
				this.r-= 1;
			}

		  this.draw();
		}


	}
	var circleArray= [];
	function init() {
		
		for (var i = 0; i < 800; i++) {
			var radius= Math.random()*3 +1
				, x= Math.random() * (canvas.width - radius*2) + radius
				, y= Math.random() * (canvas.height - radius*2) + radius
				, dx= (Math.random()-0.5)
				, dy= (Math.random()-0.5);
			circleArray[i]= new Circle(x, y, dx, dy, radius);
		}
	}


	console.log(canvas.width, canvas.height);
	init();
	animate();

	function animate () {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, innerHeight);
		
		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	  
	}

  function generateRandom (min, max) {
	  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
	  return ranNum;
	}
}()