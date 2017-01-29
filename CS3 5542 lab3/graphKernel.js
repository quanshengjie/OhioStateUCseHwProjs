////////////////    Initialize VBO  ////////////////////////
var centerVertexPositionBuffer;
var centerVertexColorBuffer;
var centerVertexIndexBuffer; 
var platformVertexPositionBuffer; 
var platformVertexColorBuffer;
var platformVertexIndexBuffer; 
var upArmVertexPositionBuffer;
var upArmVertexColorBuffer;
var upArmVertexIndexBuffer;
var jointVertexPositionBuffer;
var jointVertexColorBuffer;
var jointVertexIndexBuffer;
var bottomArmVertexPositionBuffer; 
var bottomArmVertexColorBuffer; 
var bottomArmVertexIndexBuffer; 
var floorVertexPositionBuffer; 
var floorVertexColorBuffer;
var floorVertexIndexBuffer;

function createCubeBuffers(vertexPositionBuffer, vertexColorBuffer, vertexIndexBuffer, 
                           width, length, height, xOff, yOff, zOff, 
                           colorR, colorG, colorB) {
    var vertices = [
         0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff, 
        -0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
         0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff, 
        -0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,    
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = 8;

    var colors = [
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    vertexColorBuffer.itemSize = 4;
    vertexColorBuffer.numItems = 8;

    var indices = [0,1,2, 0,2,3, 0,3,7, 0, 7,4, 6,2,3,6,3,7,5,1,2, 5,2,6,5,1,0,5,0,4,5,6,7,5,7,4];
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer); 
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
    vertexIndexBuffer.itemsize = 1;
    vertexIndexBuffer.numItems = 36;
}

function initFloorBuffers() {

    floorVertexPositionBuffer = gl.createBuffer();
    floorVertexColorBuffer = gl.createBuffer();
    floorVertexIndexBuffer = gl.createBuffer();
    createCubeBuffers(floorVertexPositionBuffer, floorVertexColorBuffer, floorVertexIndexBuffer, 
                      2, 2, 0.2, 0, -0.9, 0, 
                      0.8, 0.8, 0.0);
}

function initPlatformBuffers() {
    platformVertexPositionBuffer = gl.createBuffer();
    platformVertexColorBuffer = gl.createBuffer();
    platformVertexIndexBuffer = gl.createBuffer();
    createCubeBuffers(platformVertexPositionBuffer, platformVertexColorBuffer, platformVertexIndexBuffer, 
                      0.6, 0.6, 0.05, 0, 0, 0, 
                      0.7411764706, 0.7176470588, 0.4196078431);
}

function initCenterBuffers() {

    centerVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexPositionBuffer);

    var radius = 0.2;
    // Longitude |||
    var nSlice = 24;
    // Latitude ---
    var nStack = 16;
    var vertices = [
         0.0,  radius,  0.0
    ];
    var colors = [
        0.862745098, 0.08888888889, 0.2666666667, 1.0
    ];

    for( var lat = 0; lat < nStack; lat++ )
    {
        var a1 = Math.PI * (lat+1) / (nStack+1);
        var sin1 = Math.sin(a1);
        var cos1 = Math.cos(a1);
     
        for( var lon = 0; lon <= nSlice; lon++ )
        {
            var a2 = 2*Math.PI * (lon == nSlice ? 0 : lon) / nSlice;
            var sin2 = Math.sin(a2);
            var cos2 = Math.cos(a2);
     
            vertices.push(sin1 * cos2 * radius); vertices.push(cos1 * radius); vertices.push(sin1 * sin2 * radius );
            var rate = (1.8/((nStack)*(nStack))) * lat * lat + (2.7/(nStack)) * lat + 0.1;
            colors.push(0.862745098*rate); colors.push(0.08888888889*rate); colors.push(0.2666666667*rate); colors.push(1.0);
        }
    }
    vertices.push(0.0);  vertices.push(-radius);  vertices.push(0.0);
    colors.push(0.862745098); colors.push(0.08888888889); colors.push(0.2666666667); colors.push(1.0);

    var indices = [];
    for( var lon = 0; lon < nSlice; lon++ )
    {
        indices.push(lon+2);
        indices.push(lon+1);
        indices.push(0);
    }
     
    //Middle
    for( var lat = 0; lat < nStack - 1; lat++ )
    {
        for( var lon = 0; lon < nSlice; lon++ )
        {
            var current = lon + lat * (nSlice + 1) + 1;
            var next = (lon == nSlice) ? 0 : current + nSlice + 1;
     
            indices.push(current);
            indices.push(current + 1);
            indices.push(next + 1);
     
            indices.push(current);
            indices.push(next + 1);
            indices.push(next);
        }
    }
     
    //Bottom Cap
    for( var lon = 0; lon < nSlice; lon++ )
    {
        indices.push((((nSlice+1) * nStack + 2)) - 1);
        indices.push((((nSlice+1) * nStack + 2)) - (lon+2) - 1);
        indices.push((((nSlice+1) * nStack + 2)) - (lon+1) - 1);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    centerVertexPositionBuffer.itemSize = 3;
    centerVertexPositionBuffer.numItems = (nSlice+1) * nStack + 2;

    centerVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    centerVertexColorBuffer.itemSize = 4;
    centerVertexColorBuffer.numItems = (nSlice+1) * nStack + 2;

    centerVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, centerVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
    centerVertexIndexBuffer.itemsize = 1;
    centerVertexIndexBuffer.numItems = indices.length;
}

function initUpArmBuffers() {

    upArmVertexPositionBuffer = gl.createBuffer();
    upArmVertexColorBuffer = gl.createBuffer();
    upArmVertexIndexBuffer = gl.createBuffer();
    createCubeBuffers(upArmVertexPositionBuffer, upArmVertexColorBuffer, upArmVertexIndexBuffer, 
                      0.05, 0.05, 0.3, 0, -0.35, 0, 
                      1.0, 1.0, 0.4);
}

function initJointBuffers() {

    jointVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexPositionBuffer);

    var height = 0.07;
    var vertices = [
         0.0,  0.0,  -height/2
    ];
    var colors = [
        0.862745098, 0.08888888889, 0.2666666667, 1.0
    ];
    var radius = 0.031;
    var numOfItem = 1;
    for (var i = 0; i <= 360; i+=1) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(-height/2);
      colors.push(0.7);
      colors.push(1.0);
      colors.push(0.7);
      colors.push(1.0);
      numOfItem++;
    }
    vertices.push(0.0); vertices.push(0.0); vertices.push(height/2); 
    colors.push(0.862745098); colors.push(0.08888888889); colors.push(0.2666666667); colors.push(1.0);
    numOfItem++;
    for (var i = 0; i <= 360; i+=1) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(height/2);
      colors.push(1.0);
      colors.push(1.0);
      colors.push(0.4);
      colors.push(1.0);
      numOfItem++;
    }

    var indices = [];
    for (var i = 1; i <= 360; i+=1) {
      indices.push(0);
      indices.push(i);
      indices.push(i+1);
    }

    for (var i = 1; i <= 360; i+=1) {
      indices.push(i);
      indices.push(i+362);
      indices.push(i+1);
      indices.push(i+1);
      indices.push(i+362);
      indices.push(i+363);
    }

    for (var i = 363; i <= 722; i+=1) {
      indices.push(362);
      indices.push(i);
      indices.push(i+1);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    jointVertexPositionBuffer.itemSize = 3;
    jointVertexPositionBuffer.numItems = numOfItem;
    jointVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    jointVertexColorBuffer.itemSize = 4;
    jointVertexColorBuffer.numItems = numOfItem;

    jointVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, jointVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
    jointVertexIndexBuffer.itemsize = 1;
    jointVertexIndexBuffer.numItems = indices.length;
}

