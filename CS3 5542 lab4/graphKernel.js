////////////////    Initialize VBO  ////////////////////////
var centerVertexPositionBuffer;
var centerVertexDiffuseCoefBuffer;
var centerVertexSpecularCoefBuffer;
var centerVertexMatShininessBuffer;
var centerVertexNormalBuffer;
var centerVertexIndexBuffer; 

var platformVertexPositionBuffer; 
var platformVertexDiffuseCoefBuffer;
var platformVertexSpecularCoefBuffer;
var platformVertexMatShininessBuffer;
var platformVertexNormalBuffer;
var platformVertexIndexBuffer;

var upArmVertexPositionBuffer;
var upArmVertexDiffuseCoefBuffer;
var upArmVertexSpecularCoefBuffer;
var upArmVertexMatShininessBuffer;
var upArmVertexNormalBuffer;
var upArmVertexIndexBuffer;

var jointVertexPositionBuffer;
var jointVertexDiffuseCoefBuffer;
var jointVertexSpecularCoefBuffer;
var jointVertexMatShininessBuffer;
var jointVertexNormalBuffer;
var jointVertexIndexBuffer;

var bottomArmVertexPositionBuffer; 
var bottomVertexDiffuseCoefBuffer;
var bottomVertexSpecularCoefBuffer;
var bottomVertexMatShininessBuffer;
var bottomVertexNormalBuffer;
var bottomArmVertexIndexBuffer; 

var floorVertexPositionBuffer; 
var floorVertexDiffuseCoefBuffer;
var floorVertexSpecularCoefBuffer;
var floorVertexMatShininessBuffer;
var floorVertexNormalBuffer;
var floorVertexIndexBuffer;

var lightVertexPositionBuffer; 
var lightVertexDiffuseCoefBuffer;
var lightVertexSpecularCoefBuffer;
var lightVertexMatShininessBuffer;
var lightVertexNormalBuffer;
var lightVertexIndexBuffer;

function createCubeBuffers(vertexPositionBuffer, vertexDiffuseCoefBuffer, 
                          vertexSpecularCoefBuffer, vertexMatShininessBuffer, 
                          vertexNormalBuffer, vertexIndexBuffer, 
                           width, length, height, xOff, yOff, zOff, 
                           colorR, colorG, colorB, 
                           shinR, shinG, shinB, matShininess) {
    var vertices = [
         0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff, 
        -0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,

         0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff, 
         0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff,

        -0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
        -0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,

         0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
         0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,

        -0.5*width+xOff, -0.5*height+yOff,  -0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,  -0.5*length+zOff,
        -0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff,

         0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff,
        -0.5*width+xOff,  0.5*height+yOff,   0.5*length+zOff, 
        -0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,
         0.5*width+xOff, -0.5*height+yOff,   0.5*length+zOff,
    ];
    var indices = [0,1,2, 0,2,3, 4,5,6, 5,6,7, 8,9,10, 9,10,11, 12,13,14, 13,14,15, 16,17,18, 17,18,19, 20,21,22, 20,22,23];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = 24;

    var colors = [
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
        colorR, colorG, colorB, 1.0,
    ];

    var shinColors = [
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
        shinR, shinG, shinB, 1.0,
    ];

    var shininess = [
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
        matShininess,
    ];

    var normals = [
        0,  0,  -1,
        0,  0,  -1, 
        0,  0,  -1,
        0,  0,  -1,

        0,  1,  0,
        0,  1,  0,
        0,  1,  0,
        0,  1,  0,

        0,  -1,  0,
        0,  -1,  0,
        0,  -1,  0,
        0,  -1,  0,

        1,  0,  0,
        1,  0,  0,
        1,  0,  0,
        1,  0,  0,

        -1,  0,  0,
        -1,  0,  0,
        -1,  0,  0,
        -1,  0,  0,

        0,  0,  1,
        0,  0,  1,
        0,  0,  1,
        0,  0,  1,
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.numItems = 24;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDiffuseCoefBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    vertexDiffuseCoefBuffer.itemSize = 4;
    vertexDiffuseCoefBuffer.numItems = 24;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSpecularCoefBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shinColors), gl.STATIC_DRAW);
    vertexSpecularCoefBuffer.itemSize = 4;
    vertexSpecularCoefBuffer.numItems = 24;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexMatShininessBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shininess), gl.STATIC_DRAW);
    vertexMatShininessBuffer.itemSize = 1;
    vertexMatShininessBuffer.numItems = 24;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer); 
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
    vertexIndexBuffer.itemsize = 1;
    vertexIndexBuffer.numItems = 36;
}

