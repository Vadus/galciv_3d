var VIEW = {
	GALAXY : "GALAXY",
	SYSTEM : "SYSTEM",
	PLANET : "PLANET"
};
	
var OBJECT_TYPE = {
	STAR : "STAR",
	PLANET : "PLANET"
};

function Star() {
	this.id = 0;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.size = 5;
	//default
	this.planets = new Array();
	this.group = undefined;
	this.starSphere = undefined;
	this.starLight = undefined;
}

Star.prototype.getObjectType = function(){
	return OBJECT_TYPE.STAR;
};

Star.prototype.getStar = function(){
	return this;
};

Star.prototype.getMesh = function() {

	return this.starSphere;
};

Star.prototype.getSize = function() {

	return this.size;
};

Star.prototype.onClick = function() {

	console.log("clicked at star " + this.id + ", pos: " + this.x + "," + this.y + "," + this.z, ", planets: " + this.planets.length);
};

Star.prototype.isActive = function() {
};

Star.prototype.activate = function() {
};

Star.prototype.deactivate = function() {
};

Star.prototype.setVisible = function(visible) {
	
	this.group.traverse(function(child) {
		child.visible = visible;
	});
	
};

Star.prototype.updatePosition = function(factor) {
	
	/*
	if(this.origX === undefined){
		this.origX = this.x;
		this.origY = this.y;
		this.origZ = this.z;
	}
	
	if(factor === undefined){
		this.x = this.origX;
		this.y = this.origY;
		this.z = this.origZ;
	}
	*/
	//else{
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
	//}
	
	this.group.traverse(function(child) {
		child.position.x *= factor;
		child.position.y *= factor;
		child.position.z *= factor;
	});
	
	for(var p in this.planets){
		var planet = this.planets[p];
		planet.x = this.x;
		planet.y = this.y;
		planet.z = this.z;
	}
};

var PLANET_TYPE = {
	H : "H",  // Desert
	J : "J", // Gas Giant
	K : "K", // Barren
	L : "L", // Barely habitable
	M : "M", // Terrestrial
	N : "N", // Hot & toxic
	O : "O", // Water World
	P : "P" // Ice World
	/*
	J : 5, //Mercury
	C : 4, //Venus
	M : 8, //Earth
	K : 6, //Mars
	A : 2, //Jupter
	B : 3, //Saturn
	W : 7 // Water World
	*/
};

function Planet(id, star, type, size, radius) {
	this.id = id;
	this.star = star;
	this.size = size;
	// 1 - 5
	this.radius = radius;
	this.type = type;
	this.x = star.x;
	this.y = star.y;
	this.z = star.z;
	this.angle = Math.random() * 360;
	this.speed = Math.random() * 0.005 / this.id;
	this.group = undefined;
	this.planetSphere = undefined;
	this.cloudSphere = undefined;
	this.planetGlow = undefined;
	this.ellipse = undefined;
}

Planet.prototype.getStar = function() {

	return this.star;
};

Planet.prototype.getObjectType = function(){
	return OBJECT_TYPE.PLANET;
};

Planet.prototype.updatePos = function(angle) {
	this.angle = angle;
	this.x = parseInt(this.star.x) + this.radius * Math.cos(this.angle);
	this.y = parseInt(this.star.y) + (this.radius - (this.radius * 0.2)) * Math.sin(this.angle);
	this.z = this.star.z;
};

Planet.prototype.getMesh = function() {

	return this.planetSphere;
};

Planet.prototype.getSize = function() {

	return this.size;
};

Planet.prototype.onClick = function() {

	console.log("clicked at planet");
};

Planet.prototype.isActive = function() {
	return this.planetGlow.visible == true;
};

Planet.prototype.activate = function() {
	this.planetGlow.visible = true;
};

Planet.prototype.deactivate = function() {
	this.planetGlow.visible = false;
};

Planet.prototype.setVisible = function(visible) {
	
	if( this.group === undefined || this.planetGlow === undefined ){
		return;
	};
	
	//console.log("setting visibility of planet " + this.star.id + "," + this.id + " to " + visible);

	//save visibility of planetGlow
	var glowVisible = visible == true ? this.planetGlow.visible : false;

	this.group.traverse(function(child) {
		child.visible = visible;
	});

	//restore visibility of planetGlow
	this.planetGlow.visible = glowVisible;
	
};