function initBottomArmBuffers() {

    bottomArmVertexPositionBuffer = gl.createBuffer();
    bottomArmVertexColorBuffer = gl.createBuffer();
    bottomArmVertexIndexBuffer = gl.createBuffer();
    createCubeBuffers(bottomArmVertexPositionBuffer, bottomArmVertexColorBuffer, bottomArmVertexIndexBuffer, 
                      0.05, 0.05, 0.25, 0, -0.125, 0, 
                      1.0, 1.0, 0.4);
}

///////////////////////////////////////////
var centerMat, platformMat, upArmLeftMat, upArmRightMat, leftJointMat, rightJointMat;
var bottomArmLeftMat, bottomArmRightMat;

function sceneInit() {
    initPlatformBuffers(); 
    initFloorBuffers();
    initCenterBuffers();
    initUpArmBuffers();
    initJointBuffers();
    initBottomArmBuffers();

    platformMat = mat4.create(); 
    mat4.identity(platformMat);
    platformMat = mat4.translate(platformMat, [0, 0.975, 0]);

    centerMat = mat4.create();
    mat4.identity(centerMat);
    centerMat = mat4.translate(centerMat, [0, -0.2-0.025, 0]);

    upArmLeftMat = mat4.create();
    mat4.identity(upArmLeftMat);
    upArmLeftMat = mat4.rotate(upArmLeftMat, degToRad(-80), [0, 0, 1]);

    upArmRightMat = mat4.create();
    mat4.identity(upArmRightMat);
    upArmRightMat = mat4.rotate(upArmRightMat, degToRad(80), [0, 0, 1]);

    leftJointMat = mat4.create();
    mat4.identity(leftJointMat);
    leftJointMat = mat4.translate(leftJointMat, [0, -0.5, 0]);

    rightJointMat = mat4.create();
    mat4.identity(rightJointMat);
    rightJointMat = mat4.translate(rightJointMat, [0, -0.5, 0]);

    bottomArmLeftMat = mat4.create();
    mat4.identity(bottomArmLeftMat);
    bottomArmLeftMat = mat4.rotate(bottomArmLeftMat, degToRad(100), [0, 0, 1]);

    bottomArmRightMat = mat4.create();
    mat4.identity(bottomArmRightMat);
    bottomArmRightMat = mat4.rotate(bottomArmRightMat, degToRad(-100), [0, 0, 1]);

    document.addEventListener('mousedown', onDocumentMouseDown, false); 
}
///////////////////////////////////////////////////////