function initFloorBuffers() {

    floorVertexPositionBuffer = gl.createBuffer();
    floorVertexIndexBuffer = gl.createBuffer();
    floorVertexDiffuseCoefBuffer = gl.createBuffer();
    floorVertexSpecularCoefBuffer = gl.createBuffer();
    floorVertexMatShininessBuffer = gl.createBuffer();
    floorVertexNormalBuffer = gl.createBuffer();
    createCubeBuffers(floorVertexPositionBuffer, floorVertexDiffuseCoefBuffer, floorVertexSpecularCoefBuffer, 
                      floorVertexMatShininessBuffer, floorVertexNormalBuffer, floorVertexIndexBuffer, 
                      2, 2, 0.2, 0, -0.9, 0,
                      0.8, 0.8, 0.0,
                      0.9, 0.9, 0.9, 50);
}

function initLightBuffers() {

    lightVertexPositionBuffer = gl.createBuffer();
    lightVertexIndexBuffer = gl.createBuffer();
    lightVertexDiffuseCoefBuffer = gl.createBuffer();
    lightVertexSpecularCoefBuffer = gl.createBuffer();
    lightVertexMatShininessBuffer = gl.createBuffer();
    lightVertexNormalBuffer = gl.createBuffer();
    createCubeBuffers(lightVertexPositionBuffer, lightVertexDiffuseCoefBuffer, lightVertexSpecularCoefBuffer, 
                      lightVertexMatShininessBuffer, lightVertexNormalBuffer, lightVertexIndexBuffer, 
                      0.01, 0.01, 0.01, 0, 0, 0,
                      1, 1, 1,
                      1, 1, 1, 0);
}

function initPlatformBuffers() {

    platformVertexPositionBuffer = gl.createBuffer();
    platformVertexDiffuseCoefBuffer = gl.createBuffer();
    platformVertexSpecularCoefBuffer = gl.createBuffer();
    platformVertexMatShininessBuffer = gl.createBuffer();
    platformVertexNormalBuffer = gl.createBuffer();
    platformVertexIndexBuffer = gl.createBuffer();
    createCubeBuffers(platformVertexPositionBuffer, platformVertexDiffuseCoefBuffer, platformVertexSpecularCoefBuffer, 
                      platformVertexMatShininessBuffer, platformVertexNormalBuffer, platformVertexIndexBuffer, 
                      0.6, 0.6, 0.05, 0, 0, 0, 
                      0.7529411765, 0.7529411765, 0.7529411765, 
                      0.9, 0.9, 0.9, 50);
}

