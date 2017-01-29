
//////////////////////////////////////////////////////////////////
//
//  This example is similar to code03.html, but I am showing you how to
//  use gl elemenntary array, i.e, triangle indices, to draw faces 
//

var gl;
var shaderProgram;
var skyBoxShaderProgram;
var draw_type=2;


  // set up the parameters for lighting 
  var light_ambient = [0,0,0,1]; 
  var light_diffuse = [.8,.8,.8,1];
  var light_specular = [1,1,1,1]; 
  var light_pos = [0,0,0,1];   // eye space position 

  var mat_ambient = [0, 0, 0, 1]; 
  var mat_diffuse= [1, 1, 0, 1]; 
  var mat_specular = [.9, .9, .9,1]; 
  var mat_shine = [50]; 

//////////// Init OpenGL Context etc. ///////////////

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

var teapotVertexPositionBuffer;
var teapotVertexNormalBuffer; 
var teapotVertexTextureCoordBuffer; 
var teapotVertexIndexBuffer;
var diffuseTexture;
var bumpTexture;
var specularTexture;

var xmin, xmax, ymin, ymax, zmin, zmax;

function find_range(positions)
{
    console.log("hello!"); 
    xmin = xmax = positions[0];
    ymin = ymax = positions[1];
    zmin = zmax = positions[2];
    for (i = 0; i< positions.length/3; i++) {
	if (positions[i*3] < xmin) xmin = positions[i*3];
	if (positions[i*3] > xmax) xmax = positions[i*3]; 	

	if (positions[i*3+1] < ymin) ymin = positions[i*3+1];
	if (positions[i*3+1] > ymax) ymax = positions[i*3+1]; 	

	if (positions[i*3+2] < zmin) zmin = positions[i*3+2];
	if (positions[i*3+2] > zmax) zmax = positions[i*3+2]; 	
    }
    console.log("*****xmin = "+xmin + "xmax = "+xmax);
    console.log("*****ymin = "+ymin + "ymax = "+ymax);
    console.log("*****zmin = "+zmin + "zmax = "+zmax);     
} 

////////////////    Initialize JSON geometry file ///////////

function initJSON()
{
    var request = new  XMLHttpRequest();
    request.open("GET", "teapotHD.json");    
    request.onreadystatechange =
      function () {
          if (request.readyState == 4) {
	      console.log("state ="+request.readyState); 
              handleLoadedTeapot(JSON.parse(request.responseText));
        }
      }
    request.send();
}