function draw_floor() {
    var floorMatrix = mat4.create();
    floorMatrix = mat4.identity(floorMatrix);
    floorMatrix = mat4.rotate(floorMatrix, degToRad(Z_angle), [0, 1, 0]);
    setMatrixUniforms(floorMatrix); 

    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, floorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,floorVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVertexIndexBuffer);
    gl.drawElements(gl.TRIANGLES, floorVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 
}

function draw_obj(matrix, vertexPositionBuffer, vertexColorBuffor, indexBuffer) {
    setMatrixUniforms(matrix); 

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffor);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,vertexColorBuffor.itemSize,gl.FLOAT,false, 0, 0);
    if(indexBuffer != null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 
    } else {
        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexColorBuffor.numItems);
    }
}

///////////////////////////////////////////////////////////////////////
var camX = 0, camY = 0, camZ = 2;
var centerOfInterestX = 0, centerOfInterestY = 0, centerOfInterestZ = 0;
var panDeg = 0;
var Z_angle = 0.0;
var Scale = 1;


function drawScene() {

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mvMatrixStack = [];

    pMatrix = mat4.create();
    vMatrix = mat4.create();
    pMatrix = mat4.perspective(60, 1.0, 0.1, 100, pMatrix);  // set up the projection matrix    
    vMatrix = mat4.lookAt([camX,camY,camZ], [centerOfInterestX,centerOfInterestY,centerOfInterestZ], [0,1,0], vMatrix);  // set up the view matrix
    pMatrix = mat4.rotate(pMatrix, degToRad(-panDeg), [0, 0, 1]);
    vMatrix = mat4.scale(vMatrix, [Scale, Scale, Scale]);

    var model = mat4.create();
    mat4.identity(model);
    model = mat4.rotate(model, degToRad(Z_angle), [0, 1, 0]);
    model = mat4.multiply(model, platformMat);
    draw_obj(model, platformVertexPositionBuffer, platformVertexColorBuffer, platformVertexIndexBuffer);
    PushMatrix(model);
    model = mat4.multiply(model, centerMat);
    draw_obj(model, centerVertexPositionBuffer, centerVertexColorBuffer, centerVertexIndexBuffer);
    PushMatrix(model);

    // left branch
    model = mat4.multiply(model, upArmLeftMat);
    draw_obj(model, upArmVertexPositionBuffer, upArmVertexColorBuffer, upArmVertexIndexBuffer);
    model = mat4.multiply(model, leftJointMat);
    draw_obj(model, jointVertexPositionBuffer, jointVertexColorBuffer, jointVertexIndexBuffer);
    model = mat4.multiply(model, bottomArmLeftMat);
    draw_obj(model, bottomArmVertexPositionBuffer, bottomArmVertexColorBuffer, bottomArmVertexIndexBuffer);

    //right branch
    model = PopMatrix();
    model = mat4.multiply(model, upArmRightMat);
    draw_obj(model, upArmVertexPositionBuffer, upArmVertexColorBuffer, upArmVertexIndexBuffer);
    model = mat4.multiply(model, rightJointMat);
    draw_obj(model, jointVertexPositionBuffer, jointVertexColorBuffer, jointVertexIndexBuffer);
    model = mat4.multiply(model, bottomArmRightMat);
    draw_obj(model, bottomArmVertexPositionBuffer, bottomArmVertexColorBuffer, bottomArmVertexIndexBuffer);

    draw_floor();
}

function movePointOfInterest(delta) {
    centerOfInterestX += delta[0];
    centerOfInterestY += delta[1];
    centerOfInterestZ += delta[2];
    drawScene();
}

function moveCamera(delta) {
    camX += delta[0];
    camY += delta[1];
    camZ += delta[2];
    drawScene();
}

function panCam(delta) {
    panDeg += delta;
    drawScene();
}

///////////////////////////////////////////////////////////////

 var lastMouseX = 0, lastMouseY = 0;

///////////////////////////////////////////////////////////////

function onDocumentMouseDown( event ) {
  event.preventDefault();
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mouseout', onDocumentMouseOut, false );
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  lastMouseX = mouseX;
  lastMouseY = mouseY; 

}

function onDocumentMouseMove( event ) {
  var mouseX = event.clientX;
  var mouseY = event.clientY; 

  var diffX = mouseX - lastMouseX;
  var diffY = mouseY - lastMouseY;
  // console.log(event.which);
  switch(event.which) {
    case 1:
        // left mouse
        Z_angle = Z_angle + diffX/5;
        break;
    case 3:
        // right mouse
        Scale = Scale + diffY/2000;
  }
  

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  drawScene();
}

function onDocumentMouseUp( event ) {
  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
  document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

///////////////////////////////////////////////////////////////