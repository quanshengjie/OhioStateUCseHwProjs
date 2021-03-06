
    var gl;
    var shaderProgram;
var which_object = 1;
var animationMode = false;
var movingObj       = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,  3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,];
// 1=horizental, 2=vertical, 3=rotate
var movingType      = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,  3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,    2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,];
var movingAmount    = [-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,-0.05,  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,    0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,];
var afterwardsDelay = 0.03333;
var cursor = 0;

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
    
    var pMatrix, vMatrix;

    function setMatrixUniforms(matrix) {
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, matrix);
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    }

     function degToRad(degrees) {
        return degrees * Math.PI / 180;
     }

///////////////////////////////////////////////////////

    var mvMatrixStack = [];

    function PushMatrix(matrix) {
        var copy = mat4.create();
        mat4.set(matrix, copy);
        mvMatrixStack.push(copy);
    }

    function PopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        var copy = mvMatrixStack.pop();
	return copy; 
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


    function onKeyDown(event) {
      if(animationMode) {
        return;
      }

      console.log(event.keyCode);
      switch(event.keyCode)  {
        case 70:
          console.log('enter F');
		      if (which_object == 1) {
		        platformMat = mat4.translate(platformMat, [0, -0.05, 0]);
          } else if(which_object == 2) {
            centerMat = mat4.translate(centerMat, [0, -0.05, 0]);
          } else if(which_object == 3) {
            upArmLeftMat = mat4.rotate(upArmLeftMat, degToRad(2), [0, 0, 1]);
            leftJointMat = mat4.rotate(leftJointMat, degToRad(2), [0, 0, 1]);
            bottomArmLeftMat = mat4.rotate(bottomArmLeftMat, degToRad(-1.6), [0, 0, 1]);
            upArmRightMat = mat4.rotate(upArmRightMat, degToRad(-2), [0, 0, 1]);
            rightJointMat = mat4.rotate(rightJointMat, degToRad(-2), [0, 0, 1]);
            bottomArmRightMat = mat4.rotate(bottomArmRightMat, degToRad(1.6), [0, 0, 1]);
          }
          break;
        case 66:
          console.log('enter B');
          if (which_object == 1) {
            platformMat = mat4.translate(platformMat, [0, 0.05, 0]);                
          } else if(which_object == 2) {
            centerMat = mat4.translate(centerMat, [0, 0.05, 0]);
          } else if(which_object == 3) {
            upArmLeftMat = mat4.rotate(upArmLeftMat, degToRad(-2), [0, 0, 1]);
            leftJointMat = mat4.rotate(leftJointMat, degToRad(-2), [0, 0, 1]);
            bottomArmLeftMat = mat4.rotate(bottomArmLeftMat, degToRad(1.6), [0, 0, 1]);
            upArmRightMat = mat4.rotate(upArmRightMat, degToRad(2), [0, 0, 1]);
            rightJointMat = mat4.rotate(rightJointMat, degToRad(2), [0, 0, 1]);
            bottomArmRightMat = mat4.rotate(bottomArmRightMat, degToRad(-1.6), [0, 0, 1]);
          }
          break;
        case 76:
          console.log('enter L');
          if (which_object == 1) {
            platformMat = mat4.translate(platformMat, [0.05, 0, 0]);                
          } else if(which_object == 2) {
            centerMat = mat4.translate(centerMat, [0.05, 0, 0]);
          }
          break;
        case 82:
          console.log('enter R');
          if (which_object == 1) {
            platformMat = mat4.translate(platformMat, [-0.05, 0, 0]);                
          } else if(which_object == 2) {
            centerMat = mat4.translate(centerMat, [-0.05, 0, 0]);
          }
          break;
         
       }
       drawScene();
    }
    ///////////////////////////////////////////////////////////////

    function webGLStart() {
        var canvas = document.getElementById("code04-canvas");
        initGL(canvas);

        document.addEventListener('keydown', onKeyDown, false);

        initShaders();

        gl.enable(gl.DEPTH_TEST); 

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);


        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix"); 

        sceneInit();
        

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        drawScene();
    }

function obj(object_id) {

    which_object = object_id;
    drawScene();

}

function animationRoutine() {
    if(movingType[cursor] == 1) {
      if(movingObj[cursor] == 1) {
        platformMat = mat4.translate(platformMat, [movingAmount[cursor], 0, 0]);
      } else if(movingObj[cursor] == 2) {
        centerMat = mat4.translate(centerMat, [movingAmount[cursor], 0, 0]);
      }
    } else if(movingObj[cursor] == 2) {
      if(movingObj[cursor] == 1) {
        platformMat = mat4.translate(platformMat, [0, movingAmount[cursor], 0]);
      } else if(movingObj[cursor] == 2) {
        centerMat = mat4.translate(centerMat, [0, movingAmount[cursor], 0]);
      }
    } else if(movingObj[cursor] == 3) {
      if(movingObj[cursor] == 3) {
        upArmLeftMat = mat4.rotate(upArmLeftMat, degToRad(movingAmount[cursor]), [0, 0, 1]);
        leftJointMat = mat4.rotate(leftJointMat, degToRad(movingAmount[cursor]), [0, 0, 1]);
        bottomArmLeftMat = mat4.rotate(bottomArmLeftMat, degToRad(-movingAmount[cursor]*0.8), [0, 0, 1]);
        upArmRightMat = mat4.rotate(upArmRightMat, degToRad(-movingAmount[cursor]), [0, 0, 1]);
        rightJointMat = mat4.rotate(rightJointMat, degToRad(-movingAmount[cursor]), [0, 0, 1]);
        bottomArmRightMat = mat4.rotate(bottomArmRightMat, degToRad(movingAmount[cursor]*0.8), [0, 0, 1]);
      }
    }
    drawScene();
    cursor++;
    if(cursor < movingType.length) {
      setTimeout(animationRoutine, afterwardsDelay*1000);
    } else {
      animationMode=false;
      cursor = 0;
    }
    console.log('Cursor at ' + cursor);
}

function startAnimation() {
  animationMode = true;
  setTimeout(animationRoutine, afterwardsDelay*1000);
}