function handleLoadedTeapot(teapotData)
{
    console.log(" in hand LoadedTeapot"); 
    teapotVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(teapotData.vertexPositions),gl.STATIC_DRAW);
    teapotVertexPositionBuffer.itemSize=3;
    teapotVertexPositionBuffer.numItems=teapotData.vertexPositions.length/3; 
    
    teapotVertexNormalBuffer =  gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,  teapotVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(teapotData.vertexNormals), gl.STATIC_DRAW);
    teapotVertexNormalBuffer.itemSize=3;
    teapotVertexNormalBuffer.numItems= teapotData.vertexNormals.length/3;

    
    teapotVertexTextureCoordBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(teapotData.vertexTextureCoords),
		  gl.STATIC_DRAW);
    teapotVertexTextureCoordBuffer.itemSize=2;
    teapotVertexTextureCoordBuffer.numItems=teapotData.vertexTextureCoords.length/2;
    

    teapotVertexIndexBuffer= gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(teapotData.indices), gl.STATIC_DRAW);
    teapotVertexIndexBuffer.itemSize=1;
    teapotVertexIndexBuffer.numItems=teapotData.indices.length;

    find_range(teapotData.vertexPositions);

    console.log("*****xmin = "+xmin + "xmax = "+xmax);
    console.log("*****ymin = "+ymin + "ymax = "+ymax);
    console.log("*****zmin = "+zmin + "zmax = "+zmax);       

    drawScene();

}


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

    var mMatrix = mat4.create();  // model matrix
    var vMatrix = mat4.create(); // view matrix
    var pMatrix = mat4.create();  //projection matrix
    var nMatrix = mat4.create();  // normal matrix
    var Z_angle = 0.0;

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);

        var v2wMatrix = mat4.create();
        mat4.identity(v2wMatrix);
        v2wMatrix = mat4.multiply(v2wMatrix, vMatrix);
        v2wMatrix = mat4.inverse(v2wMatrix);
        gl.uniformMatrix4fv(shaderProgram.v2wMatrixUniform, false, v2wMatrix);
    }

    function setSkyBoxMatrixUniforms() {
        gl.uniformMatrix4fv(skyBoxShaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(skyBoxShaderProgram.pMatrixUniform, false, pMatrix);
    }

     function degToRad(degrees) {
        return degrees * Math.PI / 180;
     }

///////////////////////////////////////////////////////////////

function initTextures() {
    diffuseTexture = gl.createTexture();
    diffuseTexture.image = new Image();
    diffuseTexture.image.onload = function() { handleTextureLoaded(diffuseTexture); }
    diffuseTexture.image.src = "marble-diffuse-hd.png";

    bumpTexture = gl.createTexture();
    bumpTexture.image = new Image();
    bumpTexture.image.onload = function() { handleTextureLoaded(bumpTexture); }
    bumpTexture.image.src = "marble-bump-hd.png";

    specularTexture = gl.createTexture();
    specularTexture.image = new Image();
    specularTexture.image.onload = function() { handleTextureLoaded(specularTexture); }
    specularTexture.image.src = "marble-specular-hd.png";
}


function handleTextureLoaded(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

// Start loading cube map images now
var images = [ 'assets/location_4_1_diffuse_c00.jpg', 'assets/location_4_1_diffuse_c02.jpg', 'assets/location_4_1_diffuse_c04.jpg',
               'assets/location_4_1_diffuse_c01.jpg', 'assets/location_4_1_diffuse_c03.jpg', 'assets/location_4_1_diffuse_c05.jpg',
               'assets/location_4_1_specular_c00.jpg', 'assets/location_4_1_specular_c02.jpg', 'assets/location_4_1_specular_c04.jpg',
               'assets/location_4_1_specular_c01.jpg', 'assets/location_4_1_specular_c03.jpg', 'assets/location_4_1_specular_c05.jpg',
               'assets/location_4_1_reflection_c00.jpg', 'assets/location_4_1_reflection_c02.jpg', 'assets/location_4_1_reflection_c04.jpg',
               'assets/location_4_1_reflection_c01.jpg', 'assets/location_4_1_reflection_c03.jpg', 'assets/location_4_1_reflection_c05.jpg' ]

var cubemapDiffuseTexture;
var cubemapSpecularTexture;
var skyBoxSpecularTexture;
var diffuseCubeLoadCount = 0;
var specularCubeLoadCount = 0;
var skyBoxCubeLoadCount = 0;

function initDiffuseCubeMap() {
    diffuseCubeLoadCount = 0;
    cubemapDiffuseTexture = gl.createTexture();
    cubemapDiffuseTexture.image = new Array(6);
    cubemapDiffuseTexture.image[0] = new Image();
    cubemapDiffuseTexture.image[0].onload = function() { handleDiffuseCubemapTextureLoaded(cubemapDiffuseTexture); }
    cubemapDiffuseTexture.image[0].src = images[0];

    cubemapDiffuseTexture.image[1] = new Image();
    cubemapDiffuseTexture.image[1].onload = function() { handleDiffuseCubemapTextureLoaded(cubemapDiffuseTexture); }
    cubemapDiffuseTexture.image[1].src = images[1];

    cubemapDiffuseTexture.image[2] = new Image();
    cubemapDiffuseTexture.image[2].onload = function() { handleDiffuseCubemapTextureLoaded(cubemapDiffuseTexture); }
    cubemapDiffuseTexture.image[2].src = images[2];  

    cubemapDiffuseTexture.image[3] = new Image();
    cubemapDiffuseTexture.image[3].onload = function() { handleDiffuseCubemapTextureLoaded(cubemapDiffuseTexture); }
    cubemapDiffuseTexture.image[3].src = images[3]; 

    cubemapDiffuseTexture.image[4] = new Image();
    cubemapDiffuseTexture.image[4].onload = function() { handleDiffuseCubemapTextureLoaded(cubemapDiffuseTexture); }
    cubemapDiffuseTexture.image[4].src = images[4]; 

    cubemapDiffuseTexture.image[5] = new Image();
    cubemapDiffuseTexture.image[5].onload = function() { handleDiffuseCubemapTextureLoaded(cubemapDiffuseTexture); }
    cubemapDiffuseTexture.image[5].src = images[5];
}

function handleDiffuseCubemapTextureLoaded(texture) {
    diffuseCubeLoadCount++;

    if(diffuseCubeLoadCount == 6) {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT); 
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[0]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[1]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[5]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[3]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[4]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[2]);
      diffuseCubeLoadCount = 0;
    }  
}