Planet.prototype.isVisible = function() {
	return this.planetSphere.visible == true;
};

Planet.prototype.createEllipse = function(){
	
	var material = new THREE.LineBasicMaterial({
		color : 0xAAAAAA,
		opacity : 1
	});
	var ellipseCurve = new THREE.EllipseCurve(this.star.x, this.star.y, this.radius, this.radius - (this.radius * 0.2), 0, 2.0 * Math.PI, false);
	var ellipsePath = new THREE.CurvePath();
	ellipsePath.add(ellipseCurve);
	var ellipseGeometry = ellipsePath.createPointsGeometry(100);
	ellipseGeometry.computeTangents();
	var ellipse = new THREE.Line(ellipseGeometry, material);
	ellipse.position.z = this.star.z;
	
	return ellipse;
};

function Three_Galaxy(container) {

	this.container = container;

	this.mouse = {
		x : 0,
		y : 0
	};

	///////////
	// SCENE //
	///////////
	this.scene = new THREE.Scene();
	
	this.view = VIEW.GALAXY;

	////////////
	// CAMERA //
	////////////

	// set the view size in pixels (custom or according to window size)
	// var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 300;
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	// camera attributes
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	// set up camera
	this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	// add the camera to the scene
	this.scene.add(this.camera);
	// the camera defaults to position (0,0,0)
	// 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
	
	this.cameraDistance = 10000;
	
	this.camera.position.set(0, 0, this.cameraDistance);
	this.camera.lookAt(this.scene.position);
	//save initial camera location
	this.cameraOrigin = this.camera.position.clone();

	//////////////
	// RENDERER //
	//////////////

	// create and start the renderer; choose antialias setting.
	this.renderer = new THREE.WebGLRenderer();

	this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	// attach renderer to the container div
	this.container.appendChild(this.renderer.domElement);

	////////////
	// EVENTS //
	////////////

	// automatically resize renderer
	THREEx.WindowResize(this.renderer, this.camera);
	// toggle full-screen on given key press
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	this.light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 0.5);
	this.scene.add(this.light);

	// create a set of coordinate axes to help orient user
	//    specify length in pixels in each direction
	//this.scene.add(new THREE.AxisHelper(100));

	// start the renderer
	this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	// attach the render-supplied DOM element
	this.container.appendChild(this.renderer.domElement);

	this.clickable = [];
	this.activeItem = undefined;
	this.cameraAttention = undefined;
	this.cameraAttentionPosition = undefined;

	this.stars = new Array();

	//////////////
	// CONTROLS //
	//////////////

	// move mouse and: left   click to rotate,
	//                 middle click to zoom,
	//                 right  click to pan
	this.controls = new THREE.OrbitControls(this);
	
}

Three_Galaxy.prototype.setupStars = function(stars) {
	
	console.log("setupStars: stars = " + stars);
	
	if(stars === undefined){
		//default
		var star_1 = new Star();
		star_1.planets[0] = new Planet(1, star_1, PLANET_TYPE.J, 1, 100);
		star_1.planets[1] = new Planet(2, star_1, PLANET_TYPE.C, 1, 200);
		star_1.planets[2] = new Planet(3, star_1, PLANET_TYPE.M, 1, 300);
		star_1.planets[3] = new Planet(4, star_1, PLANET_TYPE.K, 1, 400);
	
		this.stars[0] = star_1;
	
		
	}
	else{
		for (var is in stars.starSystem) {
			var s = stars.starSystem[is];
			console.log("setupStars: star.id = " + s.id);
			var star = new Star();
			star.id = s.id;
			star.x = s.posX * 50;
			star.y = s.posY * 50;
			star.z = (Math.random() * 400) - 200;
			
			var planets = new Array();
			if(s.planets != undefined){
				for (var ip in s.planets) {
					var p = s.planets[ip];
					//console.log("load planet " + p.id);
					if(p.id === undefined){
						//alert("1 Planet System at Star " + star.id + ": Planet " + s.planets.id);
						var planet = new Planet(s.planets.id, star, s.planets.type, s.planets.size, s.planets.id * 100);
						planet.setVisible(false);
						planets.push(planet);
						break;
					}
					else{
						//alert("Planet at Star " + star.id + ": Planet " + p.id + ", p = " + p);
						var planet = new Planet(p.id, star, p.type, p.size, p.id * 100);
						planet.setVisible(false);
						planets.push(planet);
					}
				}
			}
			star.planets = planets;
			this.stars.push(star);
		}
	};

	for (var i in this.stars) {
		var star = this.stars[i];

		this.setupStar(star);

		for (var i in star.planets) {
			var planet = star.planets[i];

			this.setupPlanet(planet);
		}
	}
	
	//this.setupShip(star_1.x, star_1.y, star_1.z + 200);
	
	this.setView(VIEW.GALAXY);
};

