////////////////    Initialize VBO  ////////////////////////
var centerVertexPositionBuffer;
var centerVertexColorBuffer;
var platformVertexPositionBuffer; 
var platformVertexColorBuffer; 
var upArmVertexPositionBuffer;
var upArmVertexColorBuffer;
var jointVertexPositionBuffer;
var jointVertexColorBuffer;
var bottomArmVertexPositionBuffer; 
var bottomArmVertexColorBuffer; 
var floorVertexPositionBuffer; 
var floorVertexColorBuffer; 

function initFloorBuffers() {

    floorVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);

    var vertices = [
         -1.0,  -1.0,  0.0,
          1.0,  -1.0,  0.0, 
          1.0,  -0.8,  0.0,
         -1.0,  -0.8,  0.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    floorVertexPositionBuffer.itemSize = 3;
    floorVertexPositionBuffer.numItems = 4;
    floorVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexColorBuffer);
    var colors = [
        0.8, 0.8, 0.0, 1.0,
        0.8, 0.8, 0.0, 1.0,
        0.8, 0.8, 0.0, 1.0,
        0.8, 0.8, 0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    floorVertexColorBuffer.itemSize = 4;
    floorVertexColorBuffer.numItems = 4;
}

function initPlatformBuffers() {

    platformVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformVertexPositionBuffer);

    var vertices = [
         -0.3,  -0.025,  0.0,
          0.3,  -0.025,  0.0, 
          0.3,   0.025,  0.0,
         -0.3,   0.025,  0.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    platformVertexPositionBuffer.itemSize = 3;
    platformVertexPositionBuffer.numItems = 4;
    platformVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, platformVertexColorBuffer);
    var colors = [
        0.7411764706, 0.7176470588, 0.4196078431, 1.0,
        0.7411764706, 0.7176470588, 0.4196078431, 1.0,
        0.7411764706, 0.7176470588, 0.4196078431, 1.0,
        0.7411764706, 0.7176470588, 0.4196078431, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    platformVertexColorBuffer.itemSize = 4;
    platformVertexColorBuffer.numItems = 4;
}

function initCenterBuffers() {

    centerVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexPositionBuffer);

    var vertices = [
         0.0,  0.0,  0.0
    ];
    var colors = [
        0.862745098, 0.08888888889, 0.2666666667, 1.0
    ];
    var radius = 0.2;
    var multiple = 2;
    var numOfItem = 1;
    for (var i = 0; i <= 360; i+=1/multiple) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(0.0);
      colors.push(0.862745098);
      colors.push(0.08888888889);
      colors.push(0.2666666667);
      colors.push(1.0);
      numOfItem++;
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    centerVertexPositionBuffer.itemSize = 3;
    centerVertexPositionBuffer.numItems = numOfItem;
    centerVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    centerVertexColorBuffer.itemSize = 4;
    centerVertexColorBuffer.numItems = numOfItem;
}

function initUpArmBuffers() {

    upArmVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, upArmVertexPositionBuffer);

    var vertices = [
         -0.025,  -0.5,  0.0,
          0.025,  -0.5,  0.0, 
          0.025,  -0.2,  0.0,
         -0.025,  -0.2,  0.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    upArmVertexPositionBuffer.itemSize = 3;
    upArmVertexPositionBuffer.numItems = 4;
    upArmVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, upArmVertexColorBuffer);
    var colors = [
        1.0, 1.0, 0.4, 1.0,
        1.0, 1.0, 0.4, 1.0,
        1.0, 1.0, 0.4, 1.0,
        1.0, 1.0, 0.4, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    upArmVertexColorBuffer.itemSize = 4;
    upArmVertexColorBuffer.numItems = 4;
}

function initJointBuffers() {

    jointVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexPositionBuffer);

    var vertices = [
         0.0,  0.0,  -0.0001
    ];
    var colors = [
        0.862745098, 0.08888888889, 0.2666666667, 1.0
    ];
    var radius = 0.031;
    var multiple = 0.9;
    var numOfItem = 1;
    for (var i = 0; i <= 360; i+=1/multiple) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(-0.0001);
      colors.push(1.0);
      colors.push(1.0);
      colors.push(0.4);
      colors.push(1.0);
      numOfItem++;
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    jointVertexPositionBuffer.itemSize = 3;
    jointVertexPositionBuffer.numItems = numOfItem;
    jointVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    jointVertexColorBuffer.itemSize = 4;
    jointVertexColorBuffer.numItems = numOfItem;
}

function initBottomArmBuffers() {

    bottomArmVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bottomArmVertexPositionBuffer);

    var vertices = [
         -0.025,  -0.25,  0.0,
          0.025,  -0.25,  0.0, 
          0.025,  -0.0,  0.0,
         -0.025,  -0.0,  0.0, 
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    bottomArmVertexPositionBuffer.itemSize = 3;
    bottomArmVertexPositionBuffer.numItems = 4;
    bottomArmVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bottomArmVertexColorBuffer);
    var colors = [
        1.0, 1.0, 0.4, 1.0,
        1.0, 1.0, 0.4, 1.0,
        1.0, 1.0, 0.4, 1.0,
        1.0, 1.0, 0.4, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    bottomArmVertexColorBuffer.itemSize = 4;
    bottomArmVertexColorBuffer.numItems = 4;
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
}
///////////////////////////////////////////////////////

function draw_floor() {
    var floorMatrix = mat4.create();
    mat4.identity(floorMatrix);
    setMatrixUniforms(floorMatrix); 

    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, floorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,floorVertexColorBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, floorVertexColorBuffer.numItems);
}

function draw_obj(matrix, vertexPositionBuffer, vertexColorBuffor) {
    setMatrixUniforms(matrix); 

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffor);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,vertexColorBuffor.itemSize,gl.FLOAT,false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexColorBuffor.numItems);
}

///////////////////////////////////////////////////////////////////////

function drawScene() {

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mvMatrixStack = [];

    var model = mat4.create(); 
    mat4.identity(model);
    model = mat4.multiply(model, platformMat);
    draw_obj(model, platformVertexPositionBuffer, platformVertexColorBuffer);
    PushMatrix(model);
    model = mat4.multiply(model, centerMat);
    draw_obj(model, centerVertexPositionBuffer, centerVertexColorBuffer);
    PushMatrix(model);

    // left branch
    model = mat4.multiply(model, upArmLeftMat);
    draw_obj(model, upArmVertexPositionBuffer, upArmVertexColorBuffer);
    model = mat4.multiply(model, leftJointMat);
    draw_obj(model, jointVertexPositionBuffer, jointVertexColorBuffer);
    model = mat4.multiply(model, bottomArmLeftMat);
    draw_obj(model, bottomArmVertexPositionBuffer, bottomArmVertexColorBuffer);

    //right branch
    model = PopMatrix();
    model = mat4.multiply(model, upArmRightMat);
    draw_obj(model, upArmVertexPositionBuffer, upArmVertexColorBuffer);
    model = mat4.multiply(model, rightJointMat);
    draw_obj(model, jointVertexPositionBuffer, jointVertexColorBuffer);
    model = mat4.multiply(model, bottomArmRightMat);
    draw_obj(model, bottomArmVertexPositionBuffer, bottomArmVertexColorBuffer);

    draw_floor();
}