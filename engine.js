/*
 * fizix-demo v0.1
 *
 * Copyright 2008, Hayk Avagyan
 */
function Cube( config  ){
	if( !config ) config = {};
	var pos = ( config.pos ? config.pos : [ 0, 0, 0 ] ),
		size = ( config.size ? config.size : 20 ),
		speed = ( config.speed ? config.speed : 0 ),
		dir = ( config.dir ? config.dir : [ 0, 0, 0 ] ),
		fromOrigin = ( config.fromOrigin ? config.fromOrigin : false ), 
		xAngSpeed = ( config.xAngSpeed ? config.xAngSpeed : 0 ), 
		yAngSpeed = ( config.yAngSpeed ? config.yAngSpeed : 0 ), 
		zAngSpeed = ( config.zAngSpeed ? config.zAngSpeed : 0 ),
		xAxis = 0,
		yAxis = 0,
		zAxis = 0,
		lastUpdateTime,
		triangles;
	this.color = ( config.color ? config.color : '#00FF00' );

	this.setTime = function(){
		lastUpdateTime = ( new Date() ).getTime();
	}
	
	this.update = function(){
		var now = ( new Date() ).getTime();
		var secsPassed = ( ( now - lastUpdateTime ) / 1000 );
		move( secsPassed );
		rotate( secsPassed );
		lastUpdateTime = now;
	}
	
	this.getTriangles = function(){
	    return triangles;
	}
	
	function move( secsPassed ){
		var travel = [  
						( secsPassed * speed ) * dir[0], 
						( secsPassed * speed ) * dir[1], 
						( secsPassed * speed ) * dir[2] 
					 ];
		pos[0] += travel[0];
		pos[1] += travel[1];
		pos[2] += travel[2];
		triangles = generateTriangles();
	}
	
	function rotate( secsPassed ){
		xAxis += secsPassed * xAngSpeed; 
		yAxis += secsPassed * yAngSpeed;
		zAxis += secsPassed * zAngSpeed;
		var center = ( fromOrigin ? [ 0, 0, 0 ] : pos );
		for( var i = 0; i < triangles.length; i++ ){
			for( var j = 0; j < 3; j++ ){
				var curVertex = triangles[i][j];
				var subVertex = [ curVertex[0] - center[0], curVertex[1] - center[1], curVertex[2] - center[2] ];
				var newZ = subVertex[2]*Math.cos(xAxis) - subVertex[1]*Math.sin(xAxis);
				var newY = subVertex[1]*Math.cos(xAxis) + subVertex[2]*Math.sin(xAxis);
				curVertex[1] = center[1] + newY;
				curVertex[2] = center[2] + newZ;
				subVertex = [ curVertex[0] - center[0], newY, newZ ];
				var newX = subVertex[0]*Math.cos(yAxis) - subVertex[2]*Math.sin(yAxis);
				var newZ = subVertex[2]*Math.cos(yAxis) + subVertex[0]*Math.sin(yAxis);
				curVertex[0] = center[0] + newX;
				curVertex[2] = center[2] + newZ;
				subVertex = [ newX, curVertex[1] - center[1], newZ ];
				var newX = subVertex[0]*Math.cos(zAxis) - subVertex[1]*Math.sin(zAxis);
				var newY = subVertex[1]*Math.cos(zAxis) + subVertex[0]*Math.sin(zAxis);
				curVertex[0] = center[0] + newX;
				curVertex[1] = center[1] + newY;						
			}
		}
		(new Utils()).setNormals( triangles );	
	}

	function generateTriangles(){	
		var t = [];
		t[0] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] - size/2 ], [ pos[0] - size/2, pos[1] - size/2, pos[2] - size/2 ] ];
		t[1] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] - size/2 ] ];
		t[2] = [ [ pos[0] + size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] - size/2 ] ];
		t[3] = [ [ pos[0] + size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] + size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] + size/2 ] ];
		t[4] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] + size/2 ], [ pos[0] - size/2, pos[1] - size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] + size/2 ] ];
		t[5] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] + size/2, pos[2] + size/2 ] ];
		t[6] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] - size/2, pos[1] - size/2, pos[2] - size/2 ], [ pos[0] - size/2, pos[1] - size/2, pos[2] + size/2 ] ];
		t[7] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] - size/2, pos[1] - size/2, pos[2] + size/2 ], [ pos[0] - size/2, pos[1] + size/2, pos[2] + size/2 ] ];
		t[8] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] + size/2, pos[2] - size/2 ], [ pos[0] - size/2, pos[1] + size/2, pos[2] - size/2 ] ];
		t[9] = [ [ pos[0] - size/2, pos[1] + size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] + size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] + size/2, pos[2] - size/2 ] ];
		t[10] = [ [ pos[0] - size/2, pos[1] - size/2, pos[2] + size/2 ], [ pos[0] - size/2, pos[1] - size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] - size/2 ] ];
		t[11] = [ [ pos[0] - size/2, pos[1] - size/2, pos[2] + size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] - size/2 ], [ pos[0] + size/2, pos[1] - size/2, pos[2] + size/2 ] ];	
		(new Utils()).setNormals( t );
		return t;
	}
}

