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
  this.angularVelocity = 5;
}

Camera.prototype.init = function(){
  // this.yEle.style['-webkit-transform'] = 'translate3d(0,'+ this.y +'px,0)';
  // this.rxEle.style['-webkit-transform'] = 'rotate3d(1,0,0,ret  Q'+ this.rx +'deg)';

  
  this.cameraMatrix = new MatrixUtil([[1,0,0,0],
                                      [0,1,0,0],
                                      [0,0,1,0],
                                      [0,0,0,1]])
  this.cameraMatrix.rotateX(-this.deg2rad*88);
  this.cameraMatrix.translateY(500)
  // this.cameraMatrix.translateY(00);
  var o = "matrix3d("+ this.cameraMatrix.toString()+")";
  this.xEle.style['-webkit-transform'] = o;
}

Camera.prototype.move = function(direction){
  if(direction === 'forward'){
    // this.z += this.velocity;
    // this.cameraPos.z += Math.cos(this.cameraPos.heading*Math.PI/180)*this.velocity;
    // this.cameraPos.x += Math.sin(this.cameraPos.heading*Math.PI/180)*this.velocity;
    // this.zEle.style['-webkit-transform'] = 'translate3d(0,0,'+ this.z +'px)';
    this.cameraMatrix.translateZ(30)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;
    
    console.log(this.cameraPos)

  } else if(direction === 'backward'){
    // this.z -= this.velocity;
    // this.cameraPos.z -= Math.cos(this.cameraPos.heading*Math.PI/180)*this.velocity;
    // this.cameraPos.x -= Math.sin(this.cameraPos.heading*Math.PI/180)*this.velocity;
    // this.zEle.style['-webkit-transform'] = 'translate3d(0,0,'+ this.z +'px)';
    this.cameraMatrix.translateZ(-30)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;


    console.log(this.cameraPos)

  } else if(direction === 'left'){
    // this.cameraPos.heading += this.angularVelocity;
    // this.rz += this.angularVelocity;
    // this.rzEle.style['-webkit-transform-origin'] = (-this.cameraPos.x)+'px '+  (-this.cameraPos.z)+'px';
    // this.rzEle.style['-webkit-transform'] = 'rotate3d(0,0,1,'+ this.rz +'deg)';
    this.cameraMatrix.rotateY(this.deg2rad*3)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;



  } else if(direction === 'right'){
    // this.cameraPos.heading -= this.angularVelocity;
    // this.rz -= this.angularVelocity;
    // this.rzEle.style['-webkit-transform-origin'] = (-this.cameraPos.x)+'px '+  (-this.cameraPos.z)+'px';
    // this.rzEle.style['-webkit-transform'] = 'rotate3d(0,0,1,'+ this.rz +'deg)';
    this.cameraMatrix.rotateY(-this.deg2rad*3)
    var o = "matrix3d("+ this.cameraMatrix.toString()+")";
    this.xEle.style['-webkit-transform'] = o;

  }
}