function initCenterBuffers() {
    var radius = 0.2;
    // Longitude |||
    var nSlice = 24;
    // Latitude ---
    var nStack = 16;
    var vertices = [
         0.0,  radius,  0.0
    ];
    var normals = [
         0.0,  1,  0.0
    ];
    var colors = [
        0.53, 0.01, 0.05, 1.0
    ];

    var shinColors = [
        0.91, 0.33, 0.32, 1.0
    ];
    var matShininess = [
      10.0
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
     
            vertices.push(sin1 * cos2 * radius); vertices.push(cos1 * radius); vertices.push(sin1 * sin2 * radius);
            normals.push(sin1*cos2); normals.push(cos1); normals.push(sin1*sin2);
            if((0 <= lat && lat <= nStack/4) || (nStack/2 <= lat && lat <= 3*nStack/4))
            {
              colors.push(0.53); colors.push(0.01); colors.push(0.05); colors.push(1.0);
              shinColors.push(0.91); shinColors.push(0.33); shinColors.push(0.32); shinColors.push(1.0);
            } else {
              colors.push(0.01); colors.push(0.27); colors.push(0.51); colors.push(1.0);
              shinColors.push(0.44); shinColors.push(0.71); shinColors.push(0.87); shinColors.push(1.0);
            }
            matShininess.push(10.0 + 20*lat/nStack);
        }
    }
    vertices.push(0.0);  vertices.push(-radius);  vertices.push(0.0);
    normals.push(0.0);  normals.push(-1);  normals.push(0.0);
    colors.push(0.01); colors.push(0.27); colors.push(0.51); colors.push(1.0);
    shinColors.push(0.44); shinColors.push(0.71); shinColors.push(0.87); shinColors.push(1.0);
    matShininess.push(10.0 + 40*lat/nStack);

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

    centerVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    centerVertexNormalBuffer.itemSize = 3;
    centerVertexNormalBuffer.numItems = (nSlice+1) * nStack + 2;

    centerVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    centerVertexPositionBuffer.itemSize = 3;
    centerVertexPositionBuffer.numItems = (nSlice+1) * nStack + 2;

    centerVertexDiffuseCoefBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexDiffuseCoefBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    centerVertexDiffuseCoefBuffer.itemSize = 4;
    centerVertexDiffuseCoefBuffer.numItems = (nSlice+1) * nStack + 2;

    centerVertexSpecularCoefBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexSpecularCoefBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shinColors), gl.STATIC_DRAW);
    centerVertexSpecularCoefBuffer.itemSize = 4;
    centerVertexSpecularCoefBuffer.numItems = (nSlice+1) * nStack + 2;

    centerVertexMatShininessBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, centerVertexMatShininessBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matShininess), gl.STATIC_DRAW);
    centerVertexMatShininessBuffer.itemSize = 1;
    centerVertexMatShininessBuffer.numItems = (nSlice+1) * nStack + 2;

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
    upArmVertexDiffuseCoefBuffer = gl.createBuffer();
    upArmVertexSpecularCoefBuffer = gl.createBuffer();
    upArmVertexMatShininessBuffer = gl.createBuffer();
    upArmVertexNormalBuffer = gl.createBuffer();
    createCubeBuffers(upArmVertexPositionBuffer, upArmVertexDiffuseCoefBuffer, upArmVertexSpecularCoefBuffer, 
                      upArmVertexMatShininessBuffer, upArmVertexNormalBuffer, upArmVertexIndexBuffer, 
                      0.05, 0.05, 0.3, 0, -0.35, 0, 
                      1.0, 1.0, 0.4, 
                      1.0, 1.0, 0.4, 2);
}