function initSpecularCubeMap() {
    specularCubeLoadCount = 0;
    cubemapSpecularTexture = gl.createTexture();
    cubemapSpecularTexture.image = new Array(6);
    cubemapSpecularTexture.image[0] = new Image();
    cubemapSpecularTexture.image[0].onload = function() { handleSpecularCubemapTextureLoaded(cubemapSpecularTexture); }
    cubemapSpecularTexture.image[0].src = images[6];
    cubemapSpecularTexture.image[1] = new Image();
    cubemapSpecularTexture.image[1].onload = function() { handleSpecularCubemapTextureLoaded(cubemapSpecularTexture); }
    cubemapSpecularTexture.image[1].src = images[7];  
    cubemapSpecularTexture.image[2] = new Image();
    cubemapSpecularTexture.image[2].onload = function() { handleSpecularCubemapTextureLoaded(cubemapSpecularTexture); }
    cubemapSpecularTexture.image[2].src = images[8];  
    cubemapSpecularTexture.image[3] = new Image();
    cubemapSpecularTexture.image[3].onload = function() { handleSpecularCubemapTextureLoaded(cubemapSpecularTexture); }
    cubemapSpecularTexture.image[3].src = images[9];  
    cubemapSpecularTexture.image[4] = new Image();
    cubemapSpecularTexture.image[4].onload = function() { handleSpecularCubemapTextureLoaded(cubemapSpecularTexture); }
    cubemapSpecularTexture.image[4].src = images[10];  
    cubemapSpecularTexture.image[5] = new Image();
    cubemapSpecularTexture.image[5].onload = function() { handleSpecularCubemapTextureLoaded(cubemapSpecularTexture); }
    cubemapSpecularTexture.image[5].src = images[11];
}

function handleSpecularCubemapTextureLoaded(texture) {
    specularCubeLoadCount++;

    if(specularCubeLoadCount == 6) {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT); 
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[0]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[1]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[5]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[3]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[4]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[2]);
      specularCubeLoadCount = 0;
    }  
}

function initSkyBoxCubeMap() {
    skyBoxCubeLoadCount = 0;
    skyBoxSpecularTexture = gl.createTexture();
    skyBoxSpecularTexture.image = new Array(6);
    skyBoxSpecularTexture.image[0] = new Image();
    skyBoxSpecularTexture.image[0].onload = function() { handleSkyBoxCubemapTextureLoaded(skyBoxSpecularTexture); }
    skyBoxSpecularTexture.image[0].src = images[12];
    skyBoxSpecularTexture.image[1] = new Image();
    skyBoxSpecularTexture.image[1].onload = function() { handleSkyBoxCubemapTextureLoaded(skyBoxSpecularTexture); }
    skyBoxSpecularTexture.image[1].src = images[13];  
    skyBoxSpecularTexture.image[2] = new Image();
    skyBoxSpecularTexture.image[2].onload = function() { handleSkyBoxCubemapTextureLoaded(skyBoxSpecularTexture); }
    skyBoxSpecularTexture.image[2].src = images[14];  
    skyBoxSpecularTexture.image[3] = new Image();
    skyBoxSpecularTexture.image[3].onload = function() { handleSkyBoxCubemapTextureLoaded(skyBoxSpecularTexture); }
    skyBoxSpecularTexture.image[3].src = images[15];  
    skyBoxSpecularTexture.image[4] = new Image();
    skyBoxSpecularTexture.image[4].onload = function() { handleSkyBoxCubemapTextureLoaded(skyBoxSpecularTexture); }
    skyBoxSpecularTexture.image[4].src = images[16];  
    skyBoxSpecularTexture.image[5] = new Image();
    skyBoxSpecularTexture.image[5].onload = function() { handleSkyBoxCubemapTextureLoaded(skyBoxSpecularTexture); }
    skyBoxSpecularTexture.image[5].src = images[17];
}

