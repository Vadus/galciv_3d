function Star() {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.size = 5; //default
	this.planets = new Array();
	this.group = undefined;
	this.starSphere = undefined;
	this.starLight = undefined;
}

Star.prototype.getDistanceTo = function(position) {

	var x1 = this.x;
	var y1 = this.y;
	var z1 = this.z;

	var x2 = position.x;
	var y2 = position.y;
	var z2 = position.z;

	//sqrt((x1-x2)² + (y1-y2)² + (z1-z2)²)
	return dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) + Math.pow((z1 - z2), 2));
};

Star.prototype.getMesh = function() {

	return this.starSphere;
};

Star.prototype.getSize = function() {

	return this.size;
};


Star.prototype.onClick = function() {

	console.log("clicked at star");
};

Star.prototype.isActive = function() {
}

Star.prototype.activate = function() {
}

Star.prototype.deactivate = function() {
}

Star.prototype.setVisible = function(visible) {
}

Planet.prototype.isVisible = function() {
	return true;
}

function Planet(star, size, radius) {
	this.star = star;
	this.size = size; // 1 - 5
	this.radius = radius;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.angle = Math.random() * 360;
	this.group = undefined;
	this.planetSphere = undefined;
	this.cloudSphere = undefined;
	this.planetGlow = undefined;
	this.ellipse = undefined;

}

Planet.prototype.updatePos = function(angle) {
	this.angle = angle;
	this.x = parseInt(this.star.x) + this.radius * Math.cos(this.angle);
	this.y = parseInt(this.star.y) + (this.radius - (this.radius * 0.2)) * Math.sin(this.angle);
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
}

Planet.prototype.activate = function() {
	this.planetGlow.visible = true;
}

Planet.prototype.deactivate = function() {
	this.planetGlow.visible = false;
}

Planet.prototype.setVisible = function(visible) {

	//save visibility of planetGlow
	var glowVisible = visible == true? this.planetGlow.visible: false;

	this.group.traverse(function(child) {
		child.visible = visible;
	});

	//restore visibility of planetGlow
	this.planetGlow.visible = glowVisible;
}

Planet.prototype.isVisible = function() {
	return this.planetSphere.visible == true;
}
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
	this.camera.position.set(0, -150, 400);
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
	this.setupStars();

	//////////////
	// CONTROLS //
	//////////////

	// move mouse and: left   click to rotate,
	//                 middle click to zoom,
	//                 right  click to pan
	this.controls = new THREE.OrbitControls(this);

};

Three_Galaxy.prototype.setupStars = function() {

	var star_1 = new Star();
	star_1.planets[0] = new Planet(star_1, 1, 100);
	star_1.planets[1] = new Planet(star_1, 1, 200);

	this.stars[0] = star_1;

	for (var i in this.stars) {
		var star = this.stars[i];

		this.setupStar(star);

		for (var i in star.planets) {
			var planet = star.planets[i];

			this.setupPlanet(planet);
		}

	}
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
	var starLight = new THREE.PointLight(0xFFFFFF);

	starLight.position.set(star.x, star.y, star.z);

	var group = new THREE.Object3D();
	group.add(starSphere);
	group.add(starLight);

	this.scene.add(group);

	star.group = group;
	star.starSphere = starSphere;
	star.starLight = starLight;

	this.clickable.push(star);
}

