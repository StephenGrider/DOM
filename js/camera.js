var Camera = function(keys){

  this.keyState = keys;
  this.xEle = document.getElementById('x');
  this.yEle = document.getElementById('y');
  this.zEle = document.getElementById('z');
  this.rxEle = document.getElementById('rotateX');
  this.ryEle = document.getElementById('rotateY');
  this.rzEle = document.getElementById('rotateZ');

  this.x = 0;
  this.y  = 500;
  this.z  = 0;
  this.rx  = 89.99999;
  this.ry  = 0;
  this.rz  = 0;
  this.angle = 89;
  this.deg2rad = Math.PI/180;

  this.cameraPos = {};
  this.cameraPos.x = this.x- window.innerWidth/2;
  this.cameraPos.y = this.y;
  this.cameraPos.z = this.z - window.innerHeight/2;
  this.cameraPos.heading = 0;

  this.velocity = 30;
  this.angularVelocity = this.deg2rad*3;
  this.flipped = false;
}

Camera.prototype.init = function(){
  this.cameraMatrix = new MatrixUtil([[1,0,0,0],
                                      [0,1,0,0],
                                      [0,0,1,0],
                                      [0,0,0,1]])
  // this.cameraMatrix.translateY(-800);
  this.cameraMatrix.translateY(-window.innerHeight/2)
  this.cameraMatrix.rotateX(-this.deg2rad*89);
  this.cameraMatrix.translateY(window.innerHeight/2)
  // this.cameraMatrix.translateX(-800);
  this.cameraMatrix.translateY(400)
  var o = "matrix3d("+ this.cameraMatrix.toString()+")";
  this.xEle.style['-webkit-transform'] = o;
}

Camera.prototype.move = function(direction){
  if(direction === 'forward'){
    this.cameraPos.z += Math.cos(this.cameraPos.heading)*this.velocity;
    this.cameraPos.x += Math.sin(this.cameraPos.heading)*this.velocity;
    this.cameraMatrix.translateZ(this.velocity)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;
    
    // console.log(this.cameraPos)

  } else if(direction === 'backward'){
    this.cameraPos.z -= Math.cos(this.cameraPos.heading)*this.velocity;
    this.cameraPos.x -= Math.sin(this.cameraPos.heading)*this.velocity;
    this.cameraMatrix.translateZ(-this.velocity)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;


    // console.log(this.cameraPos)

  } else if(direction === 'left'){
    this.cameraPos.heading += this.angularVelocity;
    if(this.cameraPos.heading > 2*Math.PI){
      this.cameraPos.heading = 0;
    }
    if(this.cameraPos.heading < .0001 && this.cameraPos.heading > -.0001){this.cameraPos.heading = 0;}
    this.cameraMatrix.translateZ(-600)
    this.cameraMatrix.rotateY(this.angularVelocity)
    this.cameraMatrix.translateZ(600)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;

  } else if(direction === 'right'){
    this.cameraPos.heading -= this.angularVelocity;
    if(this.cameraPos.heading < 0){
      this.cameraPos.heading = 2*Math.PI;
    }
    if(this.cameraPos.heading < .0001 && this.cameraPos.heading > -.0001){this.cameraPos.heading = 0;}
    this.cameraMatrix.translateZ(-600)
    this.cameraMatrix.rotateY(-this.angularVelocity)
    this.cameraMatrix.translateZ(600)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;

  } else if(direction === 'strafeRight'){

    this.cameraPos.z += Math.sin(this.cameraPos.heading)*this.velocity;
    this.cameraPos.x += Math.cos(this.cameraPos.heading)*this.velocity;
    this.cameraMatrix.translateX(-this.velocity)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;

  }  else if(direction === 'strafeLeft'){

    this.cameraPos.z -= Math.sin(this.cameraPos.heading)*this.velocity;
    this.cameraPos.x -= Math.cos(this.cameraPos.heading)*this.velocity;
    this.cameraMatrix.translateX(this.velocity)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;
  } 

  if(this.cameraPos.x < -3000 && this.cameraPos.z < -2200 && !this.flipped){
    this.flipped = true;

    this.cameraPos.x = this.x- window.innerWidth/2;
    this.cameraPos.y = 1100;
    this.cameraPos.z = this.z - window.innerHeight/2;
    this.cameraPos.heading = 0;

    this.cameraMatrix = new MatrixUtil([[1,0,0,0],
                                        [0,1,0,0],
                                        [0,0,1,0],
                                        [0,0,0,1]])
    
    this.cameraMatrix.translateY(-window.innerHeight/2)
    this.cameraMatrix.rotateX(this.deg2rad*89);
    this.cameraMatrix.translateY(window.innerHeight/2)
    
    this.cameraMatrix.translateY(-1100)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;
  }

  if(this.cameraPos.x < -3000 && this.cameraPos.z > 2800 && this.flipped){
    this.flipped = false;

    this.cameraPos.x = this.x- window.innerWidth/2;
    this.cameraPos.y = this.y;
    this.cameraPos.z = this.z - window.innerHeight/2;
    this.cameraPos.heading = 0;

    this.cameraMatrix = new MatrixUtil([[1,0,0,0],
                                        [0,1,0,0],
                                        [0,0,1,0],
                                        [0,0,0,1]])
    this.cameraMatrix.translateY(-window.innerHeight/2)
    this.cameraMatrix.rotateX(-this.deg2rad*89);
    this.cameraMatrix.translateY(window.innerHeight/2)

    this.cameraMatrix.translateY(400)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;
  }

}