function Sphere( config ){
	if( !config ) config = {};
	var pos = ( config.pos ? config.pos : [ 0, 0, 0 ] ),
		radius = ( config.radius ? config.radius : 20 ),
		slices = ( config.slices ? config.slices : 10 ),
		portions = ( config.portions ? config.portions : 25 ),
		speed = ( config.speed ? config.speed : 0 ),
		dir = ( config.dir ? config.dir : [ 0, 0, 0 ] ),
		fromOrigin = ( config.fromOrigin ? config.fromOrigin : false ), 
		xAngSpeed = ( config.xAngSpeed ? config.xAngSpeed : 0 ), 
		yAngSpeed = ( config.yAngSpeed ? config.yAngSpeed : 0 ), 
		zAngSpeed = ( config.zAngSpeed ? config.zAngSpeed : 0 ),
		xAxis = 0,
		yAxis = 0,
		zAxis = 0,		
		lastUpdateTime;
	this.color = ( config.color ? config.color : '#00FF00' );	

	this.setTime = function(){
		lastUpdateTime = ( new Date() ).getTime();
	}
	
	this.update = function(){
		var now = ( new Date() ).getTime();
		var secsPassed = ( ( now - lastUpdateTime ) / 1000 );
		move( secsPassed );
		rotate( secsPassed );
		lastUpdateTime = now;
	}

	this.getTriangles = function(){
	    return triangles;
	}
	
	function move( secsPassed ){
		var travel = [  
						( secsPassed * speed ) * dir[0], 
						( secsPassed * speed ) * dir[1], 
						( secsPassed * speed ) * dir[2] 
					 ];
		pos[0] += travel[0];
		pos[1] += travel[1];
		pos[2] += travel[2];
		triangles = generateTriangles();
	}
	
	function rotate( secsPassed ){
		xAxis += secsPassed * xAngSpeed; 
		yAxis += secsPassed * yAngSpeed;
		zAxis += secsPassed * zAngSpeed;
		var center = ( fromOrigin ? [ 0, 0, 0 ] : pos );
		for( var i = 0; i < triangles.length; i++ ){
			for( var j = 0; j < 3; j++ ){
				var curVertex = triangles[i][j];
				var subVertex = [ curVertex[0] - center[0], curVertex[1] - center[1], curVertex[2] - center[2] ];
				var newZ = subVertex[2]*Math.cos(xAxis) - subVertex[1]*Math.sin(xAxis);
				var newY = subVertex[1]*Math.cos(xAxis) + subVertex[2]*Math.sin(xAxis);
				curVertex[1] = center[1] + newY;
				curVertex[2] = center[2] + newZ;
				subVertex = [ curVertex[0] - center[0], newY, newZ ];
				var newX = subVertex[0]*Math.cos(yAxis) - subVertex[2]*Math.sin(yAxis);
				var newZ = subVertex[2]*Math.cos(yAxis) + subVertex[0]*Math.sin(yAxis);
				curVertex[0] = center[0] + newX;
				curVertex[2] = center[2] + newZ;
				subVertex = [ newX, curVertex[1] - center[1], newZ ];
				var newX = subVertex[0]*Math.cos(zAxis) - subVertex[1]*Math.sin(zAxis);
				var newY = subVertex[1]*Math.cos(zAxis) + subVertex[0]*Math.sin(zAxis);
				curVertex[0] = center[0] + newX;
				curVertex[1] = center[1] + newY;						
			}
		}
		(new Utils()).setNormals( triangles );	
	}

	function generateTriangles(){	
		var t = [];
		var sv = [];
		for( var i = 0; i < slices; i++ ){	
			sv[i] = [];
			var curAngle =  ( 270 + ( i + 1 ) * ( 180 / ( slices + 1 ) ) ) * ( Math.PI / 180 );
			var curRadius = Math.cos( curAngle );
			var curHeight = Math.sin( curAngle );
			for( var j = 0; j < portions; j++ ){
				var angle = ( j * ( 360 / portions ) ) * ( Math.PI / 180 );
				var curX = curRadius * Math.cos( angle );
				var curZ = curRadius * Math.sin( angle );
				sv[i][j] = [ pos[0] + radius * curX, pos[1] + radius * curHeight, pos[2] + radius * curZ ];
			}
		}
		for( var i = 0; i < portions-1; i++ )
			t[t.length] = [ [ pos[0], pos[1] - radius, pos[2] ], sv[0][i+1], sv[0][i] ];
		t[t.length] = [ [ pos[0], pos[1] - radius, pos[2] ], sv[0][0], sv[0][portions-1] ];
		for( var i = 0; i < slices-1; i++ ){	
			for( var j = 0; j < portions-1; j++ ){	
				t[t.length] = [ sv[i][j], sv[i][j+1], sv[i+1][j] ];
				t[t.length] = [ sv[i+1][j], sv[i][j+1], sv[i+1][j+1] ];
			}	
			t[t.length] = [ sv[i][j], sv[i][0], sv[i+1][j] ];
			t[t.length] = [ sv[i+1][j], sv[i][0], sv[i+1][0] ];
		}
		for( var i = 0; i < portions-1; i++ )
			t[t.length] = [ [ pos[0], pos[1] + radius, pos[2] ], sv[slices-1][i], sv[slices-1][i+1] ];
		t[t.length] = [ [ pos[0], pos[1] + radius, pos[2] ], sv[slices-1][portions-1], sv[slices-1][0] ];			
		(new Utils()).setNormals( t );
		return t;
	}	
}