Three_Galaxy.prototype.setupStar = function(star) {

	//Star Body
	var sphereGeo = new THREE.SphereGeometry(star.size * 10, 32, 16);

	var colors = THREE.ImageUtils.loadTexture("img/sun-surface.jpg");
	//var bumpy = THREE.ImageUtils.loadTexture("img/sun_surface.jpg");
	var shiny = THREE.ImageUtils.loadTexture("img/sun-specular.png");

	var starMaterial = new THREE.MeshPhongMaterial({
		color : 0xffffff,
		map : colors,
		//bumpMap : bumpy,
		//bumpScale : 4,
		specular : 0xffff00,
		specularMap : shiny,
		emissive : 0xE3E771
	});

	var starSphere = new THREE.Mesh(sphereGeo, starMaterial);
	starSphere.position.set(star.x, star.y, star.z);

	starSphere.rotation.x = Math.PI / 2;

	// create a point light
	var starLight = new THREE.PointLight(0xFFFFFF, 0.01);

	starLight.position.set(star.x, star.y, star.z);

	var group = new THREE.Object3D();
	group.add(starSphere);
	group.add(starLight);

	this.scene.add(group);

	star.group = group;
	star.starSphere = starSphere;
	star.starLight = starLight;

	this.clickable.push(star);
};