function initJointBuffers() {

    var height = 0.07;
    var vertices = [
         0.0,  0.0,  -height/2
    ];
    var normals = [
        0.0, 0.0, -1
    ];
    var colors = [
        0.862745098, 0.08888888889, 0.2666666667, 1.0
    ];
    var shinColors = [
        0.862745098, 0.08888888889, 0.2666666667, 1.0
    ];
    var shininess = [
        2
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
      shinColors.push(0.7);
      shinColors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shininess.push(2);
      normals.push(0); normals.push(0); normals.push(-1);
      numOfItem++;
    }
    for (var i = 0; i <= 360; i+=1) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(-height/2);
      colors.push(0.7);
      colors.push(1.0);
      colors.push(0.7);
      colors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shininess.push(2);
      normals.push(Math.cos(degToRad(i))); normals.push(Math.sin(degToRad(i))); normals.push(0);
      numOfItem++;
    }
    vertices.push(0.0); vertices.push(0.0); vertices.push(height/2);
    normals.push(0); normals.push(0); normals.push(1);
    colors.push(0.862745098); colors.push(0.08888888889); colors.push(0.2666666667); colors.push(1.0);
    shinColors.push(0.862745098); shinColors.push(0.08888888889); shinColors.push(0.2666666667); shinColors.push(1.0);
    shininess.push(2);
    numOfItem++;
    for (var i = 0; i <= 360; i+=1) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(height/2);
      colors.push(1.0);
      colors.push(1.0);
      colors.push(0.4);
      colors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shininess.push(2);
      normals.push(Math.cos(degToRad(i))); normals.push(Math.sin(degToRad(i))); normals.push(0);
      numOfItem++;
    }
    for (var i = 0; i <= 360; i+=1) {
      vertices.push(radius*Math.cos(degToRad(i)));
      vertices.push(radius*Math.sin(degToRad(i)));
      vertices.push(height/2);
      colors.push(1.0);
      colors.push(1.0);
      colors.push(0.4);
      colors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shinColors.push(0.7);
      shinColors.push(1.0);
      shininess.push(2);
      normals.push(0); normals.push(0); normals.push(1);
      numOfItem++;
    }

    var indices = [];
    for (var i = 1; i <= 360; i+=1) {
      indices.push(0);
      indices.push(i);
      indices.push(i+1);
    }

    for (var i = 361; i <= 720; i+=1) {
      indices.push(i);
      indices.push(i+362);
      indices.push(i+1);
      indices.push(i+1);
      indices.push(i+362);
      indices.push(i+363);
    }

    for (var i = 1085; i <= 1444; i+=1) {
      indices.push(723);
      indices.push(i);
      indices.push(i+1);
    }

    jointVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    var a = vertices.length;
    jointVertexPositionBuffer.itemSize = 3;
    jointVertexPositionBuffer.numItems = numOfItem;

    jointVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    var a = normals.length;
    jointVertexNormalBuffer.itemSize = 3;
    jointVertexNormalBuffer.numItems = numOfItem;

    jointVertexDiffuseCoefBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexDiffuseCoefBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    var a = colors.length;
    jointVertexDiffuseCoefBuffer.itemSize = 4;
    jointVertexDiffuseCoefBuffer.numItems = numOfItem;

    jointVertexSpecularCoefBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexSpecularCoefBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shinColors), gl.STATIC_DRAW);
    var a = shinColors.length;
    jointVertexSpecularCoefBuffer.itemSize = 4;
    jointVertexSpecularCoefBuffer.numItems = numOfItem;

    jointVertexMatShininessBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, jointVertexMatShininessBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shininess), gl.STATIC_DRAW);
    var a = shininess.length;
    jointVertexMatShininessBuffer.itemSize = 1;
    jointVertexMatShininessBuffer.numItems = numOfItem;

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
    bottomArmVertexDiffuseCoefBuffer = gl.createBuffer();
    bottomArmVertexSpecularCoefBuffer = gl.createBuffer();
    bottomArmVertexMatShininessBuffer = gl.createBuffer();
    bottomArmVertexNormalBuffer = gl.createBuffer();
    createCubeBuffers(bottomArmVertexPositionBuffer, bottomArmVertexDiffuseCoefBuffer, bottomArmVertexSpecularCoefBuffer, 
                      bottomArmVertexMatShininessBuffer, bottomArmVertexNormalBuffer, bottomArmVertexIndexBuffer, 
                      0.05, 0.05, 0.25, 0, -0.125, 0, 
                      1.0, 1.0, 0.4, 
                      1.0, 1.0, 0.4, 2);
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
    initLightBuffers();

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
var light_pos = [0, 0, 1];
var mat_ambient = [0, 0, 0, 1];
var light_ambient = [1,1,1,1]; 
var light_diffuse = [.8,.8,.8,1];
var light_specular = [1,1,1,1]; 

function draw_floor() {
    var floorMatrix = mat4.create();
    floorMatrix = mat4.identity(floorMatrix);
    floorMatrix = mat4.rotate(floorMatrix, degToRad(Z_angle), [0, 1, 0]);
    setMatrixUniforms(floorMatrix);
    gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], 1.0);  
    gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0); 

    gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
    gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
    gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0); 

    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, floorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, floorVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexDiffuseCoefBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexDiffuseAttribute,floorVertexDiffuseCoefBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexSpecularCoefBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexSpecularAttribute,floorVertexSpecularCoefBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexMatShininessBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexMatShininessAttribute,floorVertexMatShininessBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.drawElements(gl.TRIANGLES, floorVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 
}

function draw_light() {
    var lightMatrix = mat4.create();
    lightMatrix = mat4.identity(lightMatrix);
    lightMatrix = mat4.rotate(lightMatrix, degToRad(Z_angle), [0, 1, 0]);
    lightMatrix = mat4.translate(lightMatrix, light_pos)
    setMatrixUniforms(lightMatrix);
    gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], 1.0);  
    gl.uniform4f(shaderProgram.ambient_coefUniform, 1.0, 1.0, 1.0, 1.0); 

    gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
    gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
    gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0); 

    gl.bindBuffer(gl.ARRAY_BUFFER, lightVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, lightVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lightVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, lightVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lightVertexDiffuseCoefBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexDiffuseAttribute,lightVertexDiffuseCoefBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lightVertexSpecularCoefBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexSpecularAttribute,lightVertexSpecularCoefBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, lightVertexMatShininessBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexMatShininessAttribute,lightVertexMatShininessBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.drawElements(gl.TRIANGLES, lightVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); 
}