function Utils(){
	this.setNormals = function( t ){
		var eye = [ 0, 0, -300 ];
		for( var i = 0; i < t.length; i++ ){
			var v1 = [ t[i][1][0] - t[i][0][0], t[i][1][1] - t[i][0][1], t[i][1][2] - t[i][0][2] ];
			var v2 = [ t[i][2][0] - t[i][0][0], t[i][2][1] - t[i][0][1], t[i][2][2] - t[i][0][2] ];
			var x = v1[2] * v2[1] - v1[1] * v2[2];
			var y = v1[0] * v2[2] - v1[2] * v2[0];
			var z = v1[1] * v2[0] - v1[0] * v2[1];
			var l = Math.sqrt( x * x + y * y + z * z );
			t[i][3] = [ x/l, y/l, z/l ];	
			
			var centroid = [ (t[i][0][0] + t[i][1][0] + t[i][2][0])/3, (t[i][0][1] + t[i][1][1] + t[i][2][1])/3, (t[i][0][2] + t[i][1][2] + t[i][2][2])/3 ];
			var sightDir = [ centroid[0] - eye[0], centroid[1] - eye[1], centroid[2] - eye[2] ];	
			var sl = Math.sqrt( sightDir[0] * sightDir[0] + sightDir[1] * sightDir[1] + sightDir[2] * sightDir[2] );	
			t[i][4] = [ sightDir[0]/sl, sightDir[1]/sl, sightDir[2]/sl ];		
		}
	} 
}

