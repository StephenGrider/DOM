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

  this.velocity = 60;
  this.angularVelocity = this.deg2rad*3;
}

Camera.prototype.init = function(){
  this.cameraMatrix = new MatrixUtil([[1,0,0,0],
                                      [0,1,0,0],
                                      [0,0,1,0],
                                      [0,0,0,1]])
  this.cameraMatrix.rotateX(-this.deg2rad*88);
  this.cameraMatrix.translateY(500)
  var o = "matrix3d("+ this.cameraMatrix.toString()+")";
  this.xEle.style['-webkit-transform'] = o;
}

Camera.prototype.move = function(direction){
  if(direction === 'forward'){
    this.cameraPos.z += Math.cos(this.cameraPos.heading)*this.velocity;
    this.cameraPos.x += Math.sin(this.cameraPos.heading)*this.velocity;
    this.cameraMatrix.translateZ(30)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;
    
    // console.log(this.cameraPos)

  } else if(direction === 'backward'){
    this.cameraPos.z -= Math.cos(this.cameraPos.heading)*this.velocity;
    this.cameraPos.x -= Math.sin(this.cameraPos.heading)*this.velocity;
    this.cameraMatrix.translateZ(-30)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;


    // console.log(this.cameraPos)

  } else if(direction === 'left'){
    this.cameraPos.heading += this.angularVelocity;
    if(this.cameraPos.heading < .0001 && this.cameraPos.heading > -.0001){this.cameraPos.heading = 0;}
    this.cameraMatrix.rotateY(this.angularVelocity)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;



  } else if(direction === 'right'){
    this.cameraPos.heading -= this.angularVelocity;
    if(this.cameraPos.heading < .0001 && this.cameraPos.heading > -.0001){this.cameraPos.heading = 0;}
    this.cameraMatrix.rotateY(-this.angularVelocity)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;

  }
}