Three_Galaxy.prototype.setupPlanet = function(planet) {

	//position in star system
	//planet position at ellipse

	planet.updatePos(planet.angle);

	var sphereGeo = new THREE.SphereGeometry(planet.size * 2, 64, 32);

	var surface = undefined;
	var topografics = undefined;
	var specularics = undefined;

	if (planet.type == PLANET_TYPE.M) {
		surface = "img/earth-day.jpg";
		topografics = "img/earth-topo.jpg";
		specularics = "img/earth-specular.jpg";
	} else if (planet.type == PLANET_TYPE.H) {
		surface = "img/planet_h_surface.jpg";
		topografics = "img/planet_h_bump.jpg";
	} else if (planet.type == PLANET_TYPE.J) {
		surface = "img/planet_j_surface.jpg";
		topografics = "img/planet_j_bump.jpg";
	} else if (planet.type == PLANET_TYPE.K) {
		surface = "img/planet_k_surface.jpg";
		topografics = "img/planet_k_bump.jpg";
	} else if (planet.type == PLANET_TYPE.L) {
		surface = "img/planet_l_surface.jpg";
		topografics = "img/planet_l_bump.jpg";
	} else if (planet.type == PLANET_TYPE.M) {
		surface = "img/planet_m_surface.jpg";
		topografics = "img/planet_m_bump.jpg";
	} else if (planet.type == PLANET_TYPE.N) {
		surface = "img/planet_n_surface.jpg";
		topografics = "img/planet_n_bump.jpg";
	} else if (planet.type == PLANET_TYPE.O) {
		surface = "img/planet_o_surface.jpg";
		topografics = "img/planet_o_bump.jpg";
	} else if (planet.type == PLANET_TYPE.P) {
		surface = "img/planet_p_surface.jpg";
		topografics = "img/planet_p_bump.jpg";
	}
	
	if(surface === undefined){
		alert("no texture for planet " + planet.star.id + "," + planet.id + ", type : " + planet.type);
	}

	var colors = THREE.ImageUtils.loadTexture(surface);
	var bumpy = THREE.ImageUtils.loadTexture(topografics);
	var shiny = null;
	if (specularics != undefined) {
		shiny = THREE.ImageUtils.loadTexture(specularics);
	}
	//var shiny = THREE.ImageUtils.loadTexture("img/earth-specular.jpg");

	var planetMaterial = new THREE.MeshPhongMaterial({
		color : 0xffffff,
		map : colors,
		bumpMap : bumpy,
		bumpScale : 4,
		specular : 0xffffff,
		specularMap : shiny,
		emissive : 0x888888
	});

	var planetSphere = new THREE.Mesh(sphereGeo, planetMaterial);
	planetSphere.position.set(planet.x, planet.y, planet.z);

	// add a cloud layer

	var cloudMaterial = new THREE.MeshBasicMaterial({
		map : THREE.ImageUtils.loadTexture("img/earth-clouds.png"),
		transparent : true
	});

	var cloudSphere = undefined;
	if (planet.type == PLANET_TYPE.M) {
		cloudSphere = new THREE.Mesh(sphereGeo.clone(), cloudMaterial);
		cloudSphere.scale.x = cloudSphere.scale.y = cloudSphere.scale.z = 1.005;
		cloudSphere.position.set(planet.x, planet.y, planet.z);
	}

	
	var planetGlowMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.BackSide } );
	var planetGlow = new THREE.Mesh( sphereGeo, planetGlowMaterial );
	planetGlow.position = planetSphere.position;
	planetGlow.scale.multiplyScalar(1.05);
	planetGlow.visible = false;
	/*
	// create glow/active sphere around planet
	//   that is within specially labeled script tags
	var customMaterial = new THREE.ShaderMaterial({
		uniforms : {
			"c" : {
				type : "f",
				value : 1.0
			},
			"p" : {
				type : "f",
				value : 4.0
			},
			glowColor : {
				type : "c",
				value : new THREE.Color(0xffff00)
			},
			viewVector : {
				type : "v3",
				value : this.camera.position
			}
		},
		vertexShader : document.getElementById('vertexShader_glow').textContent,
		fragmentShader : document.getElementById('fragmentShader_glow').textContent,
		side : THREE.FrontSide,
		blending : THREE.AdditiveBlending,
		transparent : true
	});

	

	var planetGlow = new THREE.Mesh(sphereGeo.clone(), customMaterial.clone());
	planetGlow.position = planetSphere.position;
	planetGlow.scale.multiplyScalar(1.2);
	planetGlow.visible = false;
	
	*/

	// add planets ellipse around star
	// use LineBasicMaterial if no dashes are desired

	var ellipse = planet.createEllipse();

	var group = new THREE.Object3D();
	group.add(planetSphere);
	if (cloudSphere != undefined) {
		group.add(cloudSphere);
	}
	group.add(planetGlow);
	group.add(ellipse);

	this.scene.add(group);

	planet.group = group;
	planet.planetSphere = planetSphere;
	planet.cloudSphere = cloudSphere;
	planet.planetGlow = planetGlow;
	planet.ellipse = ellipse;

	planet.planetSphere.rotation.x += 1;
	if (planet.cloudSphere != undefined) {
		planet.cloudSphere.rotation.x += 1;
	}
	planet.planetGlow.rotation.x += 1;

	this.clickable.push(planet);

};

Three_Galaxy.prototype.setupShip = function(x, y, z){
	
	var spaceShipMesh = "obj/spaceship/spacefighter_e.obj";
	var spaceShipSurface = "obj/spaceship/metal.jpg";

	var spaceShipTexture = new THREE.Texture();

	var loader = new THREE.ImageLoader(new THREE.LoadingManager());
	loader.load(spaceShipSurface, function(image) {

		spaceShipTexture.image = image;
		spaceShipTexture.needsUpdate = true;

	});

	// model
	var theScene = this.scene;

	var manager = new THREE.LoadingManager();
	var loader = new THREE.OBJLoader(manager);
	loader.load(spaceShipMesh, function(spaceShip) {

		spaceShip.traverse(function(child) {

			if ( child instanceof THREE.Mesh) {

				child.material.map = spaceShipTexture;

			}

		});

		spaceShip.position.x = x;
		spaceShip.position.y = y;
		spaceShip.position.z = z;
		theScene.add(spaceShip);

	});
};

Three_Galaxy.prototype.onClick = function(event) {

	//check if anything clickable was clicked

	// update the mouse variable
	this.mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
	this.mouse.y = -(event.clientY / window.innerHeight ) * 2 + 1;

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
	projector.unprojectVector(vector, this.camera);
	var ray = new THREE.GalaxyRaycaster(this, vector);

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectGalaxy();

	console.log("Click intersects " + intersects.length + " targets");
	// if there is one (or more) intersections
	if (intersects.length > 0) {
		var galaxyItem = intersects[0].galaxyItem;

		//is this a new active Item?
		if (this.activeItem == undefined || this.activeItem.getMesh().id != galaxyItem.getMesh().id) {
			for (var i = 0; i < this.clickable.length; i++) {
				var item = this.clickable[i];
				item.deactivate();
			}
		}
		this.activeItem = galaxyItem;
		this.activeItem.activate();

		this.activeItem.onClick();
		
		this.updateCameraAttentionOn(this.activeItem, false);
		
	} else {
		//deactive all clickable items
		for (var i = 0; i < this.clickable.length; i++) {
			var item = this.clickable[i];
			item.deactivate();
		}
		this.activeItem = undefined;
	}
};