function draw_obj(matrix, vertexPositionBuffer, vertexDiffuseCoefBuffer, 
                          vertexSpecularCoefBuffer, vertexMatShininessBuffer, 
                          vertexNormalBuffer, indexBuffer) {
    setMatrixUniforms(matrix); 
    gl.uniform4f(shaderProgram.light_posUniform,light_pos[0], light_pos[1], light_pos[2], 1.0);  
    gl.uniform4f(shaderProgram.ambient_coefUniform, mat_ambient[0], mat_ambient[1], mat_ambient[2], 1.0); 

    gl.uniform4f(shaderProgram.light_ambientUniform, light_ambient[0], light_ambient[1], light_ambient[2], 1.0); 
    gl.uniform4f(shaderProgram.light_diffuseUniform, light_diffuse[0], light_diffuse[1], light_diffuse[2], 1.0); 
    gl.uniform4f(shaderProgram.light_specularUniform, light_specular[0], light_specular[1], light_specular[2],1.0); 

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDiffuseCoefBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexDiffuseAttribute,vertexDiffuseCoefBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexSpecularCoefBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexSpecularAttribute,vertexSpecularCoefBuffer.itemSize,gl.FLOAT,false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexMatShininessBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexMatShininessAttribute,vertexMatShininessBuffer.itemSize,gl.FLOAT,false, 0, 0);
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
    draw_obj(model, platformVertexPositionBuffer, platformVertexDiffuseCoefBuffer, 
                    platformVertexSpecularCoefBuffer, platformVertexMatShininessBuffer, 
                    platformVertexNormalBuffer, platformVertexIndexBuffer);
    PushMatrix(model);
    model = mat4.multiply(model, centerMat);
    draw_obj(model, centerVertexPositionBuffer, centerVertexDiffuseCoefBuffer, 
                    centerVertexSpecularCoefBuffer, centerVertexMatShininessBuffer, 
                    centerVertexNormalBuffer, centerVertexIndexBuffer);
    PushMatrix(model);

    // left branch
    model = mat4.multiply(model, upArmLeftMat);
    draw_obj(model, upArmVertexPositionBuffer, upArmVertexDiffuseCoefBuffer, 
                    upArmVertexSpecularCoefBuffer, upArmVertexMatShininessBuffer, 
                    upArmVertexNormalBuffer, upArmVertexIndexBuffer);
    model = mat4.multiply(model, leftJointMat);
    draw_obj(model, jointVertexPositionBuffer, jointVertexDiffuseCoefBuffer, 
                    jointVertexSpecularCoefBuffer, jointVertexMatShininessBuffer, 
                    jointVertexNormalBuffer, jointVertexIndexBuffer);
    model = mat4.multiply(model, bottomArmLeftMat);
    draw_obj(model, bottomArmVertexPositionBuffer, bottomArmVertexDiffuseCoefBuffer, 
                    bottomArmVertexSpecularCoefBuffer, bottomArmVertexMatShininessBuffer, 
                    bottomArmVertexNormalBuffer, bottomArmVertexIndexBuffer);

    //right branch
    model = PopMatrix();
    model = mat4.multiply(model, upArmRightMat);
    draw_obj(model, upArmVertexPositionBuffer, upArmVertexDiffuseCoefBuffer, 
                    upArmVertexSpecularCoefBuffer, upArmVertexMatShininessBuffer, 
                    upArmVertexNormalBuffer, upArmVertexIndexBuffer);
    model = mat4.multiply(model, rightJointMat);
    draw_obj(model, jointVertexPositionBuffer, jointVertexDiffuseCoefBuffer, 
                    jointVertexSpecularCoefBuffer, jointVertexMatShininessBuffer, 
                    jointVertexNormalBuffer, jointVertexIndexBuffer);
    model = mat4.multiply(model, bottomArmRightMat);
    draw_obj(model, bottomArmVertexPositionBuffer, bottomArmVertexDiffuseCoefBuffer, 
                    bottomArmVertexSpecularCoefBuffer, bottomArmVertexMatShininessBuffer, 
                    bottomArmVertexNormalBuffer, bottomArmVertexIndexBuffer);

    draw_floor();
    draw_light();
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

function moveLight(delta) {
    light_pos[0] += delta[0];
    light_pos[1] += delta[1];
    light_pos[2] += delta[2];
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