Three_Galaxy.prototype.setupPlanet = function(planet) {

	//position in star system
	//planet position at ellipse

	planet.updatePos(planet.angle);

	var sphereGeo = new THREE.SphereGeometry(planet.size * 10, 64, 32);

	var colors = THREE.ImageUtils.loadTexture("img/earth-day.jpg");
	var bumpy = THREE.ImageUtils.loadTexture("img/earth-topo.jpg");
	var shiny = THREE.ImageUtils.loadTexture("img/earth-specular.jpg");

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

	var cloudSphere = new THREE.Mesh(sphereGeo.clone(), cloudMaterial);
	cloudSphere.scale.x = cloudSphere.scale.y = cloudSphere.scale.z = 1.005;
	cloudSphere.position.set(planet.x, planet.y, planet.z);

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

	// add planets ellipse around star
	// use LineBasicMaterial if no dashes are desired

	var material = new THREE.LineBasicMaterial({
		color : 0xAAAAAA,
		opacity : 1
	});
	var ellipseCurve = new THREE.EllipseCurve(planet.star.x, planet.star.y, planet.radius, planet.radius - (planet.radius * 0.2), 0, 2.0 * Math.PI, false);
	var ellipsePath = new THREE.CurvePath();
	ellipsePath.add(ellipseCurve);
	var ellipseGeometry = ellipsePath.createPointsGeometry(100);
	ellipseGeometry.computeTangents();
	var ellipse = new THREE.Line(ellipseGeometry, material);

	var group = new THREE.Object3D();
	group.add(planetSphere);
	group.add(cloudSphere);
	group.add(planetGlow);
	group.add(ellipse);

	this.scene.add(group);

	planet.group = group;
	planet.planetSphere = planetSphere;
	planet.cloudSphere = cloudSphere;
	planet.planetGlow = planetGlow;
	planet.ellipse = ellipse;

	planet.planetSphere.rotation.x += 1;
	planet.cloudSphere.rotation.x += 1;
	planet.planetGlow.rotation.x += 1;

	this.clickable.push(planet);

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
		if(this.activeItem == undefined || this.activeItem.getMesh().id != galaxyItem.getMesh().id){
			for(var i = 0; i < this.clickable.length; i++){
				var item = this.clickable[i]
				item.deactivate();
			}
		}
		this.activeItem = galaxyItem;
		this.activeItem.activate();
		
		galaxyItem.onClick()
	}
	else{
		//deactive all clickable items
		for(var i = 0; i < this.clickable.length; i++){
			var item = this.clickable[i]
			item.deactivate();
		}
		this.activeItem = undefined;
	}
};

Three_Galaxy.prototype.onDoubleClick = function(event) {
	
	console.log("doubleClick");
	
	this.updateCameraAttention();
}

Three_Galaxy.prototype.updateCameraAttention = function(){
	
	if(this.activeItem === undefined){
		this.camera.position = this.cameraOrigin.clone();
		this.cameraAttention = this.scene.position;
		this.cameraAttentionPosition = undefined;
		return;
	}
	
	this.cameraAttention = this.activeItem.getMesh().position;
	
	var cameraDistance = this.activeItem.getSize() * 100 / 2;
	
	this.cameraAttentionPosition = this.camera.position;
	this.cameraAttentionPosition.set(this.cameraAttention.x, this.cameraAttention.y - cameraDistance, this.cameraAttention.z + cameraDistance)
	
	this.camera.position = this.cameraAttentionPosition;
}

Three_Galaxy.prototype.render = function() {

	this.renderer.render(this.scene, this.camera);

}

Three_Galaxy.prototype.update = function() {

	for (var i in this.stars) {
		var star = this.stars[i];

		//location of a star
		var x1 = star.x;
		var y1 = star.y;
		var z1 = star.z;

		var x2 = this.camera.position.x;
		var y2 = this.camera.position.y;
		var z2 = this.camera.position.z;

		//sqrt((x1-x2)² + (y1-y2)² + (z1-z2)²)

		//var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) + Math.pow((z1 - z2), 2));
		var dist = star.getDistanceTo(this.camera.position);

		for (var i in star.planets) {
			var planet = star.planets[i];

			planet.planetSphere.rotation.y += 0.0050;
			planet.cloudSphere.rotation.y += 0.0040;

			//position at ellipse
			planet.updatePos(planet.angle + 0.001);

			planet.planetSphere.position.x = planet.x;
			planet.planetSphere.position.y = planet.y;

			planet.cloudSphere.position.x = planet.x;
			planet.cloudSphere.position.y = planet.y;

			if (dist > 2000) {
				planet.setVisible(false);
			} else {
				planet.setVisible(true);
			}

		}
	}
	
	if(this.cameraAttentionPosition != undefined && this.controls.getState() == -1){
		
		this.updateCameraAttention();
		
		
		
		/*
		var cameraDistance = 100; // default
		if(this.activeItem != undefined){
			cameraDistance = this.activeItem.getSize() * 100 / 2;
		}
		
		this.camera.position.set(this.cameraAttention.x, this.cameraAttention.y - cameraDistance, this.cameraAttention.z + cameraDistance);
		*/
	}
	
	this.controls.update(this.cameraAttention);
}

Three_Galaxy.prototype.getContainer = function() {
	return this.container;
}

Three_Galaxy.prototype.getScene = function() {
	return this.scene;
}

Three_Galaxy.prototype.getRenderer = function() {
	return this.renderer
}

Three_Galaxy.prototype.getControls = function() {
	return this.controls
}
