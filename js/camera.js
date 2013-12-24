var Camera = function(keys){

  this.keyState = keys;
  this.xEle = document.getElementById('x');
  this.yEle = document.getElementById('y');
  this.zEle = document.getElementById('z');
  this.rxEle = document.getElementById('rotateX');
  this.ryEle = document.getElementById('rotateY');
  this.rzEle = document.getElementById('rotateZ');

  this.x = -2000;
  this.y  = 500;
  this.z  = -3000;
  this.rx  = 89.99999;
  this.ry  = 0;
  this.rz  = 0;
  this.angle = 89;

  this.velocity = 60;
  this.angularVelocity = 5;
}

Camera.prototype.init = function(){
  this.xEle.style['-webkit-transform'] = 'translate3d('+this.x+'px,0,0)';
  this.yEle.style['-webkit-transform'] = 'translate3d(0,'+ this.y +'px,0)';
  this.zEle.style['-webkit-transform'] = 'translate3d(0,0,'+ this.z +'px)';
  this.rxEle.style['-webkit-transform'] = 'rotate3d(1,0,0,'+ this.rx +'deg)';
}


Camera.prototype.move = function(direction){
  if(direction === 'forward'){
    //forward
    this.z += this.velocity;
    this.zEle.style['-webkit-transform'] = 'translate3d(0,0,'+ this.z +'px)';
  } else if(direction === 'backward'){
    //backward
    this.z -= this.velocity;
    this.zEle.style['-webkit-transform'] = 'translate3d(0,0,'+ this.z +'px)';
  } else if(direction === 'left'){
    //positive rotation around y axis 
    this.rzEle.style['-webkit-transform-origin'] = window.innerWidth/2 - this.z+'px '+ window.innerHeight/2 -this.z+'px';
    this.rz += this.angularVelocity;
    this.rzEle.style['-webkit-transform'] = 'rotate3d(0,0,1,'+ this.rz +'deg)';
  } else if(direction === 'right'){
    this.rzEle.style['-webkit-transform-origin'] = window.innerWidth/2 - this.z+'px '+  window.innerHeight/2 -this.z+'px';
    this.rz -= this.angularVelocity;
    this.rzEle.style['-webkit-transform'] = 'rotate3d(0,0,1,'+ this.rz +'deg)';
  } else if(direction === 'rotate'){
    // this.rzEle.style['-webkit-transform-origin'] = window.innerWidth/2 - this.z+'px '+  window.innerHeight/2 -this.z+'px';
    this.angle += 1
    this.rxEle.style['-webkit-transform'] = 'rotate3d(1,0,0,'+ this.angle +'deg)';
  }
}




