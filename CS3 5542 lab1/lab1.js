
    var gl;
    var ctx;
    var shaderProgram;
    var draw_type=2;

//////////// Init OpenGL Context etc. ///////////////

    function initGL(canvas, canvas2d) {
        try {
            gl = canvas.getContext("experimental-webgl");
            ctx = canvas2d.getContext("2d");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
            ctx.screenWidth = canvas2d.width;
            ctx.screenHeight = canvas2d.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var squareVertexPositionBuffer;
    var squareVertexColorBuffer;
    var squareVertexIndexBuffer;

    var vertices = []; 
    var indices = [];
    var colors = [];
    var num_vertices; 
    var num_indices;

function createBarVertices(avgs, flavor) {
  vertices = []; 
  indices = [];
  colors = [];
  var num_bars = avgs.length;
	num_vertices = num_bars * 4;
	num_indices = num_bars * 6;

  var color1 = [0.0, 0.4705882353, 0.6705882353];
  var color2 = [0.7607843137, 0.368627451, 0.01176470588];
  var color3 = [0.3294117647, 0.6705882353, 0.2784313725];
  var color;
  if(flavor == 'setosa') {
    color = color1;
  } else if(flavor == 'versicolor') {
    color = color2;
  } else {
    color = color3;
  }

	var min, max;
	var width; 
	min = Number(avgs[0]);  max = Number(avgs[0]); 
       // find min and max 
	for (var i=0; i<num_bars; i++) {
	    console.log( "val = " + avgs[i]); 
	    if (Number(avgs[i]) < min) min = Number(avgs[i]);
	    if (Number(avgs[i]) > max) max = Number(avgs[i]); 
	} 
	width = max-min; 
	console.log("min = "+min+" max = "+max);
	
//	console.log(num_vertices+"  "+num_indices); 
	
	var v_margin = 0.25; 
	var h = 2/(3*num_bars+1); 
	for (var i =0; i<num_bars; i++) {

    vertices.push(-1+(3*i+1)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
	  vertices.push(-1+(3*i+3)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
	  vertices.push(-1+(3*i+3)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs[i]-min)/width); vertices.push(0.0);
	  vertices.push(-1+(3*i+1)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs[i]-min)/width); vertices.push(0.0);

    colors.push(color[0]); colors.push(color[1]); colors.push(color[2]);
    colors.push(color[0]); colors.push(color[1]); colors.push(color[2]);
    colors.push(color[0]); colors.push(color[1]); colors.push(color[2]);
    colors.push(color[0]); colors.push(color[1]); colors.push(color[2]);
    
	  indices.push(0+4*i);  indices.push(1+4*i);  indices.push(2+4*i);
	  indices.push(0+4*i);  indices.push(2+4*i);  indices.push(3+4*i); 	    
	}

  createAxises(num_bars);
  initBuffers(); 
  drawScene();	
} 

function createMutiBarVertices(avgs1, avgs2, avgs3) {
  vertices = []; 
  indices = [];
  colors = [];
  var num_bars = avgs1.length;
  num_vertices = num_bars * 12;
  num_indices = num_bars * 18;

  var min, max;
  var width; 
  min = Number(avgs1[0]);  max = Number(avgs1[0]); 
       // find min and max 
  for (var i=0; i<num_bars; i++) {
      if (Number(avgs1[i]) < min) min = Number(avgs1[i]);
      if (Number(avgs2[i]) < min) min = Number(avgs2[i]);
      if (Number(avgs3[i]) < min) min = Number(avgs3[i]);

      if (Number(avgs1[i]) > max) max = Number(avgs1[i]); 
      if (Number(avgs2[i]) > max) max = Number(avgs2[i]); 
      if (Number(avgs3[i]) > max) max = Number(avgs3[i]); 
  } 
  width = max-min; 
  console.log("min = "+min+" max = "+max);
  
//  console.log(num_vertices+"  "+num_indices); 
  
  var v_margin = 0.25; 
  var h = 2/(3*num_bars+1); 
  var subBarWidth = 0.6666666667;
  var color1 = [0.0, 0.4705882353, 0.6705882353];
  var color2 = [0.7607843137, 0.368627451, 0.01176470588];
  var color3 = [0.3294117647, 0.6705882353, 0.2784313725];
  for (var i =0; i<num_bars; i++) {

    vertices.push(-1+(3*i+1)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
    vertices.push(-1+(3*i+1+subBarWidth)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
    vertices.push(-1+(3*i+1+subBarWidth)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs1[i]-min)/width); vertices.push(0.0);
    vertices.push(-1+(3*i+1)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs1[i]-min)/width); vertices.push(0.0);

    colors.push(color1[0]); colors.push(color1[1]); colors.push(color1[2]);
    colors.push(color1[0]); colors.push(color1[1]); colors.push(color1[2]);
    colors.push(color1[0]); colors.push(color1[1]); colors.push(color1[2]);
    colors.push(color1[0]); colors.push(color1[1]); colors.push(color1[2]);

    indices.push(0+12*i);  indices.push(1+12*i);  indices.push(2+12*i);
    indices.push(0+12*i);  indices.push(2+12*i);  indices.push(3+12*i);

    vertices.push(-1+(3*i+1+subBarWidth)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
    vertices.push(-1+(3*i+1+2*subBarWidth)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
    vertices.push(-1+(3*i+1+2*subBarWidth)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs2[i]-min)/width); vertices.push(0.0);
    vertices.push(-1+(3*i+1+subBarWidth)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs2[i]-min)/width); vertices.push(0.0);

    colors.push(color2[0]); colors.push(color2[1]); colors.push(color2[2]);
    colors.push(color2[0]); colors.push(color2[1]); colors.push(color2[2]);
    colors.push(color2[0]); colors.push(color2[1]); colors.push(color2[2]);
    colors.push(color2[0]); colors.push(color2[1]); colors.push(color2[2]);

    indices.push(4+12*i);  indices.push(5+12*i);  indices.push(6+12*i);
    indices.push(4+12*i);  indices.push(6+12*i);  indices.push(7+12*i);   

    vertices.push(-1+(3*i+1+2*subBarWidth)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
    vertices.push(-1+(3*i+1+3*subBarWidth)*h); vertices.push(-1+  v_margin); vertices.push(0.0);
    vertices.push(-1+(3*i+1+3*subBarWidth)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs3[i]-min)/width); vertices.push(0.0);
    vertices.push(-1+(3*i+1+2*subBarWidth)*h); vertices.push(-1+v_margin+(2-2*v_margin)*(avgs3[i]-min)/width); vertices.push(0.0);

    colors.push(color3[0]); colors.push(color3[1]); colors.push(color3[2]);
    colors.push(color3[0]); colors.push(color3[1]); colors.push(color3[2]);
    colors.push(color3[0]); colors.push(color3[1]); colors.push(color3[2]);
    colors.push(color3[0]); colors.push(color3[1]); colors.push(color3[2]);

    indices.push(8+12*i);  indices.push(9+12*i);  indices.push(10+12*i);
    indices.push(8+12*i);  indices.push(10+12*i);  indices.push(11+12*i);  
  }

  createAxises(num_bars);
  initBuffers(); 
  drawScene();  
} 

var axiesVertexPositionBuffer;
var axiesVertexColorBuffer;
var axisesLinesVertices = [];
var axisesLinesColors = [];

function createAxises(num_bars) {
  var axisesOrignXOffset = 0;
  var v_margin = 0.25; 
  axisesLinesVertices.push(1.0); axisesLinesVertices.push(-1+  v_margin); axisesLinesVertices.push(0.0);
  axisesLinesVertices.push(-1 + 2/(3*num_bars+1) + axisesOrignXOffset); axisesLinesVertices.push(-1+  v_margin); axisesLinesVertices.push(0.0);
  axisesLinesVertices.push(-1 + 2/(3*num_bars+1) + axisesOrignXOffset); axisesLinesVertices.push(1 -  v_margin); axisesLinesVertices.push(0.0);

  axisesLinesColors.push(0.6); axisesLinesColors.push(0.6); axisesLinesColors.push(0.6); 
  axisesLinesColors.push(0.6); axisesLinesColors.push(0.6); axisesLinesColors.push(0.6); 
  axisesLinesColors.push(0.6); axisesLinesColors.push(0.6); axisesLinesColors.push(0.6); 
}
   ////////////////    Initialize VBO  ////////////////////////

function initBuffers() {

  squareVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  squareVertexPositionBuffer.itemSize = 3;
  squareVertexPositionBuffer.numItems = num_vertices;

  squareVertexIndexBuffer = gl.createBuffer();	
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
  squareVertexIndexBuffer.itemsize = 1;
  squareVertexIndexBuffer.numItems = num_indices;

  squareVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  squareVertexColorBuffer.itemSize = 3;
  squareVertexColorBuffer.numItems = num_vertices;

  axiesVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, axiesVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisesLinesVertices), gl.STATIC_DRAW);
  axiesVertexPositionBuffer.itemSize = 3;
  axiesVertexPositionBuffer.numItems = 3;

  axiesVertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, axiesVertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisesLinesColors), gl.STATIC_DRAW);
  axiesVertexColorBuffer.itemSize = 3;
  axiesVertexColorBuffer.numItems = 3;
}