function World( canvasId ){
	var canvas = document.getElementById( canvasId );
	if( !canvas.getContext ){ 
		alert( 'HTML5 Canvas is not supported by your browser. Please download and install the latest version of your browser to see the canvas in action!' ); 
		return; 
	}
				
	var DISTANCE = 1000,
	    ctx = canvas.getContext('2d'),
	    cw = canvas.width,
	    ch = canvas.height,	
	    cmx = canvas.width/2,
		cmy = canvas.height/2,
	    objects = [],
	    updateId,
		fpsId,
		running = false,
	    fpsCounter = 0,
	    light = [ 0, 0, 1 ],
	    eye = [ 0, 0, -700 ],
	    eyeAngles = [ 0, 0, 0 ];
		
	    ctx.strokeStyle = '#FFFFFF';
	    //canvas.style.backgroundColor = "#000000";
	    			
	this.add = objs => {
		if (!Array.isArray(objs)) return;
		
		objs.forEach(obj => 
			typeof obj === 'object' && objects.push(obj)
		);		
	};	
	
	this.run = function(){
		if( running ) return;
		running = true;
		for( var i = 0; i < objects.length; i++ ){
			objects[i].setTime();
		}			
		updateId = setInterval( update, 1 );
		fpsId = setInterval( fps, 1000 );	
	}	

	this.stop = function(){
		if( !running ) return;
		running = false;
		clearInterval( updateId );
		clearInterval( fpsId );	
		fpsCounter = 0;
		// document.getElementById('fps').innerText( fpsCounter );
	}
	
	this.isRunning = function(){
		return running;
	}	
	
	function update(){
		ctx.fillStyle = '#000000';
		ctx.fillRect( 0, 0, cw, ch );
		for( var i = 0; i < objects.length; i++ ){
			objects[i].update();
			var surfs = project( objects[i].getTriangles(), objects[i].color );
			draw( surfs );
		}	
		fpsCounter++;
	}

	function fps(){
		// document.getElementById('fps').innerText( fpsCounter );
		fpsCounter = 0;
	}
	
	function project( t, color ){
		var surfs = [];
		for( var i = 0; i < t.length; i++ ){
			surfs[i] = [];
			for( var j = 0; j < 3; j++ ){
				var subVector = [ t[i][j][0] - eye[0], t[i][j][1] - eye[1], t[i][j][2] - eye[2] ];
				var vNewZ = subVector[2] * Math.cos(-eyeAngles[0]) - subVector[1] * Math.sin(-eyeAngles[0]);
				var vNewY = subVector[1] * Math.cos(-eyeAngles[0]) + subVector[2] * Math.sin(-eyeAngles[0]);					
				var vNewX = subVector[0] * Math.cos(-eyeAngles[1]) - vNewZ * Math.sin(-eyeAngles[1]);
				vNewZ = vNewZ * Math.cos(-eyeAngles[1]) + subVector[0] * Math.sin(-eyeAngles[1]);
				vNewX = vNewX * Math.cos(-eyeAngles[2]) - vNewY * Math.sin(-eyeAngles[2]);
				vNewY = vNewY * Math.cos(-eyeAngles[2]) + vNewX * Math.sin(-eyeAngles[2]);	
				var x = ( DISTANCE * vNewX ) / vNewZ;
				var y = ( DISTANCE * vNewY ) / vNewZ;
				surfs[i][j] = [x * 1, y * 1];
			}
			var sightCosine = 1 - ( Math.pow( t[i][3][0] - t[i][4][0], 2 ) + Math.pow( t[i][3][1] - t[i][4][1], 2 ) +
								Math.pow( t[i][3][2] - t[i][4][2], 2 ) ) / 2;				
			
			var lightCosine = 1 - ( Math.pow( t[i][3][0] - light[0], 2 ) + Math.pow( t[i][3][1] - light[1], 2 ) +
								Math.pow( t[i][3][2] - light[2], 2 ) ) / 2;
			if( sightCosine <= 0 || lightCosine <= 0 ) surfs[i][3] = -1;
			else {
				var red = Math.round( parseInt( color.substr( 1, 2 ), 16 )*lightCosine );
				var green = Math.round( parseInt( color.substr( 3, 2 ), 16 )*lightCosine );
				var blue = Math.round( parseInt( color.substr( 5, 2 ), 16 )*lightCosine );
				surfs[i][3] = 'RGB( '+ red + ','+ green + ','+ blue + ')';
			}
		}
		return surfs;
	}		
	
	function draw( surfs ){
		var curFillStyle = ctx.fillStyle;
		for( var i = 0; i < surfs.length; i++ ){
			if( surfs[i][3] == -1 ) continue;
			ctx.beginPath();
			ctx.moveTo(cmx + surfs[i][0][0], cmy - surfs[i][0][1]); 
			ctx.lineTo(cmx + surfs[i][1][0], cmy - surfs[i][1][1]); 
			ctx.lineTo(cmx + surfs[i][2][0], cmy - surfs[i][2][1]); 
			ctx.closePath();
			ctx.fillStyle = surfs[i][3];
			//ctx.stroke();
			ctx.fill();
		}			
		ctx.fillStyle = curFillStyle;
	}	

	function getObjectCenter( triangles ){
		//TO DO
		return [ 0, 0, 0 ];
	}
	
	this.setEye = function( pos ){ eye = pos; }
	
	this.getEye = function(){ return eye; }	
	
	this.getEyeAngles = function(){ return eyeAngles; }	
	
	this.drawAxes = function(){  }
	
	this.getSnapshot = function(){
		var dataUrl = canvas.toDataURL( "image/png" );
		window.open( dataUrl );
	}	
	
}

