Three_Galaxy.prototype.onDoubleClick = function(event) {

	console.log("doubleClick");
	
	//TODO: introduce view states. Galatic, System and Planet View. 
	// in Galactic View: Show only Stars of Systems and other Galactic Objects
	// in System View  : Show only this Star and Planets and other System Objects
	// in Planet View  : Show only this Planet. Information about Population etc. is shown
	
	var formerActiveItem = this.activeItem;
	
	this.onClick(event);

	if (this.activeItem === undefined) {
		
		//double click at nothing, switch to active star, if there was one
		if(formerActiveItem != undefined && formerActiveItem.getObjectType() == OBJECT_TYPE.PLANET){
			this.activeItem = formerActiveItem.getStar();
			this.activeItem.activate();
			this.updateCameraAttentionOn(this.activeItem, true);
		}
		else{
			this.camera.position = this.cameraOrigin.clone();
			this.cameraAttention = this.scene.position;
			this.updateCameraAttentionOn(undefined, true);
			//this.cameraAttentionPosition = undefined;
		}
	} else {
		this.updateCameraAttentionOn(this.activeItem, true);
	}
};

Three_Galaxy.prototype.updateCameraAttentionOn = function(galacticItem, switchView) {

	if (galacticItem === undefined) {
		this.cameraAttention = undefined;
		this.cameraAttentionPosition = undefined;
		return;
	}
	
	if(switchView){
		
		if(galacticItem.getObjectType() == OBJECT_TYPE.STAR){
			this.cameraDistance = 5 * 150; // maximal 5 planets in a system
			this.setView(VIEW.SYSTEM);
		}
		else if (galacticItem.getObjectType() == OBJECT_TYPE.PLANET){
			this.cameraDistance = galacticItem.getSize() * 100 / 3;
			this.setView(VIEW.PLANET);
		}
		
		this.cameraAttentionPosition = this.camera.position;
		this.cameraAttentionPosition.set(this.cameraAttention.x, this.cameraAttention.y - this.cameraDistance, this.cameraAttention.z + this.cameraDistance);
		this.camera.position = this.cameraAttentionPosition;
	}
	
	if(this.view == VIEW.PLANET && galacticItem.getObjectType() == OBJECT_TYPE.PLANET){
		//follow planet with camera
		this.cameraAttentionPosition = this.camera.position;
		this.cameraAttentionPosition.set(this.cameraAttention.x, this.cameraAttention.y - this.cameraDistance, this.cameraAttention.z + this.cameraDistance);
		this.camera.position = this.cameraAttentionPosition;
		console.log("planetary view, camera pos: " + this.camera.position.x + "," + this.camera.position.y + "," + this.camera.position.z);
	}
	
	this.cameraAttention = galacticItem.getMesh().position;
	this.camera.lookAt(this.cameraAttention);
};