///////////////////////////////////////////////////////



    function PushMatrix(stack, matrix) {
        var copy = mat4.create();
        mat4.set(matrix, copy);
        stack.push(copy);
    }

    function PopMatrix(stack, copy) {
        if (stack.length == 0) {
            throw "Invalid popMatrix!";
        }
        copy = stack.pop();
    }

    var mvMatrixStack = [];

///////////////////////////////////////////////////////////////////////

function drawScene() {

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // draw bars
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 

  gl.drawElements(gl.TRIANGLES, num_indices, gl.UNSIGNED_SHORT, 0);

  // draw axises
  gl.bindBuffer(gl.ARRAY_BUFFER, axiesVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, axiesVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, axiesVertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,axiesVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.LINE_STRIP, 0, axiesVertexPositionBuffer.numItems);

  ctx.clearRect(0, 0, ctx.screenWidth, ctx.screenHeight);
  ctx.font="15px Georgia";
  ctx.fillText("Sepal Length",175,630);
  ctx.fillText("Sepal Width",310,630);
  ctx.fillText("Petal Length",440,630);
  ctx.fillText("Petal Width",575,630);
}
    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("lab1-canvas");
        var canvas2d = document.getElementById("lab1-2d-canvas");
        initGL(canvas, canvas2d);
        initShaders();

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);


        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

//        initBuffers(); 

        gl.clearColor(1.0, 1.0, 1.0, 1.0);

//        drawScene();
    }