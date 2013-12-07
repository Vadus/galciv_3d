/*

Hexagon map javascript implementation

*/
    
// functions
function Three_Hexmap(width, height, hex_size, options) {
	
    // hexagon properties
    this.h_list = [];
    this.h_size = hex_size;
    this.h_angle = 30;
    this.h_angle_rad = (this.h_angle*Math.PI)/180;
    this.h_h = Math.sin(this.h_angle_rad)*this.h_size;
    this.h_r = Math.cos(this.h_angle_rad)*this.h_size;
    this.h_b = this.h_size+(this.h_h*2);
    this.h_a = 2*this.h_r;
    this.h_x_range = width; 
    this.h_y_range = height;
    this.hexagons = [];
    
    //default
    this.h_border = 0;
	
    if(options != undefined){
    	if(options.border != undefined){
    		this.h_border = options.border;
    	};
    };
    
    // map properties
    this.x_range = Math.floor(this.h_x_range*(this.h_a+this.h_r));
    this.y_range = Math.floor(this.h_y_range*this.h_b);
    
    // setup map
    this.setup();
};

Three_Hexmap.prototype.setup = function() {
    var mx = 0;
    var my = 0;
    var hex_bottom_right = 0;
    
    // position and drawing hexagons
    for (var hx = 0; hx < this.h_x_range; hx += 1) {
        my = 0;
        if(this.h_list[hx] === undefined){
            this.h_list[hx] = [];
        };

        for (var hy = 0; hy < this.h_y_range; hy += 1) {
            
            // adding to hexagon list
            if(this.h_list[hx][hy] === undefined){
                this.h_list[hx][hy] = {
                		x : hx,
                		y : hy,
                    	mx : mx,
                        my : my,
                };
            }
            else{
                this.h_list[hx][hy].mx = mx;
                this.h_list[hx][hy].my = my;
            }
            
            // calculating hexagon
            this.h_list[hx][hy].vertices = this._getHexagon(mx,my);
            
            this.hexagons.push(this.h_list[hx][hy]);
            
            // switch top/bottom hexagon
            if(hex_bottom_right == 1) {
                mx = mx-this.h_r;
                hex_bottom_right = 0;
            } else { 
                mx = mx+this.h_r;
                hex_bottom_right = 1; 
            }
                 
            // y position for next hexagon
            my = my+this.h_h+this.h_size+this.h_border;
         }
         
         // x startpoint for next hexagon line
         if(hex_bottom_right == 1) {
             mx = mx -this.h_r+this.h_border;
             hex_bottom_right = 0;
         }
         
         mx = mx+this.h_a+this.h_border;
    }
};

Three_Hexmap.prototype._getHexagon = function(x,y) {
	
	return [
		new THREE.Vector3( x+this.h_r, y, 0 ),
		new THREE.Vector3( x+this.h_a, y+this.h_h, 0 ),
		new THREE.Vector3( x+this.h_a, y+this.h_h+this.h_size, 0 ),
		new THREE.Vector3( x+this.h_r, y+this.h_b, 0 ),
		new THREE.Vector3( x, y+this.h_h+this.h_size, 0 ),
		new THREE.Vector3( x, y+this.h_h, 0 )
	];
};

Three_Hexmap.prototype.addToScene = function(scene, options) {
	
	//defaults
	var planeMaterial = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0, color: 0x000000, side: THREE.DoubleSide } ); 
	var borderMaterial = new THREE.LineBasicMaterial();
	
    if(options != undefined){
    	if(options.planeMaterial != undefined){
    		planeMaterial = options.planeMaterial;
    	};
    	if(options.borderMaterial != undefined){
    		borderMaterial = options.borderMaterial;
    	};
    };
    
    for(var i in this.hexagons){
    	
    	var hexagon = this.hexagons[i];
    	
    	hexagon.shape = new THREE.Shape(hexagon.vertices);
		hexagon.geometry = new THREE.ShapeGeometry( hexagon.shape );
		
		hexagon.plane = new THREE.Mesh(hexagon.geometry, planeMaterial.clone());
		hexagon.plane.rotation.x = Math.PI / 2; // lay on floor
		
		hexagon.border = new THREE.Line( hexagon.shape.createPointsGeometry(), borderMaterial.clone() );
		hexagon.border.position = hexagon.plane.position;
		hexagon.border.rotation.x = Math.PI / 2; // lay on floor
		
		hexagon.meshGroup = new THREE.Object3D();
		hexagon.meshGroup.add(hexagon.plane);
		hexagon.meshGroup.add(hexagon.border);
		
		scene.add( hexagon.meshGroup );
    };
    
    /*
    for(var x = 0; x < this.h_list.length; x += 1){
		for(var y = 0; y < this.h_list[x].length; y += 1){
			
			var hex = this.h_list[x][y];
			
			var hexShape = new THREE.Shape(hex.vertices);
			var hexGeometry = new THREE.ShapeGeometry( hexShape );
			
			//var hexagon = new THREE.Mesh(hexGeometry, material.clone());
			var hexPlane = new THREE.Mesh(hexGeometry, material.clone());
			hexPlane.rotation.x = Math.PI / 2; // lay on floor
			
			var hexBorder = new THREE.Line( hexShape.createPointsGeometry(), borderMaterial.clone() );
			hexBorder.position = hexPlane.position;
			hexBorder.rotation.x = Math.PI / 2; // lay on floor
			
			var hexagon = new THREE.Object3D();
			hexagon.add(hexPlane);
			hexagon.add(hexBorder);
			
			
			if(group != undefined){
				group.push( hexagon );
			};
			scene.add( hexagon );
			
			this.tiles.push(hexPlane);
			
		}
	};
	*/
};

Three_Hexmap.prototype.intersectHexagons = function(ray) {

	var hexagonsIntersected = [];
	

	for ( var i = 0, l = this.hexagons.length; i < l; i ++ ) {
		
		var hexagon = this.hexagons[i];
		
		var intersects = ray.intersectObject( hexagon.plane, false );
		if(intersects.length > 0){
			hexagonsIntersected.push(hexagon);
		}
	}
	
	/*
	//sort intersects and hexagons by distancy
	for ( var i = 0, l = intersects.length; i < l; i ++ ) {
		for ( var j = 0; j < l; j ++ ) {
			if(intersects[j].distance > intersects[i].distance){
				var hex = hexagonsIntersected[i];
				hexagonsIntersected[i] = hexagonsIntersected[j];
				hexagonsIntersected[j] = hex;
			};
		};
	};
	*/

	return hexagonsIntersected;
};