function handleSkyBoxCubemapTextureLoaded(texture) {
    skyBoxCubeLoadCount++;

    if(skyBoxCubeLoadCount == 6) {
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT); 
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR); 
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[0]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[1]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[5]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[3]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[4]);
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        texture.image[2]);
      skyBoxCubeLoadCount = 0;
    }  
}
///////////////////////////////////////////////////////////////
var skyBoxPositionBuffer; 
function initSkyBoxVBO() {
  var skyboxVertices = [
    // Positions          
    -5.0,  5.0, -5.0,
    -5.0, -5.0, -5.0,
     5.0, -5.0, -5.0,
     5.0, -5.0, -5.0,
     5.0,  5.0, -5.0,
    -5.0,  5.0, -5.0,

    -5.0, -5.0,  5.0,
    -5.0, -5.0, -5.0,
    -5.0,  5.0, -5.0,
    -5.0,  5.0, -5.0,
    -5.0,  5.0,  5.0,
    -5.0, -5.0,  5.0,

     5.0, -5.0, -5.0,
     5.0, -5.0,  5.0,
     5.0,  5.0,  5.0,
     5.0,  5.0,  5.0,
     5.0,  5.0, -5.0,
     5.0, -5.0, -5.0,

    -5.0, -5.0,  5.0,
    -5.0,  5.0,  5.0,
     5.0,  5.0,  5.0,
     5.0,  5.0,  5.0,
     5.0, -5.0,  5.0,
    -5.0, -5.0,  5.0,

    -5.0,  5.0, -5.0,
     5.0,  5.0, -5.0,
     5.0,  5.0,  5.0,
     5.0,  5.0,  5.0,
    -5.0,  5.0,  5.0,
    -5.0,  5.0, -5.0,

    -5.0, -5.0, -5.0,
    -5.0, -5.0,  5.0,
     5.0, -5.0, -5.0,
     5.0, -5.0, -5.0,
    -5.0, -5.0,  5.0,
     5.0, -5.0,  5.0
  ];
  var a = skyboxVertices.length;
  skyBoxPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, skyBoxPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(skyboxVertices), gl.STATIC_DRAW);
  skyBoxPositionBuffer.itemSize = 3;
  skyBoxPositionBuffer.numItems = 36;
}