Three_Galaxy.prototype.setView = function(view){
	
	console.log("set view to " + view);
	if(this.activeItem != undefined){
		console.log("activeItem is " + this.activeItem.getObjectType() + " " + this.activeItem.id);
	}
	
	//set all invisible
	for (var i in this.stars) {
		var star = this.stars[i];
		
		for (var i in star.planets) {
			var planet = star.planets[i];
			planet.setVisible(false);
		}
		//star.setVisible(false);
	}
	
	//this.view = view;
	
	if(view == VIEW.GALAXY){
		console.log("showing galaxy with " + this.stars.length + " stars");
		
		if(this.cameraAttention === undefined){
			//set camera attention to closest star to camera
			var minDistanceToCamera = undefined;
			var cameraAttentionItem = undefined;
			for (var i in this.stars) {
				var star = this.stars[i];
				var dist = star.getMesh().position.distanceTo(this.camera.position);
				if(minDistanceToCamera === undefined){
					minDistanceToCamera = dist;
					cameraAttentionItem = star;
				}
				else if (dist < minDistanceToCamera){
					minDistanceToCamera = dist;
					cameraAttentionItem = star;
				}
			}
			console.log("Setting camera attention to " + cameraAttentionItem.getObjectType() + " " + cameraAttentionItem.id
			+ " at " + cameraAttentionItem.getMesh().position.x + "," + cameraAttentionItem.getMesh().position.y  + "," + cameraAttentionItem.getMesh().position.z);
			this.updateCameraAttentionOn(cameraAttentionItem, false);
		}
		
		/*
		for (var i in this.stars) {
			var star = this.stars[i];
			
			if(this.view != VIEW.GALAXY){
				//star.updatePosition();
				//star.updatePosition(0.25);
			}
			//star.setVisible(true);
			
			
		}
		*/
	}
	else if (view == VIEW.SYSTEM){
		//set all stars far away from each other
		for (var i in this.stars) {
			var star = this.stars[i];
			if(this.view == VIEW.GALAXY){
				//star.updatePosition(4);
			}
			//star.setVisible(true);
			
			//set planets visible
			if(this.activeItem != undefined && this.activeItem === star){
				
				console.log("showing system of star " + star.id + " with " + star.planets.length + " planets");
				
				for (var p in star.planets) {
					var planet = star.planets[p];
					
					//remove old planet ellipses
					planet.group.remove(planet.ellipse);
					this.scene.remove(planet.ellipse);
					//recreate planet ellipses for new star location
					planet.ellipse = planet.createEllipse();
					this.scene.add(planet.ellipse);
					planet.group.add(planet.ellipse);
					
					planet.setVisible(true);
				}
			}
		}
	}
	else if (view == VIEW.PLANET){
		
		if(this.activeItem != undefined){
			var star = this.activeItem.getStar();
			
			console.log("showing system of star " + star.id + " with " + star.planets.length + " planets");
				
			for (var p in star.planets) {
				var planet = star.planets[p];
				
				//remove old planet ellipses
				planet.group.remove(planet.ellipse);
				this.scene.remove(planet.ellipse);
				//recreate planet ellipses for new star location
				planet.ellipse = planet.createEllipse();
				this.scene.add(planet.ellipse);
				planet.group.add(planet.ellipse);
				
				planet.setVisible(true);
			}
		}
	}
	this.view = view;
};

Three_Galaxy.prototype.render = function() {

	this.renderer.render(this.scene, this.camera);

};

Three_Galaxy.prototype.update = function() {

	//for (var i in this.stars) {
	//	var star = this.stars[i];
	if(this.activeItem != undefined){
		var star = this.activeItem.getStar();
		for (var i in star.planets) {
			var planet = star.planets[i];

			//position at ellipse
			//planet.updatePos(planet.angle + 0.001);
			planet.updatePos(planet.angle + planet.speed);
			
			/*
			planet.ellipse.position.x = planet.star.x;
			planet.ellipse.position.y = planet.star.y;
			planet.ellipse.position.z = planet.star.z;
			*/
			
			planet.planetSphere.position.x = planet.x;
			planet.planetSphere.position.y = planet.y;
			planet.planetSphere.position.z = planet.z;

			planet.planetSphere.rotation.y += 0.0050;
			if (planet.cloudSphere != undefined) {
				planet.cloudSphere.rotation.y += 0.0040;
				planet.cloudSphere.position.x = planet.x;
				planet.cloudSphere.position.y = planet.y;
				planet.cloudSphere.position.z = planet.z;
			}
		}
	}
	
	if(this.controls.getState() == -1 
	&& this.view == VIEW.PLANET && this.activeItem != undefined && this.activeItem.getObjectType() == OBJECT_TYPE.PLANET){
		this.updateCameraAttentionOn(this.activeItem, false);
	}
	
	/*
	if (this.cameraAttentionPosition != undefined && this.controls.getState() == -1) {

		this.updateCameraAttentionOn(this.activeItem, false);
	}
	*/

	this.controls.update(this.cameraAttention);
};

Three_Galaxy.prototype.getContainer = function() {
	return this.container;
};

Three_Galaxy.prototype.getScene = function() {
	return this.scene;
};

Three_Galaxy.prototype.getRenderer = function() {
	return this.renderer;
};

Three_Galaxy.prototype.getControls = function() {
	return this.controls;
};