///////////////////////////////////////////////////////////////

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (teapotVertexPositionBuffer == null || teapotVertexNormalBuffer == null || teapotVertexIndexBuffer == null || 
        diffuseTexture == null || specularTexture == null || bumpTexture == null) {
            return;
    }

  pMatrix = mat4.perspective(60, 1.0, 0.1, 100, pMatrix);  // set up the projection matrix 

  vMatrix = mat4.lookAt([0,0,-5], [0,0,0], [0,1,0], vMatrix);  // set up the view matrix, multiply into the modelview matrix

        mat4.identity(mMatrix);
        mMatrix = mat4.rotate(mMatrix, degToRad(Z_angle), [1, 1, 1]);   // now set up the model matrix
        mMatrix = mat4.scale(mMatrix, [1/15, 1/15, 1/15]);
        mMatrix = mat4.rotate(mMatrix, degToRad(90), [-1, 0, 0])
        mMatrix = mat4.translate(mMatrix, [0, 0, -10]);

  mat4.identity(nMatrix); 
  nMatrix = mat4.multiply(nMatrix, vMatrix);
  nMatrix = mat4.multiply(nMatrix, mMatrix);  
  nMatrix = mat4.inverse(nMatrix);
  nMatrix = mat4.transpose(nMatrix); 

    gl.depthMask(false);
    gl.useProgram(skyBoxShaderProgram);
    setSkyBoxMatrixUniforms();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubemapSpecularTexture);    // bind the texture object to the texture unit 
    gl.uniform1i(skyBoxShaderProgram.skybox, 0);   // pass the texture unit to the shader
    gl.enableVertexAttribArray(skyBoxShaderProgram.vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, skyBoxPositionBuffer);
    gl.vertexAttribPointer(skyBoxShaderProgram.vertexPositionAttribute, skyBoxPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, skyBoxPositionBuffer.numItems);
    gl.disableVertexAttribArray(skyBoxShaderProgram.vertexPositionAttribute);
    gl.depthMask(true);

    gl.useProgram(shaderProgram);
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexTexCoordsAttribute);


	gl.uniform1f(shaderProgram.diffuseBlendness, diffuseBlendness);
  gl.uniform1f(shaderProgram.specularBlendness, specularBlendness); 
  gl.uniform1f(shaderProgram.reflectionBlendness, reflectionBlendness); 
  gl.uniform1f(shaderProgram.reflectionFresnel, reflectionFresnel); 	


	gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, teapotVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexNormalBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, teapotVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, teapotVertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexTexCoordsAttribute, teapotVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, teapotVertexIndexBuffer); 	

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, diffuseTexture);
  gl.uniform1i(shaderProgram.diffuseTextureUniform, 0);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, specularTexture);
  gl.uniform1i(shaderProgram.specularTextureUniform, 1);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, bumpTexture);
  gl.uniform1i(shaderProgram.bumpTextureUniform, 2);

  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubemapDiffuseTexture);    // bind the texture object to the texture unit 
  gl.uniform1i(shaderProgram.diffuseCubeUniform, 3);   // pass the texture unit to the shader
  gl.activeTexture(gl.TEXTURE4);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubemapSpecularTexture);    // bind the texture object to the texture unit 
  gl.uniform1i(shaderProgram.specularCubeUniform, 4);   // pass the texture unit to the shader
  gl.activeTexture(gl.TEXTURE5);
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyBoxSpecularTexture);    // bind the texture object to the texture unit 
  gl.uniform1i(shaderProgram.reflectionCubeUniform, 5);   // pass the texture unit to the shader

  setMatrixUniforms();   // pass the modelview mattrix and projection matrix to the shader 

	if (draw_type ==1) gl.drawArrays(gl.LINE_LOOP, 0, teapotVertexPositionBuffer.numItems);	
        else if (draw_type ==0) gl.drawArrays(gl.POINTS, 0, teapotVertexPositionBuffer.numItems);
	else if (draw_type==2) gl.drawElements(gl.TRIANGLES, teapotVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0);

  gl.disableVertexAttribArray(shaderProgram.vertexPositionAttribute);
  gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);
  gl.disableVertexAttribArray(shaderProgram.vertexTexCoordsAttribute);
    }


    ///////////////////////////////////////////////////////////////

     var lastMouseX = 0, lastMouseY = 0;

    ///////////////////////////////////////////////////////////////

     function onDocumentMouseDown( event ) {
          event.preventDefault();
          document.getElementById("code12-canvas").addEventListener( 'mousemove', onDocumentMouseMove, false );
          document.getElementById("code12-canvas").addEventListener( 'mouseup', onDocumentMouseUp, false );
          document.getElementById("code12-canvas").addEventListener( 'mouseout', onDocumentMouseOut, false );
          var mouseX = event.clientX;
          var mouseY = event.clientY;

          lastMouseX = mouseX;
          lastMouseY = mouseY; 

      }

     function onDocumentMouseMove( event ) {
          var mouseX = event.clientX;
          var mouseY = event.ClientY; 

          var diffX = mouseX - lastMouseX;
          var diffY = mouseY - lastMouseY;

          Z_angle = Z_angle + diffX/5;

          lastMouseX = mouseX;
          lastMouseY = mouseY;

          drawScene();
     }

     function onDocumentMouseUp( event ) {
          document.getElementById("code12-canvas").removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.getElementById("code12-canvas").removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.getElementById("code12-canvas").removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

     function onDocumentMouseOut( event ) {
          document.getElementById("code12-canvas").removeEventListener( 'mousemove', onDocumentMouseMove, false );
          document.getElementById("code12-canvas").removeEventListener( 'mouseup', onDocumentMouseUp, false );
          document.getElementById("code12-canvas").removeEventListener( 'mouseout', onDocumentMouseOut, false );
     }

    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("code12-canvas");
        initGL(canvas);
        initShaders();

	      gl.enable(gl.DEPTH_TEST); 

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        shaderProgram.vertexTexCoordsAttribute = gl.getAttribLocation(shaderProgram, "aVertexTexCoords");
	
        shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
      	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
      	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.v2wMatrixUniform = gl.getUniformLocation(shaderProgram, "uV2WMatrix");  

        shaderProgram.diffuseTextureUniform = gl.getUniformLocation(shaderProgram, "diffuseTexture");
        shaderProgram.specularTextureUniform = gl.getUniformLocation(shaderProgram, "specularTexture");
        shaderProgram.bumpTextureUniform = gl.getUniformLocation(shaderProgram, "bumpTexture");

        shaderProgram.diffuseCubeUniform = gl.getUniformLocation(shaderProgram, "diffuseCubeMap");
        shaderProgram.specularCubeUniform = gl.getUniformLocation(shaderProgram, "specularCubeMap");
        shaderProgram.reflectionCubeUniform = gl.getUniformLocation(shaderProgram, "reflectionCubeMap");

        shaderProgram.diffuseBlendness = gl.getUniformLocation(shaderProgram, "diffuseBlendness");
        shaderProgram.specularBlendness = gl.getUniformLocation(shaderProgram, "specularBlendness");
        shaderProgram.reflectionBlendness = gl.getUniformLocation(shaderProgram, "reflectionBlendness");
        shaderProgram.reflectionFresnel = gl.getUniformLocation(shaderProgram, "reflectionFresnel");

        skyBoxShaderProgram.vertexPositionAttribute = gl.getAttribLocation(skyBoxShaderProgram, "aVertexPosition");
        skyBoxShaderProgram.vMatrixUniform = gl.getUniformLocation(skyBoxShaderProgram, "uVMatrix");
        skyBoxShaderProgram.pMatrixUniform = gl.getUniformLocation(skyBoxShaderProgram, "uPMatrix");
        skyBoxShaderProgram.skybox = gl.getUniformLocation(skyBoxShaderProgram, "skybox");

	initJSON();
  initSkyBoxVBO();
  initTextures();
  initDiffuseCubeMap();
  initSpecularCubeMap();
  initSkyBoxCubeMap();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        console.log('start! ');


       document.getElementById("code12-canvas").addEventListener('mousedown', onDocumentMouseDown,
       false); 

       setTimeout(function(){ drawScene(); }, 1500);
    }

function BG(red, green, blue) {

    gl.clearColor(red, green, blue, 1.0);
    drawScene(); 

} 

function redraw() {
    Z_angle = 0;
    diffuseBlendness = 1.0;
    specularBlendness = 0.8;
    reflectionBlendness = 0.03821820538;
    reflectionFresnel = 5;
    document.getElementById("diffuseMixSlider").value = 100;
    document.getElementById("specularMixSlider").value = 80;
    document.getElementById("reflectionMixSlider").value = 3.8218205377;
    document.getElementById("fresnelMixSlider").value = 5;
    drawScene();
}
    

function geometry(type) {

    draw_type = type;
    drawScene();

}

var diffuseBlendness = 1.0;
var specularBlendness = 0.8;
var reflectionBlendness = 0.03821820538;
var reflectionFresnel = 5;

function onChangeBlend(type, element) {
    switch(type)
    {
      case "diffuse":
      diffuseBlendness = element.value / 100.0;
      break;

      case "specular":
      specularBlendness = element.value / 100.0;
      break;

      case "reflection":
      reflectionBlendness = element.value / 100.0;
      break;

      case "fresnel":
      reflectionFresnel = element.value;
      break;
    }

    drawScene();
} 
